import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:4000/api';

const createSurvey = async (surveyData: any) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(`${API_BASE_URL}/surveys`, surveyData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error creating survey', error);
    throw error;
  }
};

const getSurveys = async () => {
  const token = localStorage.getItem('token');
  try {
    const response = await axios.get(`${API_BASE_URL}/surveys`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching surveys', error);
    throw error;
  }
};

const getSurveyById = async (id: any) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_BASE_URL}/surveys/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching survey', error);
    throw error;
  }
};

const deleteSurvey = async (id: any) => {
  try {
    const token = localStorage.getItem('token');
    await axios.delete(`${API_BASE_URL}/surveys/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  } catch (error) {
    console.error('Error deleting survey', error);
    throw error;
  }
};

const updateSurvey = async (id: any, surveyData: any) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.put(`${API_BASE_URL}/surveys/${id}`, surveyData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error updating survey', error);
    throw error;
  }
};

const deleteQuestion = async (surveyId: any, questionId: any) => {
  try {
    const token = localStorage.getItem('token');
    await axios.delete(`${API_BASE_URL}/surveys/${surveyId}/questions/${questionId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  } catch (error) {
    console.error('Error deleting question', error);
    throw error;
  }
};

export default {
  createSurvey,
  getSurveys,
  getSurveyById,
  deleteSurvey,
  updateSurvey,
  deleteQuestion 
};
