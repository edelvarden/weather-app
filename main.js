const cityField = document.getElementById("city");
const keyField = document.getElementById("key");
const submitButton = document.getElementById("submit");
const panel = document.getElementById("panel");

const saveLocal = (city, key) => {
    const isCityValid = typeof city === "string" && city.trim().length > 0;
    const isKeyValid = typeof key === "string" && key.trim().length > 0;

    if (isCityValid && isKeyValid) {
        store.set("user", { city: city.trim(), key: key.trim() });
    } else {
        console.error("Incorrect values for city or key");
    }
}

submitButton.addEventListener("click", async (event) => {
    event.preventDefault();

    const cityFieldValue = cityField?.value ?? "";
    const keyFieldValue = keyField?.value ?? "";

    saveLocal(cityFieldValue, keyFieldValue);

    const [city, key] = ["city", "key"].map((value) =>
        getLocal(value)
    );

    getWeather(city, key);
})

const getLocal = (value) => {
    let localValue = "";
    try {
        localValue = store.get("user")?.[value] ?? "";
    } catch (error) {
        console.error(error);
    }
    return localValue;
}

window.addEventListener("load", () => {
    const city = getLocal("city");
    const key = getLocal("key");

    cityField.value = (city ? city : '');
    keyField.value = (key ? key : '');

    getWeather(city, key);
});

const k2C = (kelvin) => kelvin - 273.15;

function getWeather(city, key) {
    const panel = document.querySelector("#panel");

    if (city && key) {

        // define constants using const
        const API_URL = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${key}`;

        const getapi = async (url) => {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`HTTP error ${response.status}`);
            return response.json();
        } catch (error) {
            console.error(error);
            throw new Error(error.message);
        }
        }

        // Use arrow function syntax for showWeek
        const showWeek = (data) => {
            data.list.map(item => show(item));
        };

        // call getapi and use then() to handle the returned data
        getapi(API_URL)
            .then(data => showWeek(data));

        // Use arrow function instead of named function
        const show = (data) => {
            // Destructure nested data object to get id and description values
            const { id, description } = data.weather[0];

            // Define icons based on their corresponding ids as a Map
            const icons = {
                '01d': [800],
                '02d': [801],
                '03d': [802],
                '04d': [803, 804],
                '09d': [300, 301, 302, 310, 311, 312, 313, 314, 321, 520, 521, 522, 531],
                '10d': [500, 501, 502, 503, 504],
                '11d': [200, 201, 202, 210, 211, 212, 221, 230, 231, 232],
                '13d': [511, 600, 601, 602, 611, 612, 613, 615, 616, 620, 621, 622],
                '50d': [701, 711, 721, 731, 741, 751, 761, 762, 771, 781],
            };

            // Define a function to find matching icon based on passed id
            const getIcon = (id) => {
                let iconId = '';

                for (let key in icons) {
                    if (icons[key].indexOf(id) !== -1) {
                        iconId = key;
                        break;
                    }
                }

                return `${iconId}.png`;
            };

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