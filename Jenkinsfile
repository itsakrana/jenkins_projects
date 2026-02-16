pipeline {
    agent any

    environment {
        DOCKERHUB_REPO = "akrana2006"
        FRONTEND_IMAGE = "frontend"
        BACKEND_IMAGE  = "backend"
        TAG = "v2"
    }

    stages {

        stage('Checkout Code') {
            steps {
                git branch: 'master',
                url: 'https://github.com/itsakrana/jenkins_projects.git'
            }
        }

        stage('Build Docker Images') {
            steps {
                sh 'docker build -t $DOCKERHUB_REPO/$FRONTEND_IMAGE:$TAG ./frontend'
                sh 'docker build -t $DOCKERHUB_REPO/$BACKEND_IMAGE:$TAG ./backend'
            }
        }

        stage('Login to DockerHub') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-creds',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'
                }
            }
        }

        stage('Push Images to DockerHub') {
            steps {
                sh 'docker push $DOCKERHUB_REPO/$FRONTEND_IMAGE:$TAG'
                sh 'docker push $DOCKERHUB_REPO/$BACKEND_IMAGE:$TAG'
            }
        }

        stage('Deploy using Docker Compose') {
            steps {
                sh 'docker-compose down || true'
                sh 'docker-compose up -d'
            }
        }
    }

    post {
        success {
            echo '✅ Pipeline completed successfully!'
        }
        failure {
            echo '❌ Pipeline failed!'
        }
    }
}
