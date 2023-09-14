pipeline {
    agent {
        docker {
            image 'node:18.17.1-alpine3.18'
        }
    }

    stages {
        stage('Build') {
            steps {
                sh 'npm run build'
                archiveArtifacts artifacts: 'build/**, package.json, package-lock.json', fingerprint: true
            }
        }
        stage('Deploy') {
            environment {
                ORIGIN = 'https://jabuj.com'
            }
            when {
                expression {
                    currentBuild.result == null || currentBuild.result == 'SUCCESS'
                }
            }
            steps {
                sh 'echo deploy'
            }
        }
    }
}
