import { AppService } from './app.service';
import { MiddlewareConsumer, Module, NestModule, OnModuleInit } from '@nestjs/common';
import { MikroORM } from '@mikro-orm/core';
import { MikroOrmMiddleware, MikroOrmModule } from '@mikro-orm/nestjs';
import { AppController } from './app.controller';
import { UserModule } from './user/user.module';

@Module({
  controllers: [
    AppController,
  ],
  imports: [
    MikroOrmModule.forRoot(),
    UserModule,
  ],
  providers: [AppService],
})
export class AppModule implements NestModule, OnModuleInit {

  constructor(private readonly orm: MikroORM) {}

  async onModuleInit(): Promise<void> {
    await this.orm.getMigrator().up();
  }

  // Register the middleware directly in AppModule
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(MikroOrmMiddleware)
      .forRoutes('*');
  }

}


// @Module({
//   imports: [],
//   controllers: [AppController],
//   providers: [AppService],
// })
// export class AppModule {}
