import { Global, Module } from "@nestjs/common";
import { PrismaClientService } from "../infrastructure/clients/prisma.client";

@Global()
@Module({
  providers: [PrismaClientService],
  exports: [PrismaClientService],
})
export class SharedModule {}
