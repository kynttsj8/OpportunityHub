import { setAllInstiOpportunities } from '@/redux/opportunitySlice';
import { OPPORTUNITY_API_END_POINT } from '@/utils/constant';
import { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import axios from 'axios'

const useGetAllInstiOpportunities = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchAllInstiOpportunities = async () => {
            try {
                const res = await axios.get(`${OPPORTUNITY_API_END_POINT}/getadminopportunity`, {withCredentials: true});
                if (res.data.success) {
                    dispatch(setAllInstiOpportunities(res.data.opportunities));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllInstiOpportunities();
    }, [])
}

export default useGetAllInstiOpportunities