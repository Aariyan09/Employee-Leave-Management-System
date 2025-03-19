import { Component, OnInit } from '@angular/core';
import { LeaveService } from '../leave.service';
import { ToastrService } from 'src/app/shared/toastr.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-leave-history',
  templateUrl: './leave-history.component.html',
  styleUrls: ['./leave-history.component.css']
})
export class LeaveHistoryComponent implements OnInit {

  leaveHistory: any[] = [];
  filteredLeaves: any[] = [];
  selectedStatus: string = '';
  startDate: string = '';
  endDate: string = '';

  constructor(private leaveService: LeaveService, private toastr: ToastrService,private authService:AuthService,private router:Router) { }

  ngOnInit(): void {
    this.fetchLeaveHistory();
  }

  fetchLeaveHistory() {
    const userId = Number(this.authService.getUserId());
    this.leaveService.getUserLeaves(userId).subscribe({
      next: (data) => {
        this.leaveHistory = data;
        this.filteredLeaves = [...this.leaveHistory]; // Copy for filtering
      },
      error: () => this.toastr.showError('Failed to load leave history')
    });
  }

  applyFilter() {
    this.filteredLeaves = this.leaveHistory.filter(leave => {
      let matchesStatus = this.selectedStatus ? leave.status == this.selectedStatus : true;
      let matchesStartDate = this.startDate ? new Date(leave.startDate) >= new Date(this.startDate) : true;
      let matchesEndDate = this.endDate ? new Date(leave.endDate) <= new Date(this.endDate) : true;
      return matchesStatus && matchesStartDate && matchesEndDate;
    });
  }

  cancelLeave(leaveId: string) {
    if (confirm('Are you sure you want to cancel this leave request?')) {
      this.leaveService.cancelLeave(leaveId).subscribe({
        next: () => { 
          this.toastr.showSuccess('Leave request cancelled');
          this.fetchLeaveHistory();
        },
        error: () => this.toastr.showError('Failed to cancel leave request')
      });
    }
  }

  goBack() {
    this.router.navigate(['/user/dashboard']);
  }

  getLeaveType(leavetype:string) {
    if(leavetype == '1') return 'Sick Leave'
    else if(leavetype == '2') return 'Casual Leave'
    else if(leavetype == '3') return 'Vacation'
    else if(leavetype == '4') return 'Wedding'
    else return '';
  }

  getStatus(status:string)  {
    if(status == '0') return 'Pending'
    else if(status == '1') return 'Approved'
    else if(status == '-1') return 'Rejected'
    else return 'Pending'
  }
  
}
