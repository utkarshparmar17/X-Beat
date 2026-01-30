# Backend API

Functional Node.js/Express backend for X-Beat.
Connected to MongoDB (Default: `xbeat` database).

## Setup & Run

1.  **Install Dependencies**:
    ```bash
    npm install
    ```
2.  **Seed Database** (Import initial products):
    ```bash
    npm run seed
    ```
3.  **Start Server**:
    ```bash
    npm run dev
    ```

## Viewing Data in MongoDB Compass

1.  **Open MongoDB Compass**.
2.  **New Connection**:
    -   URI: `mongodb://localhost:27017`
3.  **Connect**: Click the Connect button.
4.  **Find Database**:
    -   Look for **`xbeat`** in the left sidebar.
5.  **View Products**:
    -   Click on the **`products`** collection to see the seeded data.
