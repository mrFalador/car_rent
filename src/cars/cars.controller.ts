import { Body, Controller, Get, Post } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateSheringDto } from './dto/create-shering-dto';


@Controller('/cars')
export class CarsController {

    constructor(private carsService: CarsService){}

    @Post()
    create(@Body() carsDto: CreateSheringDto){
        return this.carsService.createShering(carsDto);
    }

    @Get()
    getReport(@Body() carsDto : CreateSheringDto){
        return this.carsService.createReport(carsDto);
    }
}



