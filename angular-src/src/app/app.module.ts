import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ValidateService } from './services/validate.service';
import { FlashMessagesModule, FlashMessagesService } from 'angular2-flash-messages';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { JwtModule } from '@auth0/angular-jwt';
import { AuthGuard } from './guards/auth.guard';
import { ListComponent } from './components/list/list.component';
import { CardComponent } from './components/card/card.component';
import { ProfileEditComponent } from './components/profile-edit/profile-edit.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { AgendaService, DayService, DragAndDropService, MonthService, RecurrenceEditorModule, ResizeService, ScheduleModule, WeekService, WorkWeekService } from '@syncfusion/ej2-angular-schedule';
import { MapComponent } from './components/map/map.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { AddEventComponent } from './components/calendar/add-event/add-event.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin
import interactionPlugin from '@fullcalendar/interaction';
import { ReserveComponent } from './components/reserve/reserve.component';

FullCalendarModule.registerPlugins([
  dayGridPlugin,
  interactionPlugin
]);


// import { HttpModule } from '@angular/http';
// import { FileUploadModule } from 'ng2-file-upload';

// import { AppComponent } from './app.component';
// import { ProfilePictureComponent } from './profile-picture/profile-picture.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    DashboardComponent,
    ProfileComponent,
    ListComponent,
    CardComponent,
    ProfileEditComponent,
    ScheduleComponent,
    MapComponent,
    CalendarComponent,
    AddEventComponent,
    ReserveComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, 
    FlashMessagesModule,
    HttpClientModule,
    ReactiveFormsModule,
    ScheduleModule, RecurrenceEditorModule,
    FullCalendarModule,

    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('authToken');
        },
      },
    }),
  ],
  providers: [ValidateService, FlashMessagesService, AuthService, AuthGuard, DayService, WeekService, WorkWeekService, MonthService, AgendaService, ResizeService, DragAndDropService],
  bootstrap: [AppComponent]
})
export class AppModule { }
