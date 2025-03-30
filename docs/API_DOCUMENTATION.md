# 🏛️ Sightseeing-planner REST API Documentation

## 📌 Общая информация

**Базовый URL**: `https://api.sightseeing-planner.com/v1`

**Обязательные заголовки**:

- `Content-Type: application/json`
- `Authorization: Bearer <ваш_токен>`

## 🗺️ Модели данных

### Attraction (Достопримечательность)

| Поле        | Тип    | Описание                        | Обязательное | Пример значения  |
| ----------- | ------ | ------------------------------- | ------------ | ---------------- |
| id          | string | Уникальный идентификатор        | Да           | "3fa85f64-5717"  |
| name        | string | Название                        | Да           | "Эйфелева башня" |
| description | string | Описание                        | Да           | "Знаменитая..."  |
| dateAdded   | string | Дата (YYYY-MM-DD)               | Да           | "2023-10-15"     |
| rating      | number | Рейтинг (1-5)                   | Да           | 5                |
| imageUrl    | string | Ссылка на изображение           | Нет          | "https://..."    |
| location    | string | Местоположение                  | Да           | "Париж, Франция" |
| latitude    | number | Широта                          | Нет          | 48.8584          |
| longitude   | number | Долгота                         | Нет          | 2.2945           |
| status      | string | Статус ("в планах"/"осмотрена") | Да           | "в планах"       |

## 🔧 Endpoints

### 1. 🔍 Получить список

`GET /attractions`

**Параметры**:

- `search` - поиск по названию/описанию
- `hideVisited` - boolean (true/false)
- `sortBy` - поле сортировки (name/rating/dateAdded)
- `sortOrder` - порядок (asc/desc)

### 2. ➕ Создать

`POST /attractions`

**Тело запроса**:

```json
{
  "name": "string",
  "description": "string",
  "rating": number,
  "location": "string",
  "imageUrl": "string",
  "latitude": number,
  "longitude": number
}
```

### 3. ✏️ Обновить

`PUT /attractions/{id}`

**Тело запроса (все поля опциональны):**

```json
{
  "name": "string",
  "description": "string",
  "rating": number,
  "location": "string",
  "imageUrl": "string",
  "latitude": number,
  "longitude": number,
  "status": "string"
}
```

### 4. ❌ Удалить

`DELETE /attractions/{id}`

### 5. 🔄 Изменить статус

`PATCH /attractions/{id}/status`

**Тело запроса:**

```json
{
  "status": "в планах/осмотрена"
}
```

### 6. 📊 Статистика

`GET /attractions/stats`

**Ответ**

```json
{
  "total": number,
  "visited": number,
  "planned": number
}
```

## 🔐 Аутентификация

`POST /auth/login`

**Тело запроса:**

```json
{
  "email": "string",
  "password": "string"
}
```

**Ответ:**

```json
{
  "token": "string",
  "user": {
    "id": "string",
    "email": "string",
    "isAdmin": boolean
  }
}
```

## 🚨 Ошибки

**Формат:**

```json
{
  "error": {
    "code": number,
    "message": "string"
  }
}
```

**Коды:**

- 400 - Неверный запрос
- 401 - Не авторизован
- 403 - Доступ запрещён
- 404 - Не найдено
- 500 - Ошибка сервера
