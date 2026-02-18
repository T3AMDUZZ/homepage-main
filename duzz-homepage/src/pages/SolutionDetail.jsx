import { useParams, Link, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, AlertCircle, TrendingUp, Layers, Sparkles } from 'lucide-react'
import { getProjectBySlug } from '../data/projects'

const categoryLabel = {
  web: '홈페이지',
  system: '업무 시스템',
  app: '모바일 앱',
  ecommerce: '쇼핑몰',
  branding: '브랜딩',
}

const categoryColor = {
  web: 'bg-blue-50 text-blue-700 border-blue-100',
  system: 'bg-emerald-50 text-emerald-700 border-emerald-100',
  app: 'bg-violet-50 text-violet-700 border-violet-100',
  ecommerce: 'bg-amber-50 text-amber-700 border-amber-100',
  branding: 'bg-rose-50 text-rose-700 border-rose-100',
}

const categoryGradient = {
  web: 'from-blue-100 to-indigo-100',
  system: 'from-emerald-100 to-teal-100',
  app: 'from-violet-100 to-purple-100',
  ecommerce: 'from-amber-100 to-orange-100',
  branding: 'from-rose-100 to-pink-100',
}

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
}

function SolutionDetail() {
  const { slug } = useParams()
  const project = getProjectBySlug(slug)

  if (!project) {
    return <Navigate to="/404" replace />
  }

  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = project.seo.title

    let metaDesc = document.querySelector('meta[name="description"]')
    if (!metaDesc) {
      metaDesc = document.createElement('meta')
      metaDesc.name = 'description'
      document.head.appendChild(metaDesc)
    }
    metaDesc.content = project.seo.description

    let metaKeywords = document.querySelector('meta[name="keywords"]')
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta')
      metaKeywords.name = 'keywords'
      document.head.appendChild(metaKeywords)
    }
    metaKeywords.content = project.seo.keywords

    return () => {
      document.title = 'DUZZ - IT 솔루션 파트너'
    }
  }, [slug, project])

  const gradient = categoryGradient[project.category] || 'from-gray-100 to-gray-200'
  const badgeColor = categoryColor[project.category] || 'bg-gray-50 text-gray-700 border-gray-100'
  const hasImages = project.images && project.images.length > 0

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="max-w-6xl mx-auto px-4 py-8 pt-28">
        <nav className="flex text-sm text-gray-400">
          <Link to="/" className="hover:text-gray-900 transition-colors">홈</Link>
          <span className="mx-2">/</span>
          <Link to="/solutions" className="hover:text-gray-900 transition-colors">포트폴리오</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 font-medium">{project.title}</span>
        </nav>
      </div>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 pb-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-2.5 mb-4">
              <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${badgeColor}`}>
                {categoryLabel[project.category] || project.category}
              </span>
              {project.industry && (
                <span className="text-xs text-gray-400">{project.industry}</span>
              )}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
              {project.title}
            </h1>
            <p className="text-lg text-gray-500 mb-8 leading-relaxed">
              {project.summary}
            </p>

            <div className="grid grid-cols-3 gap-4 p-5 bg-gray-50 rounded-xl">
              <div>
                <p className="text-[11px] text-gray-400 mb-0.5">고객사</p>
                <p className="text-sm font-semibold text-gray-900">{project.client}</p>
              </div>
              <div>
                <p className="text-[11px] text-gray-400 mb-0.5">기간</p>
                <p className="text-sm font-semibold text-gray-900">{project.period}</p>
              </div>
              <div>
                <p className="text-[11px] text-gray-400 mb-0.5">담당</p>
                <p className="text-sm font-semibold text-gray-900">{project.role}</p>
              </div>
            </div>

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-primary text-white rounded-full hover:bg-gray-800 transition font-medium text-sm"
              >
                사이트 방문하기 <ArrowRight size={14} />
              </a>
            )}
          </motion.div>

          {/* Hero 이미지 */}
          <motion.div
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.15 }}
            className={`w-full aspect-video rounded-2xl overflow-hidden bg-gradient-to-br ${gradient} shadow-sm`}
          >
            {hasImages ? (
              <img
                src={project.images[0]}
                alt={project.title}
                className="w-full h-full object-cover"
                onError={(e) => { e.target.style.display = 'none' }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="text-5xl font-bold text-gray-400/30 mb-2">{project.title[0]}</div>
                  <p className="text-sm text-gray-400/60">이미지 준비 중</p>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Challenge → Results 스토리 흐름 */}
      {project.challenge && (
        <motion.section {...fadeUp} transition={{ duration: 0.6 }} className="py-14 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
                <AlertCircle size={16} className="text-amber-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">해결해야 할 과제</h2>
            </div>
            <p className="text-gray-600 leading-relaxed text-lg max-w-4xl">{project.challenge}</p>
          </div>
        </motion.section>
      )}

      {project.results.length > 0 && (
        <motion.section {...fadeUp} transition={{ duration: 0.6 }} className="py-16 bg-primary">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex items-center justify-center gap-2.5 mb-12">
              <div className="w-8 h-8 bg-highlight/20 rounded-lg flex items-center justify-center">
                <TrendingUp size={16} className="text-highlight-light" />
              </div>
              <h2 className="text-2xl font-bold text-white">프로젝트 성과</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {project.results.map((result, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  <p className="text-4xl md:text-5xl font-bold text-highlight-light mb-2">{result.value}</p>
                  <p className="text-white/50 text-sm">{result.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
      )}

      {/* Description */}
      <motion.section {...fadeUp} transition={{ duration: 0.6 }} className="max-w-6xl mx-auto px-4 py-14">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">프로젝트 개요</h2>
        <p className="text-gray-600 leading-relaxed whitespace-pre-line max-w-4xl">
          {project.description}
        </p>
      </motion.section>

      {/* Features */}
      {project.features.length > 0 && (
        <motion.section {...fadeUp} transition={{ duration: 0.6 }} className="bg-gray-50 py-14">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex items-center gap-2.5 mb-6">
              <div className="w-8 h-8 bg-highlight/10 rounded-lg flex items-center justify-center">
                <Layers size={16} className="text-highlight" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">주요 기능</h2>
            </div>
            <ul className="grid md:grid-cols-2 gap-3">
              {project.features.map((feature, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="flex items-center bg-white p-4 rounded-xl border border-gray-100"
                >
                  <span className="w-5 h-5 bg-highlight text-white rounded-full flex items-center justify-center text-[10px] font-bold mr-3 shrink-0">✓</span>
                  <span className="text-gray-700 text-sm">{feature}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.section>
      )}

      {/* Highlights */}
      {project.highlights && project.highlights.length > 0 && (
        <motion.section {...fadeUp} transition={{ duration: 0.6 }} className="max-w-6xl mx-auto px-4 py-14">
          <div className="flex items-center gap-2.5 mb-8">
            <div className="w-8 h-8 bg-highlight/10 rounded-lg flex items-center justify-center">
              <Sparkles size={16} className="text-highlight" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">프로젝트 하이라이트</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {project.highlights.map((highlight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="p-6 bg-gray-50 rounded-xl border border-gray-100"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-2">{highlight.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{highlight.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>
      )}

      {/* Tech Stack */}
      <motion.section {...fadeUp} transition={{ duration: 0.6 }} className="bg-gray-50 py-14">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-lg font-bold mb-4 text-gray-400">사용 기술</h2>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech, index) => (
              <span
                key={index}
                className="px-3.5 py-1.5 bg-white border border-gray-200 rounded-full text-xs text-gray-500 font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Image Gallery */}
      {hasImages && project.images.length > 1 && (
        <motion.section {...fadeUp} transition={{ duration: 0.6 }} className="max-w-6xl mx-auto px-4 py-14">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">상세 이미지</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {project.images.slice(1).map((image, index) => (
              <div key={index} className={`w-full aspect-video rounded-xl overflow-hidden bg-gradient-to-br ${gradient}`}>
                <img
                  src={image}
                  alt={`${project.title} ${index + 2}`}
                  className="w-full h-full object-cover"
                  onError={(e) => { e.target.style.display = 'none' }}
                />
              </div>
            ))}
          </div>
        </motion.section>
      )}

      {/* CTA */}
      <section className="py-20 bg-secondary">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <motion.div {...fadeUp} transition={{ duration: 0.6 }}>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              비슷한 프로젝트를 진행하고 싶으신가요?
            </h2>
            <p className="text-accent mb-10">
              DUZZ와 함께 성공적인 프로젝트를 시작하세요
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-semibold rounded-full hover:bg-primary-light transition-colors"
            >
              프로젝트 상담하기 <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default SolutionDetail
