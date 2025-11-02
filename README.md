<div align="center">

# 📝 Blog API Prisma TS

A modern RESTful API built with Express.js, Prisma ORM, and PostgreSQL for managing users and blog posts.

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

[Features](#-features) • [Tech Stack](#-tech-stack) • [Getting Started](#-getting-started) • [API Documentation](#-api-documentation) • [Project Structure](#-project-structure)

</div>

---

## ✨ Features

- 🚀 **RESTful API** with Express.js and TypeScript
- 🗄️ **Prisma ORM** for type-safe database access
- 🐘 **PostgreSQL** database (NeonDB)
- 🔄 **CRUD Operations** for Users and Posts
- 📄 **Pagination Support** for listing posts
- 🔗 **Relational Queries** (User with Posts, Post with Author)
- ✅ **Input Validation** and proper error handling
- 🎯 **Typed Responses** with utility helpers
- 🔧 **Global Error Handler** with Prisma error mapping
- 📝 **Clean Code Architecture** (Controllers, Routes, Middlewares)
- 🌿 **Git Best Practices** (feature branches, semantic commits)

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **TypeScript** | Type-safe JavaScript |
| **Node.js** | Runtime environment |
| **Express.js** | Web framework |
| **Prisma** | ORM for database operations |
| **PostgreSQL** | Relational database |
| **tsx** | TypeScript execution |

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL database (or NeonDB account)
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd blog-api
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   # Create .env file
   cp .env.example .env

   # Add your database URL
   DATABASE_URL="postgresql://user:password@host:port/database"
   ```

4. **Run database migrations**

   ```bash
   npx prisma migrate dev
   ```

5. **Generate Prisma Client**

   ```bash
   npx prisma generate
   ```

6. **Start development server**

   ```bash
   npm run dev
   ```

Server will start at `http://localhost:3000` 🎉

---

## 📚 API Documentation

### Base URL

```
http://localhost:3000/api
```

### 👤 User Endpoints

#### Create User

```http
POST /api/users
```

**Request Body:**

```json
{
  "email": "john@example.com",
  "name": "John Doe"
}
```

**Response:** `201 Created`

```json
{
  "success": true,
  "data": {
    "id": 1,
    "email": "john@example.com",
    "name": "John Doe",
    "createdAt": "2025-01-15T10:30:00.000Z"
  }
}
```

---

#### Get All Users

```http
GET /api/users
```

**Response:** `200 OK`

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "email": "john@example.com",
      "name": "John Doe",
      "createdAt": "2025-01-15T10:30:00.000Z"
    }
  ]
}
```

---

#### Get User by ID

```http
GET /api/users/:id
```

**Response:** `200 OK`

```json
{
  "success": true,
  "data": {
    "id": 1,
    "email": "john@example.com",
    "name": "John Doe",
    "createdAt": "2025-01-15T10:30:00.000Z",
    "posts": [
      {
        "id": 1,
        "title": "My First Post",
        "published": true
      }
    ]
  }
}
```

---

### 📝 Post Endpoints

#### Create Post

```http
POST /api/posts
```

**Request Body:**

```json
{
  "title": "My First Blog Post",
  "content": "This is the content of my first post.",
  "authorId": 1
}
```

**Response:** `201 Created`

```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "My First Blog Post",
    "content": "This is the content of my first post.",
    "published": false,
    "authorId": 1,
    "createdAt": "2025-01-15T10:35:00.000Z",
    "updatedAt": "2025-01-15T10:35:00.000Z"
  }
}
```

---

#### Get All Posts (with Pagination)

```http
GET /api/posts?page=1&limit=10
```

**Query Parameters:**

- `page` (optional, default: 1)
- `limit` (optional, default: 10)

**Response:** `200 OK`

```json
{
  "success": true,
  "data": {
    "posts": [
      {
        "id": 1,
        "title": "My First Blog Post",
        "content": "This is the content...",
        "published": false,
        "createdAt": "2025-01-15T10:35:00.000Z",
        "author": {
          "id": 1,
          "name": "John Doe",
          "email": "john@example.com"
        }
      }
    ],
    "pagination": {
      "total": 25,
      "page": 1,
      "limit": 10,
      "totalPages": 3
    }
  }
}
```

---

#### Get Post by ID

```http
GET /api/posts/:id
```

**Response:** `200 OK`

```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "My First Blog Post",
    "content": "This is the content of my first post.",
    "published": false,
    "createdAt": "2025-01-15T10:35:00.000Z",
    "updatedAt": "2025-01-15T10:35:00.000Z",
    "author": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com"
    }
  }
}
```

---

#### Update Post

```http
PUT /api/posts/:id
```

**Request Body:**

```json
{
  "title": "Updated Title",
  "content": "Updated content",
  "published": true
}
```

**Response:** `200 OK`

```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Updated Title",
    "content": "Updated content",
    "published": true,
    "updatedAt": "2025-01-15T11:00:00.000Z"
  }
}
```

---

#### Delete Post

```http
DELETE /api/posts/:id
```

**Response:** `200 OK`

```json
{
  "success": true,
  "message": "Post deleted successfully"
}
```

---

### ❌ Error Responses

All error responses follow this format:

```json
{
  "success": false,
  "error": "Error message here"
}
```

**Common Error Codes:**

- `400` - Bad Request (validation errors)
- `404` - Not Found
- `409` - Conflict (e.g., duplicate email)
- `500` - Internal Server Error

---

## 📁 Project Structure

```
blog-api/
├── prisma/
│   ├── migrations/          # Database migrations
│   └── schema.prisma        # Prisma schema
├── src/
│   ├── config/
│   │   └── prisma.config.ts # Prisma client singleton
│   ├── controllers/
│   │   ├── user.controller.ts
│   │   └── post.controller.ts
│   ├── middlewares/
│   │   └── errorHandler.ts  # Global error handler
│   ├── routes/
│   │   ├── user.routes.ts
│   │   └── post.routes.ts
│   ├── utils/
│   │   └── response.util.ts # Typed response helpers
│   └── index.ts             # Express app entry
├── .env                     # Environment variables
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🗄️ Database Schema

```prisma
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String
  posts     Post[]
  createdAt DateTime @default(now())
}

model Post {
  id        Int      @id @default(autoincrement())
  title     String
  content   String
  published Boolean  @default(false)
  authorId  Int
  author    User     @relation(fields: [authorId], references: [id], onDelete: Cascade)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

**Relationships:**

- One User → Many Posts (One-to-Many)
- Cascade delete: Deleting a user deletes all their posts

---

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start development server with hot reload

# Build
npm run build        # Compile TypeScript to JavaScript

# Production
npm start            # Run compiled JavaScript

# Database
npx prisma migrate dev    # Create and apply migrations
npx prisma generate       # Generate Prisma Client
npx prisma studio         # Open Prisma Studio (GUI)
npx prisma db push        # Push schema without migrations
```


## 🐛 Error Handling

### Prisma Error Codes

| Code | Meaning | HTTP Status |
|------|---------|-------------|
| `P2002` | Unique constraint violation | `409 Conflict` |
| `P2003` | Foreign key constraint failed | `400 Bad Request` |
| `P2025` | Record not found | `404 Not Found` |

### Custom Error Handler

```typescript
// Global error middleware catches all errors
app.use(errorHandler);

// Prisma-specific errors are mapped to proper HTTP responses
// Generic errors return 500 with sanitized message
```

---

## 🧪 Testing

**Manual Testing:**

1. Use **Postman** or **Thunder Client** (VS Code extension)
2. Import the collection (if provided)
3. Test all endpoints with various scenarios

**Test Scenarios:**

- ✅ Valid requests
- ✅ Missing fields
- ✅ Duplicate entries
- ✅ Invalid IDs
- ✅ Pagination edge cases

---

## 🚀 Deployment

### Environment Variables

Required environment variables for production:

```env
DATABASE_URL="postgresql://..."
PORT=3000
```

### Deployment Platforms

- **Railway** - Easiest (auto-detects Prisma)
- **Render** - Free tier available
- **Vercel** - Serverless (requires adapter)
- **Heroku** - Classic choice

---

## 📝 TODO / Future Enhancements

- [ ] Add authentication (JWT)
- [ ] Add input validation with Zod
- [ ] Add search functionality
- [ ] Add filtering by published status
- [ ] Add sorting options
- [ ] Add rate limiting
- [ ] Add API documentation with Swagger
- [ ] Add unit tests (Jest)
- [ ] Add integration tests
- [ ] Add Docker support

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feat/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feat/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Kaushik**

- GitHub: [@dvlprkaushik](https://github.com/dvlprkaushik/)
- Email: <dvlprkaushik@gmail.com>

---

## 🙏 Acknowledgments

- [Prisma](https://www.prisma.io/) for the amazing ORM
- [Express.js](https://expressjs.com/) for the web framework
- [NeonDB](https://neon.tech/) for serverless PostgreSQL

---

<div align="center">

Made with ❤️ and TypeScript

⭐ Star this repo if you found it helpful!

</div>
