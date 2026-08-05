# Мини-приложение «Чат с консультантом»

Реализация тестового задания на стек **Next.js (App Router)**, **TypeScript**, **TanStack Query (React Query)**, **Tailwind CSS**, **Zustand** и **WebSocket**.

---

## 🚀 Быстрый запуск

### 1. Установка зависимостей
```bash
npm install
```

### 2. Запуск WebSocket echo-сервера (порт 8081)
В отдельном терминале:
```bash
npm run ws-server
# или: node server.js
```

### 3. Запуск веб-приложения Next.js
В другом терминале:
```bash
npm run dev
```

Откройте браузер по адресу: [http://localhost:3000/chat](http://localhost:3000/chat)

---

## 🏗 Архитектурные решения и границы (Server / Client Components)

При разработке приложения было проведено четкое разделение ответственности между сервером и клиентом:

### 1. Серверные компоненты (Server Components)
- **`src/app/chat/page.tsx`**:
  - **Почему на сервере?** По условию ТЗ список встреч должен быть доступен даже при выключенном JavaScript в браузере. Страница выполняет предварительный забор данных (SSR prefetch) и рендерит готовую HTML-структуру.
  - На сервере выполняется `prefetchQuery` через `HydrationBoundary`, благодаря чему первичное состояние гидрируется в TanStack Query на клиенте без повторного сетевого запроса при первой загрузке.

### 2. Клиентские компоненты (Client Components)
- **`src/components/meetings/MeetingsList.tsx`**:
  - **Почему на клиенте?** Компонент использует хук `useQuery` из TanStack Query. Кнопка «Обновить» выполняет клиентский перезапрос `refetch()` к Route Handler `GET /api/meetings` без перезагрузки всей страницы.
- **`src/components/chat/ChatContainer.tsx` & `src/stores/useChatStore.ts`**:
  - **Почему на клиенте?** Браузерное API `WebSocket`, интерактивный ввод текста, управление состоянием соединения (`connected`, `connecting`, `disconnected`), авто-переподключение, оптимистичное отображение сообщений и очередь неотправленных сообщений зависят от жизненного цикла клиента в браузере.

---

## 📊 Структура проекта

```text
consultant-chat/
├── server.js                    # Echo-сервер WebSocket (Node.js + ws, порт 8081)
├── src/
    ├── app/
    │   ├── api/meetings/route.ts# Route Handler GET /api/meetings (все статусы встреч)
    │   ├── chat/page.tsx        # SSR страница /chat (Layout на всю высоту экрана)
    │   ├── layout.tsx           # Корневой макет (Inter шрифт, dark тема)
    │   ├── providers.tsx        # QueryClientProvider (TanStack Query v5)
    │   └── globals.css          # Дизайн-система, glassmorphism и скроллбары
    ├── components/
    │   ├── chat/                # Чат (ChatHeader, MessageList, MessageItem, Input, Status)
    │   └── meetings/            # Встречи (MeetingsList, MeetingCard, MeetingStatusBadge)
    ├── lib/
    │   ├── get-query-client.ts  # Изолированный фабричный QueryClient для SSR
    │   └── utils.ts             # Утилиты cn, formatDate и единый formatTime (ru-RU)
    ├── stores/
    │   └── useChatStore.ts      # Zustand стор для WS, очередей повторов и реконнекта
    └── types/
        ├── chat.ts              # Типы сообщений и соединений
        └── meeting.ts           # Типы встреч (scheduled, in_progress, completed, cancelled)
```

---

## 🛠 Выполненные требования и особенности реализации

1. **Список встреч (SSR + TanStack Query)**:
   - Моковый эндпоинт `GET /api/meetings` с поддержкой всех статусов (`scheduled`, `in_progress` с анимированным пульсом, `completed`, `cancelled`).
   - Серверный рендеринг (работает даже без JS в браузере).
   - Кнопка «Обновить» перезапрашивает встречи через TanStack Query без перезагрузки страницы.

2. **Чат поверх WebSocket**:
   - Работает с echo-сервером (`node server.js`).
   - Отправленное сообщение сразу появляется в ленте (оптимистично).
   - Индикация статуса («В сети», «Соединение...», «Нет связи»).
   - Неотправленные сообщения при сбое помечаются и отправляются автоматически при реконнекте или по кнопке «Повторить».
   - Автоматическое переподключение при разрыве.
