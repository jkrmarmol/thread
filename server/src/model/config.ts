import { config } from 'dotenv';
import { Sequelize } from 'sequelize';
import type { ProcessEnvProps } from '../typings/interfaces';


config();
const { DB_NAME, DB_USER, DB_PASSWORD, DB_PORT, DB_HOST }: ProcessEnvProps = process.env;

const sequelize = new Sequelize({
  database: DB_NAME,
  username: DB_USER,
  password: DB_PASSWORD,
  host: DB_HOST,
  port: DB_PORT,
  dialect: 'postgres',
  logging: false
})

try {
  sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (err) {
  console.error('Unable to connect to database: ' + err)
}

export default sequelize;