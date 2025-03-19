import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LeaveService } from '../leave.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'src/app/shared/toastr.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { log } from 'console';

declare var bootstrap: any; // Required to manually open/close the modal


@Component({
  selector: 'app-apply-leave',
  templateUrl: './apply-leave.component.html',
  styleUrls: ['./apply-leave.component.css']
})
export class ApplyLeaveComponent {
  leaveForm!: FormGroup;
  isLoading = false;
  leaveTypes:any[] = [
    {Label: 'Sick Leave', Value : 1},
    {Label: 'Casual Leave', Value : 2},
    {Label: 'Vacation Leave', Value : 3},
    {Label: 'Wedding Leave', Value : 4},
  ];

  constructor(private fb: FormBuilder, private leaveService: LeaveService, private toastr: ToastrService,public modalRef: BsModalRef) {}

  ngOnInit(): void {
    this.leaveForm = this.fb.group({
      leaveType: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      reason: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  applyLeave() {
    if (this.leaveForm.valid) {
      const request = {
        LeaveType : this.leaveForm.get('leaveType')?.value,
        StartDate : this.leaveForm.get('startDate')?.value,
        EndDate : this.leaveForm.get('endDate')?.value,
        Reason : this.leaveForm.get('reason')?.value,
      };
      
      this.leaveService.applyLeave(request).subscribe({
        next: (res) => {
          this.toastr.showSuccess('Leave request submitted successfully');
          this.closeModal();
          
        },
        error: (err) => {
          console.log(err);
          
          this.toastr.showError('Failed to submit leave request')
        } 
      });
    }
  }

  // Function to manually close modal after submission
  closeModal() {
    this.modalRef.hide();
  }


}
