import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from './components/Layout';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Registration from './components/Registration';
import Register from './components/Register';
import Login from './components/Login';
import Logout from './components/Logout';
import RequireAuth from './components/RequireAuth';
import Unauthorized from './components/Unautorized';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>

        {/* public routes */} 
        <Route path="home" element={<Home/>}></Route>
        <Route path="registration" element={<Register/>}></Route>
        <Route path="login" element={<Login/>}></Route>
        <Route path="unauthorized" element={<Unauthorized/>}></Route>

        {/* protected routes */} 
        <Route element={<RequireAuth />}> 
          <Route path="logout" element={<Logout/>}></Route>
        </Route>

      </Route> 
    </Routes>
  );
}

export default App;
