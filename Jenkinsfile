pipeline {
    agent any

    environment {
        // Folder operasional di VPS Majid
        APP_PATH = '/home/majids/soschool-global'
    }

    stages {
        stage('1. Checkout & Sync') {
            steps {
                dir("${APP_PATH}") {
                    // Menarik kode terbaru dari GitHub ke folder operasional
                    checkout scm
                    
                    // Memastikan file .env tetap aman
                    echo "Memeriksa file environment..."
                    sh '[ -f .env ] || echo "WARNING: File .env tidak ditemukan! Pastikan sudah ada di VPS."'
                }
            }
        }

        stage('2. Build & Deploy Docker') {
            steps {
                dir("${APP_PATH}") {
                    echo "Memulai proses build dan deploy container..."
                    // Menjalankan Docker Compose sesuai file yang kamu buat
                    // --build akan menjalankan build '.' yang ada di file compose kamu
                    sh 'docker-compose up -d --build --remove-orphans'
                }
            }
        }

        stage('3. Monitoring & Cleanup') {
            steps {
                echo "Membersihkan image lama dan memantau RAM..."
                // Menghapus image 'none' agar penyimpanan tidak penuh
                sh 'docker image prune -f'
                // Menampilkan statistik untuk memastikan limit 1GB aktif
                sh "docker stats soschool-app --no-stream"
            }
        }
    }

    post {
        success {
            echo "Deployment soschool-global (Frontend) Berhasil di port 7000!"
        }
        failure {
            echo "Deployment Gagal! Periksa koneksi ke GitHub atau log Docker."
        }
    }
}