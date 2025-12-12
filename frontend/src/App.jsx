import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Main, SignUp, Login } from './Registry';
import { Dashboard, Search } from './Registry';

function App() {
  return (
      <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route element={<Main />}>
            <Route path='/' element={<Dashboard />} />
            <Route path='/search' element={<Search />} />
          </Route>
      </Routes>
  );
}

export default App
