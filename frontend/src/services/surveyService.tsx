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
const getSurveyById = async (id: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/surveys/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener la encuesta', error);
    throw error;
  }
};

const deleteSurvey = async (id: any) => {
  try {
    await axios.delete(`${API_BASE_URL}/surveys/${id}`);
  } catch (error) {
    console.error('Error al eliminar la encuesta', error);
    throw error;
  }
};

export default {
  createSurvey, getSurveys, getSurveyById, deleteSurvey
};