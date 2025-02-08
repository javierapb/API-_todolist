import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import mongoose from 'mongoose';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const dotenv = require('dotenv');

async function bootstrap() {
  // Configurar dotenv
  dotenv.config();

  // Conectar a MongoDB
  try {
    await mongoose.connect(process.env.MONGODB_URI || '');
    console.log('Conexión exitosa a MongoDB');
  } catch (error) {
    console.error('Error conectando a MongoDB:', error);
  }

  const app = await NestFactory.create(AppModule);
  
  // Configurar CORS
  app.enableCors({
    origin: 'http://localhost:3001', // URL de tu frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
