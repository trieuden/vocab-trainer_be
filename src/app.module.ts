import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_GUARD, APP_INTERCEPTOR } from "@nestjs/core";
import { JwtAuthGuard } from "@/core/guards/jwt-auth.guard";
import { appFeatureModules } from "./@customs/feature-modules.loader";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { addTransactionalDataSource } from "typeorm-transactional";
import { getTypeOrmConfig } from "./databases/database";
import { LastActiveInterceptor } from "./common/interceptors/last-active.interceptor";
import { UserContextInterceptor } from "./common/interceptors/user-context.interceptor";
import { AuditSubscriber } from "./common/subscribers/audit.subscriber";
import { GeminiModule } from "./integration/gemini/gemini.module";
import { DictionaryModule } from "./integration/dictionary/dictionary.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => getTypeOrmConfig(),
      async dataSourceFactory(options) {
        if (!options) {
          throw new Error("Invalid TypeORM options");
        }
        return addTransactionalDataSource(new DataSource(options));
      },
    }),
    GeminiModule,
    DictionaryModule,
    ...appFeatureModules,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LastActiveInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: UserContextInterceptor,
    },
    AuditSubscriber,
  ],
})
export class AppModule {}
