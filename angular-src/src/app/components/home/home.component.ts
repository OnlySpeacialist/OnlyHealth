import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Login, UserNoPW } from 'src/app/models/user';
import { FlashMessagesService } from 'angular2-flash-messages';
import Swal from 'sweetalert2/src/sweetalert2.js'
import { Input, Output, EventEmitter } from '@angular/core';


// import { FileUploader } from 'ng2-file-upload';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  password: string;
  name: string;
  username: string;
  email: string;
  display = 'none';
  company: any;
  userNoPW: UserNoPW;
  userString: any;
  token: any;

  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit(): void {
    this.userString = localStorage.getItem('userNoPW');
    this.userNoPW = JSON.parse(this.userString);
    this.name = this.userNoPW.name;
    this.token = localStorage.getItem('authToken');

    this.authService
      .getProfile().subscribe(
        (profile) => {
          this.name = profile.userNoPW.name;
          this.username = profile.userNoPW.username;
          this.email = profile.userNoPW.email;
        }, (err) => {
          console.log(err);
          return false;
        }
      );

    this.authService
      .getCompany({ username: this.userNoPW.username })
      .subscribe((data) => {
        if (data.success) {
          this.company = data.company;
          localStorage.setItem('company', this.company);
        } else {
          return;
        }
      });
  }



  onLogoutClick(): void {
    this.authService.logout();
    Swal.fire({
      title: '로그아웃 성공!',
      icon: 'success',
      confirmButtonText: '확인',
    });
    this.router.navigate(['/']);
  }


  checkLoggedIn(): boolean {
    return this.authService.loggedIn();
  }

  openModal() {
    this.display = 'block';
  }
  onCloseHandled() {
    this.display = 'none';
  }

  public modal: boolean = false;

  clickedModalClose() {
    this.modal = false;
  }

  clickedModal() {
    this.modal = true;
  }

  onLoginSubmit() {
    const login: Login = {
      username: this.username,
      password: this.password
    };

    this.authService.authenticateUser(login).subscribe((data) => {
      if (data.success) {
        this.authService.storeUserData(data.token, data.userNoPW);
        Swal.fire({
          title: '로그인 성공!',
          icon: 'success',
          confirmButtonText: '확인',
        });
        this.router.navigate(['/']);
      } else {
        Swal.fire({
          title: '아이디 또는 비밀번호 다시확인',
          icon: 'error',
          confirmButtonText: '다시시도',
        });
        this.router.navigate(['/']);
      }
      console.log(data);
    });
  }

  url = "../../../assets/base.png"

  oneselectFile(e) {
    if (e.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event: any) => {
        this.url = event.target.result;
      }
    }
  }


  // const onChange = async (e) => {
  //   const thumbnailImage = e.target.files[0];
  //   const formData = new FormData();
  //   formData.append('image', thumbnailImage);
  //   await axios
  //     .post('서버 URL/upload', formData, {
  //       withCredentials: true,
  //     })
  //     .then((response) => {
  //       dispatch(changeField({ key: 'thumbnail', value: response.data }));
  //     })
  //     .catch((error) => {
  //       console.error('Error:', error);
  //     });
  // };
}
