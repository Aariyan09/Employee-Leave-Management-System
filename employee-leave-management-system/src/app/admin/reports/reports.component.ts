import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LeaveService } from 'src/app/user/leave.service';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { filter } from 'rxjs';


@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  startDate: string = '';
  endDate: string = '';
  selectedLeaveType: number = 0;

  leaveTypes = [
    { value: 1, label: 'Sick Leave' },
    { value: 2, label: 'Casual Leave' },
    { value: 3, label: 'Vacation Leave' },
    { value: 4, label: 'Wedding Leave' },
  ];

  employees: any[] = [];

  constructor(private leaveService: LeaveService, private router: Router) { }

  ngOnInit(): void {
  }

  generateReport() {
    const filters = {
      startDate: this.startDate,
      endDate: this.endDate,
      leaveType: Number(this.selectedLeaveType),
    };

    console.log(filters);

    this.leaveService.getLeaveReport(filters).subscribe((reportData) => {
      if (reportData && reportData.length > 0) {
        this.exportToExcel(reportData);
      } else {
        alert('No data available for the selected filters.');
      }
    });
  }

  exportToExcel(data: any[]) {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const workbook: XLSX.WorkBook = {
      Sheets: { LeaveReport: worksheet },
      SheetNames: ['LeaveReport'],
    };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const excelFile = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(excelFile, `LeaveReport_${new Date().toISOString()}.xlsx`);
  }

  goToDashboard() {
    this.router.navigate(['/admin']);
  }

}
