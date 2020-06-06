document.getElementById("placeHolder").style.display = "none";

class UI {
  static displayText(city, temp, title, weatherDescrip, icon) {
    const cityName = document.querySelector("#cityName");
    const temperature = document.querySelector("#temp");
    const weatherTitle = document.querySelector("#weatherTitle");
    const description = document.querySelector("#description");
    const img = document.querySelector("#image");

    document.getElementById("placeHolder").style.display = "block";

    cityName.innerText = city;
    temperature.innerText = "Temperature: " + temp + "c";
    weatherTitle.innerText = title;
    description.innerText = weatherDescrip;
    img.src = icon;
    }

    static message(){
        const div = document.createElement("div");
        div.className = "alert alert-danger";
        div.appendChild(document.createTextNode("City Not Found, Re-Enter City Name"));
        const container = document.querySelector("#topLevel");
        const heading = document.querySelector("#heading");
        container.insertBefore(div, heading);
        setTimeout(() => document.querySelector(".alert").remove(), 3000);
    }
}

// WebApi Request

document.querySelector("#get-forecast").addEventListener("submit", (el) => {
  el.preventDefault();

  const cityName = document.querySelector("#userInput").value;
  const apikey = "115bb30b903e05477ef8b5a756121e3e";

  // Create XHR project
  const xhr = new XMLHttpRequest();
  // OPEN = type, url/file, async
  xhr.open(
    "GET",
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apikey}`,
    true
  );

  xhr.onload = function () {
    if (this.status == 200) {
      const response = JSON.parse(this.responseText);
      const icon =
        "http://openweathermap.org/img/wn/" +
        response.weather[0].icon +
        "@2x.png";
      UI.displayText(
        response.name,
        response.main.temp,
        response.weather[0].main,
        response.weather[0].description,
        icon
      );
    } else if (this.status == 400) {
      UI.message();
    }
  };

  xhr.onerror = function () {
    console.log("request Error...");
  };

  xhr.send();
});

// xhr.onload skips from 1 to 4 and only works if the response is ready
// while onreadystatechange goes through all requests from 1 to 4

// xhr.onreadystatechange = function(){
//     if(this.readyState == 4 && this.status == 200) {
//         console.log(this.responseText);
//     }
// }

// readyState Values
// 0: request not initialized
// 1: server connection established
// 2: request received
// 3: provessing request
// 4: request finished and repsone is ready