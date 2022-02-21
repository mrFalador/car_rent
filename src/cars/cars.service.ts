import { Injectable} from '@nestjs/common';
import { CreateSheringDto } from './dto/create-shering-dto';
import { DataBaseService } from './database.service';

@Injectable()
export class CarsService {

        async createShering(dto: CreateSheringDto){      

        let dayleftt =new Date(dto.use_end) ;
        let daytot = new Date(dto.use_start) ;
        if (dayleftt.getDay() == 0 || dayleftt.getDay() == 6) {
            return ({message:"День начала аренды не может быть выходным"})
        }
        if (daytot.getDay() == 0 || daytot.getDay() == 6) {
            return ({message:"День окончания аренды не может быть выходным"})
        }
        const daylag = Math.ceil(Math.abs(dayleftt.getTime()-daytot.getTime())/(1000 * 3600 * 24));
        if (daylag >= 30){
            return ({message:"Срок аренды не может привышать 30 дней"})
        }
        if (dto.mileage / daylag <= 200 ){
            dto.tarif = 270
        }
        if (dto.mileage / daylag <= 350 && dto.mileage / daylag > 200 ){
            dto.tarif = 330
        }
        if (dto.mileage / daylag <= 500 && dto.mileage / daylag > 350 ){
            dto.tarif = 390
        }
        let cost = daylag * dto.tarif
        let sale = 1;
        if(daylag >= 3 && daylag <= 5){
            sale = 0.95;
        }
        if(daylag >= 6 && daylag <= 14){
            sale = 0.90;
        }
        if(daylag >= 15 && daylag <= 30){
            sale = 0.85;
        }
        dto.totaly_cost = cost * sale;
       
        try{
            const todb = new DataBaseService();
            const findcar = await todb.findCar(dto.car_number)
            if (!findcar){
                return({message: "Такой машины в парке нет"});
            }

            const nowShering = await todb.findShering(dto.car_number);
            if (Date.parse(String(daytot)) - Date.parse(nowShering.use_end)  < 259200000  ){
                return({message: "Машина еще не готова"})
            }

            const tableName = `carshering`;
            await todb.insertLine({ tableName, dto})
        }catch(e){
            console.log(e)
        }
        
        
        return (dto)
    }

    async createReport(dto : CreateSheringDto){
        try{
            const fromdb = new DataBaseService();
            if (dto.car_number){
                return await fromdb.getReportCar(dto.car_number);
            } 
            return await fromdb.getReportAll();
        }catch(e){
            console.log(e)
        }
    }


}

