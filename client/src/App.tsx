import Navbar from './components/Navbar';
import Router from './Router';
import AuthProvider from './utils/AuthContext/context';
import RecipeProvider from './utils/RecipeContext/context';

function App() {
  return (
    <div className='App'>
      <RecipeProvider>
        <AuthProvider>
          <Navbar />
          <Router />
        </AuthProvider>
      </RecipeProvider>
    </div>
  );
}

export default App;
