import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { motionConfig } from '../config/designDials'

function useCanHover() {
  const [canHover, setCanHover] = useState(true)
  useEffect(() => {
    const mq = window.matchMedia('(hover: hover)')
    setCanHover(mq.matches)
    const handler = (e) => setCanHover(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])
  return canHover
}

// 책 높이를 태그 수 기반으로 결정
function getBookHeight(book) {
  const base = 155
  const tagBonus = (book.tags?.length || 0) * 14
  return Math.min(base + tagBonus, 210)
}

export default function BookSpine({ book, onSelect, index = 0 }) {
  const canHover = useCanHover()
  const height = getBookHeight(book)
  const width = 54

  return (
    <motion.div
      className="book-3d"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: index * motionConfig.bookEntryDelay,
        duration: motionConfig.bookEntryDuration,
        ease: motionConfig.ease,
      }}
      style={{ width: width + 6, height }}
      role="listitem"
    >
      <motion.button
        onClick={() => onSelect(book)}
        className="relative block focus:outline-none focus-visible:ring-2 focus-visible:ring-library-accent rounded group"
        style={{ width, height }}
        whileHover={canHover ? motionConfig.hoverEffect : undefined}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        aria-label={`${book.title} 열기`}
      >
        {/* 책 등 (spine) */}
        <div
          className="book-spine absolute inset-0 flex flex-col items-center justify-center px-1"
          style={{
            background: `linear-gradient(170deg, ${book.color} 0%, ${book.spineColor || book.color} 100%)`,
          }}
        >
          {/* 상단 장식 */}
          <div
            className="w-[55%] h-[1px] mb-3 opacity-40"
            style={{ backgroundColor: book.labelColor || '#c4956a' }}
          />

          {/* 제목 (세로) */}
          <span
            className="text-[10px] font-semibold leading-tight text-center"
            style={{
              writingMode: 'vertical-rl',
              textOrientation: 'mixed',
              color: 'rgba(255,255,255,0.88)',
              maxHeight: height - 55,
              overflow: 'hidden',
              letterSpacing: '0.8px',
            }}
          >
            {book.title}
          </span>

          {/* 하단 장식 */}
          <div
            className="w-[55%] h-[1px] mt-3 opacity-40"
            style={{ backgroundColor: book.labelColor || '#c4956a' }}
          />

          {/* 금박 라벨 */}
          <div
            className="book-label"
            style={{ backgroundColor: book.labelColor || '#c4956a' }}
          />

          {/* 빛 반사 */}
          <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-white/[0.08] to-transparent pointer-events-none" />
        </div>

        {/* 책 옆면 (두께감) */}
        <div
          className="book-side"
          style={{
            background: `linear-gradient(to right, ${book.spineColor || book.color}, ${book.color})`,
            filter: 'brightness(0.8)',
          }}
        />

        {/* 책 상단 (페이지 면) */}
        <div className="book-top" style={{ backgroundColor: '#f0ebe0', opacity: 0.5 }} />

        {/* 호버 툴팁 */}
        {canHover && (
          <div className="absolute -top-14 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
            <div className="bg-library-surface border border-library-divider rounded-lg px-3 py-2 whitespace-nowrap shadow-lg">
              <p className="text-[11px] font-medium text-library-cream">{book.title}</p>
              <p className="text-[9px] text-library-muted mt-0.5">{book.author}</p>
            </div>
          </div>
        )}
      </motion.button>
    </motion.div>
  )
}
