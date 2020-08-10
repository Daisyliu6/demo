import { Component, OnInit, ɵsetCurrentInjector } from "@angular/core";
import { GetWeatherService } from "../get-weather.service";

@Component({
  selector: "app-weather",
  templateUrl: "./weather.component.html",
  styleUrls: ["./weather.component.css"],
})
export class WeatherComponent implements OnInit {
  cities = ["Sydney", "Melbourne", "Brisbane"];
  temperature = 0;
  city = "Sydney";
  saved_data = [{city: "Sydney", temperature: 0}, {city: "Melbourne", temperature: 0}, {city: "Brisbane", temperature: 0}];

  constructor(private getWeatherservice: GetWeatherService) {}

  ngOnInit() {}

  getCity(city) {
    this.city = city;
    const pre_city = this.cities.splice(0, 1)[0];
    this.cities.splice(2, 0, pre_city);
    const current_city = this.cities[0];
    this.saved_data.forEach(item => {
      if (item.city == current_city) {
         this.temperature = item.temperature;
        } 
    });
  }

  getWeather() {
    this.getWeatherservice.getWeather(this.city).subscribe((result) => {
      this.temperature = result;
      const current_city = this.cities[0];
      this.saved_data.forEach(item => {
        if (item.city == current_city) {
          item.temperature = result;
        } 
    });
  })
}
}
