import { Injectable } from "@nestjs/common";
import {Client} from "pg"
import { CarsService } from "./cars.service";
import { CreateSheringDto } from "./dto/create-shering-dto";





@Injectable()
export class  DataBaseService{
    client: any;
    constructor(){
        this.client = new Client({
            host: process.env.POSTGRES_HOST, 
            port: process.env.POSTGRES_PORT, //5432
            user: process.env.POSTGRES_USER, //"car_admin",
            password: process.env.POSTGRES_PASSWORD, //  "admin"
            database:  process.env.POSTGRES_DB, //car_db
        });
        this.client.connect()

    }

    async createTable({name,fields}:{name: string; fields: {name: string; type: string}[];}) {
        const fieldsQuery = fields
            .map(({name, type}) => `${name} ${type}`)
            .join(", ")
        
        const query = `CREATE TABLE ${name} (id serial primary key, ${fieldsQuery})`;

        const exist = await this.checkTable(name);
        if (exist){
            return;
        }

        try{
            await this.client.query(query);
        } catch(e){
            console.log(e);
        }
    }

    async checkTable(tableName:string){
        const request = `SELECT table_name FROM information_schema.tables WHERE table_schema='public'`;

        const { rows } = await this.client.query(request);
        const tableList = rows.map((item) => item.table_name);

        return tableList.includes(tableName);
    }

    async insertLine({tableName, dto}:{tableName:string; dto: CreateSheringDto}){
         const exist = await this.checkTable(tableName);
        if (!exist){
            return;
        }

        const values = Object.values(dto)
            .map((item) => `"${item}"`)
            .join(", ");    
        const query = `INSERT INTO public.${tableName} (car_number, tarif, use_start, use_end, mileage, totaly_cost, user_name)
                         VALUES ('${dto.car_number}', '${dto.tarif}', '${dto.use_start}', '${dto.use_end}', '${dto.mileage}', '${dto.totaly_cost}', '${dto.user_name}');`;
        try{
            await this.client.query(query);
        } catch(e){
            console.log(e);
        }
    }


    async insertLineSeed({
        tableName,
        data,
      }: {
        tableName: string;
        data: { [key: string]: string | number };
      }) {
        const exist = await this.checkTable(tableName);
        if (!exist) {
          return;
        }
    
        const keys = Object.keys(data)
          .map((item) => `"${item.toLowerCase()}"`)
          .join(", ");
        const values = Object.values(data)
          .map((item) => `'${item}'`)
          .join(", ");
        const query = `insert into public."${tableName.toLowerCase()}"
          (${keys})
          values (${values})
        `;
    
        try {
          await this.client.query(query);
        } catch (error) {
          console.log(error);
        }
      }

    async findCar(car : string){
        let col: number;
        const query = `select number 
                       from public.cars 
                       where number = '${car}' 
                       group by number`

        const result =  await this.client.query(query)
          if (result.rows.length != 0 ){
            col = 1
          } else {col = 0}
 
        return(col)
       
    }

    async findShering(car: string){
      const query = `select *
                     from public.carshering
                     where car_number = '${car}'
                     order by use_end DESC
                     limit 1`;
      
      try{
        const result = await this.client.query(query);
        return result.rows[0];
      }catch(e){
        console.log(e);
      }
    }

    async getReportAll(){
      const real_time = Date.now();

      const query = `select * from public.carshering where extract(YEAR FROM use_start) = extract(YEAR FROM now())
      and extract(MONTH FROM use_start) = extract(MONTH FROM now())`

      try{
        const result = await this.client.query(query)
        const report = result.rows
        return report;
      }catch(e){
        console.log(e)
      }
    }

    async getReportCar(car_number){
      console.log(car_number)
      const query = `select * from public.carshering where car_number = '${car_number}' and extract(YEAR FROM use_start) = extract(YEAR FROM now())
      and extract(MONTH FROM use_start) = extract(MONTH FROM now())`

      try{
        const result = await this.client.query(query)
        const report = result.rows
        return report;
      }catch(e){
        console.log(e)
      }
    }


    
    async seed({
        tableName,
        lines,
      }: {
        tableName: string;
        lines: { [key: string]: string | number }[];
      }) {
        const exist = await this.checkTable(tableName);
        if (!exist) {
          return;
        }
        await Promise.all(
          lines.map((line) => this.insertLineSeed({ tableName, data: line }))
        );
    }

}