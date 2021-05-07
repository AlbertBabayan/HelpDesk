import { IDropdownItem } from './dropdownItem.interface';

export interface ITicketDescription {
    default: boolean;
    _id?: string;
    label: string;
    name: string;
    type: string;
    dropdownItems?: Array<IDropdownItem>;
}
