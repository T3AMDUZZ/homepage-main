import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './AIQuote.css';

// 키워드 추출 함수 - 사용자 입력에서 기능 관련 키워드를 찾아냄
function extractKeywords(text) {
  const keywordMap = {
    // 프로젝트 타입 관련
    '웹': 'web',
    '웹사이트': 'web',
    '홈페이지': 'web',
    '랜딩': 'web',
    '앱': 'mobile',
    '어플': 'mobile',
    '모바일': 'mobile',
    '아이폰': 'mobile',
    '안드로이드': 'mobile',
    '관리자': 'admin',
    '어드민': 'admin',
    '대시보드': 'dashboard',
    '쇼핑몰': 'ecommerce',
    '이커머스': 'ecommerce',
    '온라인 쇼핑': 'ecommerce',
    '판매': 'ecommerce',
    'ai': 'ai',
    '인공지능': 'ai',
    '챗봇': 'ai',
    'api': 'api',
    '서버': 'api',
    '백엔드': 'api',
    
    // 기능 관련
    '로그인': 'auth',
    '회원가입': 'auth',
    '회원': 'auth',
    '소셜로그인': 'auth',
    '카카오': 'auth',
    '네이버': 'auth',
    '구글': 'auth',
    '결제': 'payment',
    '페이': 'payment',
    '카드': 'payment',
    '정산': 'payment',
    '채팅': 'realtime',
    '실시간': 'realtime',
    '알림': 'push',
    '푸시': 'push',
    '검색': 'search',
    '필터': 'search',
    '지도': 'map',
    '위치': 'map',
    '업로드': 'upload',
    '파일': 'upload',
    '이미지': 'upload',
    '사진': 'upload',
    '동영상': 'upload',
    '통계': 'dashboard',
    '차트': 'dashboard',
    '그래프': 'dashboard',
    
    // 디자인 관련
    '디자인': 'basic',
    '고급': 'premium',
    '프리미엄': 'premium',
    '반응형': 'responsive',
    '모바일 최적화': 'responsive',
  };

  const foundKeywords = new Set();
  const lowerText = text.toLowerCase();

  Object.entries(keywordMap).forEach(([keyword, value]) => {
    if (lowerText.includes(keyword.toLowerCase())) {
      foundKeywords.add(value);
    }
  });

  return Array.from(foundKeywords);
}

function AIQuote() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selections, setSelections] = useState({
    projectType: [],
    features: [],
    design: [],
    timeline: '',
    userInput: '',
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const steps = [
    {
      id: 'projectType',
      title: '어떤 개발을 원하시나요?',
      subtitle: '원하시는 프로젝트 유형을 모두 선택해주세요',
      type: 'multiple',
      options: [
        { id: 'web', label: '웹사이트', description: '반응형 웹, 웹앱, 랜딩페이지' },
        { id: 'mobile', label: '모바일 앱', description: 'iOS, Android, 크로스플랫폼' },
        { id: 'admin', label: '관리자 페이지', description: '대시보드, CMS, 백오피스' },
        { id: 'ecommerce', label: '쇼핑몰', description: '이커머스, 결제 시스템' },
        { id: 'ai', label: 'AI 솔루션', description: '챗봇, 자동화, ML 서비스' },
        { id: 'api', label: 'API/백엔드', description: 'REST API, 서버 개발' },
      ],
    },
    {
      id: 'features',
      title: '필요한 기능을 선택해주세요',
      subtitle: '구현이 필요한 기능을 모두 선택해주세요',
      type: 'multiple',
      options: [
        { id: 'auth', label: '회원 시스템', description: '로그인, 회원가입, 소셜로그인' },
        { id: 'payment', label: '결제 시스템', description: '카드결제, 간편결제' },
        { id: 'realtime', label: '실시간 기능', description: '채팅, 알림, 실시간 업데이트' },
        { id: 'search', label: '검색/필터', description: '고급 검색, 필터링' },
        { id: 'dashboard', label: '대시보드', description: '통계, 차트, 데이터 시각화' },
        { id: 'map', label: '지도/위치', description: '지도 API, 위치 기반 서비스' },
        { id: 'upload', label: '파일 업로드', description: '이미지, 동영상, 문서' },
        { id: 'push', label: '푸시 알림', description: '웹/앱 푸시 알림' },
      ],
    },
    {
      id: 'design',
      title: '디자인 요구사항은 어떻게 되나요?',
      subtitle: '해당하는 항목을 모두 선택해주세요',
      type: 'multiple',
      options: [
        { id: 'noDesign', label: '디자인 없음', description: '개발만 필요' },
        { id: 'reference', label: '레퍼런스 있음', description: '참고할 디자인이 있어요' },
        { id: 'basic', label: '기본 디자인', description: '심플한 디자인 요청' },
        { id: 'premium', label: '프리미엄 디자인', description: '고퀄리티 커스텀 디자인' },
        { id: 'responsive', label: '반응형 필수', description: 'PC, 태블릿, 모바일' },
      ],
    },
    {
      id: 'timeline',
      title: '원하시는 개발 기간은요?',
      subtitle: '예상 일정을 선택해주세요',
      type: 'single',
      options: [
        { id: 'urgent', label: '급함 (2주 이내)', description: '빠른 개발 필요' },
        { id: 'normal', label: '보통 (1-2개월)', description: '일반적인 일정' },
        { id: 'flexible', label: '여유 (2-3개월)', description: '충분한 개발 기간' },
        { id: 'undecided', label: '미정', description: '상담 후 결정' },
      ],
    },
    {
      id: 'userInput',
      title: '어떤 기능을 원하시는지 말씀해주세요',
      subtitle: '추가로 원하시는 기능이나 상세 요구사항을 입력해주세요',
      type: 'text',
    },
  ];

  const handleSelect = (optionId) => {
    const currentStepData = steps[currentStep];
    
    if (currentStepData.type === 'single') {
      setSelections((prev) => ({
        ...prev,
        [currentStepData.id]: optionId,
      }));
    } else if (currentStepData.type === 'multiple') {
      setSelections((prev) => {
        const current = prev[currentStepData.id] || [];
        if (current.includes(optionId)) {
          return {
            ...prev,
            [currentStepData.id]: current.filter((id) => id !== optionId),
          };
        }
        return {
          ...prev,
          [currentStepData.id]: [...current, optionId],
        };
      });
    }
  };

  const handleTextInput = (e) => {
    setSelections((prev) => ({
      ...prev,
      userInput: e.target.value,
    }));
  };

  const isSelected = (optionId) => {
    const currentStepData = steps[currentStep];
    if (currentStepData.type === 'single') {
      return selections[currentStepData.id] === optionId;
    }
    return (selections[currentStepData.id] || []).includes(optionId);
  };

  const canProceed = () => {
    const currentStepData = steps[currentStep];
    if (currentStepData.type === 'text') {
      return true; // 텍스트 입력은 선택사항
    }
    if (currentStepData.type === 'single') {
      return !!selections[currentStepData.id];
    }
    return (selections[currentStepData.id] || []).length > 0;
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // 마지막 단계에서 AI 분석 시작
      setIsAnalyzing(true);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // AI 분석 타이머
  useEffect(() => {
    if (isAnalyzing) {
      const timer = setTimeout(() => {
        setIsAnalyzing(false);
        setShowResult(true);
      }, 6000); // 6초 후 결과 표시

      return () => clearTimeout(timer);
    }
  }, [isAnalyzing]);

  // 사용자 입력에서 키워드 추출하여 기능에 추가
  const getExtractedFeatures = () => {
    if (!selections.userInput) return [];
    return extractKeywords(selections.userInput);
  };

  // 최종 선택값 (수동 선택 + 자동 추출 병합)
  const getFinalSelections = () => {
    const extracted = getExtractedFeatures();
    const projectTypes = steps[0].options.map(o => o.id);
    const featureIds = steps[1].options.map(o => o.id);
    const designIds = steps[2].options.map(o => o.id);

    return {
      projectType: [...new Set([
        ...(selections.projectType || []),
        ...extracted.filter(e => projectTypes.includes(e))
      ])],
      features: [...new Set([
        ...(selections.features || []),
        ...extracted.filter(e => featureIds.includes(e))
      ])],
      design: [...new Set([
        ...(selections.design || []),
        ...extracted.filter(e => designIds.includes(e))
      ])],
      timeline: selections.timeline,
    };
  };

  const calculateEstimate = () => {
    const final = getFinalSelections();
    let basePrice = 0;
    let maxPrice = 0;

    const projectPrices = {
      web: [150, 400],
      mobile: [300, 800],
      admin: [200, 500],
      ecommerce: [400, 1000],
      ai: [500, 1500],
      api: [150, 400],
    };

    const featurePrices = {
      auth: [50, 150],
      payment: [100, 300],
      realtime: [100, 250],
      search: [30, 100],
      dashboard: [100, 300],
      map: [50, 150],
      upload: [30, 100],
      push: [50, 150],
    };

    const designPrices = {
      noDesign: [0, 0],
      reference: [30, 100],
      basic: [50, 150],
      premium: [150, 400],
      responsive: [30, 100],
    };

    (final.projectType || []).forEach((type) => {
      if (projectPrices[type]) {
        basePrice += projectPrices[type][0];
        maxPrice += projectPrices[type][1];
      }
    });

    (final.features || []).forEach((feature) => {
      if (featurePrices[feature]) {
        basePrice += featurePrices[feature][0];
        maxPrice += featurePrices[feature][1];
      }
    });

    (final.design || []).forEach((design) => {
      if (designPrices[design]) {
        basePrice += designPrices[design][0];
        maxPrice += designPrices[design][1];
      }
    });

    if (final.timeline === 'urgent') {
      basePrice = Math.round(basePrice * 1.2);
      maxPrice = Math.round(maxPrice * 1.2);
    }

    return {
      min: Math.max(basePrice, 100),
      max: Math.max(maxPrice, 300),
    };
  };

  // AI 분석중 화면
  if (isAnalyzing) {
    return (
      <div className="ai-quote-page">
        <section className="analyzing-section">
          <div className="container">
            <div className="analyzing-content">
              <div className="ai-icon">
                <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="8" y="8" width="48" height="48" rx="12" stroke="currentColor" strokeWidth="2"/>
                  <circle cx="24" cy="28" r="4" fill="currentColor"/>
                  <circle cx="40" cy="28" r="4" fill="currentColor"/>
                  <path d="M20 42C20 42 26 48 32 48C38 48 44 42 44 42" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" className="rotating-circle"/>
                </svg>
              </div>
              <div className="analyzing-text">
                <h2>AI가 분석중입니다...</h2>
                <p>조금만 기다려주세요</p>
              </div>
              <div className="analyzing-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // 결과 화면
  if (showResult) {
    const estimate = calculateEstimate();
    const final = getFinalSelections();
    
    const selectedProjectLabels = (final.projectType || []).map(
      id => steps[0].options.find(o => o.id === id)?.label
    ).filter(Boolean);
    
    const selectedFeatureLabels = (final.features || []).map(
      id => steps[1].options.find(o => o.id === id)?.label
    ).filter(Boolean);
    
    const selectedDesignLabels = (final.design || []).map(
      id => steps[2].options.find(o => o.id === id)?.label
    ).filter(Boolean);
    
    const selectedTimeline = steps[3].options.find(t => t.id === final.timeline)?.label || '미정';

    const allSelectedItems = [
      ...selectedProjectLabels,
      ...selectedFeatureLabels,
      ...selectedDesignLabels,
    ];
    
    return (
      <div className="ai-quote-page">
        <section className="quote-result">
          <div className="container">
            <div className="result-content">
              <div className="result-header">
                <span className="result-badge">AI 견적 결과</span>
                <h1>예상 견적</h1>
              </div>

              <div className="features-list-card">
                <h3>선택된 기능 목록</h3>
                <div className="features-tags">
                  {allSelectedItems.map((item, index) => (
                    <span key={index} className="feature-tag">{item}</span>
                  ))}
                </div>
                <div className="timeline-info">
                  <span className="timeline-label">예상 일정</span>
                  <span className="timeline-value">{selectedTimeline}</span>
                </div>
              </div>

              <div className="final-estimate-card">
                <div className="estimate-label">최종 견적</div>
                <div className="estimate-price">
                  <span className="price-min">{estimate.min.toLocaleString()}만원</span>
                  <span className="price-separator">~</span>
                  <span className="price-max">{estimate.max.toLocaleString()}만원</span>
                </div>
                <p className="estimate-note">
                  실제 견적은 상세 요구사항에 따라 달라질 수 있습니다.
                </p>
              </div>

              <div className="result-actions">
                <Link to="/contact" className="btn btn-primary">
                  정확한 견적 문의하기
                </Link>
                <button 
                  className="btn btn-secondary"
                  onClick={() => {
                    setShowResult(false);
                    setCurrentStep(0);
                    setSelections({
                      projectType: [],
                      features: [],
                      design: [],
                      timeline: '',
                      userInput: '',
                    });
                  }}
                >
                  다시 견적받기
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  const currentStepData = steps[currentStep];

  return (
    <div className="ai-quote-page">
      <section className="quote-section">
        <div className="container">
          {/* Progress */}
          <div className="quote-progress">
            <div className="progress-bar">
              <div 
                className="progress-fill"
                style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              />
            </div>
            <span className="progress-text">
              {currentStep + 1} / {steps.length}
            </span>
          </div>

          {/* Question */}
          <div className="quote-question">
            <h1>{currentStepData.title}</h1>
            <p>{currentStepData.subtitle}</p>
          </div>

          {/* Options or Text Input */}
          {currentStepData.type === 'text' ? (
            <div className="text-input-section">
              <textarea
                className="feature-input"
                placeholder="예: 쇼핑몰을 만들고 싶어요. 회원가입, 결제 기능이 필요하고 반응형으로 만들어주세요."
                value={selections.userInput}
                onChange={handleTextInput}
                rows={5}
              />
              {selections.userInput && getExtractedFeatures().length > 0 && (
                <div className="extracted-keywords">
                  <span className="extracted-label">자동 인식된 기능:</span>
                  <div className="extracted-tags">
                    {getExtractedFeatures().map(kw => {
                      const allOptions = [...steps[0].options, ...steps[1].options, ...steps[2].options];
                      const found = allOptions.find(o => o.id === kw);
                      return found ? (
                        <span key={kw} className="extracted-tag">{found.label}</span>
                      ) : null;
                    })}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="quote-options">
              {currentStepData.options.map((option) => (
                <button
                  key={option.id}
                  className={`quote-option ${isSelected(option.id) ? 'selected' : ''}`}
                  onClick={() => handleSelect(option.id)}
                >
                  <div className="option-content">
                    <span className="option-label">{option.label}</span>
                    <span className="option-description">{option.description}</span>
                  </div>
                  <div className="option-check">
                    {isSelected(option.id) && (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Navigation */}
          <div className="quote-nav">
            {currentStep > 0 && (
              <button className="btn btn-secondary" onClick={handlePrev}>
                이전
              </button>
            )}
            <button 
              className="btn btn-primary"
              onClick={handleNext}
              disabled={!canProceed()}
            >
              {currentStep < steps.length - 1 ? '다음' : '견적 확인하기'}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AIQuote;
