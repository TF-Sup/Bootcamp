export default function PlayerRow({ player }) {
    return (<tr><th scope="row">{player.name}</th><td>{player.score}</td></tr>)
}
export default function Row({ player }) {
    return (
        <tr>
            <td>{player.id}</td>
            <td>{player.score}</td>
            <td>{player.name}</td>
        </tr>
    )
}