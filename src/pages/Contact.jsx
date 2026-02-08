import { useState } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import './Contact.css';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    projectType: '',
    budget: '',
    timeline: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // 실제로는 API 호출
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="contact-page">
        <section className="contact-success">
          <div className="container">
            <div className="success-content">
              <div className="success-check">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h2>문의가 접수되었습니다</h2>
              <p>
                담당자가 검토 후 1-2 영업일 내에 연락드리겠습니다.<br />
                빠른 상담이 필요하시면 카카오톡 채널을 이용해 주세요.
              </p>
              <div className="success-actions">
                <button 
                  className="btn btn-primary" 
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      name: '',
                      email: '',
                      company: '',
                      phone: '',
                      projectType: '',
                      budget: '',
                      timeline: '',
                      message: '',
                    });
                  }}
                >
                  새 문의하기
                </button>
                <a 
                  href="https://pf.kakao.com/_kJxbQn" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                >
                  카카오톡 상담
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="contact-page">
      {/* Hero */}
      <section className="contact-hero">
        <div className="container">
          <span className="section-label">CONTACT</span>
          <h1>프로젝트 문의</h1>
          <p>프로젝트에 대해 상담해 드립니다</p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section section">
        <div className="container">
          <div className="contact-grid">
            {/* Info */}
            <div className="contact-info">
              <div className="info-header">
                <h2>TEAM DUZZ</h2>
                <p>
                  비즈니스 목표에 최적화된 디지털 솔루션을 제공합니다.<br />
                  프로젝트 문의 시 아래 양식을 작성해 주시면<br />
                  담당자가 검토 후 연락드리겠습니다.
                </p>
              </div>

              <div className="info-list">
                <div className="info-item">
                  <span className="info-label">Email</span>
                  <a href="mailto:support@teamduzz.com" className="info-value">
                    support@teamduzz.com
                  </a>
                </div>
                <div className="info-item">
                  <span className="info-label">KakaoTalk</span>
                  <a 
                    href="https://pf.kakao.com/_kJxbQn" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="info-value"
                  >
                    @teamduzz
                  </a>
                </div>
                <div className="info-item">
                  <span className="info-label">Response Time</span>
                  <span className="info-value">1-2 영업일</span>
                </div>
              </div>

              <div className="info-note">
                <h3>상담 안내</h3>
                <ul>
                  <li>프로젝트 규모와 요구사항에 따라 맞춤 견적을 제공합니다.</li>
                  <li>NDA 체결 후 상세 기술 상담이 가능합니다.</li>
                  <li>긴급 문의는 카카오톡 채널을 이용해 주세요.</li>
                </ul>
              </div>
            </div>

            {/* Form */}
            <div className="contact-form-wrapper">
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-section">
                  <h3>기본 정보</h3>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="name">성함 *</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="홍길동"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">이메일 *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="example@company.com"
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="company">회사/기관명</label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="회사명"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="phone">연락처</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="010-0000-0000"
                      />
                    </div>
                  </div>
                </div>

                <div className="form-section">
                  <h3>프로젝트 정보</h3>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="projectType">프로젝트 유형 *</label>
                      <select
                        id="projectType"
                        name="projectType"
                        value={formData.projectType}
                        onChange={handleChange}
                        required
                      >
                        <option value="">선택해 주세요</option>
                        <option value="web">웹 개발</option>
                        <option value="app">앱 개발</option>
                        <option value="ai">AI 솔루션</option>
                        <option value="consulting">기술 컨설팅</option>
                        <option value="maintenance">유지보수</option>
                        <option value="other">기타</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="budget">예산 범위</label>
                      <select
                        id="budget"
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                      >
                        <option value="">선택해 주세요</option>
                        <option value="under500">500만원 미만</option>
                        <option value="500to1000">500만원 ~ 1,000만원</option>
                        <option value="1000to3000">1,000만원 ~ 3,000만원</option>
                        <option value="3000to5000">3,000만원 ~ 5,000만원</option>
                        <option value="over5000">5,000만원 이상</option>
                        <option value="undecided">미정 / 협의</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="timeline">희망 일정</label>
                    <select
                      id="timeline"
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleChange}
                    >
                      <option value="">선택해 주세요</option>
                      <option value="asap">가능한 빨리</option>
                      <option value="1month">1개월 이내</option>
                      <option value="3month">3개월 이내</option>
                      <option value="6month">6개월 이내</option>
                      <option value="undecided">미정 / 협의</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">프로젝트 설명 *</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      placeholder="프로젝트의 목적, 주요 기능, 참고 사이트 등을 자유롭게 설명해 주세요."
                    />
                  </div>
                </div>

                <div className="form-footer">
                  <p className="form-notice">
                    * 표시 항목은 필수 입력 사항입니다.
                  </p>
                  <button 
                    type="submit" 
                    className="btn btn-primary submit-btn"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? '전송 중...' : '문의 보내기'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;
