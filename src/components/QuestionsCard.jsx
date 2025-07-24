
// API questions data
const apiQuestionsRaw = [
  {
    type: 'multiple',
    difficulty: 'hard',
    category: 'General Knowledge',
    question: 'Originally another word for poppy, coquelicot is a shade of what?',
    correct_answer: 'Red',
    incorrect_answers: ['Green', 'Blue', 'Pink'],
  },
  {
    type: 'multiple',
    difficulty: 'medium',
    category: 'History',
    question: 'After his loss at the Battle of Waterloo, Napoleon Bonaparte was exiled to which island?',
    correct_answer: 'St. Helena',
    incorrect_answers: ['Elba', 'Corsica', 'Canary'],
  },
  {
    type: 'multiple',
    difficulty: 'hard',
    category: 'Entertainment: Television',
    question: 'In "It\'s Always Sunny in Philadelphia" what was the name of Frank\'s wrestling persona?',
    correct_answer: 'The Trash Man',
    incorrect_answers: ['Bird of War', 'Day Man', 'The Maniac'],
  },
  {
    type: 'multiple',
    difficulty: 'easy',
    category: 'Entertainment: Video Games',
    question: 'How many obsidian blocks are required to build a nether portal in Minecraft?',
    correct_answer: '10',
    incorrect_answers: ['14', '13', '16'],
  },
  {
    type: 'multiple',
    difficulty: 'medium',
    category: 'Entertainment: Music',
    question: 'Which song by Swedish electronic musician Avicii samples the song "Something\'s Got A Hold On Me" by Etta James?',
    correct_answer: 'Levels',
    incorrect_answers: ['Fade Into Darkness', 'Silhouettes', 'Seek Bromance'],
  },
  {
    type: 'boolean',
    difficulty: 'medium',
    category: 'Science & Nature',
    question: 'The most frequent subconscious activity repeated by the human body is blinking.',
    correct_answer: 'False',
    incorrect_answers: ['True'],
  },
  {
    type: 'multiple',
    difficulty: 'medium',
    category: 'Entertainment: Music',
    question: 'Which of these artists do NOT originate from France?',
    correct_answer: 'The Chemical Brothers',
    incorrect_answers: ['Air', 'Justice', 'Daft Punk'],
  },
  {
    type: 'multiple',
    difficulty: 'easy',
    category: 'Politics',
    question: 'Which former US president was nicknamed "Teddy" after he refused to shoot a defenseless black bear?',
    correct_answer: 'Theodore Roosevelt',
    incorrect_answers: ['Woodrow Wilson', 'James F. Fielder', 'Andrew Jackson'],
  },
  {
    type: 'multiple',
    difficulty: 'medium',
    category: 'Geography',
    question: 'Kuala Lumpur is the capital of which country?',
    correct_answer: 'Malaysia',
    incorrect_answers: ['Indonesia', 'Singapore', 'Thailand'],
  },
  {
    type: 'multiple',
    difficulty: 'medium',
    category: 'History',
    question: 'Against which country did the Dutch Republic fight the Eighty Years\' War?',
    correct_answer: 'Spain',
    incorrect_answers: ['France', 'England', 'Portugal'],
  },
];

// Map API questions to the app's structure
const apiQuestions = apiQuestionsRaw.map(q => {
  const allChoices = [q.correct_answer, ...q.incorrect_answers];
  const shuffledChoices = allChoices.sort(() => Math.random() - 0.5);
  return {
    text: q.question, // mapped as text for consistent display
    choices: shuffledChoices,
    answer: shuffledChoices.indexOf(q.correct_answer),
    category: q.category,
    level: q.difficulty.charAt(0).toUpperCase() + q.difficulty.slice(1),
  };
});

export default function QuestionsCard({ quiz, onBack, onAnswer }) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);

  if (!quiz) return null;

  // Filter questions by quiz category
  const filteredQuestions = apiQuestions.filter(q =>
    q.category === quiz.title || q.category === quiz.title.replace('&', '&amp;')
  );
  const questionsToUse = filteredQuestions.length > 0 ? filteredQuestions : apiQuestions;
  const q = questionsToUse[current];
  if (!q) return <div>No questions available for this quiz.</div>;

  const options = q.choices;

  function handleOption(option) {
    const answerIndex = options.indexOf(option);
    setSelected(answerIndex);
    setShowAnswer(true);
    if (typeof onAnswer === 'function') {
      onAnswer(answerIndex); // send selected answer index to parent if needed
    }
  }

  function handleNext() {
    setSelected(null);
    setShowAnswer(false);
    setCurrent(prev => prev + 1);
  }

  return (
    <div className="questions-card">
      <button onClick={onBack}>Back to Quiz List</button>
      <h3>{quiz.title}</h3>
      <div>
        {/* display q.text instead of q.question, as your mapped data uses text */}
        <p dangerouslySetInnerHTML={{ __html: q.text }} />
        <ul>
          {options.map((opt, idx) => (
            <li key={opt}>
              <button
                disabled={showAnswer}
                onClick={() => handleOption(opt)}
                style={{
                  background: showAnswer && idx === q.answer ? '#aaffaa' : '',
                  border: selected === idx ? '2px solid #333' : '',
                }}
                dangerouslySetInnerHTML={{ __html: opt }}
              />
            </li>
          ))}
        </ul>
        {showAnswer && (
          <div>
            {selected === q.answer ? (
              'Correct!'
            ) : (
              `Wrong! Correct answer: ${options[q.answer]}`
            )}
            {current < questionsToUse.length - 1 ? (
              <button onClick={handleNext}>Next Question</button>
            ) : (
              <div style={{ marginTop: '1em' }}>
                <span>End of Quiz</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function QuestionsCard({ quiz, onBack }) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);


  if (!quiz) return null;

  // Filter questions by quiz category
  const filteredQuestions = apiQuestions.filter(q => q.category === quiz.title || q.category === quiz.title.replace('&', '&amp;'));
  const questionsToUse = filteredQuestions.length > 0 ? filteredQuestions : apiQuestions;
  const q = questionsToUse[current];
  if (!q) return <div>No questions available for this quiz.</div>;


  // Shuffle options for each question
  function getOptions(q) {
    let opts = q.type === 'boolean'
      ? [q.correct_answer, ...q.incorrect_answers]
      : [q.correct_answer, ...q.incorrect_answers];
    return opts.sort(() => Math.random() - 0.5);
  }

  const options = getOptions(q);

  function handleOption(option) {
    setSelected(option);
    setShowAnswer(true);
  }

  function handleNext() {
    setSelected(null);
    setShowAnswer(false);
    setCurrent((prev) => prev + 1);
  }

  return (
    <div className="questions-card">
      <button onClick={onBack}>Back to Quiz List</button>
      <h3>{quiz.title}</h3>
      <div>
        <p dangerouslySetInnerHTML={{ __html: q.question }} />
        <ul>
          {options.map((opt) => (
            <li key={opt}>
              <button
                disabled={showAnswer}
                onClick={() => handleOption(opt)}
                style={{
                  background: showAnswer && opt === q.correct_answer ? '#aaffaa' : '',
                  border: selected === opt ? '2px solid #333' : '',
                }}
                dangerouslySetInnerHTML={{ __html: opt }}
              />
            </li>
          ))}
        </ul>
        {showAnswer && (
          <div>
            {selected === q.correct_answer ? 'Correct!' : `Wrong! Correct answer: ${q.correct_answer}`}
            {current < questionsToUse.length - 1 ? (
              <button onClick={handleNext}>Next Question</button>
            ) : (
              <span> End of Quiz </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
