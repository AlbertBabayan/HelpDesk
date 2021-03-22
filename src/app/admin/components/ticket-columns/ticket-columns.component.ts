import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-ticket-columns',
  templateUrl: './ticket-columns.component.html',
  styleUrls: ['./ticket-columns.component.scss']
})
export class TicketColumnsComponent implements OnInit {

  public displayModal: boolean;
  public columnsNames = [];
  public columNameForm: FormGroup;
  public selectedItemIndex: number = null;

  constructor(
    private builder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.formInit();
  }

  public formInit() {
    this.columNameForm = this.builder.group({
      addNewColumn: ['', Validators.required]
    });
  }

  public drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.columnsNames, event.previousIndex, event.currentIndex);
  }

  public showModalDialog(resetControl) {
    if (resetControl) {
      this.columNameForm.get('addNewColumn').reset();
    }
    this.displayModal = true;
  }

  public edit(index: number) {
    this.selectedItemIndex = index;
    this.columNameForm.get('addNewColumn').setValue(this.columnsNames[index]);
    this.showModalDialog(false);
  }

  public deleteColumn(index: number){
    this.columnsNames.splice(index, 1);
  }

  public confirm() {
    if (this.selectedItemIndex !== null) {
      // edit case
      this.columnsNames[this.selectedItemIndex] = this.columNameForm.get('addNewColumn').value;
    } else {
      // new case
      this.columnsNames.push(this.columNameForm.get('addNewColumn').value || 'New column');
    }
    this.selectedItemIndex = null;
    this.closeModal();
  }

  public closeModal() {
    this.displayModal = false;
  }
}
