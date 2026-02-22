import { Routes, Route } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import GameDetails from './pages/GameDetails'
import Guides from './pages/Guides'
import GuideDetails from './pages/GuideDetails'
import Anecdotes from './pages/Anecdotes'
import Polls from './pages/Polls'
import Login from './pages/Login'
import Signup from './pages/Signup'
import './App.css'

function App() {
  return (
    <div className='content'>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/anecdotes" element={<Anecdotes />} />
        <Route path="/games/:id" element={<GameDetails />} />
        <Route path="/guides" element={<Guides />} />
        <Route path="/guides/:id" element={<GuideDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/sondages" element={
          <ProtectedRoute>
            <Polls/>
          </ProtectedRoute>
        }
        />
      </Routes>
    </div>
  );
}

export default App