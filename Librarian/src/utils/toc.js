/**
 * MD 텍스트에서 헤딩을 추출하여 목차 트리를 생성합니다.
 * 코드블록 내부의 헤딩은 무시합니다.
 */
export function extractTOC(markdown) {
  const headings = []
  const idCount = {}
  const lines = markdown.split('\n')
  let inCodeBlock = false
  let firstH1Skipped = false

  for (const line of lines) {
    if (line.trim().startsWith('```')) {
      inCodeBlock = !inCodeBlock
      continue
    }
    if (inCodeBlock) continue

    const match = line.match(/^(#{1,3})\s+(.+)$/)
    if (match) {
      const level = match[1].length
      const raw = match[2].trim()
      // 인라인 마크다운 마크업 제거 (bold, italic, code 등)
      const text = raw
        .replace(/\*\*(.+?)\*\*/g, '$1')
        .replace(/\*(.+?)\*/g, '$1')
        .replace(/__(.+?)__/g, '$1')
        .replace(/_(.+?)_/g, '$1')
        .replace(/`(.+?)`/g, '$1')
        .replace(/~~(.+?)~~/g, '$1')

      // 첫 번째 h1은 건너뛰기 (사이드바에 책 제목 표시됨)
      if (level === 1 && !firstH1Skipped) {
        firstH1Skipped = true
        continue
      }

      let id = slugify(text)
      // 중복 ID에 숫자 접미사 추가
      if (idCount[id]) {
        idCount[id]++
        id = `${id}-${idCount[id]}`
      } else {
        idCount[id] = 1
      }
      headings.push({ level, text, id })
    }
  }

  return headings
}

/**
 * 한글/영문 텍스트를 URL-safe slug로 변환합니다.
 */
export function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^\w가-힣\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}
