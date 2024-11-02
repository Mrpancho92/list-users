import { Input } from "antd";
import {IModalInput} from '@/shared/intefaces/interfaces';

export const ModalInput = ({field, setEditingUser}: IModalInput) => {
    return (
        <Input
            value={field}
            onChange={(e) => {
                setEditingUser((pre) => {
                    return { ...pre, field: e.target.value };
                });
            }}
        />
    )
}
