import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { PrismaExceptionFilter } from './common/filters/prisma-exception.filter';

/** main.ts va e2e testlar bir xil konfiguratsiyani ishlatadi */
export function setupApp(app: INestApplication) {
  const express = app as NestExpressApplication;
  express.disable('x-powered-by');
  express.useBodyParser('json', { limit: '100kb' });

  app.setGlobalPrefix('api');
  app.use(helmet());
  app.enableCors({
    origin: (process.env.FRONTEND_URL ?? 'http://localhost:5173').split(',').map((s) => s.trim()),
    credentials: true,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // DTO da yo'q maydonlar olib tashlanadi (masalan, role: SUPERADMIN)
      forbidNonWhitelisted: true, // ...va xato qaytariladi
      transform: true,
      stopAtFirstError: true,
    }),
  );
  app.useGlobalFilters(new PrismaExceptionFilter());

  // Productionda standart holatda o'chiq (SWAGGER_ENABLED=true bilan yoqiladi)
  const swaggerDefault = process.env.NODE_ENV === 'production' ? 'false' : 'true';
  if ((process.env.SWAGGER_ENABLED ?? swaggerDefault) === 'true') {
    const config = new DocumentBuilder()
      .setTitle('Formo API')
      .setDescription(
        'Formo — maxsus futbol formalari platformasi.\n\n' +
          '**Rollar:** SUPERADMIN (yagona), OPERATOR (yagona), TAILOR (tikuv sexlari), USER (mobil ilova).\n\n' +
          "Kirish: `POST /api/auth/login` → `accessToken` ni yuqoridagi **Authorize** tugmasiga qo'ying.",
      )
      .setVersion('1.0')
      .addBearerAuth()
      .build();
    SwaggerModule.setup('api/docs', app, SwaggerModule.createDocument(app, config), {
      swaggerOptions: { persistAuthorization: true },
    });
  }
  return app;
}
