// GameControls Component
// Handles timer, pause/resume, next/prev
export function GameControls({ onPause, onResume, onNext, onPrev, isPaused, timeLeft }) {
    const handlePauseClick = () => {
        if (isPaused) {
            onResume();
        } else {
            onPause();
        }
    };

    return (
        <div className="game-controls neon-card">
            <div className="timer-label">
                ⏰ Time Left: <span className="timer-value">{timeLeft}s</span>
            </div>
            <div className="game-btn-row">
                <button
                    onClick={handlePauseClick}
                    className={`quiz-btn ${isPaused ? 'api-btn' : 'start-btn'}`}
                >
                    {isPaused ? 'Resume' : 'Pause'}
                </button>
                <button className="quiz-btn" onClick={onPrev}>
                    Previous
                </button>
                <button className="quiz-btn" onClick={onNext}>
                    Next
                </button>
            </div>
        </div>
    );
}