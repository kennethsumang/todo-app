import express, { Application } from 'express';
import { json, urlencoded } from 'body-parser';
import authRoutes from './routes/auth.route';
import userRoutes from './routes/user.route';
import todoRoutes from './routes/todo.route';
import errorMiddleware from './middlewares/error.middleware';
import cookieParser from 'cookie-parser';
import config from './config/app.config';
import cors from 'cors';

const app: Application = express();

// Middleware
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());
// Enable CORS for frontend
console.log(`NODE_ENV: ${process.env.NODE_ENV}`)
console.log(`Frontend URL: ${config.frontendUrl}`);
app.use(
  cors({
      origin: config.frontendUrl,
      credentials: true, // Allow sending cookies
  })
);

// Routes
app.get('/', (req, res) => {
  res.send({ "msg": "Hello, World!" });
});
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/todos', todoRoutes);

// Error Handling
app.use(errorMiddleware);

export default app;