import React from 'react'
import { Provider } from 'react-redux'
import { Outlet } from 'react-router'
import store from '../../redux/store'
import Navbar from '../Navbar/Navbar'

function Root() {
  return (
    <div>
      <Provider store={store}>
      <Navbar />
      <main>
        <Outlet />
      </main>
      </Provider>
    </div>
  )
}

export default Root
