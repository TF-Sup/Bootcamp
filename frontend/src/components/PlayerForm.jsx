import Row from "./PlayerRow"

export default function TablePlayers({ players }) {
    return (
        <div className="App">
            <table>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>score</th>
                        <th>name</th>
                    </tr>
                </thead>
                <tbody>
                    {players?.map(player => (
                        <Row key={player.id} player={player} />
                    ))}
                </tbody>       
            </table>
        </div>
    )
}