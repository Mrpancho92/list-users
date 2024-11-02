import type { RadioChangeEvent } from 'antd';

export interface DataType {
    key: number;
    id: number;
    email: string;
    first_name: string;
    last_name: string;
  }
export type DataTypeInitially = Omit<DataType, "key">;

export type DataIndex = keyof DataType;

export interface ColumnFilterItem {
  text: React.ReactNode;
  value: string | number | boolean;
  children?: ColumnFilterItem[];
}
export interface FilterConfirmProps {
  closeDropdown: boolean;
}
export interface FilterDropdownProps {
  setSelectedKeys: (selectedKeys: React.Key[]) => void;
  selectedKeys: React.Key[];
  confirm: (param?: FilterConfirmProps) => void;
}

export interface IcolumnsProp {
  onEditUser: (record: DataType) => void;
  onDeleteUser: (record: DataType) => void;
}
export interface IdeviceColumnsProp extends IcolumnsProp{
  onChangeValueSearch: (e: RadioChangeEvent) => void;
  valueSearch: string;
}

export interface IModalInput {
  field: string;
  setEditingUser:(value: React.SetStateAction<DataType>) => void
}