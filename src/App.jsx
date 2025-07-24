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

  