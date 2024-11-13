export default function useCreateGame() {
    const createGame = (players, gameName) => {
        return fetch("http://localhost:8000/apiGame/create_game", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                game_name: gameName,
                players: players,
            }),
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            console.log("Game created:", data);
            return data;
        })
        .catch((error) => {
            console.error("Fetch error:", error);
            throw error;
        });
    };

    return { createGame };
}