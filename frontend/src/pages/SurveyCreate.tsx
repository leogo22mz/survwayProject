import React, { useRef, useState } from 'react';
import { Button, Input, Switch, Tooltip, message } from 'antd';
import { DeleteOutlined, DeleteFilled } from '@ant-design/icons';
import surveyService from '../services/surveyService';
import { useParams, useNavigate } from 'react-router-dom';
import './Survey.css';

interface Choice {
  id: number;
  content: string;
}

interface Question {
  id: number;
  content: string;
  questionType: 'text' | 'choice';
  choices: Choice[];
}

const SurveyCreate: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: 1,
      content: '',
      questionType: 'text',
      choices: [],
    },
  ]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const endOfListRef = useRef<HTMLDivElement>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleQuestionType = (index: number) => {
    setQuestions(
      questions.map((question, qIndex) =>
        qIndex === index
          ? { ...question, questionType: question.questionType === 'text' ? 'choice' : 'text' }
          : question
      )
    );
  };

  const addChoiceToQuestion = (index: number) => {
    setQuestions(
      questions.map((question, qIndex) =>
        qIndex === index
          ? { ...question, choices: [...question.choices, { id: question.choices.length + 1, content: '' }] }
          : question
      )
    );
  };

  const addQuestion = () => {
    setQuestions([...questions, { id: questions.length + 1, content: '', questionType: 'text', choices: [] }]);
    setTimeout(() => {
      endOfListRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const updateQuestionContent = (index: number, content: string) => {
    setQuestions(questions.map((question, qIndex) => qIndex === index ? { ...question, content } : question));
  };

  const updateChoiceContent = (questionIndex: number, choiceIndex: number, content: string) => {
    setQuestions(questions.map((question, qIndex) =>
      qIndex === questionIndex
        ? { ...question, choices: question.choices.map((choice, cIndex) => cIndex === choiceIndex ? { ...choice, content } : choice) }
        : question
    ));
  };

  const removeChoiceFromQuestion = (questionIndex: number, choiceIndex: number) => {
    setQuestions(questions.map((question, qIndex) =>
      qIndex === questionIndex
        ? { ...question, choices: question.choices.filter((_, cIndex) => cIndex !== choiceIndex) }
        : question
    ));
  };

  const removeQuestion = (questionIndex: number) => {
    if (window.confirm("Are you sure you want to remove this question?")) {
      setQuestions(questions.filter((_, qIndex) => qIndex !== questionIndex));
    }
  };
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    message.success('Sesión cerrada exitosamente');
    navigate('/');
    window.location.reload();
  };
  
  const submitSurvey = async () => {
    const surveyData = {
      survey: {
        title: title,
        description: description,
        created_by: "1", // *****************
        questions_attributes: questions.map(question => ({
          content: question.content,
          question_type: question.questionType,
          choices_attributes: question.choices.map(choice => ({
            content: choice.content
          }))
        }))
      }
    };

    try {
      const response = await surveyService.createSurvey(surveyData);
      console.log('Encuesta creada con éxito:', response);
      navigate('/');
    } catch (error) {
      console.error('Error al enviar la encuesta:', error);
    }
  };
  return (
    <div className={`app-container ${isMenuOpen ? 'menu-open' : ''}`}>
      <div className="topbar">
        <button className="menu-toggle" onClick={toggleMenu}>☰</button>
      </div>
      <div className="sidebar">
        <br /><br />        
        <ul className="sidebar-menu">
          <br /><br />
          <li className="menu-item" onClick={() => navigate('/')}>Home</li>
          <li className="menu-item" onClick={() => navigate('/')}>My Surveys</li>
          {!isAuthenticated && <li className="menu-item" onClick={() => navigate('/login')}>Log In</li>}
          {!isAuthenticated && <li className="menu-item" onClick={() => navigate('/signup')}>Sign Up</li>}
          {isAuthenticated && <li className="menu-item" onClick={handleLogout}>Log Out</li>}
        </ul>
      </div>
      <div className="content"><br /><br />
        <Input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} /><br /><br />
        <Input.TextArea className="description-textbox" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
        {questions.map((question, qIndex) => (
          <div key={qIndex} className="question-container">
            <div className="question-header">
              <Input placeholder="Question Content" value={question.content} onChange={e => updateQuestionContent(qIndex, e.target.value)} />
              <div className="question-controls">
                <Switch checkedChildren="choice" unCheckedChildren="text" checked={question.questionType === 'choice'} onChange={() => toggleQuestionType(qIndex)} />
                <Tooltip title="Delete Question">
                  <DeleteFilled onClick={() => removeQuestion(qIndex)} className="delete-icon" />
                </Tooltip>
              </div>
            </div>
            {question.questionType === 'choice' && question.choices.map((choice, cIndex) => (
              <div key={cIndex} className="choice-container">
                <Input placeholder="Choice Content" value={choice.content} onChange={e => updateChoiceContent(qIndex, cIndex, e.target.value)} />
                <Tooltip title="Delete Choice">
                  <DeleteOutlined onClick={() => removeChoiceFromQuestion(qIndex, cIndex)} className="delete-icon" />
                </Tooltip>
              </div>
            ))}
            {question.questionType === 'choice' && <Button onClick={() => addChoiceToQuestion(qIndex)}>+ Add Choice</Button>}
          </div>
        ))}
        <Tooltip title="New Question">
          <Button className="add-question-btn" onClick={addQuestion}>+</Button>
        </Tooltip>
        <Button onClick={submitSurvey} className="create-survey-button">Create Survey</Button>
        <div ref={endOfListRef}></div>
      </div>
    </div>
  );
};

export default SurveyCreate;
