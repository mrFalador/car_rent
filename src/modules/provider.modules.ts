import { Module } from "@nestjs/common";
import { DataBaseService } from "src/cars/database.service";

@Module({
  imports: [],
  controllers: [],
  providers: [DataBaseService],
})
export class SeederModule {}