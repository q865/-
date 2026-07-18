#!/usr/bin/env bash
# Настройка reverse proxy air-cloud-msk.ru на VPS (Jino).
#
# На VPS (нужна папка deploy/nginx рядом или REPO_ROOT):
#   sudo bash setup-vps-proxy.sh
#
# Только обновить конфиг + bypass-секрет:
#   sudo VERCEL_BYPASS_SECRET='...' bash setup-vps-proxy.sh --fix

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"
NGINX_SITE="air-cloud-msk.ru"
FIX_ONLY=false

if [[ "${1:-}" == "--fix" ]]; then
  FIX_ONLY=true
fi

if [[ "${EUID:-$(id -u)}" -ne 0 ]]; then
  echo "Запустите с root: sudo bash setup-vps-proxy.sh"
  exit 1
fi

require_deploy_files() {
  if [[ ! -f "${REPO_ROOT}/deploy/nginx/air-cloud-msk.ru.conf" ]]; then
    echo "✗ Не найден ${REPO_ROOT}/deploy/nginx/ — скопируйте репозиторий на VPS"
    exit 1
  fi
}

install_packages() {
  if command -v nginx >/dev/null 2>&1; then
    return
  fi
  apt-get update -qq
  DEBIAN_FRONTEND=noninteractive apt-get install -y -qq nginx certbot python3-certbot-nginx curl
}

write_bypass_snippet() {
  mkdir -p /etc/nginx/snippets
  if [[ -n "${VERCEL_BYPASS_SECRET:-}" ]]; then
    cat > /etc/nginx/snippets/vercel-bypass.conf << EOF
proxy_set_header x-vercel-protection-bypass ${VERCEL_BYPASS_SECRET};
EOF
    echo "✓ Vercel bypass secret установлен"
  elif [[ -f /etc/nginx/snippets/vercel-bypass.conf ]] && grep -q "x-vercel-protection-bypass" /etc/nginx/snippets/vercel-bypass.conf 2>/dev/null; then
    echo "✓ Bypass secret уже в /etc/nginx/snippets/vercel-bypass.conf"
  else
    cp "${REPO_ROOT}/deploy/nginx/vercel-bypass.conf.snippet" /etc/nginx/snippets/vercel-bypass.conf
    echo "⚠ VERCEL_BYPASS_SECRET не задан — см. docs/proxy-ru-vps.md"
  fi
}

install_nginx_config() {
  require_deploy_files
  mkdir -p /var/www/certbot

  if [[ -f /etc/letsencrypt/live/${NGINX_SITE}/fullchain.pem ]]; then
    cp "${REPO_ROOT}/deploy/nginx/air-cloud-msk.ru.conf" "/etc/nginx/sites-available/${NGINX_SITE}"
  else
    cp "${REPO_ROOT}/deploy/nginx/air-cloud-msk.ru.init.conf" "/etc/nginx/sites-available/${NGINX_SITE}"
  fi

  write_bypass_snippet

  rm -f /etc/nginx/sites-enabled/default
  ln -sf "/etc/nginx/sites-available/${NGINX_SITE}" /etc/nginx/sites-enabled/
}

verify_proxy() {
  local code body strict=false
  if [[ "${FIX_ONLY}" == true ]]; then
    strict=true
  fi

  code="$(curl -sS -o /dev/null -w "%{http_code}" -H "Host: air-cloud-msk.ru" http://127.0.0.1/ 2>/dev/null || echo "000")"
  if [[ "${code}" != "200" && "${code}" != "301" ]]; then
    echo "✗ Локальный прокси: HTTP ${code}"
    return 1
  fi

  if [[ -f /etc/letsencrypt/live/${NGINX_SITE}/fullchain.pem ]]; then
    body="$(curl -sSk -H "Host: air-cloud-msk.ru" https://127.0.0.1/ 2>/dev/null | dd bs=1 count=600 2>/dev/null || true)"
    if echo "${body}" | grep -qi "Security Checkpoint"; then
      echo "⚠ Vercel Security Checkpoint — задайте VERCEL_BYPASS_SECRET (docs/proxy-ru-vps.md)"
      return 1
    fi
    if echo "${body}" | grep -qi "Воздушное\|облако"; then
      echo "✓ HTTPS прокси работает — сайт отдаётся"
      return 0
    fi
  fi

  if [[ "${strict}" == true ]]; then
    echo "✗ Прокси не отдаёт контент сайта"
    return 1
  fi

  echo "✓ HTTP прокси отвечает (${code})"
}

if [[ "${FIX_ONLY}" == true ]]; then
  install_nginx_config
  nginx -t && systemctl reload nginx
  verify_proxy
  exit $?
fi

echo "=== VPS proxy setup: ${NGINX_SITE} ==="
install_packages
install_nginx_config
nginx -t
systemctl enable nginx
systemctl restart nginx
verify_proxy || true

public_ip="$(curl -fsS --max-time 8 https://api.ipify.org 2>/dev/null || true)"
echo ""
echo "Публичный IP VPS: ${public_ip:-?}"
echo ""
echo "DNS в Jino:"
echo "  A     air-cloud-msk.ru  →  ${public_ip}"
echo "  CNAME www               →  air-cloud-msk.ru"
echo ""
echo "SSL (когда DNS обновится):"
echo "  certbot --nginx -d air-cloud-msk.ru -d www.air-cloud-msk.ru"
echo "  затем: VERCEL_BYPASS_SECRET='...' bash setup-vps-proxy.sh --fix"
