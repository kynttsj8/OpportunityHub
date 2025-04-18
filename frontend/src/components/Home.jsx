import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import Footer from './shared/Footer'
import DefaultPage from './DefaultPage'
import CategorySection from './CategorySection'
import LatestOppor from './LatestOppor'
import useGetAllOpportunities from '@/hooks/useGetAllOpportunities'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import HomeBackground from "../assets/home_bg.jpg"

const Home = () => {
  useGetAllOpportunities();
  const {user} = useSelector(store=>store.auth);
  const navigate = useNavigate();
  useEffect(()=> {
    if(user?.role === 'institution') {
      navigate("/institution/units");
    }
  }, []);
  return (
    <div style={{ backgroundImage: `url(${HomeBackground})`, backgroundSize: 'cover' }}>
        
        <Navbar/>
        <DefaultPage/>
        <CategorySection/>
        <LatestOppor/>
        <Footer/>
    </div>
  )
}

export default Home