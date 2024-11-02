import { Table, Modal, notification } from "antd";
import { useState, useEffect } from "react";
import { messages } from '@/shared/constants/messages';
import useUserService from '@/services/UserService';
import { DataType } from "@/shared/intefaces/interfaces";
import styles from './styles.module.scss';
import { useMediaQuery } from 'react-responsive';
import type { RadioChangeEvent } from 'antd';
import {columns} from '@/shared/columns/columns';
import {deviceColumns} from '@/shared/deviceColumns/deviceColumns';
import { defaultEditingUser } from "@/shared/constants/defaultEditingUser";
import {ModalInput} from '@/shared/Input/Input';

const UsersTable = () => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editingUser, setEditingUser] = useState<DataType>(defaultEditingUser);
  const [dataSource, setDataSource] = useState<DataType[]>([]);
  const { getListUsers, deleteUser } = useUserService();
  const [valueSearch, setValueSearch] = useState('email');
  
  const isWebDevice = useMediaQuery({
    query: '(min-width: 700px)'
  });

  useEffect(() => {
    getListUsers()
      .then(users => setDataSource(users))
      .then(() => notification.success({ placement: 'top', duration: 2, ...messages.getUsersSuccess }))
      .catch(() => notification.error({ placement: 'top', duration: 2, ...messages.getUsersError }))
  }, [])

  const onChangeValueSearch = (e: RadioChangeEvent) => {
    setValueSearch(e.target.value);
  };

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
      <Table 
        bordered 
        columns={isWebDevice ? columns({onEditUser, onDeleteUser}) :                  
        deviceColumns({onEditUser, onDeleteUser, onChangeValueSearch, valueSearch} 
        )} 
        dataSource={dataSource}>
      </Table>
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
        <ModalInput field={editingUser?.email} setEditingUser={setEditingUser}/>
        <ModalInput field={editingUser?.first_name} setEditingUser={setEditingUser}/>
        <ModalInput field={editingUser?.last_name} setEditingUser={setEditingUser}/>
      </Modal>
    </div>
  );
}
export default UsersTable;

