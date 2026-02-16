pipeline {
    agent any

    environment {
        FRONT_IMAGE = 'akrana2006/frontend:v2'
        BACK_IMAGE  = 'akrana2006/backend:v2'
        COMPOSE_PROJECT_NAME = 'devops-pipeline'
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'master',
                    url: 'https://github.com/itsakrana/jenkins_projects.git',
                    credentialsId: 'dockerhub-creds'
            }
        }

        stage('Build Docker Images') {
            steps {
                sh 'docker build -t $FRONT_IMAGE ./frontend'
                sh 'docker build -t $BACK_IMAGE ./backend'
            }
        }

        stage('Login to DockerHub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-creds',
                                                 usernameVariable: 'DOCKER_USER',
                                                 passwordVariable: 'DOCKER_PASS')]) {
                    sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'
                }
            }
        }

        stage('Push Docker Images') {
            steps {
                sh 'docker push $FRONT_IMAGE'
                sh 'docker push $BACK_IMAGE'
            }
        }

        stage('Deploy with Docker Compose') {
            steps {
                // Remove old containers to avoid name conflicts
                sh 'docker-compose down --remove-orphans || true'
                sh 'docker rm -f $(docker ps -aq --filter "name=mongo_db" --filter "name=backend_app") || true'

                // Deploy fresh containers
                sh 'docker-compose up -d --force-recreate'
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
