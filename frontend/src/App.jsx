import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css'
import PlayerForm from './components/PlayerForm';
import GamePage from './components/GamePage';

function App() {
      const [players, setPlayers] = useState([]);
      const [diceCount, setDiceCount ] = useState(1);
    
      return (
          <Routes>
            <Route path="/" element={<PlayerForm setPlayers={setPlayers} setDiceCount={setDiceCount} />} />
            <Route path="/game:id" element={<GamePage players={players} diceCount={diceCount} />} />
          </Routes>
      );
    }

export default App