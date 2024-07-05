# Hava Havai Backend Assignment

## Setup

1. Clone the repository.
2. Install dependencies: `npm install`.
3. Set up the database in `src/data-source.ts`.
4. Run the application: `npm start`.

## API

### Get Airport Details

**Endpoint:** `GET /api/airport/:iata_code`

**Response:**

```json
{
  "airport": {
    "id": 145,
    "icao_code": "VIAG",
    "iata_code": "AGR",
    "name": "Agra Airport / Agra Air Force Station",
    "type": "medium_airport",
    "latitude_deg": 27.157683,
    "longitude_deg": 77.960942,
    "elevation_ft": 551,
    "address": {
      "city": {
        "id": 436,
        "name": "Agra",
        "country_id": 76,
        "is_active": true,
        "lat": 27.18,
        "long": 78.02
      },
      "country": {
        "id": 76,
        "name": "India",
        "country_code_two": "IN",
        "country_code_three": "IND",
        "mobile_code": 91,
        "continent_id": 1
      }
    }
  }
}
```
