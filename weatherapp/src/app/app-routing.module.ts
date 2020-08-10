import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StartComponent } from './start/start.component';
import { WeatherComponent } from './weather/weather.component';

const routes: Routes = [
	{path: '', component: StartComponent},
	{path: 'weather', component: WeatherComponent},
	{path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }