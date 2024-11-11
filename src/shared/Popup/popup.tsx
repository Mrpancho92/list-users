import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { DataType, IPopup } from "@/shared/intefaces/interfaces";
import './popup.scss';

interface IPopupProps {
   popup: IPopup | any;
   onEditUser: (record: DataType) => void; 
   onDeleteUser: (record: DataType) => void; 
   editingUser: DataType;
}

const Popup = ({popup, onEditUser, onDeleteUser, editingUser}:IPopupProps) => popup.visible &&
  <ul className="popup" style={{left: `${popup.x}px`, top: `${popup.y}px`}} >
    <li onClick={() => onEditUser(editingUser)}>
      <EditOutlined style={{ marginRight: 5 }}/>
      Edid
    </li>
    <li onClick={() => onDeleteUser(editingUser)}>
      <DeleteOutlined style={{ color: "red", marginRight: 5 }}/>
      Delite
    </li>
  </ul>

export default Popup;