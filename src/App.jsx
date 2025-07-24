import { NavBar } from './components/NavBar/NavBar.jsx';
import { RegisterForm } from './components/Register Form/RegisterForm.jsx';
import QuizList from './components/Quiz List/QuizList.jsx';
import QuestionsCard from './components/Questions Card/QuestionsCard.jsx';
import { GameControls } from './components/Game Controls/GameControls.jsx';
import { ResultsPage } from './components/Results Page/ResultsPage.jsx';
import { About } from './components/About/About.jsx';
import { questionsData } from './data/questions.js';
import { fetchApiQuestions } from './utils/fetchApiQuestions.js';
import './App.css'

function App() {
  const [page, setPage] = useState('register');
  const [user, setUser] = useState(null);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [level, setLevel] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [paused, setPaused] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);

useEffect(() => {
    let timer = null;
    if (!paused && page === 'quiz') {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setPage('results');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [paused, page]);

  const handleNavigate = (targetPage) => {
    if (targetPage === 'quiz') {
      if (!user) {
        setPage('register');
      } else {
        setPage('quiz-list');
      }
    } else {
      setPage(targetPage);
    }
  };

  const handleRegister = (username) => {
    setUser(username);
    setPage('quiz-list');
  };

  const handleSelectQuiz = async (quiz, level = 'easy', useApi = false) => {
    setSelectedQuiz(quiz);
    setLevel(level);
    let selectedQuestions;
    if (useApi) {
      selectedQuestions = await fetchApiQuestions();
    } else {
      selectedQuestions = questionsData.filter(q => q.category === quiz.title && q.level === level);
    }
    setQuestions(selectedQuestions);
    setCurrent(0);
    setAnswers([]);
    setTimeLeft(60);
    setPaused(false);
    setPage('quiz');
  };

  const handleAnswer = (selectedAnswer) => {
    const updatedAnswers = [...answers];
    updatedAnswers[current] = selectedAnswer;
    setAnswers(updatedAnswers);
  };

  const handlePause = () => setPaused(true);
  const handleResume = () => setPaused(false);
  const handleNext = () => {
    if (current < questions.length - 1) setCurrent(current + 1);
  };
  const handlePrev = () => {
    if (current > 0) setCurrent(current - 1);
  };
  const handleRestart = () => setPage('quiz-list');

  const renderQuizPage = () => (
    <>
      <GameControls
        onPause={handlePause}
        onResume={handleResume}
        onNext={handleNext}
        onPrev={handlePrev}
        isPaused={paused}
        timeLeft={timeLeft}
      />
      <QuestionsCard
        quiz={selectedQuiz}
        onBack={() => setPage('quiz-list')}
        onAnswer={handleAnswer} 
      />
    </>
  );
    const renderResults = () => {
    const wrongAnswers = questions.map((q, i) => {
      const userAnsIdx = answers[i];
      const correctAnsIdx = q.answer;
      if (userAnsIdx !== correctAnsIdx) {
        return {
          question: q.text,
          userAnswer: q.choices[userAnsIdx] || 'No answer',
          correctAnswer: q.choices[correctAnsIdx]
        };
      }
      return null;
    }).filter(Boolean);


const score = questions.reduce((acc, q, i) => {
      return acc + (answers[i] === q.correct_answer ? 1 : 0);
    }, 0);

    return (
      <ResultsPage
        score={score}
        total={questions.length}
        wrongAnswers={wrongAnswers}
        onRestart={handleRestart}
      />
    );
  };

  return (
    <div className="container">
      <NavBar onNavigate={handleNavigate} />
      {page === 'register' && <RegisterForm onRegister={handleRegister} />}
      {page === 'quiz-list' && <QuizList onSelectQuiz={handleSelectQuiz} />}
      {page === 'quiz' && renderQuizPage()}
      {page === 'results' && renderResults()}
      {page === 'about' && <About />}
    </div>
  );
}

export default App;
