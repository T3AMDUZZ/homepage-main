// ═══════════════════════════════════════════════════════════════════════════
// TEAM DUZZ 키워드 클릭형 챗봇 - 4단계 Depth 시스템
// 웹 솔루션 전문 개발팀 DUZZ
// ═══════════════════════════════════════════════════════════════════════════

// 대화 상태 관리
let conversationState = {
  depth: 0,
  selections: [],
  service: null,
  subType: null,
  detail: null,
  timeline: null,
};

// 상태 초기화
export const resetConversationState = () => {
  conversationState = {
    depth: 0,
    selections: [],
    service: null,
    subType: null,
    detail: null,
    timeline: null,
  };
};

// 현재 상태 가져오기
export const getConversationState = () => ({ ...conversationState });

// ═══════════════════════════════════════════════════════════════════════════
// DEPTH 1: 서비스 선택 (메인 카테고리)
// ═══════════════════════════════════════════════════════════════════════════
const DEPTH1_OPTIONS = [
  { label: '홈페이지', value: 'homepage' },
  { label: '앱 개발', value: 'app' },
  { label: '쇼핑몰', value: 'shopping' },
  { label: 'AI/챗봇', value: 'ai' },
  { label: '유지보수', value: 'maintenance' },
  { label: '기타 문의', value: 'other' },
];

// ═══════════════════════════════════════════════════════════════════════════
// DEPTH 2: 세부 유형 (서비스별 하위 옵션)
// ═══════════════════════════════════════════════════════════════════════════
const DEPTH2_OPTIONS = {
  homepage: [
    { label: '기업/회사 소개', value: 'corporate' },
    { label: '포트폴리오형', value: 'portfolio' },
    { label: '블로그/매거진', value: 'blog' },
    { label: '예약 시스템', value: 'booking' },
    { label: '교육/학원', value: 'education' },
    { label: '리뉴얼', value: 'renewal' },
  ],
  app: [
    { label: 'iOS 앱', value: 'ios' },
    { label: 'Android 앱', value: 'android' },
    { label: '하이브리드(둘 다)', value: 'hybrid' },
    { label: '웹앱(PWA)', value: 'pwa' },
    { label: '기존앱 연동', value: 'integration' },
  ],
  shopping: [
    { label: '일반 쇼핑몰', value: 'general' },
    { label: '식품/배달', value: 'food' },
    { label: '패션/의류', value: 'fashion' },
    { label: '핸드메이드/공예', value: 'handmade' },
    { label: 'B2B/도매', value: 'b2b' },
    { label: '기존몰 리뉴얼', value: 'renewal' },
  ],
  ai: [
    { label: '고객상담 챗봇', value: 'customer' },
    { label: 'FAQ 자동응답', value: 'faq' },
    { label: '데이터 분석', value: 'analysis' },
    { label: '업무 자동화', value: 'automation' },
    { label: '맞춤 추천', value: 'recommendation' },
  ],
  maintenance: [
    { label: '버그/오류 수정', value: 'bug' },
    { label: '콘텐츠 수정', value: 'content' },
    { label: '기능 추가', value: 'feature' },
    { label: '보안 점검', value: 'security' },
    { label: '성능 개선', value: 'performance' },
    { label: '정기 유지보수', value: 'regular' },
  ],
  other: [
    { label: 'UI/UX 디자인', value: 'design' },
    { label: 'SEO 최적화', value: 'seo' },
    { label: '서버/호스팅', value: 'hosting' },
    { label: '관리자 시스템', value: 'admin' },
    { label: 'API 연동', value: 'api' },
    { label: '기타 상담', value: 'consult' },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════
// DEPTH 3: 상세 요구사항
// ═══════════════════════════════════════════════════════════════════════════
const DEPTH3_OPTIONS = {
  // 홈페이지
  'homepage-corporate': [
    { label: '5페이지 이하', value: 'small' },
    { label: '10페이지 이하', value: 'medium' },
    { label: '10페이지 이상', value: 'large' },
    { label: '다국어 지원', value: 'multi' },
    { label: '잘 모르겠어요', value: 'unsure' },
  ],
  'homepage-portfolio': [
    { label: '갤러리형', value: 'gallery' },
    { label: '영상 중심', value: 'video' },
    { label: '프로젝트 관리', value: 'project' },
    { label: '이력서형', value: 'resume' },
    { label: '잘 모르겠어요', value: 'unsure' },
  ],
  'homepage-blog': [
    { label: '개인 블로그', value: 'personal' },
    { label: '기업 뉴스룸', value: 'news' },
    { label: '매거진/미디어', value: 'magazine' },
    { label: '커뮤니티형', value: 'community' },
    { label: '잘 모르겠어요', value: 'unsure' },
  ],
  'homepage-booking': [
    { label: '병원/클리닉', value: 'clinic' },
    { label: '뷰티/미용실', value: 'beauty' },
    { label: '레스토랑', value: 'restaurant' },
    { label: '피트니스', value: 'fitness' },
    { label: '잘 모르겠어요', value: 'unsure' },
  ],
  'homepage-education': [
    { label: '학원/교습소', value: 'academy' },
    { label: '온라인 강의', value: 'online' },
    { label: '유아/키즈', value: 'kids' },
    { label: '대학/기관', value: 'institution' },
    { label: '잘 모르겠어요', value: 'unsure' },
  ],
  'homepage-renewal': [
    { label: '디자인만 변경', value: 'design' },
    { label: '기능 추가', value: 'feature' },
    { label: '전체 리뉴얼', value: 'full' },
    { label: '모바일 대응', value: 'mobile' },
    { label: '잘 모르겠어요', value: 'unsure' },
  ],

  // 앱
  'app-ios': [
    { label: '커머스/쇼핑', value: 'commerce' },
    { label: '소셜/커뮤니티', value: 'social' },
    { label: '예약/O2O', value: 'o2o' },
    { label: '엔터테인먼트', value: 'entertainment' },
    { label: '생산성/유틸', value: 'utility' },
  ],
  'app-android': [
    { label: '커머스/쇼핑', value: 'commerce' },
    { label: '소셜/커뮤니티', value: 'social' },
    { label: '예약/O2O', value: 'o2o' },
    { label: '엔터테인먼트', value: 'entertainment' },
    { label: '생산성/유틸', value: 'utility' },
  ],
  'app-hybrid': [
    { label: '커머스/쇼핑', value: 'commerce' },
    { label: '소셜/커뮤니티', value: 'social' },
    { label: '예약/O2O', value: 'o2o' },
    { label: '엔터테인먼트', value: 'entertainment' },
    { label: '생산성/유틸', value: 'utility' },
  ],
  'app-pwa': [
    { label: '오프라인 지원', value: 'offline' },
    { label: '푸시 알림', value: 'push' },
    { label: '앱 아이콘 설치', value: 'icon' },
    { label: '실시간 동기화', value: 'sync' },
    { label: '잘 모르겠어요', value: 'unsure' },
  ],
  'app-integration': [
    { label: '결제 연동', value: 'payment' },
    { label: '배송 연동', value: 'delivery' },
    { label: '분석 툴', value: 'analytics' },
    { label: '외부 API', value: 'api' },
    { label: '잘 모르겠어요', value: 'unsure' },
  ],

  // 쇼핑몰
  'shopping-general': [
    { label: '100개 이하', value: 'small' },
    { label: '500개 이하', value: 'medium' },
    { label: '500개 이상', value: 'large' },
    { label: '무제한', value: 'unlimited' },
    { label: '잘 모르겠어요', value: 'unsure' },
  ],
  'shopping-food': [
    { label: '음식 배달', value: 'delivery' },
    { label: '신선식품', value: 'fresh' },
    { label: '가공식품', value: 'processed' },
    { label: '구독/정기배송', value: 'subscription' },
    { label: '잘 모르겠어요', value: 'unsure' },
  ],
  'shopping-fashion': [
    { label: '의류', value: 'clothing' },
    { label: '신발/잡화', value: 'accessories' },
    { label: '주얼리', value: 'jewelry' },
    { label: '종합 패션', value: 'all' },
    { label: '잘 모르겠어요', value: 'unsure' },
  ],
  'shopping-handmade': [
    { label: '수공예품', value: 'craft' },
    { label: '아트/그림', value: 'art' },
    { label: '굿즈/캐릭터', value: 'goods' },
    { label: '맞춤제작', value: 'custom' },
    { label: '잘 모르겠어요', value: 'unsure' },
  ],
  'shopping-b2b': [
    { label: '제조/도매', value: 'wholesale' },
    { label: '기업간 거래', value: 'business' },
    { label: '견적 시스템', value: 'quote' },
    { label: '회원등급별', value: 'membership' },
    { label: '잘 모르겠어요', value: 'unsure' },
  ],
  'shopping-renewal': [
    { label: '디자인 개편', value: 'design' },
    { label: '속도 개선', value: 'speed' },
    { label: '모바일 최적화', value: 'mobile' },
    { label: '플랫폼 이전', value: 'migration' },
    { label: '잘 모르겠어요', value: 'unsure' },
  ],

  // AI/챗봇
  'ai-customer': [
    { label: '텍스트 상담', value: 'text' },
    { label: '음성 상담', value: 'voice' },
    { label: '이미지 분석', value: 'image' },
    { label: '다국어 지원', value: 'multi' },
    { label: '잘 모르겠어요', value: 'unsure' },
  ],
  'ai-faq': [
    { label: '단순 FAQ', value: 'simple' },
    { label: '검색 기반', value: 'search' },
    { label: '맞춤형', value: 'personalized' },
    { label: '분석 포함', value: 'analytics' },
    { label: '잘 모르겠어요', value: 'unsure' },
  ],
  'ai-analysis': [
    { label: '매출 분석', value: 'sales' },
    { label: '고객 분석', value: 'customer' },
    { label: '트렌드 분석', value: 'trend' },
    { label: '예측 분석', value: 'prediction' },
    { label: '잘 모르겠어요', value: 'unsure' },
  ],
  'ai-automation': [
    { label: '이메일 자동화', value: 'email' },
    { label: '문서 처리', value: 'document' },
    { label: '리포트 생성', value: 'report' },
    { label: '워크플로우', value: 'workflow' },
    { label: '잘 모르겠어요', value: 'unsure' },
  ],
  'ai-recommendation': [
    { label: '상품 추천', value: 'product' },
    { label: '콘텐츠 추천', value: 'content' },
    { label: '개인화', value: 'personal' },
    { label: '유사 항목', value: 'similar' },
    { label: '잘 모르겠어요', value: 'unsure' },
  ],

  // 유지보수
  'maintenance-bug': [
    { label: '긴급 (당장)', value: 'urgent' },
    { label: '빠른 시일', value: 'soon' },
    { label: '여유있게', value: 'normal' },
    { label: '상담 후 결정', value: 'consult' },
  ],
  'maintenance-content': [
    { label: '텍스트 수정', value: 'text' },
    { label: '이미지 교체', value: 'image' },
    { label: '페이지 추가', value: 'page' },
    { label: '전체 업데이트', value: 'update' },
    { label: '잘 모르겠어요', value: 'unsure' },
  ],
  'maintenance-feature': [
    { label: '게시판 추가', value: 'board' },
    { label: '로그인 기능', value: 'login' },
    { label: '결제 기능', value: 'payment' },
    { label: '통계 기능', value: 'stats' },
    { label: '잘 모르겠어요', value: 'unsure' },
  ],
  'maintenance-security': [
    { label: 'SSL 설치', value: 'ssl' },
    { label: '보안 점검', value: 'audit' },
    { label: '접근 제어', value: 'access' },
    { label: '백업 설정', value: 'backup' },
    { label: '잘 모르겠어요', value: 'unsure' },
  ],
  'maintenance-performance': [
    { label: '로딩 속도', value: 'speed' },
    { label: '모바일 최적화', value: 'mobile' },
    { label: 'SEO 개선', value: 'seo' },
    { label: '서버 최적화', value: 'server' },
    { label: '잘 모르겠어요', value: 'unsure' },
  ],
  'maintenance-regular': [
    { label: '월 1회', value: 'monthly' },
    { label: '주 1회', value: 'weekly' },
    { label: '수시', value: 'adhoc' },
    { label: '맞춤 계약', value: 'custom' },
    { label: '잘 모르겠어요', value: 'unsure' },
  ],

  // 기타
  'other-design': [
    { label: '웹 디자인', value: 'web' },
    { label: '앱 디자인', value: 'app' },
    { label: '배너/그래픽', value: 'graphic' },
    { label: '브랜딩', value: 'branding' },
    { label: '잘 모르겠어요', value: 'unsure' },
  ],
  'other-seo': [
    { label: '기본 SEO', value: 'basic' },
    { label: '마케팅 SEO', value: 'marketing' },
    { label: '로컬 SEO', value: 'local' },
    { label: '이커머스 SEO', value: 'ecommerce' },
    { label: '잘 모르겠어요', value: 'unsure' },
  ],
  'other-hosting': [
    { label: '클라우드', value: 'cloud' },
    { label: '전용 서버', value: 'dedicated' },
    { label: '서버 이전', value: 'migration' },
    { label: '도메인 설정', value: 'domain' },
    { label: '잘 모르겠어요', value: 'unsure' },
  ],
  'other-admin': [
    { label: '대시보드', value: 'dashboard' },
    { label: '회원 관리', value: 'member' },
    { label: '주문 관리', value: 'order' },
    { label: '통계/분석', value: 'analytics' },
    { label: '잘 모르겠어요', value: 'unsure' },
  ],
  'other-api': [
    { label: 'PG사 연동', value: 'payment' },
    { label: '배송사 연동', value: 'delivery' },
    { label: '외부 서비스', value: 'external' },
    { label: '데이터 연동', value: 'data' },
    { label: '잘 모르겠어요', value: 'unsure' },
  ],
  'other-consult': [
    { label: '아이디어 단계', value: 'idea' },
    { label: '기획 필요', value: 'planning' },
    { label: '일정 상담', value: 'schedule' },
    { label: '기타', value: 'etc' },
  ],
};

// ═══════════════════════════════════════════════════════════════════════════
// DEPTH 4: 일정/진행 방식
// ═══════════════════════════════════════════════════════════════════════════
const DEPTH4_OPTIONS = [
  { label: '급해요 (2주 이내)', value: 'urgent' },
  { label: '빠른 시일 (1개월)', value: 'soon' },
  { label: '여유있게 (2~3개월)', value: 'normal' },
  { label: '일정 미정', value: 'undecided' },
];

// ═══════════════════════════════════════════════════════════════════════════
// 서비스명 매핑
// ═══════════════════════════════════════════════════════════════════════════
const SERVICE_NAMES = {
  homepage: '홈페이지 제작',
  app: '앱 개발',
  shopping: '쇼핑몰 제작',
  ai: 'AI/챗봇 개발',
  maintenance: '유지보수',
  other: '기타 서비스',
};

const SUBTYPE_NAMES = {
  // 홈페이지
  corporate: '기업/회사 소개',
  portfolio: '포트폴리오형',
  blog: '블로그/매거진',
  booking: '예약 시스템',
  education: '교육/학원',
  renewal: '리뉴얼',
  // 앱
  ios: 'iOS 앱',
  android: 'Android 앱',
  hybrid: '하이브리드 앱',
  pwa: '웹앱(PWA)',
  integration: '기존앱 연동',
  // 쇼핑몰
  general: '일반 쇼핑몰',
  food: '식품/배달',
  fashion: '패션/의류',
  handmade: '핸드메이드',
  b2b: 'B2B/도매',
  // AI
  customer: '고객상담 챗봇',
  faq: 'FAQ 자동응답',
  analysis: '데이터 분석',
  automation: '업무 자동화',
  recommendation: '맞춤 추천',
  // 유지보수
  bug: '버그/오류 수정',
  content: '콘텐츠 수정',
  feature: '기능 추가',
  security: '보안 점검',
  performance: '성능 개선',
  regular: '정기 유지보수',
  // 기타
  design: 'UI/UX 디자인',
  seo: 'SEO 최적화',
  hosting: '서버/호스팅',
  admin: '관리자 시스템',
  api: 'API 연동',
  consult: '기타 상담',
};

const TIMELINE_NAMES = {
  'urgent': '2주 이내',
  'soon': '1개월 내',
  'normal': '2~3개월',
  'undecided': '일정 미정',
};

// ═══════════════════════════════════════════════════════════════════════════
// 응답 메시지 템플릿
// ═══════════════════════════════════════════════════════════════════════════
const WELCOME_MESSAGE = `안녕하세요.

TEAM DUZZ 상담 챗봇입니다.
웹 솔루션 전문 개발팀 DUZZ입니다.

어떤 서비스에 관심이 있으신가요?`;

const DEPTH2_MESSAGES = {
  homepage: '홈페이지 제작이시군요.\n\n어떤 유형의 홈페이지인가요?',
  app: '앱 개발에 관심이 있으시군요.\n\n어떤 플랫폼을 생각하고 계신가요?',
  shopping: '쇼핑몰 제작이시군요.\n\n어떤 종류의 쇼핑몰인가요?',
  ai: 'AI/챗봇 개발이시군요.\n\n어떤 용도로 사용하실 건가요?',
  maintenance: '유지보수가 필요하시군요.\n\n어떤 작업이 필요하신가요?',
  other: '기타 문의시군요.\n\n어떤 서비스가 필요하신가요?',
};

const DEPTH3_MESSAGE = (service, subType) => {
  const serviceName = SERVICE_NAMES[service] || service;
  const subTypeName = SUBTYPE_NAMES[subType] || subType;
  return `${serviceName} 중 "${subTypeName}"이시군요.\n\n좀 더 구체적으로 알려주시겠어요?`;
};

const DEPTH4_MESSAGE = () => {
  return `원하시는 일정이 있으신가요?`;
};

// ═══════════════════════════════════════════════════════════════════════════
// 최종 응답 생성
// ═══════════════════════════════════════════════════════════════════════════
const generateFinalResponse = (state) => {
  const { service, subType, detail, timeline } = state;
  const serviceName = SERVICE_NAMES[service] || service;
  const subTypeName = SUBTYPE_NAMES[subType] || subType;
  const timelineName = TIMELINE_NAMES[timeline] || '미정';

  // FAQ 관련 서비스인 경우
  if (service === 'ai' && subType === 'faq') {
    return {
      reply: `말씀하신 내용 정리해드릴게요.\n\n` +
        `- 서비스: ${serviceName}\n` +
        `- 유형: ${subTypeName}\n` +
        `- 일정: ${timelineName}\n\n` +
        `FAQ 자동응답 관련 자주 묻는 질문은\nFAQ 섹션에서 확인하실 수 있어요.\n\n` +
        `정확한 견적이 필요하시면\nAI 견적받기를 이용해주세요.`,
      options: [
        { label: 'AI 견적받기', value: 'ai-quote', action: 'navigate', url: '/ai-quote' },
        { label: 'FAQ 보기', value: 'faq', action: 'navigate', url: '/#faq' },
        { label: '새 상담', value: 'reset', action: 'reset' },
      ],
      showResetButton: true,
    };
  }

  // 유지보수 긴급 요청
  if (service === 'maintenance' && detail === 'urgent') {
    return {
      reply: `긴급 유지보수 요청이시군요.\n\n` +
        `- 서비스: ${serviceName}\n` +
        `- 유형: ${subTypeName}\n` +
        `- 긴급도: 긴급\n\n` +
        `긴급 건은 빠른 확인이 필요합니다.\n문의하기에서 바로 연락 주시면\n빠르게 확인 후 연락드리겠습니다.`,
      options: [
        { label: '문의하기', value: 'contact', action: 'navigate', url: '/contact' },
        { label: 'AI 견적받기', value: 'ai-quote', action: 'navigate', url: '/ai-quote' },
        { label: '새 상담', value: 'reset', action: 'reset' },
      ],
      showResetButton: true,
    };
  }

  // 기획 단계/상담 필요한 경우
  if (detail === 'unsure' || detail === 'idea' || detail === 'planning' || detail === 'consult') {
    return {
      reply: `말씀하신 내용 정리해드릴게요.\n\n` +
        `- 서비스: ${serviceName}\n` +
        `- 유형: ${subTypeName}\n\n` +
        `아직 구체적인 계획이 없으셔도 괜찮아요.\n기획 단계부터 함께 진행 가능합니다.\n\n` +
        `진행 절차가 궁금하시면 프로세스 페이지를,\n대략적인 견적이 궁금하시면 AI 견적받기를 이용해주세요.`,
      options: [
        { label: 'AI 견적받기', value: 'ai-quote', action: 'navigate', url: '/ai-quote' },
        { label: '프로세스 보기', value: 'process', action: 'navigate', url: '/process' },
        { label: '문의하기', value: 'contact', action: 'navigate', url: '/contact' },
        { label: '새 상담', value: 'reset', action: 'reset' },
      ],
      showResetButton: true,
    };
  }

  // 일반 최종 응답
  return {
    reply: `말씀하신 내용 정리해드릴게요.\n\n` +
      `- 서비스: ${serviceName}\n` +
      `- 유형: ${subTypeName}\n` +
      `- 일정: ${timelineName}\n\n` +
      `진행 절차는 프로세스 페이지에서 확인 가능하고,\n정확한 견적이 필요하시면 AI 견적받기를 이용해주세요.\n비슷한 프로젝트 사례는 포트폴리오에서 볼 수 있어요.`,
    options: [
      { label: 'AI 견적받기', value: 'ai-quote', action: 'navigate', url: '/ai-quote' },
      { label: '포트폴리오', value: 'portfolio', action: 'navigate', url: '/solution' },
      { label: '프로세스', value: 'process', action: 'navigate', url: '/process' },
      { label: '문의하기', value: 'contact', action: 'navigate', url: '/contact' },
      { label: '새 상담', value: 'reset', action: 'reset' },
    ],
    showResetButton: true,
  };
};

// ═══════════════════════════════════════════════════════════════════════════
// 메인 응답 함수
// ═══════════════════════════════════════════════════════════════════════════
export const getChatbotResponse = (input, lastRoute = '') => {
  const inputLower = input.toLowerCase().trim();

  // 리셋 요청
  if (inputLower.includes('리셋') || inputLower.includes('처음') || inputLower.includes('다시') || inputLower.includes('새 상담') || inputLower.includes('reset')) {
    resetConversationState();
    return {
      route: 'reset',
      reply: WELCOME_MESSAGE,
      options: DEPTH1_OPTIONS,
      showResetButton: false,
    };
  }

  // Depth 1: 서비스 선택
  const depth1Match = DEPTH1_OPTIONS.find(opt => 
    inputLower.includes(opt.value) || inputLower.includes(opt.label.replace(/[^\w\sㄱ-힣]/g, '').trim().toLowerCase())
  );
  if (depth1Match && conversationState.depth < 1) {
    conversationState.depth = 1;
    conversationState.service = depth1Match.value;
    conversationState.selections.push(depth1Match.value);
    
    return {
      route: `D1_${depth1Match.value}`,
      reply: DEPTH2_MESSAGES[depth1Match.value],
      options: DEPTH2_OPTIONS[depth1Match.value] || [],
      showResetButton: false,
    };
  }

  // Depth 2: 세부 유형 선택
  if (conversationState.depth === 1 && conversationState.service) {
    const depth2Options = DEPTH2_OPTIONS[conversationState.service] || [];
    const depth2Match = depth2Options.find(opt =>
      inputLower.includes(opt.value) || inputLower.includes(opt.label.replace(/[^\w\sㄱ-힣]/g, '').trim().toLowerCase())
    );
    
    if (depth2Match) {
      conversationState.depth = 2;
      conversationState.subType = depth2Match.value;
      conversationState.selections.push(depth2Match.value);
      
      const key = `${conversationState.service}-${depth2Match.value}`;
      const depth3Options = DEPTH3_OPTIONS[key] || DEPTH4_OPTIONS;
      
      return {
        route: `D2_${conversationState.service}_${depth2Match.value}`,
        reply: DEPTH3_MESSAGE(conversationState.service, depth2Match.value),
        options: depth3Options,
        showResetButton: false,
      };
    }
  }

  // Depth 3: 상세 요구사항 선택
  if (conversationState.depth === 2 && conversationState.service && conversationState.subType) {
    const key = `${conversationState.service}-${conversationState.subType}`;
    const depth3Options = DEPTH3_OPTIONS[key] || [];
    const depth3Match = depth3Options.find(opt =>
      inputLower.includes(opt.value) || inputLower.includes(opt.label.replace(/[^\w\sㄱ-힣]/g, '').trim().toLowerCase())
    );
    
    if (depth3Match) {
      conversationState.depth = 3;
      conversationState.detail = depth3Match.value;
      conversationState.selections.push(depth3Match.value);
      
      return {
        route: `D3_${conversationState.service}_${conversationState.subType}_${depth3Match.value}`,
        reply: DEPTH4_MESSAGE(),
        options: DEPTH4_OPTIONS,
        showResetButton: false,
      };
    }
  }

  // Depth 4: 일정 선택 (최종)
  if (conversationState.depth === 3) {
    const depth4Match = DEPTH4_OPTIONS.find(opt =>
      inputLower.includes(opt.value) || inputLower.includes(opt.label.replace(/[^\w\sㄱ-힣]/g, '').trim().toLowerCase())
    );
    
    if (depth4Match) {
      conversationState.depth = 4;
      conversationState.timeline = depth4Match.value;
      conversationState.selections.push(depth4Match.value);
      
      const finalResponse = generateFinalResponse(conversationState);
      
      return {
        route: `D4_final`,
        ...finalResponse,
      };
    }
  }

  // 특수 키워드 처리
  // FAQ 관련
  if (inputLower.includes('faq') || inputLower.includes('자주') || inputLower.includes('질문')) {
    return {
      route: 'faq',
      reply: `FAQ를 찾고 계시군요.\n\n자주 묻는 질문은 메인 페이지 하단의\nFAQ 섹션에서 확인하실 수 있어요.`,
      options: [
        { label: 'FAQ 보기', value: 'faq', action: 'navigate', url: '/#faq' },
        { label: '문의하기', value: 'contact', action: 'navigate', url: '/contact' },
        { label: '새 상담', value: 'reset', action: 'reset' },
      ],
      showResetButton: false,
    };
  }

  // 포트폴리오 관련
  if (inputLower.includes('포트폴리오') || inputLower.includes('작업물') || inputLower.includes('사례')) {
    return {
      route: 'portfolio',
      reply: `포트폴리오가 궁금하시군요.\n\n다양한 프로젝트 사례를\n포트폴리오 페이지에서 확인하실 수 있어요.`,
      options: [
        { label: '포트폴리오', value: 'portfolio', action: 'navigate', url: '/solution' },
        { label: 'AI 견적받기', value: 'ai-quote', action: 'navigate', url: '/ai-quote' },
        { label: '새 상담', value: 'reset', action: 'reset' },
      ],
      showResetButton: false,
    };
  }

  // 프로세스 관련
  if (inputLower.includes('프로세스') || inputLower.includes('진행') || inputLower.includes('절차') || inputLower.includes('과정')) {
    return {
      route: 'process',
      reply: `진행 과정이 궁금하시군요.\n\n프로젝트 진행 절차는\n프로세스 페이지에서 확인하실 수 있어요.`,
      options: [
        { label: '프로세스', value: 'process', action: 'navigate', url: '/process' },
        { label: 'AI 견적받기', value: 'ai-quote', action: 'navigate', url: '/ai-quote' },
        { label: '새 상담', value: 'reset', action: 'reset' },
      ],
      showResetButton: false,
    };
  }

  // 연락처/문의
  if (inputLower.includes('연락') || inputLower.includes('문의') || inputLower.includes('전화') || inputLower.includes('이메일') || inputLower.includes('상담')) {
    return {
      route: 'contact',
      reply: `상담을 원하시는군요.\n\n문의하기 페이지에서\n편하게 연락 주세요.`,
      options: [
        { label: '문의하기', value: 'contact', action: 'navigate', url: '/contact' },
        { label: 'AI 견적받기', value: 'ai-quote', action: 'navigate', url: '/ai-quote' },
        { label: '새 상담', value: 'reset', action: 'reset' },
      ],
      showResetButton: false,
    };
  }

  // 기본 응답 (인식 실패 시 현재 depth에 맞는 옵션 제공)
  if (conversationState.depth === 0) {
    return {
      route: 'default_d0',
      reply: `죄송해요, 잘 이해하지 못했어요.\n\n아래 버튼 중 하나를 선택해주세요.`,
      options: DEPTH1_OPTIONS,
      showResetButton: false,
    };
  } else if (conversationState.depth === 1) {
    const depth2Options = DEPTH2_OPTIONS[conversationState.service] || [];
    return {
      route: 'default_d1',
      reply: `다시 한번 선택해주시겠어요?\n\n아래 옵션 중 하나를 선택해주세요.`,
      options: depth2Options,
      showResetButton: false,
    };
  } else if (conversationState.depth === 2) {
    const key = `${conversationState.service}-${conversationState.subType}`;
    const depth3Options = DEPTH3_OPTIONS[key] || [];
    return {
      route: 'default_d2',
      reply: `아래 옵션 중 선택해주세요.`,
      options: depth3Options,
      showResetButton: false,
    };
  } else if (conversationState.depth === 3) {
    return {
      route: 'default_d3',
      reply: `원하시는 일정을 선택해주세요.`,
      options: DEPTH4_OPTIONS,
      showResetButton: false,
    };
  }

  // 최종 fallback
  resetConversationState();
  return {
    route: 'fallback',
    reply: `새로운 상담을 시작할게요.\n\n어떤 서비스가 필요하신가요?`,
    options: DEPTH1_OPTIONS,
    showResetButton: false,
  };
};

// 초기 옵션 가져오기
export const getInitialOptions = () => DEPTH1_OPTIONS;

// 초기 메시지 가져오기
export const getWelcomeMessage = () => WELCOME_MESSAGE;
