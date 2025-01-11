import { setAllAppliedOpportunities } from "@/redux/opportunitySlice";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

const useGetAppliedOpportunities = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchAppliedOpportunities = async () => {
            try {
                const res = await axios.get(`${APPLICATION_API_END_POINT}/get`, {withCredentials: true});
                console.log(res.data);
                
                if (res.data.success) {
                    dispatch(setAllAppliedOpportunities(res.data.application));
                }
            } catch (error) {
                console.log(error);
                // toast.error(error.response.data.message);
            }
        }
        fetchAppliedOpportunities();
    })
};

export default useGetAppliedOpportunities;