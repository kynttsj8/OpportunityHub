import { setAllOpportunities } from '@/redux/opportunitySlice';
import { OPPORTUNITY_API_END_POINT } from '@/utils/constant';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios'

const useGetAllOpportunities = () => {
    const dispatch = useDispatch();

    const { searchedQuery } = useSelector(store=>store.opportunity);
    useEffect(() => {
        const fetchAllOpportunities = async () => {
            try {
                const res = await axios.get(`${OPPORTUNITY_API_END_POINT}/get?keyword=${searchedQuery}`, {withCredentials: true});
                if (res.data.success) {
                    dispatch(setAllOpportunities(res.data.opportunities));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllOpportunities();
    }, [])
}

export default useGetAllOpportunities