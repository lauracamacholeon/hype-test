# Hype Board

Full-stack application that processes and displays a YouTube video feed, ranking them by a calculated "Hype Level". Built with NestJS and ReactJS following DDD architecture principles.

## Project Structure

```
hype-test/
├── hype-board-api/        # Backend - NestJS
└── hype-board-client/     # Frontend - React + TypeScript
```

## Tech Stack

### Backend

- NestJS
- TypeScript
- Jest

### Frontend

- React
- TypeScript
- SCSS Modules
- Vitest + Testing Library

---

## Prerequisites

- Node.js v18 or higher
- npm v9 or higher

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/lauracamacholeon/hype-test.git
cd hype-test
```

### 2. Run the Backend

```bash
cd hype-board-api
npm install
npm run start:dev
```

The API will be available at:

```
http://localhost:3000
```

### 3. Run the Frontend

Open a new terminal:

```bash
cd hype-board-client
npm install
npm run dev
```

The app will be available at:

```
http://localhost:5173
```

> Both servers must be running at the same time.

---

## API Endpoints

## Thumbnail Fallback Strategy

The API response includes two thumbnail properties per video:

| Property       | Description                                         |
| -------------- | --------------------------------------------------- |
| `thumbnail`    | Original URL from the YouTube mock data             |
| `thumbnailAlt` | Fallback URL using `placehold.co` as image provider |

The frontend attempts to load `thumbnail` first. If the image fails to load, it automatically switches to `thumbnailAlt`. This was added because the original mock data uses `via.placeholder.com` which is no longer available.

### GET /api/videos

Returns a list of videos sorted by hype level in descending order.

**Response example:**

```json
[
  {
    "id": "vid_030",
    "thumbnail": "https://placehold.co/300x200",
    "thumbnailAlt": "https://placehold.co/300x200",
    "title": "El fin de los programadores por la IA",
    "author": "JuniorDev99",
    "publishedAt": "Hace 2 meses",
    "hype": 0.094
  }
]
```

---

## Hype Level Calculation

| Rule              | Description                                                |
| ----------------- | ---------------------------------------------------------- |
| Base formula      | `(likes + comments) / views`                               |
| Tutorial modifier | If title contains "tutorial" (case insensitive) → hype × 2 |
| Disabled comments | If `commentCount` is missing → hype = 0                    |
| Zero views        | If views = 0 → hype = 0                                    |

---

## Running Tests

### Backend

```bash
cd hype-board-api
npm run test
```

### Frontend

```bash
cd hype-board-client
npm run test
```

---

## Architecture

Both projects follow **Domain-Driven Design (DDD)**:

```
src/
├── domain/          # Entities and contracts
├── application/     # Use cases and business logic
├── infrastructure/  # Data sources and mappers
└── presentation/    # Controllers and UI components
```

---

## Security (Backend)

- Rate limiting: 50 requests per minute per client
- Helmet: HTTP security headers enabled
- CORS: Restricted to `http://localhost:5173`
