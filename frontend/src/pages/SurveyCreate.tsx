import React, { useRef, useState } from 'react';
import { Button, Input, Switch, Tooltip } from 'antd';
import { DeleteOutlined, DeleteFilled } from '@ant-design/icons';
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

  const endOfListRef = useRef<HTMLDivElement>(null);

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

    setTimeout(() => {
      endOfListRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
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
    if (window.confirm("Are you sure you want to remove this question?")) {
      setQuestions(questions.filter((_, qIndex) => qIndex !== questionIndex));
    }
  };

  const submitSurvey = () => {
    console.log('Submitting survey with questions:', questions);
  };

  return (
    <div className="survey-create">
      <Input placeholder="Title" />
      <Input.TextArea className="description-textbox" placeholder="Description" />
      {questions.map((question, qIndex) => (
        <div key={qIndex} className="question-container">
          <div className="question-header">
            <Input
              placeholder="Question Content"
              value={question.content}
              onChange={(e) => updateQuestionContent(qIndex, e.target.value)}
            />
            <div className="question-controls">
              <Switch
                checkedChildren="choice"
                unCheckedChildren="text"
                checked={question.questionType === 'choice'}
                onChange={() => toggleQuestionType(qIndex)}
              />
              <Tooltip title="Delete Question">
                <DeleteFilled
                  onClick={() => removeQuestion(qIndex)}
                  className="delete-icon"
                />
              </Tooltip>
            </div>
          </div>
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
                  <Tooltip title="Delete Choice">
                    <DeleteOutlined
                      onClick={() => removeChoiceFromQuestion(qIndex, cIndex)}
                      className="delete-icon"
                    />
                  </Tooltip>
                </div>
              ))}
              <Button onClick={() => addChoiceToQuestion(qIndex)}>+ Add Choice</Button>
            </>
          )}
        </div>
      ))}
      <Tooltip title="New Question">
        <Button className="add-question-btn" onClick={addQuestion}>+</Button>
      </Tooltip>
      <Button onClick={submitSurvey} className="create-survey-button">Create Survey</Button>
      <div ref={endOfListRef}></div>
    </div>
  );
};

export default SurveyCreate;
