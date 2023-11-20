import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SurveyList from './pages/SurveyList';
import SurveyInfo from './pages/SurveyInfo';
import SurveyCreate from './pages/SurveyCreate';


function App() {
  return (
    
    <Router>
    <Routes>
      <Route path="/" element={<SurveyList />} />
      <Route path="/survey" element={<SurveyInfo />} />
      <Route path="/newsurvey" element={<SurveyCreate />} />
    </Routes>
  </Router>
  );
}

export default App;
