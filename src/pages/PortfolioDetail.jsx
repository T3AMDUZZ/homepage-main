import { useParams, Link, useNavigate } from 'react-router-dom';
import projects from '../data/projects.json';
import './PortfolioDetail.css';

// 이미지 경로 처리 함수 - assets 또는 외부 URL 모두 지원
const getImageSrc = (src) => {
  if (!src) return '';
  // 외부 URL인 경우 그대로 반환
  if (src.startsWith('http://') || src.startsWith('https://')) {
    return src;
  }
  // 로컬 assets 경로인 경우 그대로 반환 (public 폴더 기준)
  return src;
};

// 콘텐츠 블록 렌더링 컴포넌트
function ContentBlock({ block }) {
  switch (block.type) {
    case 'intro':
      return (
        <div className="content-intro">
          <p>{block.text}</p>
        </div>
      );
    
    case 'heading':
      return <h2 className="content-heading">{block.text}</h2>;
    
    case 'paragraph':
      return <p className="content-paragraph">{block.text}</p>;
    
    case 'image':
      return (
        <figure className="content-image">
          <img src={getImageSrc(block.src)} alt={block.caption || ''} />
          {block.caption && <figcaption>{block.caption}</figcaption>}
        </figure>
      );
    
    case 'list':
      return (
        <ul className="content-list">
          {block.items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      );
    
    case 'results':
      return (
        <div className="content-results">
          {block.items.map((item, index) => (
            <div key={index} className="result-item">
              <span className="result-value">{item.value}</span>
              <span className="result-label">{item.label}</span>
            </div>
          ))}
        </div>
      );
    
    case 'quote':
      return (
        <blockquote className="content-quote">
          <p>"{block.text}"</p>
          <cite>— {block.author}</cite>
        </blockquote>
      );
    
    default:
      return null;
  }
}

function PortfolioDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const project = projects.find(p => p.id === id);
  
  if (!project) {
    return (
      <div className="portfolio-detail-page">
        <div className="container">
          <div className="not-found">
            <h1>프로젝트를 찾을 수 없습니다</h1>
            <p>요청하신 프로젝트가 존재하지 않습니다.</p>
            <Link to="/solution" className="btn btn-primary">
              포트폴리오로 돌아가기
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 이전/다음 프로젝트 찾기
  const currentIndex = projects.findIndex(p => p.id === id);
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  return (
    <div className="portfolio-detail-page">
      {/* Hero */}
      <section className="blog-hero">
        <div className="hero-bg">
          <img src={getImageSrc(project.heroImage || project.thumbnail)} alt={project.title} />
          <div className="hero-overlay" />
        </div>
        
        <div className="container">
          <button className="back-btn" onClick={() => navigate('/solution')}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            포트폴리오
          </button>

          <div className="hero-content">
            <div className="hero-meta">
              <span className="meta-client">{project.client}</span>
              <span className="meta-divider">·</span>
              <span className="meta-year">{project.year}</span>
              <span className="meta-divider">·</span>
              <span className="meta-duration">{project.duration}</span>
            </div>
            
            <h1>{project.title}</h1>
            {project.subtitle && <p className="hero-subtitle">{project.subtitle}</p>}

            <div className="hero-tags">
              {project.tags && project.tags.map((tag, index) => (
                <span key={index} className="tag">{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <article className="blog-content">
        <div className="container">
          <div className="blog-article">
            {project.content && project.content.map((block, index) => (
              <ContentBlock key={index} block={block} />
            ))}
          </div>

          {/* CTA */}
          <div className="blog-cta">
            <div className="cta-card">
              <h3>비슷한 프로젝트를 고민 중이신가요?</h3>
              <p>AI 견적을 통해 예상 비용을 확인해보세요.</p>
              <div className="cta-buttons">
                <Link to="/ai-quote" className="btn btn-primary">
                  AI 견적 받아보기
                </Link>
                <Link to="/contact" className="btn btn-secondary">
                  문의하기
                </Link>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="blog-nav">
            {prevProject ? (
              <Link to={`/portfolio/${prevProject.id}`} className="nav-link prev">
                <span className="nav-label">이전 프로젝트</span>
                <span className="nav-title">{prevProject.title}</span>
              </Link>
            ) : (
              <div className="nav-link empty" />
            )}
            
            {nextProject ? (
              <Link to={`/portfolio/${nextProject.id}`} className="nav-link next">
                <span className="nav-label">다음 프로젝트</span>
                <span className="nav-title">{nextProject.title}</span>
              </Link>
            ) : (
              <div className="nav-link empty" />
            )}
          </div>
        </div>
      </article>
    </div>
  );
}

export default PortfolioDetail;
