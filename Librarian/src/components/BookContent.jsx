import { useEffect, useRef, useMemo, useState, useCallback } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize'

// heading에 id 속성 허용 (TOC 네비게이션용)
const sanitizeSchema = {
  ...defaultSchema,
  clobberPrefix: '',  // user-content- 접두사 제거 (TOC ID와 일치시키기 위해)
  attributes: {
    ...defaultSchema.attributes,
    h1: [...(defaultSchema.attributes?.h1 || []), 'id'],
    h2: [...(defaultSchema.attributes?.h2 || []), 'id'],
    h3: [...(defaultSchema.attributes?.h3 || []), 'id'],
  },
}

/**
 * rehype 플러그인: TOC에서 미리 계산된 ID를 heading 노드에 부여
 * HAST 레벨에서 동작하므로 React StrictMode 이중 렌더의 영향을 받지 않음
 */
function rehypeHeadingIds(tocIds) {
  return () => (tree) => {
    let index = 0
    function visit(node) {
      if (node.type === 'element' && ['h1', 'h2', 'h3'].includes(node.tagName)) {
        node.properties = node.properties || {}
        node.properties.id = tocIds[index++] || ''
      }
      if (node.children) node.children.forEach(visit)
    }
    visit(tree)
  }
}

/**
 * MD 본문에서 첫 번째 h1 (제목) 라인을 제거합니다.
 * 사이드바에 이미 책 제목이 표시되므로 중복 방지.
 */
function stripFirstH1(md) {
  const lines = md.split('\n')
  let found = false
  const result = []
  for (const line of lines) {
    if (!found && /^#\s+/.test(line)) {
      found = true
      continue // 첫 번째 h1 건너뛰기
    }
    result.push(line)
  }
  return result.join('\n')
}

export default function BookContent({ content, toc, onActiveHeading }) {
  const contentRef = useRef(null)

  // 첫 번째 h1 제거된 콘텐츠
  const cleanContent = useMemo(() => stripFirstH1(content), [content])

  // TOC에서 ID 배열 추출 (rehype 플러그인에 전달)
  const tocIds = useMemo(() => toc.map(t => t.id), [toc])

  // rehype 플러그인 배열 (tocIds 변경 시 갱신)
  const rehypePlugins = useMemo(() => [
    [rehypeHeadingIds(tocIds)],
    [rehypeSanitize, sanitizeSchema],
  ], [tocIds])

  // heading ID는 rehype 플러그인이 부여, 컴포넌트는 id prop을 그대로 전달
  const components = useMemo(() => createMarkdownComponents(), [cleanContent])

  // Intersection Observer로 현재 읽고 있는 섹션 추적
  useEffect(() => {
    if (!contentRef.current) return

    const headings = contentRef.current.querySelectorAll('h1, h2, h3')
    if (headings.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            onActiveHeading(entry.target.id)
          }
        }
      },
      { rootMargin: '-20% 0px -80% 0px' }
    )

    headings.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [cleanContent, onActiveHeading])

  return (
    <article ref={contentRef} className="prose-librarian">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={rehypePlugins}
        components={components}
      >
        {cleanContent}
      </ReactMarkdown>
    </article>
  )
}

/**
 * react-markdown 커스텀 렌더러
 * heading ID는 rehypeHeadingIds 플러그인이 HAST 레벨에서 부여하므로
 * 컴포넌트는 id prop을 그대로 전달합니다.
 */
function createMarkdownComponents() {
  return {
  h1: ({ id, children }) => (
    <h1 id={id} className="text-2xl md:text-3xl font-bold text-library-cream mt-12 mb-6 leading-tight scroll-mt-20">
      {children}
    </h1>
  ),
  h2: ({ id, children }) => (
    <h2 id={id} className="text-xl md:text-2xl font-bold text-library-cream mt-10 mb-4 leading-tight scroll-mt-20 border-b border-library-divider pb-2">
      {children}
    </h2>
  ),
  h3: ({ id, children }) => (
    <h3 id={id} className="text-lg font-semibold text-library-cream mt-8 mb-3 leading-snug scroll-mt-20">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="text-[15px] leading-[1.8] text-library-cream/90 mb-4">
      {children}
    </p>
  ),
  ul: ({ children }) => (
    <ul className="list-disc list-outside ml-5 mb-4 space-y-1 text-[15px] leading-[1.8] text-library-cream/90">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal list-outside ml-5 mb-4 space-y-1 text-[15px] leading-[1.8] text-library-cream/90">
      {children}
    </ol>
  ),
  li: ({ children }) => (
    <li className="pl-1">{children}</li>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-library-cream">{children}</strong>
  ),
  a: ({ href, children }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-library-accent hover:text-library-accent-hover underline underline-offset-2 decoration-library-accent/30 hover:decoration-library-accent transition-colors"
    >
      {children}
    </a>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-l-2 border-library-accent/40 pl-4 my-4 text-library-muted italic">
      {children}
    </blockquote>
  ),
  code: ({ className, children, ...props }) => {
    // 블록 코드: language- 클래스가 있거나, ref가 pre 안에 있으면 (react-markdown v9)
    const isInline = !className && typeof children === 'string' && !children.includes('\n')
    if (!isInline) {
      return (
        <code className={`${className || ''} block`} {...props}>
          {children}
        </code>
      )
    }
    return (
      <code className="bg-white/5 text-library-accent px-1.5 py-0.5 rounded text-[13px] font-mono" {...props}>
        {children}
      </code>
    )
  },
  pre: ({ children }) => <CodeBlock>{children}</CodeBlock>,
  table: ({ children }) => (
    <div className="overflow-x-auto mb-4">
      <table className="w-full text-[13px] border-collapse">
        {children}
      </table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="border-b border-library-divider">{children}</thead>
  ),
  th: ({ children }) => (
    <th className="text-left py-2 px-3 text-library-cream font-semibold text-[12px] uppercase tracking-wider">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="py-2 px-3 text-library-cream/80 border-b border-library-divider/50">
      {children}
    </td>
  ),
  hr: () => (
    <hr className="border-library-divider my-8" />
  ),
}}

/**
 * 코드블록 + 복사 버튼
 */
function CodeBlock({ children }) {
  const [copied, setCopied] = useState(false)
  const timerRef = useRef(null)

  // 언마운트 시 타이머 클린업
  useEffect(() => () => clearTimeout(timerRef.current), [])

  const handleCopy = useCallback(() => {
    const code = extractText(children)
    const onSuccess = () => {
      setCopied(true)
      clearTimeout(timerRef.current)
      timerRef.current = setTimeout(() => setCopied(false), 2000)
    }
    navigator.clipboard.writeText(code).then(onSuccess).catch(() => {
      // fallback: deprecated execCommand
      const ta = document.createElement('textarea')
      ta.value = code
      ta.style.position = 'fixed'
      ta.style.opacity = '0'
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
      onSuccess()
    })
  }, [children])

  return (
    <div className="relative group mb-4">
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 px-2 py-1 text-[11px] rounded bg-library-divider/50 text-library-muted hover:text-library-cream hover:bg-library-divider transition-colors"
        aria-label="코드 복사"
      >
        {copied ? '복사됨 ✓' : '복사'}
      </button>
      <pre className="bg-library-bg/80 border border-library-divider rounded-lg p-6 overflow-x-auto text-[13px] leading-relaxed font-mono whitespace-pre-wrap break-words">
        {children}
      </pre>
    </div>
  )
}

function extractText(node) {
  if (typeof node === 'string') return node
  if (Array.isArray(node)) return node.map(extractText).join('')
  if (node?.props?.children) return extractText(node.props.children)
  return ''
}
