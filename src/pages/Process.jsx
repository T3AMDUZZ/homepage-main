import { useState, useEffect, useMemo } from 'react';
import { useScrollAnimation, useCountUp, useScrollProgress } from '../hooks/useScrollAnimation';
import './Process.css';

// FAQ 카테고리별 데이터
const faqCategories = [
  {
    id: 'project',
    name: '프로젝트 진행',
    icon: '📋',
    faqs: [
      {
        question: '프로젝트 진행 기간은 어떻게 되나요?',
        answer: '프로젝트 규모와 복잡도에 따라 상이합니다. 일반적으로 소규모 프로젝트는 4-6주, 중규모 프로젝트는 2-4개월, 대규모 프로젝트는 4개월 이상 소요됩니다. 정확한 일정은 요구사항 분석 후 산정해 드립니다.',
      },
      {
        question: '개발 진행 중 요구사항 변경이 가능한가요?',
        answer: '가능합니다. 다만 변경 범위에 따라 추가 비용과 일정 조정이 필요할 수 있습니다. 애자일 방법론을 적용하여 스프린트 단위로 피드백을 반영하므로 유연한 대응이 가능합니다.',
      },
      {
        question: '프로젝트 진행 상황은 어떻게 확인할 수 있나요?',
        answer: '주간/격주 단위로 진행 상황 리포트를 제공합니다. 또한 Slack, Notion 등 협업 툴을 통해 실시간으로 진행 상황을 공유하며, 정기적인 미팅을 통해 데모와 피드백을 진행합니다.',
      },
      {
        question: '프로젝트 중간에 일정 변경이 가능한가요?',
        answer: '가능합니다. 다만 일정 변경 시 전체 프로젝트 일정에 미치는 영향을 분석하여 안내드립니다. 양측 합의 하에 마일스톤을 조정하며, 필요시 추가 리소스를 투입하여 원래 일정을 맞추는 방안도 검토합니다.',
      },
      {
        question: '담당 개발자가 중간에 바뀌지는 않나요?',
        answer: '원칙적으로 프로젝트 담당자는 변경되지 않습니다. 불가피한 상황 발생 시 충분한 인수인계 기간을 두고, 문서화된 내용을 기반으로 전환하여 품질에 영향이 없도록 합니다.',
      },
      {
        question: '프로젝트 시작 전 사전 미팅은 어떻게 진행되나요?',
        answer: '킥오프 미팅에서 프로젝트 목표, 범위, 주요 요구사항, 일정, 커뮤니케이션 방식 등을 협의합니다. 이후 상세 요구사항 분석 미팅을 통해 기능 명세를 확정합니다.',
      },
    ],
  },
  {
    id: 'cost',
    name: '견적 및 비용',
    icon: '💰',
    faqs: [
      {
        question: '견적은 어떤 기준으로 산정되나요?',
        answer: '기능 복잡도, 디자인 요구사항, 연동 시스템, 개발 기간 등을 종합적으로 고려하여 산정합니다. AI 견적 시스템을 통해 대략적인 비용을 확인하시거나, 상세 상담을 통해 정확한 견적을 받으실 수 있습니다.',
      },
      {
        question: '결제 방식은 어떻게 되나요?',
        answer: '일반적으로 계약금(30%), 중도금(40%), 잔금(30%)의 3단계로 진행됩니다. 프로젝트 규모나 클라이언트 요청에 따라 월별 지급 등 유연한 결제 방식 협의가 가능합니다.',
      },
      {
        question: '추가 비용이 발생하는 경우가 있나요?',
        answer: '계약 범위 외 기능 추가, 대폭적인 요구사항 변경, 긴급 일정 요청 등의 경우 추가 비용이 발생할 수 있습니다. 이 경우 사전에 비용과 일정을 안내드리고 협의 후 진행합니다.',
      },
      {
        question: '무료 상담이 가능한가요?',
        answer: '네, 프로젝트에 대한 초기 상담은 무료로 제공합니다. 대략적인 기능 범위, 예산, 일정 등을 파악하고 최적의 솔루션을 제안해 드립니다. 문의하기 페이지를 통해 상담을 신청해 주세요.',
      },
      {
        question: '예산이 한정되어 있는데 개발이 가능할까요?',
        answer: '예산 범위 내에서 가능한 MVP(최소 기능 제품) 개발을 제안드립니다. 핵심 기능을 우선 개발하고, 이후 단계적으로 기능을 확장하는 방식으로 진행할 수 있습니다.',
      },
      {
        question: '세금계산서 발행이 가능한가요?',
        answer: '네, 정식 세금계산서 발행이 가능합니다. 결제 완료 후 요청하신 정보로 세금계산서를 발행해 드립니다.',
      },
      {
        question: '계약 전 개발 범위 확인은 어떻게 하나요?',
        answer: '견적서와 함께 상세 기능 명세서를 제공합니다. 각 기능별 설명, 화면 구성, 기술 스택 등을 명시하여 개발 범위를 명확히 확인하실 수 있습니다.',
      },
    ],
  },
  {
    id: 'contract',
    name: '계약 및 산출물',
    icon: '📄',
    faqs: [
      {
        question: '소스 코드와 산출물은 제공되나요?',
        answer: '네, 프로젝트 완료 후 전체 소스 코드, 기술 문서, 배포 가이드 등 모든 산출물을 제공해 드립니다. 지적재산권은 클라이언트에게 귀속됩니다.',
      },
      {
        question: '계약서에는 어떤 내용이 포함되나요?',
        answer: '프로젝트 범위, 일정, 비용, 결제 조건, 지적재산권, 비밀유지, 하자보증, 분쟁해결 등의 조항이 포함됩니다. 표준 계약서를 기반으로 하되, 클라이언트 요청에 따라 조정 가능합니다.',
      },
      {
        question: '중도 해지 시 어떻게 되나요?',
        answer: '진행 상황에 따라 정산됩니다. 완료된 작업물에 대한 비용을 정산하고, 해당 시점까지의 산출물을 전달해 드립니다. 상세 조건은 계약서에 명시됩니다.',
      },
      {
        question: 'NDA(비밀유지계약) 체결이 가능한가요?',
        answer: '네, 프로젝트 시작 전 NDA 체결이 가능합니다. 클라이언트의 사업 아이디어, 기술 정보, 내부 데이터 등에 대한 철저한 보안을 약속드립니다.',
      },
      {
        question: '디자인 파일도 제공되나요?',
        answer: '네, Figma 원본 파일, 이미지 에셋, 아이콘 등 모든 디자인 산출물을 제공합니다. 향후 추가 개발이나 수정 시 활용하실 수 있습니다.',
      },
      {
        question: '제3자에게 개발을 재위탁하나요?',
        answer: '핵심 개발은 자사 인력이 직접 수행합니다. 일부 전문 분야(예: 3D 모델링, 특수 효과 등)의 경우 전문 파트너와 협업할 수 있으며, 이 경우 사전에 안내드립니다.',
      },
    ],
  },
  {
    id: 'maintenance',
    name: '유지보수 및 지원',
    icon: '🔧',
    faqs: [
      {
        question: '유지보수 계약은 필수인가요?',
        answer: '필수는 아니지만 권장드립니다. 서비스 안정성과 보안을 위해 지속적인 모니터링과 업데이트가 필요합니다. 모든 프로젝트에는 무상 유지보수 기간이 포함되어 있습니다.',
      },
      {
        question: '무상 유지보수 기간은 얼마나 되나요?',
        answer: '선택하신 서비스 플랜에 따라 1~6개월의 무상 유지보수 기간이 제공됩니다. 이 기간 동안 버그 수정, 소규모 기능 개선 등을 무료로 지원해 드립니다.',
      },
      {
        question: '장애 발생 시 대응은 어떻게 하나요?',
        answer: '유지보수 계약 시 SLA에 따라 대응합니다. Basic은 영업일 기준 24시간, Standard는 12시간, Premium은 긴급 상황 시 즉시 대응합니다. 24/7 모니터링 서비스도 제공됩니다.',
      },
      {
        question: '유지보수 없이 운영 가능한가요?',
        answer: '기술적으로 가능하지만, 보안 패치, 서버 관리, 성능 최적화 등을 위해 유지보수를 권장합니다. 클라이언트 내부 인력이 관리할 경우 기술 이전 및 교육을 제공해 드립니다.',
      },
      {
        question: '기능 추가도 유지보수에 포함되나요?',
        answer: '소규모 기능 개선은 유지보수 범위에 포함될 수 있으나, 신규 기능 개발은 별도 견적으로 진행됩니다. 요청 사항에 따라 범위를 구분하여 안내드립니다.',
      },
      {
        question: '서버 호스팅도 지원하나요?',
        answer: '네, AWS, GCP, Azure 등 클라우드 서버 구축 및 관리 서비스를 제공합니다. 서버 비용은 실사용량 기준으로 청구되며, 관리 비용은 유지보수 요금에 포함됩니다.',
      },
    ],
  },
  {
    id: 'tech',
    name: '기술 및 개발',
    icon: '💻',
    faqs: [
      {
        question: '어떤 기술 스택을 사용하나요?',
        answer: '프로젝트 요구사항에 최적화된 기술을 선택합니다. 프론트엔드는 React, Vue, Next.js 등, 백엔드는 Node.js, Python, Java 등, 데이터베이스는 PostgreSQL, MongoDB 등을 주로 사용합니다.',
      },
      {
        question: '기존 시스템의 개선이나 마이그레이션도 가능한가요?',
        answer: '가능합니다. 레거시 시스템 분석, 성능 개선, 기술 스택 마이그레이션, 클라우드 전환 등 다양한 시스템 개선 프로젝트를 수행하고 있습니다.',
      },
      {
        question: '모바일 앱 개발도 가능한가요?',
        answer: '네, iOS/Android 네이티브 앱, React Native/Flutter를 이용한 크로스 플랫폼 앱 개발이 가능합니다. 웹과 앱을 함께 개발하는 통합 프로젝트도 진행합니다.',
      },
      {
        question: 'API 연동이 가능한가요?',
        answer: '네, 다양한 외부 서비스(결제, 소셜 로그인, 지도, 메시징 등)와의 API 연동이 가능합니다. 필요시 RESTful API나 GraphQL API를 직접 설계하고 개발해 드립니다.',
      },
      {
        question: '보안은 어떻게 관리하나요?',
        answer: 'OWASP 보안 가이드라인을 준수하며, SSL 인증서 적용, 데이터 암호화, 취약점 점검 등을 수행합니다. 금융/의료 등 민감 데이터 처리 시 해당 규정을 준수합니다.',
      },
      {
        question: 'AI/ML 기능 개발도 가능한가요?',
        answer: '네, ChatGPT API 연동, 자연어 처리, 이미지 인식, 추천 시스템 등 AI/ML 기능 개발이 가능합니다. 프로젝트 특성에 맞는 최적의 AI 솔루션을 제안드립니다.',
      },
      {
        question: '반응형 웹사이트 개발이 가능한가요?',
        answer: '모든 웹 프로젝트는 기본적으로 반응형으로 개발됩니다. PC, 태블릿, 모바일 등 다양한 디바이스에서 최적화된 사용자 경험을 제공합니다.',
      },
      {
        question: '성능 최적화는 어떻게 진행하나요?',
        answer: '코드 스플리팅, 이미지 최적화, CDN 적용, 캐싱 전략, 데이터베이스 인덱싱 등 다양한 기법을 적용합니다. Lighthouse 기준 90점 이상의 성능 점수를 목표로 합니다.',
      },
    ],
  },
];

// 개별 스텝 컴포넌트
function ProcessStep({ step, index, isActive }) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.3, once: true });
  
  return (
    <div 
      ref={ref}
      className={`step-item ${isVisible ? 'visible' : ''} ${isActive ? 'active' : ''}`}
      style={{ '--step-index': index }}
    >
      <div className="step-indicator">
        <div className="step-line">
          <div className="step-line-fill" style={{ height: isActive ? '100%' : '0%' }} />
        </div>
        <div className="step-dot">
          <span className="step-num">{step.number}</span>
        </div>
      </div>
      
      <div className="step-content">
        <div className="step-header">
          <h3>{step.title}</h3>
          <span className="step-duration">{step.duration}</span>
        </div>
        <p className="step-description">{step.description}</p>
        
        <ul className="step-details-list">
          {step.details.map((detail, i) => (
            <li key={i} style={{ '--detail-index': i }}>{detail}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// 카운트업 통계 컴포넌트
function StatCounter({ value, suffix, label }) {
  const numericValue = parseInt(value.replace(/[^0-9]/g, ''));
  const { ref, count } = useCountUp(numericValue, 2000);
  
  return (
    <div ref={ref} className="stat-counter">
      <span className="stat-value">{count}{suffix}</span>
      <span className="stat-label">{label}</span>
    </div>
  );
}

// FAQ 아이템 컴포넌트 (훅 규칙을 위해 분리)
function FaqItem({ faq, index, isOpen, onToggle }) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1, once: true });
  
  return (
    <div 
      ref={ref}
      className={`faq-item ${isOpen ? 'open' : ''} ${isVisible ? 'visible' : ''}`}
      style={{ '--faq-index': index % 10 }}
      onClick={onToggle}
    >
      <div className="faq-question">
        <span className="faq-text">{faq.question}</span>
        <div className="faq-icon">
          <span className="icon-line horizontal" />
          <span className="icon-line vertical" />
        </div>
      </div>
      <div className="faq-answer">
        <p>{faq.answer}</p>
      </div>
    </div>
  );
}

function Process() {
  const [openFaq, setOpenFaq] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const { containerRef, progress } = useScrollProgress();

  // 검색 및 필터링된 FAQ
  const filteredFaqs = useMemo(() => {
    let result = [];
    
    faqCategories.forEach(category => {
      const categoryFaqs = category.faqs.map((faq, idx) => ({
        ...faq,
        categoryId: category.id,
        categoryName: category.name,
        categoryIcon: category.icon,
        globalIndex: `${category.id}-${idx}`,
      }));
      
      if (activeCategory === 'all' || activeCategory === category.id) {
        result = [...result, ...categoryFaqs];
      }
    });

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(faq => 
        faq.question.toLowerCase().includes(query) ||
        faq.answer.toLowerCase().includes(query)
      );
    }

    return result;
  }, [activeCategory, searchQuery]);

  useEffect(() => {
    const stepCount = 6;
    const newActiveStep = Math.min(stepCount - 1, Math.floor(progress * stepCount * 1.5));
    setActiveStep(newActiveStep);
  }, [progress]);

  const processSteps = [
    {
      number: '01',
      title: '요구사항 분석',
      duration: '1-2주',
      description: '비즈니스 목표와 기술적 요구사항을 정밀하게 분석하여 최적의 솔루션을 설계합니다.',
      details: [
        '비즈니스 목표 및 KPI 정의',
        '기술 스택 및 아키텍처 선정',
        '프로젝트 스코프 및 마일스톤 설정',
        '리소스 및 일정 산정',
      ],
    },
    {
      number: '02',
      title: 'UI/UX 설계',
      duration: '2-3주',
      description: '사용자 경험을 최우선으로 고려한 인터페이스를 설계합니다.',
      details: [
        '정보 구조(IA) 설계',
        '와이어프레임 및 프로토타입',
        '비주얼 디자인 시스템 구축',
        '디자인 QA 및 핸드오프',
      ],
    },
    {
      number: '03',
      title: '개발',
      duration: '4-8주',
      description: '검증된 기술 스택과 베스트 프랙티스를 적용하여 안정적인 시스템을 구축합니다.',
      details: [
        '프론트엔드/백엔드 개발',
        'API 설계 및 구현',
        '데이터베이스 모델링',
        '코드 리뷰 및 리팩토링',
      ],
    },
    {
      number: '04',
      title: '품질 검증',
      duration: '1-2주',
      description: '철저한 테스트를 통해 서비스 품질을 보장합니다.',
      details: [
        '기능/회귀 테스트',
        '성능 및 부하 테스트',
        '보안 취약점 점검',
        '크로스 브라우저/디바이스 테스트',
      ],
    },
    {
      number: '05',
      title: '배포',
      duration: '1주',
      description: '안정적인 인프라 환경에서 서비스를 런칭합니다.',
      details: [
        '클라우드 인프라 구축',
        'CI/CD 파이프라인 설정',
        '모니터링 및 알림 시스템 구축',
        '프로덕션 배포 및 검증',
      ],
    },
    {
      number: '06',
      title: '운영 및 유지보수',
      duration: '지속',
      description: '서비스의 안정적인 운영과 지속적인 개선을 지원합니다.',
      details: [
        '24/7 시스템 모니터링',
        '장애 대응 및 복구',
        '성능 최적화',
        '기능 고도화 및 업데이트',
      ],
    },
  ];

  const stats = [
    { value: '50', suffix: '+', label: '프로젝트 수행' },
    { value: '99', suffix: '%', label: '고객 만족도' },
    { value: '24', suffix: '/7', label: '기술 지원' },
    { value: '5', suffix: '년+', label: '평균 경력' },
  ];

  const pricingPlans = [
    {
      name: 'Standard',
      description: '스타트업 및 소규모 비즈니스',
      price: '200만원~',
      features: [
        '반응형 웹사이트 개발',
        '최대 5개 페이지',
        '기본 SEO 최적화',
        '1개월 무상 유지보수',
        '이메일 기술 지원',
      ],
      popular: false,
    },
    {
      name: 'Professional',
      description: '성장하는 중소기업',
      price: '800만원~',
      features: [
        '맞춤형 웹 애플리케이션',
        '관리자 대시보드 포함',
        '외부 API 연동',
        '3개월 무상 유지보수',
        '우선 기술 지원',
        '성능 최적화 포함',
      ],
      popular: true,
    },
    {
      name: 'Enterprise',
      description: '대규모 시스템 구축',
      price: '협의',
      features: [
        '엔터프라이즈급 아키텍처',
        '마이크로서비스 설계',
        'AI/ML 솔루션 통합',
        '6개월 무상 유지보수',
        '전담 기술 매니저',
        'SLA 보장',
      ],
      popular: false,
    },
  ];

  const maintenancePlans = [
    {
      name: 'Basic',
      price: '30만원/월',
      features: ['버그 수정', '보안 패치', '월간 리포트', '이메일 지원'],
    },
    {
      name: 'Standard',
      price: '60만원/월',
      features: ['Basic 포함', '기능 업데이트', '성능 모니터링', '전화 지원'],
    },
    {
      name: 'Premium',
      price: '120만원/월',
      features: ['Standard 포함', '24/7 모니터링', '긴급 대응', '전담 매니저'],
    },
  ];


  return (
    <div className="process-page">
      {/* Hero */}
      <section className="process-hero">
        <div className="hero-background">
          <div className="hero-grid" />
        </div>
        <div className="container">
          <span className="section-label">DEVELOPMENT PROCESS</span>
          <h1>체계적인 개발 프로세스</h1>
          <p>검증된 방법론과 프로세스로 프로젝트 성공을 보장합니다</p>
        </div>
      </section>

      {/* Stats */}
      <section className="stats-section section">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <StatCounter 
                key={index}
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="process-timeline section" ref={containerRef}>
        <div className="container">
          <div className="section-header">
            <span className="section-label">WORKFLOW</span>
            <h2>개발 단계</h2>
            <p>6단계의 체계적인 프로세스를 통해 높은 품질의 결과물을 제공합니다</p>
          </div>

          {/* Progress Bar */}
          <div className="timeline-progress">
            <div className="progress-track">
              <div 
                className="progress-fill"
                style={{ width: `${Math.min(progress * 150, 100)}%` }}
              />
            </div>
            <div className="progress-steps">
              {processSteps.map((step, index) => (
                <div 
                  key={index}
                  className={`progress-step ${index <= activeStep ? 'active' : ''}`}
                >
                  <span>{step.number}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="timeline-container">
            {processSteps.map((step, index) => (
              <ProcessStep 
                key={index}
                step={step}
                index={index}
                isActive={index <= activeStep}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Billing */}
      <section className="billing section" id="billing">
        <div className="container">
          <div className="section-header">
            <span className="section-label">PRICING</span>
            <h2>서비스 요금</h2>
            <p>프로젝트 규모에 맞는 최적의 플랜을 선택하세요</p>
          </div>

          <div className="pricing-grid">
            {pricingPlans.map((plan, index) => {
              const { ref, isVisible } = useScrollAnimation({ threshold: 0.2, once: true });
              return (
                <div 
                  key={index} 
                  ref={ref}
                  className={`pricing-card ${plan.popular ? 'popular' : ''} ${isVisible ? 'visible' : ''}`}
                  style={{ '--card-index': index }}
                >
                  {plan.popular && <span className="popular-badge">추천</span>}
                  <h3>{plan.name}</h3>
                  <p className="plan-description">{plan.description}</p>
                  <div className="plan-price">
                    <span className="price">{plan.price}</span>
                  </div>
                  <ul className="plan-features">
                    {plan.features.map((feature, i) => (
                      <li key={i}>{feature}</li>
                    ))}
                  </ul>
                  <a href="/contact" className="btn btn-secondary plan-btn">문의하기</a>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Maintenance */}
      <section className="maintenance section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">MAINTENANCE</span>
            <h2>유지보수 서비스</h2>
            <p>안정적인 서비스 운영을 위한 체계적인 유지보수</p>
          </div>

          <div className="maintenance-grid">
            {maintenancePlans.map((plan, index) => {
              const { ref, isVisible } = useScrollAnimation({ threshold: 0.2, once: true });
              return (
                <div 
                  key={index} 
                  ref={ref}
                  className={`maintenance-card ${isVisible ? 'visible' : ''}`}
                  style={{ '--card-index': index }}
                >
                  <h3>{plan.name}</h3>
                  <div className="maintenance-price">{plan.price}</div>
                  <ul>
                    {plan.features.map((feature, i) => (
                      <li key={i}>{feature}</li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq section" id="faq">
        <div className="container">
          <div className="section-header">
            <span className="section-label">FAQ</span>
            <h2>자주 묻는 질문</h2>
            <p>궁금하신 점을 빠르게 찾아보세요</p>
          </div>

          <div className="faq-container">
            {/* 왼쪽 사이드바 메뉴 */}
            <aside className="faq-sidebar">
              {/* 검색창 */}
              <div className="faq-search">
                <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
                <input
                  type="text"
                  placeholder="검색..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="faq-search-input"
                />
                {searchQuery && (
                  <button 
                    className="search-clear"
                    onClick={() => setSearchQuery('')}
                  >
                    ×
                  </button>
                )}
              </div>

              {/* 카테고리 메뉴 */}
              <nav className="faq-menu">
                <button
                  className={`faq-menu-item ${activeCategory === 'all' ? 'active' : ''}`}
                  onClick={() => { setActiveCategory('all'); setOpenFaq(null); }}
                >
                  <span className="menu-icon">📌</span>
                  <span className="menu-text">전체</span>
                  <span className="menu-count">{faqCategories.reduce((acc, cat) => acc + cat.faqs.length, 0)}</span>
                </button>
                {faqCategories.map((category) => (
                  <button
                    key={category.id}
                    className={`faq-menu-item ${activeCategory === category.id ? 'active' : ''}`}
                    onClick={() => { setActiveCategory(category.id); setOpenFaq(null); }}
                  >
                    <span className="menu-icon">{category.icon}</span>
                    <span className="menu-text">{category.name}</span>
                    <span className="menu-count">{category.faqs.length}</span>
                  </button>
                ))}
              </nav>
            </aside>

            {/* 오른쪽 FAQ 콘텐츠 */}
            <div className="faq-content">
              {/* 현재 카테고리 제목 */}
              <div className="faq-content-header">
                <h3>
                  {activeCategory === 'all' 
                    ? '📌 전체 질문' 
                    : `${faqCategories.find(c => c.id === activeCategory)?.icon} ${faqCategories.find(c => c.id === activeCategory)?.name}`
                  }
                </h3>
                {searchQuery && (
                  <span className="faq-search-result">
                    <span className="search-result-count">{filteredFaqs.length}</span>개 결과
                  </span>
                )}
              </div>

              {/* FAQ 리스트 */}
              <div className="faq-list">
                {filteredFaqs.length > 0 ? (
                  filteredFaqs.map((faq, index) => (
                    <FaqItem
                      key={faq.globalIndex}
                      faq={faq}
                      index={index}
                      isOpen={openFaq === faq.globalIndex}
                      onToggle={() => setOpenFaq(openFaq === faq.globalIndex ? null : faq.globalIndex)}
                    />
                  ))
                ) : (
                  <div className="faq-no-result">
                    <div className="no-result-icon">🔍</div>
                    <h3>검색 결과가 없습니다</h3>
                    <p>다른 키워드로 검색해 보세요</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="process-cta section">
        <div className="container">
          <div className="cta-card">
            <h2>프로젝트를 시작하시겠습니까?</h2>
            <p>비즈니스 요구사항을 공유해 주시면 최적의 솔루션을 제안드리겠습니다.</p>
            <div className="cta-buttons">
              <a href="/ai-quote" className="btn btn-primary">AI 견적받기</a>
              <a href="/contact" className="btn btn-secondary">문의하기</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Process;
