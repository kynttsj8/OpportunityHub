import { APPLICATION_API_END_POINT } from '@/utils/constant';
import { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import axios from 'axios'
import { setApplications } from '@/redux/applicationSlice';

const useGetAllApplications = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const res = await axios.get(`${APPLICATION_API_END_POINT}/getAllApplications`, {withCredentials: true});
                if (res.data.success) {
                    dispatch(setApplications(res.data.applications));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchApplications();
    }, [])
}

export default useGetAllApplications