import React, { useState } from 'react';
import { Button, Input, Switch } from 'antd';
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
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: 1,
      content: '',
      questionType: 'text',
      choices: [],
    },
  ]);

  const toggleQuestionType = (index: number) => {
    setQuestions(
      questions.map((question, qIndex) =>
        qIndex === index
          ? {
              ...question,
              questionType: question.questionType === 'text' ? 'choice' : 'text',
            }
          : question,
      ),
    );
  };

  const addChoiceToQuestion = (index: number) => {
    setQuestions(
      questions.map((question, qIndex) =>
        qIndex === index
          ? {
              ...question,
              choices: [
                ...question.choices,
                { id: question.choices.length + 1, content: '' },
              ],
            }
          : question,
      ),
    );
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        id: questions.length + 1,
        content: '',
        questionType: 'text',
        choices: [],
      },
    ]);
  };

  const updateQuestionContent = (index: number, content: string) => {
    const updatedQuestions = questions.map((question, qIndex) =>
      qIndex === index ? { ...question, content } : question,
    );
    setQuestions(updatedQuestions);
  };

  const updateChoiceContent = (questionIndex: number, choiceIndex: number, content: string) => {
    const updatedQuestions = questions.map((question, qIndex) =>
      qIndex === questionIndex
        ? {
            ...question,
            choices: question.choices.map((choice, cIndex) =>
              cIndex === choiceIndex ? { ...choice, content } : choice,
            ),
          }
        : question,
    );
    setQuestions(updatedQuestions);
  };

  const removeChoiceFromQuestion = (questionIndex: number, choiceIndex: number) => {
    const updatedQuestions = questions.map((question, qIndex) =>
      qIndex === questionIndex
        ? {
            ...question,
            choices: question.choices.filter((_, cIndex) => cIndex !== choiceIndex),
          }
        : question,
    );
    setQuestions(updatedQuestions);
  };

  const removeQuestion = (questionIndex: number) => {
    setQuestions(questions.filter((_, qIndex) => qIndex !== questionIndex));
  };

  const submitSurvey = () => {
    console.log('Submitting survey with questions:', questions);
    // Implement submission logic here
  };
  return (
    <div className="survey-create">
      <Input placeholder="Title" />
      <Input.TextArea placeholder="Description" />
      {questions.map((question, qIndex) => (
        <div key={qIndex} className="question-container">
          <Input
            placeholder="Question Content"
            value={question.content}
            onChange={(e) => updateQuestionContent(qIndex, e.target.value)}
          />
          <Switch
            checkedChildren="choice"
            unCheckedChildren="text"
            checked={question.questionType === 'choice'}
            onChange={() => toggleQuestionType(qIndex)}
          />
          {question.questionType === 'choice' && (
            <>
              {question.choices.map((choice, cIndex) => (
                <div key={cIndex} className="choice-container">
                  <Input
                    placeholder="Choice Content"
                    value={choice.content}
                    onChange={(e) =>
                      updateChoiceContent(qIndex, cIndex, e.target.value)
                    }
                  />
                  <Button onClick={() => removeChoiceFromQuestion(qIndex, cIndex)}>
                    Remove Choice
                  </Button>
                </div>
              ))}
              <Button onClick={() => addChoiceToQuestion(qIndex)}>+ Add Choice</Button>
            </>
          )}
          <Button onClick={() => removeQuestion(qIndex)}>Remove Question</Button>
        </div>
      ))}
      <Button onClick={addQuestion}>+ Add Question</Button>
      <Button onClick={submitSurvey}>Create Survey</Button>
    </div>
  );
};

export default SurveyCreate;