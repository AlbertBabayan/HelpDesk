import { IDropdownItem } from './dropdownItem.interface';

export interface ITicket {
    label: string;
    name: string;
    type: string;
    dropdownItems?: Array<IDropdownItem>;
}
