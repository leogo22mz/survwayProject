import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SurveyList from './pages/SurveyList';
import SurveyInfo from './pages/SurveyInfo';
import SurveyCreate from './pages/SurveyCreate';
import SurveyUpdate from './pages/SurveyUpdate';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';

function App() {
  return (
    
    <Router>
    <Routes>
      <Route path="/" element={<SurveyList />} />
      <Route path="/survey/:id" element={<SurveyInfo />} />
      <Route path="/newsurvey" element={<SurveyCreate />} />
      <Route path="/updatesurvey/:id" element={<SurveyUpdate />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path='/profile' element={<Profile />} />

    </Routes>
  </Router>
  );
}

export default App;
