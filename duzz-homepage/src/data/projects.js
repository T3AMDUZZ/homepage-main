// ──────────────────────────────────────────────
// JSON 파일 자동 로드 (src/data/projects/*.json)
// 새 프로젝트 추가 시 JSON 파일만 넣으면 자동 반영
// ──────────────────────────────────────────────
const projectFiles = import.meta.glob('./projects/*.json', { eager: true })

export const projects = Object.values(projectFiles)
  .map((mod) => mod.default)
  .sort((a, b) => {
    // 실제 프로젝트(slug에 영문-포함)를 먼저, 나머지는 year 내림차순
    const aReal = a.slug.includes('-') ? 0 : 1
    const bReal = b.slug.includes('-') ? 0 : 1
    if (aReal !== bReal) return aReal - bReal
    return (b.year || '0').localeCompare(a.year || '0')
  })

// ──────────────────────────────────────────────
// 카테고리 필터
// ──────────────────────────────────────────────
export const categories = [
  { value: 'all', label: '전체' },
  { value: 'web', label: '홈페이지' },
  { value: 'system', label: '업무 시스템' },
  { value: 'app', label: '모바일 앱' },
  { value: 'ecommerce', label: '쇼핑몰' },
  { value: 'branding', label: '브랜딩' },
]

// ──────────────────────────────────────────────
// 헬퍼 함수
// ──────────────────────────────────────────────
export const getProjectBySlug = (slug) =>
  projects.find((p) => p.slug === slug)

export const getProjectsByCategory = (category) =>
  category === 'all' ? projects : projects.filter((p) => p.category === category)

export const getFeaturedProjects = (limit = 3) =>
  projects.slice(0, limit)

export const generateProjectId = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  return Array.from({ length: 8 }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
}
