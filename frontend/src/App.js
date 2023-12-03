
import { Route, Routes } from 'react-router-dom';
import Quiz from './components/Quiz';
import { QuestionList } from './components/QuestionList';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Quiz />} />
        <Route path='/:cat' element={<QuestionList />} />
      </Routes>
    </div>
  );
}

export default App;
