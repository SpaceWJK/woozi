import { motion, useAnimation } from 'framer-motion'
import { useCallback, useEffect, useRef } from 'react'

export default function CeilingLamp({ isOn, onToggle, size = 'large' }) {
  const controls = useAnimation()
  const hasAnimated = useRef(false)

  // 최초 마운트 시 어텐션 큐 (체인 살짝 흔들기)
  useEffect(() => {
    if (hasAnimated.current) return
    hasAnimated.current = true
    const timer = setTimeout(() => {
      controls.start({
        rotate: [0, -3, 2, -1, 0],
        transition: { duration: 1.2, ease: 'easeOut' },
      })
    }, 800)
    return () => clearTimeout(timer)
  }, [controls])

  const handleClick = useCallback(() => {
    controls.start({
      rotate: [0, -10, 7, -4, 2, 0],
      transition: { duration: 0.9, ease: 'easeOut' },
    })
    onToggle()
  }, [controls, onToggle])

  const isLarge = size === 'large'
  const w = isLarge ? 120 : 60
  const h = isLarge ? 200 : 100

  return (
    <div className="ceiling-lamp-container" style={{ width: w, height: h }}>
      <svg
        width={w}
        height={h}
        viewBox="0 0 120 200"
        className={`ceiling-lamp-svg ${isOn ? 'lamp-on' : ''}`}
        style={{ width: w, height: h }}
      >
        {/* 천장 로제트 (원형 고정판) */}
        <circle cx="60" cy="4" r="8" fill="#3a3228" stroke="#4a4038" strokeWidth="1" />
        <circle cx="60" cy="4" r="4" fill="#2a2420" />

        {/* 전선 */}
        <line x1="60" y1="12" x2="60" y2="70" stroke="#5a5248" strokeWidth="1.5" />

        {/* 전체 램프 그룹 (흔들림) */}
        <motion.g
          animate={controls}
          style={{ transformOrigin: '60px 70px' }}
        >
          {/* 갓 (shade) — 사다리꼴 형태 */}
          <path
            d="M38 85 L42 70 L78 70 L82 85 Z"
            fill="#3a3228"
            stroke="#4a4038"
            strokeWidth="0.5"
          />
          {/* 갓 내부 (밝은 반사) */}
          <path
            d="M40 84 L43 71 L77 71 L80 84 Z"
            fill={isOn ? 'rgba(255,210,140,0.15)' : 'rgba(60,50,40,0.3)'}
          />
          {/* 갓 상단 링 */}
          <rect x="42" y="68" width="36" height="3" rx="1" fill="#4a4038" />

          {/* 전구 */}
          <ellipse
            cx="60"
            cy="95"
            rx="10"
            ry="13"
            fill={isOn ? 'rgba(255, 220, 150, 0.95)' : 'rgba(120, 110, 100, 0.25)'}
            className="lamp-bulb-glass"
          />
          {/* 전구 소켓 */}
          <rect x="55" y="82" width="10" height="6" rx="2" fill="#5a5248" />

          {/* 필라멘트 */}
          <path
            d="M56 93 Q60 88 64 93 Q60 98 56 93"
            fill="none"
            stroke={isOn ? '#ffcc44' : '#6a6258'}
            strokeWidth="0.8"
            opacity={isOn ? 1 : 0.3}
          />

          {/* 전구 빛 글로우 */}
          {isOn && (
            <>
              <ellipse
                cx="60" cy="92" rx="22" ry="25"
                fill="rgba(255, 200, 100, 0.12)"
                className="lamp-glow-inner"
              />
              <ellipse
                cx="60" cy="92" rx="40" ry="45"
                fill="rgba(255, 200, 100, 0.05)"
                className="lamp-glow-outer"
              />
            </>
          )}

          {/* 풀 체인 */}
          <line x1="60" y1="108" x2="60" y2="140" stroke="#7a7268" strokeWidth="0.8" />
          {/* 체인 마디들 */}
          <circle cx="60" cy="118" r="1.5" fill="#8a8278" />
          <circle cx="60" cy="128" r="1.5" fill="#8a8278" />
          {/* 체인 손잡이 */}
          <ellipse cx="60" cy="143" rx="4" ry="3" fill="#8a8278" stroke="#9a9288" strokeWidth="0.5" />
        </motion.g>
      </svg>

      {/* 클릭 영역 */}
      <button
        onClick={handleClick}
        className="ceiling-lamp-button"
        role="switch"
        aria-checked={isOn}
        aria-label={isOn ? '전등 끄기 (다크 모드)' : '전등 켜기 (라이트 모드)'}
      >
        <span className="sr-only">{isOn ? '전등 끄기' : '전등 켜기'}</span>
      </button>
    </div>
  )
}
