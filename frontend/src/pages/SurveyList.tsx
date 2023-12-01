import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, Dropdown, Input } from 'antd';
import { MoreOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import surveyService from '../services/surveyService';
import './Survey.css';

interface Survey {
  id: number;
  title: string;
  description: string;
}

function SurveyList() {
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

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
  const filteredSurveys = surveys.filter(survey =>
    survey.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const goToCreateSurvey = () => {
    navigate('/newsurvey');
  };

  const goToSurveyInfo = (id: number) => {
    navigate(`/survey/${id}`);
  };

  const handleDelete = async (surveyId: number) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar esta encuesta?")) {
      try {
        await surveyService.deleteSurvey(surveyId);
        setSurveys(surveys.filter(survey => survey.id !== surveyId));
      } catch (error) {
        console.error('Error al eliminar la encuesta', error);
      }
    }
  };

  const handleModify = (surveyId: number) => {
    navigate(`/updatesurvey/${surveyId}`);
  };  

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const menu = (surveyId: number) => (
    <Menu>
    <Menu.Item key="1" icon={<EditOutlined />} onClick={() => handleModify(surveyId)}>
        Modify
      </Menu.Item>
      <Menu.Item key="2" icon={<DeleteOutlined />} onClick={() => handleDelete(surveyId)}>
        Delete
      </Menu.Item>
    </Menu>
  );

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
      <br/>

      <button onClick={goToCreateSurvey} className="new-survey-btn">
        NEW SURVEY
      </button><br />
      <Input 
        type="text"
        placeholder="Filter surveys..."
        onChange={(e) => setSearchTerm(e.target.value)}
      /><br/><br/>
      {filteredSurveys.map(survey => (
        <div key={survey.id} className="survey-item">
          <div className="survey-content" onClick={() => goToSurveyInfo(survey.id)}>
            <h2>{survey.title}</h2>
            <p>{survey.description}</p>
          </div>
          <Dropdown overlay={menu(survey.id)} trigger={['click']}>
            <span className="action-icon-container">
              <MoreOutlined className="action-icon" />
            </span>
          </Dropdown>
        </div>
      ))}
    </div>
  </div>
);
}

export default SurveyList;
