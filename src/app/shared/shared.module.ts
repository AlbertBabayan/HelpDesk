import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbDatepickerModule, NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgbDatepickerModule,
    NgbPopoverModule,
    RadioButtonModule,
    CheckboxModule,
    InputTextModule,
    ButtonModule,
  ],
  exports: [
    ReactiveFormsModule,
    NgbDatepickerModule,
    NgbPopoverModule,
    RadioButtonModule,
    CheckboxModule,
    InputTextModule,
    ButtonModule,
  ]
})
export class SharedModule { }
