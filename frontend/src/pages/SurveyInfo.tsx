import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import surveyService from '../services/surveyService';

interface Choice {
  id: number;
  content: string;
}

interface Question {
  id: number;
  content: string;
  choices: Choice[];
}

interface SurveyDetail {
  id: number;
  title: string;
  description: string;
  questions: Question[];
}

function SurveyInfo() {
  const { id } = useParams<{ id: string }>();
  const [survey, setSurvey] = useState<SurveyDetail | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSurvey = async () => {
      if (id !== undefined) {
        try {
          const surveyData = await surveyService.getSurveyById(id);
          setSurvey(surveyData);
        } catch (error) {
          console.error('Error al obtener la encuesta', error);
        }
      }
    };

    fetchSurvey();
  }, [id]);

  const handleEdit = () => {
    // Aquí la lógica para editar la encuesta
    console.log("Editar encuesta", id);
  };

  const handleDelete = async () => {
    if (window.confirm("¿Estás seguro de que deseas eliminar esta encuesta?")) {
      try {
        await surveyService.deleteSurvey(id);
        navigate('/'); // Redirige al usuario después de eliminar la encuesta
      } catch (error) {
        console.error('Error al eliminar la encuesta', error);
      }
    }
  };

  if (!survey) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="survey-info">
      <div className="survey-header">
        <h2>{survey.title}</h2>
        <div className="survey-actions">
          <EditOutlined onClick={handleEdit} />
          <DeleteOutlined onClick={handleDelete} />
        </div>
      </div>
      <p>{survey.description}</p>
      {survey.questions.map((question, index) => (
        <div key={question.id} className="question">
          <h3>{index + 1}. {question.content}</h3>
          {question.choices.length > 0 ? (
            <ul>
              {question.choices.map(choice => (
                <li key={choice.id}>
                  <label>
                    <input type="checkbox" disabled />
                    {choice.content}
                  </label>
                </li>
              ))}
            </ul>
          ) : (
            <textarea disabled />
          )}
        </div>
      ))}
    </div>
  );
}

export default SurveyInfo;
