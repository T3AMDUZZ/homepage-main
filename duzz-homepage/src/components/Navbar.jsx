import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ArrowRight } from 'lucide-react'

const navLinks = [
  { path: '/', label: '회사소개' },
  { path: '/services', label: '서비스' },
  { path: '/solutions', label: '솔루션' },
  { path: '/process', label: '개발 프로세스' },
  { path: '/contact', label: '문의하기' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [location])

  const isHome = location.pathname === '/'
  const isTransparent = isHome && !scrolled

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isTransparent
          ? 'bg-transparent'
          : 'bg-white/95 backdrop-blur-md shadow-[0_1px_0_rgba(0,0,0,0.06)]'
      }`}
    >
      <nav className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8 h-16 md:h-20 flex items-center justify-between relative">
        {/* Logo — 좌측 고정 */}
        <Link to="/" className="flex items-center gap-2.5 flex-shrink-0">
          <span className={`text-xl md:text-2xl font-bold tracking-tight transition-colors ${isTransparent ? 'text-white' : 'text-primary'}`}>
            DUZZ
          </span>
          <span className={`hidden sm:block w-px h-5 ${isTransparent ? 'bg-white/20' : 'bg-gray-200'}`} />
          <span className={`hidden sm:block text-[11px] font-medium tracking-wide transition-colors ${isTransparent ? 'text-white/40' : 'text-accent/50'}`}>
            (주)북극여우
          </span>
        </Link>

        {/* Desktop Nav — 절대 중앙 */}
        <div className="hidden lg:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-5 py-2 text-[13px] font-medium transition-all relative ${
                location.pathname === link.path
                  ? isTransparent ? 'text-white' : 'text-primary'
                  : isTransparent ? 'text-white/50 hover:text-white' : 'text-accent hover:text-primary'
              }`}
            >
              {link.label}
              {location.pathname === link.path && (
                <motion.span
                  layoutId="nav-indicator"
                  className={`absolute bottom-0 left-5 right-5 h-[2px] rounded-full ${isTransparent ? 'bg-white' : 'bg-primary'}`}
                />
              )}
            </Link>
          ))}
        </div>

        {/* CTA — 우측 고정 */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <Link
            to="/contact"
            className={`hidden lg:flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-full transition-all ${
              isTransparent
                ? 'bg-white/10 text-white border border-white/20 hover:bg-white hover:text-primary'
                : 'bg-primary text-white hover:bg-primary-light'
            }`}
          >
            무료 상담 신청
            <ArrowRight size={14} />
          </Link>

          {/* Mobile Toggle */}
          <button
            className={`lg:hidden p-2 transition-colors ${isTransparent ? 'text-white' : 'text-primary'}`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="메뉴 토글"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden overflow-hidden bg-white border-t border-gray-100"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    location.pathname === link.path
                      ? 'bg-highlight/5 text-highlight'
                      : 'text-accent hover:bg-gray-50'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/contact"
                className="flex items-center justify-center gap-2 mt-3 px-4 py-3 bg-primary text-white text-sm font-medium rounded-lg"
              >
                무료 상담 신청
                <ArrowRight size={14} />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
