pipeline {
    agent any
    
    environment {
        // Folder operasional sesuai hasil 'ls' tadi
        PROJECT_DIR = '/home/majids/soschool-global'
        // Gunakan kredensial yang sama jika SSH key-nya sama
        GIT_CREDS = 'git-soschool' 
    }
    
    stages {
        stage('1. Sync Kode & Backup Env') {
            steps {
                script {
                    // 1. Backup .env frontend (isinya biasanya NEXT_PUBLIC_API_URL)
                    sh "if [ -f ${PROJECT_DIR}/.env ]; then cp ${PROJECT_DIR}/.env /home/majids/soschool-global.env.bak; fi"

                    dir("${PROJECT_DIR}") {
                        // Bersihkan folder agar tidak ada file hantu
                        deleteDir() 
                        
                        // Tarik kode dari repo global (Frontend)
                        git credentialsId: "${GIT_CREDS}", 
                            url: 'https://github.com/AbdulMajid2310/soschool-global.git', 
                            branch: 'main'
                    }

                    // 2. Kembalikan .env frontend
                    sh "if [ -f /home/majids/soschool-global.env.bak ]; then cp /home/majids/soschool-global.env.bak ${PROJECT_DIR}/.env; fi"
                }
            }
        }

        stage('2. Build & Deploy Docker') {
            steps {
                dir("${PROJECT_DIR}") {
                    // Gunakan --remove-orphans agar container lama yang tidak terpakai otomatis bersih
                    // Pastikan docker-compose.yml di sini sudah ada limit RAM 1024M
                    sh 'docker compose up -d --build --remove-orphans'
                }
            }
        }

        stage('3. Cleanup Image') {
            steps {
                // Menghapus image sisa build (penting agar disk VPS tidak penuh)
                sh 'docker image prune -f'
            }
        }
    }
    
    post {
        success {
            echo 'Deployment soschool-global berhasil!'
        }
        failure {
            echo 'Deployment soschool-global gagal. Cek log console!'
        }
    }
}