import { Question } from '../types/exam';

export const mockQuestions: Question[] = [
  // ... (1-60 are already there, but I need to write the whole file to keep it consistent)
  // I will skip showing 1-60 in thought but I must include them in the write_to_file.
  // Actually, I'll just append 61-80 to the previous content.
  {
    id: 1,
    number: 1,
    type: 'text',
    question: '다음 그림은 말운동 정보를 근육에 전달하는 운동경로를 나타낸 것이다. 실선으로 표기된 경로의 이름은?',
    options: [
      { id: 1, text: '피질뇌간로' },
      { id: 2, text: '피질척수로' },
      { id: 3, text: '적핵척수로' },
      { id: 4, text: '망상체척수로' },
      { id: 5, text: '기저핵조절회로' }
    ],
    correctAnswer: 1
  },
  {
    id: 2,
    number: 2,
    type: 'text',
    question: '다음은 55세 뇌손상 환자의 운동 평가 결과이다. 다음 증상을 유발하는 손상 부위는?<div class="question-info-box">• 근육긴장저하<br/>• 움직임 시 떨림<br/>• 보행이 불안정함<br/>• 손바닥과 손등을 번갈아 뒤집게 했을 때 정확도가 낮고, 속도가 비정상적임</div>',
    options: [
      { id: 1, text: '시상' },
      { id: 2, text: '소뇌' },
      { id: 3, text: '해마' },
      { id: 4, text: '두정엽' },
      { id: 5, text: '측두엽' }
    ],
    correctAnswer: 2
  },
  {
    id: 3,
    number: 3,
    type: 'text',
    question: '환자에게 /아/를 짧게 끊어 여러 번 소리 내도록 하였을 때, 연구개와 목젖이 환자의 왼쪽으로 치우쳐 끌려 올라갔다. 손상된 뇌신경은?',
    options: [
      { id: 1, text: '왼쪽 7번' },
      { id: 2, text: '왼쪽 9번' },
      { id: 3, text: '왼쪽 10번' },
      { id: 4, text: '오른쪽 7번' },
      { id: 5, text: '오른쪽 9번' }
    ],
    correctAnswer: 3
  },
  {
    id: 4,
    number: 4,
    type: 'text',
    question: '다음 특성을 보이는 뇌경색 환자의 손상 부위는?<div class="question-info-box">• 시력은 정상임<br/>• 단어의 어휘성이나 자소-음소 일치 여부에 상관없이 읽기 수행이 저하됨<br/>• 글자를 쓰는 데 어려움이 없음</div>',
    options: [
      { id: 1, text: '내경동맥' },
      { id: 2, text: '외경동맥' },
      { id: 3, text: '후대뇌동맥' },
      { id: 4, text: '중대뇌동맥' },
      { id: 5, text: '전대뇌동맥' }
    ],
    correctAnswer: 3
  },
  {
    id: 5,
    number: 5,
    type: 'text',
    question: '뇌졸중에 대한 설명으로 옳은 것은?',
    options: [
      { id: 1, text: '허혈성 뇌졸중의 대표적인 원인은 관류저하이다.' },
      { id: 2, text: '출혈성 뇌졸중의 발생 빈도가 허혈성 뇌졸중에 비해 높다.' },
      { id: 3, text: '뇌내출혈의 주된 원인은 외상이며, 대부분 수술적 처치가 필요하다.' },
      { id: 4, text: '색전증은 핏덩어리 조각이 작은 혈관을 막아서 갑작스럽게 발생한다.' },
      { id: 5, text: '혈전증은 큰 혈관이 갈라지는 곳에서 혈관벽을 풍선 모양으로 부풀게 한다.' }
    ],
    correctAnswer: 4
  },
  {
    id: 6,
    number: 6,
    type: 'text',
    question: '다음은 뇌자기공명영상(B-MRI)에서 양측 선조체에 저음영을 보이는 환자의 말 특성이다. 이 환자의 증상은?<div class="question-info-box"><table class="question-table"><tr><td class="table-label">검사자:</td><td>"몇 시에 약을 드세요?"</td></tr><tr><td class="table-label">환자:</td><td>"나는 약을 12시에, 12시에 먹어야, 12시에 먹어야, 먹어야 해"</td></tr></table></div>',
    options: [
      { id: 1, text: '반향어증' },
      { id: 2, text: '실구어증' },
      { id: 3, text: '동어반복증' },
      { id: 4, text: '감금증후군' },
      { id: 5, text: '발성실행증' }
    ],
    correctAnswer: 3
  },
  {
    id: 7,
    number: 7,
    type: 'text',
    question: '다음 설명에 해당하는 검사는?<div class="question-info-box">• 실어증 유무, 유형 확인 가능함<br/>• 언어범주에서는 그림 설명하기, 듣고 이해하기, 따라말하기, 이름대기 등 구어 능력과 읽기와 쓰기 등 문어 능력을 평가함<br/>• 말범주에서는 말실행증, 구강실행증, 모음연장발성, 말 명료도를 평가함</div>',
    options: [
      { id: 1, text: '한국판 간이정신상태검사(K-MMSE)' },
      { id: 2, text: '한국 실어증 감별진단 검사(KTDDA)' },
      { id: 3, text: '한국판 몬트리올 인지 평가(K-MOCA)' },
      { id: 4, text: '실어증-신경언어장애 선별검사(STAND)' },
      { id: 5, text: '파라다이스 한국판 웨스턴 실어증 검사(PK-WAB-R)' }
    ],
    correctAnswer: 5
  },
  {
    id: 8,
    number: 8,
    type: 'text',
    question: '다음 환자가 보이는 증상은?<div class="question-info-box"><table class="question-table"><tr><td class="table-label">검사자:</td><td>(고양이 사진을 제시하며) 이것은 이름이 무엇입니까?</td></tr><tr><td class="table-label">환자:</td><td>강아지</td></tr><tr><td class="table-label">검사자:</td><td>(자동차 사진을 제시하며) 이것은 이름이 무엇입니까?</td></tr><tr><td class="table-label">환자:</td><td>강아지</td></tr><tr><td class="table-label">검사자:</td><td>(연필 사진을 제시하며) 이것은 이름이 무엇입니까?</td></tr><tr><td class="table-label">환자:</td><td>강아지</td></tr></table><br/>(잠시 휴식 후)<br/><table class="question-table"><tr><td class="table-label">검사자:</td><td>(장미 사진을 제시하며) 이것은 이름이 무엇입니까?</td></tr><tr><td class="table-label">환자:</td><td>이거.... 이거. 그거잖아. 그거.</td></tr></table></div>',
    options: [
      { id: 1, text: '보속증' },
      { id: 2, text: '에두르기' },
      { id: 3, text: '형식착어증' },
      { id: 4, text: '신조착어증' },
      { id: 5, text: '음소착어증' }
    ],
    correctAnswer: 1
  },
  {
    id: 9,
    number: 9,
    type: 'text',
    question: '다음 양상을 보이는 환자의 실어증 유형은?<div class="question-info-box">• 검사자의 질문에 문장 수준으로 대답함<br/>• 그림을 보고 설명할 때 다양한 착어가 관찰됨<br/>• 검사자의 구두지시에 수행이 어려움<br/>• 검사자의 말을 따라하기가 어려움<br/>• 검사자가 제시하는 사물의 이름대기가 어려움</div>',
    options: [
      { id: 1, text: '명칭실어증' },
      { id: 2, text: '전도실어증' },
      { id: 3, text: '전반실어증' },
      { id: 4, text: '베르니케실어증' },
      { id: 5, text: '연결피질감각실어증' }
    ],
    correctAnswer: 4
  },
  {
    id: 10,
    number: 10,
    type: 'text',
    question: '다음은 파라다이스 한국판 웨스턴 실어증 검사(PK-WAB-R) 결과이다. 이 환자의 실어증 유형은?<div class="question-info-box">• AQ: 37점<br/>• 스스로 말하기: 6/20점(유창성 3점, 내용전달 3점)<br/>• 알아듣기: 2.6/10점<br/>• 따라말하기: 7.4/10점<br/>• 이름대기: 2.5/10점</div>',
    options: [
      { id: 1, text: '브로카실어증' },
      { id: 2, text: '베르니케실어증' },
      { id: 3, text: '혼합연결피질실어증' },
      { id: 4, text: '연결피질감각실어증' },
      { id: 5, text: '연결피질운동실어증' }
    ],
    correctAnswer: 3
  },
  {
    id: 11,
    number: 11,
    type: 'text',
    question: '다음 양상을 보이는 환자의 실독증 유형은?<div class="question-info-box">• \'거차시마\'를 읽는 데 어려움이 없음<br/>• \'삼천리\', \'같이\', \'국물\'을 읽는 데 어려움이 있음<br/>• \'언니가 오빠를 만나러 간다\'를 읽는 데 어려움이 없음</div>',
    options: [
      { id: 1, text: '심층실독증' },
      { id: 2, text: '어휘실독증' },
      { id: 3, text: '음운실독증' },
      { id: 4, text: '무시실독증' },
      { id: 5, text: '주의력실독증' }
    ],
    correctAnswer: 2
  },
  {
    id: 12,
    number: 12,
    type: 'text',
    question: '다음 뇌졸중 환자가 보이는 읽기 장애에 대한 설명으로 옳은 것은?<div class="question-info-box">• 좌측 실비안종열 주변 영역, 좌측 두정엽 영역 손상<br/>• \'시간\'을 /시계/, \'백열등\'을 /형광등/, \'그래서\'를 /그리고/라고 읽음<br/>• 구체어보다 추상어 읽기가 어려움</div>',
    options: [
      { id: 1, text: '말초형 실독증에 속한다.' },
      { id: 2, text: '순수 실독증이라고도 부른다.' },
      { id: 3, text: '낱글자 읽기 현상이 관찰된다.' },
      { id: 4, text: '오른쪽에 제시된 목표자극만 읽는다.' },
      { id: 5, text: '비단어 읽기 시 어휘화 오류를 보인다.' }
    ],
    correctAnswer: 5
  },
  {
    id: 13,
    number: 13,
    type: 'text',
    question: '다음 실어증 환자에게 우선적으로 적용할 치료 방법은?<div class="question-info-box"><table class="question-table"><tr><td class="table-label">검사자:</td><td>직업이 무엇입니까?</td></tr><tr><td class="table-label">환자:</td><td>일...점...어...아... . 질. 다.</td></tr></table><br/><table class="question-table"><tr><td class="table-label">검사자:</td><td>코끼리가 쥐보다 큽니까?</td></tr><tr><td class="table-label">환자:</td><td>(긍정의 뜻으로 고개를 끄덕이며) 음...니.</td></tr></table><br/><table class="question-table"><tr><td class="table-label">검사자:</td><td>볼펜으로 책을 가리키세요.</td></tr><tr><td class="table-label">환자:</td><td>(정반응을 보임)</td></tr></table><br/><table class="question-table"><tr><td class="table-label">검사자:</td><td>따라 말해 보세요. 삼십과 이분의 일</td></tr><tr><td class="table-label">환자:</td><td>따십. 파. 시. 빌... 에. 일.</td></tr></table></div>',
    options: [
      { id: 1, text: '인정요법' },
      { id: 2, text: '멜로디억양치료' },
      { id: 3, text: '시간차회상훈련' },
      { id: 4, text: '베르니케실어증치료' },
      { id: 5, text: '실어증문장산출프로그램' }
    ],
    correctAnswer: 2
  },
  {
    id: 14,
    number: 14,
    type: 'text',
    question: '다음 환자에게 적절한 치료 방법은?<div class="question-info-box">• 파라다이스 한국판 웨스턴 실어증 검사(PK-WAB-R) 결과<br/>-스스로 말하기: 15/20점(유창성 7점, 내용전달 8점)<br/>-알아듣기: 8/10점<br/>-따라말하기: 8.8/10점<br/>-이름대기: 6/10점</div>',
    options: [
      { id: 1, text: '의미자질분석법을 통해 다양한 범주의 어휘-의미 처리를 촉진한다.' },
      { id: 2, text: '매핑치료의 비가역적 능동문을 사용하여 단문이해를 촉진한다.' },
      { id: 3, text: '통제유발치료를 사용하여 제스처를 제한하고 구어로 말하기를 유도한다.' },
      { id: 4, text: '그림판 또는 글자판 등 보완대체의사소통 도구를 사용하여 의사소통을 촉진한다.' },
      { id: 5, text: '실어증 의사소통효과증진법을 사용하여 치료사와 환자가 대화 상황에서 메시지를 주고받는 데 초점을 둔다.' }
    ],
    correctAnswer: 5
  },
  {
    id: 15,
    number: 15,
    type: 'text',
    question: '실어증 의사소통효과증진법에 대한 설명으로 옳은 것은?',
    options: [
      { id: 1, text: '효율적 의사소통을 목표로 완벽한 화자와 청자가 되게 한다.' },
      { id: 2, text: '문법 구조 습득 이론에 기초하여 정확한 문법형태소를 사용하게 한다.' },
      { id: 3, text: '기능적 의사소통 증진을 목표로 구어를 제한하고 동작만 모방하게 한다.' },
      { id: 4, text: '자발적인 구어 산출을 목표로 과장된 리듬에 맞춰 문장을 산출하게 한다.' },
      { id: 5, text: '상호주의 원리에 기초하여 언어적 수단과 비언어적 수단을 활용하게 한다.' }
    ],
    correctAnswer: 5
  },
  {
    id: 16,
    number: 16,
    type: 'text',
    question: '말운동장애 환자의 말 평가 과제에 대한 설명으로 옳은 것은?',
    options: [
      { id: 1, text: '표준문단 읽기 과제-중증 근무력증 환자의 감별진단에 활용할 수 있다.' },
      { id: 2, text: '단단어 따라말하기 과제-말실행증과 마비말장애 감별진단에 필수적이다.' },
      { id: 3, text: '길항반복운동 과제-파킨슨병 환자의 경우 과제수행 속도가 빠를수록 긍정적 지표가 된다.' },
      { id: 4, text: '그림 설명하기 과제-표준문단 읽기와 동일한 말 평가 결과를 보인다.' },
      { id: 5, text: '모음연장 과제-20초 미만의 최대발성시간은 일반적으로 병리적인 상태로 간주한다.' }
    ],
    correctAnswer: 1
  },
  {
    id: 17,
    number: 17,
    type: 'text',
    question: '선천적 뇌성마비에 대한 설명으로 옳은 것은?',
    options: [
      { id: 1, text: '시간이 지날수록 뇌손상 정도가 심해진다.' },
      { id: 2, text: '다른 동반장애 없이 운동장애만 나타난다.' },
      { id: 3, text: '대부분 자연치유를 통해 정상적인 뇌기능을 회복한다.' },
      { id: 4, text: '증상의 유형과 중증도는 시간이 지나도 동일하게 유지된다.' },
      { id: 5, text: '출산 전기, 주산기, 출산 후기에 일어난 뇌손상으로 발생한다.' }
    ],
    correctAnswer: 5
  },
  {
    id: 18,
    number: 18,
    type: 'text',
    question: '다음은 초기 윌슨병 환자의 치료 내용이다. 치료 효과를 종합적으로 측정할 수 있는 방법은?<div class="question-info-box">• 문단 읽기에서 호흡군당 단어 수 늘리기<br/>• 시각적 단서가 표시된 문단 자료를 보고 통사 경계에서 쉼을 두어 읽기<br/>• 홀수는 강하게 짝수는 약하게 소리 내어 번갈아 말하기<br/>• 평서문과 의문문을 사용하여 대립적 강세 연습하기</div>',
    options: [
      { id: 1, text: 'Nasometer' },
      { id: 2, text: 'Spirometer' },
      { id: 3, text: 'Real-Time Pitch (RTP)' },
      { id: 4, text: 'Voice Range Profile (VRP)' },
      { id: 5, text: 'Electroencephalography (EEG)' }
    ],
    correctAnswer: 3
  },
  {
    id: 19,
    number: 19,
    type: 'text',
    question: '하부운동신경세포가 손상되었을 때 나타날 수 있는 증상과 치료 방법이 적절하게 연결된 것은?',
    options: [
      { id: 1, text: '과균등강세-이완기법 사용' },
      { id: 2, text: '쥐어짜는 음성-하품한숨기법 사용' },
      { id: 3, text: '지속적 공명문제-구개거상기 사용' },
      { id: 4, text: '과도한 강도 변화-밀기접근법 사용' },
      { id: 5, text: '문장 끝으로 갈수록 말속도 증가-메트로놈 사용' }
    ],
    correctAnswer: 3
  },
  {
    id: 20,
    number: 20,
    type: 'text',
    question: '다음 증상을 보이는 양측 추체로에 병변이 있는 환자가 추가로 보일 수 있는 증상은?<div class="question-info-box">• 간헐적 과다비성<br/>• 과도한 성대 내전<br/>• 느리고 힘겨운 말</div>',
    options: [
      { id: 1, text: '이중음도' },
      { id: 2, text: '속상수축' },
      { id: 3, text: '과도한 강도 변이' },
      { id: 4, text: '가성구감정' },
      { id: 5, text: '연축성 발성장애' }
    ],
    correctAnswer: 4
  },
  {
    id: 21,
    number: 21,
    type: 'text',
    question: '따라말하기 과제에서 다음 양상을 보인 환자가 수행하기 어려운 과제는?<div class="question-info-box"><table class="question-table"><tr><td>탈 -> /탈/</td><td>탈춤 -> /탈추/</td><td>탈춤판 -> /탈탈추.탈/</td></tr><tr><td>학교 -> /학교/</td><td>학교장 -> /학교/</td><td>학교장실 -> /하하.학교.하교시/</td></tr><tr><td>초여름 -> /토초 초여름/</td><td>초여름철 -> /포포어.토토여음처/</td><td>초여름철새 -> /코코여름.토초녀듬/</td></tr></table></div>',
    options: [
      { id: 1, text: '\'나비야\' 동요 부르기' },
      { id: 2, text: '\'퍼퍼퍼\' 음절 반복하기' },
      { id: 3, text: '\'아\' 모음 연장 발성하기' },
      { id: 4, text: '\'무지개\' 세 번 반복하기' },
      { id: 5, text: '\'빨주노초파남보\' 무지개 색깔 말하기' }
    ],
    correctAnswer: 4
  },
  {
    id: 22,
    number: 22,
    type: 'text',
    question: '다음은 67세 뇌손상 환자의 병변 위치를 빗금으로 나타낸 것이다. 이 환자가 주로 보이는 증상은?',
    options: [
      { id: 1, text: '구성실행증, 다변증' },
      { id: 2, text: '말실행증, 실문법증' },
      { id: 3, text: '무시실독증, 무의지증' },
      { id: 4, text: '브로카실어증, 얼굴실인증' },
      { id: 5, text: '편측 상부운동신경세포형 마비말장애, 시각실인증' }
    ],
    correctAnswer: 2
  },
  {
    id: 23,
    number: 23,
    type: 'text',
    question: '다음은 고형식을 제공하고 실시한 수정된 바륨삼킴검사의 삼킴 단계별 결과이다. 해석으로 옳은 것은?<div class="question-info-box">• 구강 준비 단계: 입술은 폐쇄되어 있으나 연인두는 개방됨, 음식을 씹어서 음식덩이를 형성함<br/>• 구강 운반 단계: 혀가 음식덩이를 앞쪽 구개활 쪽으로 이동시킴<br/>• 인두 단계: 성대가 닫히고 윤상인두근은 수축된 상태로 유지됨<br/>• 식도 단계: 연동 운동이 일어나고, 음식덩이의 식도통과 시간이 약 15초임</div>',
    options: [
      { id: 1, text: '구강 준비 단계에 문제가 있음' },
      { id: 2, text: '구강 운반 단계에 문제가 있음' },
      { id: 3, text: '인두 단계에 문제가 있음' },
      { id: 4, text: '식도 단계에 문제가 있음' },
      { id: 5, text: '정상 삼킴 소견임' }
    ],
    correctAnswer: 5
  },
  {
    id: 24,
    number: 24,
    type: 'text',
    question: '다음 삼킴장애 환자에게 적합한 생리학적 수정기법은?<div class="question-info-box">• 성대 폐쇄가 불완전함<br/>• 지연된 인두 삼킴으로 흡인의 위험이 있음</div>',
    options: [
      { id: 1, text: '노력삼킴' },
      { id: 2, text: '멘델슨기법' },
      { id: 3, text: '성문위삼킴' },
      { id: 4, text: '마사코기법' },
      { id: 5, text: '온도촉각자극법' }
    ],
    correctAnswer: 3
  },
  {
    id: 25,
    number: 25,
    type: 'text',
    question: '정신질환의 진단 및 통계 편람(DSM-5)에서 알츠하이머병으로 인한 경도 신경인지장애 진단에 필수적인 조건은?',
    options: [
      { id: 1, text: '지남력 저하' },
      { id: 2, text: '삼킴능력 저하' },
      { id: 3, text: '기억과 학습 저하' },
      { id: 4, text: '말초적 지각능력 저하' },
      { id: 5, text: '일상활동 독립성 저하' }
    ],
    correctAnswer: 3
  },
  {
    id: 26,
    number: 26,
    type: 'text',
    question: '인지의사소통장애 유형과 특징이 적절하게 연결된 것은?',
    options: [
      { id: 1, text: '파킨슨병 치매-말장애가 두드러지는 피질하성 치매이다.' },
      { id: 2, text: '알츠하이머 치매-발병 초기부터 비유창한 발화를 보인다.' },
      { id: 3, text: '혈관성 치매-베타 아밀로이드 축적에 따른 피질성 치매이다.' },
      { id: 4, text: '전두측두엽 치매-발병 후기까지 독립적 일상활동을 유지한다.' },
      { id: 5, text: '원발성 진행성 실어증-뇌혈관 질환에 의한 피질하성 치매이다.' }
    ],
    correctAnswer: 1
  },
  {
    id: 27,
    number: 27,
    type: 'text',
    question: '단어 유창성 과제를 활용하여 초기 치매 환자를 치료할 때 적절한 활동은?',
    options: [
      { id: 1, text: '단어를 보고 뜻 설명하기' },
      { id: 2, text: '단어를 듣고 반의어 말하기' },
      { id: 3, text: '사물 그림을 보고 빠르게 이름 말하기' },
      { id: 4, text: '사물에 대한 설명을 듣고 이름 말하기' },
      { id: 5, text: '제시한 범주에 속하는 단어 모두 말하기' }
    ],
    correctAnswer: 5
  },
  {
    id: 28,
    number: 28,
    type: 'text',
    question: '다음은 50세 뇌손상 환자의 평가 결과이다. 이 환자의 의사소통 문제를 확인하기에 적절한 과제는?<div class="question-info-box">• 자신의 질병이나 증세에 대해 인식하지 못함<br/>• 겹쳐진 그림에서 목표 대상물을 찾지 못함<br/>• 대화에서 장황하고 주제에서 벗어난 말을 하고, 단조로운 운율을 보임</div>',
    options: [
      { id: 1, text: '\'열쇠\' 그림을 보고 이름 말하기' },
      { id: 2, text: '\'티끌 모아 태산\'의 뜻 설명하기' },
      { id: 3, text: '\'해바라기\' 단어 듣고 따라말하기' },
      { id: 4, text: '\'의자를 가리키세요\'라는 지시에 따르기' },
      { id: 5, text: '6개의 그림 중에서 \'가위\' 단어 듣고 가리키기' }
    ],
    correctAnswer: 2
  },
  {
    id: 29,
    number: 29,
    type: 'text',
    question: '다음은 50세 외상성 뇌손상 환자의 증상이다. 이 증상의 치료 방법으로 적절한 것은?<div class="question-info-box">• 질문을 하면 매번 다시 말해 달라고 요청함<br/>• 한 자리 숫자 세 개를 듣고 즉각적으로 회상하지 못함<br/>• 현관문 도어락 비밀번호를 잘못 누르거나 자주 쓰는 물건을 못 찾는 경우가 많음</div>',
    options: [
      { id: 1, text: '200개의 구슬을 색깔별로 분류하게 한다.' },
      { id: 2, text: '음절 단서를 제공하여 단어를 인출하게 한다.' },
      { id: 3, text: '오늘이 몇 월 며칠인지, 여기가 어디인지 대답하게 한다.' },
      { id: 4, text: '체크리스트와 같은 외부 기억 보조기구를 활용하게 한다.' },
      { id: 5, text: '300음절 정도의 읽기 자료를 쉬지 않고 끝까지 읽게 한다.' }
    ],
    correctAnswer: 4
  },
  {
    id: 30,
    number: 30,
    type: 'text',
    question: '다음은 58세 외상성 뇌손상 환자의 기억 평가에서 관찰된 양상이다. 이 환자에게 필요한 치료 영역은?<div class="question-info-box"><table class="question-table"><tr><td class="table-label">검사자:</td><td>오늘 아침에 뭐 드셨어요? / 환자: 음... 기억이 안나요.</td></tr><tr><td class="table-label">검사자:</td><td>양치하는 방법을 설명해 주세요. / 환자: 칫솔에 어...그거... 치약을 짜고, (양치하는 흉내를 내며) 이렇게 이렇게 닦아요.</td></tr><tr><td class="table-label">검사자:</td><td>대한민국의 수도는 어디인가요? / 환자: 몰라요.</td></tr></table></div>',
    options: [
      { id: 1, text: '내현기억' },
      { id: 2, text: '서술기억' },
      { id: 3, text: '암묵기억' },
      { id: 4, text: '작업기억' },
      { id: 5, text: '절차기억' }
    ],
    correctAnswer: 2
  },
  {
    id: 31,
    number: 31,
    type: 'text',
    question: '다음 과제로 평가하는 유창성은?<div class="question-info-box">• /ㄱ/으로 시작하는 단어를 다섯 개씩 말해 보세요.<br/>• 다음을 읽어보세요. \'바호\', \'하사로\', \'세파피린\', \'카텍바루더\'</div>',
    options: [
      { id: 1, text: '구문 유창성' },
      { id: 2, text: '의미 유창성' },
      { id: 3, text: '음운 유창성' },
      { id: 4, text: '형태 유창성' },
      { id: 5, text: '화용 유창성' }
    ],
    correctAnswer: 3
  },
  {
    id: 32,
    number: 32,
    type: 'text',
    question: '다음 대화에서 기타 비유창성만 포함한 발화는?<div class="question-info-box"><table class="question-table"><tr><td class="table-label">치료사:</td><td>오늘 왜 늦었니?</td></tr><tr><td class="table-label">가:</td><td>음 늦게까지 잠잠 잤지요.</td></tr><tr><td class="table-label">치료사:</td><td>뭐 타고 왔니?</td></tr><tr><td class="table-label">나:</td><td>오늘오늘은 버버버스타고 왔어요.</td></tr><tr><td class="table-label">치료사:</td><td>점심은 먹고 왔니?</td></tr><tr><td class="table-label">다:</td><td>피자 아니 치킨치킨도 먹고 왔어요.</td></tr><tr><td class="table-label">치료사:</td><td>오늘 혼자 온 거야?</td></tr><tr><td class="table-label">라:</td><td>친구친구는 아아안 왔어요.</td></tr><tr><td class="table-label">치료사:</td><td>왜?</td></tr><tr><td class="table-label">마:</td><td>내내가 먼저먼저 출발했어요.</td></tr></table></div>',
    options: [
      { id: 1, text: '가' },
      { id: 2, text: '나' },
      { id: 3, text: '다' },
      { id: 4, text: '라' },
      { id: 5, text: '마' }
    ],
    correctAnswer: 3
  },
  {
    id: 33,
    number: 33,
    type: 'text',
    question: '다음 대상자가 보일 특성으로 적절한 것은?<div class="question-info-box"><table class="question-table"><tr><td class="table-label">치료사:</td><td>누구하고 오셨어요?</td></tr><tr><td class="table-label">대상자:</td><td>혼자자 와왔어요요.</td></tr></table><br/>치료사: 자, 그러면 이 자료를 다섯 번 읽어보세요. (대상자는 자료를 다섯 번 읽는다.)<br/><table class="question-table"><tr><td class="table-label">치료사:</td><td>계속 읽어도 말더듬에서 차이가 없네요.</td></tr><tr><td class="table-label">대상자:</td><td>진짜짜 그렇네요.</td></tr></table></div>',
    options: [
      { id: 1, text: '적용효과가 나타난다.' },
      { id: 2, text: '빠른 말속도를 보인다.' },
      { id: 3, text: '심한 부수행동을 보인다.' },
      { id: 4, text: '상황에 따른 가변성이 높다.' },
      { id: 5, text: '숫자 세기에서 말을 더듬는다.' }
    ],
    correctAnswer: 4
  },
  {
    id: 34,
    number: 34,
    type: 'text',
    question: '다음 대화에서 나타나는 비유창성 변화를 설명하는 것은?<div class="question-info-box"><table class="question-table"><tr><td class="table-label">대상자:</td><td>하하하루 종일 그그그냥 (막힘)그랬어요. 벼---ㄹ다른 일 없없었어요.</td></tr></table><br/>치료사: \'겨울이 다가오면 기온이 내려가고 춥습니다.\' 부터 같이 읽을게요.<br/><table class="question-table"><tr><td class="table-label">치료사, 대상자:</td><td>겨울이 다가오면 기온이 내려가고 춥습니다.</td></tr></table></div>',
    options: [
      { id: 1, text: '교환효과' },
      { id: 2, text: '인접효과' },
      { id: 3, text: '합독효과' },
      { id: 4, text: '청자규모효과' },
      { id: 5, text: '적응효과' }
    ],
    correctAnswer: 3
  },
  {
    id: 35,
    number: 35,
    type: 'text',
    question: '다음 10년간 말더듬 추적 조사 결과에 대한 해석으로 적절한 것은? (남자 500명, 여자 500명 대상)<div class="question-info-box">• 4세 발생: 남자 35명, 여자 15명<br/>• 25세 잔존: 남자 8명, 여자 2명</div>',
    options: [
      { id: 1, text: '여자의 자연회복률은 80%이다.' },
      { id: 2, text: '25세 말더듬 출현율은 약 1%이다.' },
      { id: 3, text: '6세 말더듬 발생률은 약 1.3%이다.' },
      { id: 4, text: '5세 말더듬 출현율은 약 3.7%이다.' },
      { id: 5, text: '남자의 말더듬 발생률이 여자보다 5배 높다.' }
    ],
    correctAnswer: 2
  },
  {
    id: 36,
    number: 36,
    type: 'text',
    question: '다음 대화로 유추할 수 있는 초등학교 2학년 아동의 말더듬 진행단계는?<div class="question-info-box"><table class="question-table"><tr><td class="table-label">아동:</td><td>어어엄마는 (막힘)뭐 먹고 싶어?</td></tr><tr><td class="table-label">아동:</td><td>(입술을 뾰족하게 내밀고) 피 그거 먹을래.</td></tr><tr><td class="table-label">아동:</td><td>먹자 피자.</td></tr></table></div>',
    options: [
      { id: 1, text: '정상적 비유창성' },
      { id: 2, text: '경계선급 말더듬' },
      { id: 3, text: '초기 말더듬' },
      { id: 4, text: '중간급 말더듬' },
      { id: 5, text: '심화된 말더듬' }
    ],
    correctAnswer: 4
  },
  {
    id: 37,
    number: 37,
    type: 'text',
    question: '다음 설명에 해당하는 말을 더듬는 사람의 생리학적 특성은?<div class="question-info-box">• 높은 강도의 차폐잡음을 들려주면 말더듬이 감소함<br/>• SpeechEasy를 착용하고 읽기를 실시할 때 말더듬이 감소함</div>',
    options: [
      { id: 1, text: '말을 더듬는 친척이 있다.' },
      { id: 2, text: '오른쪽 귀로 말소리를 더 잘 듣는다.' },
      { id: 3, text: '말할 때 근육이 긴장해 말더듬이 나타난다.' },
      { id: 4, text: '말운동 계획의 오류를 감지하고 수정하면서 말을 한다.' },
      { id: 5, text: '말을 더듬지 않는 사람과는 다른 피드백 메커니즘을 보인다.' }
    ],
    correctAnswer: 5
  },
  {
    id: 38,
    number: 38,
    type: 'text',
    question: '다음 4세 아동의 대화에서 나타나는 말더듬 발생요인을 확인 할 수 있는 질문은?<div class="question-info-box"><table class="question-table"><tr><td class="table-label">아동:</td><td>큰 숟가락으로 파고 그리고 어 어 작은 거 심었어.</td></tr><tr><td class="table-label">아동:</td><td>사삽으로 땅땅 파고 그거 그거 심었어.</td></tr></table></div>',
    options: [
      { id: 1, text: '어떤 형태로 말을 더듬나요?' },
      { id: 2, text: '전반적인 발달 수준은 어떤가요?' },
      { id: 3, text: '오른손잡이인가요, 왼손잡이인가요?' },
      { id: 4, text: '가족 중에 말을 더듬는 사람이 있나요?' },
      { id: 5, text: '상황에 따라 말더듬이 다르게 발생하나요?' }
    ],
    correctAnswer: 2
  },
  {
    id: 39,
    number: 39,
    type: 'text',
    question: '다음 아동의 평가 결과 요약이다. 적절한 회기 치료 목표는?<div class="question-info-box">• 4세 6개월, 6개월 전부터 말더듬 시작<br/>• KOCS 필수과제 백분위 51~60%ile<br/>• 단어부분 반복 및 도피행동 관찰됨</div>',
    options: [
      { id: 1, text: '아동은 자신이 회피하는 상황을 10개 이상 말할 수 있다.' },
      { id: 2, text: '아동은 10개의 그림카드를 보고 9개 이상 빠르게 말할 수 있다.' },
      { id: 3, text: '엄마는 아동과 상호작용 시 초당 5음절의 속도로 말하는 방법을 배운다.' },
      { id: 4, text: '아동은 놀이 상황에서 10개 더듬은 단어 중 9개 이상을 조절해서 말할 수 있다.' },
      { id: 5, text: '아동은 운반구 수준에서 말하기 어려워하는 단어 5개 이상을 두 번 반복해서 말한다.' }
    ],
    correctAnswer: 3
  },
  {
    id: 40,
    number: 40,
    type: 'text',
    question: '다음 발화의 유형별 비유창성 비율로 옳은 것은?<div class="question-info-box">"우리우리 고향은 사--계절이 (막힘)뚜렷하고 계계절마다 음제각기 다다른 모습과 어어 다다른 종류의 꽃이꽃이 핍니다."</div>',
    options: [
      { id: 1, text: '진성 비유창성: 5/35×100' },
      { id: 2, text: '정상적 비유창성: 4/45×100' },
      { id: 3, text: '단어 간 비유창성: 5/35×100' },
      { id: 4, text: '형식적 비유창성: 4/35×100×1.5' },
      { id: 5, text: '단어 내 비유창성: 5/45×100×1.5' }
    ],
    correctAnswer: 1
  },
  {
    id: 41,
    number: 41,
    type: 'text',
    question: '다음 발화에서 나타난 부수행동 빈도는?<div class="question-info-box">• ㄷㄷ(코를 킁킁거리며) 동생이 그거를 떨어트렸어요.<br/>• (먼산 보기) 누나는 동생이랑...<br/>• (눈 깜박이며) 개미를 보고 있었어요.</div>',
    options: [
      { id: 1, text: '도피행동 2회' },
      { id: 2, text: '거부하기 2회' },
      { id: 3, text: '대용어사용 3회' },
      { id: 4, text: '순서 바꾸기 2회' },
      { id: 5, text: '전보식 표현 1회' }
    ],
    correctAnswer: 1
  },
  {
    id: 42,
    number: 42,
    type: 'text',
    question: '다음 의사소통태도 검사 결과의 점수는?<div class="question-info-box">• 여러 사람들 앞에서 말한다는 것을 생각만 해도 두렵다. (네)<br/>• 나는 때때로 내가 말하는 방식 때문에 당황한다. (네)<br/>• 내가 다른 사람들처럼 분명하게 말하였으면 하고 희망한다. (네)</div>',
    options: [
      { id: 1, text: '2점' },
      { id: 2, text: '3점' },
      { id: 3, text: '4점' },
      { id: 4, text: '5점' },
      { id: 5, text: '6점' }
    ],
    correctAnswer: 2
  },
  {
    id: 43,
    number: 43,
    type: 'text',
    question: '다음 읽기 과제와 대화 과제의 말더듬 음절 백분율은?<div class="question-info-box">• [읽기] (막힘)청소년들에게 희망이 존재한다는 것이 다행다행이다.<br/>• [대화] 사과사과사과는 나무에서 열리는 ㄱㄱ(막힘)과일인데...</div>',
    options: [
      { id: 1, text: '4%SS' },
      { id: 2, text: '5%SS' },
      { id: 3, text: '10%SS' },
      { id: 4, text: '12%SS' },
      { id: 5, text: '15%SS' }
    ],
    correctAnswer: 4
  },
  {
    id: 44,
    number: 44,
    type: 'text',
    question: '다음 발화에서 나타난 단어 간 비유창성의 평균단위반복 수는?<div class="question-info-box">우리는우리는 하하하학교에 ㄱㄱㄱㄱ갔습니다. 친구친구들과 그---림을 한한한 개 그렸습니다.</div>',
    options: [
      { id: 1, text: '1.0' },
      { id: 2, text: '2.0' },
      { id: 3, text: '2.2' },
      { id: 4, text: '3.0' },
      { id: 5, text: '4.0' }
    ],
    correctAnswer: 2
  },
  {
    id: 45,
    number: 45,
    type: 'text',
    question: '다음 발화의 비유창성 분석 내용으로 옳은 것은?<div class="question-info-box">• 하한 사람의 해행동은 사--람의 사고를 반영한다.<br/>• 내내내 행동이 바꾸기 변화하기 위해서는 사고사고사고가 변화해야 한다.</div>',
    options: [
      { id: 1, text: '부수행동은 1회이다.' },
      { id: 2, text: '반복 횟수는 3회이다.' },
      { id: 3, text: '단위 반복수는 1.3이다.' },
      { id: 4, text: '비운율적 발성은 3회이다.' },
      { id: 5, text: '수정/미완성 구는 2회이다.' }
    ],
    correctAnswer: 5
  },
  {
    id: 46,
    number: 46,
    type: 'text',
    question: '다음 말속도를 측정하기 위한 분석 내용으로 옳은 것은? (전체 발화 시간: 15초)<div class="question-info-box">어우---리는 배배배백화점에 갔어요. (0.5초 쉼) 거기에서 바지하고바지하고 (막힘) 운동화를 샀어요.</div>',
    options: [
      { id: 1, text: '전체 말속도는 2.2음절/초이다.' },
      { id: 2, text: '병리적 비유창성의 평균 지속시간은 2초이다.' },
      { id: 3, text: '발화 중간의 0.5초 쉼은 전체 말속도 측정시간에서 제외한다.' },
      { id: 4, text: '조음속도는 목표 음절 수를 전체 발화 시간으로 나누어 계산한다.' },
      { id: 5, text: '전체 말속도는 전체 발화 시간에서 말을 더듬은 부분의 시간을 제외한다.' }
    ],
    correctAnswer: 1
  },
  {
    id: 47,
    number: 47,
    type: 'text',
    question: '다음 대상자에게 적절한 초기 치료 활동 내용은?<div class="question-info-box">• 핵심행동: 읽기 15%SS, 대화 2%SS, 단어부분반복<br/>• 부수행동: 말더듬 상황 회피<br/>• 태도: 말 문제에 대해 어쩔 수 없다는 생각</div>',
    options: [
      { id: 1, text: '읽기 과제 훈련을 통한 말더듬 회피 감소' },
      { id: 2, text: '말 문제 인식 향상을 통한 예기행동 증가' },
      { id: 3, text: '다양한 말하기 상황에 대한 접근 점수 감소' },
      { id: 4, text: '말하기 시도 증가를 통한 전형적 비유창성 감소' },
      { id: 5, text: '의사소통에 대한 자신감 증가를 통한 수행 점수 감소' }
    ],
    correctAnswer: 1
  },
  {
    id: 48,
    number: 48,
    type: 'text',
    question: '다음 5세 아동을 대상으로 사용한 치료 방법에 대한 설명으로 옳은 것은?<div class="question-info-box"><table class="question-table"><tr><td class="table-label">어머니:</td><td>정말 부드럽게 잘했네.</td></tr><tr><td class="table-label">아동:</td><td>(막힘) 빠빠빨간색</td></tr><tr><td class="table-label">어머니:</td><td>처음에 말이 막혔구나.</td></tr></table></div>',
    options: [
      { id: 1, text: '어머니가 느린 속도로 말을 하게 한다.' },
      { id: 2, text: '치료사는 매 회기 의사소통태도를 측정한다.' },
      { id: 3, text: '어머니가 아동에게 하는 질문을 줄이게 한다.' },
      { id: 4, text: '치료사는 아동에게 유창성 향상 기법을 교육한다.' },
      { id: 5, text: '어머니는 치료실에서 배운 내용을 가정에서도 실시한다.' }
    ],
    correctAnswer: 5
  },
  {
    id: 49,
    number: 49,
    type: 'text',
    question: '다음 어머니와의 면담 내용을 토대로 우선적으로 적용할 치료 방법은?<div class="question-info-box">• 3세 여아, 한 달 전부터 말더듬 시작<br/>• 아동은 신경 쓰지 않으나 어머니가 매우 걱정함<br/>• 반복 유형 관찰됨, 가족력 없음</div>',
    options: [
      { id: 1, text: '어머니에게 저빈도 단어로 아동과 대화하게 한다.' },
      { id: 2, text: '아동과의 대화 상황에서 엄마는 반응 시간을 짧게 한다.' },
      { id: 3, text: '치료사가 단어 수준에서 아동에게 느리게 말하도록 한다.' },
      { id: 4, text: '아동이 말을 더듬을 때 어머니가 유창한 말의 시범을 실시한다.' },
      { id: 5, text: '정상적 비유창성과 비정상적 비유창성에 대한 정보를 어머니에게 제공한다.' }
    ],
    correctAnswer: 5
  },
  {
    id: 50,
    number: 50,
    type: 'text',
    question: '유창성 형성법 확립단계의 치료 목표로 적절한 것은?',
    options: [
      { id: 1, text: '어머니가 아동과 말할 때 300음절/분의 속도로 대화한다.' },
      { id: 2, text: '조절해서 말할 수 있다는 자기독백을 3회 이상 실시한다.' },
      { id: 3, text: '치료실 내에서 3음절 단어를 초당 2음절의 속도로 유창하게 말한다.' },
      { id: 4, text: '위계화된 회피상황에서 복문 수준으로 2%SS 미만으로 말한다.' },
      { id: 5, text: '지난 한 주간 말더듬이 가장 심했던 10개 상황의 목록을 작성한다.' }
    ],
    correctAnswer: 4
  },
  {
    id: 51,
    number: 51,
    type: 'text',
    question: '말더듬 치료 단계 중 다음 활동을 하는 단계에 대한 설명으로 옳은 것은?<div class="question-info-box">• 말더듬에 대한 설명 및 치료사의 따라하기<br/>• 자발적 유창성, 조절 유창성에 대한 설명</div>',
    options: [
      { id: 1, text: '치료에 대한 대상자의 적극적인 참여를 유도한다.' },
      { id: 2, text: '자기 말에 대한 실시간 모니터링 능력을 높인다.' },
      { id: 3, text: '취소하기를 통해 말더듬에 대한 통제력을 높인다.' },
      { id: 4, text: '자신의 말더듬에 대한 주위 반응에 대한 민감성을 낮춘다.' },
      { id: 5, text: '말을 더듬는 중에 \'어\'를 넣어서 말더듬 형태를 변화시킨다.' }
    ],
    correctAnswer: 1
  },
  {
    id: 52,
    number: 52,
    type: 'text',
    question: '말더듬 성인이 치료 후 재발을 보일 가능성이 높은 경우는?',
    options: [
      { id: 1, text: '반응 시간이 감소하였다.' },
      { id: 2, text: '외적 통제소가 감소하였다.' },
      { id: 3, text: '대화 주제 개시 비율이 높아졌다.' },
      { id: 4, text: '상황별 자기반응 검사 점수가 증가하였다.' },
      { id: 5, text: '사회적 의사소통과 관련된 인지 불안이 감소하였다.' }
    ],
    correctAnswer: 4
  },
  {
    id: 53,
    number: 53,
    type: 'text',
    question: '다음 대상자에게 사용할 수 있는 초기 치료 활동은?<div class="question-info-box">"저는 거의 안 더듬는 것처럼 보여요... 하지만 저는 말할 때마다 더듬을까 봐 매번 불안해요."</div>',
    options: [
      { id: 1, text: '여러 사람 앞에서 발표하기 연습을 한다.' },
      { id: 2, text: '아드로니언 구어로 이완해서 말하도록 한다.' },
      { id: 3, text: '친구와 대화할 때 부드럽게 발성하기를 사용하게 한다.' },
      { id: 4, text: '치료실 내에서 메트로놈을 사용하여 말속도를 조절한다.' },
      { id: 5, text: '자신이 주로 말을 더듬는 단어와 상황의 목록표를 작성한다.' }
    ],
    correctAnswer: 5
  },
  {
    id: 54,
    number: 54,
    type: 'text',
    question: '다음 대상자에게 우선적으로 적용할 치료 목표는?<div class="question-info-box">"저는 학교에서 학생들을 가르쳐요... 근데 아이들이 제게 자꾸 다시 말해 달라고 해요." (총 발화시간: 8초)</div>',
    options: [
      { id: 1, text: '화용 능력의 향상' },
      { id: 2, text: '언어 유창성 증진' },
      { id: 3, text: '주제 유지 능력 향상' },
      { id: 4, text: '말속도 조절 능력 향상' },
      { id: 5, text: '단어 간 비유창성의 감소' }
    ],
    correctAnswer: 4
  },
  {
    id: 55,
    number: 55,
    type: 'text',
    question: '의사소통태도 검사 백분위가 90%ile인 23세 말더듬 대상자에게 적절한 상담 내용은?',
    options: [
      { id: 1, text: '가: 말을 더듬을 때 부드럽게 숨을 들이마시면서 말하세요.' },
      { id: 2, text: '나: 친구들이 말더듬에 대해 말하는 것에 둔감해지세요.' },
      { id: 3, text: '다: 다른 사람들에게 말더듬을 공개해 보세요.' },
      { id: 4, text: '라: 동일한 자료를 반복해서 읽기 훈련을 할 겁니다.' },
      { id: 5, text: '마: 말을 적게 하는 직업을 고려해 보세요.' }
    ],
    correctAnswer: 3
  },
  {
    id: 56,
    number: 56,
    type: 'text',
    question: '호흡기능검사 결과에서 기능적 잔기용량(FRC)에 해당하는 영역은?',
    options: [
      { id: 1, text: 'A' },
      { id: 2, text: 'B' },
      { id: 3, text: 'C' },
      { id: 4, text: 'D' },
      { id: 5, text: 'E' }
    ],
    correctAnswer: 4
  },
  {
    id: 57,
    number: 57,
    type: 'text',
    question: '3세 남아의 후두가 성인 남자의 후두와 다른 점은?',
    options: [
      { id: 1, text: '성대 길이가 더 길다.' },
      { id: 2, text: '후두 연골이 더 경화되어 있다.' },
      { id: 3, text: '후두의 수직적 위치가 더 낮다.' },
      { id: 4, text: '갑상연골 판이 이루는 각이 더 좁다.' },
      { id: 5, text: '갑상연골과 윤상연골 사이의 공간이 더 좁다.' }
    ],
    correctAnswer: 5
  },
  {
    id: 58,
    number: 58,
    type: 'text',
    question: '근탄성공기역학이론에 관한 설명으로 옳은 것은?',
    options: [
      { id: 1, text: '성대는 설골상부근의 수축으로 내전한다.' },
      { id: 2, text: '폐쇄된 성문은 베르누이 효과에 의해 다시 개방된다.' },
      { id: 3, text: '폐쇄된 성문은 성문하압이 성문상압보다 낮을 때 개방된다.' },
      { id: 4, text: '개방된 성문을 지나는 기류의 속도가 증가하면 성문이 폐쇄된다.' },
      { id: 5, text: '개방된 성문이 폐쇄될 때 성대의 아랫부분이 윗부분보다 나중에 닫힌다.' }
    ],
    correctAnswer: 4
  },
  {
    id: 59,
    number: 59,
    type: 'text',
    question: '성대의 긴장도가 낮고 진동 주기의 대부분이 닫혀 있는 성구는?',
    options: [
      { id: 1, text: '가성구' },
      { id: 2, text: '두성구' },
      { id: 3, text: '진성구' },
      { id: 4, text: '흉성구' },
      { id: 5, text: '펄스성구' }
    ],
    correctAnswer: 5
  },
  {
    id: 60,
    number: 60,
    type: 'text',
    question: '단순파 파형 분석 내용 중 옳은 것은?<div class="question-info-box">• A 파형의 주파수는 100 Hz이다.<br/>• B 파형의 진폭은 A 파형의 두 배이다.</div>',
    options: [
      { id: 1, text: 'A 파형의 주기는 10ms이다.' },
      { id: 2, text: 'A 파형의 주파수는 200 Hz이다.' },
      { id: 3, text: 'B 파형의 정점 간 진폭은 2이다.' },
      { id: 4, text: 'B 파형의 제1포먼트는 400 Hz이다.' },
      { id: 5, text: 'A와 B 파형 결합 시 보강간섭이 일어난다.' }
    ],
    correctAnswer: 1
  },
  {
    id: 61,
    number: 61,
    type: 'text',
    question: '다음에 해당하는 음성장애에 관한 설명으로 옳은 것은?<div class="question-info-box">• 후두의 수직적 위치가 지나치게 높음<br/>• 목, 턱, 어깨 주변 통증을 호소함<br/>• 가성대의 부적절한 수축이 관찰됨<br/>• 후두내시경검사 결과 후두의 구조와 성대의 운동성은 정상 소견임</div>',
    options: [
      { id: 1, text: '흡기 시 천명음이 들린다.' },
      { id: 2, text: '과제에 따라 음질이 변한다.' },
      { id: 3, text: '주로 이차성징 직후 발생한다.' },
      { id: 4, text: '지속적인 긴장성 음성이 관찰된다.' },
      { id: 5, text: '되돌이후두신경 손상으로 발생한다.' }
    ],
    correctAnswer: 4
  },
  {
    id: 62,
    number: 62,
    type: 'text',
    question: '기능적 실성증(functional aphonia)에 대한 설명으로 옳은 것은?',
    options: [
      { id: 1, text: '음도가 낮고 거친소리가 관찰된다.' },
      { id: 2, text: '후두에 가해진 물리적 충격으로 인한 외상에 기인한다.' },
      { id: 3, text: '성대점막의 조직학적인 변화에 기인한 양성병변이 관찰된다.' },
      { id: 4, text: '목청 가다듬기로 성문폐쇄를 통한 성대진동을 유도해야 한다.' },
      { id: 5, text: '성대 내에 콜라겐 주입술을 실시하여 성대 질량을 증가시켜야 한다.' }
    ],
    correctAnswer: 4
  },
  {
    id: 63,
    number: 63,
    type: 'text',
    question: '다음에 해당하는 후두질환은?<div class="question-info-box">• 선천적 혹은 후천적으로 성대에 발생하는 병변<br/>• 후두스트로보스코피 결과 병변 주위 점막파동이 감소함<br/>• 점액이 저류되거나 상피세포의 손상과 회복 과정에서 발생함<br/>• 수술적 치료가 요구되며, 필요에 따라 음성치료를 시행함</div>',
    options: [
      { id: 1, text: '성대낭종' },
      { id: 2, text: '성대폴립' },
      { id: 3, text: '라인케부종' },
      { id: 4, text: '후두유두종' },
      { id: 5, text: '접촉성 육아종' }
    ],
    correctAnswer: 1
  },
  {
    id: 64,
    number: 64,
    type: 'text',
    question: '성대마비에 관한 설명으로 옳은 것은?',
    options: [
      { id: 1, text: '삼차신경의 손상으로 발생한다.' },
      { id: 2, text: '흡연이나 만성기침으로 발생한다.' },
      { id: 3, text: '윤상갑상근이 마비되면 음역이 넓어진다.' },
      { id: 4, text: '편측성 내전근 성대마비 환자는 발성지수가 높아진다.' },
      { id: 5, text: '양측성 외전근 성대마비의 주요 문제는 호흡보다는 발성이다.' }
    ],
    correctAnswer: 4
  },
  {
    id: 65,
    number: 65,
    type: 'text',
    question: '구순구개열의 공명 특성에 관한 설명으로 옳은 것은?',
    options: [
      { id: 1, text: '구개에 천공이 있으면 맹관공명이 지각된다.' },
      { id: 2, text: '아데노이드가 비대하면 과다비성이 지각된다.' },
      { id: 3, text: '비중격 만곡증이 있으면 과다비성이 지각된다.' },
      { id: 4, text: '파열음 및 마찰음 산출 시 과소비성이 지각된다.' },
      { id: 5, text: '비강 내 틈이 좁으면 비누출 시 소음이 지각된다.' }
    ],
    correctAnswer: 5
  },
  {
    id: 66,
    number: 66,
    type: 'text',
    question: '전반적인 음성 문제가 지속적으로 관찰되는 CAPE-V 결과에 대한 설명으로 옳은 것은?',
    options: [
      { id: 1, text: '거친소리는 약함 수준이다.' },
      { id: 2, text: '쥐어짜는소리는 중간 수준이다.' },
      { id: 3, text: '강도문제가 음도문제보다 심하다.' },
      { id: 4, text: '바람새는소리는 간헐적으로 지각된다.' },
      { id: 5, text: '전반적인 음성문제는 지속적으로 관찰된다.' }
    ],
    correctAnswer: 5
  },
  {
    id: 67,
    number: 67,
    type: 'text',
    question: '환자 스스로 자신의 음성 상태를 사회-정서, 신체 영역에서 평가하는 도구는?',
    options: [
      { id: 1, text: '음성장애지수(VHI)' },
      { id: 2, text: '음성피로도 검사(VFI)' },
      { id: 3, text: '음성과 관련된 삶의 질(V-RQOL)' },
      { id: 4, text: '음성장애 대처능력 질문(VDCQ)' },
      { id: 5, text: '음성 활동 및 참여 프로파일(VAPP)' }
    ],
    correctAnswer: 1
  },
  {
    id: 68,
    number: 68,
    type: 'text',
    question: '성대 진동의 주기성이 낮아 기본주파수 측정이 불가능한 심도 기식성 음성 사례의 음질 평가에 적합한 음향학적 변수는?',
    options: [
      { id: 1, text: '발성지수' },
      { id: 2, text: '제1포먼트' },
      { id: 3, text: '성문폐쇄율' },
      { id: 4, text: '주파수변동률' },
      { id: 5, text: '캡스트럼 최고정점' }
    ],
    correctAnswer: 5
  },
  {
    id: 69,
    number: 69,
    type: 'text',
    question: '양측 성대결절 환자가 4주간 음성치료를 시행한 후 음질이 개선되었음을 나타내는 지표는?<div class="question-info-box">• 배음대소음비(dB): 3.56 -> 12.63<br/>• 캡스트럼 최고정점(dB): 11.25 -> 7.58</div>',
    options: [
      { id: 1, text: '제1포먼트(Hz): 756 -> 730' },
      { id: 2, text: '진폭변동률(%): 3.12 -> 8.11' },
      { id: 3, text: '주파수변동률(%): 2.25 -> 4.42' },
      { id: 4, text: '배음대소음비(dB): 3.56 -> 12.63' },
      { id: 5, text: '캡스트럼 최고정점(dB): 11.25 -> 7.58' }
    ],
    correctAnswer: 4
  },
  {
    id: 70,
    number: 70,
    type: 'text',
    question: '78세 노인성 후두 소견을 보이는 환자를 20대 성인 남자와 비교했을 때 추정되는 결과는?<div class="question-info-box">환자 연령: 78세 노인</div>',
    options: [
      { id: 1, text: '문단 읽기 시 성문폐쇄율이 높다.' },
      { id: 2, text: '문단 읽기 시 발화기본주파수가 낮다.' },
      { id: 3, text: '/아/ 모음 발성 시 평균호기류율이 높다.' },
      { id: 4, text: '/아/ 모음 발성 시 성문저항이 높다.' },
      { id: 5, text: '/아/ 모음 발성 시 최대연장발성시간이 길다.' }
    ],
    correctAnswer: 3
  },
  {
    id: 71,
    number: 71,
    type: 'text',
    question: '비음측정기(Nasometer)에 대한 설명으로 옳은 것은?',
    options: [
      { id: 1, text: '청각장애인의 주관적인 공명평가 도구이다.' },
      { id: 2, text: '과다 또는 과소비성 환자의 주파수변동률을 측정한다.' },
      { id: 3, text: '실시간 시각피드백을 통한 공명치료 도구로 활용한다.' },
      { id: 4, text: '비강에너지를 구강에너지로 나누어 비성치를 계산한다.' },
      { id: 5, text: '연인두의 구조 및 기능에 대한 직접적인 정보를 제공한다.' }
    ],
    correctAnswer: 3
  },
  {
    id: 72,
    number: 72,
    type: 'text',
    question: '성문상부 압력의 증가로 효율적인 성대진동을 유도하고 발성 역치압력을 감소시키는 치료법은?',
    options: [
      { id: 1, text: '빨대발성' },
      { id: 2, text: '저작하기' },
      { id: 3, text: '호흡훈련' },
      { id: 4, text: '하품-한숨기법' },
      { id: 5, text: '리실버만음성치료' }
    ],
    correctAnswer: 1
  },
  {
    id: 73,
    number: 73,
    type: 'text',
    question: '초등학교 교사가 아침에 거친소리와 목의 이물감을 호소할 때 적절한 음성위생법은?',
    options: [
      { id: 1, text: '목에 이물질이 있을 때 소리 내지 않고 기침하여 제거한다.' },
      { id: 2, text: '위산역류를 방지하기 위해 취침할 때 베개 높이를 낮춘다.' },
      { id: 3, text: '수업시간에 말명료도를 높이기 위해 목에 힘을 주고 말한다.' },
      { id: 4, text: '복압을 상승시켜 호흡을 지지하기 위해 조이는 옷을 입는다.' },
      { id: 5, text: '성대점막에 손상이 발생하지 않도록 속삭이는 소리로 수업한다.' }
    ],
    correctAnswer: 1
  },
  {
    id: 74,
    number: 74,
    type: 'text',
    question: '배우자 사망 후 갑자기 목소리가 나오지 않으며 성대 접촉이 불완전한 사례에 적절한 치료는?',
    options: [
      { id: 1, text: '속삭이기' },
      { id: 2, text: '흡기발성' },
      { id: 3, text: '혀 후방화' },
      { id: 4, text: '후두미세수술' },
      { id: 5, text: '보툴리눔 독소 주입술' }
    ],
    correctAnswer: 2
  },
  {
    id: 75,
    number: 75,
    type: 'text',
    question: '후두 주변부의 과도한 긴장 소견을 보이는 콜센터 상담원에게 적절한 음성치료는?',
    options: [
      { id: 1, text: '차폐' },
      { id: 2, text: '가성대발성' },
      { id: 3, text: '밀기접근법' },
      { id: 4, text: '흉식호흡훈련' },
      { id: 5, text: '혀 내밀기/이/ 발성' }
    ],
    correctAnswer: 5
  },
  {
    id: 76,
    number: 76,
    type: 'text',
    question: '성대 뒤쪽 1/3 지점에 양측 병변이 있고 속쓰림과 목의 이물감을 호소하는 영업사원에게 적절한 치료는?',
    options: [
      { id: 1, text: '가성대발성' },
      { id: 2, text: '목청 가다듬기' },
      { id: 3, text: '구강개방접근법' },
      { id: 4, text: '저음도로 말하기' },
      { id: 5, text: '큰소리로 말하기' }
    ],
    correctAnswer: 3
  },
  {
    id: 77,
    number: 77,
    type: 'text',
    question: '성대 점막의 특이 병변은 없으나 성대 접촉이 불완전하여 우측 성대를 내전시켜야 하는 사례에 적절한 치료는?',
    options: [
      { id: 1, text: '지속적 양압치료(CPAP)를 시행한다.' },
      { id: 2, text: '우측 갑상연골 외측면을 누르며 발성한다.' },
      { id: 3, text: '좌측 성대 고유층에 히알루론산을 주입한다.' },
      { id: 4, text: '제I형 갑상성형술로 우측 성대를 내전시킨다.' },
      { id: 5, text: '전기인공후두를 이용하여 대체발성을 훈련한다.' }
    ],
    correctAnswer: 2
  },
  {
    id: 78,
    number: 78,
    type: 'text',
    question: '후두전적출술을 받은 환자의 음성재활에 대한 설명으로 옳은 것은?',
    options: [
      { id: 1, text: '식도발성은 폐의 기류를 이용한다.' },
      { id: 2, text: '식도발성은 전기인공후두기에 비해 배우기 쉽다.' },
      { id: 3, text: '기관식도발성은 식도발성에 비해 평균발화길이가 길다.' },
      { id: 4, text: '기관식도발성과 식도발성은 가성대를 진동시켜 발성한다.' },
      { id: 5, text: '공기압축식 인공후두기는 식도에 주입한 기류를 이용한다.' }
    ],
    correctAnswer: 3
  },
  {
    id: 79,
    number: 79,
    type: 'text',
    question: '남자가 여성화 수술을 받은 이후 기본주파수(F0) 변화를 위해 필요한 적절한 치료는?',
    options: [
      { id: 1, text: '자가지방 주입술로 성대질량을 증가시킨다.' },
      { id: 2, text: '제IV형 갑상성형술로 기본주파수를 변화시킨다.' },
      { id: 3, text: '테스토스테론 호르몬을 투여하여 음도를 조절한다.' },
      { id: 4, text: '손가락조작법을 통해 후두 위치를 하강시켜 발성한다.' },
      { id: 5, text: '실시간 시각피드백 프로그램을 통해 낮은 음도를 유도한다.' }
    ],
    correctAnswer: 2
  },
  {
    id: 80,
    number: 80,
    type: 'text',
    question: '심도의 과다비성을 보이는 4세 점막하구개열 아동에게 가장 적절한 치료는?',
    options: [
      { id: 1, text: '구개성형술' },
      { id: 2, text: '입술성형술' },
      { id: 3, text: '편도절제술' },
      { id: 4, text: '공명음성치료' },
      { id: 5, text: '비음-유음 자극' }
    ],
    correctAnswer: 1
  }
];
