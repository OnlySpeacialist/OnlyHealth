import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { User, Login, UserNoPW } from '../models/user';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  prepEndpoint(ep) {
    //로컬
    return 'http://localhost:3000/' + ep;
    //클라우드
    //return ep;
  }


  constructor(
    private http: HttpClient,
    public jwtHelper: JwtHelperService
  ) { }



  registerUser(user: User): Observable<any> {
    const registerUrl = this.prepEndpoint('users/register');
    return this.http.post<any>(registerUrl, user, httpOptions);
  }

  registerCard(card: any): Observable<any> {
    const registerCardUrl = this.prepEndpoint('users/card');
    return this.http.post<any>(registerCardUrl, card, httpOptions);
  }

  authenticateUser(login: Login): Observable<any> {
    const loginUrl = this.prepEndpoint('users/authenticate');
    return this.http.post<any>(loginUrl, login, httpOptions);
  }

  storeUserData(token: any, userNoPW: UserNoPW) {
    localStorage.setItem('authToken', token);
    localStorage.setItem('userNoPW', JSON.stringify(userNoPW));
  }

  logout() {
    localStorage.clear();
    localStorage.removeItem('authToken');
    localStorage.removeItem('userNoPW');
  }

  getProfile(): Observable<any> {
    let authToken: any = localStorage.getItem('authToken');
    // 토큰을 포함한 헤더 옵션 생성
    const httpOptions1 = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + authToken,
      }),
    };
    const profileUrl = this.prepEndpoint('users/profile');
    return this.http.get<any>(profileUrl, httpOptions1);
  }

  // Show user list (just testing DB query)
  getList(): Observable<any> {
    let authToken: any = localStorage.getItem('authToken');
    const httpOptions1 = {
      headers: new HttpHeaders({
        contentType: 'application/json',
        authorization: 'Bearer ' + authToken,
      }),
    };
    const listUrl = this.prepEndpoint('users/list');
    return this.http.get<any>(listUrl, httpOptions1);
  }

  // 예약시스템
  getReserve(): Observable<any> {
    let authToken: any = localStorage.getItem('authToken');
    const httpOptions1 = {
      headers: new HttpHeaders({
        contentType: 'application/json',
        authorization: 'Bearer ' + authToken,
      }),
    };
    const reserveUrl = this.prepEndpoint('users/reserve');
    return this.http.get<any>(reserveUrl, httpOptions1);
  }


  // 사용자의 명함을 읽어오는 함수
  getCard(username: any): Observable<any> {
    let authToken: any = localStorage.getItem('authToken');
    const httpOptions1 = {
      headers: new HttpHeaders({
        contentType: 'application/json',
        authorization: 'Bearer ' + authToken,
      }),
    };
    const myCardUrl = this.prepEndpoint('users/myCard');
    return this.http.post<any>(myCardUrl, username, httpOptions1);
  }

  getCompany(username: any): Observable<any> {
    let authToken: any = localStorage.getItem('authToken');
    const httpOptions1 = {
      headers: new HttpHeaders({
        contentType: 'application/json',
        authorization: 'Bearer ' + authToken,
      }),
    };
    const myCompanyUrl = this.prepEndpoint('users/myCompany');
    return this.http.post<any>(myCompanyUrl, username, httpOptions1);
  }

  registerCompany(company: any): Observable<any> {
    const registerCompanyUrl = this.prepEndpoint('users/company');
    return this.http.post<any>(registerCompanyUrl, company, httpOptions);
  }


  loggedIn(): boolean {
    let authToken: any = localStorage.getItem('authToken');
    return !this.jwtHelper.isTokenExpired(authToken);
  }


  //정보수정
  editUser(user: User): Observable<any> {
    const registerUrl = "http://localhost:3000/users/edit";
    return this.http.post<any>(registerUrl, user, httpOptions);
  }


}


