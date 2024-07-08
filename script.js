//weather app using open weather api
//Logic
//1.get your api key from any weather api service (ex - openweather) and store it in a var
//2.fetch all the data from the api 
//3.display

let apiKey  = "db0475f0c5e889097294dd17e5c81a5c"   
 

const getLatitudeAndLongitude = async(city) =>
  {
    const data  = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`)
    .then((res) => {
      if(!res.ok)
        {
          alert("Could not find location")
          throw new Error('Network response was not ok ' + response.statusText); 
        }

      return res.json()


  })
 
if(data.length === 0)
  {
    alert("No such city found")
    return null
  }

  const {lat , lon}  = data[0];
 
  fetchWeather(lat,lon)
  }




const fetchWeather = async function (lat,lon) {

  const weatherData = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
    )
    .then((response) => {
        if (!response) 
        {
          alert("No weather found.");
          throw new Error("No weather found");
        }
        return response.json();
    })

    displayWeather(weatherData)
  }


  const displayWeather = function (data) {
    const { main , description , icon} = data.weather[0];
    const { temp, humidity } = data.main;
    const visibility = data.visibility
    const { speed } = data.wind;
    const country = data.sys.country
    const name = data.name

    document.querySelector(".city").innerText = "Weather in " + name;

    document.querySelector(".country").innerText = country;

    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + ".png";

    document.querySelector(".main").innerText = main;

    document.querySelector(".description").innerText = description;

    document.querySelector(".temp").innerText = (temp - 273.15).toFixed(2) + "°Celsius";

    document.querySelector(".humidity").innerText =
      "Humidity: " + humidity + "%";

    document.querySelector(".wind").innerText =
      "Wind speed: " + speed + " km/h";

      document.querySelector(".visibility").innerText =
      "Visibility: " + visibility/1000 + " km";

    document.querySelector(".weather").classList.remove("loading");
    
  }

  const search =  function (city) {
    getLatitudeAndLongitude(city);
  }


document.querySelector(".js-button").addEventListener("click", function () {
  let city = (document.querySelector(".search-bar").value)
  search(city);
});

document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      let city = (document.querySelector(".search-bar").value)
      search(city);
    }
  });

getLatitudeAndLongitude("Nashik");

