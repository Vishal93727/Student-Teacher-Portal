import React, { useState } from 'react';

// Test Builder Component
  const TestBuilder = () => {
    const [test, setTest] = useState({
      title: '',
      description: '',
      duration: 30,
      attempts: 1,
      questions: []
    });

    const [currentQuestion, setCurrentQuestion] = useState({
      type: 'multiple-choice',
      question: '',
      options: ['', ''],
      correctAnswer: '',
      points: 1
    }); 

    const questionTypes = [
      { value: 'multiple-choice', label: 'Multiple Choice', icon: '⚪' },
      { value: 'true-false', label: 'True/False', icon: '✓' },
      { value: 'short-answer', label: 'Short Answer', icon: '📝' },
      { value: 'long-answer', label: 'Essay', icon: '📄' },
      { value: 'fill-blank', label: 'Fill in the Blank', icon: '___' }
    ];

    const addQuestion = () => {
      if (currentQuestion.question.trim()) {
        setTest(prev => ({
          ...prev,
          questions: [...prev.questions, { ...currentQuestion, id: Date.now() }]
        }));
        setCurrentQuestion({
          type: 'multiple-choice',
          question: '',
          options: ['', ''],
          correctAnswer: '',
          points: 1
        });
      }
    };

    const removeQuestion = (id) => {
      setTest(prev => ({
        ...prev,
        questions: prev.questions.filter(q => q.id !== id)
      }));
    };

    const updateOption = (index, value) => {
      const newOptions = [...currentQuestion.options];
      newOptions[index] = value;
      setCurrentQuestion(prev => ({ ...prev, options: newOptions }));
    };

    const addOption = () => {
      if (currentQuestion.options.length < 6) {
        setCurrentQuestion(prev => ({
          ...prev,
          options: [...prev.options, '']
        }));
      }
    };

    const removeOption = (index) => {
      if (currentQuestion.options.length > 2) {
        const newOptions = currentQuestion.options.filter((_, i) => i !== index);
        setCurrentQuestion(prev => ({ ...prev, options: newOptions }));
      }
    };

    const saveTest = () => {
      if (test.title && test.questions.length > 0) {
        const newTest = {
          ...test,
          id: Date.now(),
          createdAt: new Date().toISOString(),
          status: 'Draft'
        };
        setTests(prev => [...prev, newTest]);
        alert('Test saved successfully!');
        setCurrentView('tests');
      } else {
        alert('Please add a title and at least one question.');
      }
    };

    return (
      <div className="test-builder">
        <div className="test-builder-header">
          <h1>🧪 Create New Test</h1>
          <div className="header-actions">
            <button className="preview-btn">👁️ Preview</button>
            <button className="save-btn" onClick={saveTest}>💾 Save Test</button>
          </div>
        </div>

        <div className="test-builder-content">
          <div className="test-settings">
            <div className="settings-card">
              <h3>Test Settings</h3>
              <div className="form-group">
                <label>Test Title</label>
                <input
                  type="text"
                  value={test.title}
                  onChange={(e) => setTest(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter test title"
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={test.description}
                  onChange={(e) => setTest(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Enter test description"
                  rows="3"
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Duration (minutes)</label>
                  <input
                    type="number"
                    value={test.duration}
                    onChange={(e) => setTest(prev => ({ ...prev, duration: parseInt(e.target.value) }))}
                    min="1"
                  />
                </div>
                <div className="form-group">
                  <label>Max Attempts</label>
                  <input
                    type="number"
                    value={test.attempts}
                    onChange={(e) => setTest(prev => ({ ...prev, attempts: parseInt(e.target.value) }))}
                    min="1"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="question-builder">
            <div className="question-types">
              <h3>Add Question</h3>
              <div className="question-type-buttons">
                {questionTypes.map(type => (
                  <button
                    key={type.value}
                    className={`type-btn ${currentQuestion.type === type.value ? 'active' : ''}`}
                    onClick={() => setCurrentQuestion(prev => ({ ...prev, type: type.value }))}
                  >
                    <span className="type-icon">{type.icon}</span>
                    <span className="type-label">{type.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="question-form">
              <div className="form-group">
                <label>Question</label>
                <textarea
                  value={currentQuestion.question}
                  onChange={(e) => setCurrentQuestion(prev => ({ ...prev, question: e.target.value }))}
                  placeholder="Enter your question"
                  rows="3"
                />
              </div>

              {(currentQuestion.type === 'multiple-choice') && (
                <div className="options-section">
                  <label>Answer Options</label>
                  {currentQuestion.options.map((option, index) => (
                    <div key={index} className="option-input">
                      <input
                        type="radio"
                        name="correct-answer"
                        checked={currentQuestion.correctAnswer === option}
                        onChange={() => setCurrentQuestion(prev => ({ ...prev, correctAnswer: option }))}
                      />
                      <input
                        type="text"
                        value={option}
                        onChange={(e) => updateOption(index, e.target.value)}
                        placeholder={`Option ${index + 1}`}
                      />
                      {currentQuestion.options.length > 2 && (
                        <button 
                          type="button" 
                          className="remove-option"
                          onClick={() => removeOption(index)}
                        >
                          ×
                        </button>
                      )}
                    </div>
                  ))}
                  {currentQuestion.options.length < 6 && (
                    <button type="button" className="add-option" onClick={addOption}>
                      + Add Option
                    </button>
                  )}
                </div>
              )}

              {currentQuestion.type === 'true-false' && (
                <div className="true-false-section">
                  <label>Correct Answer</label>
                  <div className="true-false-options">
                    <label>
                      <input
                        type="radio"
                        name="tf-answer"
                        value="true"
                        checked={currentQuestion.correctAnswer === 'true'}
                        onChange={(e) => setCurrentQuestion(prev => ({ ...prev, correctAnswer: e.target.value }))}
                      />
                      True
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="tf-answer"
                        value="false"
                        checked={currentQuestion.correctAnswer === 'false'}
                        onChange={(e) => setCurrentQuestion(prev => ({ ...prev, correctAnswer: e.target.value }))}
                      />
                      False
                    </label>
                </div>
                </div>
              )}

              <div className="form-group">
                <label>Points</label>
                <input
                  type="number"
                  value={currentQuestion.points}
                  onChange={(e) => setCurrentQuestion(prev => ({ ...prev, points: parseInt(e.target.value) }))}
                  min="1"
                  max="10"
                />
              </div>

              <button className="add-question-btn" onClick={addQuestion}>
                ➕ Add Question
              </button>
            </div>
          </div>

          <div className="questions-list">
            <h3>Questions ({test.questions.length})</h3>
            {test.questions.length === 0 ? (
              <div className="empty-state">
                <p>No questions added yet. Create your first question above!</p>
              </div>
            ) : (
              <div className="questions">
                {test.questions.map((question, index) => (
                  <div key={question.id} className="question-item">
                    <div className="question-header">
                      <span className="question-number">Q{index + 1}</span>
                      <span className="question-type">{questionTypes.find(t => t.value === question.type)?.label}</span>
                      <span className="question-points">{question.points} pts</span>
                      <button 
                        className="delete-question"
                        onClick={() => removeQuestion(question.id)}
                      >
                        🗑️
                      </button>
                    </div>
                    <div className="question-content">
                      <p>{question.question}</p>
                      {question.type === 'multiple-choice' && (
                        <div className="question-options">
                          {question.options.map((option, optIndex) => (
                            <div 
                              key={optIndex} 
                              className={`option ${option === question.correctAnswer ? 'correct' : ''}`}
                            >
                              {option}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };
  export default TestBuilder;