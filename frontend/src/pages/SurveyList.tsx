import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Survey.css'; // Asume que tienes este archivo CSS con tus estilos

function SurveyList() {
  let navigate = useNavigate();

  const goToCreateSurvey = () => {
    navigate('/newsurvey'); // Asegúrate de que esta ruta esté definida en tu enrutador
  };

  return (
    <div className="survey-list">
      {/* Aquí iría la lista de encuestas, mapeando cada una a un elemento de la lista */}
      {/* Ejemplo de un elemento de la lista: */}
      <div className="survey-item">
        <h2>Title of the Survey</h2>
        <p>The Description of the Survey within the survey list</p>
      </div>
      {/* ... más elementos de la lista ... */}
      <button onClick={goToCreateSurvey} className="new-survey-btn">
        NEW SURVEY
      </button>
    </div>
  );
}

export default SurveyList;

