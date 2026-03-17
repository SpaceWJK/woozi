import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { useBookLoader } from '../hooks/useBookLoader'
import TableOfContents from './TableOfContents'
import BookContent from './BookContent'

export default function BookViewer({ book, onClose }) {
  const { content, toc, loading, error } = useBookLoader(book)
  const [activeId, setActiveId] = useState('')
  const [tocOpen, setTocOpen] = useState(false)

  // ESC 키로 닫기 (TOC 열려있으면 TOC만 닫기)
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') {
        if (tocOpen) {
          setTocOpen(false)
        } else {
          onClose()
        }
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose, tocOpen])

  // 모바일 TOC 열림 시 스크롤 잠금
  useEffect(() => {
    if (tocOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [tocOpen])

  const handleTocClick = useCallback((id) => {
    setTocOpen(false)
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [])

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center justify-center h-[60vh]"
        role="status"
        aria-live="polite"
      >
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-library-accent border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-library-muted text-sm">책을 펼치는 중...</p>
        </div>
      </motion.div>
    )
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center h-[60vh] gap-4"
        role="alert"
      >
        <p className="text-library-accent">책을 불러올 수 없습니다</p>
        <p className="text-library-muted text-sm">{error}</p>
        <button
          onClick={onClose}
          className="text-sm text-library-accent hover:text-library-accent-hover underline"
        >
          책장으로 돌아가기
        </button>
      </motion.div>
    )
  }

  return (
    <div
      className="max-w-6xl mx-auto flex min-h-screen"
      role="region"
      aria-label={book.title}
    >
      {/* 모바일 햄버거 */}
      <button
        onClick={() => setTocOpen(!tocOpen)}
        className="fixed bottom-6 right-6 z-40 md:hidden w-12 h-12 bg-library-accent text-white rounded-full shadow-lg flex items-center justify-center"
        aria-label="목차 열기"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M3 5h14M3 10h10M3 15h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </button>

      {/* 모바일 TOC 오버레이 */}
      {tocOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/60 md:hidden"
          onClick={() => setTocOpen(false)}
          onKeyDown={(e) => {
            if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              setTocOpen(false)
            }
          }}
          role="button"
          tabIndex={0}
          aria-label="목차 닫기"
        />
      )}

      {/* 좌측 사이드바 (목차) */}
      <aside
        className={`
          fixed md:sticky top-0 left-0 z-40 md:z-auto
          w-[260px] h-screen overflow-y-auto
          bg-library-surface border-r border-library-divider
          transform transition-transform md:transform-none
          ${tocOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          pt-16 md:pt-4 pb-8
        `}
        style={{ scrollbarWidth: 'thin' }}
      >
        <div className="px-4 mb-4">
          <div
            className="w-full h-1 rounded-full mb-3"
            style={{ backgroundColor: book.color }}
          />
          <h2 className="text-sm font-semibold text-library-cream leading-snug">{book.title}</h2>
          <p className="text-[11px] text-library-muted mt-1">{book.author}</p>
        </div>
        <TableOfContents toc={toc} activeId={activeId} onSelect={handleTocClick} />
      </aside>

      {/* 우측 본문 */}
      <main className="flex-1 px-6 md:px-12 py-8 md:py-12 max-w-prose mx-auto">
        <BookContent content={content} toc={toc} onActiveHeading={setActiveId} />
      </main>
    </div>
  )
}
