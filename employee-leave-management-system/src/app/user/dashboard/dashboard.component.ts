import { Component, OnInit } from '@angular/core';
import { LeaveService } from '../leave.service';
import { AuthService } from 'src/app/auth/auth.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ApplyLeaveComponent } from '../apply-leave/apply-leave.component';
import { log } from 'console';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  modalRef?: BsModalRef;

  totalLeaves: number = 0;
  approvedLeaves: number = 0;
  pendingLeaves: number = 0;

  constructor(
    private leaveService: LeaveService,
    private authService: AuthService,
    private modalService: BsModalService
  ) { }

  ngOnInit(): void {
    this.loadUserLeaveSummary();
  }

  openDialogForLeaveApply() {
    this.modalRef = this.modalService.show(ApplyLeaveComponent);
    // Listen for modal close event
    this.modalRef.onHidden?.subscribe(() => {
      this.loadUserLeaveSummary();
    });
  }

  /**
   * Fetches the user's leave summary.
   */
  loadUserLeaveSummary(): void {
    const userId = Number(this.authService.getUserId());
    this.leaveService.getUserLeaves(userId).subscribe({
      next: (data) => {
        console.log(data);

        this.totalLeaves = data.length;
        this.approvedLeaves = data.filter(l => l.status === 1).length;
        this.pendingLeaves = data.filter(l => l.status === 0).length;
      },
      error: () => console.error('Error fetching leave data')
    });
  }

  /**
   * Logout user and redirect to login page.
   */
  logout(): void {
    this.authService.logout();
  }
}
