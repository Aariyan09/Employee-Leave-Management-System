import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeeLeaveBalance } from '../core/models/EmployeeLeaveBalance';

@Injectable({
  providedIn: 'root'
})
export class LeaveService {

  private apiUrl = 'https://localhost:7134/api/LeaveRequest';

  constructor(private http: HttpClient) { }

  /**
   * Apply leave (User).
  */
  applyLeave(leaveData: any): Observable<any[]> {
    return this.http.post<any>(`${this.apiUrl}`, leaveData);
  }

  /**
   * Get leaves for particular user (User).
  */
  getUserLeaves(userId:number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/user/${userId}`);
  }

  /**
   * Cancel pending leave request 
  */
  cancelLeave(leaveId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${leaveId}`);
  }


  /**
   * Get All Employees leave request (Admin)
  */
  getAllLeaveRequests(): Observable<any> {
    return this.http.get(`${this.apiUrl}/admin`);
  }

  /**
   * Approve Leave (Admin) 
  */
  approveLeave(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/approve/${id}`, {});
  }

  /**
   * Reject leave request (Admin) 
  */
  rejectLeave(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/reject/${id}`, {});
  }

  /**
   * Get employee leave report (Admin)
  */
  getLeaveReport(filters: any): Observable<any[]> {
    return this.http.post<any[]>(`${this.apiUrl}/reports/generate-excel`, filters);
  }

  /**
   * Get each employee leave balance of each type of leave (Admin)
  */
  getEmployeeLeaveBalances(): Observable<EmployeeLeaveBalance[]> {
    return this.http.get<EmployeeLeaveBalance[]>(`${this.apiUrl}/admin/leave-balances`);
  }
}
