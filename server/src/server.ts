import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import { config } from 'dotenv';
import morgan from 'morgan';
import sequelize from './model/config';
import usersAuthRouters from './routers/usersAuthRouters';
import profileRouters from './routers/profileRouters';
import postRouters from './routers/postRouters';
import friendRouters from './routers/friendRouters';
import type { CustomErrorHandling } from './typings/interfaces';


config({ path: path.resolve(process.cwd(), '.env') })
const app = express();
const PORT = process.env.PORT || 5000;
const environment = process.env.ENVIRONMENT;
if (environment === 'development') {
  app.use(morgan('dev'))
}

app.use(express.urlencoded({ extended: false }));
app.use(express.json())
app.use('/api/auth', usersAuthRouters);
app.use('/api/users', profileRouters)
app.use('/api/post', postRouters)
app.use('/api/friend', friendRouters)


// Error Handling
app.use((req: Request, res: Response, next: NextFunction) => {
  const error = new Error('endpoint not found') as CustomErrorHandling;
  error.status = 404;
  next(error);
})

app.use((err: CustomErrorHandling, req: Request, res: Response, next: NextFunction) => {
  const status = err.status || 500;
  res.status(status).json({ error: err.message })
})

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is now listening on port ${PORT}`)
  })
})

export default app;