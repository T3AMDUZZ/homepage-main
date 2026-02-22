import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

const categoryLabel = {
  web: '홈페이지',
  system: '업무 시스템',
  app: '모바일 앱',
  ecommerce: '쇼핑몰',
  branding: '브랜딩',
}

const categoryColor = {
  web: 'bg-blue-50 text-blue-700',
  system: 'bg-emerald-50 text-emerald-700',
  app: 'bg-violet-50 text-violet-700',
  ecommerce: 'bg-amber-50 text-amber-700',
  branding: 'bg-rose-50 text-rose-700',
}

const categoryGradient = {
  web: 'from-blue-900 to-indigo-800',
  system: 'from-emerald-900 to-teal-800',
  app: 'from-violet-900 to-purple-800',
  ecommerce: 'from-amber-900 to-orange-800',
  branding: 'from-rose-900 to-pink-800',
}

export default function ProjectCard({ project, variant = 'full' }) {
  const { title, client, industry, summary, slug, category, thumbnail, results, year } = project
  const keyMetric = results && results.length > 0 ? results[0] : null
  const isConfidential = client === '비공개'

  return (
    <Link to={`/solutions/${slug}`} className="group block bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
      {/* 썸네일 영역 */}
      <div className="relative w-full aspect-[16/10] overflow-hidden bg-[#F7F3FB]">
        {thumbnail ? (
          <>
            <img
              src={thumbnail}
              alt={title}
              loading="lazy"
              decoding="async"
              className={`w-full h-full object-contain group-hover:scale-105 transition-transform duration-700${isConfidential ? ' blur-[6px]' : ''}`}
              onError={(e) => { e.target.style.display = 'none' }}
            />
            {isConfidential && (
              <div className="absolute inset-0 bg-white/40" />
            )}
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-white/15 text-5xl font-bold">{title[0]}</span>
          </div>
        )}

        {/* 업종 뱃지 */}
        <div className="absolute top-3 left-3">
          <span className={`px-2.5 py-1 text-[10px] font-semibold rounded-full ${categoryColor[category] || 'bg-gray-50 text-gray-700'}`}>
            {categoryLabel[category] || category}
          </span>
        </div>

        {/* 핵심 성과 수치 */}
        {keyMetric && (
          <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-lg">
            <p className="text-xs font-bold text-gray-900">{keyMetric.value}</p>
            <p className="text-[9px] text-gray-500">{keyMetric.label}</p>
          </div>
        )}
      </div>

      {/* 콘텐츠 영역 */}
      <div className="p-5">
        {/* 업종 + 연도 */}
        <div className="flex items-center gap-2 mb-2">
          {industry && (
            <span className="text-[11px] text-gray-400 font-medium">{industry}</span>
          )}
          {industry && year && <span className="text-gray-200">|</span>}
          {year && (
            <span className="text-[11px] text-gray-400">{year}</span>
          )}
        </div>

        <h3 className="text-[15px] font-bold text-gray-900 mb-1 leading-snug group-hover:text-highlight transition-colors">
          {title}
        </h3>

        {variant === 'full' && (
          <>
            <p className="text-[11px] text-gray-500 font-medium mb-2">{client}</p>
            <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed mb-3">{summary}</p>
          </>
        )}

        {variant === 'compact' && (
          <p className="text-[11px] text-gray-500 font-medium mb-2">{client}</p>
        )}

        <span className="inline-flex items-center gap-1 text-xs text-highlight font-medium group-hover:gap-2 transition-all">
          자세히 보기 <ArrowRight size={12} />
        </span>
      </div>
    </Link>
  )
}
