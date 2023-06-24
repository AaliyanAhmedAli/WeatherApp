var abc = document.getElementById('abc')
var city = document.getElementById('city');
var loaders = document.getElementById("Loader")
var date = new Date();
var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
var month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
var today = days[date.getDay()]
var currentMonth = month[date.getMonth()]
var todayDate = date.getDate();
var wImg = document.getElementById('wImg')

async function fetchDataOnload() {
    let lat;
    let lon;
    if (await navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            lat = position.coords.latitude;
            lon = position.coords.longitude;
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=233a720fcff7e4f27d62707870344016`)
                .then(response => {
                    return response.json();
                })
                .then(data1 => {
                   
                    console.log(wImg)
                    abc.innerHTML = `
                    <h4>${data1.name}<br>${data1.sys.country}</h4>
                    <p class="date">${today.slice(0, 3)}, ${currentMonth} ${todayDate}</p>`
                    // Atmoshphere 
                    if (data1.weather[0].id == 701 || data1.weather[0].id == 741) {
                        data1.weather[0].icon = "image/mist.png";
                    }
                    else if (data1.weather[0].id == 711) {
                        data1.weather[0].icon = "image/smoke.png";
                    }
                    else if (data1.weather[0].id == 721) {
                        data1.weather[0].icon = "image/Haze.png";
                    }
                    else if (data1.weather[0].id == 731) {
                        data1.weather[0].icon = "image/dust.png";
                    }
                    else if (data1.weather[0].id == 751 || data1.weather[0].id == 761 || data1.weather[0].id == 762 || data1.weather[0].id == 771 || data1.weather[0].id == 781) {
                        data1.weather[0].icon = "image/sand.png";
                    }
                    else if (data1.weather[0].id == 531 || data1.weather[0].id == 522 || data1.weather[0].id == 521 || data1.weather[0].id == 520 || data1.weather[0].id == 511 || data1.weather[0].id == 504 || data1.weather[0].id == 503 || data1.weather[0].id == 502 || data1.weather[0].id == 501 || data1.weather[0].id == 500) {
                        data1.weather[0].icon = "image/rain.png";
                    }
                    else if (data1.weather[0].id == 801 || data1.weather[0].id == 802 || data1.weather[0].id == 803 || data1.weather[0].id == 804) {
                        data1.weather[0].icon = "image/Clouds.png";
                    }
                    else if (data1.weather[0].id == 600 || data1.weather[0].id == 601 || data1.weather[0].id == 602 || data1.weather[0].id == 611 || data1.weather[0].id == 612 || data1.weather[0].id == 613 || data1.weather[0].id == 615 || data1.weather[0].id == 616 || data1.weather[0].id == 620 || data1.weather[0].id == 621 || data1.weather[0].id == 622) {
                        data1.weather[0].icon = "image/snow.png";
                    }
                    else if (data1.weather[0].id == 300 || data1.weather[0].id == 301 || data1.weather[0].id == 302 || data1.weather[0].id == 310 || data1.weather[0].id == 311 || data1.weather[0].id == 312 || data1.weather[0].id == 313 || data1.weather[0].id == 314 || data1.weather[0].id == 321) {
                        data1.weather[0].icon = "image/snow.png";
                    }
                    else if (data1.weather[0].id == 200 || data1.weather[0].id == 201 || data1.weather[0].id == 202 || data1.weather[0].id == 210 || data1.weather[0].id == 211 || data1.weather[0].id == 212 || data1.weather[0].id == 213 || data1.weather[0].id == 214 || data1.weather[0].id == 221 || data1.weather[0].id == 230 || data1.weather[0].id == 231 || data1.weather[0].id == 232) {
                        data1.weather[0].icon = "image/thunderStorm.png";
                    }
                    else if (data1.weather[0].id == 800) {
                        data1.weather[0].icon = "image/Clouds.png";

                    }

                    abc.innerHTML += `

                    <div class="weather_temp">
                    <div class="weather_img">
                    <img id ="wImg" src="${data1.weather[0].icon}"></div>
                    <div class="temp">
                    <h1 class="cen">${Math.floor(data1.main.temp)} <sup><sup>o</sup>C</sup>
                    </h1>
                    <p>${data1.weather[0].main} </p>
                    </div>
                    </div>
                    <div class="forecast">
                    <div class="one">
                    <div class="img_weather">
                    <img src="image/humidity.png">
                    <span>Humidity</span>
                    </div>
                    <div class="calculate">
                    <p>${data1.main.humidity}%</p>
                    </div>
                    </div>
                    <div class="one">
                    <div class="img_weather">
                    <img src="image/wind.png">
                    <span>Wind</span>
                    </div>
                    <div class="calculate">
                    <p>${data1.wind.speed}km/h</p>
                    </div>
                    </div>
                    <div class="one">
                    <div class="img_weather">
                    <img src="image/Clouds.png">
                    <span>Clouds</span>
                    </div>
                    <div class="calculate">
                    <p>${data1.clouds.all}%</p>
                    </div>
                    </div>
                    </div>
                  `
                })
                .catch(error => {
                    console.log("Current Location Not detecting....")
                })

        })
    }


}

window.onload = fetchDataOnload();


async function onSearch() {

    if (city.value.trim() === "") {
        swal(`Enter a city name Karachi,Delhi etc`);
    }

    else {
        await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city.value}&units=metric&appid=233a720fcff7e4f27d62707870344016`)
            .then(response => {
                return response.json();
            })
            .then(data2 => {
                console.log(wImg)
                abc.innerHTML = `
                <h4>${data2.name}<br>${data2.sys.country}</h4>
                <p class="date">${today.slice(0, 3)}, ${currentMonth} ${todayDate}</p>`

                // Atmoshphere 
                if (data2.weather[0].id == 701 || data2.weather[0].id == 741) {
                    data2.weather[0].icon = "image/mist.png";
                }
                else if (data2.weather[0].id == 711) {
                    data2.weather[0].icon = "image/smoke.png";
                }
                else if (data2.weather[0].id == 721) {
                    data2.weather[0].icon = "image/haze.png";
                }
                else if (data2.weather[0].id == 731) {
                    data2.weather[0].icon = "image/dust.png";
                }
                else if (data2.weather[0].id == 751 || data2.weather[0].id == 761 || data2.weather[0].id == 762 || data2.weather[0].id == 771 || data2.weather[0].id == 781) {
                    data2.weather[0].icon = "image/sand.png";
                }
                else if (data2.weather[0].id == 531 || data2.weather[0].id == 522 || data2.weather[0].id == 521 || data2.weather[0].id == 520 || data2.weather[0].id == 511 || data2.weather[0].id == 504 || data2.weather[0].id == 503 || data2.weather[0].id == 502 || data2.weather[0].id == 501 || data2.weather[0].id == 500) {
                    data2.weather[0].icon = "image/rain.png";
                }
                else if (data2.weather[0].id == 801 || data2.weather[0].id == 802 || data2.weather[0].id == 803 || data2.weather[0].id == 804) {
                    data2.weather[0].icon = "image/Clouds.png";
                }
                else if (data2.weather[0].id == 600 || data2.weather[0].id == 601 || data2.weather[0].id == 602 || data2.weather[0].id == 611 || data2.weather[0].id == 612 || data2.weather[0].id == 613 || data2.weather[0].id == 615 || data2.weather[0].id == 616 || data2.weather[0].id == 620 || data2.weather[0].id == 621 || data2.weather[0].id == 622) {
                    data2.weather[0].icon = "image/snow.png";
                }
                else if (data2.weather[0].id == 300 || data2.weather[0].id == 301 || data2.weather[0].id == 302 || data2.weather[0].id == 310 || data2.weather[0].id == 311 || data2.weather[0].id == 312 || data2.weather[0].id == 313 || data2.weather[0].id == 314 || data2.weather[0].id == 321) {
                    data2.weather[0].icon = "image/snow.png";
                }
                else if (data2.weather[0].id == 200 || data2.weather[0].id == 201 || data2.weather[0].id == 202 || data2.weather[0].id == 210 || data2.weather[0].id == 211 || data2.weather[0].id == 212 || data2.weather[0].id == 213 || data2.weather[0].id == 214 || data2.weather[0].id == 221 || data2.weather[0].id == 230 || data2.weather[0].id == 231 || data2.weather[0].id == 232) {
                    data2.weather[0].icon = "image/thunderStorm.png";
                }
                else if (data2.weather[0].id == 800) {
                    data2.weather[0].icon = "image/Clouds.png";

                }
                abc.innerHTML += `
                <div class="weather_temp">
                <div class="weather_img">
                <img id ="wImg" src="${data2.weather[0].icon}"></div>
                <div class="temp">
                <h1 class="cen">${Math.floor(data2.main.temp)} <sup><sup>o</sup>C</sup>
                </h1>
                <p>${data2.weather[0].main} </p>
                </div>
                </div>
                <div class="forecast">
                <div class="one">
                <div class="img_weather">
                <img src="image/humidity.png">
                <span>Humidity</span>
                </div>
                <div class="calculate">
                <p>${data2.main.humidity}%</p>
                </div>
                </div>
                <div class="one">
                <div class="img_weather">
                <img src="image/Wind.png">
                <span>Wind</span>
                </div>
                <div class="calculate">
                <p>${data2.wind.speed}km/h</p>
                </div>
                </div>
                <div class="one">
                <div class="img_weather">
                <img src="image/Clouds.png">
                <span>Clouds</span>
                </div>
                <div class="calculate">
                <p>${data2.clouds.all}%</p>
                </div>
                </div>
                </div>
              `
                if (data2.message === "city not found") {
                    swal({
                        title: "Error",
                        text: "City not found",
                        icon: "error",
                        button: "Ok!",
                    });
                    abc.innerHTML = `
                    <h4>City Not Found</h4>
                  `
                    //
                }
            })
            .catch(error2 => {
                swal({
                    title: "Error",
                    text: "City not found",
                    icon: "error",
                    button: "Ok!",
                });
            })
    }
}




window.onkeydown = function KeyonSearch() {
    if (event.keyCode == 13) {
        if (city.value.trim() === "") {
            swal(`Enter a city name Karachi,Delhi etc`);
        }

        else {
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city.value}&units=metric&appid=233a720fcff7e4f27d62707870344016`)
                .then(response => {
                    return response.json();
                })
                .then(data2 => {
                    console.log(wImg)
                    abc.innerHTML = `
                <h4>${data2.name}<br>${data2.sys.country}</h4>
                <p class="date">${today.slice(0, 3)}, ${currentMonth} ${todayDate}</p>`

                    // Atmoshphere 
                    if (data2.weather[0].id == 701 || data2.weather[0].id == 741) {
                        data2.weather[0].icon = "image/mist.png";
                    }
                    else if (data2.weather[0].id == 711) {
                        data2.weather[0].icon = "image/smoke.png";
                    }
                    else if (data2.weather[0].id == 721) {
                        data2.weather[0].icon = "image/haze.png";
                    }
                    else if (data2.weather[0].id == 731) {
                        data2.weather[0].icon = "image/dust.png";
                    }
                    else if (data2.weather[0].id == 751 || data2.weather[0].id == 761 || data2.weather[0].id == 762 || data2.weather[0].id == 771 || data2.weather[0].id == 781) {
                        data2.weather[0].icon = "image/sand.png";
                    }
                    else if (data2.weather[0].id == 531 || data2.weather[0].id == 522 || data2.weather[0].id == 521 || data2.weather[0].id == 520 || data2.weather[0].id == 511 || data2.weather[0].id == 504 || data2.weather[0].id == 503 || data2.weather[0].id == 502 || data2.weather[0].id == 501 || data2.weather[0].id == 500) {
                        data2.weather[0].icon = "image/rain.png";
                    }
                    else if (data2.weather[0].id == 801 || data2.weather[0].id == 802 || data2.weather[0].id == 803 || data2.weather[0].id == 804) {
                        data2.weather[0].icon = "image/Clouds.png";
                    }
                    else if (data2.weather[0].id == 600 || data2.weather[0].id == 601 || data2.weather[0].id == 602 || data2.weather[0].id == 611 || data2.weather[0].id == 612 || data2.weather[0].id == 613 || data2.weather[0].id == 615 || data2.weather[0].id == 616 || data2.weather[0].id == 620 || data2.weather[0].id == 621 || data2.weather[0].id == 622) {
                        data2.weather[0].icon = "image/snow.png";
                    }
                    else if (data2.weather[0].id == 300 || data2.weather[0].id == 301 || data2.weather[0].id == 302 || data2.weather[0].id == 310 || data2.weather[0].id == 311 || data2.weather[0].id == 312 || data2.weather[0].id == 313 || data2.weather[0].id == 314 || data2.weather[0].id == 321) {
                        data2.weather[0].icon = "image/snow.png";
                    }
                    else if (data2.weather[0].id == 200 || data2.weather[0].id == 201 || data2.weather[0].id == 202 || data2.weather[0].id == 210 || data2.weather[0].id == 211 || data2.weather[0].id == 212 || data2.weather[0].id == 213 || data2.weather[0].id == 214 || data2.weather[0].id == 221 || data2.weather[0].id == 230 || data2.weather[0].id == 231 || data2.weather[0].id == 232) {
                        data2.weather[0].icon = "image/thunderstorm.png";
                    }
                    else if (data2.weather[0].id == 800) {
                        data2.weather[0].icon = "image/Clouds.png";

                    }
                    abc.innerHTML += `
                <div class="weather_temp">
                <div class="weather_img">
                <img id ="wImg" src="${data2.weather[0].icon}"></div>
                <div class="temp">
                <h1 class="cen">${Math.floor(data2.main.temp)} <sup><sup>o</sup>C</sup>
                </h1>
                <p>${data2.weather[0].main} </p>
                </div>
                </div>
                <div class="forecast">
                <div class="one">
                <div class="img_weather">
                <img src="image/humidity.png">
                <span>Humidity</span>
                </div>
                <div class="calculate">
                <p>${data2.main.humidity}%</p>
                </div>
                </div>
                <div class="one">
                <div class="img_weather">
                <img src="image/Wind.png">
                <span>Wind</span>
                </div>
                <div class="calculate">
                <p>${data2.wind.speed}km/h</p>
                </div>
                </div>
                <div class="one">
                <div class="img_weather">
                <img src="image/Clouds.png">
                <span>Clouds</span>
                </div>
                <div class="calculate">
                <p>${data2.clouds.all}%</p>
                </div>
                </div>
                </div>
              `
                    if (data2.message === "city not found") {
                        swal({
                            title: "Error",
                            text: "City not found",
                            icon: "error",
                            button: "Ok!",
                        });
                        abc.innerHTML = `
                    <h4>City Not Found</h4>
                  `
                        //
                    }
                })
                .catch(error2 => {
                    swal({
                        title: "Error",
                        text: "City not found",
                        icon: "error",
                        button: "Ok!",
                    });
                })
        }
    }
}
