import React, { useEffect } from 'react'
import Navbar from '../shared/Navbar'
import ApplicantsTable from './ApplicantsTable'
import axios from 'axios'
import { APPLICATION_API_END_POINT } from '@/utils/constant'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setAllApplicants } from '@/redux/applicationSlice'
import Footer from '../shared/Footer'
import InstiBackground from "../../assets/institution_bg.jpg"
import Opportunity from '../Opportunity'
import { Button } from '../ui/button'
import { ArrowLeft } from 'lucide-react'

const Applicants = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { applicants, opportunityTitle } = useSelector(store=>store.application);

    useEffect(() => {
        const fetchAllApplicants = async () => {
            try {
                const res = await axios.get(`${APPLICATION_API_END_POINT}/${params.id}/applicants`, { withCredentials: true });
                console.log(res.data);
                dispatch(setAllApplicants(res.data.opportunity));
            } catch (error) {
                console.log(error);

            }
        }
        fetchAllApplicants();        
    }, []);

    return (
        <div style={{ backgroundImage: `url(${InstiBackground})`, backgroundSize: 'cover' }} >
            <Navbar />
            
            <div className="max-w-7xl mx-auto mb-10 mt-10 bg-gray-100 bg-opacity-70 rounded-3xl">
                <div className="flex items-center justify-between max-w-6xl mx-auto my-5">
                            <Button onClick={() => navigate("/institution/programs")} className='mt-5 rounded-xl  bg-gray-600 text-white hover:text-black'>
                            <ArrowLeft />
                              Previous
                            </Button>
                </div>
                <div className="flex items-center justify-between max-w-6xl mx-auto my-5">
                    <h1 className='text-3xl '>
                        <span className='font-bold text-[#FFA500]'>{opportunityTitle}:</span> 
                        <span > {applicants?.applications?.length}</span> {applicants?.applications?.length <= 1 ? 'applicant' : 'applicants'} 
                    </h1> 
                </div>
                <ApplicantsTable />
            </div>

            <Footer/>
        </div>
    )
}

export default Applicants