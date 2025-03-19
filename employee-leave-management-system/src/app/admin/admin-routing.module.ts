import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManageLeaveComponent } from './manage-leave/manage-leave.component';
import { AdminGuard } from '../core/guards/admin.guard';
import { AuthGuard } from '../core/guards/auth.guard';
import { EmployeeBalanceComponent } from './employee-balance/employee-balance.component';
import { ReportsComponent } from './reports/reports.component';
import { RoleGuard } from '../core/guards/role.guard';

console.log(1)
const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard, RoleGuard], data: { role: 'Admin' } },
  { path: 'manage-leaves', component: ManageLeaveComponent, canActivate: [AuthGuard, RoleGuard], data: { role: 'Admin' } },
  { path: 'leave-balance', component: EmployeeBalanceComponent, canActivate: [AuthGuard, RoleGuard], data: { role: 'Admin' } },
  { path: 'reports', component: ReportsComponent, canActivate: [AuthGuard, RoleGuard], data: { role: 'Admin' } },
  { path: '**', redirectTo: 'dashboard',pathMatch: 'full' },
  { path: '', redirectTo: 'dashboard' ,pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
