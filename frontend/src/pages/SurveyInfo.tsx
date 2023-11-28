import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import surveyService from '../services/surveyService';
import './Survey.css';

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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleEdit = () => {
    console.log("Editar encuesta", id);
  };

  const handleDelete = async () => {
    if (window.confirm("¿Estás seguro de que deseas eliminar esta encuesta?")) {
      try {
        await surveyService.deleteSurvey(id);
        navigate('/');
      } catch (error) {
        console.error('Error al eliminar la encuesta', error);
      }
    }
  };

  if (!survey) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className={`app-container ${isMenuOpen ? 'menu-open' : ''}`}>
      <div className="topbar">
        <button className="menu-toggle" onClick={toggleMenu}>☰</button>
      </div>
      <div className="sidebar">
        <ul className="sidebar-menu">
        <br/><br/>
          <li className="menu-item" onClick={() => navigate('/')}>Home</li>
          <li className="menu-item" onClick={() => navigate('/')}>My Surveys</li>
          <li className="menu-item" onClick={() => {/* handle log out */}}>Log Out</li>
        </ul>
      </div>
      <div className="content">
        <div className="survey-info">
          <div className="survey-header">
            <h2 className="survey-title">{survey.title}</h2>
            <div className="survey-actions">
              <EditOutlined onClick={handleEdit} />
              <DeleteOutlined onClick={handleDelete} />
            </div>
          </div>
          <p className="survey-description">{survey.description}</p>
          {survey.questions.map((question, index) => (
            <div key={question.id} className="question">
              <h3 className="question-title">{index + 1}. {question.content}</h3>
              {question.choices.length > 0 ? (
                <ul className="choice-list">
                  {question.choices.map(choice => (
                    <li key={choice.id} className="choice-item">
                      <label className="choice-label">
                        <input type="checkbox" disabled />
                        {choice.content}
                      </label>
                    </li>
                  ))}
                </ul>
              ) : (
                <textarea className="question-textarea" disabled />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SurveyInfo;
