<h2>Carshering backend</h2>

## Description

This application can generate records of car rental available in the database, as well as return a report on the employment of cars.
Apphication has two types of reqwests on address ./cars

--GET  can be empty or contain the following type of json:
{
  "car_number": "car_number"
}

--POST Must contain a json object:
{
  "car_number": "car_number",
  "use_start": "use_start"
  "use_end": "use_end",
  "mileage": "mileage",
  "user_name": "user_name"
}

types:
    car_number: string;
    use_start: Date;
    use_end: Date;
    mileage: number;
    user_name: string;

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Migration

```bash
#migration table and add seed
$ npm run seed

