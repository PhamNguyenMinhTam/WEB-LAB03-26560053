import markX from '../assets/mark-x.svg';
import markO from '../assets/mark-o.svg';

const marks = { X: markX, O: markO };

function Cell({ value, index }) {
    const row = Math.floor(index / 3) + 1;
    const column = index % 3 + 1;
    const className = value ? `cell player-${value.toLowerCase()}` : 'cell';

    return (
        <div className={className} role="img" aria-label={`Row ${row}, column ${column}: ${value ?? 'empty'}`}>
            {value && <img className="floral-mark" src={marks[value]} alt="" />}
        </div>
    );
}

export default Cell;
