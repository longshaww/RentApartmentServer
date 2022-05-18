import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from '../ormconfig';
import { LessorModule } from './lessor/lessor.module';
import { ApartmentModule } from './apartment/apartment.module';
import { BillModule } from './bill/bill.module';
import { BookedDateModule } from './booked-date/booked-date.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { JwtStrategy } from './auth/jwt.strategy';

@Module({
  imports: [
    ApartmentModule,
    LessorModule,
    TypeOrmModule.forRoot(config),
    BillModule,
    BookedDateModule,
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        STRIPE_SECRET_KEY: Joi.string(),
        STRIPE_CURRENCY: Joi.string(),
        FRONTEND_URL: Joi.string(),
        // ...
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule {}
