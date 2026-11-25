import Cell from './Cell.jsx';

function Board({ board }) {
    return (
        <div className="board" role="group" aria-label="Tic-Tac-Toe board">
            {board.map((value, index) => (
                <Cell key={index} value={value} index={index} />
            ))}
        </div>
    );
}

export default Board;
