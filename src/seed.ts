import { NestFactory } from "@nestjs/core";
import { DataBaseService } from "./cars/database.service";
import { SeederModule } from "./modules/provider.modules";


async function bootstrap() {
    const client = await NestFactory.createApplicationContext(SeederModule)
    const seeder = client.get(DataBaseService)

    await seeder.createTable({
        name: "cars",
        fields:[
            { name: "type", type: "text" },
            { name: "model", type: "text" },
            { name: "number", type: "text" },
            { name: "vin", type: "text" },
        ]
    })

    await seeder.createTable({
        name: "carshering",
        fields: [
            {name: "car_number", type: "text"},
            {name: "tarif", type: "integer"},
            {name: "use_start", type: "date"},
            {name: "use_end", type: "date"},
            {name: "mileage", type: "integer"},
            {name: "totaly_cost", type: "integer"},
            {name: "user_name", type: "text"}
        ]
    })

    await seeder.seed({
        tableName: "cars",
        lines: [
            { type: "sedan", model: "Honda Civic", number: "AA100A", vin: "VIN001" },
            { type: "coupe", model: "Chavrolet Corvette", number: "BB200B", vin: "VIN002" },
            { type: "sedan", model: "Honda Accord", number: "CC300C", vin: "VIN003" },
            { type: "sedan", model: "Nissan Altima", number: "EE400E", vin: "VIN004" },
            { type: "coupe", model: "Ford Mustang", number: "KK500R", vin: "VIN005" },
    ],
    })

    await seeder.seed({
        tableName: "carshering",
        lines: [
            {car_number: "AA100A", use_start: "2021-01-01", use_end: "2021-01-04", mileage: "400",  user_name: "John"}, 
            {car_number: "BB200B", use_start: "2021-01-01", use_end: "2021-01-06", mileage: "800",  user_name: "Anna"},
            {car_number: "AA100A", use_start: "2021-01-08", use_end: "2021-01-13", mileage: "200",  user_name: "Pavel"},
            {car_number: "CC300C", use_start: "2021-01-04", use_end: "2021-01-08", mileage: "380",  user_name: "Jacob"},
            {car_number: "EE400E", use_start: "2021-01-19", use_end: "2021-01-21", mileage: "100",  user_name: "John"},
            {car_number: "AA100A", use_start: "2021-01-19", use_end: "2021-01-25", mileage: "900",  user_name: "Kate"},
            {car_number: "KK500R", use_start: "2021-01-23", use_end: "2021-01-25", mileage: "90",  user_name: "Hloe"},
            {car_number: "AA100A", use_start: "2021-01-29", use_end: "2021-02-01", mileage: "220",  user_name: "Genrie"},
            {car_number: "EE100E", use_start: "2021-01-28", use_end: "2021-01-29", mileage: "50",  user_name: "Gordon"},

            {car_number: "AA100A", use_start: "2021-02-02", use_end: "2021-02-04", mileage: "400",  user_name: "John"}, 
            {car_number: "BB200B", use_start: "2021-02-02", use_end: "2021-02-05", mileage: "300",  user_name: "Anna"},
            {car_number: "AA100A", use_start: "2021-02-08", use_end: "2021-02-12", mileage: "250",  user_name: "Pavel"},
            {car_number: "CC300C", use_start: "2021-02-04", use_end: "2021-02-08", mileage: "380",  user_name: "Jacob"},
            {car_number: "EE400E", use_start: "2021-02-19", use_end: "2021-02-22", mileage: "130",  user_name: "John"},
            {car_number: "AA100A", use_start: "2021-02-19", use_end: "2021-02-25", mileage: "900",  user_name: "Kate"},
            {car_number: "KK500R", use_start: "2021-02-23", use_end: "2021-02-25", mileage: "90",  user_name: "Hloe"},


            {car_number: "AA100A", use_start: "2021-03-05", use_end: "2021-03-08", mileage: "400",  user_name: "John"}, 
            {car_number: "BB200B", use_start: "2021-03-03", use_end: "2021-03-08", mileage: "500",  user_name: "Anna"},
            {car_number: "AA100A", use_start: "2021-03-12", use_end: "2021-03-15", mileage: "200",  user_name: "Pavel"},
            {car_number: "CC300C", use_start: "2021-03-04", use_end: "2021-03-08", mileage: "380",  user_name: "Jacob"},
            {car_number: "EE400E", use_start: "2021-03-19", use_end: "2021-03-21", mileage: "100",  user_name: "John"},
            {car_number: "AA100A", use_start: "2021-03-19", use_end: "2021-03-25", mileage: "900",  user_name: "Kate"},
            {car_number: "KK500R", use_start: "2021-03-23", use_end: "2021-03-25", mileage: "90",  user_name: "Hloe"},
            {car_number: "KK500R", use_start: "2021-03-29", use_end: "2021-03-31", mileage: "700",  user_name: "Donn"},
            {car_number: "AA100A", use_start: "2021-03-29", use_end: "2021-04-02", mileage: "220",  user_name: "Genrie"},
            {car_number: "EE100E", use_start: "2021-03-26", use_end: "2021-03-30", mileage: "350",  user_name: "Gordon"},

            {car_number: "AA100A", use_start: "2021-04-06", use_end: "2021-04-08", mileage: "200",  user_name: "John"}, 
            {car_number: "BB200B", use_start: "2021-04-05", use_end: "2021-04-06", mileage: "30",  user_name: "Anna"},
            {car_number: "AA100A", use_start: "2021-04-12", use_end: "2021-04-13", mileage: "200",  user_name: "Pavel"},
            {car_number: "CC300C", use_start: "2021-04-12", use_end: "2021-04-15", mileage: "380",  user_name: "Jacob"},
            {car_number: "EE400E", use_start: "2021-04-05", use_end: "2021-04-09", mileage: "100",  user_name: "John"},
            {car_number: "AA100A", use_start: "2021-04-19", use_end: "2021-04-26", mileage: "900",  user_name: "Kate"},
            {car_number: "KK500R", use_start: "2021-04-01", use_end: "2021-04-07", mileage: "90",  user_name: "Hloe"},
            {car_number: "KK500R", use_start: "2021-04-12", use_end: "2021-04-19", mileage: "700",  user_name: "Donn"},
            {car_number: "AA100A", use_start: "2021-04-29", use_end: "2021-05-04", mileage: "220",  user_name: "Genrie"},
            {car_number: "EE100E", use_start: "2021-04-12", use_end: "2021-04-20", mileage: "50",  user_name: "Gordon"},

            {car_number: "AA100A", use_start: "2021-05-05", use_end: "2021-05-11", mileage: "400",  user_name: "John"}, 
            {car_number: "BB200B", use_start: "2021-04-12", use_end: "2021-05-06", mileage: "800",  user_name: "Anna"},
            {car_number: "AA100A", use_start: "2021-05-11", use_end: "2021-05-14", mileage: "200",  user_name: "Pavel"},
            {car_number: "CC300C", use_start: "2021-04-29", use_end: "2021-05-06", mileage: "380",  user_name: "Jacob"},
            {car_number: "EE400E", use_start: "2021-05-04", use_end: "2021-05-13", mileage: "100",  user_name: "John"},
            {car_number: "AA100A", use_start: "2021-05-19", use_end: "2021-05-24", mileage: "900",  user_name: "Kate"},
            {car_number: "KK500R", use_start: "2021-04-19", use_end: "2021-04-30", mileage: "90",  user_name: "Hloe"},
            {car_number: "KK500R", use_start: "2021-05-05", use_end: "2021-05-12", mileage: "700",  user_name: "Donn"},
            {car_number: "AA100A", use_start: "2021-05-28", use_end: "2021-06-01", mileage: "220",  user_name: "Genrie"},
            {car_number: "EE100E", use_start: "2021-05-06", use_end: "2021-05-11", mileage: "50",  user_name: "Gordon"},

            {car_number: "AA100A", use_start: "2021-07-19", use_end: "2021-07-23", mileage: "900",  user_name: "Kate"},
            {car_number: "KK500R", use_start: "2021-07-19", use_end: "2021-07-30", mileage: "990",  user_name: "Hloe"},
            {car_number: "KK500R", use_start: "2021-08-02", use_end: "2021-08-12", mileage: "700",  user_name: "Donn"},
            {car_number: "AA100A", use_start: "2021-08-27", use_end: "2021-08-31", mileage: "220",  user_name: "Genrie"},
            {car_number: "EE100E", use_start: "2021-09-06", use_end: "2021-09-10", mileage: "550",  user_name: "Gordon"},

        ]
    })
}

bootstrap();