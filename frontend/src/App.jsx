import { useState } from 'react'
import './App.css'
import {Login, Action as action} from './pages/Login'
import SideNavLayout from './components/SideNavLayout'
import {Settings, action as actionSettings} from './pages/SME/Settings'
import {Compliance, uploadDocumentAction} from './pages/SME/Compliance'
import Dashboard from './pages/SME/Dashboard'
import DiagnosticRoadmap from './pages/SME/DiagnosticRoadmap'
import LearningHub from './pages/SME/LearningHub'
import Funding from './pages/SME/Funding'
import Coaching from './pages/SME/Coaching'
import CoachLebo from './pages/SME/CoachLebo'
import Reporting from './pages/SME/Reporting'
import ProtectedLayout from './components/ProtectedLayout'

import AdminLayout from './components/AdminLayout'
import AdminDashboard from './pages/Admin/AdminDashboard'
import { SmeManagement, action as smeAction } from './pages/Admin/SmeManagement'
import FundingPipeline from './pages/Admin/FundingPipeline'
import Alerts from './pages/Admin/Alerts'
import Reports from './pages/Admin/Reports'
import AdminSettings from './pages/Admin/AdminSettings'

import { 
  RouterProvider, 
  Route, 
  createBrowserRouter, 
  createRoutesFromElements 
} from "react-router-dom"


function App() {

  const router = createBrowserRouter(createRoutesFromElements(
    <>
      {/* public route */}
      <Route path='/login' element={<Login/>} action={action}/>
      <Route path='/' element={<Login/>} action={action}/>

      {/* SME Routing */}
      <Route element={<ProtectedLayout allowedRoles={['user']}/>}>
          <Route path="/sme" element={<SideNavLayout/>}>
            <Route index element={<Dashboard/>}/>
            <Route path='settings' element={<Settings/>} action={actionSettings}/>
            <Route path='compliance' element={<Compliance/>} action={uploadDocumentAction} />
            <Route path='diagnosticRoadmap' element={<DiagnosticRoadmap/>}/>
            <Route path='learningHub' element={<LearningHub/>}/>
            <Route path='funding' element={<Funding/>}/>
            <Route path='coaching' element={<Coaching/>}/>
            <Route path='coachLebo' element={<CoachLebo/>}/>
            <Route path='reporting' element={<Reporting/>}/>
          </Route>
      </Route>

      {/* Admin Routing */}
      <Route element={<ProtectedLayout allowedRoles={['admin']} />}>
          <Route path='/admin' element={<AdminLayout/>}>
            <Route index element={<AdminDashboard />}/>
            <Route path='sme-management' element={<SmeManagement />} action={smeAction}/>
            <Route path='funding-pipeline' element={<FundingPipeline />}/>
            <Route path='alerts' element={<Alerts />}/>
            <Route path='reports' element={<Reports />}/>
            <Route path='admin-settings' element={<AdminSettings />}/>
          </Route>
      </Route>
    </>
  ))

  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
