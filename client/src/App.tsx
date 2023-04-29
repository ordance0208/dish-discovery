import Navbar from './components/Navbar';
import Router from './Router';
import AuthProvider from './utils/AuthContext/context';

function App() {
  return (
    <div className='App'>
      <AuthProvider>
        <Navbar />
        <Router />
      </AuthProvider>
    </div>
  );
}

export default App;
