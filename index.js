const express = require('express');
const app = express();
const hbs = require('hbs');
const path = require('path');
const request = require('request');


//Finding the views folder directory
const viewsPath = path.join(__dirname, '/views');
const partialPath = path.join(__dirname, '/views/inc');

hbs.registerPartials(partialPath);

//Setting Nodejs View Engine to use Handlebars(HBS) files
app.set('view engine', 'hbs');

//Setting the Views from HBS to come from our views path variable
app.set('views', viewsPath);

app.use(express.urlencoded());

app.use(express.json());

app.use(express.static('views'));

app.get("/", (req, res) => {
    res.render('index');
});

app.get("/forecast", (req, res) => {
    res.render('forecast');
});

app.get("/forecast2", (req, res) => {
    res.render('forecast2');
});

app.get('/displayWeather', (req, res) => {
    const apiKey = 'bfe1879188a0ac1aa23ffdfc84b39fd6';
    const city = req.query.theCity;
    const country = req.query.theCountry;
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiKey}&units=metric`;

    request ({ url: weatherUrl, json: true }, (error, response) => {
        if(response.body.message){
            res.render("index", {
                weather: 'Sorry that place does not exist'
            })
        } else {
            res.render("index", {
                weather: response.body.main.temp,
                name: response.body.name,
                place: response.body.sys.country,
                description: response.body.weather[0].main,
                icon: response.body.weather[0].icon
            })
        }
    });
});

app.get('/displayManForecast', (req, res) => {
    const apiKey = 'bfe1879188a0ac1aa23ffdfc84b39fd6';
    const manForecastUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=53.4808&lon=2.2426&
    exclude=hourly,minutely&appid=${apiKey}&units=metric`;

    request ({ url: manForecastUrl, json: true }, (error, response) => {
        if(response.body.message){
            res.render("forecast", {
                day1: 'Sorry that place does not exist'
            })
        } else {
            res.render("forecast", {
                current: response.body.current.temp,
                currentIcon: response.body.current.weather[0].icon,
                day1: response.body.daily[0].temp.day,
                day1Weather: response.body.daily[0].weather[0].main,
                d1icon: response.body.daily[0].weather[0].icon,
                day2: response.body.daily[1].temp.day,
                day2Weather: response.body.daily[1].weather[0].main,
                d2icon: response.body.daily[1].weather[0].icon,
                day3: response.body.daily[2].temp.day,
                day3Weather: response.body.daily[2].weather[0].main,
                d3icon: response.body.daily[2].weather[0].icon,
                day4: response.body.daily[3].temp.day,
                day4Weather: response.body.daily[3].weather[0].main,
                d4icon: response.body.daily[3].weather[0].icon,
                day5: response.body.daily[4].temp.day,
                day5Weather: response.body.daily[4].weather[0].main,
                d5icon: response.body.daily[4].weather[0].icon,
                day6: response.body.daily[5].temp.day,
                day6Weather: response.body.daily[5].weather[0].main,
                d6icon: response.body.daily[5].weather[0].icon,
                day7: response.body.daily[6].temp.day,
                day7Weather: response.body.daily[6].weather[0].main,
                d7icon: response.body.daily[6].weather[0].icon,
            })
            
        }
    });
});

app.get('/displayBocasForecast', (req, res) => {
    const apiKey = 'bfe1879188a0ac1aa23ffdfc84b39fd6';
    const bocasForecastUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=9.4048&lon=82.2692&
    exclude=hourly,minutely&appid=${apiKey}&units=metric`;

    request ({ url: bocasForecastUrl, json: true }, (error, response) => {
        if(response.body.message){
            res.render("forecast2", {
                day1: 'Sorry that place does not exist'
            })
        } else {
            res.render("forecast2", {
                bcurrent: response.body.current.temp,
                bcurrentIcon: response.body.current.weather[0].icon,
                bday1: response.body.daily[0].temp.day,
                bday1Weather: response.body.daily[0].weather[0].main,
                bd1icon: response.body.daily[0].weather[0].icon,
                bday2: response.body.daily[1].temp.day,
                bday2Weather: response.body.daily[1].weather[0].main,
                bd2icon: response.body.daily[1].weather[0].icon,
                bday3: response.body.daily[2].temp.day,
                bday3Weather: response.body.daily[2].weather[0].main,
                bd3icon: response.body.daily[2].weather[0].icon,
                bday4: response.body.daily[3].temp.day,
                bday4Weather: response.body.daily[3].weather[0].main,
                bd4icon: response.body.daily[3].weather[0].icon,
                bday5: response.body.daily[4].temp.day,
                bday5Weather: response.body.daily[4].weather[0].main,
                bd5icon: response.body.daily[4].weather[0].icon,
                bday6: response.body.daily[5].temp.day,
                bday6Weather: response.body.daily[5].weather[0].main,
                bd6icon: response.body.daily[5].weather[0].icon,
                bday7: response.body.daily[6].temp.day,
                bday7Weather: response.body.daily[6].weather[0].main,
                bd7icon: response.body.daily[6].weather[0].icon,
            })
            
        }
    });
});

app.listen(3000, () => {
    console.log("Server is running on Port 3000");
});