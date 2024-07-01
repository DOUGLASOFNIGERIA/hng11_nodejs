const express = require('express');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;

app.get('/api/hello', async(req, res) => {
    const visitorName = req.query.visitor_name || 'Guest';

    //Get the client's IP address
    const clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const location = 'New York';
    const temperature = 11;

    //Use a third-party service to get the location and temperature

    try {
        //const locationResponse = await axios.get('https://ipapi.co/${clientIp}/json/');
        //const locationData = locationResponse.data;
        //const city = locationData.city;

        //const weatherResponse = await axios.get('https://api.open-meteo.com/v1/forecast?latitude=${locationData.latitude}&longitude=${locationData.lomgtitude}&current_weather=true')
        //const weatherData = weatherResponse.data.current_weather;
        //const temperature = weatherData.temperature;

        res.json({
            clientIp: clientIp,
            location: city,
            greeting: `Hello, ${visitorName}!, the temperature is ${temperature} degrees Celsius in ${location}`
        });
    }   catch (error) {
        res.status(500).json({ error: 'Unable to fetch location or weather data'});
    }
});

app.listen(port, () =>{giy
    console.log(`Server is running on port ${port}`);
});