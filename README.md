# 🏥 Shedula -- Healthcare Appointment Portal

## 📌 Overview

**Shedula** is a modern healthcare appointment web application built
using **Next.js (App Router)** and **React**.\
It provides a clean, animated authentication interface and a structured
dashboard experience for users to manage healthcare interactions
seamlessly.

------------------------------------------------------------------------

## 🚀 Features

### 🔐 Authentication System

-   Login using **Email or Phone Number**
-   Secure password field with **Show / Hide toggle**
-   "Remember Me" option
-   "Forgot Password" link (UI ready)
-   Google Sign-In button (UI ready)
-   Signup form 

### 🎨 UI/UX Highlights

-   Animated floating background bubbles
-   Centered beating medical logo
-   Responsive card layout
-   Hover glow effects
-   Smooth transitions between Login & Signup
-   Clean healthcare-themed design

### 📊 Dashboard (Single User Dashboard)

-   Redirect after login
-   Local storage-based user session simulation

------------------------------------------------------------------------

## 🧠 Application Logic

### 1️⃣ State Management

The app uses React's `useState` for: - Email - Phone - Password -
Show/Hide password toggle - Login/Signup switch - Background animation
bubbles

### 2️⃣ Controlled Inputs

All input fields use controlled components: const \[email, setEmail\] =
useState("");

This ensures: - No uncontrolled/controlled warnings - Stable React
rendering - Predictable form behavior

### 3️⃣ Bubble Animation Logic

Random bubble properties are generated inside: useEffect(() =\> { ... },
\[\]);

This prevents hydration mismatch in Next.js by ensuring random values
are generated only on the client side.

### 4️⃣ Session Simulation

Upon login: localStorage.setItem("userEmail", email \|\| phone);

This simulates session storage before redirecting to `/dashboard`.

------------------------------------------------------------------------

## 🏗️ Project Structure

src/ ├── app/ │ ├── page.tsx \# Authentication Page │ ├── dashboard/ \#
User Dashboard │ ├── globals.css \# Global Styling │ └── layout.tsx \#
App Layout Wrapper

------------------------------------------------------------------------

## 🛠️ Technologies Used

-   Next.js 14+ (App Router)
-   React
-   TypeScript
-   CSS (Custom Styling)
-   LocalStorage (Session Simulation)

------------------------------------------------------------------------

## ⚙️ How To Run Locally

### 1️⃣ Install dependencies

npm install

### 2️⃣ Start development server

npm run dev

### 3️⃣ Open in browser

http://localhost:3000


You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

