$(document).ready(function() {
  $("#search-button").on("click", function() {
    var searchValue = $("#search-value").val();
    
    // clear input box
    $("#search-value").val("");

    searchWeather(searchValue);
  });

  $(".history").on("click", "li", function() {
    searchWeather($(this).text());
  });

  function makeRow(text) {
    var li = $("<li>").addClass("list-group-item list-group-item-action").text(text);
    $(".history").append(li);
  }

  function searchWeather(searchValue) {
    $.ajax({
      type: "GET",
      url: "https://api.openweathermap.org/data/2.5/forecast?q=" + searchValue + "&appid=9757064cd8014191643296e8ceb75fec",
      dataType: "json",
      success: function(data) {
        console.log (data)
        var history=[]
        // create history link for this search
        if (history.indexOf(searchValue) === -1) {
          history.push(searchValue);
          window.localStorage.setItem("history", JSON.stringify(history));
    
          makeRow(searchValue);
        }
        $(document).on("click", "searchValue", searchWeather)
        // clear any old content
        $("#today").empty();

        // create html content for current weather
        var title = $("<h3>").addClass("card-title").text(data.name + " (" + new Date().toLocaleDateString() + ")");
        var card = $("<div>").addClass("card");
        var wind = $("<p>").addClass("card-text").text("Wind Speed: " + data.list[0].wind.speed + " MPH");
        var humid = $("<p>").addClass("card-text").text("Humidity: " + data.list[0].main.humidity + "%");
        var temp = $("<p>").addClass("card-text").text("Temperature: " + data.list[0].main.temp + " °F");
        var cardBody = $("<div>").addClass("card-body");
        var img = $("<img>").attr("src", "http://openweathermap.org/img/w/" + data.list[0].weather[0].icon + ".png");

        // merge and add to page
        title.append(img);
        cardBody.append(title, temp, humid, wind);
        card.append(cardBody);
        $("#today").append(card);

        // call follow-up api endpoints
        // getForecast(searchValue);
        // getUVIndex(data.coord.lat, data.coord.lon);
      }
    });
  }
  
//Get Started 

});

        // create html content for current weather
        // var title = $("<h3>").addClass("card-title").text(data.name + " (" + new Date().toLocaleDateString() + ")");
        // var card = $("<div>").addClass("card");
        // var wind = $("<p>").addClass("card-text").text("Wind Speed: " + data.list[0].wind.speed + " MPH");
        // var humid = $("<p>").addClass("card-text").text("Humidity: " + data.list[0].main.humidity + "%");
        // var temp = $("<p>").addClass("card-text").text("Temperature: " + data.list[0].main.temp + " °F");
        // var cardBody = $("<div>").addClass("card-body");
        // var img = $("<img>").attr("src", "http://openweathermap.org/img/w/" + data.list[0].weather[0].icon + ".png");
