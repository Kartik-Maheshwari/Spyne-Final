# 🚗 Car Management Application

## 📜 **Project Overview**

The **Car Management Application** is a platform that allows users to create, view, edit, and delete cars. Each car entry can include up to 10 images, a title, description, and tags. This application provides secure user authentication, allows users to manage only their own products, and includes search functionality for easy navigation through car listings.

## 🔑 **Key Features**

- **User Authentication**: Sign Up / Login to manage your cars 🔐
- **Create, View, Update, Delete Cars**: Manage your car entries 📅
- **Image Upload**: Upload up to 10 images per car 📸
- **Search**: Global search to find cars based on title, description, or tags 🔍
- **Edit Car Details**: Update title, description, images, and tags 📝
- **Delete Cars**: Remove cars from your list 🗑️
- **User Authorization**: Users can manage only their own cars 🚷

## 🚀 **Technologies Used**

- **Frontend**: ReactJS, Vite, Tailwind CSS
- **Backend**: Node.js, Express.js, MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Image Storage**: Cloudinary
- **Deployment**: Render (Frontend), Render (Backend)

## 🛠️ **Features & Endpoints**

### **1. Authentication**

- **Sign Up**: `POST /auth/signup` - Register a new user
- **Login**: `POST /auth/login` - Log in and receive a JWT token

### **2. Cars CRUD Operations**

- **Create Car**: `POST /cars` - Add a new car (up to 10 images)
- **List Cars**: `GET /cars` - Retrieve all cars created by the logged-in user
- **View Car Details**: `GET /cars/:id` - Get the details of a specific car
- **Update Car**: `PUT /cars/:id` - Edit a car’s title, description, images, or tags
- **Delete Car**: `DELETE /cars/:id` - Remove a car from your list

## 📦 **Installation & Setup**

### **Backend (Node.js + Express)**

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/car-management-app.git
   cd car-management-app
   ```
2. Install dependencies::
   ```bash
   npm install
   ```
3. Create a .env file and add the following variables:
   ```bash
   MONGO_URI=your-mongo-db-uri
   JWT_SECRET=your-jwt-secret
   CLOUDINARY_CLOUD_NAME=your-cloudinary-name
   CLOUDINARY_API_KEY=your-clodinary-api-key
   CLOUDINARY_API_SECRET=your-cloudinary-api-secret
   ```
4. Start the backend server
   ```bash
   npm install
   ```
   The backend will now be running on http://localhost:5000.

### **Frontend (React + Vite)**

1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```
2. Install dependencies::
   ```bash
   npm install
   ```
3. Start the frontend development server:
   ```bash
   npm run dev
   ```
   The backend will now be running on http://localhost:5173.

## Deployment

### 🌐 Frontend:
The frontend is deployed on Vercel. You can access the live version here:  
[**Frontend Link**](https://spyne-assignment-frontend.onrender.com)

### 🌐 Backend:
The backend is deployed on Heroku. You can access the live version here:  
[**Backend Link**](https://spyne-assignment-frontend.onrender.com/)

---


## 📝 Frontend Pages

1. **Sign Up / Login Page**:  
   Users can register and log in to access their products.

2. **Product List Page**:  
   Displays all cars created by the logged-in user, with a search bar for quick filtering.

3. **Product Creation Page**:  
   Allows users to add new cars with images, title, description, and tags.

4. **Product Detail Page**:  
   Provides detailed information about a car with options to edit or delete it.

---

## 🤖 Authentication Flow

1. **Sign Up**:  
   Users can register by providing a username, email, and password.

2. **Login**:  
   After logging in, users receive a JWT token which they use for authentication on protected routes.

3. **Access Control**:  
   Only authenticated users can create, view, update, or delete their cars.

---

## 📦 Important Modules Explained

### **Cloudinary for Image Uploading 📸**
- Cloudinary is used for uploading and storing images (up to 10 images per car).  
- Uploaded images are stored on Cloudinary, and their URLs are saved in the database for easy access.

### **JWT for Authentication 🔑**
- Users authenticate via JWT tokens.  
- After login, a JWT token is sent to the client, which is used to access protected routes (like creating and managing cars).

### **MongoDB & Mongoose 🗃️**
- **MongoDB** is used to store car and user data.  
- **Mongoose ORM** is used for managing the MongoDB connection and simplifying data operations.

---


