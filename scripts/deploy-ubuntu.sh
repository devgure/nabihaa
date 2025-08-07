#!/bin/bash
# scripts/deploy-ubuntu.sh

echo "🚀 Deploying Dating App to Ubuntu..."

sudo apt update
sudo apt install -y docker.io docker-compose nginx git

# Clone repo (or copy your local)
git clone https://github.com/yourname/dating-app-boilerplate.git
cd dating-app-boilerplate

# Copy env
cp backend/.env.example backend/.env
# ⚠️ EDIT backend/.env with your keys

# Start all services
sudo docker-compose up -d

echo "✅ App is running!"
echo "📱 Mobile: http://localhost (Expo Dev Tools)"
echo "🔧 API: http://localhost/api"
echo "🔐 Admin: http://localhost/admin"
echo "📊 PostgreSQL: localhost:5432"
echo "💬 Redis: localhost:6379"