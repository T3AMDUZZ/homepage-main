import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MessageSquare, FileText, Palette, Code, CheckCircle, Rocket, Eye, Clock, Building2, Users, Calendar, BarChart3 } from 'lucide-react'

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
}

const steps = [
  { num: '01', icon: MessageSquare, title: '상담 & 요구사항 분석', duration: '1-2주', items: ['프로젝트 목표 정의', '요구사항 수집 및 분석', '기술 스택 검토', '견적 산출'] },
  { num: '02', icon: FileText, title: '기획 & 설계', duration: '1-2주', items: ['정보 구조(IA) 설계', '와이어프레임 제작', '기술 아키텍처 설계', '프로젝트 일정 수립'] },
  { num: '03', icon: Palette, title: '디자인', duration: '1-2주', items: ['UI/UX 디자인', '디자인 시안 제작', '반응형 디자인', '클라이언트 피드백 반영'] },
  { num: '04', icon: Code, title: '개발', duration: '4-8주', items: ['프론트엔드 개발', '백엔드 개발', 'API 연동', '실시간 진행상황 공유'], highlight: 3 },
  { num: '05', icon: CheckCircle, title: '테스트 & QA', duration: '1-2주', items: ['기능 테스트', '크로스 브라우저 테스트', '성능 최적화', '보안 점검'] },
  { num: '06', icon: Rocket, title: '배포 & 유지보수', duration: '지속적', items: ['서버 배포', '모니터링 시스템 구축', '정기 유지보수', '기능 업데이트'] },
]

const strengths = [
  { icon: Eye, title: '실시간 작업 현황 공유', desc: 'duzztest.com을 통한 투명한 프로세스로 개발 진행 상황을 언제든 확인할 수 있습니다.' },
  { icon: Clock, title: '빠른 초기 응답', desc: '24시간 내 1차 응답을 보장하여 프로젝트 진행에 지연이 없도록 합니다.' },
  { icon: Building2, title: '(주)북극여우의 안정성', desc: '법인 소속 개발팀으로서 안정적이고 지속 가능한 서비스를 보장합니다.' },
]

const methodology = [
  { icon: Users, title: 'Agile 스크럼', desc: '유연하고 효율적인 애자일 방법론을 적용합니다.' },
  { icon: Calendar, title: '2주 스프린트', desc: '2주 단위 스프린트로 지속적인 결과물을 전달합니다.' },
  { icon: BarChart3, title: '정기 회의', desc: '정기적인 미팅을 통해 프로젝트 방향을 조율합니다.' },
]

export default function Process() {
  return (
    <>
      {/* Header */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-28 bg-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)', backgroundSize: '60px 60px' }} />
        <div className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8 text-center relative z-10">
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-xs uppercase tracking-[0.2em] text-highlight-light font-semibold mb-4">Process</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-3xl md:text-5xl font-bold mb-4">체계적이고 투명한 개발 프로세스</motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="text-white/40 max-w-2xl mx-auto">
            명확한 단계별 프로세스를 통해 프로젝트의 성공을 보장합니다.
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

      {/* Timeline */}
      <section className="py-24">
        <div className="max-w-3xl mx-auto px-4 md:px-6 lg:px-8">
          <div className="relative">
            <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-gray-100" />
            <div className="space-y-8">
              {steps.map((step, i) => (
                <motion.div key={step.num} {...fadeUp} transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="relative pl-16 md:pl-20"
                >
                  <div className="absolute left-0 top-0 w-12 h-12 md:w-16 md:h-16 bg-primary text-white rounded-xl flex items-center justify-center z-10">
                    <step.icon size={20} strokeWidth={1.5} />
                  </div>
                  <div className="bg-white border border-gray-100 rounded-xl p-6 hover:shadow-md transition-all">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xs font-bold text-accent/40">{step.num}</span>
                      <h3 className="text-lg font-bold text-primary">{step.title}</h3>
                      <span className="ml-auto text-xs font-medium text-highlight bg-highlight/5 px-3 py-1 rounded-full">{step.duration}</span>
                    </div>
                    <ul className="space-y-2">
                      {step.items.map((item, j) => (
                        <li key={item} className={`text-sm flex items-center gap-2.5 ${step.highlight === j ? 'text-highlight font-semibold' : 'text-accent'}`}>
                          <span className={`w-1 h-1 rounded-full flex-shrink-0 ${step.highlight === j ? 'bg-highlight' : 'bg-gray-300'}`} />
                          {item}
                          {step.highlight === j && (
                            <span className="ml-1 px-2 py-0.5 bg-highlight text-white text-[10px] font-bold rounded-full">LIVE</span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Strengths */}
      <section className="py-24 bg-secondary">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8">
          <motion.div {...fadeUp} transition={{ duration: 0.6 }} className="text-center mb-16">
            <p className="text-xs uppercase tracking-[0.2em] text-highlight font-semibold mb-3">Our Difference</p>
            <h2 className="text-3xl md:text-4xl font-bold text-primary">DUZZ 차별점</h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {strengths.map((s, i) => (
              <motion.div key={s.title} {...fadeUp} transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-8 bg-white rounded-2xl border border-gray-100 hover:shadow-lg transition-all text-center"
              >
                <div className="w-14 h-14 mx-auto bg-highlight/10 rounded-xl flex items-center justify-center mb-5">
                  <s.icon size={24} className="text-highlight" strokeWidth={1.5} />
                </div>
                <h3 className="text-lg font-bold text-primary mb-3">{s.title}</h3>
                <p className="text-sm text-accent leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Methodology */}
      <section className="py-24">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8">
          <motion.div {...fadeUp} transition={{ duration: 0.6 }} className="text-center mb-16">
            <p className="text-xs uppercase tracking-[0.2em] text-highlight font-semibold mb-3">Methodology</p>
            <h2 className="text-3xl md:text-4xl font-bold text-primary">개발 방법론</h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {methodology.map((m, i) => (
              <motion.div key={m.title} {...fadeUp} transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-7 bg-secondary rounded-xl text-center"
              >
                <div className="w-11 h-11 bg-highlight/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <m.icon size={20} className="text-highlight" strokeWidth={1.5} />
                </div>
                <h3 className="font-bold text-primary mb-2">{m.title}</h3>
                <p className="text-sm text-accent">{m.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-secondary">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8 text-center">
          <motion.div {...fadeUp} transition={{ duration: 0.6 }}>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">프로젝트를 시작해볼까요?</h2>
            <p className="text-accent mb-10">체계적인 프로세스로 성공적인 프로젝트를 함께 만들어갑니다.</p>
            <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-semibold rounded-full hover:bg-primary-light transition-colors">
              프로젝트 상담하기
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  )
}
