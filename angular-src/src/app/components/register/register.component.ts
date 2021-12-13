import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from 'src/app/services/auth.service';
import { ValidateService } from 'src/app/services/validate.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  name: string;
  username: string;
  email: string;
  password1: string;
  password2: string;

  constructor(
    private validateService: ValidateService,
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private router: Router
    ) {}

  ngOnInit(): void {
  }

  onRegisterSubmit(): any {
    // Confirm passwords
    if (this.password1 !== this.password2) {
      
      Swal.fire({
        title: '패스워드가 일치하지 않습니다. 다시 입력하세요.',
        icon: 'warning',
        timer: 700
      });
      return false;
    }

    // Validate email
    if (!this.validateService.validateEmail(this.email)) {
      Swal.fire({
        title: '유효한 이메일 주소를 입력해주세요.',
        icon: 'warning',
        timer: 700
      });
      return false;
    } 

    // 사용자 정보의 JSON 객체 생성
    const user = {
      name: this.name,
      email: this.email,
      username: this.username,
      password: this.password1,
    };

    //모든 필드가 입력되었는지 검증
    if (!this.validateService.validateRegister(user)) {
      Swal.fire({
        title: '모든 항목을 입력해 주세요.',
        icon: 'warning',
        timer: 700
      });
      return false;
    }
        
    // Register User
    // 서버에 사용자 등록 요청/응답
    this.authService.registerUser(user).subscribe((data) => {
      if (data.success) {
        Swal.fire({
          title: '회원가입 완료',
          icon: 'success',
          timer: 700
        });
        this.router.navigate(['/']);
      } else {
        Swal.fire({
          title: '가입실패 다시시도',
          icon: 'error',
          timer: 700
        });
        this.router.navigate(['/register']);
      }
    });
  }
}
