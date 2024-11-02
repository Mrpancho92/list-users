import { Button, Input, Radio } from "antd";
import { EditOutlined, DeleteOutlined, SearchOutlined } from "@ant-design/icons";
import { DataType, FilterDropdownProps } from "@/shared/intefaces/interfaces";
import styles from './styles.module.scss';
import { IdeviceColumnsProp } from '@/shared/intefaces/interfaces';

export const deviceColumns = ({onEditUser, onDeleteUser, onChangeValueSearch, valueSearch}:IdeviceColumnsProp) => {
    return [
        {
          title: "List users",
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
                  onPressEnter={() => confirm()}
                ></Input>
                <span>Будем искать по:</span>
                <Radio.Group onChange={onChangeValueSearch} value={valueSearch} >
                <Radio value={'email'}>Email</Radio>
                <Radio value={'first_name'}>Firts_name</Radio>
                <Radio value={'last_name'}>Last_name</Radio>
                </Radio.Group>
                <Button onClick={() => confirm()} type="primary">Ok</Button>
                <Button onClick={() => { setSelectedKeys([]); confirm() }} type="primary">Cancel</Button>
              </>
            )
          },
          filterIcon: () => {
            return <SearchOutlined />
          },
          onFilter: (value: any, record: { email:string, first_name: string, last_name: string }) => {
            if(valueSearch === "first_name") {
              return record.first_name.toLowerCase().indexOf(value.toLowerCase()) === 0
            } else if(valueSearch === "last_name") {
              return record.last_name.toLowerCase().indexOf(value.toLowerCase()) === 0
            } else {
              return record.email.toLowerCase().indexOf(value.toLowerCase()) === 0
            }
          },
          sorter: (a: { id: number; }, b: { id: number; }) => a.id - b.id,
          render: (record: DataType) => {
            const id = record.id;
            const email = record.email;
            const first_name = record.first_name;
            const last_name = record.last_name;
            return (
              <div className={styles.mobileList}>
                <span>
                  <h4>ID:</h4>
                  <p>{id}</p>
                </span>
                <span>
                  <h4>Email:</h4>
                  <p>{email}</p>
                </span>
                <span>
                  <h4>First_name:</h4>
                  <p>{first_name}</p>
                </span>
                <span>
                  <h4>Last_name:</h4>
                  <p>{last_name}</p>
                </span>
              </div>
            )
          }
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