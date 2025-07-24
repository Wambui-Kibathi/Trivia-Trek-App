// Fetches questions from the Open Trivia DB API and maps them to the app's format
export async function fetchApiQuestions() {
    const response = await fetch('https://opentdb.com/api.php?amount=10&type=multiple');
    const data = await response.json();
    return data.results.map(q => ({
        text: q.question,
        choices: shuffle([q.correct_answer, ...q.incorrect_answers]),
        answer: ([q.correct_answer, ...q.incorrect_answers].indexOf(q.correct_answer)),
        category: q.category,
        level: q.difficulty.charAt(0).toUpperCase() + q.difficulty.slice(1)
    }));
}

// Helper to shuffle choices
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}