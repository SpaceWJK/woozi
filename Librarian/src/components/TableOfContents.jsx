import { useState, useMemo } from 'react'

export default function TableOfContents({ toc, activeId, onSelect }) {
  // h2를 "도메인"으로, h3를 하위 Task로 그루핑
  const groups = useMemo(() => groupToc(toc), [toc])

  return (
    <nav className="px-2" aria-label="목차">
      <ul className="space-y-0.5">
        {groups.map((group) => (
          <TocGroup
            key={group.id}
            group={group}
            activeId={activeId}
            onSelect={onSelect}
          />
        ))}
      </ul>
    </nav>
  )
}

function TocGroup({ group, activeId, onSelect }) {
  const isActive = group.id === activeId || group.children.some((c) => c.id === activeId)
  const [expanded, setExpanded] = useState(false)
  const hasChildren = group.children.length > 0

  return (
    <li>
      <button
        onClick={() => {
          if (hasChildren) setExpanded(!expanded)
          onSelect(group.id)
        }}
        className={`
          w-full text-left px-3 py-1.5 rounded text-[12px] leading-relaxed
          transition-colors relative flex items-center gap-1
          ${isActive
            ? 'text-library-cream bg-white/5 font-medium'
            : 'text-library-muted hover:text-library-cream hover:bg-white/[0.03]'
          }
        `}
      >
        {/* 활성 인디케이터 */}
        {isActive && (
          <span className="absolute left-0 top-1 bottom-1 w-[2px] bg-library-accent rounded-full" />
        )}

        {/* 화살표 */}
        {hasChildren && (
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            className={`flex-shrink-0 transition-transform ${expanded ? 'rotate-90' : ''}`}
            fill="currentColor"
          >
            <path d="M3 2l4 3-4 3z" />
          </svg>
        )}

        <span className="truncate">{group.text}</span>
      </button>

      {/* 하위 항목 */}
      {hasChildren && expanded && (
        <ul className="ml-4 mt-0.5 space-y-0.5">
          {group.children.map((child) => (
            <li key={child.id}>
              <button
                onClick={() => onSelect(child.id)}
                className={`
                  w-full text-left px-3 py-1 rounded text-[11px] leading-relaxed
                  transition-colors relative
                  ${child.id === activeId
                    ? 'text-library-cream bg-white/5'
                    : 'text-library-muted hover:text-library-cream hover:bg-white/[0.03]'
                  }
                `}
              >
                {child.id === activeId && (
                  <span className="absolute left-0 top-0.5 bottom-0.5 w-[2px] bg-library-accent rounded-full" />
                )}
                <span className="truncate block">{child.text}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </li>
  )
}

/**
 * flat headings → 2단계 트리 구조로 변환
 */
function groupToc(toc) {
  const groups = []
  let current = null

  for (const item of toc) {
    if (item.level <= 2) {
      current = { ...item, children: [] }
      groups.push(current)
    } else if (current) {
      current.children.push(item)
    }
  }

  return groups
}
