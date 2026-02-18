import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { Mail, Phone, ExternalLink, ChevronDown, Send, CheckCircle, Clock, Building2 } from 'lucide-react'

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
}

const projectTypes = ['홈페이지 개발', '시스템 개발', '유지보수', '기타']
const budgetRanges = ['500만원 미만', '500만원 ~ 1,000만원', '1,000만원 ~ 3,000만원', '3,000만원 이상', '미정']

const faqCategories = [
  {
    title: '비용 · 견적',
    items: [
      {
        q: '견적은 어떻게 산출되나요?',
        a: '초기 상담(무료)에서 요구사항을 파악한 뒤, 기능 범위·디자인 복잡도·개발 기간을 기준으로 견적서를 작성합니다. 일반적으로 상담 후 2~3일 내에 상세 견적서를 전달드리며, 기능별로 항목이 구분되어 있어 필요에 따라 범위를 조정하실 수 있습니다.',
      },
      {
        q: '결제는 어떤 방식으로 진행되나요?',
        a: '일반적으로 착수금(30%) → 중간금(40%) → 잔금(30%) 3단계로 진행됩니다. 프로젝트 규모에 따라 협의 가능하며, 세금계산서 발행과 법인 간 계약이 가능합니다. (주)북극여우 명의로 정식 계약서를 작성합니다.',
      },
      {
        q: '추가 비용이 발생하는 경우가 있나요?',
        a: '초기 합의된 범위 내에서는 추가 비용이 발생하지 않습니다. 다만 개발 도중 기능 추가나 범위 변경이 있을 경우, 사전에 변경 견적을 안내드리고 승인 후 진행합니다. 사전 고지 없는 추가 청구는 절대 없습니다.',
      },
    ],
  },
  {
    title: '개발 과정',
    items: [
      {
        q: '개발 기간은 얼마나 걸리나요?',
        a: '프로젝트 유형별 평균 기간은 다음과 같습니다.\n• 홈페이지 (5~10페이지): 4~6주\n• 반응형 기업 홈페이지 + 관리자: 6~10주\n• 업무 시스템/대시보드: 8~16주\n• 모바일 앱 (iOS+Android): 10~16주\n• 쇼핑몰: 8~14주\n상담 시 요구사항에 맞는 정확한 일정표를 제공해드립니다.',
      },
      {
        q: '개발 진행 상황을 어떻게 확인하나요?',
        a: 'duzztest.com을 통해 개발 중인 화면을 실시간으로 확인하실 수 있습니다. 이 외에도 주 1회 정기 미팅(화상 또는 대면)을 통해 진행 현황을 보고드리며, 카카오톡/슬랙을 통해 수시 소통이 가능합니다. 피드백은 즉시 반영됩니다.',
      },
      {
        q: '개발 중에 기획이 변경되면 어떻게 하나요?',
        a: '프로젝트 진행 중 기획 변경은 충분히 발생할 수 있습니다. 변경 요청 시 영향 범위를 분석하여 일정·비용 변동 사항을 안내드리고, 합의 후 진행합니다. 소규모 수정(텍스트, 색상, 레이아웃 미세 조정 등)은 별도 비용 없이 반영합니다.',
      },
      {
        q: '디자인도 함께 해주시나요?',
        a: '네, 기획·디자인·개발·배포까지 원스톱으로 진행 가능합니다. 디자인이 이미 준비되어 있는 경우 시안을 전달해주시면 그대로 개발하고, 디자인이 없는 경우 참고 사이트·브랜드 가이드를 바탕으로 시안을 제작해드립니다.',
      },
    ],
  },
  {
    title: '계약 · 소유권',
    items: [
      {
        q: '소스 코드와 저작권은 누구에게 있나요?',
        a: '프로젝트 완료 및 잔금 정산 후, 소스 코드·디자인 파일 등 모든 산출물의 저작권은 클라이언트에게 귀속됩니다. Git 저장소 접근 권한과 함께 전체 소스 코드를 인도해드리며, 향후 다른 업체를 통한 유지보수도 가능합니다.',
      },
      {
        q: '호스팅/서버 관리도 해주시나요?',
        a: '네, AWS·Vercel·카페24 등 프로젝트에 적합한 호스팅 환경을 세팅해드립니다. 서버 관리를 맡기시면 모니터링·장애 대응·보안 업데이트를 포함한 월별 관리 서비스를 제공합니다. 직접 관리하시길 원할 경우 인수인계 문서를 함께 전달드립니다.',
      },
    ],
  },
  {
    title: '유지보수 · 후속 지원',
    items: [
      {
        q: '유지보수는 어떻게 진행되나요?',
        a: '프로젝트 납품 후 1개월간 무상 하자 보수 기간을 제공합니다. 이후에는 월 단위 유지보수 계약을 통해 정기 점검(월 1회), 긴급 장애 대응(2시간 내 확인), 기능 개선, 보안 패치 등의 서비스를 받으실 수 있습니다. SLA 기반으로 대응 시간을 보장합니다.',
      },
      {
        q: '타 업체에서 개발한 프로젝트도 유지보수 가능한가요?',
        a: '네, 가능합니다. 기존 코드와 시스템 구조를 분석(1~2주)한 뒤, 유지보수 가능 여부·범위·견적을 안내해드립니다. 코드 품질이 낮은 경우 단계적 리팩토링을 제안드리기도 하며, 필요 시 신규 시스템으로의 마이그레이션도 지원합니다.',
      },
      {
        q: '긴급 장애가 발생하면 얼마나 빨리 대응하나요?',
        a: '유지보수 계약 고객의 경우, 서비스 장애 신고 후 2시간 내 1차 확인을 보장합니다. 평일 09:00~18:00은 즉시 대응이 가능하며, 야간·주말 긴급 장애도 연락 가능한 핫라인을 운영합니다. 장애 처리 후에는 원인 분석 보고서를 전달드립니다.',
      },
    ],
  },
]

const CONTACT_API_URL = import.meta.env.VITE_CONTACT_API_URL

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [sendError, setSendError] = useState(false)
  const [openFaq, setOpenFaq] = useState(null)
  const { register, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = async (data) => {
    if (!CONTACT_API_URL) {
      console.warn('VITE_CONTACT_API_URL이 설정되지 않았습니다.')
      setSubmitted(true)
      return
    }

    setSending(true)
    setSendError(false)

    try {
      await fetch(CONTACT_API_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify(data),
      })
      setSubmitted(true)
    } catch {
      setSendError(true)
    } finally {
      setSending(false)
    }
  }

  if (submitted) {
    return (
      <section className="min-h-[80vh] flex items-center justify-center">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
          className="text-center px-4"
        >
          <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={32} className="text-green-500" strokeWidth={1.5} />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">문의가 접수되었습니다</h2>
          <p className="text-accent mb-2">24시간 내 1차 응답을 보장합니다.</p>
          <p className="text-sm text-accent">빠른 시일 내에 연락드리겠습니다.</p>
        </motion.div>
      </section>
    )
  }

  return (
    <>
      {/* Header */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-28 bg-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)', backgroundSize: '60px 60px' }} />
        <div className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8 text-center relative z-10">
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-xs uppercase tracking-[0.2em] text-highlight-light font-semibold mb-4">Contact</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-3xl md:text-5xl font-bold mb-4">프로젝트 상담하기</motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="text-white/40 max-w-2xl mx-auto">
            프로젝트에 대해 알려주세요. 24시간 내 1차 응답을 보장합니다.
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

      {/* Form + Info */}
      <section className="py-24">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Form */}
            <motion.div {...fadeUp} transition={{ duration: 0.6 }} className="lg:col-span-2">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-primary mb-2">이름 *</label>
                    <input {...register('name', { required: '이름을 입력해주세요.' })}
                      className="w-full px-4 py-3.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors bg-white"
                      placeholder="홍길동"
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-primary mb-2">회사명</label>
                    <input {...register('company')}
                      className="w-full px-4 py-3.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors bg-white"
                      placeholder="(주)회사명"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-primary mb-2">연락처 *</label>
                    <input {...register('phone', { required: '연락처를 입력해주세요.' })}
                      className="w-full px-4 py-3.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors bg-white"
                      placeholder="010-0000-0000"
                    />
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-primary mb-2">이메일 *</label>
                    <input {...register('email', { required: '이메일을 입력해주세요.', pattern: { value: /^\S+@\S+$/i, message: '올바른 이메일 형식이 아닙니다.' } })}
                      className="w-full px-4 py-3.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors bg-white"
                      placeholder="example@email.com"
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-primary mb-3">프로젝트 유형 *</label>
                  <div className="flex flex-wrap gap-3">
                    {projectTypes.map((type) => (
                      <label key={type} className="relative cursor-pointer">
                        <input type="radio" value={type} {...register('projectType', { required: '프로젝트 유형을 선택해주세요.' })}
                          className="peer sr-only"
                        />
                        <span className="block px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-accent peer-checked:border-highlight peer-checked:bg-highlight/5 peer-checked:text-highlight peer-checked:font-semibold transition-all hover:border-gray-300">
                          {type}
                        </span>
                      </label>
                    ))}
                  </div>
                  {errors.projectType && <p className="text-red-500 text-xs mt-1">{errors.projectType.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-primary mb-3">예산 범위</label>
                  <div className="flex flex-wrap gap-3">
                    {budgetRanges.map((range) => (
                      <label key={range} className="relative cursor-pointer">
                        <input type="radio" value={range} {...register('budget')}
                          className="peer sr-only"
                        />
                        <span className="block px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-accent peer-checked:border-highlight peer-checked:bg-highlight/5 peer-checked:text-highlight peer-checked:font-semibold transition-all hover:border-gray-300">
                          {range}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-primary mb-2">프로젝트 상세 *</label>
                  <textarea {...register('detail', { required: '프로젝트 내용을 입력해주세요.' })}
                    rows={6}
                    className="w-full px-4 py-3.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-none bg-white"
                    placeholder="프로젝트에 대해 자유롭게 설명해주세요. (목적, 주요 기능, 참고 사이트, 일정 등)"
                  />
                  {errors.detail && <p className="text-red-500 text-xs mt-1">{errors.detail.message}</p>}
                </div>

                {sendError && (
                  <p className="text-red-500 text-sm">전송에 실패했습니다. 잠시 후 다시 시도하시거나 이메일로 문의해주세요.</p>
                )}

                <button type="submit" disabled={sending}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-semibold rounded-full hover:bg-primary-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send size={16} />
                  {sending ? '전송 중...' : '문의 보내기'}
                </button>
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.2 }} className="space-y-6">
              <div className="p-7 bg-white rounded-xl border border-gray-100">
                <div className="w-11 h-11 bg-highlight/10 rounded-xl flex items-center justify-center mb-4">
                  <Mail size={20} className="text-highlight" strokeWidth={1.5} />
                </div>
                <h3 className="font-bold text-primary mb-4">연락처 정보</h3>
                <div className="space-y-4">
                  <a href="mailto:support@teamduzz.com" className="flex items-center gap-3 text-sm text-accent hover:text-primary transition-colors">
                    <Mail size={15} className="text-highlight flex-shrink-0" />
                    support@teamduzz.com
                  </a>
                  <a href="tel:010-3329-9041" className="flex items-center gap-3 text-sm font-semibold text-primary hover:text-highlight transition-colors">
                    <Phone size={15} className="text-highlight flex-shrink-0" />
                    010-3329-9041
                  </a>
                  <a href="https://duzztest.com" target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-3 text-sm text-accent hover:text-primary transition-colors"
                  >
                    <ExternalLink size={15} className="text-highlight flex-shrink-0" />
                    duzztest.com
                  </a>
                </div>
              </div>

              <div className="p-7 bg-primary text-white rounded-xl">
                <div className="w-11 h-11 bg-white/10 rounded-xl flex items-center justify-center mb-4">
                  <Clock size={20} className="text-highlight-light" strokeWidth={1.5} />
                </div>
                <h3 className="font-bold mb-3">빠른 응답 보장</h3>
                <p className="text-sm text-white/40 leading-relaxed">
                  문의 접수 후 24시간 내 1차 응답을 보장합니다. 긴급한 문의는 전화로 연락해주세요.
                </p>
              </div>

              <div className="p-7 bg-white rounded-xl border border-gray-100">
                <div className="w-11 h-11 bg-highlight/10 rounded-xl flex items-center justify-center mb-4">
                  <Building2 size={20} className="text-highlight" strokeWidth={1.5} />
                </div>
                <h3 className="font-bold text-primary mb-3">소속</h3>
                <p className="text-sm text-accent leading-relaxed">
                  DUZZ는 <strong className="text-primary">(주)북극여우</strong> 소속 전문 개발팀으로, 법인의 안정적인 기반 위에서 서비스를 제공합니다.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-secondary">
        <div className="max-w-3xl mx-auto px-4 md:px-6 lg:px-8">
          <motion.div {...fadeUp} transition={{ duration: 0.6 }} className="text-center mb-16">
            <p className="text-xs uppercase tracking-[0.2em] text-highlight font-semibold mb-3">FAQ</p>
            <h2 className="text-3xl md:text-4xl font-bold text-primary">자주 묻는 질문</h2>
          </motion.div>
          <div className="space-y-10">
            {faqCategories.map((cat, ci) => (
              <motion.div key={ci} {...fadeUp} transition={{ duration: 0.5, delay: ci * 0.1 }}>
                <h3 className="text-lg font-bold text-primary mb-4">{cat.title}</h3>
                <div className="space-y-3">
                  {cat.items.map((faq, fi) => {
                    const key = `${ci}-${fi}`
                    return (
                      <div key={key}
                        className="bg-white rounded-xl border border-gray-100 overflow-hidden"
                      >
                        <button
                          onClick={() => setOpenFaq(openFaq === key ? null : key)}
                          className="w-full flex items-center justify-between p-5 text-left"
                        >
                          <span className="font-medium text-primary text-sm pr-4">{faq.q}</span>
                          <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${openFaq === key ? 'bg-primary text-white rotate-180' : 'bg-secondary text-accent'}`}>
                            <ChevronDown size={14} />
                          </div>
                        </button>
                        <AnimatePresence>
                          {openFaq === key && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <p className="px-5 pb-5 text-sm text-accent leading-relaxed whitespace-pre-line">{faq.a}</p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )
                  })}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
