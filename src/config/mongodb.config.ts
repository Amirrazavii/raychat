import { registerAs } from '@nestjs/config';
export default registerAs('DATABASE', () => ({
  uri: process.env.DB_URI,
//   user: process.env.DB_USER,
//   pass: process.env.DB_PASS,
  dbName: process.env.DB_NAME,
  // useFindAndModify: false,
  // useNewUrlParser: true,
}));
