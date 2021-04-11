import { Component, OnDestroy, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AdminDataService, LoaderService } from '../../services';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { IColumn } from 'src/app/core/infrastructure/interfaces';


@Component({
  selector: 'app-ticket-columns',
  templateUrl: './ticket-columns.component.html',
  styleUrls: ['./ticket-columns.component.scss']
})
export class TicketColumnsComponent implements OnInit, OnDestroy {

  public displayModal: boolean;
  public columns: IColumn[];
  public columNameForm: FormGroup;
  public selectedItemIndex: number = null;
  private ngUnsubscribe = new Subject();

  constructor(
    private builder: FormBuilder,
    private adminData: AdminDataService,
    private loaderSvc: LoaderService
  ) { }

  ngOnInit(): void {
    this.formInit();
    this.getColumns();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.unsubscribe();
  }

  public formInit() {
    this.columNameForm = this.builder.group({
      addNewColumn: ['', Validators.required]
    });
  }

  public getColumns() {
    this.loaderSvc.subject.next(true);
    this.adminData.getConfigs()
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe({
        next: resp => {
          this.loaderSvc.subject.next(false);
          this.columns = resp.map(
            col => col = {
              name: col.name,
              label: col.label,
              default: col.default,
            },
          );
        },
        error: err => {
          this.loaderSvc.subject.next(false);
          console.log(err);
        }
      });
  }

  public drop(event: CdkDragDrop<string[]>) {
    if (this.columns.length - 1 !== event.currentIndex){
      moveItemInArray(this.columns, event.previousIndex, event.currentIndex);
    }
  }

  public showModalDialog(resetControl) {
    if (resetControl) {
      this.columNameForm.get('addNewColumn').reset();
    }
    this.displayModal = true;
  }

  public edit(index: number) {
    this.selectedItemIndex = index;
    this.columNameForm.get('addNewColumn').setValue(this.columns[index].label);
    this.showModalDialog(false);
  }

  public deleteColumn(index: number) {
    this.columns.splice(index, 1);
  }

  public save() {
    // this.columns.push({
    //   label: 'Completed',
    //   name: 'Completed',
    //   default: false
    // });
    this.adminData.updateConfig(this.columns)
      .pipe(
        takeUntil(
          this.ngUnsubscribe
        )
      )
      .subscribe({
        next: resp => {
          this.columns = resp.column.map(
            col => col = {
              name: col.name,
              label: col.label,
              default: col.default,
            }
          );
        },
        error: err => {
          console.log(err);
        }
      });
  }

  public confirm() {
    const currentValue = this.columNameForm.get('addNewColumn').value;
    if (this.selectedItemIndex !== null) {
      // edit case
      this.columns[this.selectedItemIndex].label = currentValue;
      this.columns[this.selectedItemIndex].name = this.changeWhitespace(currentValue);
    } else {
      // new case
      this.columns.push({
        label: currentValue,
        name: this.changeWhitespace(currentValue),
        default: false
      });
    }
    this.selectedItemIndex = null;
    this.closeModal();
  }

  public closeModal() {
    this.displayModal = false;
  }

  private changeWhitespace(str: string): string {
    return str?.replace(/ /g, '_');
  }
}
