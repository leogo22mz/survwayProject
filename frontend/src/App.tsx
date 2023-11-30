import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SurveyList from './pages/SurveyList';
import SurveyInfo from './pages/SurveyInfo';
import SurveyCreate from './pages/SurveyCreate';
import Login from './pages/Login';

function App() {
  return (
    
    <Router>
    <Routes>
      <Route path="/" element={<SurveyList />} />
      <Route path="/survey/:id" element={<SurveyInfo />} />
      <Route path="/newsurvey" element={<SurveyCreate />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  </Router>
  );
}

export default App;
