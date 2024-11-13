import { useLocation } from "react-router-dom";
import { useState } from "react";
import PlayerRow from "../components/PlayerRow";
import useGetWinners from "../hooks/useGetWinners";
import useChangeScore from "../hooks/useChangeScore"

export default function Blackjack() {
    let location = useLocation();
    const [players, setPlayers] = useState(location.state.result.players);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [diceAmount, setdiceAmount] = useState(1);
    const [playerThatPlay, setTextPlayerName] = useState(players[0].name);
    const [turn, setTurn] = useState(0);
    const [score, setScore] = useState(0);
    const { getWinners } = useGetWinners();
    const { changeScore } = useChangeScore();


    const endTurn = (results) => {

        if (Number.isInteger(results)) {
            players[turn].score = score + results;
        } else {
            players[turn].score = score;
        }
        changeScore(players[turn].score, players[turn].id)

        if (players[turn + 1] != undefined) {
            setTextPlayerName(players[turn + 1].name);
            setTurn(turn + 1)
        } else {
            console.log("fin")
            getWinners(location.state.result.id)
                .then((result) => {
                    console.log(result);
                })
                .catch((error) => {
                    console.error("Game creation failed:", error);
                });
        }

        setScore(0)

    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleDiceSelection = (amount) => {
        setdiceAmount(amount);
        setDropdownOpen();
    };

    const handleDiceThrow = () => {
        let results = 0;
        for (let i = 0; i < diceAmount; i++) {
            const roll = Math.floor(Math.random() * 6) + 1;
            results = results + roll;
        }
        setScore(score + results)
        if ((score + results) > 21) {
            endTurn();
        }
    };

    const changeText = () => {
        if ((turn + 1) <= players.length) {
            players[turn].score = score;
            setScore(0);
            setTextPlayerName(players[turn].name);
            setTurn(turn + 1)
        }
    };

    return <>
        <h1 >Joueur actuel : {playerThatPlay}</h1>
        <h1 >Score : {score}</h1>
        <button onClick={changeText}>Finir le Tour</button>
        <div className="dropdown">
            <button onClick={toggleDropdown} className="dropbtn">Choix des dés</button>
            {dropdownOpen && (
                <div className="dropdown-content">
                    <button onClick={() => handleDiceSelection(1)}>1 Dé</button>
                    <button onClick={() => handleDiceSelection(2)}>2 Dés</button>
                    <button onClick={() => handleDiceSelection(3)}>3 Dés</button>
                </div>
            )}
        </div>
        <p>{diceAmount} {diceAmount === 1 ? "dé sélectionné" : "dés sélectionnés"}</p>
        <button onClick={handleDiceThrow}>Lancer les dés</button>
        <table>
            <caption>
                Player
            </caption>
            <thead>
                <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Score</th>
                </tr>
            </thead>
            <tbody>
                {players.map((player) => (
                    <PlayerRow key={player.id} player={player} />
                ))}
            </tbody>
        </table>
    </>
}