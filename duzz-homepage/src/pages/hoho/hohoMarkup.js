// 호호특허 HoHoPatent landing markup (design 시안).
// Kept as a raw HTML string so the original design is preserved 1:1.
// Inline <script> tags from the mockup are intentionally omitted — all
// behaviour is re-implemented (and extended) in Hoho.jsx via React effects.

export const hohoMarkup = `
  <div class="hoho-progress" aria-hidden="true"></div>

  <!-- ═══════════════ HERO + NAV ═══════════════ -->
  <header class="hero" id="top">
    <div class="hero-slides">
      <div class="hero-slide active" style="background-image:url('https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1600&q=80')"></div>
      <div class="hero-slide" style="background-image:url('https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1600&q=80')"></div>
      <div class="hero-slide" style="background-image:url('https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1600&q=80')"></div>
    </div>
    <div class="hero-overlay"></div>
    <nav class="nav">
      <a class="brand" href="#top">
        <div class="brand-label">
          <span class="brand-name">호호특허</span>
          <span class="brand-sub">HoHoPatent</span>
        </div>
      </a>
      <button class="menu-btn" aria-label="메뉴 열기">☰</button>
      <div class="nav-links">
        <a href="#example">정리 예시</a>
        <a href="#process">진행 과정</a>
        <a href="#safety">안심 안내</a>
        <a href="#attorney">담당 변리사</a>
      </div>
      <a href="https://form.typeform.com/to/If4hN8sw" target="_blank" rel="noopener" class="nav-cta">
        리포트 상담하기 →
      </a>
    </nav>

    <div class="hero-body">
      <p class="eyebrow">출원 전 아이디어 정리 · 변리사 직접 검토</p>
      <h1>막연한 아이디어를<br><em>출원 전 검토 가능한</em><br>발명 구조로 정리합니다.</h1>
      <p class="hero-sub">
        제품·서비스·개선 아이디어를 문제점, 해결 방향, 구성요소, 차별점, 도면 방향으로 정리해<br>
        출원 전 검토 자료로 제공합니다.
      </p>
      <p class="hero-note">
        본 리포트는 변리사 검토를 바탕으로 한 출원 전 아이디어 정리 자료입니다.<br>
        정식 특허출원은 별도 상담 후 진행됩니다.
      </p>
    </div>

    <div class="hero-scroll-cue" aria-hidden="true">
      <div class="cue-dot"></div>
      <span>Scroll</span>
    </div>
  </header>

  <main>

    <!-- ═══════════════ 1. FLOW ①②③ ═══════════════ -->
    <section class="flow" id="flow">
      <div class="container">
        <div class="s-head reveal">
          <span class="kicker">How It Works</span>
          <h2>아이디어에서 <em>발명까지</em></h2>
          <p>처음부터 완성된 설명이 아니어도 괜찮습니다.<br>
             질문과 구조화를 통해 출원 전 검토 자료로 정리합니다.</p>
        </div>

        <div class="flow-row" data-stagger>
          <div class="flow-cell reveal">
            <div class="flow-circle">
              <div class="flow-num">①</div>
              <h3>아이디어에서 시작</h3>
              <p>제품·서비스·개선 아이디어를 자유롭게 남깁니다.</p>
            </div>
          </div>
          <div class="flow-cell reveal">
            <div class="flow-circle">
              <div class="flow-num">②</div>
              <h3>발명 구조로 정리</h3>
              <p>문제점, 해결 방향, 구성요소, 차별점을 정리합니다.</p>
            </div>
          </div>
          <div class="flow-cell reveal">
            <div class="flow-circle">
              <div class="flow-num">③</div>
              <h3>다음 단계 안내</h3>
              <p>도면 방향, 보완 질문, 진행 방향을 안내합니다.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════ 2. EXAMPLE ═══════════════ -->
    <section class="example" id="example">
      <div class="container">
        <div class="s-head reveal">
          <span class="kicker">Example</span>
          <h2>정리 결과 <em>예시</em></h2>
          <p>내 아이디어를 맡기면 어떤 형태의 결과물이 나오는지 미리 살펴보세요.</p>
        </div>

        <div class="ex-card reveal" data-tilt>
          <div class="ex-bar">
            <div class="ex-dots"><span></span><span></span><span></span></div>
            <div class="ex-label">발명 구체화 리포트 (예시)</div>
          </div>
          <div class="ex-body">
            <span class="tag tag-navy">아이디어명</span>
            <div class="ex-title">흔들림을 줄이는 컵홀더 아이디어</div>

            <div class="ex-grid">
              <div class="ex-item ex-problem">
                <div class="ex-item-label label-r">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 9v4m0 4h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/></svg>
                  문제점
                </div>
                <p>컵 크기가 다르면 틈이 생기고 흔들림이 발생함</p>
              </div>
              <div class="ex-item ex-struct">
                <div class="ex-item-label label-b">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 7h18M3 12h18M3 17h12"/></svg>
                  구성 방향
                </div>
                <div class="chips">
                  <span class="chip">본체</span>
                  <span class="chip">탄성 지지부</span>
                  <span class="chip">조절 홈</span>
                  <span class="chip">고정부</span>
                </div>
              </div>
            </div>

            <div class="divider"></div>

            <span class="tag tag-gold">정리 결과</span>
            <div class="ex-result-grid">
              <div class="ex-result-item">구성요소</div>
              <div class="ex-result-item">차별점</div>
              <div class="ex-result-item">도면 방향</div>
              <div class="ex-result-item">보완 질문</div>
            </div>
            <div class="ex-note">
              완성된 특허 명세서가 아니라, 상담과 출원 판단을 위한 <strong>출원 전 정리 자료</strong>입니다.
              단순 아이디어를 문제점 중심으로 정리하고, 구성요소를 나누어 발명 구조로 바꿉니다.
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════ 3. PROCESS ═══════════════ -->
    <section class="process" id="process">
      <div class="container">
        <div class="s-head reveal">
          <span class="kicker kicker-lt">Process</span>
          <h2 style="color:#fff">아이디어는 이렇게 <em class="lt">구체화됩니다</em></h2>
          <p>처음부터 완성된 설명이 아니어도 괜찮습니다.<br>
             질문과 구조화를 통해 발명으로 정리합니다.</p>
        </div>

        <ul class="proc-list reveal" data-stagger>
          <li class="proc-item">
            <div class="proc-icon">01</div>
            <div class="proc-text">
              <strong>아이디어 입력</strong>
              <span>제품, 서비스, 개선 아이디어를 자유롭게 남깁니다.</span>
            </div>
            <span class="proc-badge">아이디어 요약</span>
          </li>
          <li class="proc-item">
            <div class="proc-icon">02</div>
            <div class="proc-text">
              <strong>질문과 보완</strong>
              <span>사용 상황, 문제점, 기존 제품·방식과의 차이를 질문으로 정리합니다.</span>
            </div>
            <span class="proc-badge">보완 질문 · 핵심 쟁점</span>
          </li>
          <li class="proc-item">
            <div class="proc-icon">03</div>
            <div class="proc-text">
              <strong>발명 구조화</strong>
              <span>구성요소, 작동 방식, 차별점을 변리사 관점에서 정리합니다.</span>
            </div>
            <span class="proc-badge active">발명 구체화 리포트</span>
          </li>
          <li class="proc-item">
            <div class="proc-icon">04</div>
            <div class="proc-text">
              <strong>다음 단계 안내</strong>
              <span>도면 방향, 보완 필요사항, 다음 진행 방향을 안내합니다.</span>
            </div>
            <span class="proc-badge">출원 검토 자료</span>
          </li>
        </ul>

        <div class="proc-cta reveal">
          <a href="https://form.typeform.com/to/If4hN8sw" target="_blank" rel="noopener" class="btn-primary">
            발명 구체화 리포트 상담하기 →
          </a>
        </div>
      </div>
    </section>

    <!-- ═══════════════ 4. SAFETY ═══════════════ -->
    <section class="safety" id="safety">
      <div class="container">
        <div class="safety-layout">
          <div class="safety-copy reveal">
            <span class="kicker">Safety</span>
            <h2>아이디어를 맡기기 전에,<br><em>먼저 안심할 수 있어야 합니다</em></h2>
            <p>호호특허는 아이디어를 바로 출원으로 몰아가지 않고,
               먼저 문제점, 구성요소, 차별점, 보완 방향을 정리해
               다음 단계를 판단할 수 있게 안내합니다.</p>
          </div>
          <div class="reveal">
            <ul class="safety-list" data-stagger>
              <li class="safety-item">
                <div class="s-icon">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9.66 18H14.34M12 2v1M4 10H3m18 0h-1M6.3 4.3l-.7.7m12.8-.7.7.7M12 14a5 5 0 0 0 3-9 5 5 0 0 0-6 8c.4.5 1 1 1 1.5"/></svg>
                </div>
                막연한 아이디어도 가능합니다
              </li>
              <li class="safety-item">
                <div class="s-icon">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                </div>
                아이디어 내용을 보호합니다
              </li>
              <li class="safety-item">
                <div class="s-icon">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M9 13h6M9 17h4"/></svg>
                </div>
                무료 리포트와 정식 출원을 구분합니다
              </li>
              <li class="safety-item">
                <div class="s-icon">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12h4l3 8 4-16 3 8h4"/></svg>
                </div>
                다음 선택지를 명확히 안내합니다
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════ 5. ATTORNEY ═══════════════ -->
    <section class="attorney" id="attorney">
      <div class="container">
        <div class="s-head reveal">
          <span class="kicker">Attorney</span>
          <h2>담당 <em>변리사</em></h2>
          <p>10년차 변리사 오사량이 직접 검토합니다.</p>
        </div>

        <div class="atty-layout">
          <div class="atty-track reveal">
            <article class="atty-card" data-tilt>
              <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=560&q=80" alt="변리사 오사량 프로필 사진">
              <div class="atty-card-body">
                <p class="atty-card-role">Patent Attorney</p>
                <h3>변리사 오사량</h3>
                <p class="atty-card-sub">10년차 · 직접 검토</p>
                <div class="atty-badges">
                  <span class="atty-badge">특허출원</span>
                  <span class="atty-badge">선행기술조사</span>
                  <span class="atty-badge">의견서 대응</span>
                </div>
              </div>
            </article>
          </div>

          <div class="atty-info reveal">
            <h2>10년차 변리사 오사량이<br>직접 검토합니다.</h2>
            <p>제품·서비스·개선 아이디어를 변리사 관점에서 읽고,
               문제점, 해결수단, 구성요소, 차별점, 도면 방향으로 정리합니다.</p>
            <div class="atty-office">
              <img src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=800&q=80" alt="호호특허 상담 사무실 내부">
            </div>
            <p class="atty-meta">
              📍 서울 서초구 서초대로46길 20-10 302호<br>
              ⏱ 서초역 도보 1분 · 예약제 상담 가능
            </p>
            <div class="atty-notice">
              <strong>운영 안내</strong>
              현재는 무료 발명 구체화 리포트 시범 제공 기간입니다.
              정식 특허출원은 별도 상담 후 비용을 안내드립니다.
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════ 6. CTA DARK ═══════════════ -->
    <section class="cta-dark">
      <div class="container">
        <div class="s-head reveal" style="margin:0 auto;text-align:center">
          <span class="kicker kicker-lt">변리사 직접 검토</span>
          <h2 style="color:#fff">발명으로 이어질 수 있는지<br><em class="lt">먼저 확인해보세요.</em></h2>
          <p>아이디어를 남겨주시면 변리사 관점에서<br>
             발명 구체화 리포트와 다음 진행 방향을 안내드립니다.</p>
          <div class="cta-buttons">
            <a href="https://form.typeform.com/to/If4hN8sw" target="_blank" rel="noopener" class="btn-primary">
              발명 구체화 리포트 상담하기 →
            </a>
          </div>
          <p class="cta-foot">변리사가 직접 검토합니다 · 정식 특허출원은 별도 상담 후 진행됩니다</p>
        </div>
      </div>
    </section>

  </main>

  <!-- ═══════════════ FLOATING CTA ═══════════════ -->
  <div class="float-cta" id="floatCta">
    <div class="float-items">
      <a href="https://open.kakao.com/o/temp" target="_blank" rel="noopener" class="float-btn float-btn-kakao">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3C7.03 3 3 6.36 3 10.5c0 2.64 1.6 4.97 4.02 6.35l-.9 3.35 3.55-2.34C10.38 17.95 11.18 18 12 18c4.97 0 9-3.36 9-7.5S16.97 3 12 3z"/></svg>
        카카오톡 상담
      </a>
      <a href="tel:010-0000-0000" class="float-btn float-btn-tel">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6.29 6.29l.95-.95a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
        전화 상담
      </a>
      <a href="https://form.typeform.com/to/If4hN8sw" target="_blank" rel="noopener" class="float-btn float-btn-main">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M9 13h6M9 17h4"/></svg>
        리포트 상담하기
      </a>
    </div>
    <button class="float-trigger" id="floatTrigger" aria-label="상담 메뉴 열기">＋</button>
  </div>

  <!-- ═══════════════ FOOTER ═══════════════ -->
  <footer class="site-footer">
    <div class="container foot-grid">
      <div class="foot-brand">
        <strong>호호특허 HoHoPatent</strong>
        <p>서울 서초구 서초대로46길 20-10 302호<br>서초역 도보 1분 · 예약제 상담<br>담당 변리사 오사량</p>
      </div>
      <div>
        <h4>메뉴</h4>
        <a href="#flow">아이디어 흐름</a>
        <a href="#example">정리 예시</a>
        <a href="#process">진행 과정</a>
        <a href="#safety">안심 안내</a>
        <a href="#attorney">담당 변리사</a>
      </div>
      <div>
        <h4>안내</h4>
        <a href="#">발명 구체화 리포트란</a>
        <a href="#">정식 특허출원 상담</a>
        <a href="#">선행기술조사</a>
        <a href="#">개인정보 처리방침</a>
      </div>
      <div>
        <h4>서비스</h4>
        <a href="https://form.typeform.com/to/If4hN8sw" target="_blank" rel="noopener">무료 리포트 신청</a>
        <a href="#">특허출원 상담</a>
        <a href="#">의견서 대응</a>
        <a href="#">상표 검토</a>
      </div>
    </div>
    <div class="foot-bottom">
      <span>© 2026 주식회사 북극여우. All rights reserved.</span>
      <span class="foot-dots">◆ ◇ ◈</span>
    </div>
  </footer>
`
