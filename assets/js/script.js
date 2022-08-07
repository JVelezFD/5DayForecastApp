
//Variables for API call placement and User Input
var fiveDayCastArea = document.querySelector("#five-day");
var userCityForm = document.getElementById("city-form");
var userCityBtn = document.getElementById("cityBtn");
var historyBtn = document.getElementById("historyBtn1");
var currentWeatherArea = document.querySelector("#current-weather");
var searchHistoryBtn = document.getElementById("historyBtn1").innerHTML; 
var citySearch =[];
//API Key and URL
const apiKey = 'd3d0d292463e48719137168a68c54e66';

//Add search history value to button and when pressed search history
function searchCityAdd (){
  
  let exists = localStorage.getItem('citySearch');

 if (exists === null){
  document.getElementById("historyBtn1").innerHTML = ("Last City Searched");
  
 }else if (exists){
  let storageCity = JSON.parse(localStorage.getItem('citySearch'));
    document.getElementById("historyBtn1").innerHTML = storageCity.splice(-1);  
  

  document.getElementById("historyBtn1").innerHTML = storageCity;
}

}

historyBtn.addEventListener()




//User City Submit Button Function

userCityForm.addEventListener("submit", e => {
    e.preventDefault();
    const callItems = currentWeatherArea;
    var userCity = document.getElementById("city").value;
    console.log("City submitted");
    

    //Storing and posting city search history
    citySearch = localStorage.getItem('citySearch') ? JSON.parse(localStorage.getItem('citySearch')) : [];
    citySearch.push(userCity);
    localStorage.setItem('citySearch', JSON.stringify(citySearch));

   






    

    //API call 
    document.querySelector("#current-weather").innerHTML="";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${userCity}&appid=d3d0d292463e48719137168a68c54e66&units=imperial`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const { name, main, weather, wind, coord } = data;
            console.log(data);
            const weatherIcon = `https://openweathermap.org/img/wn/${weather[0]["icon"]}@2x.png`;
            const cityLat = `${coord.lat}`;
            const cityLon = `${coord.lon}`;

            const li = document.createElement("li");
            li.classList.add("city");
            const markup = `
        <h2 class="city-name" data-name="${name}">
          ${name}
        </h2>
        <div class="city-temp">Temp: ${Math.round(main.temp)}<sup>°F</sup></div>
        <figure>
          <img class="city-icon" src=${weatherIcon} alt=${weather[0]["main"]}>
          <figcaption>${weather[0]["main"]}</figcaption>              
        </figure>
        <div class="city-humidity">Humidity: ${main.humidity}
        <p>Wind: ${wind.speed}mph</p>    
        </div>
        `;

            li.innerHTML = markup;
            console.log(currentWeatherArea);
            //currentWeatherArea.innerHTML="";
            currentWeatherArea.appendChild(li);
            getFiveDayCast(cityLat, cityLon);
        });

        function getFiveDayCast(cityLat, cityLon) {
          const apiFiveDayUrl= `https://api.openweathermap.org/data/2.5/onecall?lat=${cityLat}&lon=${cityLon}&appid=${apiKey}&units=imperial`;
          
          fetch(apiFiveDayUrl)
          .then(response => response.json())
          .then(data => {
            console.log(data.daily);
            fiveDayCastArea.innerHTML="";
            for (let i = 0; i < 5; i++) {              
              
          
              const { name, temp, weather, wind_speed, humidity, uvi } = data.daily[i];
              console.log(data);
              const weatherIcon = `https://openweathermap.org/img/wn/${weather[0]["icon"]}@2x.png`;
            
  
              const li = document.createElement("li");
              li.classList.add("city");
              const markup = `
          <h2 class="city-name" data-name="${name}">
            Day ${i+1}
          </h2>
          <div class="city-temp">Temp: ${Math.round(temp.day)}<sup>°F</sup></div>
          <figure>
            <img class="city-icon" src=${weatherIcon} alt=${weather[0]["main"]}>
            <figcaption>${weather[0]["main"]}</figcaption>              
          </figure>
          <div class="city-humidity">Humidity: ${humidity}
          <p>Wind: ${wind_speed}mph</p> 
          <p>UV Index: ${uvi}</p>   
          </div>
          `;
          li.innerHTML = markup;
          fiveDayCastArea.appendChild(li);
          searchCityAdd();
        }
        });
      }



     
       
   
});
   



//function addUserHistory() {
  //  let userRecentSearch = localStorage.getItem("city"); <div class="city-humidity">Humidity:${main[1]["humidity"]}</div>  


//}














