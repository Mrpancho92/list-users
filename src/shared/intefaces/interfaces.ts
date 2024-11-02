export interface DataType {
    key: number;
    id: number;
    email: string;
    first_name: string;
    last_name: string;
  }
export type DataTypeInitially = Omit<DataType, "key">;
export interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
    editing: boolean;
    dataIndex: string;
    title: any;
    inputType: 'number' | 'text';
    record: DataType;
    index: number;
  }

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