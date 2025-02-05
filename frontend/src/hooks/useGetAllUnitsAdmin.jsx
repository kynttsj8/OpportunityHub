import { UNIT_API_END_POINT } from '@/utils/constant';
import { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import axios from 'axios'
import { setAllUnits } from '@/redux/unitSlice';

const useGetAllUnitsAdmin = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchAllUnits = async () => {
            try {
                const res = await axios.get(`${UNIT_API_END_POINT}/getAllUnits`, {withCredentials: true});
                if (res.data.success) {
                    dispatch(setAllUnits(res.data.allUnits));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllUnits();
    }, [])
}

export default useGetAllUnitsAdmin