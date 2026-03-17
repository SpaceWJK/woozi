# Woozi — Web Projects

Woozi가 만든 웹페이지들을 보관하고 호스팅하는 레포지토리입니다.
`main` 브랜치에 push하면 GitHub Actions가 자동으로 빌드 & 배포합니다.

> **주의**: 각 프로젝트 폴더는 완전히 독립적으로 관리됩니다. 폴더 간 파일 이동이나 혼합은 절대 금지입니다.

---

## 프로젝트 목록

### 📁 `__Portfolio/` — QA 전략가 포트폴리오

QA 전략가로서의 경력과 역량을 소개하는 개인 포트폴리오 웹사이트입니다.

- **기술 스택**: React + TypeScript + shadcn/ui
- **호스팅**: [spacewjk.github.io/woozi/](https://spacewjk.github.io/woozi/)

---

### 📁 `Librarian/` — Web Librarian 서고

도서관 책장을 모티프로 한 웹 서고입니다. 3D 책등을 클릭하면 마크다운 기반의 책 내용을 열람할 수 있으며, 천장 전등을 이용한 테마 전환(밝음/어두움) 기능을 제공합니다.

- **기술 스택**: React + Vite + Tailwind CSS + Framer Motion
- **호스팅**: [spacewjk.github.io/woozi/librarian/](https://spacewjk.github.io/woozi/librarian/)

---

## 배포 구조

```
woozi/
├── __Portfolio/     → spacewjk.github.io/woozi/
├── Librarian/       → spacewjk.github.io/woozi/librarian/
└── (새 프로젝트)/    → spacewjk.github.io/woozi/{폴더명}/
```

새 웹페이지를 추가할 때는 루트에 새 폴더를 만들고, `deploy.yml` 워크플로우에 빌드 단계를 추가하면 됩니다.
