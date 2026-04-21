'use client';

import React, { useState, useEffect } from 'react';
import { mockQuestions } from '@/data/mockQuestions';
import { Question, ExamState } from '@/types/exam';

export default function CBTApp() {
  const [state, setState] = useState<ExamState>({
    currentQuestionIndex: 0,
    answers: {},
    markedQuestions: new Set(),
    wrongAnswers: {},
    highlightedContent: {},
    memos: {},
    timeLeft: 3600,
    fontSize: 100,
    layout: '1-pane',
    highlighterMode: 'off',
    isFinished: false,
    showCalculator: false,
  });

  const [calcState, setCalcState] = useState({
    display: '0',
    prevValue: null as number | null,
    operator: null as string | null,
    waitingForOperand: false
  });

  const handleCalcNumber = (num: string) => {
    setCalcState(prev => {
      const display = prev.waitingForOperand || prev.display === '0' ? num : prev.display + num;
      return { ...prev, display, waitingForOperand: false };
    });
  };

  const handleCalcOperator = (op: string) => {
    setCalcState(prev => {
      const current = parseFloat(prev.display);
      if (prev.prevValue === null) {
        return { ...prev, prevValue: current, operator: op, waitingForOperand: true };
      }
      if (prev.operator) {
        const result = performCalculation(prev.prevValue, current, prev.operator);
        return { ...prev, display: String(result), prevValue: result, operator: op, waitingForOperand: true };
      }
      return { ...prev, operator: op, waitingForOperand: true };
    });
  };

  const performCalculation = (first: number, second: number, op: string) => {
    switch (op) {
      case '+': return first + second;
      case '-': return first - second;
      case '*': return first * second;
      case '/': return first / second;
      default: return second;
    }
  };

  const handleCalcEquals = () => {
    setCalcState(prev => {
      if (prev.operator && prev.prevValue !== null) {
        const current = parseFloat(prev.display);
        const result = performCalculation(prev.prevValue, current, prev.operator);
        return { ...prev, display: String(result), prevValue: null, operator: null, waitingForOperand: true };
      }
      return prev;
    });
  };

  const handleCalcClear = () => setCalcState({ display: '0', prevValue: null, operator: null, waitingForOperand: false });
  const handleCalcBS = () => setCalcState(prev => ({ ...prev, display: prev.display.length > 1 ? prev.display.slice(0, -1) : '0' }));
  const handleCalcPercent = () => setCalcState(prev => ({ ...prev, display: String(parseFloat(prev.display) / 100) }));
  const handleCalcDot = () => setCalcState(prev => ({ ...prev, display: prev.display.includes('.') ? prev.display : prev.display + '.' }));

  const [showVolumePopup, setShowVolumePopup] = useState(false);
  const [volume, setVolume] = useState(50);

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

  const toggleMark = (questionId: number) => {
    setState((prev) => {
      const newMarked = new Set(prev.markedQuestions);
      if (newMarked.has(questionId)) {
        newMarked.delete(questionId);
      } else {
        newMarked.add(questionId);
      }
      return { ...prev, markedQuestions: newMarked };
    });
  };

  const toggleWrongAnswer = (questionId: number, optionId: number) => {
    setState((prev) => {
      const newWrong = { ...prev.wrongAnswers };
      if (!newWrong[questionId]) {
        newWrong[questionId] = new Set();
      }
      const optionSet = new Set(newWrong[questionId]);
      if (optionSet.has(optionId)) {
        optionSet.delete(optionId);
      } else {
        optionSet.add(optionId);
      }
      newWrong[questionId] = optionSet;
      return { ...prev, wrongAnswers: newWrong };
    });
  };

  const handleHighlight = (questionId: number, e: React.MouseEvent) => {
    if (state.highlighterMode !== 'on') return;

    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0 || selection.isCollapsed) return;

    const range = selection.getRangeAt(0);
    const span = document.createElement('span');
    span.className = 'cbt-highlight';
    span.style.backgroundColor = '#DFFF00';

    try {
      range.surroundContents(span);

      // Save updated HTML to state
      const target = e.currentTarget as HTMLElement;
      const textContainer = target.querySelector('.question-text');
      if (textContainer) {
        setState(prev => ({
          ...prev,
          highlightedContent: {
            ...prev.highlightedContent,
            [questionId]: textContainer.innerHTML
          }
        }));
      }
    } catch (e) {
      console.log("Cannot highlight across multiple elements");
    }
    selection.removeAllRanges();
  };

  const clearAllHighlights = (questionId?: number) => {
    const qIdsToClear = questionId ? [questionId] : (
      state.layout === '2-pane'
        ? [mockQuestions[state.currentQuestionIndex].id, mockQuestions[state.currentQuestionIndex + 1]?.id].filter(Boolean)
        : [mockQuestions[state.currentQuestionIndex].id]
    );

    setState(prev => {
      const newContent = { ...prev.highlightedContent };
      qIdsToClear.forEach(id => delete newContent[id as number]);
      return { ...prev, highlightedContent: newContent };
    });

    // Also clear from DOM immediately for visual feedback
    const highlights = document.querySelectorAll('.cbt-highlight');
    highlights.forEach(h => {
      const parent = h.parentNode;
      if (parent) {
        while (h.firstChild) parent.insertBefore(h.firstChild, h);
        parent.removeChild(h);
      }
    });
  };

  useEffect(() => {
    // We no longer clear all highlights when switching mode to 'off'
    // as per the latest instruction: keep highlights when off.
  }, [state.highlighterMode]);

  useEffect(() => {
    // Mode-based individual erase is removed. 
    // Erase is now an immediate action via the button.
  }, [state.highlighterMode]);

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
    <div
      key={q.id}
      className={`question-content ${state.highlighterMode === 'on' ? 'cursor-pencil' : ''}`}
      style={{ flex: 1, padding: '40px 0', borderRight: state.layout === '2-pane' ? '1px solid #eee' : 'none' }}
      onMouseUp={(e) => handleHighlight(q.id, e)}
    >
      <div className="question-inner">
        <div className="question-header-row">
          <h2 className="question-title-main">문항풀이 연습</h2>
          <div className="tool-btns-top">
            <button
              className={`tool-btn ${state.markedQuestions.has(q.id) ? 'active' : ''}`}
              onClick={() => toggleMark(q.id)}
            >
              <span className={`tool-icon-check ${state.markedQuestions.has(q.id) ? 'active' : ''}`}>✓</span>
              <span className="tool-text">체크문제</span>
            </button>
            <button className="tool-btn">
              <span className="tool-icon-memo">📝</span>
              <span className="tool-text">메모</span>
            </button>
          </div>
        </div>

        <div className="question-instruction">가장 적합한 답을 하나만 고르시오.</div>

        <div className="question-main-container">
          <div className="question-text-container">
            <div className="question-num-wrapper">
              {state.markedQuestions.has(q.id) && <span className="red-check-main">✓</span>}
              <span className="question-num">{q.number}.</span>
            </div>
            <div
              className="question-text"
              dangerouslySetInnerHTML={{
                __html: state.highlightedContent[q.id] || (q.subQuestion || q.question)
              }}
            />
          </div>

          <div className="highlighter-btns-side">
            <button
              className={`tool-btn-small ${state.highlighterMode === 'on' ? 'active-green' : ''}`}
              onClick={() => setState(prev => ({ ...prev, highlighterMode: prev.highlighterMode === 'on' ? 'off' : 'on' }))}
            >
              형광펜<br />{state.highlighterMode === 'on' ? '꺼짐' : '켜짐'}
            </button>
            <button
              className="tool-btn-small"
              onClick={() => clearAllHighlights(q.id)}
            >
              형광펜<br />지우기
            </button>
          </div>
        </div>

        {q.mediaUrl && (
          <div className="media-container">
            {q.type === 'image' ? (
              <img src={q.mediaUrl} alt="Media" />
            ) : (
              <div className="video-section">
                <video
                  autoPlay
                  muted
                  controls
                  src={q.mediaUrl}
                />
                <div className="video-controls-row">
                  <span className="video-info-text">이 영상은 소리가 포함되어 있습니다.</span>
                  <div className="volume-control-wrapper">
                    <button className="volume-toggle-btn" onClick={() => setShowVolumePopup(!showVolumePopup)}>
                      PC 볼륨 조절 ▾
                    </button>
                    {showVolumePopup && (
                      <div className="volume-popup">
                        <div className="volume-popup-header">
                          PC 마스터 볼륨 조절 <span className="volume-warning">(* 튜토리얼에서는 작동하지 않습니다.)</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={volume}
                          onChange={(e) => setVolume(Number(e.target.value))}
                          className="volume-slider"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
            {q.type === 'image' && <div style={{ marginTop: '10px', fontSize: '0.9em', color: '#333', fontWeight: '500' }}>[사진1]</div>}
          </div>
        )}

        <div className="options-list">
          {q.options.map((option) => {
            const isWrong = state.wrongAnswers[q.id]?.has(option.id);
            return (
              <div key={option.id} className="option-row">
                <div className={`option-item ${state.answers[q.id] === option.id ? 'selected' : ''}`} onClick={() => handleAnswerSelect(q.id, option.id)}>
                  <div className="option-radio">{option.id}</div>
                  <div className={`option-text ${isWrong ? 'wrong-mark' : ''}`}>{option.text}</div>
                </div>
                <div className="wrong-btn-wrapper">
                  <button
                    className={`wrong-btn ${isWrong ? 'active' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWrongAnswer(q.id, option.id);
                    }}
                  >
                    {isWrong ? '해제' : '오답'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  return (
    <div className="cbt-container">
      <header className="cbt-header">
        <div className="cbt-header-left">
          <div className="cbt-exam-number">01</div>
          <div className="cbt-user-info">
            <div>응시번호: 01010001</div>
            <div>성명: 김국시</div>
          </div>
          <h1 className="cbt-title">보건의료인 CBT 문항풀이 연습</h1>
        </div>
        <div className="cbt-header-right">
          <div className="cbt-controls">
            <div className="font-control">
              <span className="font-label-main">글자<br />크기</span>
              <div className="font-item">
                <button className={`font-btn ${state.fontSize === 80 ? 'active' : ''}`} onClick={() => setState(prev => ({ ...prev, fontSize: 80 }))}>가</button>
                <span className="font-percentage">80%</span>
              </div>
              <div className="font-item">
                <button className={`font-btn ${state.fontSize === 100 ? 'active' : ''}`} onClick={() => setState(prev => ({ ...prev, fontSize: 100 }))}>가</button>
                <span className="font-percentage">100%</span>
              </div>
              <div className="font-item">
                <button className={`font-btn ${state.fontSize === 125 ? 'active' : ''}`} onClick={() => setState(prev => ({ ...prev, fontSize: 125 }))}>가</button>
                <span className="font-percentage">125%</span>
              </div>
            </div>

            <div className="header-separator"></div>

            <div className="header-tool">
              <span className="font-label-main">화면<br />배치</span>
              <div className="layout-switcher">
                <div className="layout-item" onClick={() => toggleLayout('1-pane')}>
                  <div className={`layout-icon pane-1 ${state.layout === '1-pane' ? 'selected' : ''}`}></div>
                  <span className="layout-label">1단 보기</span>
                </div>
                <div className="layout-item" onClick={() => toggleLayout('2-pane')}>
                  <div className={`layout-icon pane-2 ${state.layout === '2-pane' ? 'selected' : ''}`}></div>
                  <span className="layout-label">2단 보기</span>
                </div>
              </div>
            </div>
          </div>
          <div className="timer-box">⏱ 시작 시간 : 09:00:00 (남은시간 {formatTime(state.timeLeft)})</div>
        </div>
      </header>

      <main className="cbt-main">
        <section className="question-area" style={{ display: 'flex', flex: 1, padding: 0, fontSize: `${state.fontSize}%` }}>
          {renderQuestion(mockQuestions[state.currentQuestionIndex])}
          {state.layout === '2-pane' && state.currentQuestionIndex + 1 < mockQuestions.length && (
            renderQuestion(mockQuestions[state.currentQuestionIndex + 1])
          )}
        </section>

        <aside className="answer-sheet">
          <div className="answer-sheet-header">답 안 표 기 란</div>
          <div className="answer-grid">
            {mockQuestions.map((q, index) => (
              <div key={q.id} className="answer-row">
                <div className="answer-row-left">
                  <div className="check-column">
                    {state.markedQuestions.has(q.id) && <span className="red-check-small">✓</span>}
                  </div>
                  <div className="answer-row-num">
                    {String(q.number).padStart(2, '0')}
                  </div>
                </div>
                <div className="answer-options-small">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <div key={num} className={`option-circle-small ${state.answers[q.id] === num ? 'selected' : ''}`} onClick={() => handleAnswerSelect(q.id, num)}>{num}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </aside>

        {state.showCalculator && (
          <div className="calculator-popup">
            <div className="calc-header">
              <span>계산기</span>
              <button className="calc-close" onClick={() => setState(prev => ({ ...prev, showCalculator: false }))}>×</button>
            </div>
            <div className="calc-body">
              <div className="calc-display">{calcState.display}</div>
              <div className="calc-buttons">
                <button className="calc-btn func" onClick={handleCalcClear}>CA</button>
                <button className="calc-btn func" onClick={handleCalcBS}>BS</button>
                <button className="calc-btn func" onClick={handleCalcPercent}>%</button>
                <button className="calc-btn func op" onClick={() => handleCalcOperator('/')}>/</button>
                
                <button className="calc-btn num" onClick={() => handleCalcNumber('7')}>7</button>
                <button className="calc-btn num" onClick={() => handleCalcNumber('8')}>8</button>
                <button className="calc-btn num" onClick={() => handleCalcNumber('9')}>9</button>
                <button className="calc-btn func op" onClick={() => handleCalcOperator('*')}>*</button>
                
                <button className="calc-btn num" onClick={() => handleCalcNumber('4')}>4</button>
                <button className="calc-btn num" onClick={() => handleCalcNumber('5')}>5</button>
                <button className="calc-btn num" onClick={() => handleCalcNumber('6')}>6</button>
                <button className="calc-btn func op" onClick={() => handleCalcOperator('-')}>-</button>
                
                <button className="calc-btn num" onClick={() => handleCalcNumber('1')}>1</button>
                <button className="calc-btn num" onClick={() => handleCalcNumber('2')}>2</button>
                <button className="calc-btn num" onClick={() => handleCalcNumber('3')}>3</button>
                <button className="calc-btn func op" onClick={() => handleCalcOperator('+')}>+</button>
                
                <button className="calc-btn num zero" onClick={() => handleCalcNumber('0')}>0</button>
                <button className="calc-btn num" onClick={handleCalcDot}>.</button>
                <button className="calc-btn equals" onClick={handleCalcEquals}>=</button>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="cbt-footer">
        <div className="footer-left">
          <button className={`footer-btn ${state.showCalculator ? 'active-footer' : ''}`} onClick={() => setState(prev => ({ ...prev, showCalculator: !prev.showCalculator }))}>🧮 계산기</button>
          <button className="footer-btn">🎨 그림판</button>
        </div>
        <div className="footer-center" style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          {state.currentQuestionIndex > 0 && (
            <button className="footer-btn-nav" onClick={() => navigate('prev')}>◀ 이전</button>
          )}
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
          <div className="status-badge">✔️ 체크 문제 ({state.markedQuestions.size})</div>
          <div className="status-badge">📓 안푼 문제 ({unansweredCount})</div>
          <button className="exit-btn" onClick={() => setState(prev => ({ ...prev, isFinished: true }))}>↪ 연습 종료</button>
        </div>
      </footer>
    </div>
  );
}
