import { motion } from 'framer-motion'

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
}

export default function TermsOfService() {
  return (
    <>
      {/* Header */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-28 bg-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)', backgroundSize: '60px 60px' }} />
        <div className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8 text-center relative z-10">
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-xs uppercase tracking-[0.2em] text-highlight-light font-semibold mb-4">Terms of Service</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-3xl md:text-5xl font-bold mb-4">서비스 이용약관</motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="text-white/40 max-w-2xl mx-auto">
            DUZZ IT 솔루션 및 개발 서비스의 이용 조건을 안내합니다.
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

            {/* 제1조 */}
            <div>
              <h2 className="text-xl font-bold text-primary mb-4">제1조 (목적)</h2>
              <p className="text-accent leading-relaxed">
                본 약관은 (주)북극여우(이하 "회사")가 제공하는 DUZZ IT 솔루션 및 개발 서비스(이하 "서비스")의 이용 조건, 절차 및 "회사"와 고객(이하 "이용자") 간의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.
              </p>
            </div>

            {/* 제2조 */}
            <div>
              <h2 className="text-xl font-bold text-primary mb-4">제2조 (서비스의 범위 및 과업의 정의)</h2>
              <p className="text-accent leading-relaxed mb-4">
                "회사"가 제공하는 서비스는 다음 각 호를 포함합니다.
              </p>
              <ul className="space-y-2.5 text-accent text-sm">
                <li className="flex items-start gap-2"><span className="text-highlight font-bold mt-0.5">·</span>웹사이트(기업용 홈페이지, 랜딩페이지 등) 기획 및 개발</li>
                <li className="flex items-start gap-2"><span className="text-highlight font-bold mt-0.5">·</span>맞춤형 비즈니스 시스템(ERP, CRM, 그룹웨어 등) 설계 및 구축</li>
                <li className="flex items-start gap-2"><span className="text-highlight font-bold mt-0.5">·</span>모바일 애플리케이션 개발 및 고도화</li>
                <li className="flex items-start gap-2"><span className="text-highlight font-bold mt-0.5">·</span>IT 인프라 컨설팅 및 기술 지원</li>
                <li className="flex items-start gap-2"><span className="text-highlight font-bold mt-0.5">·</span>시스템 유지보수 및 운영 관리</li>
              </ul>
              <p className="text-accent leading-relaxed mt-4 text-sm bg-secondary rounded-lg px-4 py-3">
                개별 프로젝트의 구체적인 과업 범위와 사양은 양 당사자가 합의한 <span className="font-semibold text-primary">'과업지시서'</span> 또는 <span className="font-semibold text-primary">'계약서'</span>를 우선합니다.
              </p>
            </div>

            {/* 제3조 */}
            <div>
              <h2 className="text-xl font-bold text-primary mb-4">제3조 (계약의 체결 및 우선순위)</h2>
              <ol className="space-y-3 text-accent text-sm list-decimal list-inside">
                <li>계약은 "이용자"가 "회사"의 제안서 및 견적을 승인하고, 양 사가 서면 또는 전자적 방식으로 계약서에 날인함으로써 성립합니다.</li>
                <li>본 약관은 서비스 이용에 관한 일반적인 원칙을 제시하며, 개별 계약서와 내용이 상충할 경우 <span className="font-semibold text-primary">개별 계약서의 효력이 우선</span>합니다.</li>
              </ol>
            </div>

            {/* 제4조 */}
            <div>
              <h2 className="text-xl font-bold text-primary mb-4">제4조 (대금 지급 및 연체)</h2>
              <ol className="space-y-3 text-accent text-sm list-decimal list-inside">
                <li>서비스 대금의 지급 시기 및 방식은 개별 계약에서 정한 마일스톤(착수금, 중도금, 잔금 등)을 따릅니다.</li>
                <li>"이용자"가 정당한 사유 없이 대금 지급을 지체하는 경우, "회사"는 서비스 제공을 일시 중단할 수 있으며, 지연 일수에 대해 법정 지연이자를 청구할 수 있습니다.</li>
              </ol>
            </div>

            {/* 제5조 */}
            <div>
              <h2 className="text-xl font-bold text-primary mb-4">제5조 (검수 및 과업의 종료)</h2>
              <ol className="space-y-3 text-accent text-sm list-decimal list-inside">
                <li>"회사"가 개발 완료를 통보한 날로부터 <span className="font-semibold text-primary">7일 이내</span>에 "이용자"는 검수 결과(합격/불합격)를 서면으로 통보해야 합니다.</li>
                <li>위 기간 내에 "이용자"의 서면 이의 제기가 없는 경우, 본 과업은 정상적으로 검수 완료되어 최종 인계된 것으로 간주합니다.</li>
                <li>검수 완료 후 발생하는 추가 요구사항은 별도의 추가 계약 또는 유지보수 계약을 통해 진행됩니다.</li>
              </ol>
            </div>

            {/* 제6조 */}
            <div>
              <h2 className="text-xl font-bold text-primary mb-4">제6조 (지식재산권의 귀속)</h2>
              <ol className="space-y-3 text-accent text-sm list-decimal list-inside">
                <li>본 프로젝트를 통해 창출된 결과물에 대한 소유권 및 지식재산권은 "이용자"가 <span className="font-semibold text-primary">대금 전액을 완납한 시점</span>에 "이용자"에게 이전됩니다.</li>
                <li>단, "회사"가 기존에 보유하고 있던 원천 기술, 소스코드 라이브러리, 개발 툴 등은 소유권 이전 대상에서 제외되며, 해당 프로젝트 내에서의 영구적 사용권만 부여됩니다.</li>
                <li>"회사"는 결과물을 자사 홍보 및 포트폴리오로 활용할 수 있습니다. 단, "이용자"가 영업비밀 유지를 위해 비공개를 요청한 경우는 예외로 합니다.</li>
              </ol>
            </div>

            {/* 제7조 */}
            <div>
              <h2 className="text-xl font-bold text-primary mb-4">제7조 ("회사"의 의무)</h2>
              <ol className="space-y-3 text-accent text-sm list-decimal list-inside">
                <li>"회사"는 관련 법령과 본 약관이 정하는 바에 따라 전문적이고 안정적인 서비스를 제공하기 위해 최선을 다합니다.</li>
                <li>"회사"는 "이용자"의 개인정보를 관련 법령에 따라 보호하며, 개인정보 처리방침에 따라 처리합니다.</li>
                <li>"회사"는 프로젝트 진행 상황을 "이용자"에게 성실히 공유하며, 주요 의사결정이 필요한 사항에 대해 적시에 협의합니다.</li>
              </ol>
            </div>

            {/* 제8조 */}
            <div>
              <h2 className="text-xl font-bold text-primary mb-4">제8조 ("이용자"의 의무)</h2>
              <ol className="space-y-3 text-accent text-sm list-decimal list-inside">
                <li>"이용자"는 프로젝트 진행에 필요한 자료 및 정보를 합의된 일정 내에 제공해야 합니다.</li>
                <li>"이용자"는 "회사"의 결과물을 계약 범위를 벗어나 무단으로 복제, 배포, 수정하지 않습니다.</li>
                <li>"이용자"의 자료 제공 지연으로 인한 프로젝트 일정 변경에 대해 "회사"는 책임을 부담하지 않습니다.</li>
              </ol>
            </div>

            {/* 제9조 */}
            <div>
              <h2 className="text-xl font-bold text-primary mb-4">제9조 (면책 사항)</h2>
              <ol className="space-y-3 text-accent text-sm list-decimal list-inside">
                <li>"회사"는 천재지변, 전쟁, 기타 불가항력적 사유로 서비스를 제공할 수 없는 경우 책임을 지지 않습니다.</li>
                <li>"회사"는 "이용자"의 귀책사유로 인한 서비스 장애에 대해 책임을 지지 않습니다.</li>
                <li>"회사"의 웹사이트에 게시된 정보(블로그, 포트폴리오 등)는 참고 목적이며, 이를 근거로 한 "이용자"의 의사결정에 대해 "회사"는 책임을 지지 않습니다.</li>
              </ol>
            </div>

            {/* 제10조 */}
            <div>
              <h2 className="text-xl font-bold text-primary mb-4">제10조 (분쟁 해결)</h2>
              <ol className="space-y-3 text-accent text-sm list-decimal list-inside">
                <li>본 약관과 관련된 분쟁은 양 당사자 간 원만한 협의를 통해 해결합니다.</li>
                <li>협의가 이루어지지 않을 경우, 대한민국 법률에 따르며 관할 법원은 "회사" 소재지의 법원으로 합니다.</li>
              </ol>
            </div>

            {/* 제11조 */}
            <div>
              <h2 className="text-xl font-bold text-primary mb-4">제11조 (약관의 변경)</h2>
              <p className="text-accent leading-relaxed">
                "회사"는 필요한 경우 본 약관을 변경할 수 있으며, 변경된 약관은 웹사이트에 공지함으로써 효력이 발생합니다. "이용자"는 변경된 약관에 동의하지 않을 경우 서비스 이용을 중단할 수 있습니다.
              </p>
            </div>

            {/* 부칙 */}
            <div>
              <h2 className="text-xl font-bold text-primary mb-4">부칙</h2>
              <div className="bg-secondary rounded-xl p-6 text-sm text-accent space-y-2">
                <p><span className="font-semibold text-primary">회사명:</span> (주)북극여우</p>
                <p><span className="font-semibold text-primary">서비스명:</span> DUZZ</p>
                <p><span className="font-semibold text-primary">이메일:</span> support@teamduzz.com</p>
                <p><span className="font-semibold text-primary">대표번호:</span> 010-3329-9041</p>
              </div>
            </div>

            <p className="text-accent/50 text-sm">
              본 약관은 2026년 2월 1일부터 시행됩니다.
            </p>

          </motion.div>
        </div>
      </section>
    </>
  )
}
