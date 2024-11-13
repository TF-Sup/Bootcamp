import './App.css'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Home from './pages/Home'
import Blackjack from './pages/Blackjack'

function App() {
  const navigate = useNavigate();

  return (
    <>
      <ul>
        <li>
          <button onClick={() => navigate("/")}>Home</button>
        </li>
        <li>
          <button onClick={() => navigate("/blackjack")}>Blackjack</button>
        </li>
      </ul>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blackjack" element={<Blackjack />} />
      </Routes>
    </>
  )
}

export default App