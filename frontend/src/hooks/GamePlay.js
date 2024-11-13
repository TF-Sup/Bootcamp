import { useEffect, useState } from "react";

function usePlayGame(game_id) {
    const [game_data, setGameData] = useState({});

    // Define the getGame function to retrieve the game data based on game_id
    const getGame = async (id) => {
        try {
            const response = await fetch(`/api/games/${id}`);
            if (response.ok) {
                const data = await response.json();
                setGameData(data);
            } else {
                console.error("Failed to fetch game data");
            }
        } catch (error) {
            console.error("Error fetching game data:", error);
        }
    };

    useEffect(() => {
        if (game_id) {
            getGame(game_id);
        }
    }, [game_id, getGame]); 

    return game_data;
}

export default usePlayGame;