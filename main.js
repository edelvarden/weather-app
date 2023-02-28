// let cityName = store.get('user').city;
// let apikey = store.get('user').api;

const cityField = document.querySelector("#city");
const keyField = document.querySelector("#key");
const submitButton = document.querySelector("#submit");


function saveLocal(city, key) {
    city = `${city}`.trim();
    key = `${key}`.trim();
    if (city && key) {
        store.set('user', { city: city, key: key });
    }
    else console.log("incorrect values");
}

submit.addEventListener("click", () => {
    saveLocal(cityField.value, keyField.value);

    const city = getLocal("city");
    const key = getLocal("key");

    getWeather(city, key);
});

function getLocal(value) {
    let localValue = "";
    try { localValue = store.get('user')[`${value}`] } catch (error) { console.log(error) }
    // console.log(localValue);
    return localValue;
}


window.addEventListener("load", () => {
    const city = getLocal("city");
    const key = getLocal("key");

    cityField.value = city;
    keyField.value = key;

    getWeather(city, key);
});

function k2C(kelvin) {
    return kelvin - 273.15;
}

function getWeather(city, key) {
    const panel = document.querySelector("#panel");

    if (city && key) {

        // for week
        const api_url = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${key}`;

        getapi(api_url);

        // Defining async function
        async function getapi(url) {

            // Storing response
            const response = await fetch(url);

            // Storing data in form of JSON
            const data = await response.json();
            console.log(data);
            showWeek(data);
        }

        function showWeek(data) {
            data.list.map(item => {
                show(item);
            });
        }

        function show(data) {

            let id = data.weather[0].id; // Clouds
            let description = data.weather[0].description; // overcast clouds

            function getIcon(id) {
                let iconId = "";

                // Group 2xx: Thunderstorm
                let clear = [
                    800
                ];
                let fewClouds = [
                    801
                ];
                let scatteredClouds = [
                    802
                ];
                let brokenClouds = [
                    803,
                    804
                ];
                let showerRain = [
                    300,
                    301,
                    302,
                    310,
                    311,
                    312,
                    313,
                    314,
                    321,
                    520,
                    521,
                    522,
                    531,
                ];

                let rain = [
                    500,
                    501,
                    502,
                    503,
                    504,
                ];
                let thunderstorm = [
                    200,
                    201,
                    202,
                    210,
                    211,
                    212,
                    221,
                    230,
                    231,
                    232,
                ];
                let snow = [
                    511,
                    600,
                    601,
                    602,
                    611,
                    612,
                    613,
                    615,
                    616,
                    620,
                    621,
                    622,
                ];
                let mist = [
                    701,
                    711,
                    721,
                    731,
                    741,
                    751,
                    761,
                    762,
                    771,
                    781,
                ];


                if (clear.indexOf(id) !== -1) {
                    iconId = "01d";
                }
                if (fewClouds.indexOf(id) !== -1) {
                    iconId = "02d";
                }
                if (scatteredClouds.indexOf(id) !== -1) {
                    iconId = "03d";
                }
                if (brokenClouds.indexOf(id) !== -1) {
                    iconId = "04d";
                }
                if (showerRain.indexOf(id) !== -1) {
                    iconId = "09d";
                }
                if (rain.indexOf(id) !== -1) {
                    iconId = "10d";
                }
                if (thunderstorm.indexOf(id) !== -1) {
                    iconId = "11d";
                }
                if (snow.indexOf(id) !== -1) {
                    iconId = "13d";
                }
                if (mist.indexOf(id) !== -1) {
                    iconId = "50d";
                }

                return `${iconId}.png`;
            }

            let icon = getIcon(id);
            let iconComponent = `<img src="./icons/${icon}" alt="${description}">`

            // convert Kelvins to Celsius
            let tempMin = Math.round(k2C(+data.main.temp_min));
            let tempMax = Math.round(k2C(+data.main.temp_max));
            let degrees = "°C";
            let tempComponent = `<p id="temp"><span>${data.dt_txt}</span><span class="value">${tempMin}/${tempMax}</span><span class="degrees">${degrees}</span></p>`

            panel.innerHTML += `<div>${iconComponent}${tempComponent}</div>`;
        }
    }
}