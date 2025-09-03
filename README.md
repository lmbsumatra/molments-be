---

# **User API Documentation**

Base URL: `http://localhost:5000/api/users`

---

## 1. **Create User**

### **Endpoint**

```
POST /api/users
```

### **Description**

Creates a new user in the database.

### **Request Body (JSON)**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "age": 30
}
```

### **Response (201 Created)**

```json
{
  "_id": "64f9ef1f4d5d2c15e1e8b1a7",
  "name": "John Doe",
  "email": "john@example.com",
  "age": 30,
  "createdAt": "2025-09-03T12:00:00.000Z",
  "updatedAt": "2025-09-03T12:00:00.000Z",
  "__v": 0
}
```

---

## 2. **Get All Users**

### **Endpoint**

```
GET /api/users
```

### **Description**

Returns a list of all users.

### **Response (200 OK)**

```json
[
  {
    "_id": "64f9ef1f4d5d2c15e1e8b1a7",
    "name": "John Doe",
    "email": "john@example.com",
    "age": 30,
    "createdAt": "2025-09-03T12:00:00.000Z",
    "updatedAt": "2025-09-03T12:00:00.000Z",
    "__v": 0
  }
]
```

---

## 3. **Get Single User**

### **Endpoint**

```
GET /api/users/:id
```

### **Description**

Returns a single user by ID.

### **Path Params**

| Param | Type   | Description      |
| ----- | ------ | ---------------- |
| `id`  | string | MongoDB ObjectId |

### **Response (200 OK)**

```json
{
  "_id": "64f9ef1f4d5d2c15e1e8b1a7",
  "name": "John Doe",
  "email": "john@example.com",
  "age": 30,
  "createdAt": "2025-09-03T12:00:00.000Z",
  "updatedAt": "2025-09-03T12:00:00.000Z",
  "__v": 0
}
```

### **Response (404 Not Found)**

```json
{
  "error": "User not found"
}
```

---

## 4. **Update User**

### **Endpoint**

```
PUT /api/users/:id
```

### **Description**

Updates a user by ID.

### **Path Params**

| Param | Type   | Description      |
| ----- | ------ | ---------------- |
| `id`  | string | MongoDB ObjectId |

### **Request Body (JSON)**

```json
{
  "name": "John Updated",
  "age": 35
}
```

### **Response (200 OK)**

```json
{
  "_id": "64f9ef1f4d5d2c15e1e8b1a7",
  "name": "John Updated",
  "email": "john@example.com",
  "age": 35,
  "createdAt": "2025-09-03T12:00:00.000Z",
  "updatedAt": "2025-09-03T12:10:00.000Z",
  "__v": 0
}
```

### **Response (404 Not Found)**

```json
{
  "error": "User not found"
}
```

---

## 5. **Delete User**

### **Endpoint**

```
DELETE /api/users/:id
```

### **Description**

Deletes a user by ID.

### **Path Params**

| Param | Type   | Description      |
| ----- | ------ | ---------------- |
| `id`  | string | MongoDB ObjectId |

### **Response (204 No Content)**

No response body.

### **Response (404 Not Found)**

```json
{
  "error": "User not found"
}
```

---


##  Ready-to-Copy Sample Payloads

### Create User Payload

```json
{
  "name": "Alice",
  "email": "alice@example.com",
  "age": 24
}
```

### Update User Payload

```json
{
  "name": "Alice Updated",
  "age": 26
}
```

