import { SnackbarProvider } from 'notistack';
import AuthProvider from './utils/AuthContext/context';
import RecipeProvider from './utils/RecipeContext/context';
import Navbar from './components/Navbar';
import Router from './Router';

function App() {
  return (
    <div className='App'>
      <SnackbarProvider>
        <RecipeProvider>
          <AuthProvider>
            <Navbar />
            <Router />
          </AuthProvider>
        </RecipeProvider>
      </SnackbarProvider>
    </div>
  );
}

export default App;
