import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Monitor, Server, Shield, ArrowRight, Eye, Users, Building2, Briefcase, CircleDot } from 'lucide-react'
import { getFeaturedProjects } from '../data/projects'
import ProjectCard from '../components/solutions/ProjectCard'

function WaveShape({ className = '', fill = '#ffffff', flip = false }) {
  return (
    <div className={`absolute left-0 right-0 overflow-hidden leading-[0] pointer-events-none ${flip ? 'top-0 rotate-180' : 'bottom-0'} ${className}`}>
      <svg viewBox="0 180 2500 200" preserveAspectRatio="none" className="w-full h-16 md:h-24">
        <path fill={fill} d="M 0 250 C 1200 400 1200 50 3000 250 L 3000 550 L 0 550 L 0 250">
          <animate attributeName="d" dur="8s" values="M 0 250 C 1200 400 1200 50 3000 250 L 3000 550 L 0 550 L 0 250;M 0 250 C 400 50 400 400 3000 250 L 3000 550 L 0 550 L 0 250;M 0 250 C 1200 400 1200 50 3000 250 L 3000 550 L 0 550 L 0 250" repeatCount="indefinite" />
        </path>
      </svg>
    </div>
  )
}

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
}

const stats = [
  { num: '40+', label: '완료 프로젝트' },
  { num: '15+', label: '협력 기업' },
  { num: '7년+', label: '평균 경력' },
  { num: '98%', label: '고객 만족도' },
]

const services = [
  { icon: Monitor, title: '웹/앱 개발', desc: '반응형 웹사이트, 기업 홈페이지, 랜딩 페이지 등 최신 기술 기반의 웹 서비스를 개발합니다.' },
  { icon: Server, title: '시스템 구축', desc: '사내 업무 시스템, ERP/CRM, API 개발 등 비즈니스에 최적화된 시스템을 구축합니다.' },
  { icon: Shield, title: '유지보수', desc: '정기 점검, 긴급 대응, 기능 개선, 보안 패치 등 안정적인 서비스 운영을 지원합니다.' },
]

const featuredProjects = getFeaturedProjects(3)

const whyDuzz = [
  { icon: Eye, title: '실시간 작업 현황 공유', desc: 'duzztest.com을 통해 개발 진행 상황을 실시간으로 확인할 수 있습니다.' },
  { icon: Users, title: '전담 매니저 배정', desc: '프로젝트 전담 매니저가 신속하고 정확한 커뮤니케이션을 보장합니다.' },
  { icon: Building2, title: '(주)북극여우의 안정성', desc: '법인 소속 개발팀의 안정적이고 지속 가능한 서비스를 제공합니다.' },
]

/* ── Hero 우측: 프로젝트 보드 ── */
const heroProjects = [
  { client: 'K뷰티 브랜드', title: '자사몰 리뉴얼', status: '개발중', progress: 72 },
  { client: '서울 정형외과', title: '병원 홈페이지 개발', status: '접수중', progress: 0 },
  { client: '물류 스타트업', title: '재고관리 시스템', status: '개발중', progress: 45 },
  { client: '프랜차이즈 본사', title: '가맹점 관리 앱', status: '검수중', progress: 95 },
]

const statusStyle = {
  '접수중': 'bg-blue-400/15 text-blue-300',
  '개발중': 'bg-highlight/15 text-highlight-light',
  '검수중': 'bg-amber-400/15 text-amber-300',
}

function HeroVisual() {
  return (
    <div className="relative w-full max-w-lg mx-auto">
      {/* 메인 프로젝트 보드 */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="relative bg-white/[0.06] border border-white/10 rounded-2xl overflow-hidden backdrop-blur-sm"
      >
        {/* 헤더 */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
          <div className="flex items-center gap-2.5">
            <Briefcase size={15} className="text-highlight-light" />
            <span className="text-sm font-semibold text-white/80">진행중인 프로젝트</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-[10px] text-white/30">LIVE</span>
          </div>
        </div>

        {/* 프로젝트 리스트 */}
        <div className="p-3 space-y-2">
          {heroProjects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + i * 0.12, duration: 0.5 }}
              className="flex items-center gap-4 bg-white/[0.04] hover:bg-white/[0.07] rounded-xl px-4 py-3.5 transition-colors"
            >
              {/* 상태 dot */}
              <CircleDot size={16} className={project.status === '접수중' ? 'text-blue-400/60' : project.status === '검수중' ? 'text-amber-400/60' : 'text-highlight-light/60'} />

              {/* 프로젝트 정보 */}
              <div className="flex-1 min-w-0">
                <p className="text-[12px] font-medium text-white/80 truncate">{project.title}</p>
                <p className="text-[10px] text-white/25 mt-0.5">{project.client}</p>
              </div>

              {/* 프로그레스 바 (접수중 제외) */}
              {project.progress > 0 && (
                <div className="hidden sm:block w-16">
                  <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${project.progress}%` }}
                      transition={{ delay: 0.8 + i * 0.12, duration: 0.8 }}
                      className="h-full bg-highlight-light/50 rounded-full"
                    />
                  </div>
                  <p className="text-[9px] text-white/20 text-right mt-0.5">{project.progress}%</p>
                </div>
              )}

              {/* 상태 뱃지 */}
              <span className={`text-[10px] font-medium px-2.5 py-1 rounded-full whitespace-nowrap ${statusStyle[project.status]}`}>
                {project.status}
              </span>
            </motion.div>
          ))}
        </div>

        {/* 하단 요약 */}
        <div className="px-5 py-3 border-t border-white/5 flex items-center justify-between">
          <span className="text-[10px] text-white/20">2026년 2월 기준</span>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-[10px] text-white/30">
              <span className="w-1.5 h-1.5 rounded-full bg-highlight-light/50" />
              진행 3건
            </span>
            <span className="flex items-center gap-1 text-[10px] text-white/30">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400/50" />
              접수 1건
            </span>
          </div>
        </div>
      </motion.div>

      {/* 우상단 플로팅 — 누적 실적 */}
      <motion.div
        initial={{ opacity: 0, y: -10, x: 10 }}
        animate={{ opacity: 1, y: 0, x: 0 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        className="absolute -top-5 -right-4 bg-white/[0.07] border border-white/10 rounded-xl px-4 py-3 backdrop-blur-sm"
      >
        <p className="text-[10px] text-white/30 mb-1">누적 프로젝트</p>
        <p className="text-lg font-bold text-white/90">40<span className="text-highlight-light">+</span></p>
      </motion.div>

      {/* 좌하단 플로팅 — 고객 만족도 */}
      <motion.div
        initial={{ opacity: 0, y: 10, x: -10 }}
        animate={{ opacity: 1, y: 0, x: 0 }}
        transition={{ delay: 1.0, duration: 0.6 }}
        className="absolute -bottom-4 -left-4 bg-white/[0.07] border border-white/10 rounded-xl px-4 py-3 backdrop-blur-sm"
      >
        <p className="text-[10px] text-white/30 mb-1">고객 만족도</p>
        <p className="text-lg font-bold text-white/90">98<span className="text-highlight-light">%</span></p>
      </motion.div>
    </div>
  )
}

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="min-h-screen flex items-center relative overflow-hidden bg-primary">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)', backgroundSize: '60px 60px' }} />
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-highlight/8 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-highlight-light/5 rounded-full blur-[100px]" />

        <div className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8 pt-24 pb-16 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <motion.p
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.6 }}
                className="text-sm text-white/50 tracking-wider mb-6"
              >
                (주)북극여우 소속 전문 개발팀
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.7 }}
                className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-white leading-tight mb-6"
              >
                기업의 디지털 전환을<br />
                <span className="text-highlight-light">완성하는</span> 개발 파트너
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.6 }}
                className="text-base md:text-lg text-white/40 max-w-lg mb-10 leading-relaxed"
              >
                홈페이지 개발부터 시스템 구축, 유지보수까지.
                체계적인 프로세스와 실시간 소통으로 신뢰할 수 있는 IT 파트너가 되겠습니다.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.6 }}
                className="flex flex-wrap gap-4"
              >
                <Link to="/contact" className="flex items-center gap-2 px-7 py-3.5 bg-highlight text-white font-semibold rounded-full hover:bg-highlight-light transition-all text-sm">
                  프로젝트 상담하기
                  <ArrowRight size={16} />
                </Link>
                <Link to="/solutions" className="flex items-center gap-2 px-7 py-3.5 border border-white/20 text-white/80 font-medium rounded-full hover:bg-white/5 transition-all text-sm">
                  포트폴리오 보기
                </Link>
              </motion.div>
            </div>

            {/* Hero Visual */}
            <div className="hidden lg:block">
              <HeroVisual />
            </div>
          </div>
        </div>

        <WaveShape />
      </section>

      {/* Stats */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s, i) => (
              <motion.div key={s.label} {...fadeUp} transition={{ duration: 0.5, delay: i * 0.1 }} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-1">{s.num}</div>
                <div className="text-sm text-accent">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 협업 업체 */}
      <section className="py-12 bg-white">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8">
          <p className="text-xs text-center text-accent/50 tracking-wider mb-8">함께한 기업</p>
          <div className="flex flex-wrap items-center justify-center gap-x-14 gap-y-6">
            {['블루모션', '(주)이첸이엔씨', 'TurnUp'].map((name) => (
              <span key={name} className="text-lg md:text-xl font-bold text-gray-300 hover:text-gray-500 transition-colors">
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8">
          <motion.div {...fadeUp} transition={{ duration: 0.6 }} className="text-center mb-16">
            <p className="text-xs uppercase tracking-[0.2em] text-highlight font-semibold mb-3">Services</p>
            <h2 className="text-3xl md:text-4xl font-bold text-primary">핵심 서비스</h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((s, i) => (
              <motion.div key={s.title} {...fadeUp} transition={{ duration: 0.5, delay: i * 0.1 }}>
                <Link to="/services" className="block p-8 border border-gray-100 rounded-2xl hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
                  <div className="w-12 h-12 bg-highlight/10 rounded-xl flex items-center justify-center mb-6">
                    <s.icon size={24} className="text-highlight" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-lg font-bold text-primary mb-3">{s.title}</h3>
                  <p className="text-sm text-accent leading-relaxed mb-5">{s.desc}</p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-highlight group-hover:gap-2.5 transition-all">
                    자세히 보기 <ArrowRight size={14} />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio — 3 items */}
      <section className="py-24 bg-secondary">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8">
          <motion.div {...fadeUp} transition={{ duration: 0.6 }} className="text-center mb-16">
            <p className="text-xs uppercase tracking-[0.2em] text-highlight font-semibold mb-3">Portfolio</p>
            <h2 className="text-3xl md:text-4xl font-bold text-primary">최근 프로젝트</h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((p, i) => (
              <motion.div key={p.slug} {...fadeUp} transition={{ duration: 0.5, delay: i * 0.08 }}>
                <ProjectCard project={p} variant="compact" />
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.3 }} className="text-center mt-12">
            <Link to="/solutions" className="inline-flex items-center gap-2 px-6 py-3 border border-primary/15 text-primary font-medium rounded-full hover:bg-primary hover:text-white transition-all text-sm">
              전체 포트폴리오 보기 <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Why DUZZ */}
      <section className="py-24 bg-white relative overflow-hidden">
        <WaveShape fill="#f7f7f7" flip />
        <div className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8 pt-8">
          <motion.div {...fadeUp} transition={{ duration: 0.6 }} className="text-center mb-16">
            <p className="text-xs uppercase tracking-[0.2em] text-highlight font-semibold mb-3">Why DUZZ</p>
            <h2 className="text-3xl md:text-4xl font-bold text-primary">DUZZ를 선택하는 이유</h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {whyDuzz.map((w, i) => (
              <motion.div key={w.title} {...fadeUp} transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-8 border border-gray-100 rounded-2xl hover:shadow-lg transition-all text-center"
              >
                <div className="w-14 h-14 bg-highlight/10 rounded-xl flex items-center justify-center mx-auto mb-5">
                  <w.icon size={24} className="text-highlight" strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-bold text-primary mb-3">{w.title}</h3>
                <p className="text-sm text-accent leading-relaxed">{w.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-secondary">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8 text-center">
          <motion.div {...fadeUp} transition={{ duration: 0.6 }}>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              프로젝트를 시작할 준비가 되셨나요?
            </h2>
            <p className="text-accent mb-10 max-w-xl mx-auto">전담 매니저가 비즈니스에 최적화된 솔루션을 제안해 드립니다.</p>
            <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-semibold rounded-full hover:bg-primary-light transition-colors">
              무료 상담 신청
              <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  )
}
