import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from './components/Layout';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="home" element={<Home/>}></Route>
      </Route> 
    </Routes>
  );
}

export default App;
