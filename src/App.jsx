import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { Route, Routes } from 'react-router-dom';
import Auth from './pages/Auth';
import FeedbackForm from './pages/FeedbackForm';
import AdminDashboard from './pages/AdminDashboard';
import Home from './pages/Home';

function App() {

  return (
    <>
     <Routes>
      <Route path='/' element={<Home/>}/>
<Route path='/auth' element={<Auth/>}/>
<Route path='/feedback' element={<FeedbackForm/>}/>
<Route path='/admin' element={<AdminDashboard />}/>
     </Routes>
    </>
  )
}

export default App
