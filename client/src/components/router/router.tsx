import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router'
import Layout from '../layout/layout'
import Login from '../../pages/login'
import Registration from '../../pages/registration'
import NotFound from '../../pages/notFound'
import Main from '../../pages/main'

import { useAuthRedirect } from '../../hooks/useAuthRedirect/useAuthRedirect'

export default function Router() {
  useAuthRedirect()
  
  return (
    <>
      <Routes> 
        <Route path="/login" element={<Login />} />
        <Route path='/registration' element={<Registration />} />
        <Route element={<Layout />}>
          <Route index element={<Main />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}
