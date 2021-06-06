import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SelectItem } from 'primeng/api';

import { ITicketDescription } from 'src/app/core/infrastructure/interfaces';
import { AdminDataService } from '../../services';

@Component({
  selector: 'app-ticket-form',
  templateUrl: './ticket-form.component.html',
  styleUrls: ['./ticket-form.component.scss']
})
export class TicketFormComponent implements OnInit, OnDestroy {

  public ticketForm: FormGroup;
  public dropdownItems: FormArray;
  public ticketTypeOptions: SelectItem[];
  public tickets: ITicketDescription[];
  private ngUnsubscribe = new Subject();

  constructor(
    private bulider: FormBuilder,
    private adminData: AdminDataService
  ) { }

  ngOnInit(): void {
    this.formInit();
    this.getTickets();
    this.ticketTypeOptions = [
      {
        label: 'Text',
        value: 'text'
      },
      {
        label: 'Dropdown',
        value: 'dropdown'
      },
    ];
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.unsubscribe();
  }

  private getTickets() {
    this.adminData.getTickets()
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe({
        next: resp => {
          this.tickets = (resp || []).map(this.getTicket);
        },
        error: err => {
          console.log(err);
        }
      });
  }

  private getTicket(ticket): ITicketDescription {
    if (ticket.dropdownItems) {
      return {
        label: ticket.label,
        name: ticket.name,
        type: ticket.type
      };
    } else {
      return {
        label: ticket.label,
        name: ticket.name,
        type: ticket.type,
        dropdownItems: ticket.dropdownItems
      };
    }
  }

  public Submit() {
    this.ticketForm.get('ticketType').reset();
    this.ticketForm.get('ticketName').reset();
    this.adminData.updateTicket(this.tickets)
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe({
        next: resp => {
          this.tickets = resp.ticket.map(this.getTicket);
        },
        error: err => {
          console.log(err);
        }
      });
  }

  public addToList(): void {
    const ticketType = this.ticketForm.get('ticketType').value;
    const ticketName = this.ticketForm.get('ticketName').value;
    const dropdownItems = this.ticketForm.get('dropdownItems').value;
    this.ticketForm.get('ticketType').reset();
    this.ticketForm.get('ticketName').reset();
    const ticket: ITicketDescription = {
      label: ticketName,
      name: this.changeWhitespace(ticketName),
      type: ticketType
    };
    if (ticketType === 'dropdown') {
      ticket.dropdownItems = dropdownItems.map(
        item => {
          return {
            label: item,
            value: this.changeWhitespace(item)
          };
        }
      );
      console.log(ticket.dropdownItems);
    }
    this.tickets.push(ticket);
    console.log(this.tickets);
  }

  public deleteItem(itemIndex): void {
    this.dropDownItems.removeAt(itemIndex);
  }

  public addItem(): void {
    this.dropDownItems.push(this.createItem());
  }

  private createItem(): FormControl {
    return this.bulider.control('');
  }

  private get dropDownItems(): FormArray {
    return this.ticketForm.get('dropdownItems') as FormArray;
  }

  private formInit(): void {
    this.ticketForm = this.bulider.group({
      ticketName: ['', Validators.required],
      ticketType: ['', Validators.required],
      dropdownItems: this.bulider.array([])
    });
    const ticketType = this.ticketForm.get('ticketType');
    const dropdownItems = this.ticketForm.get('dropdownItems');
    ticketType
      .valueChanges
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(() => {
        if (ticketType.value === 'dropdown' && !dropdownItems.value.length) {
          this.addItem();
        }
      });
  }

  private changeWhitespace(str: string): string {
    return str?.replace(/ /g, '_');
  }
}
