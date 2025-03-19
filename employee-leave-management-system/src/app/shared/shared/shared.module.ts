import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  exports: [
    // Shared across all modules
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule 
  ]
})
export class SharedModule { }
