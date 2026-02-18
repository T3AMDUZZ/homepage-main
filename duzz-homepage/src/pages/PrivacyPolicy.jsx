import { motion } from 'framer-motion'

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
}

export default function PrivacyPolicy() {
  return (
    <>
      {/* Header */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-28 bg-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)', backgroundSize: '60px 60px' }} />
        <div className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8 text-center relative z-10">
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-xs uppercase tracking-[0.2em] text-highlight-light font-semibold mb-4">Privacy Policy</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-3xl md:text-5xl font-bold mb-4">개인정보 처리방침</motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="text-white/40 max-w-2xl mx-auto">
            (주)북극여우는 파트너사의 소중한 정보를 안전하게 보호합니다.
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

      {/* Content */}
      <section className="py-24">
        <div className="max-w-[800px] mx-auto px-4 md:px-6 lg:px-8">
          <motion.div {...fadeUp} transition={{ duration: 0.6 }} className="space-y-12">

            <p className="text-accent leading-relaxed">
              (주)북극여우(이하 "회사")는 「개인정보 보호법」 등 관련 법령을 준수하며, 파트너사의 소중한 정보를 보호하기 위해 다음과 같은 처리방침을 수립·공개합니다. 본 방침은 "회사"가 운영하는 DUZZ 서비스(이하 "서비스")에 적용됩니다.
            </p>

            {/* 1. 수집 항목 */}
            <div>
              <h2 className="text-xl font-bold text-primary mb-4">1. 수집하는 개인정보 항목 및 방법</h2>
              <p className="text-accent leading-relaxed mb-4">
                "회사"는 비즈니스 상담 및 원활한 서비스 제공을 위해 최소한의 정보를 수집합니다.
              </p>
              <div className="bg-secondary rounded-xl overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left px-5 py-3 font-semibold text-primary">구분</th>
                      <th className="text-left px-5 py-3 font-semibold text-primary">항목</th>
                    </tr>
                  </thead>
                  <tbody className="text-accent">
                    <tr className="border-b border-gray-100">
                      <td className="px-5 py-3 whitespace-nowrap">수집 항목</td>
                      <td className="px-5 py-3">담당자 성명, 회사명, 직함, 연락처, 이메일 주소, 서비스 이용 기록, 접속 로그, IP 정보</td>
                    </tr>
                    <tr>
                      <td className="px-5 py-3 whitespace-nowrap">수집 방법</td>
                      <td className="px-5 py-3">홈페이지 문의 폼, 유선 상담, 전자우편, 뉴스레터 구독 신청</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* 2. 이용 목적 */}
            <div>
              <h2 className="text-xl font-bold text-primary mb-4">2. 개인정보의 이용 목적</h2>
              <ul className="space-y-2.5 text-accent text-sm">
                <li className="flex items-start gap-2"><span className="text-highlight font-bold mt-0.5">·</span>프로젝트 견적 산출 및 비즈니스 상담 응대</li>
                <li className="flex items-start gap-2"><span className="text-highlight font-bold mt-0.5">·</span>서비스 계약 체결, 이행 및 대금 결제(세금계산서 발행 등)</li>
                <li className="flex items-start gap-2"><span className="text-highlight font-bold mt-0.5">·</span>프로젝트 수행 중 소통 및 기술 지원</li>
                <li className="flex items-start gap-2"><span className="text-highlight font-bold mt-0.5">·</span>신규 서비스 정보 제공 및 뉴스레터 발송(동의 시)</li>
              </ul>
            </div>

            {/* 3. 보유 기간 */}
            <div>
              <h2 className="text-xl font-bold text-primary mb-4">3. 개인정보의 보유 및 이용 기간</h2>
              <p className="text-accent leading-relaxed mb-4">
                수집된 정보는 원칙적으로 목적 달성 후 지체 없이 파기합니다. 단, 관계 법령에 의거하여 보존할 필요가 있는 경우 아래와 같이 보관합니다.
              </p>
              <div className="bg-secondary rounded-xl overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left px-5 py-3 font-semibold text-primary">보존 항목</th>
                      <th className="text-left px-5 py-3 font-semibold text-primary">기간</th>
                      <th className="text-left px-5 py-3 font-semibold text-primary">근거</th>
                    </tr>
                  </thead>
                  <tbody className="text-accent">
                    <tr className="border-b border-gray-100">
                      <td className="px-5 py-3">계약 및 대금 결제 기록</td>
                      <td className="px-5 py-3 whitespace-nowrap">5년</td>
                      <td className="px-5 py-3">전자상거래법</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="px-5 py-3">소비자 불만 및 분쟁 처리 기록</td>
                      <td className="px-5 py-3 whitespace-nowrap">3년</td>
                      <td className="px-5 py-3">전자상거래법</td>
                    </tr>
                    <tr>
                      <td className="px-5 py-3">비즈니스 상담 기록</td>
                      <td className="px-5 py-3 whitespace-nowrap">3년</td>
                      <td className="px-5 py-3">상담 종료 후</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* 4. 제3자 제공 */}
            <div>
              <h2 className="text-xl font-bold text-primary mb-4">4. 개인정보의 제3자 제공</h2>
              <p className="text-accent leading-relaxed">
                "회사"는 "이용자"의 개인정보를 원칙적으로 외부에 제공하지 않습니다. 다만, "이용자"의 사전 동의가 있거나 법령에 의해 요구되는 경우에는 예외로 합니다.
              </p>
            </div>

            {/* 5. 정보 보호 */}
            <div>
              <h2 className="text-xl font-bold text-primary mb-4">5. 정보 보호 및 안전성 확보 조치</h2>
              <p className="text-accent leading-relaxed mb-4">
                "회사"는 데이터 유출 방지를 위해 다음과 같은 보안 조치를 시행합니다.
              </p>
              <ul className="space-y-2.5 text-accent text-sm">
                <li className="flex items-start gap-2"><span className="text-highlight font-bold mt-0.5">·</span>개인정보 접근 권한의 차등 부여 및 관리</li>
                <li className="flex items-start gap-2"><span className="text-highlight font-bold mt-0.5">·</span>데이터 암호화 전송 및 보안 프로그램 설치</li>
                <li className="flex items-start gap-2"><span className="text-highlight font-bold mt-0.5">·</span>정기적인 시스템 보안 점검 및 백업</li>
              </ul>
            </div>

            {/* 6. 정보주체 권리 */}
            <div>
              <h2 className="text-xl font-bold text-primary mb-4">6. 정보주체의 권리·의무</h2>
              <p className="text-accent leading-relaxed mb-3">
                "이용자"는 개인정보 주체로서 다음과 같은 권리를 행사할 수 있습니다.
              </p>
              <ul className="space-y-2.5 text-accent text-sm">
                <li className="flex items-start gap-2"><span className="text-highlight font-bold mt-0.5">·</span>개인정보 열람 요청</li>
                <li className="flex items-start gap-2"><span className="text-highlight font-bold mt-0.5">·</span>오류 등이 있을 경우 정정 요청</li>
                <li className="flex items-start gap-2"><span className="text-highlight font-bold mt-0.5">·</span>삭제 요청</li>
                <li className="flex items-start gap-2"><span className="text-highlight font-bold mt-0.5">·</span>처리 정지 요청</li>
              </ul>
              <p className="text-accent leading-relaxed mt-4 text-sm">
                위 권리 행사는 이메일(<span className="font-semibold text-primary">support@teamduzz.com</span>)을 통해 요청하실 수 있으며, "회사"는 이에 대해 지체 없이 조치합니다.
              </p>
            </div>

            {/* 7. 방침 변경 */}
            <div>
              <h2 className="text-xl font-bold text-primary mb-4">7. 개인정보 처리방침 변경</h2>
              <p className="text-accent leading-relaxed">
                본 개인정보 처리방침은 법령, 정책 또는 보안 기술의 변경에 따라 내용이 추가·삭제 및 수정될 수 있습니다. 변경 사항은 시행일 최소 7일 전부터 웹사이트 공지사항을 통해 고지합니다.
              </p>
            </div>

            {/* 8. 연락처 */}
            <div>
              <h2 className="text-xl font-bold text-primary mb-4">8. 개인정보 보호책임자 및 연락처</h2>
              <p className="text-accent leading-relaxed mb-4">
                개인정보와 관련된 모든 문의 및 고충 처리 담당자는 다음과 같습니다.
              </p>
              <div className="bg-secondary rounded-xl p-6 text-sm text-accent space-y-2">
                <p><span className="font-semibold text-primary">회사명:</span> (주)북극여우</p>
                <p><span className="font-semibold text-primary">소속:</span> DUZZ 개발팀 운영 파트</p>
                <p><span className="font-semibold text-primary">이메일:</span> support@teamduzz.com</p>
                <p><span className="font-semibold text-primary">대표번호:</span> 010-3329-9041</p>
              </div>
            </div>

            <p className="text-accent/50 text-sm">
              본 개인정보 처리방침은 2026년 2월 1일부터 시행됩니다.
            </p>

          </motion.div>
        </div>
      </section>
    </>
  )
}
