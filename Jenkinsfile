pipeline {
    agent any

    environment {
        FRONTEND_IMAGE = "akrana2006/frontend"
        BACKEND_IMAGE = "akrana2006/backend"
        VERSION = "v${BUILD_NUMBER}"
    }

    stages {

        stage('Checkout') {
            steps {
                git 'https://github.com/itsakrana/jenkins_projects.git'
            }
        }

        stage('Build Images') {
            steps {
                sh 'docker build -t $FRONTEND_IMAGE:$VERSION .'
                sh 'docker build -t $BACKEND_IMAGE:$VERSION -f backend/Dockerfile .'
            }
        }

        stage('Push Images') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-creds',
                    usernameVariable: 'USER',
                    passwordVariable: 'PASS'
                )]) {
                    sh 'echo $PASS | docker login -u $USER --password-stdin'
                    sh 'docker push $FRONTEND_IMAGE:$VERSION'
                    sh 'docker push $BACKEND_IMAGE:$VERSION'
                }
            }
        }

        stage('Deploy') {
            steps {
                sh 'docker-compose down || true'
                sh 'docker-compose up -d'
            }
        }
    }
}
