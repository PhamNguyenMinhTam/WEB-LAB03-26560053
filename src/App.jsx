import Board from './components/Board.jsx';
import GameStatus from './components/GameStatus.jsx';
import flower from './assets/flower.svg';
import markX from './assets/mark-x.svg';
import markO from './assets/mark-o.svg';

function App() {
    const board = [
        'X', 'O', null,
        null, 'X', null,
        'O', null, null
    ];
    const currentPlayer = 'X';

    return (
        <>
            <div className="scenery" aria-hidden="true">
                <div className="cloud cloud-one" />
                <div className="cloud cloud-two" />
                <div className="garden-sprig sprig-one">
                    <img src={flower} alt="" />
                    <img src={flower} alt="" />
                </div>
                <div className="garden-sprig sprig-two">
                    <img src={flower} alt="" />
                    <img src={flower} alt="" />
                </div>
                <span className="drifting-petal petal-one" />
                <span className="drifting-petal petal-two" />
            </div>

            <main className="garden-card">
                <header>
                    <p className="eyebrow">A POCKET-SIZED PIXEL GARDEN</p>
                    <div className="header-flower"><img src={flower} alt="" /></div>
                    <h1>Bloom <span>&amp;</span> Play</h1>
                    <p className="subtitle">A little garden of X's and O's</p>
                    <div className="separator" aria-hidden="true"><span /><i /><span /></div>
                </header>

                <section className="scoreboard" aria-label="Sample scoreboard">
                    <div className="score score-x">
                        <img className="score-icon" src={markX} alt="" />
                        <span>Player X</span><strong>0</strong><small>STRAWBERRY BLOSSOM</small>
                    </div>
                    <div className="score score-draw">
                        <div className="pixel-star" aria-hidden="true" />
                        <span>Draws</span><strong>0</strong><small>A SHARED BLOOM</small>
                    </div>
                    <div className="score score-o">
                        <img className="score-icon" src={markO} alt="" />
                        <span>Player O</span><strong>0</strong><small>BLUEBERRY BLOOM</small>
                    </div>
                </section>

                <GameStatus currentPlayer={currentPlayer} />
                <Board board={board} />

                <p className="preview-note">Board preview · New rounds and audio are unavailable.</p>
                <button className="pixel-button" type="button" disabled>
                    <span className="button-flower"><img src={flower} alt="" /></span>
                    New Round
                </button>

                <footer lang="vi">Phạm Nguyễn Minh Tâm | 26560053</footer>
            </main>
        </>
    );
}

export default App;
