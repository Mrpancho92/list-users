import { Button, Input } from "antd";
import { EditOutlined, DeleteOutlined, SearchOutlined } from "@ant-design/icons";
import { DataType, FilterDropdownProps } from "@/shared/intefaces/interfaces";
import { IcolumnsProp } from '@/shared/intefaces/interfaces';

export const columns = ({onEditUser,onDeleteUser}:IcolumnsProp) => {
  return [
    {
      key: "1",
      title: "ID",
      dataIndex: "id",
      sorter: (a: { id: number; }, b: { id: number; }) => a.id - b.id,
    },
    {
      key: "2",
      title: "Email",
      dataIndex: "email",
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }: FilterDropdownProps) => {
        return (
          <>
            <Input
              autoFocus
              placeholder="Type email here"
              value={selectedKeys[0]}
              onChange={(e) => {
                setSelectedKeys(e.target.value ? [e.target.value] : []);
              }}
              onPressEnter={() => confirm()}
            ></Input>
            <Button onClick={() => confirm()} type="primary">Ok</Button>
            <Button onClick={() => { setSelectedKeys([]); confirm(); }} type="primary">Cancel</Button>
          </>
        )
      },
      filterIcon: () => {
        return <SearchOutlined />
      },
      onFilter: (value: any, record: { email: string; }) => record.email.toLowerCase().indexOf(value.toLowerCase()) === 0,
    },
    {
      key: "3",
      title: "First_name",
      dataIndex: "first_name",
      sorter: (a: { first_name: string; }, b: { first_name: string; }) => a.first_name.localeCompare(b.first_name),
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }: FilterDropdownProps) => {
        return (
          <>
            <Input
              autoFocus
              placeholder="Type first_name here"
              value={selectedKeys[0]}
              onChange={(e) => {
                setSelectedKeys(e.target.value ? [e.target.value] : []);
              }}
              onPressEnter={() => { confirm(); }}
              onBlur={() => { confirm(); }}
            ></Input>
            <Button onClick={() => confirm()} type="primary">Ok</Button>
            <Button onClick={() => { setSelectedKeys([]); confirm(); }} type="primary">Cancel</Button>
          </>
        )
      },
      filterIcon: () => {
        return <SearchOutlined />
      },
      onFilter: (value: any, record: { first_name: string; }) => record.first_name.toLowerCase().indexOf(value.toLowerCase()) === 0,
    },
    {
      key: "4",
      title: "Last_name",
      dataIndex: "last_name",
      sorter: (a: { last_name: string; }, b: { last_name: string; }) => a.last_name.localeCompare(b.last_name),
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }: FilterDropdownProps) => {
        return (
          <>
            <Input
              autoFocus
              placeholder="Type last_name here"
              value={selectedKeys[0]}
              onChange={(e) => {
                setSelectedKeys(e.target.value ? [e.target.value] : []);
              }}
              onPressEnter={() => { confirm(); }}
              onBlur={() => { confirm(); }}
            ></Input>
            <Button onClick={() => confirm()} type="primary">Ok</Button>
            <Button onClick={() => { setSelectedKeys([]); confirm(); }} type="primary">Cancel</Button>
          </>
        )
      },
      filterIcon: () => {
        return <SearchOutlined />
      },
      onFilter: (value: any, record: { last_name: string; }) => record.last_name.toLowerCase().indexOf(value.toLowerCase()) === 0,
    },
    {
      key: "5",
      title: "Actions",
      render: (record: DataType) => {
        return (
          <>
            <EditOutlined
              onClick={() => {
                onEditUser(record);
              }}
            />
            <DeleteOutlined
              onClick={() => {
                onDeleteUser(record);
              }}
              style={{ color: "red", marginLeft: 12 }}
            />
          </>
        );
      },
    },
  ];
}
