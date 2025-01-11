import { OPPORTUNITY_API_END_POINT } from '@/utils/constant';
import { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import axios from 'axios'
import { setSingleOpportunity } from '@/redux/opportunitySlice';

const useGetOpportunityById = (opportunityId) => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchSingleOpportunity = async () => {
            try {
                const res = await axios.get(`${OPPORTUNITY_API_END_POINT}/get/${opportunityId}`, {withCredentials: true});
                if (res.data.success) {
                    dispatch(setSingleOpportunity(res.data.opportunity));
                }
            } catch (error) {
                console.log(error);
            }
        }
        if (opportunityId) {
            fetchSingleOpportunity();
        }
    }, [opportunityId, dispatch])
}

export default useGetOpportunityById