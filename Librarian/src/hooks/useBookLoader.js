import { useState, useEffect } from 'react'
import { extractTOC } from '../utils/toc'

/**
 * 책 데이터를 fetch하고, MD 콘텐츠 + 목차를 반환합니다.
 */
export function useBookLoader(book) {
  const [content, setContent] = useState('')
  const [toc, setToc] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!book) {
      setContent('')
      setToc([])
      return
    }

    const controller = new AbortController()
    setLoading(true)
    setError(null)

    const base = import.meta.env.BASE_URL
    const url = `${base}books/${book.folder}/${book.file}`

    fetch(url, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`로드 실패 (${res.status})`)
        return res.text()
      })
      .then((md) => {
        setContent(md)
        setToc(extractTOC(md))
        setLoading(false)
      })
      .catch((err) => {
        if (err.name !== 'AbortError') {
          setError(err.message)
          setLoading(false)
        }
      })

    return () => controller.abort()
  }, [book?.id, book?.folder, book?.file])

  return { content, toc, loading, error }
}

/**
 * registry.json을 fetch합니다.
 */
export function useRegistry() {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const controller = new AbortController()
    const base = import.meta.env.BASE_URL
    fetch(`${base}books/registry.json`, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error('레지스트리 로드 실패')
        return res.json()
      })
      .then((data) => {
        setBooks(data)
        setLoading(false)
      })
      .catch((err) => {
        if (err.name !== 'AbortError') {
          setError(err.message)
          setLoading(false)
        }
      })
    return () => controller.abort()
  }, [])

  return { books, loading, error }
}
