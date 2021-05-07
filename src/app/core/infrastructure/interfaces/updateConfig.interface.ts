import { IColumn } from './getColumn.interface';
import { ITicketDescription } from './ticketDescription.interface';

export interface IUpdateConfig {
    _id: string;
    ticket: ITicketDescription[];
    column: IColumn[];
    __v: number;
    id: string;
}
