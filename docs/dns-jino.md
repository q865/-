# DNS в Jino для air-cloud-msk.ru

Пошаговая настройка, чтобы сайт на Vercel открывался по домену.

**Панель:** [Jino → Домены → air-cloud-msk.ru → DNS](https://old-cp.jino.ru/domains/air-cloud-msk.ru/dns/)

---

## Что должно быть в итоге

```
air-cloud-msk.ru          A      64.29.17.1
air-cloud-msk.ru          A      216.198.79.1
www.air-cloud-msk.ru      CNAME  cname.vercel-dns.com
```

Записи **CAA** и **NS** (ns1–4.jino.ru) — не трогать.

---

## Шаг 1 — Удалить лишнее

Удалите, если есть:

| Запись | Почему |
|--------|--------|
| `*.air-cloud-msk.ru` → A → `216.198.79.1` | Wildcard мешает www |
| `www` → A → любой IP | www должен быть CNAME, не A |
| `air-cloud-msk.ru` → A → `81.177.141.15` | Старый IP Jino-хостинга |

Запись `proxy.air-cloud-msk.ru` можно оставить, если используете прокси; иначе удалите.

---

## Шаг 2 — Две A-записи для корня

Если уже есть `air-cloud-msk.ru` → `64.29.17.1` — **оставьте**.

Добавьте **вторую** A-запись:

| Поле | Значение |
|------|----------|
| Домен / хост | `air-cloud-msk.ru` (или пусто / `@`) |
| Тип | **A** |
| Значение | `216.198.79.1` |

---

## Шаг 3 — CNAME для www

**Добавить запись:**

| Поле | Значение |
|------|----------|
| Домен / хост | `www` |
| Тип | **CNAME** |
| Значение | `cname.vercel-dns.com` |

Не используйте A-запись для www.

---

## Шаг 4 — Vercel

1. [Vercel → air-cloud-msk → Settings → Domains](https://vercel.com)
2. Должны быть: `air-cloud-msk.ru` и `www.air-cloud-msk.ru`
3. Статус **Valid** (после DNS нажмите Refresh)

---

## Шаг 5 — Проверка

Подождите 15–60 минут, затем в репозитории:

```bash
npm run dns:check
```

Или вручную без VPN:
- https://air-cloud-msk.ru
- https://www.air-cloud-msk.ru

---

## Сайт всё равно не открывается из России без VPN

IP Vercel иногда блокируют российские провайдеры. DNS это не исправит.

**Запасной план:** VPS в РФ (Jino/Timeweb) + Nginx reverse proxy на `air-cloud-msk.vercel.app`, A-записи домена → IP российского сервера.

Подробнее — [proxy-ru-vps.md](proxy-ru-vps.md). Проверка: `npm run dns:check` (режим vps) и `npm run connectivity:check`.
