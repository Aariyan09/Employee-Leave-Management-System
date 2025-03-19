import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ApplyLeaveComponent } from './apply-leave/apply-leave.component';
import { LeaveHistoryComponent } from './leave-history/leave-history.component';
import { AuthGuard } from '../core/guards/auth.guard';
import { RoleGuard } from '../core/guards/role.guard';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard, RoleGuard], data: { role: 'User' } },
  { path: 'apply-leave', component: ApplyLeaveComponent, canActivate: [AuthGuard, RoleGuard], data: { role: 'User' } },
  { path: 'leave-history', component: LeaveHistoryComponent, canActivate: [AuthGuard, RoleGuard], data: { role: 'User' } },
  { path: '**', redirectTo: 'dashboard',pathMatch: 'full' },
  { path: '', redirectTo: 'dashboard' ,pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
