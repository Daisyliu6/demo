import { Component, OnInit, ɵsetCurrentInjector } from "@angular/core";
import { GetWeatherService } from "../get-weather.service";

@Component({
  selector: "app-weather",
  templateUrl: "./weather.component.html",
  styleUrls: ["./weather.component.css"],
})
export class WeatherComponent implements OnInit {
  cities = ["Sydney", "Melbourne", "Brisbane"];
  city = "Sydney";
  temperature = null;
  description = null;
  temp_min = null;
  temp_max = null;
  iconUrl = null;
  saved_data = [
    {
      city: "Sydney",
      temperature: null,
      description: null,
      temp_min: null,
      temp_max: null,
      iconUrl: null,
    },
    {
      city: "Melbourne",
      temperature: null,
      description: null,
      temp_min: null,
      temp_max: null,
      iconUrl: null,
    },
    {
      city: "Brisbane",
      temperature: null,
      description: null,
      temp_min: null,
      temp_max: null,
      iconUrl: null,
    },
  ];

  constructor(private getWeatherservice: GetWeatherService) {}

  ngOnInit() {}

  // call getCity when click the button
  getCity() {
    const pre_city = this.cities.splice(0, 1)[0];
    // add the pre_city to the array
    this.cities.splice(2, 0, pre_city);
    const current_city = this.cities[0];
    this.city = current_city;
    // save the data
    this.saved_data.forEach((item) => {
      if (item.city == current_city) {
        this.temperature = item.temperature;
        this.description = item.description;
        this.temp_min = item.temp_min;
        this.temp_max = item.temp_max;
        this.iconUrl = item.iconUrl;
      }
    });
  }

  getWeather() {
    this.getWeatherservice.getWeather(this.city).subscribe((neededData) => {
      this.temperature = neededData.temp;
      this.description = neededData.descrip;
      this.temp_min = neededData.temp_min;
      this.temp_max = neededData.temp_max;
      this.iconUrl = neededData.iconUrl;
      const current_city = this.cities[0];
      // get the weather info from API
      this.saved_data.forEach((item) => {
        if (item.city == current_city) {
          item.temperature = neededData.temp;
          item.description = neededData.descrip;
          item.temp_min = neededData.temp_min;
          item.temp_max = neededData.temp_max;
          item.iconUrl = neededData.iconUrl;
        }
      });
    });
  }
}
