import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManageLeaveComponent } from './manage-leave/manage-leave.component';
import { SharedModule } from '../shared/shared/shared.module';
import { EmployeeBalanceComponent } from './employee-balance/employee-balance.component';
import { ReportsComponent } from './reports/reports.component';
import { NgChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [
    DashboardComponent,
    ManageLeaveComponent,
    EmployeeBalanceComponent,
    ReportsComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    NgChartsModule
  ]
})
export class AdminModule { }
