const express = require('express');
const axios = require('axios');
const requestIp = require('request-ip');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;

app.use(requestIp.mw());

function getClientIp(req) {
    return req.headers['x-forwarded-for'] || req.connection.remoteAddress;
}

app.get('/api/hello', async (req, res) => {
    const visitorName = req.query.visitor_name || 'Guest';
    const clientIp = getClientIp(req);
    const ipInfoResponse = async (clientIp) => {
        await ipinfo(clientIp)
    };

    const city = ipInfoResponse.city || 'New York';


    try {
        // Get location details based on IP address
        // Get the weather data for the specified city
        console.log(city)
        const weatherResponse = await axios.get(`http://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=${city}`);
        const weatherData = weatherResponse.data;
        const temperature = weatherData.current.temp_c;

        res.json({
            client_ip: clientIp, //` 127.0.0.${clientIp}, // The IP address of the requester`,
            location: `${city}`,
            greeting: `Hello, ${visitorName}! the temperature is ${temperature} degrees Celsius in ${city}.`
        });
    } catch (error) {
        console.log(city);
        res.status(500).json({ error: 'Unable to fetch weather data' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
