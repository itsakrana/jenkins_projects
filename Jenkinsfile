pipeline {
    agent any

    environment {
        DOCKER_USER = 'akrana2006'
        DOCKER_PASS = credentials('dockerhub-creds') // DockerHub credentials ID
    }

    stages {
        stage('Checkout Code') {
            steps {
                git url: 'https://github.com/itsakrana/jenkins_projects.git'
            }
        }

        stage('Build Docker Images') {
            steps {
                sh 'docker build -t ${DOCKER_USER}/frontend:v2 ./frontend'
                sh 'docker build -t ${DOCKER_USER}/backend:v2 ./backend'
            }
        }

        stage('Login to DockerHub') {
            steps {
                sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'
            }
        }

        stage('Push Docker Images') {
            steps {
                sh 'docker push ${DOCKER_USER}/frontend:v2'
                sh 'docker push ${DOCKER_USER}/backend:v2'
            }
        }

        stage('Deploy with Docker Compose') {
            steps {
                sh '''
                # Remove any old containers to avoid name conflicts
                docker rm -f mongo_db backend_app || true

                # Start fresh
                docker-compose up -d --force-recreate
                '''
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
