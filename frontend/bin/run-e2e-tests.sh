#!/bin/bash

# Function to check if a service is running on a specific port
check_service() {
    local PORT=$1
    if ! nc -z localhost "$PORT"; then
        echo "❌ Error: Service on port $PORT is not running."
        exit 1
    fi
}

# Function to check if DATABASE_URL is set to file:./test.db
check_database_env() {
    local ENV_FILE="../backend/.env"
    
    if [[ ! -f "$ENV_FILE" ]]; then
        echo "❌ Error: $ENV_FILE does not exist."
        exit 1
    fi

    if ! grep -q '^DATABASE_URL="file:./test.db"' "$ENV_FILE"; then
        echo "❌ Error: DATABASE_URL is not set to file:./test.db in $ENV_FILE."
        exit 1
    fi
}

echo "🔍 Checking environment..."

# Check if backend (port 3000) is running
check_service 3000
echo "✅ Backend is running."

# Check if frontend (port 5173) is running
check_service 5173
echo "✅ Frontend is running."

# Check if DATABASE_URL is set correctly
check_database_env
echo "✅ DATABASE_URL is correctly set to file:./test.db."

# Seed the test database
echo "🌱 Seeding test database..."
cd ../backend || exit 1
yarn seed-test-db

# Run Playwright tests
echo "🎭 Running Playwright tests..."
cd ../frontend || exit 1
npx playwright test

echo "✅ E2E tests completed."
