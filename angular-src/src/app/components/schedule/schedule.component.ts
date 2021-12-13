import { Component, OnInit } from '@angular/core';
import { DayService, WeekService, WorkWeekService, MonthService, AgendaService, EventSettingsModel } from '@syncfusion/ej2-angular-schedule';
import { DataManager, UrlAdaptor } from '@syncfusion/ej2-data';

@Component({
  selector: 'app-schedule',
  template: `<ejs-schedule width='100%' height='550px'></ejs-schedule>`,
  // templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
  providers: [DayService, WeekService, WorkWeekService, MonthService, AgendaService],
})
export class ScheduleComponent implements OnInit {
  constructor() { }
  private dataManager: DataManager = new DataManager({
    url: 'http://localhost:3000/GetData',
    crudUrl: 'http://localhost:3000/BatchData',
    adaptor: new UrlAdaptor,
    crossDomain: true
  });
  public eventSettings: EventSettingsModel = { dataSource: this.dataManager };

  ngOnInit(): void {

  }
}