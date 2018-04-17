import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http, Headers } from '@angular/http';
import * as Constant from '../../config/constants';
import { Geolocation} from '@ionic-native/geolocation';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  base_url: any;
  darksky_key: any;

  iconWeather: any;
  timeZone: any;
  city: any;
  country: any;
  temperature: any;
  humidity: any;
  precipProbability: any;
  summary:any;


  lat: any;
  lng: any;

  weatherdata: Array<any>;
  constructor(public navCtrl: NavController,
    public http: Http,
    public geo: Geolocation,
  ) {
		this.base_url = Constant.base_url;
    this.darksky_key = Constant.darksky_key;
		this.weatherdata = new Array();
  }

ionViewDidLoad(){
  this.showWeather();
}

showWeather(){
  this.getposition();
  this.getWeather();
}


getposition(){
  this.geo.getCurrentPosition().then(pos =>{
    this.lat = pos.coords.latitude;
    this.lng = pos.coords.latitude;
    this.getWeather();
   }
  ).catch(err => console.log(err));  
}

getWeather(){
  this.http.get(this.base_url + this.darksky_key + '/'+ this.lat + ','+ this.lng)
  .subscribe(data => {
    console.log(data.json());
    this.weatherdata        = data.json();
    this.timeZone           = this.weatherdata.timezone;
    this.iconWeather        = this.weatherdata.currently.icon; 
    this.city               = this.weatherdata.currently.city;
    this.country            = this.weatherdata.currently.country; 
    this.temperature        = this.weatherdata.currently.temperature; 
    this.humidity           = this.weatherdata.currently.humidity*100; 
    this.precipProbability  = this.weatherdata.currently.precipProbability * 100; 
    this.summary            = this.weatherdata.currently.summary; 
    console.log(this.weatherdata.currently.icon);
    /*if (this.weatherdata.length > 1) {
        console.log(this.weatherdata);
    }*/
  }, error => {

  })



}

}
