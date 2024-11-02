import { DataType } from "@/shared/intefaces/interfaces";
import { useHttp } from "@/hooks/http.hook";
import hasRequiredFields from "@/utils/hasRequiredFields";

const requiredFields = ['id', 'email', 'first_name', 'last_name', 'avatar'];

const useUserService = () => {
    const { loadingStatus, request } = useHttp();
    const _apiBase = process.env.REACT_APP_API_URL || '';

    const getListUsers = async (): Promise<DataType[]> => {
        const res = await request({ url: _apiBase });
        if (res.data.every((item: DataType) => hasRequiredFields(item, requiredFields))) {
            return res.data.map((item:DataType) => {
                Reflect.deleteProperty(item, 'avatar');
                item.key = item.id;
                return item;
            });
        } else {
            throw new Error('Data doesnt have all the fields')
        }
    }

    const deleteUser = async (id: number) => {
        return await request({
            url: `${_apiBase}/${id}`,
            method: "DELETE",
        });
    }

    return {
        loadingStatus, getListUsers, deleteUser,
    }
}
export default useUserService;

