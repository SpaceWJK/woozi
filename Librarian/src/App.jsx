import { useState, useCallback, useEffect, lazy, Suspense } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import BookShelf from './components/BookShelf'
import Header from './components/Header'
import { useRegistry } from './hooks/useBookLoader'

const BookViewer = lazy(() => import('./components/BookViewer'))

export default function App() {
  const { books, loading: registryLoading, error: registryError } = useRegistry()
  const [selectedBook, setSelectedBook] = useState(null)
  const [isDark, setIsDark] = useState(true)

  const handleSelectBook = useCallback((book) => {
    setSelectedBook(book)
    window.history.pushState({ bookId: book.id }, '', `${import.meta.env.BASE_URL}book/${book.id}`)
  }, [])

  const handleClose = useCallback(() => {
    setSelectedBook(null)
    window.history.pushState(null, '', import.meta.env.BASE_URL)
  }, [])

  // 초기 URL에서 책 ID 파싱 + 브라우저 뒤로/앞으로 가기 처리
  useEffect(() => {
    if (books.length === 0) return
    // 초기 URL 파싱: /woozi/book/{id}
    const base = import.meta.env.BASE_URL
    const path = window.location.pathname.replace(base, '')
    const match = path.match(/^book\/(.+)$/)
    if (match) {
      const book = books.find((b) => b.id === match[1])
      if (book) setSelectedBook(book)
    }

    const onPopState = (e) => {
      if (e.state?.bookId && books.length > 0) {
        const book = books.find((b) => b.id === e.state.bookId)
        setSelectedBook(book || null)
      } else {
        setSelectedBook(null)
      }
    }
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [books])

  const toggleTheme = useCallback(() => {
    setIsDark((prev) => {
      const next = !prev
      document.documentElement.setAttribute('data-theme', next ? 'dark' : 'lit')
      return next
    })
  }, [])

  return (
    <div className="min-h-screen">
      <Header isDark={isDark} onToggleTheme={toggleTheme} onGoHome={selectedBook ? handleClose : null} />

      <AnimatePresence mode="wait">
        {!selectedBook ? (
          <BookShelf
            key="shelf"
            books={books}
            loading={registryLoading}
            error={registryError}
            onSelectBook={handleSelectBook}
            isDark={isDark}
            onToggleTheme={toggleTheme}
          />
        ) : (
          <motion.div
            key="viewer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Suspense fallback={
              <div className="flex items-center justify-center h-[60vh]">
                <div className="w-8 h-8 border-2 border-library-accent border-t-transparent rounded-full animate-spin" />
              </div>
            }>
              <BookViewer
                book={selectedBook}
                onClose={handleClose}
              />
            </Suspense>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
