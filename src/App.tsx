import Navbar from './components/Navbar'
import { AuthProvider } from './contexts/AuthProvider'
import { AppRouter } from './router/AppRouter'


function App() {

  return (
    <AuthProvider>
      <div className="App">
        <Navbar/>
        <AppRouter/>
      </div>
    </AuthProvider>
  )
}

export default App;
