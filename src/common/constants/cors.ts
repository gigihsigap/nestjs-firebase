import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

export const CORS_OPTIONS: CorsOptions = {
  origin: true,
//   origin: [
//     'http://localhost:5317',
//     'https://vite-react-app-two.vercel.app',
//     // 'http://www.example.com',
//     // 'http://app.example.com',
//   ],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
};
