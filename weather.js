$(document).ready(function() {


    var key = "d1533e8cd0767e04eca3f7b99ffe166a";
    var CurrCityTempInC = "";
    var CurrCityTempInF = "";
    var changeTemp = document.getElementById("CtoF").innerHTML;
    console.log(changeTemp);

    //converting temperature from  C to F on Single click
    $("#CtoF").on("click", function() {
        if (changeTemp === "℃") {
            changeTemp = "℉";


            CurrCityTempInF = (CurrCityTempInC * (9 / 5) + 32);
            $(".curr").html(CurrCityTempInF + "  °F");
            console.log(CurrCityTempInC);
        } else {
            changeTemp = "℃";
            CurrCityTempInC = ((CurrCityTempInF - 32) * (5 / 9));
            $(".curr").html(CurrCityTempInC + "  ℃");
        }
        document.getElementById("CtoF").innerHTML = changeTemp;
        console.log(changeTemp);
    });



    // getting current geo location
    navigator.geolocation.getCurrentPosition(success, error);



    function success(position) {
        console.log(position.coords.latitude);
        console.log(position.coords.longitude);

        var GEOCODING = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + position.coords.latitude + '%2C' + position.coords.longitude + '&language=en';

        $.getJSON(GEOCODING).done(function(location) {
            console.log(location);

            var currentCity = location.results[1].formatted_address;
            for (var i = 0; i < currentCity.length; i++) {

                if (String(currentCity).charAt(i) === ",") {
                    var mycity = String(currentCity).substring(0, i);

                    console.log(mycity);

                    // Calling weather API to get weather for current location
                    var GETWEATHER = 'http://api.openweathermap.org/data/2.5/weather?' + '&q=' + mycity + '&APPID=' + key;
                    $.getJSON(GETWEATHER).done(function(json) {
                        var TempInKelvin = json.main.temp;
                        var Condition = json.weather[0].description;

                        if (TempInKelvin === '') {
                            TempInKelvin = 'unknown';

                        } else if (changeTemp === "℃") {

                            console.log("Called***");
                            CurrCityTempInC = TempInKelvin - 273.15;
                            // sky
                            if (Condition === "clear sky") {
                                $(".temp").html(mycity + " " + '<img  src="clear.png" height="50px" width="50px" />');
                                $(".curr").html(CurrCityTempInC + "  ℃");
                            }
                            // clouds icon
                            else if (Condition === "few clouds") {
                                $(".temp").html(mycity + " " + '<img  src="few-clouds.png" height="50px" width="50px" />');
                                $(".curr").html(CurrCityTempInC + "  ℃");
                            } else if (Condition === "scattered clouds") {
                                $(".temp").html(mycity + " " + '<img  src="scattered-clouds.png" height="50px" width="50px" />');
                                $(".curr").html(CurrCityTempInC + "  ℃");
                            } else if (Condition === "broken clouds") {
                                $(".temp").html(mycity + " " + '<img  src="broken-clouds.png" height="50px" width="50px" />');
                                $(".curr").html(CurrCityTempInC + "  ℃");
                            } else if (Condition === "overcast clouds") {
                                $(".temp").html(mycity + " " + '<img  src="broken-clouds.png" height="50px" width="50px" />');
                                $(".curr").html(CurrCityTempInC + "  ℃");
                            }
                            // Drizzle
                            else if (Condition === "light intensity drizzle" || Condition === "drizzle" || Condition === "heavy intensity drizzle" ||
                                Condition === "light intensity drizzle rain" || Condition === "drizzle rain" || Condition === "heavy intensity drizzle rain" || Condition === "shower rain and drizzle" ||
                                Condition === "shower rain and drizzle" || Condition === "heavy shower rain and drizzle" || Condition === "shower drizzle" || Condition === "light intensity shower rain" ||
                                Condition === "shower rain" || Condition === "heavy intensity shower rain" || Condition === "ragged shower rain") {
                                $(".temp").html(mycity + " " + '<img  src="drizzle.png" height="50px" width="50px" />');
                                $(".curr").html(CurrCityTempInC + "  ℃");
                            }

                            // Rain
                            else if (Condition === "light rain" || Condition === "moderate rain" || Condition === "heavy intensity rain" ||
                                Condition === "very heavy rain" || Condition === "extreme rain") {
                                $(".temp").html(mycity + " " + '<img src="rain.png" height="50px" width="50px" />');
                                $(".curr").html(CurrCityTempInC + "  ℃");
                            }
                            // snow
                            else if (Condition === "light snow	" || Condition === "snow" || Condition === "heavy snow" ||
                                Condition === "sleet" || Condition === "shower sleet" || Condition === "light rain and snow" || Condition === "rain and snow" ||
                                Condition === "light shower snow" || Condition === "shower snow" || Condition === "heavy shower snow" || Condition === "freezing rain") {
                                $(".temp").html(mycity + " " + '<img  src="snow.png" height="50px" width="50px" />');
                                $(".curr").html(CurrCityTempInC + "  ℃");
                            } else if (Condition === "mist" || Condition === "smoke" || Condition === "haze" ||
                                Condition === "sand, dust whirls" || Condition === "fog" || Condition === "sand" || Condition === "dust" ||
                                Condition === "volcanic ash" || Condition === "squalls" || Condition === "tornado") {
                                $(".temp").html(mycity + " " + '<img src="atmo.png" height="50px" width="50px" />');
                                $(".curr").html(CurrCityTempInC + "  ℃");
                            } else if (Condition === "	thunderstorm with light rain" || Condition === "thunderstorm with rain" || Condition === "thunderstorm with heavy rain" ||
                                Condition === "light thunderstorm" || Condition === "thunderstorm" || Condition === "heavy thunderstorm" || Condition === "ragged thunderstorm" ||
                                Condition === "thunderstorm with light drizzle" || Condition === "thunderstorm with drizzle" || Condition === "thunderstorm with heavy drizzle") {
                                $(".temp").html(cityName + " " + '<img src="thunderstorm.png" height="50px" width="50px" />');
                                $(".curr").html(CurrCityTempInC + "  ℃");
                            }

                        }


                    })
                    return;
                }

            }
        })


    }


    function error(err) {
        console.log(err);
    }




    // Calling weather API to get weather based on search input value

    $("#weatherMe").on("click", function() {
        var cityName = $("#weatherSearch").val();

        console.log(cityName);

        var GETWEATHER = 'http://api.openweathermap.org/data/2.5/weather?' + '&q=' + cityName + '&APPID=' + key;
        $.getJSON(GETWEATHER).done(function(json) {
            // $.getJSON('http://api.openweathermap.org/data/2.5/weather?' + '&q=' + cityName + '&APPID=' + key, function(json) {
            var TempInKelvin = json.main.temp;
            console.log(TempInKelvin);
            var Pressure = json.main.pressure;
            console.log(Pressure);
            var Humadity = json.main.humidity;
            console.log(Humadity);
            var MinTempInKelvin = json.main.temp_min;
            console.log(MinTempInKelvin);
            var MaxTempInKelvin = json.main.temp_max;
            console.log(MaxTempInKelvin);

            // var Condition = [];
            var Condition = json.weather[0].description;
            console.log(Condition);

            //      var image = new Image();
            //      image.src = "Temp.jpg";
            //      image.height = 100;
            //      image.width = 100;

            if (TempInKelvin === '') {
                TempInKelvin = 'unknown';
                // Temperature in Calvin
            } else if (changeTemp === "℃") {

                console.log("Called***");
                CurrCityTempInC = TempInKelvin - 273.15;
                // sky
                if (Condition === "clear sky") {
                    $(".temp").html(cityName + " " + '<img src="clear.png" height="50px" width="50px" />')
                    $(".curr").html(CurrCityTempInC + "  ℃");
                }
                // clouds icon
                else if (Condition === "few clouds") {
                    $(".temp").html(cityName + " " + '<img src="few-clouds.png" height="50px" width="50px" />')
                    $(".temp").html(CurrCityTempInC + "  ℃");
                } else if (Condition === "scattered clouds") {
                    $(".temp").html(cityName + " " + '<img id="theImg" src="scattered-clouds.png" height="50px" width="50px" />')
                    $(".curr").html(CurrCityTempInC + "  ℃");
                } else if (Condition === "broken clouds") {
                    $(".temp").html(cityName + " " + '<img id="theImg" src="broken-clouds.png" height="50px" width="50px" />')
                    $(".curr").html(CurrCityTempInC + "  ℃");
                } else if (Condition === "overcast clouds") {
                    $(".temp").html(cityName + " " + '<img id="theImg" src="broken-clouds.png" height="50px" width="50px" />')
                    $(".curr").html(CurrCityTempInC + "  ℃");
                }
                // Drizzle
                else if (Condition === "light intensity drizzle" || Condition === "drizzle" || Condition === "heavy intensity drizzle" ||
                    Condition === "light intensity drizzle rain" || Condition === "drizzle rain" || Condition === "heavy intensity drizzle rain" || Condition === "shower rain and drizzle" ||
                    Condition === "shower rain and drizzle" || Condition === "heavy shower rain and drizzle" || Condition === "shower drizzle" || Condition === "light intensity shower rain" ||
                    Condition === "shower rain" || Condition === "heavy intensity shower rain" || Condition === "ragged shower rain") {
                    $(".temp").html(cityName + " " + '<img id="theImg" src="drizzle.png" height="50px" width="50px" />')
                    $(".curr").html(CurrCityTempInC + "  ℃");
                }

                // Rain
                else if (Condition === "light rain" || Condition === "moderate rain" || Condition === "heavy intensity rain" ||
                    Condition === "very heavy rain" || Condition === "extreme rain") {
                    $(".temp").html(cityName + " " + '<img id="theImg" src="rain.png" height="50px" width="50px" />')
                    $(".curr").html(CurrCityTempInC + "  ℃");
                }
                // snow
                else if (Condition === "light snow	" || Condition === "snow" || Condition === "heavy snow" ||
                    Condition === "sleet" || Condition === "shower sleet" || Condition === "light rain and snow" || Condition === "rain and snow" ||
                    Condition === "light shower snow" || Condition === "shower snow" || Condition === "heavy shower snow" || Condition === "freezing rain") {
                    $(".temp").html(cityName + " " + '<img id="theImg" src="snow.png" height="50px" width="50px" />')
                    $(".curr").html(CurrCityTempInC + "  ℃");
                }
                // Atmo
                else if (Condition === "mist" || Condition === "smoke" || Condition === "haze" ||
                    Condition === "sand, dust whirls" || Condition === "fog" || Condition === "sand" || Condition === "dust" ||
                    Condition === "volcanic ash" || Condition === "squalls" || Condition === "tornado") {
                    $(".temp").html(cityName + " " + '<img id="theImg" src="atmo.png" height="50px" width="50px" />');
                    $(".curr").html(CurrCityTempInC + "  ℃");
                }
                // thunderstorm
                else if (Condition === "	thunderstorm with light rain" || Condition === "thunderstorm with rain" || Condition === "thunderstorm with heavy rain" ||
                    Condition === "light thunderstorm" || Condition === "thunderstorm" || Condition === "heavy thunderstorm" || Condition === "ragged thunderstorm" ||
                    Condition === "thunderstorm with light drizzle" || Condition === "thunderstorm with drizzle" || Condition === "thunderstorm with heavy drizzle") {
                    $(".temp").html(cityName + " " + '<img id="theImg" src="thunderstorm.png" height="50px" width="50px" />');
                    $(".temp").html(CurrCityTempInC + "  °F");
                }
                // Temperature in Fehranheit 
            } else {
                console.log("Called####");
                CurrCityTempInF = ((9 / 5) * (TempInKelvin - 273) + 32);

                if (Condition === "clear sky") {
                    $(".temp").html(cityName + " " + '<img id="theImg" src="clear.png" height="50px" width="50px" />');
                    $(".curr").html(CurrCityTempInF + "  °F");
                }
                // clouds icon
                else if (Condition === "few clouds") {
                    $(".temp").html(cityName + " " + '<img id="theImg" src="few-clouds.png" height="50px" width="50px" />');
                    $(".curr").html(CurrCityTempInF + "  °F");
                } else if (Condition === "scattered clouds") {
                    $(".temp").html(cityName + " " + '<img id="theImg" src="scattered-clouds.png" height="50px" width="50px" />');
                    $(".curr").html(CurrCityTempInF + "  °F");
                } else if (Condition === "broken clouds") {
                    $(".temp").html(cityName + " " + '<img id="theImg" src="broken-clouds.png" height="50px" width="50px" />');
                    $(".curr").html(CurrCityTempInF + "  °F");
                } else if (Condition === "overcast clouds") {
                    $(".temp").html(cityName + " " + '<img id="theImg" src="broken-clouds.png" height="50px" width="50px" />');
                    $(".curr").html(CurrCityTempInF + "  °F");
                }
                // Drizzle
                else if (Condition === "light intensity drizzle" || Condition === "drizzle" || Condition === "heavy intensity drizzle" ||
                    Condition === "light intensity drizzle rain" || Condition === "drizzle rain" || Condition === "heavy intensity drizzle rain" || Condition === "shower rain and drizzle" ||
                    Condition === "shower rain and drizzle" || Condition === "heavy shower rain and drizzle" || Condition === "shower drizzle" || Condition === "light intensity shower rain" ||
                    Condition === "shower rain" || Condition === "heavy intensity shower rain" || Condition === "ragged shower rain") {
                    $(".temp").html(cityName + " " + '<img id="theImg" src="drizzle.png" height="50px" width="50px" />');
                    $(".curr").html(CurrCityTempInF + "  °F");
                }

                // Rain
                else if (Condition === "light rain" || Condition === "moderate rain" || Condition === "heavy intensity rain" ||
                    Condition === "very heavy rain" || Condition === "extreme rain") {
                    $(".temp").html(cityName + " " + '<img id="theImg" src="rain.png" height="50px" width="50px" />');
                    $(".curr").html(CurrCityTempInF + "  °F");
                }
                // snow
                else if (Condition === "light snow	" || Condition === "snow" || Condition === "heavy snow" ||
                    Condition === "sleet" || Condition === "shower sleet" || Condition === "light rain and snow" || Condition === "rain and snow" ||
                    Condition === "light shower snow" || Condition === "shower snow" || Condition === "heavy shower snow" || Condition === "freezing rain") {
                    $(".temp").html(cityName + " " + '<img id="theImg" src="snow.png" height="50px" width="50px" />');
                    $(".curr").html(CurrCityTempInF + "  °F");
                }
                // atmo
                else if (Condition === "mist" || Condition === "smoke" || Condition === "haze" ||
                    Condition === "sand, dust whirls" || Condition === "fog" || Condition === "sand" || Condition === "dust" ||
                    Condition === "volcanic ash" || Condition === "squalls" || Condition === "tornado") {
                    $(".temp").html(cityName + " " + '<img id="theImg" src="atmo.png" height="50px" width="50px" />');
                    $(".curr").html(CurrCityTempInF + "  °F");
                }
                // thunderstorm
                else if (Condition === "	thunderstorm with light rain" || Condition === "thunderstorm with rain" || Condition === "thunderstorm with heavy rain" ||
                    Condition === "light thunderstorm" || Condition === "thunderstorm" || Condition === "heavy thunderstorm" || Condition === "ragged thunderstorm" ||
                    Condition === "thunderstorm with light drizzle" || Condition === "thunderstorm with drizzle" || Condition === "thunderstorm with heavy drizzle") {
                    $(".temp").html(cityName + " " + '<img id="theImg" src="thunderstorm.png" height="50px" width="50px" />');
                    $(".curr").html(CurrCityTempInF + "  °F");
                }

            }

        });


    });

});