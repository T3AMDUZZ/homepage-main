import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <img src="/icon.png" alt="TEAM DUZZ" className="footer-logo-icon" />
              <span>TEAM DUZZ</span>
            </Link>
            <p className="footer-description">
              아이디어를 현실로 만드는 개발 파트너<br />
              웹, 앱, AI 솔루션까지 — 함께 만들어갑니다.
            </p>
          </div>

          <div className="footer-links">
            <div className="footer-link-group">
              <h4>메뉴</h4>
              <Link to="/">Home</Link>
              <Link to="/solution">Solution</Link>
              <Link to="/process">Process</Link>
              <Link to="/contact">Contact</Link>
            </div>

            <div className="footer-link-group">
              <h4>서비스</h4>
              <Link to="/ai-quote">AI 견적받기</Link>
              <Link to="/solution">포트폴리오</Link>
              <Link to="/process#faq">FAQ</Link>
            </div>

            <div className="footer-link-group">
              <h4>문의</h4>
              <a href="mailto:support@teamduzz.com">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                support@teamduzz.com
              </a>
              <a href="https://pf.kakao.com/_kJxbQn" target="_blank" rel="noopener noreferrer">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 3c-5.5 0-10 3.5-10 7.8 0 2.8 1.9 5.3 4.8 6.7l-1.2 4.5 5.2-3.4c.4 0 .8.1 1.2.1 5.5 0 10-3.5 10-7.8S17.5 3 12 3z"/>
                </svg>
                카카오톡 채널
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {currentYear} TEAM DUZZ. All rights reserved.</p>
          <div className="footer-bottom-links">
            <a href="#">개인정보처리방침</a>
            <a href="#">이용약관</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;








