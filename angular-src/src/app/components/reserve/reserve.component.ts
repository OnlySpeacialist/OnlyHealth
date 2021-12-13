import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from 'src/app/services/auth.service';

declare var kakao: any;
var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

@Component({
  selector: 'app-reserve',
  templateUrl: './reserve.component.html',
  styleUrls: ['./reserve.component.scss']
})
export class ReserveComponent implements OnInit {

  markerpath: any;
  markerpath1: any[] = [];

  constructor(
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private router: Router,
  ) { }


  ngOnInit(): void {
    var mapContainer = document.getElementById('map'), // 지도를 표시할 div  
      mapOption = {
        center: new kakao.maps.LatLng(37.713419118500234, 126.89003458110093), // 지도의 중심좌표
        level: 11 // 지도의 확대 레벨
      };

    var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다


    this.authService.getReserve().subscribe((company) => {
      var markers: any[] = [];

      for (var i = 0; i < company.length; i++) {
        var markerpath = company[i].markerpath;
        // markers.push(markerpath);
        this.markerpath1.push(markerpath);
        // var markerpathArr = JSON.parse("markerpathStr");
        // this.markerpath1=markers;
        var content = company[i];
        console.log(content);

      }


      var string = this.markerpath1[0].replace("(", "").replace(")", "");
      // console.log(typeof(markers));
      // console.log( this.markerpath1[0].replace("(" ,"").replace( ")",""));
      const arr = string.split(',');
      // console.log(Number(arr[0]));


      for (var i = 0; i < this.markerpath1.length; i++) {
        var string = this.markerpath1[i].replace("(", "").replace(")", "");
        const arr = string.split(',');
        console.log(arr);

        // 마커를 생성합니다
        var marker = new kakao.maps.Marker({
          map: map, // 마커를 표시할 지도
          position: new kakao.maps.LatLng(arr[0], arr[1])// 마커의 위치
        });

      }
    });
  }
}