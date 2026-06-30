# Air Cloud MSK

Сайт-каталог композиций из гелевых шаров с админ-панелью.

## Возможности

- Каталог товаров с категориями
- Карточки товаров с кнопками заказа в Telegram, VK, MAX и по телефону
- Форма заявки
- Админка: товары, категории, заявки, настройки сайта
- Загрузка фото товаров

## Локальный запуск

```bash
npm install
npm run db:push
npm run db:seed
npm run dev
```

Сайт: http://localhost:3000  
Админка: http://localhost:3000/admin/login

**Данные для входа по умолчанию** (из `.env`):
- Email: `admin@air-cloud-msk.ru`
- Пароль: `admin123` — **смените перед деплоем!**

## Деплой на Vercel

1. Создайте проект на [Supabase](https://supabase.com) (PostgreSQL)
2. В `prisma/schema.prisma` смените `provider = "sqlite"` на `provider = "postgresql"`
3. Укажите `DATABASE_URL` из Supabase в переменных Vercel
4. Задайте `AUTH_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `NEXTAUTH_URL=https://air-cloud-msk.ru`
5. Задеплойте репозиторий на [Vercel](https://vercel.com)
6. Выполните миграцию: `npx prisma db push` (локально с production DATABASE_URL) или через Vercel CLI
7. Запустите seed: `npm run db:seed`

### Привязка домена air-cloud-msk.ru (Jino)

В панели DNS Jino:

| Запись | Значение |
|--------|----------|
| `air-cloud-msk.ru` A | `76.76.21.21` |
| `www` CNAME | `cname.vercel-dns.com` |

В Vercel → Settings → Domains добавьте `air-cloud-msk.ru` и `www.air-cloud-msk.ru`.

## Контакты бизнеса

- Telegram: https://t.me/air_cloud_msk
- VK: https://vk.ru/vozdushnyesharymsk
- Телефон: +7 (965) 295-59-56
- MAX: добавьте ссылку на профиль в админке → Настройки

## Структура

- `/` — главная
- `/catalog` — каталог
- `/product/[slug]` — товар
- `/how-to-order` — как заказать
- `/contacts` — контакты
- `/admin` — админ-панель
