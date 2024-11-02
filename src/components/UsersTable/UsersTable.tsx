import { Button, Table, Modal, Input, notification, Radio } from "antd";
import { useState, useEffect } from "react";
import { EditOutlined, DeleteOutlined, SearchOutlined } from "@ant-design/icons";
import { messages } from '@/shared/constants/messages';
import useUserService from '@/services/UserService';
import { DataType, FilterDropdownProps } from "@/shared/intefaces/interfaces";
import styles from './styles.module.scss';
import { useMediaQuery } from 'react-responsive';
import type { RadioChangeEvent } from 'antd';

const defaultEditingUser = {
  key: 0,
  id: 0,
  email: '',
  first_name: '',
  last_name: '',
}

const UsersTable = () => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editingUser, setEditingUser] = useState<DataType>(defaultEditingUser);
  const [dataSource, setDataSource] = useState<DataType[]>([]);
  const { getListUsers, deleteUser } = useUserService();
  const [valueSearch, setValueSearch] = useState('email');

  const onChange = (e: RadioChangeEvent) => {
    setValueSearch(e.target.value);
  };

  useEffect(() => {
    getListUsers()
      .then(users => setDataSource(users))
      .then(() => notification.success({ placement: 'top', duration: 2, ...messages.getUsersSuccess }))
      .catch(() => notification.error({ placement: 'top', duration: 2, ...messages.getUsersError }))
  }, [])

  const isWebDevice = useMediaQuery({
    query: '(min-width: 700px)'
  });
  const deviceColumns = [
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
            <Radio.Group onChange={onChange} value={valueSearch} >
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

  const columns = [
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

  const onDeleteUser = (record: DataType) => {
    Modal.confirm({
      title: "Are you sure, you want to delete this user?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        deleteUser(record.id)
          .then(users => setDataSource(users))
          .catch(() => {
            setDataSource((pre) => pre.filter((user) => user.id !== record.id))
            notification.success({ placement: 'top', duration: 2, message: messages.deleteUserSuccess.message, description: messages.deleteUserSuccess.description(record.first_name, record.last_name) })
          })
      },
    });
  };
  const onEditUser = (record: DataType) => {
    setIsEditing(true);
    setEditingUser({ ...record });
  };
  const resetEditing = () => {
    setIsEditing(false);
    setEditingUser(defaultEditingUser);
  };
  return (
    <div className={styles.container}>
      <Table bordered columns={isWebDevice ? columns : deviceColumns} dataSource={dataSource}></Table>
      <Modal
        title="Edit Users"
        open={isEditing}
        okText="Save"
        onCancel={() => {
          resetEditing();
        }}
        onOk={() => {
          setDataSource((pre: DataType[]) => pre.map((user: any) => {
            if (editingUser !== null) {
              if (user.id === editingUser.id) {
                return editingUser;
              } else {
                return user;
              }
            }
          })
          );
          resetEditing();
        }}
      >
        <Input
          value={editingUser?.email}
          onChange={(e) => {
            setEditingUser((pre) => {
              return { ...pre, email: e.target.value };
            });
          }}
        />
        <Input
          value={editingUser?.first_name}
          onChange={(e) => {
            setEditingUser((pre) => {
              return { ...pre, first_name: e.target.value };
            });
          }}
        />
        <Input
          value={editingUser?.last_name}
          onChange={(e) => {
            setEditingUser((pre) => {
              return { ...pre, last_name: e.target.value };
            });
          }}
        />
      </Modal>
    </div>
  );
}
export default UsersTable;
