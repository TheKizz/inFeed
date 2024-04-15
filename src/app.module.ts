import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { SharedModule } from "./modules/shared/infrastructure/dependencies/shared.module";
import { UserAccessModule } from "./modules/user-access/infrastructure/dependencies/user-access.module";

@Module({
  imports: [SharedModule, UserAccessModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
