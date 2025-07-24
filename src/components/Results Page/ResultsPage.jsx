export function ResultsPage({ score, total, wrongAnswers, onRestart }) {
    return (
        <div className="results-page neon-card">
            <h2 className="game-title">Quiz Results</h2>
            <p className="score-label">
                Your Score: <span>{score} / {total}</span>
            </p>
            <h3 style={{ color: '#43e97b', marginTop: '1.5em' }}>Review Wrong Answers</h3>
            <ul className="wrong-list">
                {wrongAnswers.length === 0 ? (
                    <li style={{ color: '#00eaff'}}>Perfect! No wrong answers.</li>
                ) : (
                    wrongAnswers.map((w, index) => (
                        <li key={index} className="wrong-item">
                            <strong style={{ color: '#ff1744' }}>Q:</strong> {w.question}<br />
                            <span style={{ color: '#ff8a65' }}>
                                <strong>Your answer:</strong> {w.userAnswer}
                            </span><br />
                            <span style={{ color: '#43e97b' }}>
                                <strong>Correct answer:</strong> {w.correctAnswer}
                            </span>
                        </li>
                    ))
                )}
            </ul>
            <div className="game-btn-row">
                <button onClick={onRestart} className="quiz-btn start-btn">
                    Restart
                </button>
            </div>
        </div>
    );
}