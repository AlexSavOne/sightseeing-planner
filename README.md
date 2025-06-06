# 🏛️ Прототип системы для планирования посещения достопримечательностей

## 📝 Описание

Проект **"Sightseeing-planner"** представляет собой интерактивное веб-приложение для хранения и управления списком достопримечательностей. Пользователь может добавлять новые места, редактировать существующие, отмечать посещённые объекты.

## 🎯 Цели проекта

- 🗂 Реализация интерфейса для добавления, редактирования и удаления достопримечательностей.

## 🌟 Особенности проекта

- **⚡ Управление списком достопримечательностей**: возможность добавлять новые объекты, редактировать информацию и удалять записи.
- **🔎 Удобный поиск и фильтрация**: быстрое нахождение нужного места по названию или описанию, а также фильтр по статусу посещения.
- **📌 Автоматическая генерация ссылок на карту**: встроенные ссылки на Google Maps/Yandex Maps для удобного просмотра местоположения.
- **💾 Хранение данных в `localStorage`**: список достопримечательностей сохраняется локально, не требуя регистрации или сервера.
- **🎨 Приятный и минималистичный UI**: адаптивный дизайн с использованием `@gravity-ui/uikit`.
- **📸 Открытие изображений**: возможность увеличивать изображения достопримечательностей при клике.
- **✅ Валидация данных**: форма добавления и редактирования достопримечательностей теперь включает валидацию обязательных полей, таких как название, описание, местоположение и координаты (широта и долгота). Сообщения об ошибках отображаются при несоответствии полей.

## 📂 Файловая структура

- **`/src/components`** – основные компоненты интерфейса (`AttractionTable.tsx`, `AttractionForm.tsx`, `AttractionStats.tsx` и др.).
- **`/src/utils`** – вспомогательные функции (`localStorage.ts`, `mapLinks.ts` и др.).
- **`/public`** – статические файлы.
- **`/docs/API_DOCUMENTATION.md`** – документация API проекта.

## 🛠️ Технологии

- **⚛️ React** – разработка интерфейса и управление состоянием компонентов.
- **📚 TypeScript** – статическая типизация для повышения надёжности кода.
- **💅 CSS Modules** – стилизация компонентов.
- **🛠️ Vite** – сборка и оптимизация кода.
- **📦 npm** – управление зависимостями.

## 🚀 Как запустить

1. Склонируйте репозиторий на свой локальный компьютер:

```bash
   git clone git@github.com:AlexSavOne/sightseeing-planner.git
```

2. Перейдите в директорию проекта:

```bash
    cd sightseeing-planner
```

3. Установите зависимости:

```bash
    npm install
```

4. Запустите проект:

```bash
    npm run dev
```

## 📈 Планы на улучшение

- 🔍 **Реализовать фильтрацию и сортировку в таблице достопримечательностей**: добавить возможность сортировать достопримечательности по рейтингу, названию, местоположению и фильтровать их по статусу.
- 📅 **Календарь посещений**: добавление функции планирования посещений с возможностью указывать дату.
- 🛡️ **Покрытие кода тестами (Jest)**: Обеспечить стабильность и качество кода через юнит-тестирование.

## ✅ Чек-лист

- Код отформатирован.
- Реализована форма добавления и редактирования достопримечательностей.
- Реализовано сохранение и загрузка данных о достопримечательностях в `localStorage`.
- Таблица достопримечательностей корректно отображает все данные.
- Ошибки в консоли отсутствуют.
- Изображения загружаются и отображаются правильно, с возможностью увеличения при клике.
- Валидация данных в форме добавления и редактирования достопримечательностей.
- Добавил адаптив для мобилок.
