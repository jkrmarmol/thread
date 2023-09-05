import { Request } from 'express'


export interface ProcessEnvProps {
  ENVIRONMENT: string;
  DB_NAME: string;
  DB_USER: string;
  DB_PASSWORD: string;
  DB_PORT: number;
  DB_HOST: string;
  GMAIL_EMAIL: string;
  GMAIL_APP_PASSWORD: string;
  USER_SECRET_KEY: string;
  CLIENT_DOMAIN: string;
};

declare global {
  namespace NodeJS {
    interface ProcessEnv extends ProcessEnvProps { }
  }
}

export interface CustomErrorHandling extends Error {
  status: number;
}

export interface AuthenticatedRequest extends Request {
  user: any;
}

declare module "jsonwebtoken" {
  export interface JwtPayload {
    user: {
      code?: string;
      id?: string;
    };
  }
}