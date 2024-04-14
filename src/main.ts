import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import * as compression from "compression";
import helmet from "helmet";
import { LoggerInterceptor } from "./modules/shared/presentation/interceptors/logger.interceptor";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: true,
      whitelist: true,
      transform: true,
    }),
  );
  app.useGlobalInterceptors(new LoggerInterceptor());
  app.use(compression());
  app.use(helmet());
  app.enableCors({
    origin: "*",
  });
  await app.listen(3000);
}

bootstrap().catch((error) => {
  console.error(error);
});
