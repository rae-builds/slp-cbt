'use client';

import React, { useState, useEffect } from 'react';
import { mockQuestions } from '@/data/mockQuestions';
import { Question, ExamState } from '@/types/exam';

export default function CBTApp() {
  const [state, setState] = useState<ExamState>({
    currentQuestionIndex: 0,
    answers: {},
    markedQuestions: new Set(),
    memos: {},
    timeLeft: 3600, // 60 minutes
    fontSize: 100,
    layout: '2-pane',
    isFinished: false,
  });

  const currentQuestion = mockQuestions[state.currentQuestionIndex];

  // Timer logic
  useEffect(() => {
    const timer = setInterval(() => {
      setState((prev) => ({
        ...prev,
        timeLeft: Math.max(0, prev.timeLeft - 1),
      }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const handleAnswerSelect = (questionId: number, optionId: number) => {
    setState((prev) => ({
      ...prev,
      answers: { ...prev.answers, [questionId]: optionId },
    }));
  };

  const navigate = (direction: 'next' | 'prev') => {
    setState((prev) => {
      const nextIndex = direction === 'next' 
        ? Math.min(mockQuestions.length - 1, prev.currentQuestionIndex + 1)
        : Math.max(0, prev.currentQuestionIndex - 1);
      return { ...prev, currentQuestionIndex: nextIndex };
    });
  };

  const answeredCount = Object.keys(state.answers).length;
  const unansweredCount = mockQuestions.length - answeredCount;

  if (state.isFinished) {
    return (
      <div className="cbt-container" style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#f0f2f5' }}>
        <div style={{ background: 'white', padding: '40px', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', textAlign: 'center', maxWidth: '500px', width: '90%' }}>
          <h2 style={{ fontSize: '2rem', color: '#1e3a5f', marginBottom: '20px' }}>시험이 종료되었습니다</h2>
          <div style={{ fontSize: '1.2rem', marginBottom: '30px', color: '#4a5568' }}>
            <p>총 문항 수: {mockQuestions.length}</p>
            <p>푼 문항 수: {answeredCount}</p>
            <p>남은 문항 수: {unansweredCount}</p>
          </div>
          <button 
            className="footer-btn" 
            style={{ backgroundColor: '#1e3a5f', color: 'white', padding: '12px 30px', fontSize: '1.1rem' }}
            onClick={() => window.location.reload()}
          >
            다시 연습하기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cbt-container" style={{ fontSize: `${state.fontSize}%` }}>
      {/* Header */}
      <header className="cbt-header">
        <div className="cbt-header-left">
          <div className="cbt-exam-number">01</div>
          <div className="cbt-user-info">
            <div>응시번호: 01010001</div>
            <div>성명: 김국시</div>
          </div>
          <h1 className="cbt-title">보건의료인 CBT 문항풀이 연습</h1>
        </div>
        <div className="cbt-controls">
          <div className="font-control">
            <span style={{ fontSize: '0.8rem', marginRight: '5px' }}>글자크기</span>
            {[80, 100, 125].map((size) => (
              <button 
                key={size} 
                className={`font-btn ${state.fontSize === size ? 'active' : ''}`}
                onClick={() => setState(prev => ({ ...prev, fontSize: size }))}
              >
                가 {size}%
              </button>
            ))}
          </div>
          <div className="layout-control">
            <span style={{ fontSize: '0.8rem', marginRight: '5px' }}>화면배치</span>
            <button 
              className={`layout-btn ${state.layout === '1-pane' ? 'active' : ''}`}
              onClick={() => setState(prev => ({ ...prev, layout: '1-pane' }))}
              title="1단 보기"
            >
              ⬛
            </button>
            <button 
              className={`layout-btn ${state.layout === '2-pane' ? 'active' : ''}`}
              onClick={() => setState(prev => ({ ...prev, layout: '2-pane' }))}
              title="2단 보기"
            >
              ◫
            </button>
          </div>
          <div className="timer-box">
            ⏱ 시작 시간 : 09:00:00 (남은시간 {formatTime(state.timeLeft)})
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="cbt-main">
        {/* Question Area */}
        <section className="question-area" style={{ flex: state.layout === '1-pane' ? '1 1 100%' : '1' }}>
          <div className="question-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 className="question-title">{currentQuestion.question}</h2>
            <div className="tool-btns" style={{ display: 'flex', gap: '5px' }}>
               <button className="font-btn">✅ 체크문제</button>
               <button className="font-btn">📝 메모</button>
            </div>
          </div>
          
          {currentQuestion.subQuestion && (
            <div className="question-text" style={{ whiteSpace: 'pre-wrap' }}>
              {currentQuestion.number}. {currentQuestion.subQuestion}
            </div>
          )}
          {!currentQuestion.subQuestion && (
            <div className="question-text">
              {currentQuestion.number}. {currentQuestion.question}
            </div>
          )}

          {currentQuestion.mediaUrl && (
            <div className="media-container">
              {currentQuestion.type === 'image' ? (
                <img src={currentQuestion.mediaUrl} alt="Question Media" />
              ) : (
                <video controls src={currentQuestion.mediaUrl} />
              )}
              <div style={{ marginTop: '5px', fontSize: '0.9rem', color: '#666' }}>[ 사진 1 ]</div>
            </div>
          )}

          <div className="options-list">
            {currentQuestion.options.map((option) => (
              <div 
                key={option.id} 
                className={`option-item ${state.answers[currentQuestion.id] === option.id ? 'selected' : ''}`}
                onClick={() => handleAnswerSelect(currentQuestion.id, option.id)}
              >
                <div className="option-radio">
                  {option.id}
                </div>
                <div className="option-text">{option.text}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Answer Sheet Area */}
        {state.layout === '2-pane' && (
          <aside className="answer-sheet">
            <div className="answer-sheet-header">답 안 표 기 란</div>
            <div className="answer-grid">
              {mockQuestions.map((q) => (
                <div key={q.id} className="answer-row">
                  <div className="answer-row-num">{String(q.number).padStart(2, '0')}</div>
                  <div className="answer-options-small">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <div 
                        key={num} 
                        className={`option-circle-small ${state.answers[q.id] === num ? 'selected' : ''}`}
                        onClick={() => handleAnswerSelect(q.id, num)}
                      >
                        {num}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </aside>
        )}
      </main>

      {/* Footer */}
      <footer className="cbt-footer">
        <div className="footer-left">
          <button className="footer-btn">🧮 계산기</button>
          <button className="footer-btn">🎨 그림판</button>
        </div>
        
        <div className="footer-center" style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <button className="footer-btn-nav" onClick={() => navigate('prev')} disabled={state.currentQuestionIndex === 0}>◀ 이전</button>
          <span style={{ fontWeight: 'bold' }}>{state.currentQuestionIndex + 1} / {mockQuestions.length}</span>
          <button className="footer-btn-nav" onClick={() => navigate('next')} disabled={state.currentQuestionIndex === mockQuestions.length - 1}>다음 ▶</button>
        </div>

        <div className="footer-right">
          <div className="status-badge">📄 전체 문제 ({mockQuestions.length})</div>
          <div className="status-badge">✔️ 체크 문제 (0)</div>
          <div className="status-badge">📓 안푼 문제 ({unansweredCount})</div>
          <button className="exit-btn" onClick={() => setState(prev => ({ ...prev, isFinished: true }))}>↪ 연습 종료</button>
        </div>
      </footer>
    </div>
  );
}
