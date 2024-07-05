import { DataSource } from 'typeorm';
import { Airport } from './entity/Airport';
import { City } from './entity/City';
import { Country } from './entity/Country';

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'your_username',
    password: 'your_password',
    database: 'hava_havai',
    synchronize: true,
    logging: true,
    entities: [Airport, City, Country],
    migrations: [],
    subscribers: [],
});
