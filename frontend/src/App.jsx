import { useAuth } from './context/AuthContext';
import { DefaultButton, ToggleButton } from './components/Button/Button';

function App() {

  return (
      <>
          <DefaultButton variant={"elevated"}>Login</DefaultButton>
          <ToggleButton variant={"elevated"}>Logout</ToggleButton>
          <DefaultButton variant={"filled"}>Do Something</DefaultButton>
          <ToggleButton variant={"filled"}>Do Something Else</ToggleButton>
          <DefaultButton variant={"tonal"}>Do Something</DefaultButton>
          <ToggleButton variant={"tonal"}>Do Something Else</ToggleButton>
      </>
  );
}

export default App
