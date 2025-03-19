import { Component, OnInit } from '@angular/core';
import { ChartData } from 'chart.js';
import { ToastrService } from 'src/app/shared/toastr.service';
import { LeaveService } from 'src/app/user/leave.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  leaveRequests: any[] = [];
  leaveChartLabels = ['Pending', 'Approved', 'Rejected'];
  leaveChartData: ChartData<'pie'> = {
    labels: ['Pending', 'Approved', 'Rejected'],
    datasets: [{ data: [0, 0, 0] }]
  };

  balanceChartLabels: string[] = [];
  balanceChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [{ data: [], label: 'Leave Balance' }]
  };

  totalPending:number =0;
  totalApproved:number =0;
  totalRejected:number =0;

  constructor(private leaveService: LeaveService, private toastr: ToastrService) {console.log(1) }

  ngOnInit() {
    this.loadLeaveRequests();
  }

  loadLeaveRequests() {
    this.leaveService.getAllLeaveRequests().subscribe({
      next: (response) => {
        this.leaveRequests = response;
        this.updateLeaveChart();
      },
      error: () => this.toastr.showError('Failed to fetch leave requests')
    });
  }

  updateLeaveChart() {
    let pending = this.totalPending = this.leaveRequests.filter(l => l.status == 0).length;
    let approved = this.totalApproved = this.leaveRequests.filter(l => l.status == 1).length;
    let rejected = this.totalRejected = this.leaveRequests.filter(l => l.status == -1).length;

    this.leaveChartData = { labels: this.leaveChartLabels, datasets: [{ data: [pending, approved, rejected] }] };
  }
}
