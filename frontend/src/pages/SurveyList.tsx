import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import surveyService from '../services/surveyService';
import './Survey.css';

interface Survey {
  id: number;
  title: string;
  description: string;
}

function SurveyList() {
  const [surveys, setSurveys] = useState<Survey[]>([]); // Usando el tipo definido
  let navigate = useNavigate();

  useEffect(() => {
    const fetchSurveys = async () => {
      try {
        const surveysData = await surveyService.getSurveys();
        console.log('Surveys:', surveysData); // Imprime los datos recibidos
        setSurveys(surveysData);
      } catch (error) {
        console.error('Error al obtener las encuestas', error);
      }
    };
    

    fetchSurveys();
  }, []);

  const goToCreateSurvey = () => {
    navigate('/newsurvey');
  };

  return (
    <div className="survey-list">
      {surveys.map(survey => (
        <div key={survey.id} className="survey-item">
          <h2>{survey.title}</h2>
          <p>{survey.description}</p>
        </div>
      ))}
      <button onClick={goToCreateSurvey} className="new-survey-btn">
        NEW SURVEY
      </button>
    </div>
  );
}

export default SurveyList;
