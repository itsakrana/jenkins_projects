# Jenkins Projects 🚀

A simple project demonstrating **CI/CD automation with Jenkins** for a multi-tier application using Docker Compose.

## 🗂 Project Structure

jenkins_projects/
│
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── Dockerfile
│
├── backend/
│   ├── app.js
│   ├── package.json
│   └── Dockerfile
│
├── Jenkinsfile
├── docker-compose.yml
└── README.md


## ⚡ Features

- 3-tier architecture: **Frontend → Backend → MongoDB**
- Docker multi-stage build for frontend
- Docker Compose for container orchestration
- Automated Jenkins pipeline triggered by **GitHub Webhooks**
- CI/CD workflow: **Code push → Jenkins build → Docker image → Deployment**

---

## 🧪 How to Run

1. **Clone the repository:**

git clone https://github.com/itsakrana/jenkins_projects.git
cd jenkins_projects

2. **Run Docker Compose:**
docker-compose up --build -d

~ Frontend: http://localhost:8080
~ Backend: internal service connected to MongoDB

🤖 Jenkins Pipeline

Stages included:

1.Checkout from GitHub
2.Build Docker images
3.Push images to DockerHub 
4.Deploy via Docker Compose
(Trigger: GitHub Webhook on push events)

📌 Technologies Used

~ Jenkins
~ Docker & Docker Compose
~ Node.js & Express
~ MongoDB
~ GitHub Webhooks
