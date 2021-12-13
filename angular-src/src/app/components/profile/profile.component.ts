import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from 'src/app/services/auth.service';
import { ValidateService } from 'src/app/services/validate.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  name: string;
  username: string;
  email: string;
  height: string;
  weight: string;

  constructor(
    private authService : AuthService,
    private validateService: ValidateService,
    private flashMessage: FlashMessagesService,
    private router: Router
    ) {}

  ngOnInit(): void {
    this.authService.getProfile().subscribe(
      (profile) => {
        this.name = profile.userNoPW.name;
        this.username = profile.userNoPW.username;
        this.email = profile.userNoPW.email;
        this.height = profile.userNoPW.height;
        this.weight = profile.userNoPW.weight;
      }, (err) => {
        console.log(err);
        return false;
      }
    );
  }
  onUploadSubmit(): any {
    
  }
}
