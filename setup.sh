#!/bin/bash

echo "🚀 Setting up Todo App Development Environment..."

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# Check if Node.js, npm, and yarn are installed
if ! command -v node &> /dev/null
then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

if ! command -v npm &> /dev/null
then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

if ! command -v yarn &> /dev/null
then
    echo "❌ Yarn is not installed. Installing yarn..."
    npm install -g yarn
fi

echo "✅ Node.js, npm, and yarn are installed."

# Install Bitwarden CLI if not installed
echo "🔑 Installing Bitwarden CLI (bw)..."
npm install -g @bitwarden/cli
echo "✅ Bitwarden CLI installed."

# Ensure backend directory exists
if [ ! -d "backend" ]; then
    echo "❌ The backend directory does not exist. Please create it first."
    exit 1
fi

# Ensure frontend directory exists
if [ ! -d "frontend" ]; then
    echo "❌ The frontend directory does not exist. Please create it first."
    exit 1
fi

# Generate SSL keys only if they don't exist
if [ ! -f "backend/privateKey.pem" ]; then
    echo "🔑 Generating private key in backend directory..."
    openssl genrsa -out backend/privateKey.pem 2048
    echo "✅ Private key generated."
else
    echo "✅ Private key already exists. Skipping generation."
fi

if [ ! -f "backend/publicKey.pem" ]; then
    echo "🔑 Generating public key in backend directory..."
    openssl rsa -in backend/privateKey.pem -pubout -out backend/publicKey.pem
    echo "✅ Public key generated."
else
    echo "✅ Public key already exists. Skipping generation."
fi

# Setup backend environment variables
if [ ! -f "backend/.env" ]; then
    if [ -f "backend/.env.example" ]; then
        echo "📄 Copying backend .env.example to backend/.env..."
        cp backend/.env.example backend/.env
        echo "✅ Backend .env file created."
    else
        echo "❌ Backend .env.example file is missing! Please add it."
        exit 1
    fi
else
    echo "✅ Backend .env file already exists."
fi

# Generate a new JWT_SECRET and replace it in backend/.env
JWT_SECRET=$(bw generate -uln --length 32)
echo "🔐 Updating JWT_SECRET in backend/.env..."

if [[ "$OSTYPE" == "darwin"* ]]; then
    sed -i '' -E "s|^JWT_SECRET=.*|JWT_SECRET=\"$JWT_SECRET\"|" backend/.env
else
    sed -i -E "s|^JWT_SECRET=.*|JWT_SECRET=\"$JWT_SECRET\"|" backend/.env
fi

# If JWT_SECRET was not found, append it to the file
grep -q "^JWT_SECRET=" backend/.env || echo "JWT_SECRET=\"$JWT_SECRET\"" >> backend/.env

echo "✅ JWT_SECRET updated."

# Setup frontend environment variables
if [ ! -f "frontend/.env" ]; then
    if [ -f "frontend/.env.example" ]; then
        echo "📄 Copying frontend .env.example to frontend/.env..."
        cp frontend/.env.example frontend/.env
        echo "✅ Frontend .env file created."
    else
        echo "❌ Frontend .env.example file is missing! Please add it."
        exit 1
    fi
else
    echo "✅ Frontend .env file already exists."
fi

# Generate a new COOKIE_PASSWORD and replace it in frontend/.env
COOKIE_PASSWORD=$(bw generate -uln --length 32)
echo "🍪 Updating COOKIE_PASSWORD in frontend/.env..."

# Detect macOS (Darwin) vs Linux (WSL) and apply the correct `sed` syntax
if [[ "$OSTYPE" == "darwin"* ]]; then
    sed -i '' -E "s/^COOKIE_PASSWORD=.*/COOKIE_PASSWORD=\"$COOKIE_PASSWORD\"/" frontend/.env
else
    sed -i -E "s/^COOKIE_PASSWORD=.*/COOKIE_PASSWORD=\"$COOKIE_PASSWORD\"/" frontend/.env
fi

# If COOKIE_PASSWORD was not found, append it to the file
grep -q "^COOKIE_PASSWORD=" frontend/.env || echo "COOKIE_PASSWORD=\"$COOKIE_PASSWORD\"" >> frontend/.env

echo "✅ COOKIE_PASSWORD updated."

# Install dependencies
echo "📦 Installing backend dependencies..."
cd backend
yarn install
cd ..

echo "📦 Installing frontend dependencies..."
cd frontend
yarn install
cd ..

echo "📦 Installing playwright dependencies..."
cd frontend
yarn playwright install
cd ..

echo "✅ Dependencies installed."

# Database setup
echo "📂 Setting up the database..."
cd backend
npx prisma migrate dev
cd ..

echo "✅ Database migration completed."

# Setup VS Code REST Client environment
VSCODE_SETTINGS="backend/.vscode/settings.json"
if [ ! -f "$VSCODE_SETTINGS" ]; then
    echo "⚙️ Creating VS Code REST Client environment file..."
    mkdir -p backend/.vscode
    cat <<EOL > $VSCODE_SETTINGS
{
  "rest-client.environmentVariables": {
    "\$shared": {
      "url": "http://localhost:3000",
      "userId": "<userId>",
      "accessToken": "<accessToken>",
      "refreshToken": "<refreshToken>"
    }
  }
}
EOL
    echo "✅ VS Code REST Client environment file created."
else
    echo "✅ VS Code REST Client environment file already exists."
fi

# Setup JetBrains HTTP Client environment
JETBRAINS_SETTINGS="backend/temp/rest/http-client.env.json"
if [ ! -f "$JETBRAINS_SETTINGS" ]; then
    echo "⚙️ Creating JetBrains HTTP Client environment file..."
    mkdir -p backend/temp/rest
    cat <<EOL > $JETBRAINS_SETTINGS
{
  "dev": {
    "url": "http://localhost:3000",
    "userId": "<userId>",
    "accessToken": "<accessToken>",
    "refreshToken": "<refreshToken>"
  }
}
EOL
    echo "✅ JetBrains HTTP Client environment file created."
else
    echo "✅ JetBrains HTTP Client environment file already exists."
fi

echo "✅ Setup complete. You can now start your servers manually."

echo -e "\n👉 To start the backend, run: \e[1mcd backend && yarn dev\e[0m"
echo -e "👉 To start the frontend, run: \e[1mcd frontend && yarn dev\e[0m"
