# Todo App
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
### Using VS Code
1. Start the backend server.
2. Create `settings.json` under `backend/.vscode`.
3. Save the following in the new file:
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
4. Open the `/backend/temp/rest/auth.http` file.
5. Execute the register endpoint.
6. Execute the login endpoint. Take note of the `userId`, `accessToken`, and `refreshToken` fields.
7. Fill the values in `backend/.vscode/settings.json` using the values you have taken in login endpoint.
8. You can now execute the authenticated endpoints in HTTP files.

### Using Jetbrains IDE
1. Start the backend server.
2. Create `http-client.env.json` inside `/backend/temp/rest` folder.
3. Save the following in the new file:
```json
{
  "dev": {
    "url": "http://localhost:3000",
    "userId": "<userId>",
    "accessToken": "<accessToken>",
    "refreshToken": "<refreshToken>"
  }
}
```
4. Open the `/backend/temp/rest/auth.http` file.
5. Execute the register endpoint.
6. Execute the login endpoint. Take note of the `userId`, `accessToken`, and `refreshToken` fields.
7. Fill the values in `/backend/temp/rest/http-client.env.json` using the values you have taken in login endpoint.
8. You can now execute the authenticated endpoints in HTTP files.

## Testing
### End-to-end (E2E) Testing using Playwright.
#### Preparing the test database
1. In `backend/.env`, change the `DATABASE_URL` to `test.db`.
2. Run `npx prisma migrate dev` to create the test database.
3. To seed the data for the tests, run `yarn seed-test-db` in `backend` folder.

#### Running Backend
1. Just execute `yarn dev` in `backend`.

#### Running Playwright test
1. Just execute `yarn test` in `frontend`.