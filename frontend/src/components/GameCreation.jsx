import { useState } from 'react';
import useCreateGame from "../hooks/GamePage";
import { useNavigate } from "react-router-dom";

export default function GameCreation(){
    const navigate = useNavigate();
    const { createGame } = useCreateGame()
    const [newName, setNewName] = useState('');
    const [gameName, setGameName] = useState('');
    const [players, setPlayers] = useState([]);

    const handleAddPlayer = () => {
        if (newName.trim()) {
            setPlayers([...players, newName]);
            setNewName('');
        }
    };

    const handleCreateGame = () => {
        createGame(players, gameName)
            .then((result) => {
                navigate("/blackjack", { state: {result} });
            })
            .catch((error) => {
                console.error("Game creation failed:", error);
            });
    };

    return (
        <div>
            <h2>Nom de la partie</h2>
            <input
                type="text"
                placeholder="Entrer le nom de la partie"
                value={gameName}
                onChange={(e) => setGameName(e.target.value)}
            />

            <h3>Liste des joueurs</h3>
            <input
                type="text"
                placeholder="Entrer le nom du joueur"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
            />
            
            <button onClick={handleAddPlayer}>Ajouter un joueur</button>
            <ul>
                {players.map((player, index) => (
                    <li key={index}>
                        {player}
                    </li>
                ))}
            </ul>
            <button onClick={handleCreateGame}>create game</button>
        </div>
    );
};