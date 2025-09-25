# Java Code Runner — Full-Stack Web Application

A **full-stack web application** that allows you to **write, compile, and run Java code directly in your browser**, with support for interactive input via `Scanner`. The backend safely executes Java code inside a **Dockerized OpenJDK environment**.

---

## Features

* Live **code editor** with Run & Reset buttons.
* Supports **interactive input** (`Scanner` / `System.in`).
* **Compile errors and output** are displayed instantly.
* Backend runs code in **Docker containers** for safety.
* Frontend built with **React + Vite**, backend with **Node.js + Express**.

---

## Tech Stack

* **Frontend:** React, Vite, HTML, CSS
* **Backend:** Node.js, Express, Docker, OpenJDK 17
* **Languages:** Java, JavaScript

---

## Prerequisites

* **Docker** installed and running
* **Node.js** (v18+) and **npm**

---

## Getting Started

1. **Clone the repository:**

```bash
git clone https://github.com/YOUR_USERNAME/java-code-runner.git
cd java-code-runner
```

2. **Start the backend:**

```bash
cd backend
npm install
node index.js
```

The backend will run at `http://localhost:4000`.

3. **Start the frontend:**

```bash
cd ../frontend
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Usage

1. Enter your Java code in the editor.
2. Set the **public class name**.
3. Enter any **stdin input** for interactive programs.
4. Click **Run** to see the output in the console.
5. Click **Reset** to restore default code.

---

## Demo Video

Watch the demo of Java Code Runner in action:

<iframe 
    width="560" 
    height="315" 
    src="https://www.youtube.com/embed/zEgIAIYEVvE?si=XI1ZxD6J5YGwIGfO" 
    title="Java Code Runner Demo" 
    frameborder="0" 
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
    referrerpolicy="strict-origin-when-cross-origin" 
    allowfullscreen>
</iframe>

---

## Security Notes

* The backend executes **arbitrary Java code** inside Docker. Do **not deploy publicly without proper sandboxing**.
* Consider Docker resource limits (`--memory`, `--cpus`) to prevent resource abuse.
* Authentication and rate-limiting are recommended for public deployment.

---

## Optional Improvements

* Replace textarea with **Monaco Editor** for syntax highlighting.
* Support **multi-file projects** or external libraries.
* Add **file upload** support or save code snippets.

---

## License

This project is **MIT licensed**.
