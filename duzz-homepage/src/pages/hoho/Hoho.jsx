import { useEffect, useRef } from 'react'
import usePageMeta from '../../hooks/usePageMeta'
import { hohoMarkup } from './hohoMarkup'
import './Hoho.css'

/**
 * 호호특허(HoHoPatent) landing page — provided as a standalone design 시안.
 *
 * The original mockup markup is preserved 1:1 (injected via dangerouslySetInnerHTML),
 * its CSS is scoped under `.hoho-page` (see Hoho.css), and every behaviour — the
 * original ones plus a set of "고급 인터렉션" — is implemented here with plain DOM
 * APIs, all cleaned up on unmount so nothing leaks into the rest of the DUZZ site.
 */
export default function Hoho() {
  usePageMeta({
    title: '호호특허 HoHoPatent | 발명 구체화 리포트·특허출원 상담',
    description:
      '막연한 제품·서비스 아이디어를 문제점, 해결 방향, 구성요소, 차별점, 도면 방향으로 정리해 출원 전 검토 자료로 제공합니다.',
  })

  const rootRef = useRef(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const cleanups = []
    const q = (sel) => root.querySelector(sel)
    const qa = (sel) => Array.from(root.querySelectorAll(sel))

    // ── smooth in-page anchor scrolling (no global scroll-behavior leak) ──
    const anchors = qa('a[href^="#"]')
    anchors.forEach((a) => {
      const onClick = (e) => {
        const id = a.getAttribute('href')
        if (!id || id === '#') return
        const target = root.querySelector(id)
        if (!target) return
        e.preventDefault()
        target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' })
        q('.nav')?.classList.remove('open')
      }
      a.addEventListener('click', onClick)
      cleanups.push(() => a.removeEventListener('click', onClick))
    })

    // ── mobile nav toggle ──
    const nav = q('.nav')
    const menuBtn = q('.menu-btn')
    if (menuBtn && nav) {
      const onMenu = () => nav.classList.toggle('open')
      menuBtn.addEventListener('click', onMenu)
      cleanups.push(() => menuBtn.removeEventListener('click', onMenu))
    }

    // ── hero slider ──
    const slides = qa('.hero-slide')
    if (slides.length > 1) {
      let cur = 0
      const id = setInterval(() => {
        slides[cur].classList.remove('active')
        cur = (cur + 1) % slides.length
        slides[cur].classList.add('active')
      }, 3000)
      cleanups.push(() => clearInterval(id))
    }

    // ── floating CTA ──
    const floatCta = q('#floatCta')
    const floatTrigger = q('#floatTrigger')
    if (floatCta && floatTrigger) {
      const onTrigger = (e) => {
        e.stopPropagation()
        floatCta.classList.toggle('expanded')
      }
      const onDocClick = (e) => {
        if (!floatCta.contains(e.target)) floatCta.classList.remove('expanded')
      }
      floatTrigger.addEventListener('click', onTrigger)
      document.addEventListener('click', onDocClick)
      cleanups.push(() => floatTrigger.removeEventListener('click', onTrigger))
      cleanups.push(() => document.removeEventListener('click', onDocClick))
    }

    // ── scroll reveal + per-group stagger ──
    qa('[data-stagger] > *').forEach((el, i) => {
      el.style.setProperty('--reveal-delay', `${i * 90}ms`)
      if (!el.classList.contains('reveal')) el.classList.add('reveal')
    })
    const reveals = qa('.reveal')
    if (reduceMotion) {
      reveals.forEach((el) => el.classList.add('visible'))
    } else {
      // In-and-out: fade/slide in when entering the viewport, and back out
      // when it leaves — re-triggers every time you scroll past, both ways.
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            e.target.classList.toggle('visible', e.isIntersecting)
          })
        },
        { threshold: 0.12, rootMargin: '-8% 0px -12% 0px' }
      )
      reveals.forEach((el) => io.observe(el))
      cleanups.push(() => io.disconnect())
    }

    // ── scroll progress bar + scroll-spy nav ──
    const progress = q('.hoho-progress')
    const sections = ['#example', '#process', '#safety', '#attorney']
      .map((id) => ({ id, el: root.querySelector(id) }))
      .filter((s) => s.el)
    const navLinks = qa('.nav-links a[href^="#"]')
    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        const docH = document.documentElement.scrollHeight - window.innerHeight
        const pct = docH > 0 ? Math.min(1, window.scrollY / docH) : 0
        if (progress) progress.style.width = `${pct * 100}%`

        const mid = window.scrollY + window.innerHeight * 0.35
        let activeId = null
        for (const s of sections) {
          if (s.el.offsetTop <= mid) activeId = s.id
        }
        navLinks.forEach((a) =>
          a.classList.toggle('active', a.getAttribute('href') === activeId)
        )
        ticking = false
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    cleanups.push(() => window.removeEventListener('scroll', onScroll))

    if (!reduceMotion) {
      // ── hero cursor glow + subtle parallax ──
      const hero = q('.hero')
      const heroBody = q('.hero-body')
      if (hero) {
        const onHeroMove = (e) => {
          const r = hero.getBoundingClientRect()
          const x = ((e.clientX - r.left) / r.width) * 100
          const y = ((e.clientY - r.top) / r.height) * 100
          hero.style.setProperty('--glow-x', `${x}%`)
          hero.style.setProperty('--glow-y', `${y}%`)
          if (heroBody) {
            const dx = (e.clientX - r.left - r.width / 2) / r.width
            const dy = (e.clientY - r.top - r.height / 2) / r.height
            heroBody.style.transform = `translate(${dx * -14}px, ${dy * -10}px)`
          }
        }
        const onHeroLeave = () => {
          hero.style.setProperty('--glow-x', '16%')
          hero.style.setProperty('--glow-y', '30%')
          if (heroBody) heroBody.style.transform = ''
        }
        hero.addEventListener('mousemove', onHeroMove)
        hero.addEventListener('mouseleave', onHeroLeave)
        cleanups.push(() => hero.removeEventListener('mousemove', onHeroMove))
        cleanups.push(() => hero.removeEventListener('mouseleave', onHeroLeave))
      }

      // ── magnetic buttons ──
      qa('.btn-primary, .nav-cta').forEach((btn) => {
        const onMove = (e) => {
          const r = btn.getBoundingClientRect()
          const mx = e.clientX - r.left - r.width / 2
          const my = e.clientY - r.top - r.height / 2
          btn.style.transform = `translate(${mx * 0.3}px, ${my * 0.4}px)`
        }
        const onLeave = () => { btn.style.transform = '' }
        btn.addEventListener('mousemove', onMove)
        btn.addEventListener('mouseleave', onLeave)
        cleanups.push(() => btn.removeEventListener('mousemove', onMove))
        cleanups.push(() => btn.removeEventListener('mouseleave', onLeave))
      })

      // ── 3D tilt on flagged cards ──
      qa('[data-tilt]').forEach((card) => {
        const onMove = (e) => {
          const r = card.getBoundingClientRect()
          const px = (e.clientX - r.left) / r.width - 0.5
          const py = (e.clientY - r.top) / r.height - 0.5
          card.style.transform = `perspective(900px) rotateX(${py * -6}deg) rotateY(${px * 8}deg) translateY(-4px)`
        }
        const onLeave = () => { card.style.transform = '' }
        card.addEventListener('mousemove', onMove)
        card.addEventListener('mouseleave', onLeave)
        cleanups.push(() => card.removeEventListener('mousemove', onMove))
        cleanups.push(() => card.removeEventListener('mouseleave', onLeave))
      })
    }

    return () => cleanups.forEach((fn) => fn())
  }, [])

  return (
    <div
      ref={rootRef}
      className="hoho-page"
      dangerouslySetInnerHTML={{ __html: hohoMarkup }}
    />
  )
}
