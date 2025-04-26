# AIvibLMS API Documentation

## Base URL

All API endpoints are relative to: `https://api.aivib-lms.com/v1`

## Authentication

Most API endpoints require authentication. Include the JWT token in the Authorization header:

```
Authorization: Bearer <your_token>
```

## Endpoints

### Authentication

#### POST /auth/login

Authenticates a user and returns a JWT token.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "123",
    "name": "John Doe",
    "email": "user@example.com",
    "role": "student"
  }
}
```

#### POST /auth/register

Registers a new user.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "user@example.com",
  "password": "password123",
  "role": "student"
}
```

**Response:**
```json
{
  "id": "123",
  "name": "John Doe",
  "email": "user@example.com",
  "role": "student"
}
```

### Courses

#### GET /courses

Returns a list of courses.

**Query Parameters:**
- `page` (optional): Page number for pagination
- `limit` (optional): Number of results per page
- `search` (optional): Search term for course titles

**Response:**
```json
{
  "courses": [
    {
      "id": "456",
      "title": "Introduction to AI",
      "description": "Learn the basics of artificial intelligence",
      "instructor": "Jane Smith",
      "duration": "8 weeks"
    },
    ...
  ],
  "total": 50,
  "page": 1,
  "limit": 10
}
```

#### GET /courses/:id

Returns details for a specific course.

**Response:**
```json
{
  "id": "456",
  "title": "Introduction to AI",
  "description": "Learn the basics of artificial intelligence",
  "instructor": {
    "id": "789",
    "name": "Jane Smith"
  },
  "modules": [
    {
      "id": "mod1",
      "title": "What is AI?",
      "lessons": [...]
    },
    ...
  ],
  "duration": "8 weeks",
  "enrollmentCount": 250,
  "rating": 4.8
}
```

### Users

#### GET /users/me

Returns the profile of the authenticated user.

**Response:**
```json
{
  "id": "123",
  "name": "John Doe",
  "email": "user@example.com",
  "role": "student",
  "enrolledCourses": [
    {
      "id": "456",
      "title": "Introduction to AI",
      "progress": 65
    },
    ...
  ]
}
```

## Error Handling

All endpoints return standard HTTP status codes:

- 200: Success
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error

Error responses include a message:

```json
{
  "error": "Invalid credentials"
}
```
