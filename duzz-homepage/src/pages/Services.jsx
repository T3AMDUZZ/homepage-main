import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Code, Server, Shield, MessageSquare, CreditCard, Cloud, Lightbulb, Check, ArrowRight, Wrench, AlertTriangle, Activity, FileBarChart, Settings, ClipboardList } from 'lucide-react'
import usePageMeta from '../hooks/usePageMeta'

/* ── Service Visual Mockups ── */
function BrowserMockup() {
  return (
    <div className="w-full max-w-xs mx-auto">
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="flex items-center gap-2 px-3 py-2.5 border-b border-gray-100">
          <div className="flex gap-1.5">
            <span className="w-2 h-2 rounded-full bg-red-300" />
            <span className="w-2 h-2 rounded-full bg-yellow-300" />
            <span className="w-2 h-2 rounded-full bg-green-300" />
          </div>
          <div className="flex-1 px-2 py-0.5 bg-gray-50 rounded text-[9px] text-gray-300 text-center">yourcompany.com</div>
        </div>
        <div className="p-4 space-y-2.5">
          <div className="h-2 bg-primary/8 rounded-full w-2/3" />
          <div className="h-1.5 bg-gray-100 rounded-full w-full" />
          <div className="h-1.5 bg-gray-100 rounded-full w-4/5" />
          <div className="grid grid-cols-3 gap-1.5 mt-3">
            <div className="h-12 bg-highlight/5 rounded-md" />
            <div className="h-12 bg-highlight/5 rounded-md" />
            <div className="h-12 bg-highlight/5 rounded-md" />
          </div>
          <div className="h-6 bg-highlight/10 rounded-md w-1/3 mt-2" />
        </div>
      </div>
    </div>
  )
}

function TerminalMockup() {
  return (
    <div className="w-full max-w-xs mx-auto">
      <div className="bg-[#1a1a2e] rounded-xl overflow-hidden shadow-sm">
        <div className="flex items-center gap-2 px-3 py-2.5 border-b border-white/5">
          <div className="flex gap-1.5">
            <span className="w-2 h-2 rounded-full bg-red-400/70" />
            <span className="w-2 h-2 rounded-full bg-yellow-400/70" />
            <span className="w-2 h-2 rounded-full bg-green-400/70" />
          </div>
          <span className="text-[9px] text-white/20 ml-1">api-server</span>
        </div>
        <div className="p-4 font-mono text-[10px] space-y-1.5">
          <p><span className="text-green-400/60">$</span> <span className="text-white/40">npm run start:prod</span></p>
          <p className="text-white/20">Server running on port 3000</p>
          <p className="text-white/20">Database connected ✓</p>
          <p className="text-white/20">Redis cache initialized ✓</p>
          <p className="mt-2"><span className="text-blue-400/60">GET</span> <span className="text-white/30">/api/v1/users</span> <span className="text-green-400/50">200</span> <span className="text-white/15">12ms</span></p>
          <p><span className="text-yellow-400/60">POST</span> <span className="text-white/30">/api/v1/orders</span> <span className="text-green-400/50">201</span> <span className="text-white/15">45ms</span></p>
          <p><span className="text-blue-400/60">GET</span> <span className="text-white/30">/api/v1/dashboard</span> <span className="text-green-400/50">200</span> <span className="text-white/15">8ms</span></p>
        </div>
      </div>
    </div>
  )
}

function DashboardMockup() {
  return (
    <div className="w-full max-w-xs mx-auto">
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-3 py-2.5 border-b border-gray-100">
          <span className="text-[9px] font-semibold text-primary/40">모니터링 대시보드</span>
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
        </div>
        <div className="p-3 space-y-2.5">
          <div className="grid grid-cols-3 gap-2">
            <div className="p-2 bg-green-50 rounded-lg text-center">
              <p className="text-[9px] text-green-600/50">가동률</p>
              <p className="text-sm font-bold text-green-600/70">99.9%</p>
            </div>
            <div className="p-2 bg-blue-50 rounded-lg text-center">
              <p className="text-[9px] text-blue-600/50">응답시간</p>
              <p className="text-sm font-bold text-blue-600/70">42ms</p>
            </div>
            <div className="p-2 bg-purple-50 rounded-lg text-center">
              <p className="text-[9px] text-purple-600/50">요청수</p>
              <p className="text-sm font-bold text-purple-600/70">1.2K</p>
            </div>
          </div>
          <div className="h-16 flex items-end gap-1 px-1">
            {[40, 65, 45, 80, 55, 70, 90, 60, 75, 85, 50, 95].map((h, i) => (
              <div key={i} className="flex-1 bg-highlight/15 rounded-t-sm" style={{ height: `${h}%` }} />
            ))}
          </div>
          <div className="flex items-center gap-2">
            <span className="flex-1 h-1.5 bg-green-100 rounded-full overflow-hidden">
              <span className="block h-full bg-green-400/50 rounded-full" style={{ width: '99.9%' }} />
            </span>
            <span className="text-[8px] text-green-600/50">정상</span>
          </div>
        </div>
      </div>
    </div>
  )
}

const serviceVisuals = [BrowserMockup, TerminalMockup, DashboardMockup]

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
}

const mainServices = [
  {
    icon: Code, title: '홈페이지 개발',
    desc: '최신 프론트엔드 기술을 활용하여 기업의 가치를 효과적으로 전달하는 웹사이트를 제작합니다.',
    features: ['기업 홈페이지', '반응형 웹', '랜딩 페이지', 'CMS 구축'],
    tech: ['React', 'Vue', 'Next.js'],
  },
  {
    icon: Server, title: '시스템 개발',
    desc: '비즈니스 프로세스에 최적화된 시스템을 설계하고 구축하여 업무 효율을 극대화합니다.',
    features: ['사내 업무 시스템', 'ERP/CRM', 'API 개발', 'DB 설계'],
    tech: ['Node.js', 'Python', 'PostgreSQL'],
  },
  {
    icon: Shield, title: '유지보수',
    desc: 'SLA 기반의 체계적인 유지보수 서비스로 안정적인 서비스 운영을 지원합니다.',
    features: ['정기 점검', '긴급 대응', '기능 개선', '보안 패치'],
    tech: ['모니터링', '자동화', '보안'],
  },
]

const additionalServices = [
  { icon: MessageSquare, title: '메시징 연동', desc: 'WhatsApp, LINE, 알림톡 등 글로벌 메시징 서비스를 시스템에 연동합니다.' },
  { icon: CreditCard, title: '결제 연동', desc: 'Stripe, PayPal, 토스페이먼츠 등 글로벌·국내 결제를 통합합니다.' },
  { icon: Cloud, title: '클라우드 인프라', desc: 'AWS, GCP 등 클라우드 환경 구축 및 관리를 지원합니다.' },
  { icon: Lightbulb, title: '기술 컨설팅', desc: '프로젝트 기획부터 기술 스택 선정까지 컨설팅합니다.' },
]

export default function Services() {
  usePageMeta({
    title: '서비스 - DUZZ | 홈페이지 개발, 시스템 구축, 유지보수',
    description: 'DUZZ의 전문 IT 서비스. 홈페이지 개발, 업무 시스템 구축, 유지보수, 메시징·결제 연동까지.',
  })

  return (
    <>
      {/* Header */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-28 bg-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)', backgroundSize: '60px 60px' }} />
        <div className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8 text-center relative z-10">
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-xs uppercase tracking-[0.2em] text-highlight-light font-semibold mb-4">Services</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-3xl md:text-5xl font-bold mb-4">전문적인 IT 서비스</motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="text-white/40 max-w-2xl mx-auto">
            DUZZ는 홈페이지 개발부터 시스템 구축, 유지보수까지 기업에 필요한 모든 IT 서비스를 제공합니다.
          </motion.p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-[0]">
          <svg viewBox="0 180 2500 200" preserveAspectRatio="none" className="w-full h-16 md:h-24">
            <path fill="#ffffff" d="M 0 250 C 1200 400 1200 50 3000 250 L 3000 550 L 0 550 L 0 250">
              <animate attributeName="d" dur="8s" values="M 0 250 C 1200 400 1200 50 3000 250 L 3000 550 L 0 550 L 0 250;M 0 250 C 400 50 400 400 3000 250 L 3000 550 L 0 550 L 0 250;M 0 250 C 1200 400 1200 50 3000 250 L 3000 550 L 0 550 L 0 250" repeatCount="indefinite" />
            </path>
          </svg>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-24">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8 space-y-24">
          {mainServices.map((s, i) => (
            <motion.div key={s.title} {...fadeUp} transition={{ duration: 0.6 }}
              className="grid md:grid-cols-2 gap-12 items-center"
            >
              <div className={i % 2 === 1 ? 'md:order-2' : ''}>
                <div className="w-12 h-12 bg-highlight/10 rounded-xl flex items-center justify-center mb-5">
                  <s.icon size={24} className="text-highlight" strokeWidth={1.5} />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">{s.title}</h2>
                <p className="text-accent leading-relaxed mb-6">{s.desc}</p>
                <ul className="space-y-2.5 mb-6">
                  {s.features.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-sm text-text">
                      <div className="w-5 h-5 bg-highlight/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <Check size={12} className="text-highlight" />
                      </div>
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2">
                  {s.tech.map((t) => (
                    <span key={t} className="px-3 py-1.5 bg-secondary text-xs font-medium text-primary rounded-full">{t}</span>
                  ))}
                </div>
              </div>
              <div className={`${i % 2 === 1 ? 'md:order-1' : ''} h-64 md:h-80 bg-secondary rounded-2xl flex items-center justify-center border border-gray-100 p-6`}>
                {(() => { const Visual = serviceVisuals[i]; return <Visual /> })()}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-24 bg-secondary">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8">
          <motion.div {...fadeUp} transition={{ duration: 0.6 }} className="text-center mb-16">
            <p className="text-xs uppercase tracking-[0.2em] text-highlight font-semibold mb-3">Additional</p>
            <h2 className="text-3xl md:text-4xl font-bold text-primary">부가 서비스</h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {additionalServices.map((s, i) => (
              <motion.div key={s.title} {...fadeUp} transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-7 bg-white rounded-2xl border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all"
              >
                <div className="w-11 h-11 bg-highlight/10 rounded-xl flex items-center justify-center mb-4">
                  <s.icon size={20} className="text-highlight" strokeWidth={1.5} />
                </div>
                <h3 className="font-bold text-primary mb-2">{s.title}</h3>
                <p className="text-sm text-accent leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Maintenance SLA */}
      <section className="py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8">
          <motion.div {...fadeUp} transition={{ duration: 0.6 }} className="text-center mb-16">
            <p className="text-xs uppercase tracking-[0.2em] text-highlight font-semibold mb-3">Maintenance</p>
            <h2 className="text-3xl md:text-4xl font-bold text-primary">유지보수 정책</h2>
            <p className="text-accent mt-4 max-w-2xl mx-auto">
              개발 완료 후에도 안정적인 서비스 운영을 위해 체계적인 유지보수 정책을 운영합니다.
            </p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Wrench, title: '무상 보수', desc: '배포 후 1개월간 버그 수정을 무상으로 제공합니다. 안정적인 서비스 안착을 지원합니다.' },
              { icon: AlertTriangle, title: '긴급 대응', desc: '서비스 장애 발생 시 4시간 내 1차 대응을 보장합니다. 비즈니스 영향을 최소화합니다.' },
              { icon: Activity, title: '정기 점검', desc: '월 1회 서버 상태, 보안 취약점, 성능 지표를 점검하여 사전에 문제를 예방합니다.' },
              { icon: Settings, title: '기능 업데이트', desc: '별도 협의를 통해 신규 기능 추가 및 기존 기능 개선을 진행합니다.' },
              { icon: ClipboardList, title: '모니터링', desc: '서버 가동률 99.9%를 목표로 24시간 모니터링 체계를 운영합니다.' },
              { icon: FileBarChart, title: '월간 리포트', desc: '유지보수 내역, 서버 상태, 성능 지표를 포함한 월간 리포트를 제공합니다.' },
            ].map((item, i) => (
              <motion.div key={item.title} {...fadeUp} transition={{ duration: 0.5, delay: i * 0.08 }}
                className="p-7 bg-secondary rounded-2xl border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all"
              >
                <div className="w-11 h-11 bg-highlight/10 rounded-xl flex items-center justify-center mb-4">
                  <item.icon size={20} className="text-highlight" strokeWidth={1.5} />
                </div>
                <h3 className="font-bold text-primary mb-2">{item.title}</h3>
                <p className="text-sm text-accent leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-secondary">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8 text-center">
          <motion.div {...fadeUp} transition={{ duration: 0.6 }}>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">맞춤 견적 받기</h2>
            <p className="text-accent mb-10 max-w-xl mx-auto">
              프로젝트의 요구사항을 알려주시면 최적의 솔루션과 견적을 제안해드립니다.
            </p>
            <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-semibold rounded-full hover:bg-primary-light transition-colors">
              견적 문의하기 <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  )
}
