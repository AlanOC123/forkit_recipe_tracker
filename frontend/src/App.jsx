import './App.css'
import { useAuth } from './context/AuthContext';
import { Login } from './pages/Login'

function App() {
  const { user, isLoading, logoutUser } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (user) {
    return (
        <>
            <h1>Hello {user.username}!</h1>
            <button onClick={() => logoutUser()}>Logout</button>
        </>
    );
  }

  return (
      <Login />
  );
}

export default App
