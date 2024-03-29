import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IDatabaseAbstract } from './core/abstract/database.abstract';
import * as entities from './entities';
import { PgDatabaseService } from './pg-data.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forRoot({})],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'postgres',
          host: configService.get('PG_HOST'),
          port: configService.get('PG_PORT'),
          username: configService.get('PG_USER'),
          password: configService.get('PG_PASS'),
          database: configService.get('PG_DATABASE'),
          logging: false,
          entities: Object.values(entities),
          synchronize: true,
        };
      },
    }),
    TypeOrmModule.forFeature(Object.values(entities)),
  ],
  providers: [
    {
      provide: IDatabaseAbstract,
      useClass: PgDatabaseService,
    },
  ],
  exports: [IDatabaseAbstract],
}) 
export class PgDatabaseModule {}