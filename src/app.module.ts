import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { appFeatureModules } from "./@customs/feature-modules.loader";
import { TypeOrmModule } from "@nestjs/typeorm";
import { getTypeOrmConfig } from "./databases/database";
import { LastActiveInterceptor } from "./common/interceptors/last-active.interceptor";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(getTypeOrmConfig()),
    ...appFeatureModules,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LastActiveInterceptor,
    },
  ],
})
export class AppModule {}
