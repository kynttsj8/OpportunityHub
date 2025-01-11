import { UNIT_API_END_POINT } from '@/utils/constant';
import { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import axios from 'axios'
import { setSingleUnit } from '@/redux/unitSlice';

const useGetUnitById = (unitId) => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchSingleUnit = async () => {
            try {
                const res = await axios.get(`${UNIT_API_END_POINT}/get/${unitId}`, {withCredentials: true});
                if (res.data.success) {
                    dispatch(setSingleUnit(res.data.unit));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchSingleUnit();
    }, [unitId, dispatch])
}

export default useGetUnitById