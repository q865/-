# Российский VPS-прокси для air-cloud-msk.ru

Если без VPN не открываются Vercel и Cloudflare — **VPS в РФ** с Nginx reverse proxy.

```
Телефон → 147.45.215.60 (VPS) → air-cloud-msk.vercel.app (Vercel)
```

Сайт на Vercel **не переносится** — VPS только проксирует трафик.

---

## 1. VPS в Jino

- Ubuntu 22.04+
- **Выделенный IP** (обязательно)
- Регион: Новосибирск / Москва — для прокси разница небольшая

Текущий VPS: `147.45.215.60`

---

## 2. Nginx на VPS

Скопируйте конфиги на VPS и запустите скрипт:

```bash
scp -r deploy/nginx scripts/setup-vps-proxy.sh root@147.45.215.60:/root/air-cloud-msk/
ssh root@147.45.215.60 'bash /root/air-cloud-msk/scripts/setup-vps-proxy.sh'
```

Или на VPS напрямую, если репозиторий уже склонирован.

---

## 3. DNS в Jino

[Панель DNS](https://old-cp.jino.ru/domains/air-cloud-msk.ru/dns/)

| Тип | Хост | Значение |
|-----|------|----------|
| **A** | `air-cloud-msk.ru` | `147.45.215.60` |
| **CNAME** | `www` | `air-cloud-msk.ru` |

Nginx отдаёт **301** с `www` на apex (`https://air-cloud-msk.ru/...`).

**Удалить:**
- A → `64.29.17.1`, `216.198.79.1` (Vercel)
- A → `62.217.189.112` (домашний Pi)
- CNAME `www` → `cname.vercel-dns.com`

Проверка: `dig +short air-cloud-msk.ru A @8.8.8.8` → только `147.45.215.60`

---

## 4. SSL

Когда DNS указывает на VPS:

```bash
ssh root@147.45.215.60
certbot --nginx -d air-cloud-msk.ru -d www.air-cloud-msk.ru
```

---

## 5. Vercel Security Checkpoint (403)

Nginx доходит до Vercel, но Vercel отдаёт **«Vercel Security Checkpoint»** — защита от прокси/DDoS.

### Вариант A — System Bypass (Pro/Enterprise)

1. [Vercel Dashboard](https://vercel.com) → проект **air-cloud-msk**
2. **Firewall** → **Configure**
3. **System Bypass Rules** → добавить IP **`147.45.215.60`**

### Вариант B — Protection Bypass (любой план)

1. Vercel → **Settings** → **Deployment Protection**
2. **Protection Bypass for Automation** → сгенерировать секрет
3. На VPS:

```bash
VERCEL_BYPASS_SECRET='ваш-секрет' bash /root/air-cloud-msk/scripts/setup-vps-proxy.sh --fix
```

Секрет попадёт в `/etc/nginx/snippets/vercel-bypass.conf` как заголовок `x-vercel-protection-bypass`.

---

## 6. Проверка

С телефона на **мобильном интернете** (без VPN):

- https://air-cloud-msk.ru
- https://www.air-cloud-msk.ru

С Pi:

```bash
npm run dns:check           # DNS → VPS
npm run connectivity:check  # HTTP 200, без Security Checkpoint
```

### Обслуживание VPS

Проверка конфига Nginx:

```bash
ssh root@147.45.215.60
cat /etc/nginx/snippets/vercel-bypass.conf
nginx -t && systemctl status nginx
```

---

## 7. Яндекс: «ошибка сервера» при живом сайте

Вебмастер иногда пишет «Не удалось подключиться из-за ошибки сервера», хотя сайт открывается у людей.
Частая причина — **Vercel Security Checkpoint** или таймаут upstream, когда робот ходит через VPS.

Проверка с VPS:

```bash
curl -sI -o /dev/null -w "%{http_code}\n" -H "Host: air-cloud-msk.vercel.app" https://air-cloud-msk.vercel.app/
curl -sI -o /dev/null -w "%{http_code}\n" -A "Mozilla/5.0 (compatible; YandexBot/3.0; +http://yandex.com/bots)" https://air-cloud-msk.ru/
```

Оба ответа должны быть **200**, без HTML «Vercel Security Checkpoint».
Если 403 — вернитесь к разделу 5 (System Bypass / Protection Bypass).

После правки конфига:

```bash
scp deploy/nginx/air-cloud-msk.ru.conf root@147.45.215.60:/etc/nginx/sites-available/air-cloud-msk.ru
ssh root@147.45.215.60 'nginx -t && systemctl reload nginx'
```

---

## Важно

- В nginx **Host** к Vercel = `air-cloud-msk.vercel.app` (не `air-cloud-msk.ru`)
- Домены в Vercel **оставьте** — они нужны для деплоя
- Raspberry Pi для прокси **не нужен** (CGNAT у Lovitel)
