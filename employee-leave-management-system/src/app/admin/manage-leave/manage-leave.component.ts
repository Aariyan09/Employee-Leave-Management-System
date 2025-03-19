import { Component, OnInit } from '@angular/core';
import { stat } from 'fs';
import { ToastrService } from 'src/app/shared/toastr.service';
// import { ToastrService } from 'ngx-toastr';

import { LeaveService } from 'src/app/user/leave.service';

@Component({
  selector: 'app-manage-leave',
  templateUrl: './manage-leave.component.html',
  styleUrls: ['./manage-leave.component.css']
})
export class ManageLeaveComponent implements OnInit {

  leaveRequests: any[] = [];
  searchText: string = '';
  statusFilter: string = '';
  currentPage = 1;
  pageSize = 10;
  totalPagesCount:number = 0;

  constructor(private leaveService: LeaveService, private toastr: ToastrService) { }

  ngOnInit() {
    this.fetchLeaveRequests();
  }

  fetchLeaveRequests() {
    this.leaveService.getAllLeaveRequests().subscribe({
      next: (data) => {
        this.leaveRequests = data;
        this.currentPage = 1; // Reset to first page when fetching new data
        this.totalPagesCount = Math.ceil(this.leaveRequests.length / this.pageSize);
        } ,
      error: () => this.toastr.showError('Failed to fetch leave requests')
    });
  }

  approveRequest(id: number) {
    if (confirm('Are you sure you want to approve this request?')) {
      this.leaveService.approveLeave(id).subscribe({
        next: () => {
          this.toastr.showSuccess('Leave request approved');
          this.fetchLeaveRequests();
        },
        error: () => this.toastr.showError('Error approving request')
      });
    }
  }

  rejectRequest(id: number) {
    if (confirm('Are you sure you want to reject this request?')) {
      this.leaveService.rejectLeave(id).subscribe({
        next: () => {
          this.toastr.showSuccess('Leave request rejected');
          this.fetchLeaveRequests();
        },
        error: () => this.toastr.showError('Error rejecting request')
      });
    }
  }

  getStatusClass(status: string) {
    return {
      'bg-warning text-dark': status == '0',
      'bg-success': status == '1',
      'bg-danger': status == '-1'
    };
  }

  filteredRequests() {
    debugger
    let filtered = this.leaveRequests;
  
    // Apply status filter if selected
    if (this.statusFilter) {
      filtered = filtered.filter(req => req.status == this.statusFilter);
    }
  
    // Apply search filter
    if (this.searchText.trim() !== '') {
      filtered = filtered.filter(req =>
        req.employeeName.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }
  
    // Update total pages based on filtered data
    this.totalPagesCount = Math.ceil(filtered.length / this.pageSize);
    
    // Apply pagination correctly
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;

    console.log(filtered)
    return filtered.slice(startIndex, endIndex);
  }
  

  totalPages() {
    return Array.from({ length: this.totalPagesCount }, (_, i) => i + 1);
  }
  
  changePage(page: number) {
    if (page < 1 || page > this.totalPagesCount) return; // Prevent invalid pages
    this.currentPage = page;
  }

  getStatus(status:string)  {
    if(status == '0') return 'Pending'
    else if(status == '1') return 'Approved'
    else if(status == '-1') return 'Rejected'
    else return 'Pending'
  }

}
