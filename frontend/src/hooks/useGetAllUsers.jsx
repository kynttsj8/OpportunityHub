import { USER_API_END_POINT } from '@/utils/constant';
import { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import axios from 'axios'
import { setUsers } from '@/redux/authSlice';

const useGetAllUsers = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await axios.get(`${USER_API_END_POINT}/get`, {withCredentials: true});
                if (res.data.success) {
                    dispatch(setUsers(res.data.users));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchUsers();
    }, [])
}

export default useGetAllUsers