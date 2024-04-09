# Travel Diary Platform Backend API Documentation

## Overview

This document provides comprehensive documentation for the Travel Diary Platform backend API. The API allows users to create, read, update, and delete travel diary entries. It is built using Node.js, Express.js, and SQLite, with a focus on Object-Oriented Programming (OOP) concepts.

Post Man Testing:

![Screenshot 2024-04-09 180149](https://github.com/kaliprasadkunche/Travel-Diary-Entry-Backend-API/assets/113325469/def1f4fa-bded-490e-9f74-1bccee9389c2)

![Screenshot 2024-04-09 180158](https://github.com/kaliprasadkunche/Travel-Diary-Entry-Backend-API/assets/113325469/c7b8e0e2-90e0-49ec-987c-84375baa804c)

![Screenshot 2024-04-09 183222](https://github.com/kaliprasadkunche/Travel-Diary-Entry-Backend-API/assets/113325469/e9d20bff-7c2e-4ef5-b710-591d101256fe)

![Screenshot 2024-04-09 183234](https://github.com/kaliprasadkunche/Travel-Diary-Entry-Backend-API/assets/113325469/896820ba-33f7-495a-81b6-313bdd8cde43)

![Screenshot 2024-04-09 183244](https://github.com/kaliprasadkunche/Travel-Diary-Entry-Backend-API/assets/113325469/89ced95b-0ded-47f0-9ee7-92cef5e0d7ed)

![Screenshot 2024-04-09 183255](https://github.com/kaliprasadkunche/Travel-Diary-Entry-Backend-API/assets/113325469/e1ace0a7-79bb-4f26-8292-e8c90f40cd08)

## Setup Instructions
1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   node app.js
   ```

## Usage Instructions

### API Endpoints

- **User Registration:**

  - Endpoint: `POST /register`
  - Request Body:
    ```json
    {
      "username": "example_user",
      "password": "password123"
    }
    ```
  - Response:
    ```json
    {
      "message": "User registered successfully",
      "token": "example_jwt_token"
    }
    ```

- **User Login:**

  - Endpoint: `POST /login`
  - Request Body:
    ```json
    {
      "username": "example_user",
      "password": "password123"
    }
    ```
  - Response:
    ```json
    {
      "message": "Login successful",
      "token": "example_jwt_token"
    }
    ```

- **Profile Management:**

  - Endpoint: `GET /profile`
  - Headers: `Authorization: Bearer example_jwt_token`
  - Response:
    ```json
    {
      "userId": 1,
      "username": "example_user"
    }
    ```

- **Diary Entry Creation:**

  - Endpoint: `POST /diary`
  - Headers: `Authorization: Bearer example_jwt_token`
  - Request Body:
    ```json
    {
      "title": "Trip to Paris",
      "description": "Visited Eiffel Tower",
      "date": "2024-04-10",
      "location": "Paris, France",
      "photos": ["url1", "url2"]
    }
    ```
  - Response:
    ```json
    {
      "message": "Diary entry created successfully",
      "entryId": 1
    }
    ```

- **Diary Entry Retrieval:**

  - Endpoint: `GET /diary/:id`
  - Headers: `Authorization: Bearer example_jwt_token`
  - Response:
    ```json
    {
      "id": 1,
      "title": "Trip to Paris",
      "description": "Visited Eiffel Tower",
      "date": "2024-04-10",
      "location": "Paris, France",
      "photos": ["url1", "url2"]
    }
    ```

- **Diary Entry Update:**

  - Endpoint: `PUT /diary/:id`
  - Headers: `Authorization: Bearer example_jwt_token`
  - Request Body:
    ```json
    {
      "title": "Updated Title",
      "description": "Updated description"
    }
    ```
  - Response:
    ```json
    {
      "message": "Diary entry updated successfully"
    }
    ```

- **Diary Entry Deletion:**

  - Endpoint: `DELETE /diary/:id`
  - Headers: `Authorization: Bearer example_jwt_token`
  - Response:
    ```json
    {
      "message": "Diary entry deleted successfully"
    }
    ```

- **Documentation:**

  - Endpoint: `GET /documentation`
  - Response: Detailed documentation will be provided soon.

## Application of OOP Concepts

- **Encapsulation:** 
  - Database interactions are encapsulated within class methods of User and DiaryEntry models, ensuring that data access is abstracted away and can be easily managed and modified.
- **Abstraction:** 
  - User and DiaryEntry classes abstract away the complexities of managing users and diary entries, providing clean and simple interfaces for interacting with the data.
- **Inheritance:**
  - Although not explicitly demonstrated in this example, inheritance can be applied to extend functionality across different types of diary entries (e.g., TravelDiaryEntry, FoodDiaryEntry).
- **Polymorphism:**
  - Polymorphic behavior can be achieved by defining methods in the parent class (e.g., CRUD operations) that can be overridden in subclasses to provide custom behavior.

## Deployment and Submission

The API has been deployed to Google Cloud Platform. You can access the live API for testing and evaluation at [insert_link_here].
