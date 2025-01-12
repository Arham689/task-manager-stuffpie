
import './App.css'
import { BrowserRouter , Route , Routes  } from 'react-router-dom'
import Home from './pages/Home'
import Signup from './pages/Singup'
import DashBoard from './pages/DashBoard'

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/signup' element={<Signup/> }/>
        <Route path='/dashboard' element={<DashBoard/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
