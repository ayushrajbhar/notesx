# 📝 NotesX

**NotesX** is a modern, feature-rich notes management app built using the **MERN stack** (MongoDB, Express.js, React.js, and Node.js). It allows users to securely log in and manage their notes from anywhere, with the ability to create, update, delete, and tag notes for better organization.

---

## 🔑 Features
- **User Authentication**: Secure login with **JWT tokens**.
- **Create, Update, Delete Notes**: Manage your notes easily from any device.
- **Tagging System**: Organize notes by associating them with multiple tags.
- **Password Security**: Passwords are **hashed with bcrypt** and **salted** before being stored in the database.
- **Modern Design**: The app features a clean, modern, and interactive user interface.
- **Animations**: Smooth and engaging animations powered by **Framer Motion**.
- **Responsive**: Optimized for various devices, from desktop to mobile.

---

## 🛠️ Technologies Used

- **MongoDB**: A NoSQL database for storing user data and notes.
- **Express.js**: The backend framework used to build the API and handle routes.
- **React.js**: Frontend framework for building the user interface.
- **Node.js**: JavaScript runtime for backend logic.
- **JWT (JSON Web Tokens)**: Used for secure authentication of users.
- **bcrypt**: For password hashing and salting.
- **Framer Motion**: For smooth, modern animations and transitions.
- **HTML5 & CSS3**: For markup and styling.
- **JavaScript (ES6+)**: Used throughout the app for logic and functionality.
- **Git**: Version control system for tracking changes.

---

## 🚀 Getting Started

### Prerequisites
Make sure you have the following installed:
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)
- [npm](https://www.npmjs.com/)

### Installation

1. **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/notesx.git
    ```

2. **Navigate to the project directory:**
    ```bash
    cd notesx
    ```

3. **Install backend dependencies:**
    ```bash
    cd backend
    npm install
    ```

4. **Install frontend dependencies:**
    ```bash
    cd ../frontend
    npm install
    ```

5. **Set up environment variables:**
   - Create a `.env` file in the `backend` directory with the following:
     ```
     MONGO_URI=your_mongo_db_connection_string
     JWT_SECRET=your_jwt_secret_key
     ```

6. **Run the backend server:**
    ```bash
    cd backend
    npm start
    ```

7. **Run the frontend app:**
    ```bash
    cd ../frontend
    npm start
    ```

The app will now be running locally at `http://localhost:3000`.

---

## 🔐 Security
- **JWT Authentication**: Securely logs in users and keeps their sessions active.
- **bcrypt Hashing**: Ensures passwords are stored safely in the database using bcrypt's hashing with salt.

---

## 🤝 Contributing

Feel free to submit a pull request or open an issue if you have suggestions or would like to contribute to the project.

---

## 📜 License

This project is licensed under the **MIT License**.