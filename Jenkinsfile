pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = 'dockerhub-creds'
        IMAGE_FRONTEND = 'akrana2006/frontend:v2'
        IMAGE_BACKEND  = 'akrana2006/backend:v2'
    }

    stages {

        stage('Checkout Code') {
            steps {
                git 'https://github.com/itsakrana/jenkins_projects.git'
            }
        }

        stage('Build Docker Images') {
            steps {
                sh 'docker build -t $IMAGE_FRONTEND ./frontend'
                sh 'docker build -t $IMAGE_BACKEND ./backend'
            }
        }

        stage('Login to DockerHub') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-creds',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS')]) {

                    sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'
                }
            }
        }

        stage('Push Images to DockerHub') {
            steps {
                sh 'docker push $IMAGE_FRONTEND'
                sh 'docker push $IMAGE_BACKEND'
            }
        }

        stage('Deploy using Docker Compose') {
            steps {
                // Remove old containers and recreate
                sh 'docker-compose down --remove-orphans || true'
                sh 'docker-compose up -d --force-recreate'
            }
        }
    }

    post {
        success {
            echo '✅ Pipeline executed successfully!'
        }
        failure {
            echo '❌ Pipeline failed!'
        }
    }
}
