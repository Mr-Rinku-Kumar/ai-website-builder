# 🚀 AI Website Builder

An AI-powered website generator that creates complete, responsive websites from natural language prompts using **Google Gemini AI**.

Users simply enter a prompt like:

> "Create a modern restaurant website"

and the application generates a complete HTML website with CSS and JavaScript, provides a live preview, and allows downloading the generated code.

---

## ✨ Features

- 🤖 AI-powered website generation using Google Gemini
- 🎨 Beautiful responsive websites
- ⚡ Live Preview using iframe
- 📥 Download generated HTML
- 📋 Copy generated code
- 🎭 Theme Selection
  - Modern
  - Dark
  - Light
  - Corporate
  - Glassmorphism
- 📂 Website Categories
  - Portfolio
  - Restaurant
  - Gym
  - Ecommerce
  - Hospital
  - Education
  - Startup
  - Agency
- 🔄 Regenerate websites
- 📱 Fully Responsive UI
- ⚡ Fast React + Vite frontend

---

# 🛠 Tech Stack

## Frontend

- React 18
- Vite
- Tailwind CSS
- Axios
- React Icons
- React Hot Toast

## Backend

- Node.js
- Express.js
- Google Gemini AI
- Helmet
- CORS
- Express Rate Limit
- Dotenv

---

# 📁 Project Structure

```
ai-website-builder/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── hooks/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   └── package.json
│
├── server/
│   ├── controllers/
│   ├── routes/
│   ├── services/
│   ├── middleware/
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

# 🚀 Installation

## Clone Repository

```bash
git clone https://github.com/Mr-Rinku-Kumar/ai-website-builder.git

cd ai-website-builder
```

---

## Install Frontend

```bash
cd client

npm install
```

---

## Install Backend

```bash
cd ../server

npm install
```

---

# 🔑 Environment Variables

Create a `.env` file inside the **server** folder.

```env
PORT=5000

GEMINI_API_KEY=YOUR_GEMINI_API_KEY

NODE_ENV=development

CLIENT_URL=http://localhost:5173
```

---

# ▶️ Run Backend

```bash
cd server

npm run dev
```

Backend runs on

```
http://localhost:5000
```

---

# ▶️ Run Frontend

```bash
cd client

npm run dev
```

Frontend runs on

```
http://localhost:5173
```

---

# 🎯 How It Works

1. User enters a prompt.

2. React sends the prompt to Express backend.

3. Backend sends the prompt to Google Gemini AI.

4. Gemini generates a complete HTML website.

5. Backend returns HTML.

6. Frontend renders the HTML inside an iframe.

7. User can download or copy the generated HTML.

---

# 💡 Example Prompts

### Portfolio

```
Create a modern portfolio website for a Full Stack Developer.
```

---

### Restaurant

```
Create a premium restaurant website with menu, gallery and reservation form.
```

---

### Gym

```
Create a dark themed gym landing page with pricing plans and trainers.
```

---

### Ecommerce

```
Create an ecommerce homepage for an electronics store.
```

---

### Hospital

```
Create a hospital website with doctors, departments and appointment booking.
```

---

### Education

```
Create an online learning platform homepage.
```

---

# 📸 Screenshots

## Home Page

_Add your screenshot here_

---

## Live Preview

_Add your screenshot here_

---

## Generated Website

_Add your screenshot here_

---

# 🔒 API Endpoint

## Generate Website

```
POST /api/generate
```

### Request

```json
{
  "prompt": "Create a modern restaurant website"
}
```

### Response

```json
{
  "success": true,
  "html": "<!DOCTYPE html>..."
}
```

---

# 📦 Future Improvements

- Export as ZIP
- React code generation
- Next.js generation
- Tailwind CSS generation
- Multi-page website support
- Authentication
- Saved projects
- AI Chat Assistant
- Code Editor
- Image generation

---

# 🤝 Contributing

Contributions are welcome.

1. Fork the repository

2. Create a new branch

```bash
git checkout -b feature-name
```

3. Commit changes

```bash
git commit -m "Added new feature"
```

4. Push changes

```bash
git push origin feature-name
```

5. Create a Pull Request

---

# 📄 License

This project is licensed under the MIT License.

---

# 👨‍💻 Author

**Rinku Kumar**

**Full Stack Developer (MERN Stack)**

- React.js
- Node.js
- Express.js
- MongoDB

GitHub: https://github.com/Mr-Rinku-Kumar

LinkedIn: linkedin.com/in/rinku-kumar-6a611a311/

---

# ⭐ Support

If you found this project useful, please consider giving it a ⭐ on GitHub.

It helps others discover the project and motivates further development.

---

## 🚀 Built with ❤️ using React, Node.js, Express, and Google Gemini AI