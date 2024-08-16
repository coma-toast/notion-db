import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbService } from './db/db.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { NotionService } from './notion/notion.service';
import { NotionController } from './notion/notion.controller';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // TypeOrmModule.forRootAsync({
    //   imports: [ConfigModule],
    //   useFactory: (configService: ConfigService) => ({
    //     type: 'postgres',
    //     host: configService.get<string>('DB_HOST'),
    //     port: configService.get<number>('DB_PORT'),
    //     username: configService.get<string>('DB_USER'),
    //     password: configService.get<string>('DB_PASS'),
    //     database: configService.get<string>('DB'),
    //     entities: [__dirname + '/**/*.entity{.ts,.js}'],
    //     synchronize: true,
    //   }),
    //   inject: [ConfigService],
    // }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    AuthModule,
    UserModule,
  ],
  controllers: [AppController, NotionController],
  providers: [AppService, DbService, NotionService],
  exports: [DbService, NotionService],
})
export class AppModule {}
