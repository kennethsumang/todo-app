# Mood Tracker API
## Getting Started
1. Install Node, NPM, and Yarn.
2. In the `/backend` directory, generate private key:
```shell
openssl genrsa -out privateKey.pem 2048
```
3. In the root directory, generate public key:
```shell
openssl rsa -in privateKey.pem -pubout -out publicKey.pem
```
4. Duplicate `.env.example` file and rename it to `.env`.
5. Supply the needed env variables. 
6. Run `yarn`
7. Run `yarn dev` for development.

## Database
1. In the `/backend` directory, execute:
```
npx prisma migrate dev
```

## API Development
1. Start the backend server.
2. Open the `/backend/temp/rest/auth.http` file.
3. Execute the register endpoint.
4. Execute the login endpoint. Take note of the `userId`, `accessToken`, and `refreshToken` fields.
5. Create `settings.json` under `backend/.vscode`.
6. Fill the values in `backend/.vscode/settings.json` using the values you have taken in login endpoint.
```json
{
  "rest-client.environmentVariables": {
    "$shared": {
      "url": "http://localhost:3000",
      "userId": "<userId>",
      "accessToken": "<accessToken>",
      "refreshToken": "<refreshToken>"
    }
  }
}
```
7. You can now execute the authenticated endpoints in HTTP files.