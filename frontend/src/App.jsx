import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Home from './components/Home'
import Programs from './components/Opportunities'
import Browse from './components/Browse'
import Profile from './components/Profile'
import Units from './components/institution/Units'
import ProgramDescription from './components/OpportunityDescription'
import UnitCreate from './components/institution/UnitCreate'
import UnitSetup from './components/institution/UnitSetup'
import InstiOpportunities from './components/institution/InstiOpportunities'
import PostOpportunity from './components/institution/PostOpportunity'
import Applicants from './components/institution/Applicants'
import ProtectedRoute from './components/institution/ProtectedRoute'
import UpdateOpportunity from './components/institution/UpdateOpportunity'
import ProfileInstitution from './components/institution/ProfileInstitution'
import Dashboard from './components/admin/dashboardPage/Dashboard'
import UsersManagement from './components/admin/usersManagement/UsersManagement'
import UnitsManagement from './components/admin/unitsManagement/UnitsManagement'
import ProgramsManagement from './components/admin/programsManagement/ProgramsManagement'
import ApplicationsManagement from './components/admin/applicationsManagement/ApplicationsManagement'
import ProgramsAdminDetails from './components/admin/programsManagement/ProgramsAdminDetails'

const appRouter = createBrowserRouter([
  {
    path: '/',
    element:<Home/>
  },
  {
    path: '/login',
    element:<Login/>
  },
  {
    path: '/signup',
    element:<Signup/>
  },
  {
    path: '/programs',
    element:<Programs/>
  },
  {
    path: '/description/:id',
    element:<ProgramDescription/>
  },
  {
    path: '/browse',
    element:<Browse/>
  },
  {
    path: '/profile',
    element:<Profile/>
  },
  // institution representative
  {
    path: '/institution/dashboard',
    element: <ProtectedRoute><ProfileInstitution/></ProtectedRoute>
  },
  {
    path: '/institution/units',
    element: <ProtectedRoute><Units/></ProtectedRoute>
  },
  {
    path: '/institution/units/create',
    element: <ProtectedRoute><UnitCreate/></ProtectedRoute>
  },
  {
    path: '/institution/units/:id',
    element:<ProtectedRoute><UnitSetup/></ProtectedRoute>
  },
  {
    path: '/institution/programs',
    element:<ProtectedRoute><InstiOpportunities/></ProtectedRoute>
  },
  {
    path: '/institution/opportunity/post',
    element:<ProtectedRoute><PostOpportunity/></ProtectedRoute>
  },
  {
    path: '/institution/programs/:id/applicants',
    element:<ProtectedRoute><Applicants/></ProtectedRoute>
  },
  {
    path: '/institution/programs/:id/update',
    element:<ProtectedRoute><UpdateOpportunity/></ProtectedRoute>
  },

  // Admin
  {
    path: '/admin/dashboard',
    element: <Dashboard/>
  },
  {
    path: '/admin/users',
    element: <UsersManagement/>
  },
  {
    path: '/admin/units',
    element: <UnitsManagement/>
  },
  {
    path: '/admin/programs',
    element: <ProgramsManagement/>
  },
  {
    path: '/admin/applications',
    element: <ApplicationsManagement/>
  },
  {
    path: '/details/:id',
    element:<ProgramsAdminDetails/>
  },
])

function App() {

  return (
    <>
      <RouterProvider router = {appRouter}/>
    </>
  )
}

export default App
