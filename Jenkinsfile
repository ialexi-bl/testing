pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                sh 'npm run build'
                sh 'npm i'
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
