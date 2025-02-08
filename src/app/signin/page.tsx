"use client"
import SignIn from '@/components/signin'
import React from 'react'
import { BrowserRouter } from "react-router-dom";
const page = () => {
  return (
    <div>
      <BrowserRouter>
      <SignIn />
    </BrowserRouter>
    </div>
  )
}

export default page
