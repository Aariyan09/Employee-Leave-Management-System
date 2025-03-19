import { Component, OnInit } from '@angular/core';
import { EmployeeLeaveBalance } from 'src/app/core/models/EmployeeLeaveBalance';
import { LeaveService } from 'src/app/user/leave.service';

@Component({
  selector: 'app-employee-balance',
  templateUrl: './employee-balance.component.html',
  styleUrls: ['./employee-balance.component.css']
})
export class EmployeeBalanceComponent implements OnInit {

  leaveBalances: EmployeeLeaveBalance[] = [];
  isLoading = true;

  constructor(private leaveService: LeaveService) { }

  ngOnInit(): void {
    this.loadLeaveBalances();
  }

  loadLeaveBalances(): void {
    this.leaveService.getEmployeeLeaveBalances().subscribe({
      next: (data) => {
        console.log(data)
        this.leaveBalances = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching leave balances', err);
        this.isLoading = false;
      }
    });
  }

  reloadGrid(): void {
    this.loadLeaveBalances();
  }
}
