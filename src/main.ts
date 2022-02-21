import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";


async function start() {
    const PORT = process.env.PORT || 5000
    const app = await NestFactory.create(AppModule)

    const config = new DocumentBuilder()
        .setTitle('CarsheringApp backend')
        .setDescription(' This application can generate records of car rental available in the database, as well as return a report on the employment of cars. For install app do: $npm install. For create table and add seed to table: $npm run seed. For running app do: $npm start')
        .setVersion('1.0.0')
        .build()
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/docs', app, document)

    await app.listen(PORT, () => console.log('Server started on port = ', PORT))
}

start();