import { useState, useRef, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './ChatBot.css';
import { getChatbotResponse, resetConversationState, getInitialOptions, getWelcomeMessage } from '../data/chatbot';

// 페이지 URL을 이름으로 변환
const getPageName = (url) => {
  const pageNames = {
    '/solution': '포트폴리오',
    '/process': '프로세스',
    '/contact': '문의하기',
    '/ai-quote': 'AI 견적받기',
    '/#faq': 'FAQ',
  };
  return pageNames[url] || '페이지';
};

// 자동 인사 메시지
const AUTO_MESSAGES = {
  welcome: {
    delay: 10000, // 10초
    text: '안녕하세요! 👋\n\nTEAM DUZZ에 대해 궁금한 점이 있으신가요?',
    trigger: 'time',
  },
  footer: {
    text: '여기까지 보셨다면 고민은 끝! 🎯\n\n지금 바로 견적 문의해보시겠어요?',
    trigger: 'scroll',
  },
};

function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [showBubble, setShowBubble] = useState(false);
  const [bubbleMessage, setBubbleMessage] = useState('');
  const [hasShownWelcome, setHasShownWelcome] = useState(false);
  const [hasShownFooter, setHasShownFooter] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [currentOptions, setCurrentOptions] = useState(getInitialOptions());
  const messagesEndRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // 초기 옵션 설정
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      resetConversationState();
      setCurrentOptions(getInitialOptions());
    }
  }, [isOpen, messages.length]);

  // 자동 인사 - 10초 타이머 (Home 페이지에서만)
  useEffect(() => {
    if (location.pathname !== '/' || hasShownWelcome || isOpen) return;

    const timer = setTimeout(() => {
      if (!isOpen && !hasShownWelcome) {
        setBubbleMessage(AUTO_MESSAGES.welcome.text);
        setShowBubble(true);
        setHasShownWelcome(true);
      }
    }, AUTO_MESSAGES.welcome.delay);

    return () => clearTimeout(timer);
  }, [location.pathname, hasShownWelcome, isOpen]);

  // 자동 인사 - 스크롤 감지 (Footer 도달)
  const handleScroll = useCallback(() => {
    if (location.pathname !== '/' || hasShownFooter || isOpen) return;

    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;
    
    // 스크롤이 90% 이상 내려갔을 때 (Footer 근처)
    if (scrollTop + windowHeight >= docHeight * 0.9) {
      if (!hasShownFooter) {
        setBubbleMessage(AUTO_MESSAGES.footer.text);
        setShowBubble(true);
        setHasShownFooter(true);
      }
    }
  }, [location.pathname, hasShownFooter, isOpen]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // 말풍선 자동 숨기기
  useEffect(() => {
    if (showBubble) {
      const timer = setTimeout(() => {
        setShowBubble(false);
      }, 8000); // 8초 후 자동 숨김
      return () => clearTimeout(timer);
    }
  }, [showBubble]);

  // 페이지 변경 시 말풍선 숨기기
  useEffect(() => {
    setShowBubble(false);
  }, [location.pathname]);

  const findResponseWithContext = (input) => {
    const response = getChatbotResponse(input);
    return response;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    
    handleUserInput(inputValue);
    setInputValue('');
  };

  const handleUserInput = (text, keyword = null) => {
    const userMessage = { type: 'user', text };
    setMessages((prev) => [...prev, userMessage]);
    
    // 타이핑 인디케이터 표시
    const typingMessage = { type: 'bot', text: '...', isTyping: true };
    setTimeout(() => {
      setMessages((prev) => [...prev, typingMessage]);
    }, 100);
    
    // 키워드가 있으면 키워드로, 없으면 텍스트로 처리
    const searchText = keyword || text;
    const response = findResponseWithContext(searchText);
    
    // 0.5초 후 실제 응답으로 교체
    setTimeout(() => {
      setMessages((prev) => {
        // 타이핑 메시지 제거하고 실제 응답 추가
        const withoutTyping = prev.filter(m => !m.isTyping);
        return [...withoutTyping, { 
          type: 'bot', 
          text: response.reply,
          links: response.links || [],
          showResetButton: response.showResetButton || false
        }];
      });
      // 옵션 업데이트
      if (response.options) {
        setCurrentOptions(response.options);
      }
    }, 600);
  };

  const handleOptionClick = (option) => {
    if (option.action === 'reset') {
      handleResetChat();
      return;
    }
    
    if (option.action === 'navigate') {
      const pageName = getPageName(option.url);
      
      // 사용자 메시지를 문장으로 표시
      const userSentence = `${pageName}로 이동할게요.`;
      setMessages((prev) => [...prev, { type: 'user', text: userSentence }]);
      
      setTimeout(() => {
        // # 있는 URL 처리 (FAQ 섹션 등)
        if (option.url.includes('#')) {
          const [path, hash] = option.url.split('#');
          if (path && path !== '/') {
            navigate(path);
          }
          setTimeout(() => {
            const element = document.getElementById(hash);
            if (element) {
              element.scrollIntoView({ behavior: 'smooth' });
            }
          }, 100);
        } else {
          navigate(option.url);
        }
        setIsOpen(false);
        
        setTimeout(() => {
          setToastMessage(`✨ ${pageName} 페이지로 안내해드릴게요!`);
          setShowToast(true);
          setTimeout(() => setShowToast(false), 1500);
        }, 100);
      }, 300);
      
      resetConversationState();
      return;
    }
    
    // 버튼 라벨을 사용자 메시지로 표시
    const displayText = option.label.replace(/[^\w\sㄱ-힣]/g, '').trim() + ' 선택할게요';
    handleUserInput(displayText, option.value);
  };

  const handleBubbleClick = () => {
    setShowBubble(false);
    setIsOpen(true);
  };


  const handleResetChat = () => {
    resetConversationState();
    setMessages([]);
    setCurrentOptions(getInitialOptions());
  };

  return (
    <>
      {/* 토스트 메시지 */}
      <div className={`chatbot-toast ${showToast ? 'show' : ''}`}>
        {toastMessage}
      </div>

      {/* 자동 말풍선 */}
      <div 
        className={`chatbot-bubble ${showBubble ? 'show' : ''}`}
        onClick={handleBubbleClick}
      >
        <div className="bubble-content">
          {bubbleMessage.split('\n').map((line, i) => (
            <span key={i}>
              {line}
              {i < bubbleMessage.split('\n').length - 1 && <br />}
            </span>
          ))}
        </div>
        <button 
          className="bubble-close"
          onClick={(e) => {
            e.stopPropagation();
            setShowBubble(false);
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>

      {/* 플로팅 버튼 */}
      <button 
        className={`chatbot-toggle ${isOpen ? 'open' : ''} ${showBubble ? 'has-bubble' : ''}`}
        onClick={() => {
          setIsOpen(!isOpen);
          setShowBubble(false);
        }}
        aria-label="챗봇 열기"
      >
        {isOpen ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        ) : (
          <>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="5" width="18" height="14" rx="2"/>
              <circle cx="8.5" cy="12" r="1.5" fill="currentColor"/>
              <circle cx="15.5" cy="12" r="1.5" fill="currentColor"/>
              <path d="M9 16h6" strokeLinecap="round"/>
              <path d="M12 1v4"/>
              <circle cx="12" cy="1" r="1" fill="currentColor"/>
            </svg>
            {!isOpen && !showBubble && <span className="toggle-pulse" />}
          </>
        )}
      </button>

      {/* 채팅창 */}
      <div className={`chatbot-window ${isOpen ? 'open' : ''}`}>
        <div className="chatbot-header">
          <div className="chatbot-header-info">
            <div className="header-avatar">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="5" width="18" height="14" rx="2"/>
                <circle cx="8.5" cy="12" r="1.5" fill="currentColor"/>
                <circle cx="15.5" cy="12" r="1.5" fill="currentColor"/>
                <path d="M9 16h6" strokeLinecap="round"/>
              </svg>
            </div>
            <div className="header-text">
              <h3>AI 챗봇</h3>
              <span className="chatbot-status">
                <span className="status-dot" />
                온라인
              </span>
            </div>
          </div>
          <span className="chatbot-beta">Beta</span>
          <button className="chatbot-close" onClick={() => setIsOpen(false)}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <div className="chatbot-messages">
          {messages.length === 0 ? (
            <div className="chatbot-empty-state">
              <div className="empty-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="3" y="5" width="18" height="14" rx="2"/>
                  <circle cx="8.5" cy="12" r="1.5" fill="currentColor"/>
                  <circle cx="15.5" cy="12" r="1.5" fill="currentColor"/>
                  <path d="M9 16h6" strokeLinecap="round"/>
                  <path d="M12 1v4"/>
                  <circle cx="12" cy="1" r="1" fill="currentColor"/>
                </svg>
              </div>
              <p className="empty-text">AI 챗봇과 상담해보세요</p>
              <span className="empty-hint">아래 옵션을 선택하거나 메시지를 입력해주세요</span>
            </div>
          ) : (
            messages.map((msg, index) => (
              <div key={index} className={`chatbot-message ${msg.type} ${msg.isTyping ? 'typing' : ''}`}>
                <div className="message-content">
                  {msg.isTyping ? (
                    <div className="typing-dots">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  ) : (
                    msg.text.split('\n').map((line, i) => (
                      <span key={i}>
                        {line}
                        {i < msg.text.split('\n').length - 1 && <br />}
                      </span>
                    ))
                  )}
                </div>
                {msg.links && msg.links.length > 0 && (
                  <div className="message-links">
                    {msg.links.map((link, i) => (
                      <button
                        key={i}
                        className="message-link-btn"
                        onClick={() => {
                          navigate(link.url);
                          setIsOpen(false);
                        }}
                      >
                        {link.text} →
                      </button>
                    ))}
                  </div>
                )}
                {msg.showResetButton && (
                  <div className="message-reset">
                    <button
                      className="message-reset-btn"
                      onClick={handleResetChat}
                    >
                      새 채팅 열기
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>


        {/* 키워드 옵션 - 입력창 위 */}
        {currentOptions && currentOptions.length > 0 && (
          <div className="chatbot-options">
            {currentOptions.map((opt, i) => (
              <button
                key={i}
                className={`chatbot-option-btn ${opt.action ? 'action-' + opt.action : ''}`}
                onClick={() => handleOptionClick(opt)}
              >
                {opt.label}
              </button>
            ))}
          </div>
        )}

        <form className="chatbot-input-form" onSubmit={handleSubmit}>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="메시지를 입력하세요..."
            className="chatbot-input"
          />
          <button type="submit" className="chatbot-send">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
            </svg>
          </button>
        </form>
      </div>
    </>
  );
}

export default ChatBot;
