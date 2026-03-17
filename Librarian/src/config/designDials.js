/**
 * 디자인 다이얼 시스템
 *
 * 3개 다이얼로 UI의 "성격"을 결정합니다. 각각 1~10 스케일.
 *
 * DESIGN_VARIANCE — 레이아웃 대칭성
 *   1-3: 예측 가능, 정돈 (12열 그리드, 완벽 좌우 대칭, 균일 패딩)
 *   4-7: 약간 비대칭 (요소 겹침, 혼합 비율, 좌측 정렬 헤더)
 *   8-10: 아트적 비대칭 (매서너리, 거대한 여백, padding-left: 20vw)
 *
 * MOTION_INTENSITY — 애니메이션 강도
 *   1-3: 정적 (hover/active CSS만, 움직임 없음)
 *   4-7: 유려한 전환 (cubic-bezier, 순차 fade-in, 로딩 스켈레톤)
 *   8-10: 시네마틱 (스크롤 패럴렉스, Framer Motion 코레오그래피, 자기장 버튼)
 *
 * VISUAL_DENSITY — 콘텐츠 밀도
 *   1-3: 아트 갤러리 (거대한 여백, 섹션 간격 py-40, 고급스럽고 깨끗)
 *   4-7: 일반 웹앱 (표준 간격, 일반적인 카드/리스트 배치)
 *   8-10: 조종석 모드 (빽빽한 데이터, 1px 구분선, 모노스페이스 숫자)
 *
 * 프리셋 예시:
 *   원본 기본값:    { variance: 8, motion: 6, density: 4 }
 *   SaaS 대시보드:  { variance: 4, motion: 5, density: 7 }
 *   럭셔리 브랜드:  { variance: 7, motion: 8, density: 2 }
 */

// ============================================================
// 현재 프로젝트 다이얼 설정 (여기서 값을 변경하세요)
// ============================================================
export const DIALS = {
  DESIGN_VARIANCE: 6,    // 도서관: 약간의 비대칭, 유기적 느낌
  MOTION_INTENSITY: 7,   // 전등, 책 뽑기, stagger 등 인터랙티브
  VISUAL_DENSITY: 3,     // 갤러리형: 넉넉한 여백, 우아한 간격
}

// ============================================================
// 다이얼 값 → 디자인 토큰 매핑
// ============================================================

/** 레이아웃 간격 (VISUAL_DENSITY 기반) */
export const spacing = (() => {
  const d = DIALS.VISUAL_DENSITY
  if (d <= 3) return {
    sectionGap: 'py-16 md:py-20',   // 아트 갤러리
    cardPadding: 'p-6 md:p-8',
    shelfMinHeight: 'min-h-[240px]',
    bookGap: 'gap-4 sm:gap-5',
    contentMaxWidth: 'max-w-prose',   // 720px
    headerPadding: 'px-6 py-4',
  }
  if (d <= 7) return {
    sectionGap: 'py-10 md:py-14',    // 일반 웹앱
    cardPadding: 'p-4 md:p-6',
    shelfMinHeight: 'min-h-[200px]',
    bookGap: 'gap-3 sm:gap-4',
    contentMaxWidth: 'max-w-3xl',
    headerPadding: 'px-4 py-3',
  }
  return {
    sectionGap: 'py-6 md:py-8',      // 조종석
    cardPadding: 'p-3 md:p-4',
    shelfMinHeight: 'min-h-[180px]',
    bookGap: 'gap-2 sm:gap-3',
    contentMaxWidth: 'max-w-4xl',
    headerPadding: 'px-3 py-2',
  }
})()

/** 모션 설정 (MOTION_INTENSITY 기반) */
export const motionConfig = (() => {
  const m = DIALS.MOTION_INTENSITY
  if (m <= 3) return {
    pageTransition: { duration: 0 },
    bookEntryDelay: 0,
    bookEntryDuration: 0,
    hoverEffect: {},                  // 정적: 호버 없음
    lampSwing: false,
    stagger: false,
    ease: 'linear',
  }
  if (m <= 7) return {
    pageTransition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] },
    bookEntryDelay: 0.08,
    bookEntryDuration: 0.5,
    hoverEffect: { y: -8 },           // 부드러운 호버
    lampSwing: true,
    stagger: true,
    ease: [0.25, 0.1, 0.25, 1],
  }
  return {
    pageTransition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    bookEntryDelay: 0.12,
    bookEntryDuration: 0.7,
    hoverEffect: { y: -12, rotateZ: -3 },  // 시네마틱 호버
    lampSwing: true,
    stagger: true,
    ease: [0.16, 1, 0.3, 1],
  }
})()

/** 레이아웃 (DESIGN_VARIANCE 기반) */
export const layout = (() => {
  const v = DIALS.DESIGN_VARIANCE
  if (v <= 3) return {
    shelfAlign: 'justify-center',     // 중앙 정렬
    titleAlign: 'text-center',
    asymmetricPadding: false,
    containerClass: 'max-w-5xl mx-auto px-6 md:px-12',
  }
  if (v <= 7) return {
    shelfAlign: 'justify-start',      // 좌측 정렬 (유기적)
    titleAlign: 'text-center',
    asymmetricPadding: false,
    containerClass: 'max-w-5xl mx-auto px-4 sm:px-6 md:px-12',
  }
  return {
    shelfAlign: 'justify-start',      // 비대칭
    titleAlign: 'text-left md:text-center',
    asymmetricPadding: true,
    containerClass: 'max-w-6xl mx-auto px-4 sm:px-8 md:pl-20 md:pr-12',
  }
})()

/**
 * 장식용 비활성 책 설정
 * 서고 분위기를 위해 빈 책들을 채웁니다.
 * position: 'before' | 'after' — 활성 책 앞/뒤 배치
 */
const _decorBooks = [
  // before — 활성 책 왼쪽
  { w: 36, h: 180, color: '#5a4d40', spineColor: '#4e4236', rotate: -2, position: 'before' },
  { w: 42, h: 195, color: '#6b5c4a', spineColor: '#5e5040', rotate: 0, position: 'before' },
  { w: 32, h: 165, color: '#4a3f34', spineColor: '#40362c', rotate: 3, position: 'before' },
  { w: 46, h: 188, color: '#5c5040', spineColor: '#504538', rotate: 0, position: 'before' },
  { w: 38, h: 175, color: '#6d5e4c', spineColor: '#5a4e3e', rotate: -1, position: 'before' },
  // after — 활성 책 오른쪽
  { w: 40, h: 192, color: '#544838', spineColor: '#483e30', rotate: 0, position: 'after' },
  { w: 44, h: 178, color: '#635545', spineColor: '#574a3c', rotate: 2, position: 'after' },
  { w: 34, h: 168, color: '#5a4e3e', spineColor: '#4e4234', rotate: 0, position: 'after' },
  { w: 48, h: 185, color: '#4d4234', spineColor: '#42382c', rotate: -2, position: 'after' },
  { w: 38, h: 190, color: '#5e5040', spineColor: '#524636', rotate: 0, position: 'after' },
  { w: 42, h: 172, color: '#574a3c', spineColor: '#4c4032', rotate: 1, position: 'after' },
]

export const decorBooks = _decorBooks
export const decorBooksBefore = _decorBooks.filter(b => b.position === 'before')
export const decorBooksAfter = _decorBooks.filter(b => b.position === 'after')

/** 2단 선반 장식 책 */
export const decorBooksShelf2 = [
  { w: 40, h: 155, color: '#4a3f34', spineColor: '#40362c', rotate: -2 },
  { w: 36, h: 140, color: '#544838', spineColor: '#483e30', rotate: 0 },
  { w: 44, h: 165, color: '#5a4d40', spineColor: '#4e4236', rotate: 2 },
  { w: 38, h: 150, color: '#4d4234', spineColor: '#42382c', rotate: 0 },
  { w: 42, h: 158, color: '#574a3c', spineColor: '#4c4032', rotate: -1 },
]
