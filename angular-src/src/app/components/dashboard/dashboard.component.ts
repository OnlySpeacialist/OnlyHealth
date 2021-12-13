import { Component, OnInit } from '@angular/core';
import { UserNoPW } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  userString: any;
  userNoPW: UserNoPW;
  name: string;
  token: any;
  card: any;
  company: any;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.userString = localStorage.getItem('userNoPW');
    this.userNoPW = JSON.parse(this.userString);
    this.name = this.userNoPW.name;
    this.token = localStorage.getItem('authToken');

    this.authService
      .getCard({ username: this.userNoPW.username })
      .subscribe((data) => {
        if (data.success) {
          this.card = data.card;
          localStorage.setItem('card', this.card);
        } else {
          return;
        }
      });

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

}
