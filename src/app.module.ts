import { Module } from "@nestjs/common";
import { ConfigModule } from '@nestjs/config';
import { CarsModule } from './cars/cars.module';


@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env'
        }),         
        CarsModule,
      ],
})
export class AppModule{}