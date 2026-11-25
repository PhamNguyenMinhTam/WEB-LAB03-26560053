function GameStatus({ currentPlayer }) {
    return (
        <p id="status" className="game-status" data-player={currentPlayer}>
            Player {currentPlayer}'s turn
        </p>
    );
}

export default GameStatus;
