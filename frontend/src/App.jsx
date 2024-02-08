import { createBrowserRouter,createRoutesFromElements,Route, RouterProvider } from 'react-router-dom';
import Root from './components/Root/Root';
import Signup from './components/Authentication/Signup';
import Login from './components/Authentication/Login';
import Main from './components/Main/Main';
import { useSelector } from 'react-redux';

function App() {
 
  const {status} = useSelector(state=>state.user)
console.log(status)
  const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<Root/>}>
      <Route index element={<Login/>}></Route>
      <Route path="/signup" element={<Signup/>}></Route>
    <Route path="/main" element={<Main/>}></Route>
    </Route>
  ))

  return (
    <>
      <RouterProvider router={router} />    
    </>
  )
}



export default App
