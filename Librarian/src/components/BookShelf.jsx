import { motion } from 'framer-motion'
import BookSpine from './BookSpine'
import CeilingLamp from './CeilingLamp'
import { layout, motionConfig, decorBooksBefore, decorBooksAfter, decorBooksShelf2 } from '../config/designDials'

/** 비활성(장식) 책 — 활성 책과 동일한 3D 구조, 제목 없음 */
function DecorBook({ w, h, color, spineColor, rotate }) {
  const sc = spineColor || color
  return (
    <div
      className="book-3d"
      aria-hidden="true"
      style={{
        width: w + 6,
        height: h,
        pointerEvents: 'none',
        transform: rotate ? `rotate(${rotate}deg)` : undefined,
        transformOrigin: 'bottom center',
      }}
    >
      <div style={{ width: w, height: h, position: 'relative' }}>
        {/* 책 등 (spine) */}
        <div
          className="book-spine"
          style={{
            position: 'absolute',
            inset: 0,
            background: `linear-gradient(170deg, ${color} 0%, ${sc} 100%)`,
          }}
        >
          {/* 상단 빛 반사 (세로 줄무늬 텍스처는 .book-spine::before CSS로 적용) */}
          <div
            className="absolute top-0 left-0 right-0 h-10 bg-gradient-to-b from-white/[0.06] to-transparent pointer-events-none"
          />
        </div>

        {/* 책 옆면 (두께감) */}
        <div
          className="book-side"
          style={{
            background: `linear-gradient(to right, ${sc}, ${color})`,
            filter: 'brightness(0.75)',
          }}
        />

        {/* 책 상단 (페이지 면) */}
        <div className="book-top" style={{ backgroundColor: '#d8d0c4', opacity: 0.35 }} />
      </div>
    </div>
  )
}

export default function BookShelf({ books, loading, error, onSelectBook, isDark, onToggleTheme }) {

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <p className="text-library-muted animate-pulse">책장을 불러오는 중...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
        <p className="text-library-accent">책장을 불러올 수 없습니다</p>
        <p className="text-library-muted text-sm">{error}</p>
      </div>
    )
  }

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={motionConfig.pageTransition}
      className={`${layout.containerClass} pt-4 md:pt-8 pb-24 relative`}
    >
      {/* 비네트 오버레이 */}
      <div className="vignette-overlay" />

      {/* 천장 전등 (중앙) */}
      <div className="flex justify-center mb-2 md:mb-4 relative z-10">
        <CeilingLamp isOn={!isDark} onToggle={onToggleTheme} size="large" />
      </div>

      {/* 도서관 안내 */}
      <div className="mb-8 md:mb-12 text-center relative z-10">
        <p className="text-library-muted text-sm tracking-widest uppercase mb-2">Personal Library</p>
        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-library-cream">
          읽고 싶은 책을 골라보세요
        </h2>
      </div>

      {/* 빈 상태 */}
      {books.length === 0 && (
        <div className="text-center py-16 relative z-10">
          <p className="text-library-muted">아직 등록된 책이 없습니다</p>
        </div>
      )}

      {/* === 메인 책장 === */}
      <div className="relative z-10">
        <div className="bookcase-top" />
        <div className="bookcase">
          {/* 선반 1단 */}
          <div className="px-3 sm:px-4">
            <div className="shelf-books" role="list">
              {/* 비활성 책 (앞쪽) */}
              {decorBooksBefore.map((b, i) => (
                <DecorBook key={`before-${i}`} {...b} />
              ))}

              {/* 활성 책 */}
              {books.map((book, i) => (
                <BookSpine key={book.id} book={book} onSelect={onSelectBook} index={i} />
              ))}

              {/* 비활성 책 (뒤쪽) */}
              {decorBooksAfter.map((b, i) => (
                <DecorBook key={`after-${i}`} {...b} />
              ))}
            </div>
            <div className="shelf-board" />
          </div>

          {/* 선반 2단 (빈 선반) */}
          <div className="px-3 sm:px-4">
            <div className="shelf-books" style={{ minHeight: 180 }}>
              {decorBooksShelf2.map((b, i) => (
                <DecorBook key={`shelf2-${i}`} {...b} />
              ))}
            </div>
            <div className="shelf-board" />
          </div>
        </div>
      </div>
    </motion.main>
  )
}
