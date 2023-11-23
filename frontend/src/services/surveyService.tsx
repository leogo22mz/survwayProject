import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:3000/api';

const createSurvey = async (surveyData: any) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/surveys`, surveyData);
    return response.data;
  } catch (error) {
    console.error('Error al crear la encuesta', error);
    throw error;
  }
};

const getSurveys = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/surveys`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener las encuestas', error);
    throw error;
  }
};
export default {
  createSurvey, getSurveys
};
