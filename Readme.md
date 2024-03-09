# Social Networking API

This repository contains the source code for a Social Networking API built using Node.js, Express, and MongoDB. The API provides endpoints for user authentication, user profile management, and post management.

## Installation

1. Clone this repository to your local machine:

```
git clone https://github.com/sarth-akvaish/Social-Networking-API.git
```

2. Install dependencies:

```
cd <repository-directory>
npm install
```

3. Set up environment variables:
   - Create a `.env` file in the root directory.
   - Define the following environment variables in the `.env` file:

```
PORT=<port-number>
MONGODB_URI=<mongodb-uri>
SECRET_KEY=<secret-key>
```

## Available Routes

### Authentication Routes

#### POST /api/auth/login
- Endpoint for user login.
- Request Body:
  - `email`: User's email address.
  - `password`: User's password.
- Returns:
  - `token`: JSON Web Token for authentication.

### User Routes

#### POST /api/users/register
- Endpoint for user registration.
- Request Body:
  - `username`: User's username.
  - `email`: User's email address.
  - `password`: User's password.

### Profile Routes

#### POST /api/profile/create
- Endpoint for creating a user profile.
- Requires authentication token.
- Request Body:
  - `username`: User's username.
  - `profilePicURL`: URL of user's profile picture.
  - `bio`: User's biography.

#### PUT /api/profile/update
- Endpoint for updating a user profile.
- Requires authentication token.
- Request Body:
  - `username`: User's username.
  - `profilePicURL`: URL of user's profile picture.
  - `bio`: User's biography.

#### DELETE /api/profile/delete
- Endpoint for deleting a user profile.
- Requires authentication token.

#### GET /api/profile/view
- Endpoint for viewing a user profile.
- Requires authentication token.

### Post Routes

#### POST /api/user/posts/create
- Endpoint for creating a new post.
- Requires authentication token.
- Request Body:
  - `text`: Content of the post.

#### PUT /api/user/posts/update/:postId
- Endpoint for updating a post.
- Requires authentication token.
- Request Parameters:
  - `postId`: ID of the post to be updated.
- Request Body:
  - `text`: New content of the post.

#### GET /api/user/posts/viewAll
- Endpoint for viewing all posts of a user.
- Requires authentication token.

#### POST /api/user/posts/delete/:postId
- Endpoint for deleting a post.
- Requires authentication token.
- Request Parameters:
  - `postId`: ID of the post to be deleted.


## Followers

### Follow User
- **Method**: POST
- **Endpoint**: /follow/:userId
- **Description**: Follow a user.
- **Request Body**:
  - None
- **Response**: 
  - 200: User followed successfully
  - 400: Bad request
  - 404: User not found
  - 500: Internal server error

### Unfollow User
- **Method**: POST
- **Endpoint**: /unfollow/:userId
- **Description**: Unfollow a user.
- **Request Body**:
  - None
- **Response**: 
  - 200: User unfollowed successfully
  - 400: Bad request
  - 404: User not found
  - 500: Internal server error

### Get Followers
- **Method**: GET
- **Endpoint**: /followers
- **Description**: Get the list of followers for the authenticated user.
- **Response**: 
  - 200: Followers retrieved successfully
  - 401: Unauthorized
  - 500: Internal server error

### Get Following
- **Method**: GET
- **Endpoint**: /following
- **Description**: Get the list of users followed by the authenticated user.
- **Response**: 
  - 200: Following retrieved successfully
  - 401: Unauthorized
  - 500: Internal server error

## Usage

1. Run the server:

```
npm start
```

2. Access the API using an API client such as Postman or curl.



# API Documentation

This document provides an overview of the routes available in the API.
