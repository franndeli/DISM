# Project Setup

This project is divided into two main parts: the **backend** and the **frontend**, each located in its respective folder. Below are the steps required to set up each component, along with the project structure and a description of its purpose.

## Project Description
This is a **time-tracking management application** designed to facilitate the control of users and administrators in a work environment. Users can log their check-in and check-out times, while administrators have additional functionalities, such as creating and managing users, overseeing time records, and managing tasks. The application ensures efficient tracking and management of work hours, making it ideal for organizations that require precise timekeeping.

## Project Structure

The project is organized as follows:

```
/project
│
├── backend/
│   ├── api/
│   │   └── swagger/ (Swagger specification file)
│   ├── auth
│   ├── controllers/
│   ├── service/
│   ├── utils/
│   └── index.js (server entry file)
│
└── frontend/
    ├── src/
    │   ├── app/ (application components)
    │   │    └── service/
    │   ├── assets/
    │   └── environments/
    └── ionic.config.json
```

### Backend

The `backend` folder contains all the logic related to the database and API. Inside the `api` subfolder, you’ll find the Swagger specification file, which documents the API endpoints.

**Steps to set up the backend:**
1. Navigate to the `backend` folder in your terminal.
2. Run `npm install` to install all required dependencies.
3. Ensure **XAMPP** is running with the **MySQL** service active.
4. Start the server using one of the following commands:
   - `nodemon index.js`
   - `node index.js`

**Note:** The console will indicate the port on which the server is running.

### Frontend

The `frontend` folder contains the **Ionic** project with all the application components and services.

**Steps to set up the frontend:**
1. Navigate to the `frontend` folder in your terminal.
2. Run `npm install` to install the dependencies.
3. Start the application using one of the following commands:
   - `ionic serve`
   - `ng serve`

**Note:** The console will display the port on which the frontend application is running.

### Full Project Setup

To run the complete project, follow these steps:
1. Start **XAMPP** with **MySQL** active.
2. Open a terminal, navigate to the `backend` folder, and run `npm install` followed by `nodemon index.js`.
3. Open another terminal, navigate to the `frontend` folder, and run `npm install` followed by `ionic serve`.
4. Check the ports displayed in the console to access the backend and frontend.

## Application Workflow

### Roles in the Application

1. **Administrators**:
   - Administrators have access to a dashboard where they can:
     - Manage users.
     - View time-tracking records.
     - Manage tasks.
   - **Admin login credentials**:
     - Username: `celia_02`
     - Password: `1234`

2. **Regular Users**:
   - Users can:
     - Log their check-in and check-out times.
     - View their own time-tracking records.

### Basic Workflow

1. An administrator logs in using the credentials above to configure the application.
2. Users can log in with their assigned credentials or request the administrator to create a new account.
3. Users log their check-in and check-out times, and the data is stored in the database.
4. Administrators can monitor and manage all records from their dashboard.
