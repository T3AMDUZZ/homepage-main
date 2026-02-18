import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Mail, Phone, ExternalLink, Send } from 'lucide-react'
import { FaFacebookF, FaInstagram } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { SiNaver } from 'react-icons/si'

const companyLinks = [
  { path: '/', label: '회사 소개' },
  { path: '/services', label: '서비스' },
  { path: '/solutions', label: '포트폴리오' },
  { path: '/process', label: '프로세스' },
  { path: '/contact', label: '문의하기' },
]

const serviceLinks = [
  { label: '홈페이지 개발', path: '/services' },
  { label: '시스템 개발', path: '/services' },
  { label: '유지보수', path: '/services' },
  { label: '기술 컨설팅', path: '/services' },
]

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail('')
    }
  }

  return (
    <footer className="bg-primary text-white relative overflow-hidden">
      {/* Wave Divider */}
      <div className="absolute top-0 left-0 right-0 overflow-hidden leading-[0]">
        <svg viewBox="0 180 2500 200" preserveAspectRatio="none" className="w-full h-16 md:h-20">
          <path fill="#f7f7f7" d="M 0 250 C 1200 400 1200 50 3000 250 L 3000 0 L 0 0 L 0 250">
            <animate attributeName="d" dur="8s" values="M 0 250 C 1200 400 1200 50 3000 250 L 3000 0 L 0 0 L 0 250;M 0 250 C 400 50 400 400 3000 250 L 3000 0 L 0 0 L 0 250;M 0 250 C 1200 400 1200 50 3000 250 L 3000 0 L 0 0 L 0 250" repeatCount="indefinite" />
          </path>
        </svg>
      </div>

      <div className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8 pt-28 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-bold mb-4">DUZZ</h3>
            <p className="text-white/30 text-sm leading-relaxed mb-6">
              기업의 디지털 전환을 완성하는 혁신적인 개발 파트너
            </p>
            <div className="flex items-center gap-3">
              {[
                { icon: FaFacebookF, href: '#' },
                { icon: FaXTwitter, href: '#' },
                { icon: FaInstagram, href: '#' },
                { icon: SiNaver, href: '#' },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/30 hover:text-white hover:border-white/30 transition-all"
                >
                  <social.icon size={13} />
                </a>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-5 text-white/70 text-xs uppercase tracking-wider">회사</h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link to={link.path} className="text-white/30 text-sm hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-5 text-white/70 text-xs uppercase tracking-wider">서비스</h4>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <Link to={link.path} className="text-white/30 text-sm hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-5 text-white/70 text-xs uppercase tracking-wider">연락처</h4>
            <div className="space-y-4">
              <p className="text-white/20 text-xs">전화 문의</p>
              <a href="tel:010-3329-9041" className="flex items-center gap-2 text-white text-lg font-semibold hover:text-highlight-light transition-colors">
                <Phone size={15} className="text-highlight-light" />
                010-3329-9041
              </a>
              <p className="text-white/20 text-xs mt-4">이메일 문의</p>
              <a href="mailto:support@teamduzz.com" className="flex items-center gap-2 text-white/50 text-sm hover:text-white transition-colors">
                <Mail size={14} className="text-highlight-light" />
                support@teamduzz.com
              </a>
              <a href="https://duzztest.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white/50 text-sm hover:text-white transition-colors">
                <ExternalLink size={14} className="text-highlight-light" />
                duzztest.com
              </a>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold mb-5 text-white/70 text-xs uppercase tracking-wider">뉴스레터</h4>
            <p className="text-white/30 text-sm leading-relaxed mb-4">
              최신 소식과 IT 트렌드를 받아보세요!
            </p>
            {subscribed ? (
              <p className="text-highlight-light text-sm">구독해주셔서 감사합니다!</p>
            ) : (
              <form onSubmit={handleSubscribe} className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="이메일 주소 입력"
                  className="w-full px-4 py-3 pr-12 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder-white/20 focus:outline-none focus:border-white/20 transition-colors"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 w-8 h-8 bg-highlight rounded-md flex items-center justify-center hover:bg-highlight-light transition-colors"
                >
                  <Send size={13} className="text-white" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-14 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-white/20 text-xs">
            &copy; 2025 DUZZ. (주)북극여우. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="text-white/20 text-xs hover:text-white/40 transition-colors">개인정보처리방침</Link>
            <Link to="/terms" className="text-white/20 text-xs hover:text-white/40 transition-colors">이용약관</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
