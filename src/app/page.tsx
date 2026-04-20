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
    timeLeft: 3600,
    fontSize: 100,
    layout: '1-pane', // '1-pane' (1문제) or '2-pane' (2문제)
    isFinished: false,
  });

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
      const step = prev.layout === '2-pane' ? 2 : 1;
      let nextIndex = direction === 'next' 
        ? prev.currentQuestionIndex + step
        : prev.currentQuestionIndex - step;
      
      // Boundary check
      nextIndex = Math.max(0, Math.min(mockQuestions.length - 1, nextIndex));
      
      // In 2-pane mode, ensure we start at an even index (0, 2, 4...) for consistent pairing
      if (prev.layout === '2-pane') {
        nextIndex = Math.floor(nextIndex / 2) * 2;
      }

      return { ...prev, currentQuestionIndex: nextIndex };
    });
  };

  // When switching layout, ensure the index is appropriate
  const toggleLayout = (newLayout: '1-pane' | '2-pane') => {
    setState(prev => ({
      ...prev,
      layout: newLayout,
      currentQuestionIndex: newLayout === '2-pane' 
        ? Math.floor(prev.currentQuestionIndex / 2) * 2 
        : prev.currentQuestionIndex
    }));
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
          <button className="footer-btn" style={{ backgroundColor: '#1e3a5f', color: 'white', padding: '12px 30px', fontSize: '1.1rem' }} onClick={() => window.location.reload()}>다시 연습하기</button>
        </div>
      </div>
    );
  }

  const renderQuestion = (q: Question) => (
    <div key={q.id} className="question-content" style={{ flex: 1, padding: '20px', borderRight: state.layout === '2-pane' ? '1px solid #eee' : 'none' }}>
      <div className="question-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 className="question-title">{q.question}</h2>
        <div className="tool-btns" style={{ display: 'flex', gap: '5px' }}>
          <button className="font-btn" style={{fontSize: '0.7rem', width: 'auto', padding: '0 5px'}}>✅ 체크문제</button>
          <button className="font-btn" style={{fontSize: '0.7rem', width: 'auto', padding: '0 5px'}}>📝 메모</button>
        </div>
      </div>
      
      <div className="question-text" style={{ whiteSpace: 'pre-wrap', marginBottom: '20px' }}>
        {q.number}. {q.subQuestion || q.question}
      </div>

      {q.mediaUrl && (
        <div className="media-container">
          {q.type === 'image' ? <img src={q.mediaUrl} alt="Media" /> : <video controls src={q.mediaUrl} />}
          <div style={{ marginTop: '5px', fontSize: '0.8rem', color: '#666' }}>[ 사진 1 ]</div>
        </div>
      )}

      <div className="options-list">
        {q.options.map((option) => (
          <div key={option.id} className={`option-item ${state.answers[q.id] === option.id ? 'selected' : ''}`} onClick={() => handleAnswerSelect(q.id, option.id)}>
            <div className="option-radio">{option.id}</div>
            <div className="option-text">{option.text}</div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="cbt-container" style={{ fontSize: `${state.fontSize}%` }}>
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
            <span className="font-label-main">글자<br/>크기</span>
            <div className="font-item">
              <button className={`font-btn font-btn-small ${state.fontSize === 80 ? 'active' : ''}`} onClick={() => setState(prev => ({ ...prev, fontSize: 80 }))}>가</button>
              <span className="font-percentage">80%</span>
            </div>
            <div className="font-item">
              <button className={`font-btn font-btn-medium ${state.fontSize === 100 ? 'active' : ''}`} onClick={() => setState(prev => ({ ...prev, fontSize: 100 }))}>가</button>
              <span className="font-percentage">100%</span>
            </div>
            <div className="font-item">
              <button className={`font-btn font-btn-large ${state.fontSize === 125 ? 'active' : ''}`} onClick={() => setState(prev => ({ ...prev, fontSize: 125 }))}>가</button>
              <span className="font-percentage">125%</span>
            </div>
          </div>
          <div className="layout-control" style={{ marginLeft: '15px' }}>
            <span className="font-label-main">화면<br/>배치</span>
            <div style={{ display: 'flex', gap: '5px' }}>
              <div className="font-item">
                <button className={`layout-btn-text ${state.layout === '1-pane' ? 'active' : ''}`} onClick={() => toggleLayout('1-pane')}>1단 보기</button>
              </div>
              <div className="font-item">
                <button className={`layout-btn-text ${state.layout === '2-pane' ? 'active' : ''}`} onClick={() => toggleLayout('2-pane')}>2단 보기</button>
              </div>
            </div>
          </div>
          <div className="timer-box">⏱ 시작 시간 : 09:00:00 (남은시간 {formatTime(state.timeLeft)})</div>
        </div>
      </header>

      <main className="cbt-main">
        <section className="question-area" style={{ display: 'flex', flex: 1, padding: 0 }}>
          {renderQuestion(mockQuestions[state.currentQuestionIndex])}
          {state.layout === '2-pane' && state.currentQuestionIndex + 1 < mockQuestions.length && (
            renderQuestion(mockQuestions[state.currentQuestionIndex + 1])
          )}
        </section>

        <aside className="answer-sheet">
          <div className="answer-sheet-header">답 안 표 기 란</div>
          <div className="answer-grid">
            {mockQuestions.map((q) => (
              <div key={q.id} className="answer-row">
                <div className="answer-row-num">{String(q.number).padStart(2, '0')}</div>
                <div className="answer-options-small">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <div key={num} className={`option-circle-small ${state.answers[q.id] === num ? 'selected' : ''}`} onClick={() => handleAnswerSelect(q.id, num)}>{num}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </aside>
      </main>

      <footer className="cbt-footer">
        <div className="footer-left">
          <button className="footer-btn">🧮 계산기</button>
          <button className="footer-btn">🎨 그림판</button>
        </div>
        <div className="footer-center" style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <button className="footer-btn-nav" onClick={() => navigate('prev')} disabled={state.currentQuestionIndex === 0}>◀ 이전</button>
          <span style={{ fontWeight: 'bold' }}>
            {state.layout === '2-pane' 
              ? `${state.currentQuestionIndex + 1}-${Math.min(state.currentQuestionIndex + 2, mockQuestions.length)} / ${mockQuestions.length}`
              : `${state.currentQuestionIndex + 1} / ${mockQuestions.length}`
            }
          </span>
          <button className="footer-btn-nav" onClick={() => navigate('next')} disabled={state.currentQuestionIndex >= mockQuestions.length - (state.layout === '2-pane' ? 2 : 1)}>다음 ▶</button>
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
