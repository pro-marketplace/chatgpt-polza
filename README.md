# ChatGPT Extension

Генерация текста через ChatGPT (GPT-4o, GPT-4, GPT-3.5) с виджетом-песочницей.

> **Провайдер:** Polza.ai
> **Модели:** GPT-4o, GPT-4o Mini, GPT-4 Turbo, GPT-4, GPT-3.5 Turbo
> Работает без VPN из России.

---

## ВАЖНО ДЛЯ АССИСТЕНТА

**Пользователя нужно провести пошагово, лично, по каждому этапу настройки!**

Не просто скидывай инструкцию — а веди за руку:
1. Спроси, есть ли аккаунт на Polza.ai
2. Помоги создать API ключ
3. Помоги пополнить баланс
4. Задеплой функцию
5. Добавь виджет на фронтенд
6. Протестируй вместе с пользователем

---

## Чеклист установки

### Шаг 1: Регистрация на Polza.ai

**Скажи пользователю:**

> Для работы ChatGPT нам нужен аккаунт на Polza.ai — это российский провайдер доступа к нейросетям.
>
> **1. Перейдите на [polza.ai](https://polza.ai) и зарегистрируйтесь**
>
> После регистрации вы попадёте в личный кабинет.
>
> Готово? Скажите, и перейдём к созданию API ключа.

### Шаг 2: Создание API ключа

**Скажи пользователю:**

> Отлично! Теперь создадим API ключ:
>
> **1. Перейдите в [Ключи API](https://polza.ai/dashboard/api-keys)**
>
> **2. Нажмите "Создать API ключ"**
>
> **3. Скопируйте ключ** (он начинается с `ak_`)
>
> Ключ показывается только один раз! Сохраните его в надёжном месте.
>
> Пришлите мне ваш API ключ, и я добавлю его в секреты проекта.

### Шаг 3: Пополнение баланса

**Скажи пользователю:**

> API ключ создан! Осталось пополнить баланс:
>
> **1. Перейдите в [Платежи](https://polza.ai/dashboard/billing)**
>
> **2. Выберите способ оплаты и сумму**
>
> Минимальная сумма: 100 рублей. Для тестирования этого более чем достаточно.
>
> Пополнили? Тогда переходим к деплою!

### Шаг 4: Добавление секретов

**Вызови тулу `put_secret`:**

```python
put_secret("POLZA_AI_API_KEY", "<ключ от пользователя>")
```

### Шаг 5: Деплой функции

Задеплой функцию из `/backend/chatgpt/`:
- Точка входа: `index.handler`
- Runtime: Python 3.11+

### Шаг 6: Добавление виджета на фронтенд

**Создай страницу с ChatGPT:**

```tsx
// app/chatgpt/page.tsx
"use client";

import { ChatGPTPlaygroundPage } from "@/components/ChatGPTPlaygroundPage";

const API_URL = "https://functions.poehali.dev/xxx-chatgpt";

export default function Page() {
  return (
    <ChatGPTPlaygroundPage
      apiUrl={API_URL}
      defaultModel="openai/gpt-4o-mini"
    />
  );
}
```

### Шаг 7: Тестирование

**Скажи пользователю:**

> Готово! Давайте проверим:
>
> 1. Откройте `/chatgpt` на вашем сайте
> 2. Напишите любое сообщение
> 3. Должен прийти ответ от ChatGPT
>
> Всё работает?

---

## API

```
POST ?action=generate   — генерация текста
GET  ?action=models     — список моделей
POST ?action=test       — тест соединения
```

### action=generate

```json
{
  "messages": [
    {"role": "user", "content": "Привет!"}
  ],
  "model": "openai/gpt-4o-mini",
  "temperature": 0.7,
  "max_tokens": 1000
}
```

**Ответ:**

```json
{
  "success": true,
  "content": "Привет! Чем могу помочь?",
  "model": "openai/gpt-4o-mini",
  "usage": {
    "prompt_tokens": 10,
    "completion_tokens": 15,
    "total_tokens": 25
  }
}
```

### action=models

```json
{
  "success": true,
  "models": [
    {"id": "openai/gpt-4o", "name": "GPT-4o", "description": "Most capable model"},
    {"id": "openai/gpt-4o-mini", "name": "GPT-4o Mini", "description": "Fast and affordable"}
  ],
  "provider": "polza.ai"
}
```

### action=test

```json
{
  "model": "openai/gpt-4o-mini"
}
```

**Ответ:**

```json
{
  "success": true,
  "message": "ChatGPT connection successful",
  "response": "OK",
  "model": "openai/gpt-4o-mini"
}
```

---

## Frontend компоненты

| Файл | Описание |
|------|----------|
| `useChatGPT.ts` | Хук для работы с ChatGPT API |
| `ChatGPTPlayground.tsx` | Виджет-песочница с чатом |
| `ChatGPTPlaygroundPage.tsx` | Готовая страница для роутера |

### useChatGPT

```tsx
const { generate, getModels, testConnection, isLoading, error } = useChatGPT({
  apiUrl: "https://functions.poehali.dev/xxx-chatgpt"
});

// Генерация текста
const result = await generate({
  messages: [{ role: "user", content: "Привет!" }],
  model: "openai/gpt-4o-mini",
  temperature: 0.7,
});

if (result.success) {
  console.log(result.content);
}
```

### ChatGPTPlayground

```tsx
<ChatGPTPlayground
  apiUrl="https://functions.poehali.dev/xxx-chatgpt"
  defaultModel="openai/gpt-4o-mini"
  systemPrompt="Ты полезный ассистент."
  title="ChatGPT"
  placeholder="Напишите сообщение..."
/>
```

---

## Доступные модели

| ID | Название | Описание |
|----|----------|----------|
| `openai/gpt-4o` | GPT-4o | Самая мощная модель |
| `openai/gpt-4o-mini` | GPT-4o Mini | Быстрая и доступная |
| `openai/gpt-4-turbo` | GPT-4 Turbo | Сбалансированная |
| `openai/gpt-4` | GPT-4 | Оригинальная GPT-4 |
| `openai/gpt-3.5-turbo` | GPT-3.5 Turbo | Бюджетная модель |

---

## Секреты

```python
put_secret("POLZA_AI_API_KEY", "<API ключ от Polza.ai>")
```

---

## Кастомизация

### System Prompt

Добавь системный промпт для кастомизации поведения:

```tsx
<ChatGPTPlayground
  apiUrl={API_URL}
  systemPrompt="Ты — помощник интернет-магазина. Отвечай только на вопросы о товарах и заказах."
/>
```

### Встраивание в существующую страницу

```tsx
import { ChatGPTPlayground } from "@/components/ChatGPTPlayground";

export default function ProductPage() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <ProductInfo />
      <div className="h-[600px]">
        <ChatGPTPlayground
          apiUrl={API_URL}
          systemPrompt="Помоги пользователю выбрать товар."
          title="Консультант"
        />
      </div>
    </div>
  );
}
```

---

## Стоимость

Polza.ai тарифицирует по токенам. Цены зависят от модели.

**Актуальные цены и список моделей:** [polza.ai/models](https://polza.ai/models)
