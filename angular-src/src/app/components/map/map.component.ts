import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesComponent, FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

declare var kakao: any;
var infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  username: string;
  companyname: string;
  companytel: string;
  markerpath: string;
  markerpathStr: string;

  constructor(
    private authService: AuthService,
    private flashMessage: FlashMessagesService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
      mapOption = {
        center: new kakao.maps.LatLng(37.713419118500234, 126.89003458110093), // 지도의 중심좌표
        level: 11 // 지도의 확대 레벨
      };

    var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

    // 지도를 클릭한 위치에 표출할 마커입니다
    var marker = new kakao.maps.Marker({
      // 지도 중심좌표에 마커를 생성합니다 
      position: map.getCenter()
    });
    // 지도에 마커를 표시합니다
    marker.setMap(map);


    // 지도에 클릭 이벤트를 등록합니다
    // 지도를 클릭하면 마지막 파라미터로 넘어온 함수를 호출합니다
    kakao.maps.event.addListener(map, 'click', function (mouseEvent) {

      // 클릭한 위도, 경도 정보를 가져옵니다 
      var latlng = mouseEvent.latLng;

      // 마커 위치를 클릭한 위치로 옮깁니다
      marker.setPosition(latlng);
      var markerpath = marker.getPosition(latlng)
      localStorage.setItem("marker", markerpath);


      console.log(latlng);
    });

    const userNoPW: any = localStorage.getItem('userNoPW');
    this.username = JSON.parse(userNoPW).username;
    let companyInfo: any = localStorage.getItem('company');

    if (companyInfo !== null) {
      const company = JSON.parse(companyInfo);
      this.companyname = company.companyname;
      this.companytel = company.companytel;
      this.markerpath = company.markerpath;
    }



    // console.log(markerpathStr);
    this.onRegisterCompanySubmit();
  }

  onRegisterCompanySubmit() {
    const company: any = {
      username: this.username,
      companyname: this.companyname,
      companytel: this.companytel,
      markerpath: localStorage.getItem("marker"),
    };

    // 서버에 사용자 등록 요청 응답
    this.authService.registerCompany(company).subscribe((data) => {
      if (data.success) {
        Swal.fire({
          title: data.msg,
          icon: 'success',
          timer: 700
        });
      } else {
        Swal.fire({
          title: data.msg,
          icon: 'error',
          timer: 700
        });
        this.router.navigate(['/company']);
      }
    });

  }
}