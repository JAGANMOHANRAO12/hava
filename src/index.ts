import 'reflect-metadata';
import { createConnection } from 'typeorm';
import express from 'express';
import { Airport } from './entity/Airport';
import { City } from './entity/City';
import { Country } from './entity/Country';

const app = express();
const PORT = process.env.PORT || 3000;

createConnection({
    type: 'postgres', // or 'mysql'
    host: 'localhost',
    port: 5432, // or 3306 for MySQL
    username: 'yourUsername',
    password: 'yourPassword',
    database: 'yourDatabaseName',
    entities: [Airport, City, Country],
    synchronize: true,
    logging: true,
}).then(connection => {
    app.get('/airport/:iata_code', async (req, res) => {
        const iataCode = req.params.iata_code;
        const airportRepository = connection.getRepository(Airport);
        const airport = await airportRepository.findOne({
            where: { iata_code: iataCode },
            relations: ['city', 'city.country']
        });

        if (airport) {
            res.json({
                airport: {
                    id: airport.id,
                    icao_code: airport.icao_code,
                    iata_code: airport.iata_code,
                    name: airport.name,
                    type: airport.type,
                    latitude_deg: airport.latitude_deg,
                    longitude_deg: airport.longitude_deg,
                    elevation_ft: airport.elevation_ft,
                    address: {
                        city: {
                            id: airport.city.id,
                            name: airport.city.name,
                            country_id: airport.city.country?.id || null,
                            is_active: airport.city.is_active,
                            lat: airport.city.lat,
                            long: airport.city.long
                        },
                        country: airport.city.country ? {
                            id: airport.city.country.id,
                            name: airport.city.country.name,
                            country_code_two: airport.city.country.country_code_two,
                            country_code_three: airport.city.country.country_code_three,
                            mobile_code: airport.city.country.mobile_code,
                            continent_id: airport.city.country.continent_id
                        } : null
                    }
                }
            });
        } else {
            res.status(404).send('Airport not found');
        }
    });

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch(error => console.log(error));
