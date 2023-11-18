import 'bootstrap/dist/css/bootstrap.min.css';


//Router
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom"

//Hooks
import { useAuth } from './hooks/useAuth'

//Components
import NavBar from './components/navBar/navBar'
import Footer from "./components/footer/footer"

//Pages
import Home from './pages/home/home'
import Login from './pages/auth/login'
import Register from './pages/auth/register'
import EditProfile from './pages/editProfile/editProfile'
import Search from './pages/search/search'
import Employess from './pages/employees/employees';
import RegisterEmployee from './pages/employees/registerEmployee';
import SearchEmployee from './pages/search/search-employee';
import AlterEmployee from './pages/employees/alterEmployee';
import Clients from './pages/clients/clients';
import RegisterClient from './pages/clients/registerClient';
import AlterClient from './pages/clients/alterClient';
import Report from './pages/report/report';


function App() {
  const {auth, loading} = useAuth()

  if(loading){
    return <p>Carregando...</p>
  }

  return (
    <>
      <div className='App'>
        <BrowserRouter>
          <NavBar/>
          <div className='main'>
            <Routes>
              <Route path='/' element={auth ? <Home/> : <Navigate to="/login" />} />
              <Route path='/profile' element={auth ? <EditProfile/> : <Navigate to="/login" />} />
              <Route path='/employees/register' element={auth ? <RegisterEmployee/> : <Navigate to="/login" />} />
              <Route path='/employess' element={auth ? <Employess/> : <Navigate to="/login" />} />
              <Route path='/clients' element={auth ? <Clients/> : <Navigate to="/login" />} />
              <Route path='/clients/register' element={auth ? <RegisterClient/> : <Navigate to="/login" />} />
              <Route path='/clients/:id' element={auth ? <AlterClient/> : <Navigate to="/login" />} />
              <Route path='/search/employees' element={auth ? <SearchEmployee/> : <Navigate to="/login" />} />
              <Route path='/search/' element={auth ? <Search/> : <Navigate to="/login" />} />
              <Route path='/report/' element={auth ? <Report/> : <Navigate to="/login" />} />              
              <Route path='/users/:id' element={auth ? <AlterEmployee/> : <Navigate to="/login" />} />
              <Route path='/login' element={!auth ? <Login/> : <Navigate to="/" />} />
              <Route path='/register' element={!auth ? <Register/> : <Navigate to="/" />}/>
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
