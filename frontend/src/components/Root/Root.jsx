import React from 'react'
import { Outlet } from 'react-router'



function Root() {

  return (
    <div>
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default Root
