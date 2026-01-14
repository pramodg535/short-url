# 🔗 URL Shortener Application

A full‑stack URL Shortener built with Node.js, Express, MongoDB, and a simple HTML/CSS/JavaScript frontend.
It allows users to shorten long URLs, redirect using short IDs, and view basic analytics like total clicks.

Features

*  Generate short URLs using `nanoid`
*  Redirect short URLs to original long URLs
*  Track total clicks and creation date
*  Simple frontend UI (HTML + CSS + JS)
*  Deployed on Render
*  Database powered by MongoDB Atlas


## Tech Stack

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* nanoid
* dotenv
* cors

### Frontend

* HTML
* CSS
* JavaScript (Fetch API)

### Deployment

* Render (Backend + Frontend)
* MongoDB Atlas (Database)

---

## 📁 Project Structure

```
URLShorterner/
│
├── controllers/
│   └── url.js
├── models/
│   └── url.js
├── routes/
│   └── url.js
├── utils/
│   └── validateUrl.js
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
├── connection.js
├── index.js
├── .env
├── package.json
└── README.md
```

---

## Environment Variables

Create a `.env` file in the root directory:

```
PORT=8001
MONGO_URL=your_mongodb_connection_string
BASE_URL=http://localhost:8001
```

For Render deployment, set these in Render → Environment Variables.

---

## Running Locally

1. Clone the repository

```bash
git clone https://github.com/pramodg535/short-url.git
cd short-url
```

2. Install dependencies

```bash
npm install
```

3. Start the server

```bash
node index.js
```

4. Open in browser

```
http://localhost:8001/
```

---

##  API Endpoints

### ➤ Create Short URL

```
POST /url
```

Body:

```json
{
  "url": "https://example.com"
}
```

Response:

```json
{
  "id": "AbC1234"
}
```

---

###  Redirect to Original URL

```
GET /:shortId
```

---

### ➤ Get Analytics

```
GET /url/analytics/:shortId
```

**Response:**

```json
{
  "totalClicks": 5,
  "createdDate": "2026-01-10"
}
```

---

##  Live Demo

 **Deployed URL:**
[https://short-url-u567.onrender.com](https://short-url-u567.onrender.com)
Cold Start Notice: This application is deployed on a free-tier server. Initial requests may experience a delay of up to 2-3 minutes due to server cold starts.
---

##  Learning Outcomes

* REST API design with Express
* MongoDB schema design
* Environment variable handling
* Full‑stack deployment on Render
* Debugging real‑world deployment issues

---

## Author
Pramod G
B.E. in Information Science & Engineering
Aspiring Software Engineer

---


## License

This project is open‑source and free to use for learning purposes.


