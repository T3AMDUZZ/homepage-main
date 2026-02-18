import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Quote, Briefcase, Users, ThumbsUp, FolderOpen } from 'lucide-react'
import { categories, getProjectsByCategory } from '../data/projects'
import ProjectCard from '../components/solutions/ProjectCard'
import ProjectFilter from '../components/solutions/ProjectFilter'

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
}

const testimonials = [
  {
    quote: '실시간으로 개발 현황을 확인할 수 있어서 프로젝트 진행이 매우 투명했습니다. 커뮤니케이션도 빠르고 정확해서 만족스러웠습니다.',
    name: '김대표', company: '(주)이첸이엔씨',
  },
  {
    quote: '체계적인 프로세스와 꼼꼼한 개발 덕분에 기대 이상의 결과물을 받을 수 있었습니다. 유지보수 대응도 빨라서 안심하고 맡길 수 있었습니다.',
    name: '이매니저', company: 'TurnUp',
  },
]

const trustStats = [
  { icon: FolderOpen, value: '40+', label: '완료 프로젝트' },
  { icon: Users, value: '15+', label: '협력 기업' },
  { icon: Briefcase, value: '10+', label: '업종 경험' },
  { icon: ThumbsUp, value: '98%', label: '고객 만족도' },
]

export default function Solutions() {
  const [activeFilter, setActiveFilter] = useState('all')

  const filteredProjects = getProjectsByCategory(activeFilter)

  return (
    <>
      {/* Header */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-28 bg-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)', backgroundSize: '60px 60px' }} />
        <div className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8 text-center relative z-10">
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-xs uppercase tracking-[0.2em] text-highlight-light font-semibold mb-4">Portfolio</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-3xl md:text-5xl font-bold mb-4">다양한 업종의 성공 사례</motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="text-white/40 max-w-2xl mx-auto">
            식품, 건설, 의료, 물류 등 다양한 업종의 프로젝트 경험으로 귀사의 비즈니스를 이해하고 최적의 솔루션을 제안합니다.
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

      {/* Trust Stats */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {trustStats.map((s, i) => (
              <motion.div key={s.label} {...fadeUp} transition={{ duration: 0.5, delay: i * 0.1 }} className="text-center">
                <div className="w-10 h-10 bg-highlight/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <s.icon size={20} className="text-highlight" strokeWidth={1.5} />
                </div>
                <div className="text-2xl md:text-3xl font-bold text-primary mb-0.5">{s.value}</div>
                <div className="text-xs text-accent">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Filter + Portfolio Grid */}
      <section className="py-24">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8">
          <ProjectFilter filters={categories} activeFilter={activeFilter} onFilterChange={setActiveFilter} />

          {/* Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((p, i) => (
              <motion.div
                key={p.slug}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <ProjectCard project={p} variant="full" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Logos */}
      <section className="py-16 bg-secondary">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8">
          <motion.div {...fadeUp} transition={{ duration: 0.6 }} className="text-center mb-10">
            <h2 className="text-2xl font-bold text-primary">협력 기업</h2>
          </motion.div>
          <div className="flex flex-wrap justify-center gap-6">
            {['블루모션', '(주)이첸이엔씨', 'TurnUp'].map((name, i) => (
              <motion.div key={name} {...fadeUp} transition={{ duration: 0.5, delay: i * 0.1 }}
                className="w-44 h-20 bg-white border border-gray-100 rounded-xl flex items-center justify-center"
              >
                <span className="text-sm font-semibold text-primary">{name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8">
          <motion.div {...fadeUp} transition={{ duration: 0.6 }} className="text-center mb-16">
            <p className="text-xs uppercase tracking-[0.2em] text-highlight font-semibold mb-3">Testimonials</p>
            <h2 className="text-3xl md:text-4xl font-bold text-primary">고객 후기</h2>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-6">
            {testimonials.map((t, i) => (
              <motion.div key={t.name} {...fadeUp} transition={{ duration: 0.5, delay: i * 0.15 }}
                className="p-8 bg-secondary rounded-2xl border border-gray-100"
              >
                <Quote size={24} className="text-highlight/30 mb-4" />
                <p className="text-text leading-relaxed mb-6">{t.quote}</p>
                <div>
                  <p className="font-bold text-primary text-sm">{t.name}</p>
                  <p className="text-xs text-accent">{t.company}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-secondary">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8 text-center">
          <motion.div {...fadeUp} transition={{ duration: 0.6 }}>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">다음 프로젝트의 주인공이 되어보세요</h2>
            <p className="text-accent mb-10">DUZZ와 함께 성공적인 프로젝트를 만들어보세요.</p>
            <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-semibold rounded-full hover:bg-primary-light transition-colors">
              프로젝트 상담하기 <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  )
}
