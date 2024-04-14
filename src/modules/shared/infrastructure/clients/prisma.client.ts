import { Logger } from "@nestjs/common";
import { PrismaClient } from "../../../../../node_modules/.prisma/client";

export class PrismaClientService extends PrismaClient {
  constructor() {
    const logger = new Logger(PrismaClientService.name);
    super();
    this.$connect()
      .then(() => {
        logger.log("Connected to Prisma");
      })
      .catch((err: unknown) => {
        logger.error(err);
      });
  }
}
