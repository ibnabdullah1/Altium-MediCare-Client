# Medicine E-Commerce Platform

## Overview

The **Medicine E-Commerce Platform** is a comprehensive and scalable web application designed for seamless online shopping and management of medical products. With tailored functionalities for **customers**, **vendors**, and **administrators**, the platform delivers an intuitive, secure, and responsive experience.

Built with **React.js**, **TypeScript**, **Ant Design**, and **Tailwind CSS**, the project ensures a modern UI/UX and robust architecture, making it scalable and efficient for handling various e-commerce operations.

---

## Key Features

### General Features

1. **Responsive UI**

   - A visually appealing and user-friendly interface built with **Ant Design** and **Tailwind CSS** for both mobile and desktop devices.

2. **Authentication**

   - **JWT-based authentication** with secure token management for user sessions.
   - Includes email-based password reset functionality.

3. **Dynamic Role Management**

   - Multi-role access for **Super Admin**, **Admin**, **Vendor**, and **Customer**, with tailored dashboards and permissions.

4. **SEO Optimization**

   - Optimized with dynamic metadata to improve search engine visibility and ranking.

5. **Advanced Search and Filtering**

   - Multi-level filters by price, category, and stock availability for a seamless shopping experience.

6. **Order History**

   - Role-specific order history (customers and vendors) with status tracking.

7. **Dynamic Notifications**

   - Real-time updates using **React Toastify** for orders, stock status, and user interactions.

8. **Pagination and Sorting**
   - Efficient pagination for product listings and order histories, ensuring scalability for large datasets.

---

### Customer Features

9. **Shopping Cart**

   - Persistent cart state powered by **Redux**.
   - Supports product variants and stock validation.

10. **Wishlist**

- Save and manage favorite products for easy access.

11. **Product Reviews**

- Customers can leave ratings and reviews only for purchased products.

12. **Coupon System**

- Apply discount coupons during checkout for reduced pricing.

13. **Recently Viewed Products**

- Displays the last 10 products viewed by the user for convenient navigation.

---

### Vendor Features

14. **Shop Management**

- Vendors can create and manage their shops, including uploading shop logos and details.

15. **Product Management**

- Add, edit, and delete products with support for multiple images, descriptions, and inventory management.

16. **Order Management**

- Vendors can view and process customer orders.

17. **Dashboard Insights**

- Real-time analytics for sales performance and stock tracking.

---

### Admin Features

18. **User and Vendor Management**

- Approve, suspend, or delete user and vendor accounts.

19. **Category Management**

- Add, edit, or delete product categories dynamically, including support for nested categories.

20. **Platform Monitoring**

- Access detailed reports on sales, user activity, and system-wide performance.

---

## Technologies Used

### Frontend

- **React.js**: Component-based framework for building user interfaces.
- **TypeScript**: Strongly typed programming for better code quality and maintainability.
- **Ant Design**: Prebuilt components for a polished and professional UI.
- **Tailwind CSS**: Utility-first CSS framework for custom and responsive design.
- **React Toastify**: For real-time notifications.
- **Redux**: Global state management for a seamless user experience.
- **RTK Query**: Global state management for a seamless user experience.

### Backend

- **Node.js with Express.js**: Backend framework for API development.
- **PostgreSQL**: Relational database for structured and efficient data storage.
- **Prisma**: ORM for database querying and schema management.
- **JWT**: Secure authentication.
- **Nodemailer**: Email service for user communication.

## Installation

### Prerequisites

- **Node.js** (v16+)
- **PostgreSQL Database**

### Setup Instructions

1. Clone the repository:

   ```bash
   git clone https://github.com/your-repo.git
   cd your-repo
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Setup environment variables:

   - Create a `.env` file and add the following:`.env.example` file

4. Start the development server:
   ```bash
   npm run dev
   ```

---

## Dependencies

### Frontend

- **React.js**
- **Ant Design**
- **Tailwind CSS**
- **Redux**
- **React Toastify**
- **React Router DOM**
- **Axios**

### Backend

- **Node.js**
- **Express.js**
- **PostgreSQL** with **Prisma**
- **JWT**
- **Nodemailer**

## Screenshots

<!-- _Add screenshots of key pages here (e.g., Home Page, Product Details Page, Vendor Dashboard)._ -->

---

## License

This project is licensed under the MIT License.
