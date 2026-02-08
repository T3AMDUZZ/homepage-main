import { Link } from 'react-router-dom';
import { useScrollAnimation, useCountUp } from '../hooks/useScrollAnimation';
import './Main.css';

// 카운터 컴포넌트
function StatCounter({ value, suffix, label }) {
  const numericValue = parseInt(value.replace(/[^0-9]/g, ''));
  const { ref, count } = useCountUp(numericValue, 2000);
  
  return (
    <div ref={ref} className="stat-item">
      <span className="stat-value">{count}{suffix}</span>
      <span className="stat-label">{label}</span>
    </div>
  );
}

// 서비스 카드 컴포넌트
function ServiceCard({ service, index }) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2, once: true });
  
  return (
    <div 
      ref={ref}
      className={`service-card ${isVisible ? 'visible' : ''}`}
      style={{ '--card-index': index }}
    >
      <span className="service-number">{String(index + 1).padStart(2, '0')}</span>
      <h3>{service.title}</h3>
      <p>{service.description}</p>
      <ul className="service-features">
        {service.features.map((feature, i) => (
          <li key={i}>{feature}</li>
        ))}
      </ul>
    </div>
  );
}

// 클라이언트 로고 컴포넌트
function ClientLogo({ client, index }) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2, once: true });
  return (
    <div 
      ref={ref}
      className={`client-logo ${isVisible ? 'visible' : ''}`}
      style={{ '--card-index': index }}
    >
      <span>{client.logo}</span>
    </div>
  );
}

// 가치 카드 컴포넌트
function ValueCard({ value, index }) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2, once: true });
  return (
    <div 
      ref={ref}
      className={`value-card ${isVisible ? 'visible' : ''}`}
      style={{ '--card-index': index }}
    >
      <span className="value-number">{String(index + 1).padStart(2, '0')}</span>
      <h3>{value.title}</h3>
      <p>{value.description}</p>
    </div>
  );
}

// 프로세스 스텝 컴포넌트
function ProcessStepItem({ step, index }) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1, once: true });
  return (
    <div 
      ref={ref}
      className={`process-step ${isVisible ? 'visible' : ''}`}
      style={{ '--step-index': index }}
    >
      <div className="step-number">{step.number}</div>
      <div className="step-title">{step.title}</div>
    </div>
  );
}

// 프로젝트 카드 컴포넌트
function ProjectCard({ project, index }) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1, once: true });
  return (
    <div 
      ref={ref}
      className={`project-card ${isVisible ? 'visible' : ''}`}
      style={{ '--card-index': index }}
    >
      <div className="project-image">
        <img src={project.image} alt={project.title} />
      </div>
      <div className="project-content">
        <div className="project-meta">
          <span className="project-category">{project.category}</span>
          <span className="project-client">{project.client}</span>
        </div>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <div className="project-tags">
          {project.tags.map((tag, i) => (
            <span key={i} className="tag">{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

// FAQ 아이템 컴포넌트
function FaqPreviewItem({ faq, index }) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1, once: true });
  return (
    <div 
      ref={ref}
      className={`faq-item ${isVisible ? 'visible' : ''}`}
      style={{ '--faq-index': index }}
    >
      <div className="faq-q">
        <span className="faq-label">Q</span>
        <span>{faq.question}</span>
      </div>
      <div className="faq-a">
        <span className="faq-label">A</span>
        <span>{faq.answer}</span>
      </div>
    </div>
  );
}

function Main() {
  const services = [
    {
      title: '웹 개발',
      description: '비즈니스 요구사항에 최적화된 웹사이트 및 웹 애플리케이션을 구축합니다.',
      features: ['반응형 웹사이트', 'SPA/PWA', '관리자 시스템', 'API 개발'],
    },
    {
      title: '모바일 앱',
      description: 'iOS와 Android를 동시에 지원하는 크로스 플랫폼 앱을 개발합니다.',
      features: ['React Native', 'Flutter', '네이티브 앱', '하이브리드 앱'],
    },
    {
      title: 'AI 솔루션',
      description: '인공지능 기술을 활용한 비즈니스 자동화 및 데이터 분석 솔루션을 제공합니다.',
      features: ['챗봇 개발', 'ML 모델 구축', '데이터 분석', '프로세스 자동화'],
    },
    {
      title: 'UI/UX 설계',
      description: '사용자 중심의 직관적인 인터페이스와 경험을 설계합니다.',
      features: ['UX 리서치', 'UI 디자인', '프로토타이핑', '디자인 시스템'],
    },
  ];

  const values = [
    {
      title: '기술 전문성',
      description: '5년 이상 경력의 시니어 개발자들이 최신 기술 스택을 활용하여 안정적인 솔루션을 구축합니다.',
    },
    {
      title: '체계적인 프로세스',
      description: '요구사항 분석부터 배포, 운영까지 검증된 프로세스를 통해 프로젝트의 성공을 보장합니다.',
    },
    {
      title: '투명한 커뮤니케이션',
      description: '프로젝트 진행 상황을 실시간으로 공유하며, 신속한 피드백과 의사결정을 지원합니다.',
    },
    {
      title: '지속적인 파트너십',
      description: '프로젝트 완료 후에도 안정적인 유지보수와 기술 지원을 통해 장기적인 협력 관계를 유지합니다.',
    },
  ];

  const stats = [
    { value: '50', suffix: '+', label: '프로젝트 완료' },
    { value: '99', suffix: '%', label: '고객 만족도' },
    { value: '24', suffix: '/7', label: '기술 지원' },
    { value: '5', suffix: '년+', label: '평균 경력' },
  ];

  const clients = [
    { name: 'Client A', logo: 'A' },
    { name: 'Client B', logo: 'B' },
    { name: 'Client C', logo: 'C' },
    { name: 'Client D', logo: 'D' },
    { name: 'Client E', logo: 'E' },
    { name: 'Client F', logo: 'F' },
  ];

  const processSteps = [
    { number: '01', title: '요구사항 분석' },
    { number: '02', title: 'UI/UX 설계' },
    { number: '03', title: '개발' },
    { number: '04', title: '품질 검증' },
    { number: '05', title: '배포' },
    { number: '06', title: '유지보수' },
  ];

  const featuredProjects = [
    {
      title: '이커머스 플랫폼',
      category: '웹 개발',
      client: '대형 유통사',
      description: '대규모 트래픽을 처리하는 B2C 쇼핑몰 플랫폼',
      tags: ['React', 'Node.js', 'AWS'],
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop',
    },
    {
      title: '핀테크 모바일 앱',
      category: '앱 개발',
      client: '금융 스타트업',
      description: '간편 결제 및 자산 관리 통합 금융 앱',
      tags: ['Flutter', 'Firebase', 'Stripe'],
      image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&h=400&fit=crop',
    },
    {
      title: 'AI 고객 상담 시스템',
      category: 'AI 솔루션',
      client: '대기업 고객센터',
      description: 'NLP 기반 지능형 고객 응대 자동화 시스템',
      tags: ['Python', 'TensorFlow', 'NLP'],
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop',
    },
  ];

  const faqs = [
    {
      question: '개발 기간은 얼마나 소요되나요?',
      answer: '프로젝트 규모에 따라 상이합니다. 소규모 2-4주, 중규모 1-3개월이 일반적입니다.',
    },
    {
      question: '견적은 어떻게 산정되나요?',
      answer: '기능, 디자인, 개발 기간을 종합적으로 고려하여 산정합니다. AI 견적으로 대략적인 비용을 먼저 확인하실 수 있습니다.',
    },
    {
      question: '유지보수도 지원하시나요?',
      answer: '모든 프로젝트에 무상 유지보수 기간이 포함되어 있으며, 이후에도 지속적인 기술 지원을 제공합니다.',
    },
  ];

  return (
    <div className="main-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-bg">
          <div className="hero-gradient"></div>
          <div className="hero-grid"></div>
        </div>

        {/* 배경 이미지들 - 상담 및 개발 장면 */}
        <div className="hero-images">
          <div className="hero-image-item hero-image-1">
            <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&h=260&fit=crop" alt="팀 미팅" />
          </div>
          <div className="hero-image-item hero-image-2">
            <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=440&h=280&fit=crop" alt="코딩 작업" />
          </div>
          <div className="hero-image-item hero-image-3">
            <img src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=360&h=240&fit=crop" alt="상담 미팅" />
          </div>
          <div className="hero-image-item hero-image-4">
            <img src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=420&h=260&fit=crop" alt="개발 화면" />
          </div>
        </div>

        {/* 코드 스니펫 데코레이션 */}
        <div className="hero-code-snippet left">
          <span className="code-line"><span className="code-keyword">const</span> <span className="code-function">buildSolution</span> = () =&gt; {'{'}</span>
          <span className="code-line">  <span className="code-keyword">return</span> <span className="code-string">"success"</span>;</span>
          <span className="code-line">{'}'};</span>
        </div>

        <div className="hero-code-snippet right">
          <span className="code-line"><span className="code-comment">// Your project starts here</span></span>
          <span className="code-line"><span className="code-function">deploy</span>();</span>
        </div>

        {/* 뱃지 데코레이션 */}
        <div className="hero-badge top-left">
          <span className="badge-icon">💬</span>
          <span className="badge-text">
            <span className="badge-title">전문 상담</span>
            <span className="badge-value">1:1 맞춤 컨설팅</span>
          </span>
        </div>

        <div className="hero-badge bottom-right">
          <span className="badge-icon">⚡</span>
          <span className="badge-text">
            <span className="badge-title">평균 응답</span>
            <span className="badge-value">24시간 이내</span>
          </span>
        </div>
        
        <div className="hero-content container">
          <span className="hero-label">Trusted Web Solution Partner</span>
          
          <h1 className="hero-title">
            신뢰할 수 있는<br />
            <span className="gradient-text">기술 파트너</span>와 함께
          </h1>
          
          <p className="hero-description">
            50개 이상의 프로젝트 경험, 99% 고객 만족도<br />
            검증된 전문가 팀이 비즈니스 성장을 함께합니다.
          </p>
          
          <div className="hero-buttons">
            <Link to="/ai-quote" className="btn btn-primary">
              AI 견적받기
            </Link>
            <Link to="/contact" className="btn btn-secondary">
              무료 상담 신청
            </Link>
          </div>

          <div className="hero-trust">
            <div className="trust-avatars">
              {[1,2,3,4,5].map((i) => (
                <div key={i} className="trust-avatar" style={{ '--i': i }}>
                  {String.fromCharCode(64 + i)}
                </div>
              ))}
              <div className="trust-more">+45</div>
            </div>
            <span className="trust-text">50개 이상의 기업이 TEAM DUZZ를 선택했습니다</span>
          </div>
        </div>

        <div className="hero-scroll">
          <div className="scroll-indicator">
            <div className="scroll-dot"></div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="stats section">
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

      {/* Clients */}
      <section className="clients section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">TRUSTED BY</span>
            <h2>신뢰할 수 있는 파트너</h2>
          </div>

          <div className="clients-grid">
            {clients.map((client, index) => (
              <ClientLogo key={index} client={client} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="values section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">WHY US</span>
            <h2>TEAM DUZZ를 선택하는 이유</h2>
            <p>단순한 외주 개발이 아닌, 비즈니스 성장을 함께하는 기술 파트너입니다.</p>
          </div>

          <div className="values-grid">
            {values.map((value, index) => (
              <ValueCard key={index} value={value} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="services section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">SERVICES</span>
            <h2>제공 서비스</h2>
            <p>웹, 앱, AI — 디지털 비즈니스에 필요한 모든 솔루션을 제공합니다.</p>
          </div>

          <div className="services-grid">
            {services.map((service, index) => (
              <ServiceCard key={index} service={service} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Process Preview */}
      <section className="process-preview section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">PROCESS</span>
            <h2>개발 프로세스</h2>
            <p>6단계의 체계적인 프로세스를 통해 높은 품질의 결과물을 제공합니다.</p>
          </div>

          <div className="process-timeline">
            {processSteps.map((step, index) => (
              <ProcessStepItem key={index} step={step} index={index} />
            ))}
          </div>

          <div className="process-cta">
            <Link to="/process" className="btn btn-secondary">
              프로세스 상세 보기
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="featured-projects section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">PORTFOLIO</span>
            <h2>주요 프로젝트</h2>
            <p>다양한 산업 분야의 성공적인 프로젝트 사례</p>
          </div>

          <div className="projects-grid">
            {featuredProjects.map((project, index) => (
              <ProjectCard key={index} project={project} index={index} />
            ))}
          </div>

          <div className="projects-cta">
            <Link to="/solution" className="btn btn-secondary">
              전체 포트폴리오 보기
            </Link>
          </div>
        </div>
      </section>

      {/* AI Quote Teaser */}
      <section className="ai-quote-teaser section">
        <div className="container">
          <div className="teaser-card">
            <div className="teaser-content">
              <span className="section-label">AI QUOTE</span>
              <h2>프로젝트 견적,<br />3분 안에 확인하세요</h2>
              <p>
                복잡한 견적 과정 없이 AI가 자동으로 계산합니다.<br />
                프로젝트 유형과 기능을 선택하면 예상 비용을 즉시 확인할 수 있습니다.
              </p>
              <ul className="teaser-features">
                <li>3분 내 간편 견적</li>
                <li>프로젝트 유형별 맞춤 산정</li>
                <li>상담 전 예산 계획 가능</li>
              </ul>
              <Link to="/ai-quote" className="btn btn-primary">
                견적 확인하기
              </Link>
            </div>
            <div className="teaser-visual">
              <div className="visual-mockup">
                <div className="mockup-header">
                  <span>예상 견적</span>
                </div>
                <div className="mockup-body">
                  <div className="mockup-item">
                    <span>웹 개발</span>
                    <span className="mockup-check">✓</span>
                  </div>
                  <div className="mockup-item">
                    <span>관리자 페이지</span>
                    <span className="mockup-check">✓</span>
                  </div>
                  <div className="mockup-item">
                    <span>반응형 디자인</span>
                    <span className="mockup-check">✓</span>
                  </div>
                  <div className="mockup-result">
                    <span>예상 비용</span>
                    <span className="mockup-price">800만원 ~</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Preview */}
      <section className="faq-preview section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">FAQ</span>
            <h2>자주 묻는 질문</h2>
          </div>

          <div className="faq-list">
            {faqs.map((faq, index) => (
              <FaqPreviewItem key={index} faq={faq} index={index} />
            ))}
          </div>

          <div className="faq-cta">
            <Link to="/process#faq" className="btn btn-secondary">
              전체 FAQ 보기
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta section">
        <div className="container">
          <div className="cta-card">
            <div className="cta-content">
              <h2>프로젝트를 시작하시겠습니까?</h2>
              <p>
                아이디어 단계부터 상담 가능합니다.<br />
                프로젝트 요구사항을 공유해 주시면 최적의 솔루션을 제안드리겠습니다.
              </p>
            </div>
            <div className="cta-buttons">
              <Link to="/ai-quote" className="btn btn-primary">
                AI 견적받기
              </Link>
              <Link to="/contact" className="btn btn-secondary">
                상담 문의
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Main;
