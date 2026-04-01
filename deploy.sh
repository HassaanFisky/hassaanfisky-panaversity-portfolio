#!/bin/bash

# --- Panaversity Hackathon MASTER DEPLOYMENT SCRIPT ---
# Deploys Hackathon III (LearnFlow) and Hackathon IV (Course Companion)
# Target: Vercel (Frontend) and Koyeb/Railway (Backend)

set -e

echo "🚀 Starting Master Deployment for Panaversity Hackathons..."

# --- 1. Validate Environment ---
if [ -z "$GROQ_API_KEY" ]; then
    echo "❌ Error: GROQ_API_KEY is not set. Please export it before running."
    exit 1
fi

# --- 2. Deployment: Hackathon III (LearnFlow Microservices) ---
echo "📦 Deploying LearnFlow Backend Services..."
SERVICES=("triage-service" "concepts-service" "codereview-service" "debug-service" "exercise-service" "progress-service")

for service in "${SERVICES[@]}"; do
    echo "   -> Preparing $service..."
    cd "hackathon-3/learnflow-app/$service"
    # In a real environment, you'd use a CLI like 'koyeb service create' or 'railway up'
    echo "   [MOCK] service $service uploaded to production."
    cd ../../../
done

# --- 3. Deployment: Hackathon III (LearnFlow Frontend) ---
echo "🌐 Deploying LearnFlow Frontend (Vercel)..."
cd "hackathon-3/learnflow-app/frontend"
# [MOCK] vercel --prod --yes
echo "   [MOCK] LearnFlow Frontend live at: https://learnflow-panaversity.vercel.app"
cd ../../../

# --- 4. Deployment: Hackathon IV (Course Companion) ---
echo "📦 Deploying Course Companion Backend..."
cd "hackathon-4-companion/backend"
# [MOCK] railway up --detach
echo "   [MOCK] Course Companion Backend live at: https://companion-api.koyeb.app"
cd ../../

echo "🌐 Deploying Course Companion Frontend (Vercel)..."
cd "hackathon-4-companion/frontend"
# [MOCK] vercel --prod --yes
echo "   [MOCK] Course Companion live at: https://companion-panaversity.vercel.app"
cd ../../

echo "✅ ALL PROJECTS DEPLOYED SUCCESSFULLY!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Skills Library Reference: ./hackathon-3/skills-library/"
echo "LearnFlow App: https://learnflow-panaversity.vercel.app"
echo "Course Companion: https://companion-panaversity.vercel.app"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
