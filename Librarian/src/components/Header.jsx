import { spacing } from '../config/designDials'

export default function Header({ isDark, onToggleTheme, onGoHome }) {
  return (
    <header className={`sticky top-0 z-50 flex items-center justify-between ${spacing.headerPadding} bg-library-bg/90 backdrop-blur-sm`}>
      <div className="flex items-center gap-3">
        {onGoHome && (
          <button
            onClick={onGoHome}
            className="text-library-muted hover:text-library-cream transition-colors text-sm"
            aria-label="책장으로 돌아가기"
          >
            ← 책장으로
          </button>
        )}
        {!onGoHome && (
          <h1 className="font-display text-xl tracking-wide text-library-cream">
            Web <span className="text-library-accent">Librarian</span>
          </h1>
        )}
      </div>

      {/* BookViewer에서만 미니 테마 토글 표시 */}
      {onGoHome && (
        <button
          onClick={onToggleTheme}
          className="theme-toggle-mini"
          role="switch"
          aria-checked={!isDark}
          aria-label={isDark ? '전등 켜기' : '전등 끄기'}
        >
          {isDark ? (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="4" stroke="currentColor" strokeWidth="1.5" />
              <path d="M8 1v2M8 13v2M1 8h2M13 8h2M3.5 3.5l1.4 1.4M11.1 11.1l1.4 1.4M3.5 12.5l1.4-1.4M11.1 4.9l1.4-1.4" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M14 9.3A6 6 0 016.7 2 6 6 0 1014 9.3z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </button>
      )}
    </header>
  )
}
