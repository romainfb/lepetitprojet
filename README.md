# Le Petit Projet
## _Displaying meteorological data - **Best practices** project_

 [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT) [![made-with-javascript](https://img.shields.io/badge/Made%20with-JavaScript-1f425f.svg)](https://www.javascript.com) [![Awesome](https://awesome.re/badge.svg)](https://romainfb.github.com/lepetitprojet/)

The Small Project is part of the Best Practices course at Sup de Vinci. It includes the integration of a web interface for displaying meteorological data.

## Useful links - Project

Wiki: https://github.com/romainfb/lepetitprojet/wiki/Workflow

## API Routes

1. **GET /sensors**
   - *Description*: Fetches all data from the `sensor_data` table.
   - *Usage*: `http://localhost:5000/sensors`

2. **GET /sensor=<int:id>**
   - *Description*: Retrieves data for the sensor with the specified ID.
   - *Usage*: `http://localhost:5000/sensor=1` (replace 1 with the desired sensor ID)

3. **GET /sensors/lastsensors**
   - *Description*: Retrieves data for sensors with the most recent reading date.
   - *Usage*: `http://localhost:5000/sensors/lastsensors`

4. **POST /rename_sensor=<int:id>**
   - *Description*: Renames the `sensorLibelle` field based on the specified ID.
   - *Usage*: `http://localhost:5000/rename_sensor=1` (replace 1 with the desired sensor ID)
   - *POST Request*: `{ "new_sensor_libelle": "New label" }`

5. **GET /get_libelle=<int:id>**
   - *Description*: Retrieves the label of a specific sensor.
   - *Usage*: `http://localhost:5000/get_libelle=1` (replace 1 with the desired sensor ID)

6. **POST /send_email**
   - *Description*: Sends an email.
   - *Usage*: `http://localhost:5000/send_email`
   - *POST Request*: `{ "receiver_email": "example@gmail.com", "message_body": "Message content" }`

## Contributors

| Contributors list     |
| ------------- |
|[@romainfb](https://github.com/romainfb)|
|[@mimy-GMC](https://github.com/mimy-GMC) |
|[@TiboPaulJack](https://github.com/TiboPaulJack) |
