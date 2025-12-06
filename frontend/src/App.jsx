import { Route, Routes } from 'react-router-dom';
import { Home, SignUp, Login } from './Registry';

function App() {
  return (
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/sign-up' element={<SignUp />}/>
      </Routes>
  );
}

export default App
