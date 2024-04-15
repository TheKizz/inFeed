import { Logger } from "@nestjs/common";
import { PrismaClient } from "../../../../../node_modules/.prisma/client";

export class PrismaClientAdapter extends PrismaClient {
  constructor() {
    const logger = new Logger(PrismaClientAdapter.name, { timestamp: true });
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
