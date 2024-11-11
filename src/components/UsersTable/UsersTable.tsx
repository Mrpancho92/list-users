import { Table, Input, Modal, notification } from "antd";
import { useState, useEffect, useCallback } from "react";
import { messages } from '@/shared/constants/messages';
import useUserService from '@/services/UserService';
import { DataType, IPopup } from "@/shared/intefaces/interfaces";
import styles from './styles.module.scss';
import { useMediaQuery } from 'react-responsive';
import type { RadioChangeEvent } from 'antd';
import {columns} from '@/shared/columns/columns';
import {deviceColumns} from '@/shared/deviceColumns/deviceColumns';
import { defaultEditingUser } from "@/shared/constants/defaultEditingUser";
import Popup from "@/shared/Popup/popup";

const UsersTable = () => {
  const [isEditing, setIsEditing] = useState<boolean>(false); // состояние для открытия модалки
  const [editingUser, setEditingUser] = useState<DataType>(defaultEditingUser); // при срабатывании бросается объект с текущим юзером
  const [dataSource, setDataSource] = useState<DataType[]>([]); // список юзеров
  const { getListUsers, deleteUser } = useUserService(); // мой хук на запросы 
  const [valueSearch, setValueSearch] = useState('email'); // выбор типа поиска (только у девайсов)
  const [popup, setPopup] = useState<IPopup>({ visible: false, x: 0, y: 0 });
  
  const isWebDevice = useMediaQuery({
    query: '(min-width: 700px)'
  });

  const getData = useCallback(() => {
      getListUsers()
      .then(users => setDataSource(users))
      .then(() => notification.success({ placement: 'top', duration: 2, ...messages.getUsersSuccess }))
      .catch(() => notification.error({ placement: 'top', duration: 2, ...messages.getUsersError }))
  }, []);

  useEffect(() => {
      getData();
  },[getData]);

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
          .catch(() => {
            setDataSource((pre) => pre.filter((user) => user.id !== record.id));
            notification.success({ placement: 'top', duration: 2, message: messages.deleteUserSuccess.message, description: messages.deleteUserSuccess.description(record.first_name, record.last_name)});
            setPopup({...popup, visible: false})
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
    setPopup({...popup, visible: false})
  };

const onRow = (record: DataType )=> ({
  onContextMenu: (event:React.MouseEvent) => {
    event.preventDefault();
    if (!popup.visible) {
        document.addEventListener(`click`, function onClickOutside() {
          setPopup({...popup, visible: false})
        document.removeEventListener(`click`, onClickOutside)
      })
    }
      setEditingUser({ ...record });
      setPopup({...popup, visible: true, x: event.clientX, y: event.clientY });
    },
})

  return (
    <div className={styles.container} >
      <Popup popup={popup} 
             onEditUser={onEditUser} 
             onDeleteUser={onDeleteUser} 
             editingUser={editingUser}
      /> 
      <Table 
          bordered 
          columns={isWebDevice ? columns({onEditUser, onDeleteUser}) :                  
          deviceColumns({onEditUser, onDeleteUser, onChangeValueSearch, valueSearch} 
          )} 
          dataSource={dataSource}
          onRow={onRow} 
          >
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

