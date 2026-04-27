'use client';

import React, { useState, useEffect, useRef } from 'react';
import { mockQuestions } from '@/data/mockQuestions';
import { questionExplanations } from '@/data/explanations';
import { Question, ExamState } from '@/types/exam';

const INITIAL_TIME = 75 * 60; // 75 minutes
const TOTAL_QUESTIONS_TOTAL = 80; // Total exam questions

const DrawingBoard = ({ 
  onClose, 
  drawingData, 
  onSave 
}: { 
  onClose: () => void, 
  drawingData: string | null, 
  onSave: (data: string) => void 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState<'pen' | 'eraser'>('pen');
  const [color, setColor] = useState('#000000');
  const [lineWidth, setLineWidth] = useState(2);
  const lastPoint = useRef<{ x: number, y: number } | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      if (!ctx) return;

      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      if (drawingData) {
        const img = new Image();
        img.onload = () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0);
        };
        img.src = drawingData;
      }
    }
  }, [drawingData]);

  const getCoordinates = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? (e as React.TouchEvent).touches[0].clientX : (e as React.MouseEvent).clientX;
    const clientY = 'touches' in e ? (e as React.TouchEvent).touches[0].clientY : (e as React.MouseEvent).clientY;
    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  };

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    const { x, y } = getCoordinates(e);
    lastPoint.current = { x, y };
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing || !lastPoint.current || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { x, y } = getCoordinates(e);
    
    ctx.beginPath();
    ctx.globalCompositeOperation = tool === 'eraser' ? 'destination-out' : 'source-over';
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    ctx.moveTo(lastPoint.current.x, lastPoint.current.y);
    ctx.lineTo(x, y);
    ctx.stroke();
    
    lastPoint.current = { x, y };
  };

  const stopDrawing = () => {
    if (isDrawing && canvasRef.current) {
      onSave(canvasRef.current.toDataURL());
    }
    setIsDrawing(false);
    lastPoint.current = null;
  };

  const clearAll = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (ctx && canvas) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      onSave(canvas.toDataURL());
    }
  };

  return (
    <div className="drawing-modal-overlay" onClick={onClose}>
      <div className="drawing-modal" onClick={(e) => e.stopPropagation()}>
        <div className="drawing-header">
          <span className="drawing-title">그림판</span>
          <button className="drawing-close" onClick={onClose}>×</button>
        </div>
        <div className="drawing-body">
          <canvas
            ref={canvasRef}
            width={800}
            height={500}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseOut={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
            className="drawing-canvas"
          />
        </div>
        <div className="drawing-footer">
          <div className="drawing-tools-left">
            <button 
              className={`tool-icon-btn ${tool === 'pen' ? 'active' : ''}`} 
              onClick={() => setTool('pen')}
              title="펜"
            >
              ✏️
            </button>
            <button 
              className={`tool-icon-btn ${tool === 'eraser' ? 'active' : ''}`} 
              onClick={() => setTool('eraser')}
              title="지우개"
            >
              🧼
            </button>
            <div className="tool-separator"></div>
            <div className="color-palette">
              {['#000000', '#ff0000', '#0000ff', '#008000', '#ffa500', '#800080'].map(c => (
                <button
                  key={c}
                  className={`color-btn ${color === c && tool === 'pen' ? 'active' : ''}`}
                  style={{ backgroundColor: c }}
                  onClick={() => {
                    setColor(c);
                    setTool('pen');
                  }}
                />
              ))}
            </div>
            <div className="tool-separator"></div>
            <select 
              className="thickness-select" 
              value={lineWidth} 
              onChange={(e) => setLineWidth(Number(e.target.value))}
            >
              <option value={1}>1px</option>
              <option value={2}>2px</option>
              <option value={4}>4px</option>
              <option value={8}>8px</option>
              <option value={12}>12px</option>
            </select>
          </div>
          <button className="clear-all-btn" onClick={clearAll}>전체지움</button>
        </div>
      </div>
    </div>
  );
};

const MemoPad = ({ 
  visibleQuestions,
  activeQuestionId,
  memos,
  onTabSelect,
  onClose, 
  onChange, 
  onDelete 
}: { 
  visibleQuestions: Question[],
  activeQuestionId: number,
  memos: Record<number, string>,
  onTabSelect: (id: number) => void,
  onClose: () => void, 
  onChange: (id: number, text: string) => void,
  onDelete: (id: number) => void
}) => {
  return (
    <div className="memo-pad-container" onClick={(e) => e.stopPropagation()}>
      <div className="memo-header">
        <span className="memo-title">1문항 메모</span>
        <button className="memo-close" onClick={onClose}>×</button>
      </div>
      <div className="memo-tabs-bar">
        {visibleQuestions.map(q => (
          <button 
            key={q.id}
            className={`memo-tab-item ${activeQuestionId === q.id ? 'active' : ''}`}
            onClick={() => onTabSelect(q.id)}
          >
            {q.number}번
          </button>
        ))}
      </div>
      <div className="memo-body">
        <textarea 
          className="memo-textarea"
          value={memos[activeQuestionId] || ''}
          onChange={(e) => onChange(activeQuestionId, e.target.value)}
          placeholder={`${visibleQuestions.find(q => q.id === activeQuestionId)?.number}번 문항 메모 입력`}
          autoFocus
        />
      </div>
      <div className="memo-footer">
        <button className="memo-delete-btn" onClick={() => onDelete(activeQuestionId)}>내용 삭제</button>
      </div>
    </div>
  );
};

const QuestionViewModal = ({ 
  onClose, 
  questions, 
  activeTab, 
  onTabChange, 
  state, 
  onNavigate 
}: { 
  onClose: () => void, 
  questions: Question[], 
  activeTab: 'all' | 'marked' | 'unsolved', 
  onTabChange: (tab: 'all' | 'marked' | 'unsolved') => void,
  state: ExamState,
  onNavigate: (index: number) => void
}) => {
  const markedCount = questions.filter(q => state.markedQuestions.has(q.id)).length;
  const unsolvedCount = questions.filter(q => !state.answers[q.id]).length;

  const filteredQuestions = questions.filter(q => {
    if (activeTab === 'marked') return state.markedQuestions.has(q.id);
    if (activeTab === 'unsolved') return !state.answers[q.id];
    return true;
  });

  return (
    <div className="qv-modal-overlay" onClick={onClose}>
      <div className="qv-modal" onClick={(e) => e.stopPropagation()}>
        <div className="qv-header">
          <span className="qv-title">문제보기</span>
          <button className="qv-close" onClick={onClose}>×</button>
        </div>
        <div className="qv-info-bar">
          <p>※ 전체/체크/안 푼 문제 탭을 클릭하여 해당 문제를 확인할 수 있습니다.</p>
          <p>※ 문제를 더블클릭 시 해당 문제로 이동하여 답안 수정이 가능합니다.</p>
        </div>
        <div className="qv-tabs">
          <button className={`qv-tab ${activeTab === 'all' ? 'active' : ''}`} onClick={() => onTabChange('all')}>
            전체 문제 ({questions.length})
          </button>
          <button className={`qv-tab ${activeTab === 'marked' ? 'active' : ''}`} onClick={() => onTabChange('marked')}>
            체크 문제 ({markedCount})
          </button>
          <button className={`qv-tab ${activeTab === 'unsolved' ? 'active' : ''}`} onClick={() => onTabChange('unsolved')}>
            안 푼 문제 ({unsolvedCount})
          </button>
        </div>
        <div className="qv-body">
          <div className="qv-grid">
            {filteredQuestions.map(q => (
              <div 
                key={q.id} 
                className="qv-card" 
                onDoubleClick={() => onNavigate(questions.indexOf(q))}
              >
                <div className="qv-card-num">{q.number}</div>
                <div className="qv-card-content">
                  <div className="qv-card-question" dangerouslySetInnerHTML={{ __html: q.question }} />
                  
                  {q.mediaUrl && (
                    <div className="qv-card-media">
                      {q.type === 'image' ? (
                        <div className="qv-card-image-box">
                          <img src={q.mediaUrl} alt="Media" className="qv-card-img" />
                          <div className="qv-card-media-label">[사진1]</div>
                        </div>
                      ) : (
                        <div className="qv-card-video-box">
                          <div className="qv-card-video-placeholder">
                            <div className="qv-play-icon">▶</div>
                          </div>
                          <div className="qv-video-warning">이 영상은 소리가 포함되어 있습니다.</div>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="qv-card-options">
                    {q.options.map(opt => (
                      <div key={opt.id} className="qv-card-option">
                        <div className={`qv-card-radio ${state.answers[q.id] === opt.id ? 'selected' : ''}`}>{opt.id}</div>
                        <span className="qv-card-opt-text">{opt.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function CBTApp() {
  const [mounted, setMounted] = useState(false);
  const [state, setState] = useState<ExamState>({
    currentQuestionIndex: 0,
    answers: {},
    markedQuestions: new Set(),
    wrongAnswers: {},
    highlightedContent: {},
    memos: {},
    timeLeft: INITIAL_TIME,
    fontSize: 100,
    layout: '1-pane',
    highlighterMode: 'off',
    isFinished: false,
    showCalculator: false,
    showDrawingBoard: false,
    drawingData: null,
    showMemo: false,
    activeMemoQuestionId: null,
    showQuestionView: false,
    questionViewTab: 'all',
  });

  const [introStep, setIntroStep] = useState<'tutorial_start' | 'welcome_popup' | 'login_initial' | 'login_input' | 'exam' | 'final_omr_summary' | 'final_submission_popup' | 'waiting_screen' | 'results_view'>('tutorial_start');
  const [selectedResultQuestionIndex, setSelectedResultQuestionIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatCurrentTime = (date: Date) => {
    return date.toTimeString().split(' ')[0];
  };

  const formatCurrentDate = (date: Date) => {
    const y = String(date.getFullYear()).slice(2);
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}.${m}.${d}`;
  };
  const [loginData, setLoginData] = useState({ authNum: '', birth: '' });

  const isLoginActive = loginData.authNum.length === 4 && loginData.birth.length === 6;

  useEffect(() => {
    setMounted(true);
  }, []);

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

  // Memo Auto-popup logic
  useEffect(() => {
    const visibleQIds = state.layout === '2-pane'
      ? [mockQuestions[state.currentQuestionIndex]?.id, mockQuestions[state.currentQuestionIndex + 1]?.id].filter(Boolean)
      : [mockQuestions[state.currentQuestionIndex]?.id].filter(Boolean);

    const firstWithContent = visibleQIds.find(id => state.memos[id as number] && state.memos[id as number].trim() !== '');
    
    if (firstWithContent) {
      setState(prev => ({
        ...prev,
        showMemo: true,
        activeMemoQuestionId: prev.activeMemoQuestionId && visibleQIds.includes(prev.activeMemoQuestionId) 
          ? prev.activeMemoQuestionId 
          : (firstWithContent as number)
      }));
    } else {
      setState(prev => ({
        ...prev,
        showMemo: false,
        activeMemoQuestionId: visibleQIds[0] as number
      }));
    }
  }, [state.currentQuestionIndex]);

  const handleMemoChange = (id: number, text: string) => {
    setState(prev => ({
      ...prev,
      memos: { ...prev.memos, [id]: text }
    }));
  };

  const handleMemoDelete = (id: number) => {
    setState(prev => ({
      ...prev,
      memos: { ...prev.memos, [id]: '' }
    }));
  };

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

  const handleQuestionChange = (index: number) => {
    setState(prev => {
      let targetIndex = index;
      if (prev.layout === '2-pane') {
        targetIndex = Math.floor(index / 2) * 2;
      }
      return {
        ...prev,
        currentQuestionIndex: Math.max(0, Math.min(targetIndex, mockQuestions.length - 1))
      };
    });
  };

  const handleFinish = () => {
    setState(prev => ({ ...prev, isFinished: true }));
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
  const unansweredCount = TOTAL_QUESTIONS_TOTAL - answeredCount;

  // 1단계 & 2단계: 답안 표기란 및 제출 팝업
  if (introStep === 'final_omr_summary' || introStep === 'final_submission_popup') {
    return (
      <div className="final-omr-view">
        <header className="cbt-header">
          <div className="header-left">
            <div className="exam-num-badge">01</div>
            <div className="candidate-name">응시번호: 01010001<br/>성명: 김국시</div>
          </div>
          <div className="header-center">보건의료인CBT 튜토리얼 1교시</div>
          <div className="header-right">
            <div className="time-info">
              <div className="time-label">현재 날짜: {formatCurrentDate(currentTime)}</div>
              <div className="time-label">현재 시간: {formatCurrentTime(currentTime)}</div>
            </div>
            <button className="btn-end-tutorial" onClick={() => window.location.reload()}>튜토리얼 안내 종료</button>
          </div>
        </header>

        <main className="final-omr-main">
          <aside className="final-candidate-side">
            <div className="final-photo-area">
              <div className="final-photo">
                <img src="/images/candidate_silhouette.png" alt="사진" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              </div>
            </div>
            <table className="final-info-table">
              <tbody>
                <tr><td className="final-info-label">시험명</td><td>K-CBT 튜토리얼</td></tr>
                <tr><td className="final-info-label">시험일</td><td>{formatCurrentDate(currentTime)}</td></tr>
                <tr><td className="final-info-label">교시</td><td>1교시</td></tr>
                <tr><td className="final-info-label">과목</td><td>1.보건의료인 직종별 예시문항</td></tr>
                <tr><td className="final-info-label">응시번호</td><td>01010001</td></tr>
                <tr><td className="final-info-label">성명</td><td>김국시</td></tr>
                <tr><td className="final-info-label">현재 시간</td><td>{formatCurrentTime(currentTime)}</td></tr>
                <tr><td className="final-info-label">푼 문제 / 전체문제</td><td>{Object.keys(state.answers).length} / {TOTAL_QUESTIONS_TOTAL}</td></tr>
              </tbody>
            </table>
          </aside>

          <section className="final-omr-grid-area">
            <div className="final-omr-header">답 안 표 기 란 (* 현재 상태에서는 답안 수정이 불가합니다. 수정을 원하시면 시험시간 내 확인 후 문제풀이 화면으로 되돌아가서 수정하시기 바랍니다.)</div>
            <div className="final-omr-columns">
              {[0, 1, 2, 3].map(colIdx => (
                <div key={colIdx} className="final-omr-column">
                  {Array.from({ length: 20 }, (_, i) => i + 1 + (colIdx * 20)).map(num => (
                    <div key={num} className="final-omr-row">
                      <div className="final-omr-num">{String(num).padStart(2, '0')}</div>
                      <div className="final-omr-options">
                        {[1, 2, 3, 4, 5].map(opt => (
                          <div 
                            key={opt} 
                            className={`final-omr-circle ${state.answers[mockQuestions.find(mq => mq.number === num)?.id || -1] === opt ? 'selected' : ''}`}
                          >
                            {opt}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </section>
        </main>

        <footer className="final-omr-footer">
          <button className="btn-confirm-final" onClick={() => setIntroStep('final_submission_popup')}>확인</button>
        </footer>

        {introStep === 'final_submission_popup' && (
          <div className="bottom-popup-overlay">
            <div className="bottom-popup">
              <div className="bottom-popup-char">
                <img src="/images/guide_character_no_bg.png" alt="캐릭터" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              </div>
              <div className="bottom-popup-text">
                시험이 종료되었습니다. 최종 제출하시겠습니까?<br/>
                확인 버튼을 클릭하면 대기화면으로 이동합니다.
              </div>
              <div className="bottom-popup-footer">
                <button className="confirm-btn" onClick={() => setIntroStep('waiting_screen')}>확인</button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // 3단계: 교시 종료 대기 화면
  if (introStep === 'waiting_screen') {
    return (
      <div className="waiting-screen">
        <header className="cbt-header">
          <div className="header-left">
            <div className="exam-num-badge">01</div>
            <div className="candidate-name">응시번호: 01010001<br/>성명: 김국시</div>
          </div>
          <div className="header-center">보건의료인CBT 튜토리얼 1교시</div>
          <div className="header-right">
            <div className="time-info">
              <div className="time-label">현재 날짜: {formatCurrentDate(currentTime)}</div>
              <div className="time-label">현재 시간: {formatCurrentTime(currentTime)}</div>
            </div>
            <button className="btn-end-tutorial" onClick={() => window.location.reload()}>튜토리얼 안내 종료</button>
          </div>
        </header>

        <main className="waiting-main">
          <div className="waiting-card">
            <div className="waiting-header">교시 종료 대기</div>
            <div className="waiting-body">
              <div className="seat-badge-large">
                <span className="seat-badge-label">좌석번호</span>
                <span className="seat-badge-num">01</span>
              </div>
              <div className="waiting-message">
                <p className="msg-main">"수고하셨습니다.<br/>작성하신 답안이 정상적으로 제출되었습니다."</p>
                <p className="msg-sub">"교시 종료 시까지 자리에서 대기해 주세요."</p>
                <p className="msg-info">시험시간 내에는 언제든지 문제풀이 화면으로 되돌아가실 수 있습니다.</p>
              </div>
              <div className="waiting-actions">
                <button className="btn-waiting-action" onClick={() => {
                  setIntroStep('exam');
                  setState(prev => ({ ...prev, currentQuestionIndex: 0 }));
                }}>다시 풀기</button>
                <button className="btn-waiting-action" onClick={() => setIntroStep('results_view')}>정답 및 해설보기</button>
              </div>
            </div>
            <div className="waiting-footer-red">PC 임의조작 시 부정 행위 등으로 처리될 수 있습니다.</div>
          </div>
        </main>
      </div>
    );
  }

  // 4단계: 정답 및 해설보기 화면
  if (introStep === 'results_view') {
    const correctCount = mockQuestions.reduce((acc, q) => {
      const userAnswer = state.answers[q.id];
      const correctAnswer = questionExplanations[q.number]?.answer;
      return userAnswer === correctAnswer ? acc + 1 : acc;
    }, 0);

    const selectedQuestion = mockQuestions[selectedResultQuestionIndex];
    const explanation = questionExplanations[selectedQuestion.number];
    const userAnswer = state.answers[selectedQuestion.id];
    const isCorrect = userAnswer === explanation?.answer;

    return (
      <div className="results-view">
        <header className="cbt-header">
          <div className="header-left">
            <div className="exam-num-badge">01</div>
            <div className="candidate-name">응시번호: 01010001<br/>성명: 김국시</div>
          </div>
          <div className="header-center">보건의료인CBT 튜토리얼 1교시 성적</div>
          <div className="header-right">
            <div className="time-info">
              <div className="time-label">현재 날짜: {formatCurrentDate(currentTime)}</div>
              <div className="time-label">현재 시간: {formatCurrentTime(currentTime)}</div>
            </div>
            <button className="btn-end-tutorial" onClick={() => window.location.reload()}>튜토리얼 안내 종료</button>
          </div>
        </header>

        <main className="results-main">
          <section className="results-summary-card">
            <div className="score-area">
              <div className="score-label">시험 결과 요약</div>
              <div className="score-value">{correctCount} <span>/ {TOTAL_QUESTIONS_TOTAL} 문항</span></div>
            </div>
            <div className="waiting-actions" style={{ marginTop: 0 }}>
              <button className="btn-waiting-action" onClick={() => setIntroStep('waiting_screen')}>뒤로 가기</button>
            </div>
          </section>

          <section className="results-grid-container">
            <div className="results-grid">
              {mockQuestions.map((q, idx) => {
                const exp = questionExplanations[q.number];
                const uAns = state.answers[q.id];
                const correct = uAns === exp?.answer;
                return (
                  <div 
                    key={q.id} 
                    className={`result-item ${selectedResultQuestionIndex === idx ? 'active' : ''}`}
                    onClick={() => setSelectedResultQuestionIndex(idx)}
                  >
                    <span className="result-num">{q.number}</span>
                    <span className={`result-status ${correct ? 'status-correct' : 'status-wrong'}`}>
                      {correct ? '✓' : '✗'}
                    </span>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="explanation-area">
            <div className="exp-header">
              <div className="exp-num">{selectedQuestion.number}</div>
              <div className="exp-title">문항 상세 분석</div>
            </div>
            <div className="exp-body">
              <div className="exp-question-text" dangerouslySetInnerHTML={{ __html: selectedQuestion.question }} />
              
              <div className="exp-answers">
                <div className={`exp-answer-box user-ans-box ${isCorrect ? 'correct' : ''}`}>
                  <div className="ans-label">나의 선택</div>
                  <div className="ans-value">{userAnswer ? `${userAnswer}번` : '미선택'}</div>
                </div>
                <div className="exp-answer-box correct-ans-box">
                  <div className="ans-label">정답</div>
                  <div className="ans-value">{explanation?.answer}번</div>
                </div>
              </div>

              <div className="exp-text-card">
                <div className="exp-text-label">💡 핵심 해설</div>
                <div className="exp-text-content">{explanation?.text || '해설 데이터가 없습니다.'}</div>
              </div>
            </div>
          </section>
        </main>
      </div>
    );
  }

  // Introduction Flow Rendering
  if (introStep === 'tutorial_start') {
    return (
      <div className="intro-container-wrapper">
        <div className="intro-container">
          <header className="intro-header">
            K-CBT 튜토리얼
          </header>
          <div className="intro-body">
            <div className="intro-card">
              <div className="intro-logo-box">
                <img src="/images/kuksiwon_logo_full.jpg" alt="국시원" style={{ height: '105px', objectFit: 'contain' }} />
              </div>
              <div className="intro-text-card" style={{ border: '1.5px solid #e2e8f0' }}>
                <div className="intro-text-content">
                  본 튜토리얼은 <span className="intro-text-highlight">한국보건의료인국가시험 CBT</span>에 관한<br />
                  <span className="intro-text-highlight">안내 및 유의사항 숙지, 조작법</span> 등을 체험함으로써<br />
                  응시자가 <span className="intro-text-highlight">K-CBT에 적응할 수 있도록 돕는 서비스</span>입니다.
                </div>
                <div className="intro-text-footer">
                  아래의 튜토리얼 시작 버튼을 클릭하시면 튜토리얼을 진행하실 수 있습니다.
                </div>
              </div>
            </div>
          </div>
          <div className="intro-footer" style={{ marginTop: '40px' }}>
            <button className="intro-btn-primary" onClick={() => setIntroStep('welcome_popup')}>
              튜토리얼 시작
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (introStep === 'welcome_popup') {
    return (
      <div className="intro-container-wrapper">
        <div className="intro-container">
          <header className="intro-header">
            K-CBT 튜토리얼
          </header>
          <div className="intro-body" style={{ justifyContent: 'center' }}>
            <div className="welcome-popup-content">
              <img src="/images/guide_character.png" alt="Guide" className="character-guide-img" />
              <div className="speech-bubble">
                <div className="speech-text">
                  "안녕하세요. <span style={{ color: '#1A375E', fontWeight: 'bold' }}>K-CBT 튜토리얼</span>에 오신 것을 환영합니다."<br />
                  지금부터 <span style={{ fontWeight: 'bold' }}>K-CBT 튜토리얼</span>을 시작하겠습니다.
                </div>
                <button className="speech-btn" onClick={() => setIntroStep('login_initial')}>확인</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (introStep === 'login_initial' || introStep === 'login_input') {
    const isLocked = introStep === 'login_initial';
    
    return (
      <div className="intro-container-wrapper">
        <div className="intro-container" style={{ backgroundColor: '#e2e8f0' }}>
          <header className="login-header">
            <div className="login-header-left">
              <div className="seat-badge">01</div>
              <div className="candidate-info-summary">
                응시번호: 01010001<br />
                성명: 김국시
              </div>
            </div>
            <div className="login-header-center">
              <div className="time-info">
                현재 날짜 : {formatCurrentDate(currentTime)}<br />
                현재 시간 : {formatCurrentTime(currentTime)}
              </div>
              <div className="time-info">
                시작 시간 : 09:00:00
              </div>
            </div>
            <div className="login-header-right">
              <button className="tutorial-end-btn" onClick={() => setIntroStep('tutorial_start')}>튜토리얼 안내 종료</button>
              <div style={{ marginLeft: '10px', fontSize: '0.8rem' }}>⚙️ PC설정</div>
            </div>
          </header>

          <div className="intro-body">
            <div className="login-card">
              <div className="login-card-header">응시자 로그인</div>
              <div className="login-card-body">
                <div className="login-wait-text">
                  "감독관이 입실할 때까지 잠시 대기하여 주시기 바랍니다."
                </div>
                
                <div className="login-form-container">
                  <div className="candidate-photo-box">
                    <img src="/images/candidate_silhouette.png" alt="Candidate" className="candidate-photo" />
                    <div className="seat-number-badge">
                      <div style={{ fontSize: '0.8rem' }}>좌석번호</div>
                      <div className="seat-number-val">01</div>
                    </div>
                  </div>

                  <table className="login-table">
                    <tbody>
                      <tr>
                        <th>시험명</th>
                        <td>K-CBT 튜토리얼</td>
                      </tr>
                      <tr>
                        <th>시험일</th>
                        <td>2026-04-27</td>
                      </tr>
                      <tr>
                        <th>교시</th>
                        <td>1교시</td>
                      </tr>
                      <tr>
                        <th>응시번호</th>
                        <td>01010001</td>
                      </tr>
                      <tr>
                        <th>성명</th>
                        <td>김국시</td>
                      </tr>
                      <tr>
                        <th>교시인증번호</th>
                        <td>
                          <input 
                            type="text" 
                            className="login-input" 
                            placeholder="교시인증번호 4자리를 입력해 주세요."
                            disabled={isLocked}
                            maxLength={4}
                            value={loginData.authNum}
                            onChange={(e) => {
                              const val = e.target.value.replace(/[^0-9]/g, '');
                              setLoginData(prev => ({ ...prev, authNum: val }));
                            }}
                          />
                        </td>
                      </tr>
                      <tr>
                        <th>생년월일</th>
                        <td>
                          <input 
                            type="text" 
                            className="login-input" 
                            placeholder="생년월일 6자리를 입력해 주세요."
                            disabled={isLocked}
                            maxLength={6}
                            value={loginData.birth}
                            onChange={(e) => {
                              const val = e.target.value.replace(/[^0-9]/g, '');
                              setLoginData(prev => ({ ...prev, birth: val }));
                            }}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                <div className="login-help-text">
                  ※ 교시인증번호는 감독관이 각 교시 시작 전 별도로 안내할 예정입니다.<br />
                  ※ 생년월일 6자리를 입력해 주세요. 예) 901010
                </div>
              </div>
              <div className="login-footer-card">
                <button 
                  className={`btn-login ${isLoginActive && !isLocked ? 'active' : ''}`}
                  disabled={!isLoginActive || isLocked}
                  onClick={() => setIntroStep('exam')}
                >
                  로그인
                </button>
              </div>
            </div>
          </div>

          {isLocked && (
            <div className="bottom-character-popup">
              <img src="/images/guide_character.png" alt="Guide" className="bottom-popup-character" />
              <div className="bottom-popup-text">
                본 튜토리얼은 <span style={{ fontWeight: 'bold' }}>K-CBT 시험을 직접 체험할 수 있는 서비스</span>입니다.<br />
                임의의 <span style={{ color: '#3182ce', fontWeight: 'bold' }}>교시인증번호(무작위 숫자 4자리)</span>와 <span style={{ color: '#3182ce', fontWeight: 'bold' }}>생년월일(무작위 숫자 6자리)</span>을 입력하여 로그인해 보세요.
              </div>
              <button className="bottom-popup-btn" onClick={() => setIntroStep('login_input')}>확인</button>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (state.isFinished) {
    return (
      <div className="cbt-container" style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#f0f2f5' }}>
        <div style={{ background: 'white', padding: '40px', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', textAlign: 'center', maxWidth: '500px', width: '90%' }}>
          <h2 style={{ fontSize: '2rem', color: '#1e3a5f', marginBottom: '20px' }}>시험이 종료되었습니다</h2>
          <div style={{ fontSize: '1.2rem', marginBottom: '30px', color: '#4a5568' }}>
            <p>총 문항 수: {TOTAL_QUESTIONS_TOTAL}</p>
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
      style={{ flex: 1, borderRight: state.layout === '2-pane' ? '1px solid #eee' : 'none' }}
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
            <button 
              className={`tool-btn ${state.showMemo && state.activeMemoQuestionId === q.id ? 'active' : ''}`}
              onClick={() => setState(prev => ({ 
                ...prev, 
                showMemo: true,
                activeMemoQuestionId: q.id
              }))}
            >
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
                __html: state.highlightedContent[q.id] || q.text || q.question || ''
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
          {q.options.map((opt) => {
            const isWrong = state.wrongAnswers[q.id]?.has(opt.id);
            return (
              <div key={opt.id} className="option-row">
                <div className={`option-item ${state.answers[q.id] === opt.id ? 'selected' : ''}`} onClick={() => handleAnswerSelect(q.id, opt.id)}>
                  <div className="option-radio">{opt.id}</div>
                  <div className={`option-text ${isWrong ? 'wrong-mark' : ''}`}>{opt.text}</div>
                </div>
                <div className="wrong-btn-wrapper">
                  <button
                    className={`wrong-btn ${isWrong ? 'active' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWrongAnswer(q.id, opt.id);
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
          <h1 className="cbt-title">보건의료인CBT 튜토리얼 1교시</h1>
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
          <div className="exam-timer-wrapper">
            <div className="timer-info-top">
              <span className="timer-limit">제한시간 : 75분</span>
              <span className="timer-remain">남은시간 : <span className="red-text">{formatTime(state.timeLeft)}</span></span>
            </div>
            <div className="timer-gauge-container">
              <div 
                className="timer-gauge-fill-red" 
                style={{ width: `${(state.timeLeft / INITIAL_TIME) * 100}%` }}
              />
            </div>
          </div>
          <div className="start-time-text">시작 시간 : 09:00:00</div>
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
            {Array.from({ length: TOTAL_QUESTIONS_TOTAL }, (_, i) => i + 1).map((num) => {
              const isActive = num <= mockQuestions.length;
              const q = mockQuestions.find(mq => mq.number === num);
              return (
                <div key={num} className={`answer-row ${!isActive ? 'omr-disabled' : ''}`}>
                  <div className="answer-row-left">
                    <div className="memo-column">
                      {q && state.memos[q.id] && state.memos[q.id].trim() !== '' && (
                        <span className="omr-memo-dot">●</span>
                      )}
                    </div>
                    <div className="check-column">
                      {q && state.markedQuestions.has(q.id) && <span className="red-check-small">✓</span>}
                    </div>
                    <div className="answer-row-num">
                      {String(num).padStart(2, '0')}
                    </div>
                  </div>
                  <div className="answer-options-small">
                    {[1, 2, 3, 4, 5].map((opt) => (
                      <div 
                        key={opt} 
                        className={`option-circle-small ${q && state.answers[q.id] === opt ? 'selected' : ''}`} 
                        onClick={() => isActive && q && handleAnswerSelect(q.id, opt)}
                      >
                        {opt}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </aside>

      </main>

      {/* Modals outside main for better stacking context */}
      {mounted && state.showCalculator && (
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

      {mounted && state.showDrawingBoard && (
        <DrawingBoard
          onClose={() => setState(prev => ({ ...prev, showDrawingBoard: false }))}
          drawingData={state.drawingData}
          onSave={(data) => setState(prev => ({ ...prev, drawingData: data }))}
        />
      )}

      {mounted && state.showQuestionView && (
        <QuestionViewModal
          onClose={() => setState(prev => ({ ...prev, showQuestionView: false }))}
          questions={mockQuestions}
          activeTab={state.questionViewTab}
          onTabChange={(tab) => setState(prev => ({ ...prev, questionViewTab: tab }))}
          state={state}
          onNavigate={(index) => setState(prev => ({ ...prev, currentQuestionIndex: index, showQuestionView: false }))}
        />
      )}

      {mounted && state.showMemo && (
        <MemoPad
          visibleQuestions={
            state.layout === '2-pane'
              ? [mockQuestions[state.currentQuestionIndex], mockQuestions[state.currentQuestionIndex + 1]].filter(Boolean)
              : [mockQuestions[state.currentQuestionIndex]]
          }
          activeQuestionId={state.activeMemoQuestionId || mockQuestions[state.currentQuestionIndex].id}
          memos={state.memos}
          onTabSelect={(id) => setState(prev => ({ ...prev, activeMemoQuestionId: id }))}
          onClose={() => setState(prev => ({ ...prev, showMemo: false }))}
          onChange={handleMemoChange}
          onDelete={handleMemoDelete}
        />
      )}

      <footer className="cbt-footer">
        <div className="footer-left">
          <button className="footer-tool-btn" onClick={() => setState(prev => ({ ...prev, showCalculator: !prev.showCalculator }))}>
            <span className="footer-icon">🖩</span> 계산기
          </button>
          <button className="footer-tool-btn" onClick={() => setState(prev => ({ ...prev, showDrawingBoard: !prev.showDrawingBoard }))}>
            <span className="footer-icon">🖍</span> 그림판
          </button>
        </div>
        <div className="footer-center" style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          <button className="footer-btn nav-btn" onClick={() => navigate('prev')}>◀ 이전</button>
          <div className="footer-status">
            {state.layout === '2-pane' 
              ? `${state.currentQuestionIndex + 1}~${Math.min(state.currentQuestionIndex + 2, mockQuestions.length)} / ${mockQuestions.length}`
              : `${state.currentQuestionIndex + 1} / ${mockQuestions.length}`
            }
          </div>
          <button 
            className="footer-btn nav-btn" 
            onClick={() => navigate('next')}
            style={{ visibility: (state.currentQuestionIndex + (state.layout === '2-pane' ? 1 : 0) >= mockQuestions.length - 1) ? 'hidden' : 'visible' }}
          >
            다음 ▶
          </button>
        </div>
        <div className="footer-right">
          <button className="action-btn-v2" onClick={() => setState(prev => ({ ...prev, showQuestionView: true, questionViewTab: 'all' }))}>전체 문제 ({TOTAL_QUESTIONS_TOTAL})</button>
          <button className="action-btn-v2" onClick={() => setState(prev => ({ ...prev, showQuestionView: true, questionViewTab: 'marked' }))}>✔️ 체크 문제 ({state.markedQuestions.size})</button>
          <button className="action-btn-v2" onClick={() => setState(prev => ({ ...prev, showQuestionView: true, questionViewTab: 'unsolved' }))}>📓 안푼 문제 ({TOTAL_QUESTIONS_TOTAL - Object.keys(state.answers).length})</button>
          <button className="action-btn-v2 submit-btn-v2" onClick={() => setIntroStep('final_omr_summary')}>☑ 답안 제출</button>
        </div>
      </footer>
    </div>
  );
}
