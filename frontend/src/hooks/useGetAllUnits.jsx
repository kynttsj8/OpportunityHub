import { UNIT_API_END_POINT } from '@/utils/constant';
import { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import axios from 'axios'
import { setUnits } from '@/redux/unitSlice';

const useGetAllUnits = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchUnits = async () => {
            try {
                const res = await axios.get(`${UNIT_API_END_POINT}/get`, {withCredentials: true});
                if (res.data.success) {
                    dispatch(setUnits(res.data.units));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchUnits();
    }, [])
}

export default useGetAllUnits