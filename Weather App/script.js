let city_name = "";
let API_URL = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
let API_KEY = "b46e034b3481a2942f904d794666f355";

let city = document.querySelector(".city");
let temperature = document.querySelector(".temperature");
let input_city = document.querySelector(".searchInput");
let input_btn = document.querySelector(".search-box .btn");

async function weather(city_name) {
  let response = await fetch(API_URL + city_name + `&appid=${API_KEY}`);
  console.log(response);
  let usable_data = await response.json();
  console.log(usable_data);

  city.innerText = usable_data.name;
  temperature.innerText = Math.round(usable_data.main.temp) + "°c";
}

input_btn.addEventListener("click", function btn() {
  city_name = input_city.value;
  console.log(city_name);
  weather(city_name);
});
