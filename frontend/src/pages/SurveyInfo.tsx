import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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
  

  if (!survey) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="survey-info">
      <h2>{survey.title}</h2>
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
            // Mostrar un área de texto para preguntas sin opciones
            <textarea  disabled />
          )}
        </div>
      ))}
    </div>
  );
}

export default SurveyInfo;
