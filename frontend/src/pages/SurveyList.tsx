import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import surveyService from '../services/surveyService';
import { DeleteOutlined } from '@ant-design/icons';
import './Survey.css';

interface Survey {
  id: number;
  title: string;
  description: string;
}

function SurveyList() {
  const [surveys, setSurveys] = useState<Survey[]>([]);
  let navigate = useNavigate();

  useEffect(() => {
    const fetchSurveys = async () => {
      try {
        const surveysData = await surveyService.getSurveys();
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

  const goToSurveyInfo = (id: number) => {
    navigate(`/survey/${id}`);
  };

  const handleDelete = async (id: number, event: React.MouseEvent) => {
    event.stopPropagation(); // Previene la navegación al hacer clic en el icono
    if (window.confirm("¿Estás seguro de que deseas eliminar esta encuesta?")) {
      try {
        await surveyService.deleteSurvey(id); // Llama a la función de eliminación
        setSurveys(surveys.filter(survey => survey.id !== id)); // Actualiza el estado para reflejar la eliminación
      } catch (error) {
        console.error('Error al eliminar la encuesta', error);
      }
    }
  };
  

  return (
    <div className="survey-list">
      {surveys.map(survey => (
        <div key={survey.id} className="survey-item" onClick={() => goToSurveyInfo(survey.id)}>
          <h2>{survey.title}</h2>
          <p>{survey.description}</p>
          <DeleteOutlined 
  onClick={(e) => handleDelete(survey.id, e)}
  className="delete-icon"
/>
        </div>
      ))}
      <button onClick={goToCreateSurvey} className="new-survey-btn">
        NEW SURVEY
      </button>
    </div>
  );
}

export default SurveyList;
