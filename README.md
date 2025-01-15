# Task Management Application

A full-featured task management application built with the MERN stack (MongoDB, Express, React, Node.js , TypeScript ) and Turborepo. This application provides a beautiful Kanban board interface and allows users to create, read, update, and delete tasks effortlessly.

---

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Running the Project](#running-the-project)
  - [Backend](#backend)
  - [Frontend](#frontend)
- [Backend APIs](#backend-apis)
  - [Authentication APIs](#authentication-apis)
  - [Task Management APIs](#task-management-apis)
- [Mock JSON for Postman](#mock-json-for-postman)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- User authentication (Sign Up & Sign In Using JWT).
- Kanban board for task organization.
- CRUD functionality for tasks.
- Real-time updates.
- TypeScript for type safety and better maintainability.

---

## Installation

To get started with the project, follow these steps:

### 1. Clone the repository
```bash
git clone https://github.com/Arham689/task-manager-stuffpie.git
cd task-manager 
or download the code
```

### 2. Install dependencies for the backend
Navigate to the backend directory and install the dependencies:
```bash
cd apps/server
npm install
```

### 3. Install dependencies for the frontend
Navigate to the frontend directory and install the dependencies:
```bash
cd ../client
npm install
```

---

### Otherwise run this in root directory
```bash
npm install
npm run dev
```



## Running the Project

### Backend

#### 1. Set up environment variables
Create a `.env` file in the `apps/server` directory and add the following variables:
```env
MONGODB_URI=mongodb://localhost:27017/mydatabase
PORT=4000
```

####  Set up environment variables for frontend
Create a `.env` file in the `apps/client` directory and add the following variables:
```env
VITE_BASE_API_URL="http://localhost:4000/api/v1"
```

#### 2. Run the backend server
Navigate to the backend directory and start the server:
```bash
cd apps/server
npm run dev
```

### Frontend

#### Run the frontend application
Open a new terminal, navigate to the frontend directory, and start the React application:
```bash
cd apps/client
npm run dev
```

#### Access the application
Open your browser and navigate to:
[http://localhost:5173](http://localhost:5173)

---

## Backend APIs

### Authentication APIs

#### Sign Up
- **Endpoint:** `POST /api/v1/auth/signup`
- **Request Body:**
  ```json
  {
    "username": "testuser",
    "email": "testuser@example.com",
    "password": "password123"
  }
  ```

#### Sign In
- **Endpoint:** `POST /api/v1/auth/signin`
- **Request Body:**
  ```json
  {
    "email": "testuser@example.com",
    "password": "password123"
  }
  ```

### Task Management APIs

#### Get All Tasks
- **Endpoint:** `GET /api/v1/tasks`
- **Response:**
  ```json
  [
    {
      "_id": "1",
      "title": "Sample Task",
      "description": "This is a sample task description.",
      "status": "TODO",
    }
  ]
  ```

#### Create a Task
- **Endpoint:** `POST /api/v1/tasks`
- **Request Body:**
  ```json
  {
    "title": "New Task",
    "description": "Description of the new task.",
  }
  ```

#### Update a Task
- **Endpoint:** `PUT /api/v1/tasks/:id`
- **Request Body:**
  ```json
  {
    "title": "Updated Task",
    "description": "Updated description.",
  }
  ```

#### Delete a Task
- **Endpoint:** `DELETE /api/v1/tasks/:id`

---

## Mock JSON for Postman

### Sign Up Mock Request
```json
{
  "username": "testuser",
  "email": "testuser@example.com",
  "password": "password123"
}
```

### Sign In Mock Request
```json
{
  "email": "testuser@example.com",
  "password": "password123"
}
```

### Create Task Mock Request
```json
{
  "title": "New Task",
  "description": "Description of the new task.",
  "status": "TODO",
  "tags": []
}
```

### Update Task Mock Request
```json
{
  "title": "Updated Task",
  "description": "Updated description.",
  "status": "IN_PROGRESS"
}
```

---

## run the server using docker  
 open the docker dashboard app local 
 then in the project go to apps/server 
 ```bash
    docker-compose up --build
```
 
## Scope of improvment 


1. Better folder structure
2. using state management
3. better error handling
4. making a async handler 
5. better types
6. can creat custome hooks
7. Tets can be written using jest
