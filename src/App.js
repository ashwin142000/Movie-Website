import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import { AuthContextProvider } from './context/AuthContext';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Account from './pages/Account';
import ProtectedRoute from './components/ProtectedRoute';
import SearchBar from './pages/SearchBar';

function App() {
  return (
    <AuthContextProvider>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/signup' element={<Signup/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/account' element={<ProtectedRoute><Account/></ProtectedRoute> } />
        <Route path='/searchbar' element={<SearchBar/>} />
      </Routes>
    </AuthContextProvider>
  );
}

export default App;
