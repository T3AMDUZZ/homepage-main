import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center px-4">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-2">페이지를 찾을 수 없습니다</p>
        <p className="text-gray-400 mb-8">요청하신 페이지가 존재하지 않거나 삭제되었습니다.</p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/"
            className="px-6 py-3 bg-black text-white hover:bg-gray-800 transition"
          >
            홈으로 돌아가기
          </Link>
          <Link
            to="/solutions"
            className="px-6 py-3 border border-gray-300 text-gray-700 hover:bg-gray-50 transition"
          >
            포트폴리오 보기
          </Link>
        </div>
      </div>
    </div>
  )
}
