# 💗 Random Love Affirmations API

A lightweight JSON API that returns **random love affirmations** in multiple languages and local dialects.  
Built for fun projects, demos, generators, bots, and anything that needs a little love.

---

## ✨ Features

- Random love affirmations
- Multiple languages / dialects  
  - English  
  - Filipino  
  - Bisaya  
  - Ilonggo  
- Simple REST API
- Fast responses
- Open source

---

## 🚀 Live Demo

- Homepage: `/`
- Generator: `/generator`
- API base: `/api`

---

## 📦 API Endpoints

### Get the full dataset
```http
GET /api
```

---

### Get one random affirmation
```http
GET /api/random
```

Response example:
```json
{
  "lang": "english",
  "affirmation": "You’re the song I never skip."
}
```

---

### Get a random affirmation by language
```http
GET /api/random?lang=english
```

Available values for `lang`:
- `english`
- `filipino`
- `bisaya`
- `ilonggo`

---

## 🧠 Use Cases

- Daily affirmation generators
- Romantic or fun side projects
- Chatbots and messaging apps
- Mental health / wellness demos
- School projects and API practice
- Widgets, extensions, or landing pages

---

## 🛠 Built With

- Node.js
- Express.js
- Vanilla HTML, CSS, and JavaScript

---

## 📂 Project Structure

```txt
.
├── public/
│   ├── index.html        # Landing page
│   ├── generator.html   # Affirmation generator
│   └── 404.html
├── routes/
│   └── api.js
├── data/
│   └── affirmations.js
├── .gitignore
├── app.js
└── README.md
```

---

## 🧪 Run Locally

```bash
git clone https://github.com/Akeboshiii/random-love-affirmations
cd random-love-affirmations
npm install
npm start
```

Then open:
```
http://localhost:3000
```

---
