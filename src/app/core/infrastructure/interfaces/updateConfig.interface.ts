import { IColumn } from './getColumn.interface';
import { ITicket } from './ticket.interface';

export interface IUpdateConfig {
    _id: string;
    ticket: ITicket[];
    column: IColumn[];
    __v: number;
    id: string;
}
