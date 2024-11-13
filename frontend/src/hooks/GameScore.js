export default function useChangeScore() {
    const changeScore = (score, id) => {
        return fetch("http://localhost:8000/apiGame/change_score?player_id="+id, {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "score": score
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

    return { changeScore };
}