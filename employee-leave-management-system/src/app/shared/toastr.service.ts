import { Injectable } from '@angular/core';
import { ToastrService as  ToastrService2 } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastrService {

  constructor(private toastr: ToastrService2) {}

  showSuccess(message:string) {
    this.toastr.success(message, 'Success');
  }

  showError(message:string) {
    this.toastr.error(message, 'Error');
  }
}
