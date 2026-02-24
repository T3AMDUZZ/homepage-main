import { useEffect } from 'react'

const DEFAULT_TITLE = 'DUZZ | 기업의 디지털 전환을 완성하는 개발 파트너'
const DEFAULT_DESC = 'DUZZ - (주)북극여우 소속 전문 개발팀. 홈페이지 개발, 시스템 구축, 유지보수 전문.'

export default function usePageMeta({ title, description } = {}) {
  useEffect(() => {
    document.title = title || DEFAULT_TITLE

    let metaDesc = document.querySelector('meta[name="description"]')
    if (!metaDesc) {
      metaDesc = document.createElement('meta')
      metaDesc.name = 'description'
      document.head.appendChild(metaDesc)
    }
    metaDesc.content = description || DEFAULT_DESC

    return () => {
      document.title = DEFAULT_TITLE
      metaDesc.content = DEFAULT_DESC
    }
  }, [title, description])
}
