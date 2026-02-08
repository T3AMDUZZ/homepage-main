import { Link } from 'react-router-dom';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import projects from '../data/projects.json';
import './Solution.css';

const Icons = {
  arrow: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
};

function Solution() {
  return (
    <div className="solution-page">
      {/* Hero */}
      <section className="solution-hero">
        <div className="hero-bg">
          <div className="hero-grid" />
        </div>
        <div className="container">
          <span className="section-label">PORTFOLIO</span>
          <h1>50개 이상의 프로젝트,<br />99% 고객 만족</h1>
          <p>다양한 산업에서 실제 비즈니스 성과를 만들어낸 사례를 소개합니다</p>
          
          <div className="hero-cta">
            <Link to="/ai-quote" className="btn btn-primary">
              내 프로젝트 견적 받기
              <span className="btn-icon">{Icons.arrow}</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="projects section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">SUCCESS STORIES</span>
            <h2>고객의 성공 사례</h2>
            <p>클릭하여 상세 내용을 확인하세요</p>
          </div>

          <div className="projects-grid">
            {projects.map((project, index) => {
              const { ref, isVisible } = useScrollAnimation({ threshold: 0.1, once: true });
              // 결과 데이터에서 첫 번째 항목의 value 가져오기
              const resultItems = project.content?.find(c => c.type === 'results')?.items || [];
              
              return (
                <Link 
                  key={project.id}
                  to={`/portfolio/${project.id}`}
                  ref={ref}
                  className={`project-card ${isVisible ? 'visible' : ''}`}
                  style={{ '--card-index': index }}
                >
                  <div className="project-image">
                    <img src={project.thumbnail} alt={project.title} />
                  </div>
                  
                  <div className="project-content">
                    <div className="project-meta-row">
                      <span className="project-client">{project.client}</span>
                      <span className="project-year">{project.year}</span>
                    </div>
                    <h3 className="project-title">{project.title}</h3>
                    {project.subtitle && <p className="project-subtitle">{project.subtitle}</p>}
                    
                    <div className="project-tags">
                      {project.tags && project.tags.slice(0, 3).map((tag, i) => (
                        <span key={i} className="tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="solution-cta section">
        <div className="container">
          <div className="cta-card">
            <div className="cta-content">
              <h2>우리 비즈니스도 이렇게 성장할 수 있을까요?</h2>
              <p>
                어떤 문제를 해결하고 싶으신지 알려주세요.<br />
                비슷한 사례를 바탕으로 최적의 솔루션을 제안드리겠습니다.
              </p>
            </div>
            <div className="cta-buttons">
              <Link to="/ai-quote" className="btn btn-primary">
                3분 만에 견적 받기
                <span className="btn-icon">{Icons.arrow}</span>
              </Link>
              <Link to="/ai-quote" className="btn btn-secondary">
                AI 견적 받아보기
              </Link>
            </div>
            <div className="cta-trust">
              <span>상담 후 계약 의무 없음</span>
              <span>·</span>
              <span>NDA 체결 가능</span>
              <span>·</span>
              <span>평균 24시간 내 회신</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Solution;
