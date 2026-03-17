import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Menu, 
  X, 
  Download, 
  Mail, 
  Linkedin, 
  Github, 
  ArrowRight,
  CheckCircle,
  Target,
  Zap,
  Brain,
  TrendingUp,
  Settings,
  Languages,
  ExternalLink,
  ChevronDown
} from 'lucide-react';

// Language content
const content = {
  ko: {
    navigation: {
      about: 'About',
      timeline: 'Timeline',
      career: 'Career',
      systems: 'Portfolio',
      principles: 'Thinking',
      contact: 'Contact'
    },
    hero: {
      title: 'Service Quality Strategist',
      subtitle: 'System Architect',
      description: '구조 기반 사고와 데이터 중심 의사결정으로\n서비스 품질을 \'전략 자산\'으로 설계하는 QA 전문가입니다.',
      strengths: [
        '구조 기반 문제 해결 / 상위 2% EF',
        '서비스 경험 전체를 바라보는 End-to-End 관점',
        '예측·처방 중심의 QA 전략 설계'
      ],
      cta: '자기소개 자세히 보기'
    },
    about: {
      title: 'About',
      intro: '시니어 QA 전문가로, 구조 기반 사고와 데이터 중심 의사결정을 통해 서비스 품질을 전략적 자산으로 전환하는 전문가입니다.',
      description: '저는 구조 기반 사고(Structural Cognition)와 데이터 중심 의사결정을 바탕으로\n서비스 품질을 분석·예측·개선하는 QA 입니다.\n\n문제를 기능 단위가 아닌 서비스 관점에서\n\'시스템·흐름·경험 전체(E2E)\'로 바라보고,\n복잡한 구조를 빠르게 단순화하여 제어 가능한 형태로 재정의하는 능력을 보유하고 있습니다.\n\n저의 강점은 변화되는 상황에 따른 유연하고 명확한 대응 능력과\n사전에 이슈를 감지하고 구조적으로 해법을 설계하는 사고 체계입니다.\n\n저의 목표는 서비스 전체 경험을 데이터 기반의 구조로 재정의하여\n품질·안정성·유저 만족·비즈니스 성과를 동시에 개선하는 것입니다.',
      keyFacts: [
        { label: 'Role', value: 'Senior QA Strategist' },
        { label: 'Strengths', value: '구조 기반 문제 해결 · 전략 조직화 · 오류 감지' },
        { label: 'Cognition', value: '데이터 기반 판단 · 논리 우선 사고 · 감정 비개입' },
        { label: 'Working Style', value: '목적 기반 실행력 · 구조 중심 사고 · 즉시 판단 수정' }
      ]
    },
    timeline: {
      title: 'Timeline',
      subtitle: 'Woozi의 인지 구조가 어떻게 형성되었는지, 어떤 경험을 통해 현재의 \'전략형 QA\'가 되었는지',
      data: [
        {
          period: '초등학생 시절',
          title: '무한 호기심과 선도적 사고',
          description: '게임 유행 선도, 바둑·피아노·합기도 등 다양한 분야 경험',
          detailedDescription: '초등학생 시절부터 또래들보다 빠른 트렌드 인식 능력을 보여주었습니다. 콘솔과 PC 게임의 다양한 장르를 경험하며 유행을 선도했습니다. 단순히 게임에만 국한되지 않고 바둑, 피아노, 합기도 등 다양한 분야에 대한 강한 학습 욕구를 보였습니다. 특히 새로운 것에 대한 호기심이 강했고, 흥미가 떨어지면 즉시 다른 분야로 전환하는 유연성을 보여주었습니다. 또한 인라인 스케이트, 스포츠 활동, 오락실 게임 등 다양한 외부 활동에도 적극적으로 참여하며 폭넓은 경험을 쌓았습니다.',
          insight: '확장된 사고와 빠른 패턴 인식 능력의 기초 형성'
        },
        {
          period: '중·고등학생 시절',
          title: '시스템 해킹과 최적화 사고',
          description: '온라인 게임 버그 발견·악용, 해외 핵 프로그램 도입',
          detailedDescription: '중·고등학생 시절에는 PC방 문화와 함께 온라인 게임에 본격적으로 입문했습니다. 스타크래프트 클랜 활동과 교내 최초 게임 동아리 창립을 통해 리더십을 발휘했습니다. 이 시기에 주목할 점은 시스템의 취약점을 찾아 이를 활용하는 능력을 개발한 것입니다. 게임 내 버그를 발견하고 이를 전략적으로 활용하는 방법을 학습했으며, 심지어 해외에서 핵 프로그램을 도입하여 경쟁 우위를 확보하기도 했습니다. 또한 게임 내 아이템 거래를 통해 실제 수익을 창출하는 경험을 하며 게임사 기자단 활동을 통해 콘텐츠 제작과 커뮤니케이션 역량도 기렀습니다.',
          insight: '시스템 구조 분석과 취약점 탐지 능력 개발'
        },
        {
          period: '성인 초기',
          title: '다양한 비즈니스 모델 경험',
          description: '20여 가지 직업 경험을 통한 비즈니스 프로세스 학습',
          detailedDescription: '성인 초기에는 다양한 비즈니스 모델을 직접 경험하며 사회 전반의 운영 원리를 학습했습니다. 서비스업(호프집, 카페), 유통업(동대문 도매), 제조업(LG디스플레이 공장), 물류업(택배 센터), IT업계(테스터, 자산실사), 엔터테인먼트업(드라마 엑스트라) 등 20여 개 업계를 경험했습니다. 각 업계의 수익 구조, 운영 프로세스, 조직 문화를 직접 관찰하고 분석하는 능력을 기렀습니다. 이러한 다양한 경험은 후에 비즈니스 전체를 3인칭 시점에서 바라보는 관점을 형성하는 데 결정적인 역할을 했습니다.',
          insight: '비즈니스 프로세스 분석과 3인칭 관점의 체계화'
        },
        {
          period: '성인 중기',
          title: '데이터 기반 분석 체계 구축',
          description: '스포츠 토토 분석을 통한 데이터 분석 경험',
          detailedDescription: '성인 중기에는 방황하며 스포츠 토토에 빠졌던 시기가 있었습니다. 이 시기에 해외 축구, 아이스하키, MLB 등 다양한 스포츠 리그의 데이터를 수집하고 분석하는 경험을 했습니다. 선수 라인업, 부상 이력, 컨디션 등 다양한 변수를 고려하여 결과를 예측해보는 과정에서 데이터 분석에 대한 실전적 경험을 쌓았습니다. 비록 어려운 시기였지만, 이 경험은 후에 QA 업무에서 다양한 데이터를 통합하여 예측적 품질 관리를 사고하는 데 도움이 되었습니다.',
          insight: '다중 변수 분석과 예측 모델링 능력 확립'
        },
        {
          period: 'IT 경력 초기',
          title: 'QA 시스템 사고의 시작',
          description: 'IT 테스터 경험을 통한 시스템 전체 관점 확립',
          detailedDescription: 'IT 업계 진입 초기에 테스터로 근무하며 QA에 대한 체계적인 이해를 시작했습니다. 어린 시절부터 축적된 시스템 취약점 발견 능력이 전문적인 QA 역량으로 발전했습니다. 단순한 기능 테스트를 넘어 서비스 전체의 사용자 경험과 비즈니스 가치를 고려하는 통합적 관점을 개발했습니다. 이 시기에 QA를 단순한 문제 발견 역할이 아닌 서비스 품질 전체를 전략적으로 관리하는 역할로 인식하기 시작했습니다.',
          insight: '시스템 전체를 바라보는 QA 사고의 기초 형성'
        },
        {
          period: 'QA 전문가 10년+',
          title: '기존 QA의 한계를 뛰어넘는 비전',
          description: '확장된 범위의 게임 서비스 품질 관리와 AI 기반 혁신 추구',
          detailedDescription: '10년 이상의 QA 경력을 통해 기존 업계 표준을 뛰어넘는 개념적 사고가 확장되었습니다. 현재 업계의 QA 프로세스는 주로 기능 검증과 사후 문제 대응에 초점이 맞춰져 있습니다. 그러나 저는 게임 서비스 전체의 사용자 경험, 비즈니스 성과, 운영 효율성을 통합적으로 관리하는 확장된 QA 체계를 혼자 설계하고 구상해보고 있습니다. 특히 AI 기술의 발전으로 데이터 통합 및 실시간 분석이 가능해진 현재, 예측적 리스크 관리와 사전 예방 체계를 구축할 수 있는 기회가 도래했다고 판단합니다.',
          insight: 'AI 시대의 데이터 기반 예측적 QA 혁신 비전 확립'
        },
        {
          period: '미래',
          title: '데이터 기반 게임 서비스 품질 혁신',
          description: 'AI와 빅데이터를 활용한 예측적 품질 관리 체계 구축',
          detailedDescription: '미래의 QA는 AI와 빅데이터를 활용한 예측적 품질 관리 체계로 진화할 것입니다. 사용자 행동 패턴, 서버 성능 메트릭, 게임 밸런스 데이터, 고객 지원 데이터 등을 실시간으로 통합 분석하여 잠재적 리스크를 사전 탐지하고 예방하는 시스템을 구축하고자 합니다. 이를 통해 QA를 단순한 문제 발견 역할에서 서비스 경쟁력을 선제적으로 창출하는 전략적 자산으로 완전히 전환시키는 것이 목표입니다. 이는 게임 서비스 품질 관리 분야의 패러다임 전환을 주도하는 비전입니다.',
          insight: '게임 서비스 품질 관리의 패러다임 전환을 주도할 비전'
        }
      ]
    },
    career: {
      title: 'Career & Portfolio',
      subtitle: '12년간 20여 개 게임 서비스 전체 수명주기를 경험한 QA 전문가의 경력과 주요 성과',
      data: [
        {
          period: '2013 - 2025',
          title: '게임 서비스 경력',
          company: '다수 게임 QA Management',
          scope: '20여 개 게임 서비스의 론칭 전부터 서비스 종료까지 전체 수명주기 QA 담당 (최대 4개 프로젝트 동시 병렬 수행)',
          impact: '글로벌 서비스, 마켓 관리, 크로스 플랫폼 QA, 서비스 권역별 LQA 등 다양한 서비스 경험 (4-5개 프로젝트 동시 관리)',
          style: '전체 서비스 라이프사이클 관리, 다중 이해관계자 협업, 병렬 프로젝트 관리, 예측적 리스크 관리',
          gamesByYear: {
            '2013': ['영웅의 품격', '모아모아용'],
            '2014': ['큐라레', '크레이지몬'],
            '2015': ['드래곤페이트', '바니팡', '고스트헌터', '탭탭디스코'],
            '2016': ['톤톤해적단', '왕의길', '거신전기', '모두의불금'],
            '2017': ['아이러브클럽', '더뮤지션', '퍼즐나이츠', '워레인'],
            '2018': ['에픽세븐', '스노우큐브'],
            '2024': ['그랑사가 키우기: 나이츠x나이츠 (런칭 전 퍼블리싱 계약 해지)'],
            '2025': ['카오스제로 나이트메어']
          }
        },
        {
          period: '2018 - 2024',
          title: 'QA 교육 및 커리큘럼 설계',
          company: '신입 ~ 리드급 교육 진행',
          scope: '신입부터 리드급까지 단계별 QA 전문가 양성을 위한 12개 모듈 커리큘럼 설계 및 강의',
          impact: '신입 QA 70여 명 양성, 리드급 QA 5명 양성, 체계적 QA 방법론 정착',
          style: '실무 중심 교육, 단계별 역량 개발, 사고 전환 관문 설계',
          educationPrograms: {
            'LEVEL 0. QA Foundation (신입 공통) - 2개 과목': [
              '1. Introduction to Quality Assurance - QA의 역할과 책임, 품질의 정의, QA 마인드셋 ("QA가 왜 존재하는가"를 먼저 각인)',
              '2. Fundamentals of Software Testing - 테스팅의 정의와 목적, 오류/결함의 개념, SDLC와 테스트의 관계 (테스트라는 행위의 개념적 지도 제공)'
            ],
            'LEVEL 1. Core Testing Skills (주니어) - 3개 과목': [
              '3. Software Testing Lifecycle & Standards - 테스트 라이프사이클, 표준 기반 테스트 흐름, 테스트 종료 기준',
              '4. Test Design & Techniques - 테스트 기법, 테스트 설계 기법, 리스크 기반 테스팅 ("어디를, 왜 테스트하는가" 판단 가능)',
              '5. Practical Test Execution - 기획 리뷰 실무, TC & Checklist 작성, BTS(Jira) 실습 (이론 → 산출물 연결)'
            ],
            'LEVEL 2. QA in Real Service Environment (중급) - 3개 과목': [
              '6. QA Workflow & Service Operations - QA 프로세스 전반, QA 데이터 관리, 마켓 이슈 & 서비스 장애 대응, 밸런스 QA / 웹 서비스 QA (QA가 서비스 운영의 일부임을 인식)',
              '7. Mobile Platform Essentials for QA - Android 플랫폼 이해, iOS 플랫폼 이해, 플랫폼 제약과 테스트 전략',
              '8. QA Team Systems & R&R - QA팀 운영 구조, 신규/업데이트/점검 프로세스, Role & Responsibility (개인 QA → 조직 QA 전환)'
            ],
            'LEVEL 3. Advanced Testing Practice (중급 → 시니어) - 1개 과목': [
              '9. Advanced Testing Strategies - Black-box Testing Practice, Exploratory Testing Practice, List-based Testing Practice ("상황에 맞는 테스트 전략 선택")'
            ],
            'LEVEL 4. QA Leadership & Expertise (리드 후보) - 3개 과목': [
              '10. Quality Risk Management & Decision Making - 품질 리스크 식별, 테스트 결과 해석, 의사결정 지원 역할',
              '11. Advanced Testing Theory - Gray Box Testing 이론 & 사례, 퍼블리싱 환경 테스트 전략',
              '12. Operational Excellence for QA Leaders - 효율적인 리소스 관리, 형상 관리 전략, 커뮤니케이션 스킬 & 상황 대응 (여기서부터 QA 리드/시니어 포지션)'
            ]
          }
        },
        {
          period: '2020 - 2025',
          title: 'QA 메트릭스 체계화',
          company: 'QA 데이터 정량적 수치화 → 대시보드 구축',
          scope: '다중 프로젝트 QA 데이터를 통합 관리하는 3개 체계 구축 (QA 통합 대시보드, Service QA Report, Build Stability Metrics)',
          impact: '데이터 기반 의사결정 체계 정착, 업데이트 차수별/월별 품질 추이 추적, ROI 및 생산성 분석 가능',
          style: '실시간 대시보드 구축, 업데이트 차수별/월별 리포트 자동화, 빌드 안정성 모니터링',
          metricsCategories: {
            'QA 통합 대시보드': [
              '이슈 검출율 - 전체 이슈 현황 및 등급별 분류',
              '업데이트 차수별 이슈 현황 - 핫픽스 진행 횟수',
              '빌드 수급 현황 - 테스트 볼륨 및 리소스 현황',
              '커뮤니티 유저 제보 이슈 현황 (업데이트 차수별/월별 취합)'
            ],
            'Service QA Report': [
              '업데이트 차수별 리포트 - Target Service QA Status, 상세 내용, Service Status, Test Volume, Overall Issue Status, 배포 버전 상세, QA 평가, 종합 서비스 품질 평가',
              '월간 리포트 - Service Stability & Business Impact, Team Productivity & Efficiency, Quality Metrics Analysis, Industry Trend Analysis',
              'User Satisfaction Analysis, Risk & Opportunity Analysis, Cost Efficiency Analysis, Monthly Summary',
              '전년대비/전월대비 서비스 품질 추이 추적 및 ROI 분석'
            ],
            'Build Stability Metrics': [
              '빌드 안정성 비율 체크 - 개발 완성도 및 구현률 측정',
              '빌드 전달 딜레이 발생 빈도 및 원인 분석',
              '테스트 빌드 수급 안정성 지표 및 품질 예측 모델링'
            ]
          }
        }
      ]
    },

    principles: {
      title: 'Thinking',
      subtitle: '이 사람과 일하면 어떤 사고 방식으로 움직이는가?',
      intro: '\'품질 관리\'는 결함을 찾는 것이 아닌\n\'서비스 경쟁력을 확보\'하는 과정입니다.',
      cognitiveMap: {
        title: 'My Cognitive Map',
        steps: [
          { label: '입력', description: '문제 상황 인식' },
          { label: '필터링', description: '핵심 요소 추출' },
          { label: '구조화', description: '시스템적 분석' },
          { label: '시나리오', description: '예측 모델링' },
          { label: '결정', description: '데이터 기반 판단' },
          { label: '실행', description: '체계적 구현' }
        ]
      },
      principles: [
        {
          title: '전체 구조 파악',
          description: '문제의 전체적 맥락과 구조를 먼저 이해하고 분석의 기초로 삼습니다'
        },
        {
          title: '핵심과 예외 요소 분리',
          description: '복잡한 상황에서 핵심 요소를 식별하고 예외 상황을 별도 처리합니다'
        },
        {
          title: '변수/리스크 상수화',
          description: '불확실한 변수들을 예측 가능한 상수로 전환하여 제어 가능하게 만듭니다'
        },
        {
          title: '시나리오 기반 예측',
          description: '다양한 시나리오를 설정하고 각 상황에 따른 결과를 사전 예측합니다'
        },
        {
          title: '최적 솔루션 설계',
          description: '예측된 시나리오를 바탕으로 가장 효과적인 해결책을 설계합니다'
        },
        {
          title: '빠른 실행 → 이후 고도화',
          description: '신속한 초기 구현으로 결과를 확인하고 점진적으로 개선해 나갑니다'
        }
      ]
    },
    contact: {
      title: 'Contact',
      subtitle: '협업, 리드 포지션, 서비스 품질 전략/자동화 관련 논의가 필요하다면 언제든지 연락 주시면 좋겠습니다.',
      downloadCV: 'Resume / CV 다운로드',
      links: {
        email: 'mirea01977@gmail.com',
        linkedin: 'LinkedIn 프로필',
        github: 'GitHub 저장소',
        notion: 'Notion 포트폴리오'
      }
    }
  },
  en: {
    navigation: {
      about: 'About',
      timeline: 'Timeline',
      career: 'Career',
      systems: 'Portfolio',
      principles: 'Thinking',
      contact: 'Contact'
    },
    hero: {
      title: 'Service Quality Strategist',
      subtitle: 'System Architect',
      description: 'QA professional who designs service quality as a \'strategic asset\'\nthrough structural thinking and data-driven decision making.',
      strengths: [
        'Structural problem solving / Top 2% EF',
        'End-to-End perspective on entire service experience',
        'Predictive & prescriptive QA strategy design'
      ],
      cta: 'Learn More About Me'
    },
    about: {
      title: 'About',
      intro: 'Senior QA professional who transforms service quality into strategic assets through structural thinking and data-driven decision making.',
      description: 'I am a QA professional who analyzes, predicts, and improves service quality based on\nStructural Cognition and data-driven decision making.\n\nI approach problems not from a functional perspective but from a service perspective,\nviewing \'systems, flows, and entire experience (E2E)\' as a whole,\nand possess the ability to rapidly simplify complex structures and redefine them into controllable forms.\n\nMy strengths lie in flexible and clear response capabilities to changing situations\nand a thinking system that proactively detects issues and structurally designs solutions.\n\nMy goal is to redefine the entire service experience into a data-driven structure,\nsimultaneously improving quality, stability, user satisfaction, and business outcomes.',
      keyFacts: [
        { label: 'Role', value: 'Senior QA Strategist' },
        { label: 'Strengths', value: 'Structural Problem Solving · Strategic Planning · Error Detection' },
        { label: 'Cognition', value: 'Data-Driven Judgment · Logic-First Thinking · Emotion-Free' },
        { label: 'Working Style', value: 'Purpose-Oriented Execution · Structure-Centered · Instant Adjustment' }
      ]
    },
    timeline: {
      title: 'Timeline',
      subtitle: 'How Woozi\'s cognitive structure was formed and what experiences led to becoming a \'strategic QA\'',
      data: [
        {
          period: 'Elementary School',
          title: 'Infinite Curiosity & Leading-edge Thinking',
          description: 'Led gaming trends, experienced diverse fields like Go, piano, martial arts',
          detailedDescription: 'From early childhood, I was ahead of my peers in gaming trends. I played various genres of console and PC games extensively and led trends. However, I wasn\'t just into games - I was interested in everything. I went to computer academies to play games, but also learned Go, piano, martial arts, and basically everything I could learn. When I lost interest, I\'d quit and learn something new. I was curious and wanted to experience many things. I also did outdoor activities - got crazy about inline skating, water gun fights, arcades, soccer, dodgeball, volleyball, top battles, mini cars, BB gun fights, etc. I liked and experienced everything fun I could do with friends without discrimination.',
          insight: 'Foundation of expanded thinking and rapid pattern recognition ability'
        },
        {
          period: 'Middle & High School',
          title: 'System Hacking & Optimization Thinking',
          description: 'Discovered and exploited online game bugs, introduced overseas hack programs',
          detailedDescription: 'Starting middle school, as PC rooms became mainstream, I got seriously into online PC games. I joined StarCraft clans and played seriously, even created the first gaming club in school. I was obsessed with experiencing and devouring all online PC games. I liked exploiting bugs to gain advantages over others and worked hard to find bugs, hacks, and cheat programs. Even in StarCraft, before Brood War came out, when there were no domestic hacks, I obtained mineral hacks and map hacks from overseas hack users and used them on Battle.net. In high school, I started "rice eating" (RMT - Real Money Trading). When new games came out, I\'d level up characters intensively to sell them for money, and did Lineage grinding to earn living expenses, experiencing labor income through gaming.',
          insight: 'Developed system structure analysis and vulnerability detection capabilities'
        },
        {
          period: 'Early Adulthood',
          title: 'Diverse Business Model Experience',
          description: 'Experienced 20+ different jobs to understand various business processes',
          detailedDescription: 'During early adulthood, I systematically experienced diverse business models across multiple industries to understand operational principles. I worked in service industries (pubs, cafes), retail (Dongdaemun wholesale), manufacturing (LG Display factory), logistics (package centers), and IT sectors (testing, asset auditing). This comprehensive exposure to over 20 different job roles provided direct insights into revenue structures, operational processes, and organizational cultures across various business sectors. These experiences were instrumental in developing a third-person analytical perspective and the ability to quickly understand and adapt to different business environments.',
          insight: 'Systematized business process analysis and third-person perspective'
        },
        {
          period: 'Mid Adulthood',
          title: 'Data-driven Analysis System Construction',
          description: 'Data analysis experience through sports betting analysis',
          detailedDescription: 'During mid-adulthood, I went through a period of wandering and became absorbed in sports betting. During this time, I gained experience collecting and analyzing data from various sports leagues including international soccer, ice hockey, and MLB. I attempted to predict outcomes by considering multiple variables such as player lineups, injury histories, and conditions, which provided practical experience in data analysis. Although it was a difficult period, this experience later helped me conceptualize predictive quality management by integrating various data sources in QA work.',
          insight: 'Established multi-variable analysis and predictive modeling capabilities'
        },
        {
          period: 'Early IT Career',
          title: 'Beginning of QA Systems Thinking',
          description: 'Expanded from functional testing to system-wide quality perspective',
          detailedDescription: 'During early IT career as a tester, I developed a comprehensive understanding of quality assurance that extended beyond traditional functional testing. My childhood experience in discovering system vulnerabilities evolved into professional QA capabilities, enabling me to view services from an end-to-end perspective. This period marked the transition from viewing QA as simple feature validation to recognizing it as strategic service quality management. I began conceptualizing QA as a role that ensures overall user experience and business value, rather than just identifying functional defects.',
          insight: 'Foundation of QA thinking that views entire systems'
        },
        {
          period: 'QA Professional 10+ Years',
          title: 'Vision Beyond Traditional QA Limitations',
          description: 'Pursuing expanded game service quality management and AI-based innovation',
          detailedDescription: 'After over 10 years in QA, my conceptual thinking has expanded beyond current industry standards. While traditional QA processes focus primarily on functional validation and post-incident response, I have been personally designing and conceptualizing an expanded QA system that integrates user experience, business outcomes, and operational efficiency. The advancement of AI technology has created opportunities for data integration and real-time analysis, making predictive risk management and proactive prevention systems feasible. I believe there is now an opportunity to establish an expanded QA framework that transforms game service quality management from reactive problem-solving to strategic competitive advantage creation.',
          insight: 'Established vision for AI-era data-driven predictive QA innovation'
        },
        {
          period: 'Future',
          title: 'Data-driven Game Service Quality Innovation',
          description: 'Building predictive quality management systems using AI and big data',
          detailedDescription: 'The future of QA lies in AI-powered predictive quality management systems that integrate big data analytics. My vision involves real-time integration and analysis of user behavior patterns, server performance metrics, game balance data, and customer support information to proactively detect and prevent potential risks. This predictive QA system will enable preemptive responses to issues before they impact users, fundamentally transforming QA from reactive problem detection to proactive service competitiveness creation. This represents a paradigm shift that will redefine quality management in the gaming service industry, establishing QA as a strategic asset that drives business growth rather than merely preventing problems.',
          insight: 'Vision to lead paradigm shift in game service quality management'
        }
      ]
    },
    career: {
      title: 'Career & Portfolio',
      subtitle: 'QA professional with 12 years of experience across 20+ game service lifecycles - career and key achievements',
      data: [
        {
          period: '2013 - 2025',
          title: 'Game Service Career',
          company: 'Multiple Game QA Management',
          scope: 'Complete service lifecycle QA for 20+ games from pre-launch to service termination (up to 4 projects simultaneously in parallel)',
          impact: 'Global service, market management, cross-platform QA, regional LQA across diverse service experiences (managing 4-5 projects simultaneously)',
          style: 'Full service lifecycle management, multi-stakeholder collaboration, parallel project management, predictive risk management',
          gamesByYear: {
            '2013': ['Heroes\' Dignity', 'Moa Moa Dragon'],
            '2014': ['Qurare', 'Crazy Mon'],
            '2015': ['Dragon Fate', 'Bunny Pop', 'Ghost Hunter', 'Tap Tap Disco'],
            '2016': ['Ton Ton Pirates', 'King\'s Road', 'Giant War Chronicles', 'Everyone\'s Friday Night'],
            '2017': ['I Love Club', 'The Musician', 'Puzzle Knights', 'War Rain'],
            '2018': ['Epic Seven', 'Snow Cube'],
            '2024': ['Gran Saga Raising: Knights x Knights (Publishing contract terminated before launch)'],
            '2025': ['Chaos Zero Nightmare']
          }
        },
        {
          period: '2018 - 2024',
          title: 'QA Education & Curriculum Design',
          company: 'Junior to Lead Level Training Delivery',
          scope: 'Designed and delivered 12-module curriculum for step-by-step QA professional development from junior to lead level',
          impact: 'Trained 70+ junior QA professionals, developed 5 lead-level QA, established systematic QA methodologies',
          style: 'Practical-focused education, step-by-step competency development, cognitive transition gateway design',
          educationPrograms: {
            'LEVEL 0. QA Foundation (Junior Common) - 2 Courses': [
              '1. Introduction to Quality Assurance - QA roles & responsibilities, quality definition, QA mindset ("Why does QA exist?" foundation)',
              '2. Fundamentals of Software Testing - Testing definition & purpose, error/defect concepts, SDLC & testing relationship (conceptual map of testing activities)'
            ],
            'LEVEL 1. Core Testing Skills (Junior) - 3 Courses': [
              '3. Software Testing Lifecycle & Standards - Test lifecycle, standard-based test flow, test completion criteria',
              '4. Test Design & Techniques - Testing techniques, test design methods, risk-based testing ("Where and why to test" decision capability)',
              '5. Practical Test Execution - Planning review practice, TC & Checklist creation, BTS(Jira) hands-on (theory → deliverables connection)'
            ],
            'LEVEL 2. QA in Real Service Environment (Intermediate) - 3 Courses': [
              '6. QA Workflow & Service Operations - Overall QA process, QA data management, market issues & service failure response, balance QA / web service QA (recognizing QA as part of service operations)',
              '7. Mobile Platform Essentials for QA - Android platform understanding, iOS platform understanding, platform constraints & test strategies',
              '8. QA Team Systems & R&R - QA team operational structure, new/update/maintenance processes, Role & Responsibility (individual QA → organizational QA transition)'
            ],
            'LEVEL 3. Advanced Testing Practice (Intermediate → Senior) - 1 Course': [
              '9. Advanced Testing Strategies - Black-box Testing Practice, Exploratory Testing Practice, List-based Testing Practice ("selecting appropriate test strategies for situations")'
            ],
            'LEVEL 4. QA Leadership & Expertise (Lead Candidate) - 3 Courses': [
              '10. Quality Risk Management & Decision Making - Quality risk identification, test result interpretation, decision support role',
              '11. Advanced Testing Theory - Gray Box Testing theory & cases, publishing environment test strategies',
              '12. Operational Excellence for QA Leaders - Efficient resource management, configuration management strategies, communication skills & situation response (QA lead/senior positions from here)'
            ]
          }
        },
        {
          period: '2020 - 2025',
          title: 'QA Metrics Systematization',
          company: 'QA Data Quantitative Metrics → Dashboard Construction',
          scope: 'Built 3 integrated systems for multi-project QA data management (QA Integrated Dashboard, Service QA Report, Build Stability Metrics)',
          impact: 'Established data-driven decision-making culture, enabled update-based/monthly quality trend tracking, ROI and productivity analysis capabilities',
          style: 'Real-time dashboard construction, automated update-based/monthly reporting, build stability monitoring',
          metricsCategories: {
            'QA Integrated Dashboard': [
              'Issue Detection Rate - Overall issue status and classification by severity',
              'Update-based Issue Status - Hotfix frequency tracking',
              'Build Supply Status - Test volume and resource status',
              'Community User Report Issues (aggregated by update cycle/monthly)'
            ],
            'Service QA Report': [
              'Update-based Reports - Target Service QA Status, detailed content, Service Status, Test Volume, Overall Issue Status, deployment version details, QA evaluation, comprehensive service quality assessment',
              'Monthly Reports - Service Stability & Business Impact, Team Productivity & Efficiency, Quality Metrics Analysis, Industry Trend Analysis',
              'User Satisfaction Analysis, Risk & Opportunity Analysis, Cost Efficiency Analysis, Monthly Summary',
              'Year-over-year/month-over-month service quality trend tracking and ROI analysis'
            ],
            'Build Stability Metrics': [
              'Build Stability Rate Check - Development completion and implementation rate measurement',
              'Build Delivery Delay Frequency and Root Cause Analysis',
              'Test Build Supply Stability Metrics and Quality Predictive Modeling'
            ]
          }
        }
      ]
    },

    principles: {
      title: 'Thinking',
      subtitle: 'What kind of thinking approach does this person take when working?',
      intro: '\'Quality management\' is not about finding defects\nbut about \'securing service competitiveness\'.',
      cognitiveMap: {
        title: 'My Cognitive Map',
        steps: [
          { label: 'Input', description: 'Problem situation recognition' },
          { label: 'Filtering', description: 'Core element extraction' },
          { label: 'Structuring', description: 'Systematic analysis' },
          { label: 'Scenario', description: 'Predictive modeling' },
          { label: 'Decision', description: 'Data-based judgment' },
          { label: 'Execution', description: 'Systematic implementation' }
        ]
      },
      principles: [
        {
          title: 'Overall Structure Understanding',
          description: 'First understand the overall context and structure of the problem as the foundation for analysis'
        },
        {
          title: 'Core vs Exception Element Separation',
          description: 'Identify core elements in complex situations and handle exceptional cases separately'
        },
        {
          title: 'Variable/Risk Constantization',
          description: 'Convert uncertain variables into predictable constants to make them controllable'
        },
        {
          title: 'Scenario-Based Prediction',
          description: 'Set up various scenarios and predict outcomes for each situation in advance'
        },
        {
          title: 'Optimal Solution Design',
          description: 'Design the most effective solutions based on predicted scenarios'
        },
        {
          title: 'Rapid Execution → Enhancement',
          description: 'Confirm results through swift initial implementation and gradually improve'
        }
      ]
    },
    contact: {
      title: 'Contact',
      subtitle: 'Please feel free to contact me anytime if you need discussions about collaboration, lead positions, or service quality strategy/automation.',
      downloadCV: 'Download Resume / CV',
      links: {
        email: 'mirea01977@gmail.com',
        linkedin: 'LinkedIn Profile',
        github: 'GitHub Repository',
        notion: 'Notion Portfolio'
      }
    }
  }
};

const Index = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const [language, setLanguage] = useState('ko'); // Default to Korean
  const [expandedJob, setExpandedJob] = useState(null); // For career click details
  const [showImagePopup, setShowImagePopup] = useState(false); // For profile image popup

  // Load language preference from localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && (savedLanguage === 'ko' || savedLanguage === 'en')) {
      setLanguage(savedLanguage);
    }
  }, []);

  // Save language preference to localStorage
  const toggleLanguage = () => {
    const newLanguage = language === 'ko' ? 'en' : 'ko';
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
  };
  
  // Click handlers for career details
  const handleJobClick = (index) => {
    setExpandedJob(expandedJob === index ? null : index);
  };
  
  // Image popup handlers
  const handleImageClick = () => {
    setShowImagePopup(true);
    // Auto close after 3 seconds
    setTimeout(() => {
      setShowImagePopup(false);
    }, 3000);
  };
  
  const handlePopupClick = () => {
    setShowImagePopup(false);
  };
  
  // HTML download function - Generate complete HTML with current content
  const downloadHTML = () => {
    const currentDate = new Date().toISOString().split('T')[0];
    
    const htmlContent = `<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>김우주(Woozi) - QA 전략가 포트폴리오</title>
    <meta name="description" content="12년간 20여 개 게임 서비스 전체 수명주기를 경험한 QA 전문가의 포트폴리오">
    <meta name="author" content="김우주(Woozi)">
    <meta name="keywords" content="QA 전략가, 품질 보증, 게임 QA, 서비스 품질, QA 교육, 메트릭스">
    
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        :root {
            --primary: #1a1a2e;
            --secondary: #16213e;
            --accent: #00d4ff;
            --background: #0a0a0a;
            --foreground: #ffffff;
            --muted: #16213e;
            --muted-foreground: #888888;
            --card: #0a0a0a;
            --card-foreground: #ffffff;
            --border: #16213e;
            --radius: 0.5rem;
        }
        
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%);
            color: var(--foreground);
            line-height: 1.6;
            min-height: 100vh;
            overflow-x: hidden;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 1.5rem;
        }
        
        .glass-card {
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: var(--radius);
            backdrop-filter: blur(10px);
            transition: all 0.3s ease;
        }
        
        .glass-card:hover {
            background: rgba(255, 255, 255, 0.08);
            border-color: var(--accent);
            transform: translateY(-2px);
        }
        
        .neon-glow {
            text-shadow: 0 0 10px var(--accent), 0 0 20px var(--accent), 0 0 30px var(--accent);
        }
        
        .header {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            z-index: 50;
            background: rgba(10, 10, 10, 0.8);
            backdrop-filter: blur(10px);
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            padding: 1rem 0;
        }
        
        .nav-container {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .logo {
            font-size: 1.5rem;
            font-weight: bold;
            color: var(--accent);
            text-decoration: none;
        }
        
        .nav-links {
            display: flex;
            gap: 2rem;
            list-style: none;
        }
        
        .nav-links a {
            color: var(--muted-foreground);
            text-decoration: none;
            transition: color 0.3s ease;
        }
        
        .nav-links a:hover, .nav-links a.active {
            color: var(--accent);
        }
        
        .main-content {
            margin-top: 80px;
        }
        
        .hero-section {
            padding: 5rem 0;
            min-height: 100vh;
            display: flex;
            align-items: center;
        }
        
        .hero-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 3rem;
            align-items: center;
        }
        
        .hero-title {
            font-size: 4rem;
            font-weight: bold;
            margin-bottom: 1rem;
            background: linear-gradient(135deg, var(--accent), var(--primary));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        
        .hero-subtitle {
            font-size: 1.5rem;
            color: var(--muted-foreground);
            margin-bottom: 2rem;
        }
        
        .hero-description {
            font-size: 1.125rem;
            line-height: 1.8;
            margin-bottom: 2rem;
            white-space: pre-line;
        }
        
        .profile-card {
            padding: 2rem;
            text-align: center;
        }
        
        .profile-image {
            width: 256px;
            height: 256px;
            border-radius: 50%;
            margin: 0 auto 1rem;
            border: 2px solid rgba(0, 212, 255, 0.5);
            box-shadow: 0 0 30px rgba(0, 212, 255, 0.2);
            object-fit: cover;
        }
        
        .profile-title {
            font-size: 1.25rem;
            font-weight: 600;
            color: var(--accent);
            margin-bottom: 1rem;
        }
        
        .key-facts {
            display: grid;
            gap: 1rem;
        }
        
        .fact-card {
            padding: 1.5rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .section {
            padding: 5rem 0;
        }
        
        .section-title {
            font-size: 3rem;
            font-weight: bold;
            text-align: center;
            margin-bottom: 1rem;
            color: var(--foreground);
        }
        
        .section-subtitle {
            text-align: center;
            color: var(--muted-foreground);
            margin-bottom: 3rem;
            max-width: 64rem;
            margin-left: auto;
            margin-right: auto;
        }
        
        .contact-section {
            background: rgba(22, 33, 62, 0.2);
        }
        
        .download-button {
            background: rgba(0, 212, 255, 0.8);
            color: white;
            border: none;
            padding: 1rem 2rem;
            border-radius: var(--radius);
            font-size: 1rem;
            cursor: pointer;
            transition: all 0.3s ease;
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            margin-bottom: 2rem;
        }
        
        .download-button:hover {
            background: rgba(0, 212, 255, 0.9);
            transform: translateY(-2px);
        }
        
        .contact-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 1rem;
            max-width: 64rem;
            margin: 0 auto;
        }
        
        .contact-card {
            padding: 1rem;
            text-align: center;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .contact-card:hover {
            transform: translateY(-2px);
        }
        
        .footer {
            padding: 2rem 0;
            border-top: 1px solid var(--border);
            text-align: center;
            color: var(--muted-foreground);
        }
        
        @media (max-width: 768px) {
            .hero-title { font-size: 2.5rem; }
            .section-title { font-size: 2rem; }
            .profile-image { width: 200px; height: 200px; }
            .hero-grid { grid-template-columns: 1fr; }
            .nav-links { display: none; }
        }
        
        .strength-item {
            display: flex;
            align-items: flex-start;
            gap: 0.75rem;
            margin-bottom: 1rem;
        }
        
        .strength-dot {
            width: 8px;
            height: 8px;
            background: var(--accent);
            border-radius: 50%;
            margin-top: 0.75rem;
            flex-shrink: 0;
        }
    </style>
</head>
<body>
    <!-- Header -->
    <header class="header">
        <div class="container">
            <div class="nav-container">
                <a href="#hero" class="logo neon-glow">Woozi</a>
                <nav>
                    <ul class="nav-links">
                        <li><a href="#hero" class="active">Home</a></li>
                        <li><a href="#about">About</a></li>
                        <li><a href="#timeline">Timeline</a></li>
                        <li><a href="#career">Career</a></li>
                        <li><a href="#contact">Contact</a></li>
                    </ul>
                </nav>
            </div>
        </div>
    </header>

    <!-- Main Content -->
    <main class="main-content">
        <!-- Hero Section -->
        <section id="hero" class="hero-section">
            <div class="container">
                <div class="hero-grid">
                    <div>
                        <h1 class="hero-title">
                            Service Quality Strategist &
                            <span class="neon-glow" style="color: var(--accent); display: block;">
                                System Architect
                            </span>
                        </h1>
                        <p class="hero-description">
                            구조 기반 사고와 데이터 중심 의사결정으로
서비스 품질을 '전략 자산'으로 설계하는 QA 전문가입니다.
                        </p>
                        
                        <div style="margin-bottom: 2rem;">
                            <div class="strength-item">
                                <div class="strength-dot"></div>
                                <span style="font-size: 1.125rem;">구조 기반 문제 해결 / 상위 2% EF</span>
                            </div>
                            <div class="strength-item">
                                <div class="strength-dot"></div>
                                <span style="font-size: 1.125rem;">서비스 경험 전체를 바라보는 End-to-End 관점</span>
                            </div>
                            <div class="strength-item">
                                <div class="strength-dot"></div>
                                <span style="font-size: 1.125rem;">예측·처방 중심의 QA 전략 설계</span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div class="profile-card glass-card" style="border-radius: 1rem;">
                            <div>
                                <img 
                                    src="https://skyagent-artifacts.skywork.ai/page/jz4kg3u7k7/images/WJKPS.png" 
                                    alt="김우주(Woozi) Profile" 
                                    class="profile-image"
                                />
                            </div>
                            <h3 class="profile-title neon-glow">김우주(Woozi) Profile</h3>
                            <div class="key-facts">
                                <div class="fact-card glass-card">
                                    <span style="color: var(--muted-foreground);">EF Level</span>
                                    <span style="font-weight: 600;">상위 2%</span>
                                </div>
                                <div class="fact-card glass-card">
                                    <span style="color: var(--muted-foreground);">Specialty</span>
                                    <span style="font-weight: 600;">구조적 사고</span>
                                </div>
                                <div class="fact-card glass-card">
                                    <span style="color: var(--muted-foreground);">Approach</span>
                                    <span style="font-weight: 600;">데이터 기반</span>
                                </div>
                                <div class="fact-card glass-card">
                                    <span style="color: var(--muted-foreground);">Focus</span>
                                    <span style="font-weight: 600;">예측적 QA</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- About Section -->
        <section id="about" class="section">
            <div class="container">
                <h2 class="section-title">About</h2>
                <p class="section-subtitle">
                    시니어 QA 전문가로, 구조 기반 사고와 데이터 중심 의사결정을 통해 서비스 품질을 전략적 자산으로 전환하는 전문가입니다.
                </p>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; align-items: start;">
                    <div>
                        <div class="hero-description">
                            저는 <strong>구조 기반 사고(Structural Cognition)</strong>와 <strong>데이터 중심 의사결정</strong>을 바탕으로
서비스 품질을 분석·예측·개선하는 QA 입니다.

문제를 기능 단위가 아닌 서비스 관점에서
<strong>'시스템·흐름·경험 전체(E2E)'</strong>로 바라보고,
복잡한 구조를 빠르게 단순화하여 제어 가능한 형태로 재정의하는 능력을 보유하고 있습니다.

저의 강점은 변화되는 상황에 따른 유연하고 명확한 대응 능력과
사전에 이슈를 감지하고 구조적으로 해법을 설계하는 사고 체계입니다.

저의 목표는 서비스 전체 경험을 데이터 기반의 구조로 재정의하여
<strong>품질·안정성·유저 만족·비즈니스 성과를 동시에 개선</strong>하는 것입니다.
                        </div>
                    </div>
                    
                    <div style="display: grid; gap: 1rem;">
                        <div class="glass-card" style="padding: 1.5rem;">
                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                <div>
                                    <div style="font-size: 0.875rem; color: var(--muted-foreground); margin-bottom: 0.25rem;">Role</div>
                                    <div style="font-weight: 600;">Senior QA Strategist</div>
                                </div>
                            </div>
                        </div>
                        <div class="glass-card" style="padding: 1.5rem;">
                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                <div>
                                    <div style="font-size: 0.875rem; color: var(--muted-foreground); margin-bottom: 0.25rem;">Strengths</div>
                                    <div style="font-weight: 600;">구조 기반 문제 해결 · 전략 조직화 · 오류 감지</div>
                                </div>
                            </div>
                        </div>
                        <div class="glass-card" style="padding: 1.5rem;">
                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                <div>
                                    <div style="font-size: 0.875rem; color: var(--muted-foreground); margin-bottom: 0.25rem;">Cognition</div>
                                    <div style="font-weight: 600;">데이터 기반 판단 · 논리 우선 사고 · 감정 비개입</div>
                                </div>
                            </div>
                        </div>
                        <div class="glass-card" style="padding: 1.5rem;">
                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                <div>
                                    <div style="font-size: 0.875rem; color: var(--muted-foreground); margin-bottom: 0.25rem;">Working Style</div>
                                    <div style="font-weight: 600;">목적 기반 실행력 · 구조 중심 사고 · 즉시 판단 수정</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Contact Section -->
        <section id="contact" class="contact-section section">
            <div class="container">
                <h2 class="section-title">Contact</h2>
                
                <p style="font-size: 1.125rem; color: var(--muted-foreground); margin-bottom: 2rem; max-width: 64rem; margin-left: auto; margin-right: auto; text-align: center;">
                    협업, 리드 포지션, 서비스 품질 전략/자동화 관련 논의가 필요하다면 언제든지 편하게 연락 주시면 좋겠습니다.
                </p>
                
                <div style="text-align: center; margin-bottom: 2rem;">
                    <p style="font-size: 1rem; color: var(--accent); margin-bottom: 1rem;">📧 이메일: mirea01977@gmail.com</p>
                    <p style="font-size: 1rem; color: var(--accent); margin-bottom: 1rem;">💼 LinkedIn: https://www.linkedin.com/in/우주-김-b7a711115/</p>
                    <p style="font-size: 1rem; color: var(--accent); margin-bottom: 1rem;">🔗 GitHub: https://github.com/SpaceWJK/</p>
                    <p style="font-size: 1rem; color: var(--accent); margin-bottom: 1rem;">📝 Notion: https://notion.so/woozi-qa-portfolio</p>
                </div>
                
                <div class="contact-grid">
                    <div class="contact-card glass-card">
                        <div style="font-weight: 500; font-size: 0.875rem; margin-bottom: 0.25rem;">Email</div>
                        <div style="font-size: 0.75rem; color: var(--muted-foreground);">mirea01977@gmail.com</div>
                    </div>
                    <div class="contact-card glass-card">
                        <div style="font-weight: 500; font-size: 0.875rem; margin-bottom: 0.25rem;">LinkedIn</div>
                        <div style="font-size: 0.75rem; color: var(--muted-foreground);">LinkedIn 프로필</div>
                    </div>
                    <div class="contact-card glass-card">
                        <div style="font-weight: 500; font-size: 0.875rem; margin-bottom: 0.25rem;">GitHub</div>
                        <div style="font-size: 0.75rem; color: var(--muted-foreground);">GitHub 저장소</div>
                    </div>
                    <div class="contact-card glass-card">
                        <div style="font-weight: 500; font-size: 0.875rem; margin-bottom: 0.25rem;">Notion</div>
                        <div style="font-size: 0.75rem; color: var(--muted-foreground);">Notion 포트폴리오</div>
                    </div>
                </div>
            </div>
        </section>
    </main>

    <!-- Footer -->
    <footer class="footer">
        <div class="container">
            <p>&copy; 2026 김우주(Woozi). Designed for quality excellence.</p>
        </div>
    </footer>

    <script>
        // Smooth scrolling for navigation
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Active navigation highlighting
        window.addEventListener('scroll', function() {
            const sections = ['hero', 'about', 'contact'];
            const scrollPosition = window.scrollY + 100;

            sections.forEach(sectionId => {
                const section = document.getElementById(sectionId);
                const navLink = document.querySelector(\`a[href="#\${sectionId}"]\`);
                
                if (section && navLink) {
                    const { offsetTop, offsetHeight } = section;
                    if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                        document.querySelectorAll('.nav-links a').forEach(link => link.classList.remove('active'));
                        navLink.classList.add('active');
                    }
                }
            });
        });
    </script>
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `김우주_QA전략가_포트폴리오_최신버전_${currentDate}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };
  


  const t = content[language as keyof typeof content];

  // Smooth scroll to section
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'timeline', 'career', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animation on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const navigationItems = [
    { id: 'about', label: t.navigation.about },
    { id: 'timeline', label: t.navigation.timeline },
    { id: 'career', label: t.navigation.career },


    { id: 'contact', label: t.navigation.contact }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Sticky Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-white/20">
        <div className="container-grid">
          <div className="col-span-full flex items-center justify-between py-4">
            {/* Logo */}
            <div className="text-2xl font-bold text-accent neon-glow">
              Woozi
            </div>

            {/* Desktop Navigation & Language Toggle */}
            <div className="flex items-center space-x-6">
              <nav className="hidden md:flex items-center space-x-8">
                {navigationItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`text-sm font-medium transition-colors hover:text-accent ${
                      activeSection === item.id ? 'text-accent' : 'text-muted-foreground'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </nav>

              {/* Language Toggle */}
              <Button
                variant="outline"
                size="sm"
                onClick={toggleLanguage}
                className="hidden md:flex items-center space-x-2"
              >
                <Languages size={16} />
                <span>{language === 'ko' ? '한국어' : 'English'}</span>
              </Button>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden p-2"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div className="md:hidden fixed inset-0 top-16 bg-background/95 backdrop-blur-md">
            <nav className="flex flex-col items-center justify-center h-full space-y-8">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-2xl font-medium text-muted-foreground hover:text-accent transition-colors"
                >
                  {item.label}
                </button>
              ))}
              
              {/* Mobile Language Toggle */}
              <Button
                variant="outline"
                onClick={toggleLanguage}
                className="flex items-center space-x-2 mt-4"
              >
                <Languages size={16} />
                <span>{language === 'ko' ? '한국어' : 'English'}</span>
              </Button>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center pt-20 relative overflow-hidden">
        <div className="container-grid">
          <div className="col-span-full lg:col-span-7 animate-on-scroll">
            <h1 className="mb-6">
              {t.hero.title} &
              <span className="text-accent neon-glow block">
                {t.hero.subtitle}
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed whitespace-pre-line">
              {t.hero.description}
            </p>
            
            <div className="space-y-4 mb-8">
              {t.hero.strengths.map((strength, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-accent rounded-full mt-3 flex-shrink-0"></div>
                  <span className="text-lg">{strength}</span>
                </div>
              ))}
            </div>

            <Button 
              onClick={() => scrollToSection('about')}
              className="bg-accent text-accent-foreground hover:bg-accent/90 group glow"
            >
              {t.hero.cta}
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
            </Button>
          </div>

          <div className="col-span-full lg:col-span-5 mt-12 lg:mt-0 animate-on-scroll">
            <div className="relative floating-animation">
              <div className="glass-card rounded-2xl p-8">
                <div className="text-center mb-6">
                  <div className="mb-4">
                    <img 
                      src={`${import.meta.env.BASE_URL}images/WJKPS.png`} 
                      alt="김우주(Woozi) Profile" 
                      className="w-64 h-64 rounded-full mx-auto object-cover border-2 border-accent/50 shadow-lg shadow-accent/20 cursor-pointer hover:scale-105 transition-transform duration-300"
                      onClick={handleImageClick}
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-accent neon-glow">김우주(Woozi) Profile</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">EF Level</span>
                    <span className="font-semibold">상위 2%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Specialty</span>
                    <span className="font-semibold">구조적 사고</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Approach</span>
                    <span className="font-semibold">데이터 기반</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Focus</span>
                    <span className="font-semibold">예측적 QA</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20">
        <div className="container-grid">
          <div className="col-span-full mb-12">
            <h2 className="text-center animate-on-scroll">{t.about.title}</h2>
            <p className="text-center text-muted-foreground mt-4 animate-on-scroll">
              {t.about.intro}
            </p>
          </div>
          
          <div className="col-span-full lg:col-span-7 animate-on-scroll">
            <div className="text-lg leading-relaxed mb-8 whitespace-pre-line">
              {t.about.description}
            </div>
          </div>

          <div className="col-span-full lg:col-span-5 animate-on-scroll">
            <div className="grid grid-cols-1 gap-4">
              {t.about.keyFacts.map((fact, index) => (
                <Card key={index} className="glass-card">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">{fact.label}</div>
                        <div className="font-semibold">{fact.value}</div>
                      </div>
                      <div className="text-accent">
                        {index === 0 && <Target size={20} />}
                        {index === 1 && <Settings size={20} />}
                        {index === 2 && <Brain size={20} />}
                        {index === 3 && <TrendingUp size={20} />}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Growth Timeline Section */}
      <section id="timeline" className="py-20 bg-muted/20">
        <div className="container-grid">
          <div className="col-span-full mb-12">
            <h2 className="text-center animate-on-scroll">{t.timeline.title}</h2>
            <p className="text-center text-muted-foreground mt-4 animate-on-scroll max-w-4xl mx-auto">
              {t.timeline.subtitle}
            </p>
          </div>
          
          <div className="col-span-full">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-4 lg:left-1/2 top-0 bottom-0 w-0.5 bg-accent transform lg:-translate-x-0.5"></div>
              
              <div className="space-y-12">
                {t.timeline.data.map((item, index) => (
                  <div 
                    key={index} 
                    className={`relative flex items-center animate-on-scroll ${
                      index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                    }`}
                  >
                    {/* Timeline Node */}
                    <div className="absolute left-4 lg:left-1/2 w-4 h-4 bg-accent rounded-full transform lg:-translate-x-2 z-10 glow"></div>
                    
                    {/* Content */}
                    <div className={`ml-12 lg:ml-0 lg:w-5/12 ${
                      index % 2 === 0 ? 'lg:pr-12' : 'lg:pl-12'
                    }`}>
                      <div className="relative group">
                        <Card className="glass-card cursor-pointer">
                          <CardHeader>
                            <Badge variant="outline" className="text-accent border-accent w-fit mb-2">
                              {item.period}
                            </Badge>
                            <CardTitle className="text-xl">{item.title}</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            <p className="text-muted-foreground">{item.description}</p>
                            <div className="flex items-center space-x-2 text-accent">
                              <Zap size={16} />
                              <span className="text-sm font-medium">{item.insight}</span>
                            </div>
                            <div className="text-xs text-muted-foreground/70 mt-2 flex items-center">
                              <span className="mr-1">👁️</span>
                              호버하면 상세 내용을 볼 수 있습니다
                            </div>
                          </CardContent>
                        </Card>
                        
                        {/* Detailed Description - Positioned on opposite side */}
                        {item.detailedDescription && (
                          <div className={`hidden lg:block absolute top-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto z-20 w-96 ${
                            index % 2 === 0 
                              ? 'left-full ml-8' // 왼쪽 카드일 때 오른쪽에 표시
                              : 'right-full mr-8' // 오른쪽 카드일 때 왼쪽에 표시
                          }`}>
                            <Card className="bg-background/95 backdrop-blur-md border-accent/30 shadow-2xl">
                              <CardContent className="p-4">
                                <h4 className="font-semibold text-accent mb-2">상세 내용</h4>
                                <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                                  {item.detailedDescription}
                                </p>
                              </CardContent>
                            </Card>
                          </div>
                        )}
                        
                        {/* Mobile Detailed Description - Below card */}
                        {item.detailedDescription && (
                          <div className="lg:hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto z-20 mt-4">
                            <Card className="bg-background/95 backdrop-blur-md border-accent/30 shadow-2xl">
                              <CardContent className="p-4">
                                <h4 className="font-semibold text-accent mb-2">상세 내용</h4>
                                <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                                  {item.detailedDescription}
                                </p>
                              </CardContent>
                            </Card>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Career Section */}
      <section id="career" className="py-20">
        <div className="container-grid">
          <div className="col-span-full mb-12">
            <h2 className="text-center animate-on-scroll">{t.career.title}</h2>
            <p className="text-center text-muted-foreground mt-4 animate-on-scroll max-w-4xl mx-auto">
              {t.career.subtitle}
            </p>
          </div>
          
          <div className="col-span-full space-y-8">
            {t.career.data.map((job, index) => (
              <div 
                key={index} 
                className="relative mb-8"
              >
                <Card 
                  className="glass-card animate-on-scroll cursor-pointer hover:border-accent/50 transition-all duration-300"
                  onClick={() => handleJobClick(index)}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <CardTitle className="text-2xl mb-1">{job.title}</CardTitle>
                        <CardDescription className="text-accent font-medium text-lg">
                          {job.company}
                        </CardDescription>
                      </div>
                      <div className="text-right flex flex-col items-end">
                        <Badge variant="secondary" className="mb-2">{job.period}</Badge>
                        <div className="text-sm text-muted-foreground mb-2">
                          {job.gamesByYear ? `${Object.values(job.gamesByYear).flat().length}개 게임` : 
                           job.educationPrograms ? `${Object.keys(job.educationPrograms).length}개 과정` :
                           job.metricsCategories ? `3개 체계` : ''}
                        </div>
                        {(job.gamesByYear || job.educationPrograms || job.metricsCategories) && (
                          <div className="flex items-center text-accent text-sm">
                            <span className="mr-1">상세보기</span>
                            <ChevronDown 
                              size={16} 
                              className={`transition-transform duration-300 ${
                                expandedJob === index ? 'rotate-180' : ''
                              }`}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2 flex items-center text-accent">
                        <Target className="mr-2" size={16} />
                        Scope
                      </h4>
                      <p className="text-sm text-muted-foreground">{job.scope}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2 flex items-center text-accent">
                        <TrendingUp className="mr-2" size={16} />
                        Impact
                      </h4>
                      <p className="text-sm text-muted-foreground">{job.impact}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2 flex items-center text-accent">
                        <Zap className="mr-2" size={16} />
                        Style
                      </h4>
                      <p className="text-sm text-muted-foreground">{job.style}</p>
                    </div>
                    {(job.gamesByYear || job.educationPrograms || job.metricsCategories) && (
                      <div className="text-xs text-muted-foreground/70 mt-4 flex items-center">
                        <span className="mr-1">
                          {job.gamesByYear ? '🎮' : job.educationPrograms ? '📚' : job.metricsCategories ? '📈' : '📄'}
                        </span>
                        클릭하면 
                        {job.gamesByYear ? '연도별 게임 리스트' : 
                         job.educationPrograms ? '교육 커리큘럼' :
                         job.metricsCategories ? '3개 메트릭스 체계' : '상세 내용'}를 볼 수 있습니다
                      </div>
                    )}
                  </CardContent>
                </Card>
                
                {/* Dynamic Detail Information */}
                {(job.gamesByYear || job.educationPrograms || job.metricsCategories) && (
                  <div 
                    className={`mt-4 w-full slide-expand overflow-hidden ${
                      expandedJob === index 
                        ? 'max-h-96 opacity-100' 
                        : 'max-h-0 opacity-0'
                    }`}
                  >
                    <Card className="glass-card border-accent/30 shadow-lg">
                      <CardContent className="p-4">
                        {job.gamesByYear && (
                          <>
                            <h4 className="font-semibold text-accent mb-4">연도별 게임 서비스 경력</h4>
                            <div className="space-y-4 max-h-80 overflow-y-auto">
                              {Object.entries(job.gamesByYear).map(([year, games]) => (
                                <div key={year} className="border-l-2 border-accent/30 pl-4">
                                  <div className="font-semibold text-accent mb-2">{year}년 ({Array.isArray(games) ? games.length : 0}개 게임)</div>
                                  <div className="space-y-1">
                                    {Array.isArray(games) && games.map((game, gameIndex) => (
                                      <div key={gameIndex} className="flex items-center space-x-2 p-1 rounded">
                                        <div className="w-1.5 h-1.5 bg-accent rounded-full flex-shrink-0"></div>
                                        <span className="text-xs text-muted-foreground">{game}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </>
                        )}
                        {job.educationPrograms && (
                          <>
                            <h4 className="font-semibold text-accent mb-4">교육 커리큘럼 체계</h4>
                            <div className="space-y-4 max-h-80 overflow-y-auto">
                              {Object.entries(job.educationPrograms).map(([course, subjects]) => (
                                <div key={course} className="border-l-2 border-accent/30 pl-4">
                                  <div className="font-semibold text-accent mb-2">{course} ({Array.isArray(subjects) ? subjects.length : 0}개 과목)</div>
                                  <div className="space-y-1">
                                    {Array.isArray(subjects) && subjects.map((subject, subjectIndex) => (
                                      <div key={subjectIndex} className="flex items-center space-x-2 p-1 rounded">
                                        <div className="w-1.5 h-1.5 bg-accent rounded-full flex-shrink-0"></div>
                                        <span className="text-xs text-muted-foreground">{subject}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </>
                        )}
                        {job.metricsCategories && (
                          <>
                            <h4 className="font-semibold text-accent mb-4">QA 메트릭스 3개 체계</h4>
                            <div className="space-y-4 max-h-80 overflow-y-auto">
                              {Object.entries(job.metricsCategories).map(([category, metrics]) => (
                                <div key={category} className="border-l-2 border-accent/30 pl-4">
                                  <div className="font-semibold text-accent mb-2">{category} ({Array.isArray(metrics) ? metrics.length : 0}개 지표)</div>
                                  <div className="space-y-1">
                                    {Array.isArray(metrics) && metrics.map((metric, metricIndex) => (
                                      <div key={metricIndex} className="flex items-center space-x-2 p-1 rounded">
                                        <div className="w-1.5 h-1.5 bg-accent rounded-full flex-shrink-0"></div>
                                        <span className="text-xs text-muted-foreground">{metric}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Downloads & Contact Section */}
      <section id="contact" className="py-20 bg-muted/20">
        <div className="container-grid">
          <div className="col-span-full mb-12">
            <h2 className="text-center animate-on-scroll">{t.contact.title}</h2>
          </div>
          
          <div className="col-span-full text-center animate-on-scroll">
            <p className="text-lg text-muted-foreground mb-8 max-w-4xl mx-auto">
              {t.contact.subtitle}
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <Button 
                className="bg-accent/80 text-white hover:bg-accent/90 glass-card border-accent/30 neon-glow"
                onClick={downloadHTML}
              >
                <Download className="mr-2" size={16} />
                {t.contact.downloadCV}
              </Button>
              
              <div className="flex items-center space-x-4">
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="glass-card hover:border-accent hover:text-accent border-white/20"
                  onClick={() => window.location.href = 'mailto:mirea01977@gmail.com'}
                >
                  <Mail size={16} />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="glass-card hover:border-accent hover:text-accent border-white/20"
                  onClick={() => window.open('https://www.linkedin.com/in/%EC%9A%B0%EC%A3%BC-%EA%B9%80-b7a711115/', '_blank')}
                >
                  <Linkedin size={16} />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="glass-card hover:border-accent hover:text-accent border-white/20"
                  onClick={() => window.open('https://github.com/SpaceWJK/', '_blank')}
                >
                  <Github size={16} />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="glass-card hover:border-accent hover:text-accent border-white/20"
                  onClick={() => window.open('https://notion.so/woozi-qa-portfolio', '_blank')}
                >
                  <ExternalLink size={16} />
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
              <Card className="glass-card cursor-pointer" onClick={() => window.location.href = 'mailto:mirea01977@gmail.com'}>
                <CardContent className="p-4 text-center">
                  <Mail className="mx-auto mb-2 text-accent" size={20} />
                  <div className="text-sm font-medium">Email</div>
                  <div className="text-xs text-muted-foreground">{t.contact.links.email}</div>
                </CardContent>
              </Card>
              <Card className="glass-card cursor-pointer" onClick={() => window.open('https://www.linkedin.com/in/%EC%9A%B0%EC%A3%BC-%EA%B9%80-b7a711115/', '_blank')}>
                <CardContent className="p-4 text-center">
                  <Linkedin className="mx-auto mb-2 text-accent" size={20} />
                  <div className="text-sm font-medium">LinkedIn</div>
                  <div className="text-xs text-muted-foreground">{t.contact.links.linkedin}</div>
                </CardContent>
              </Card>
              <Card className="glass-card cursor-pointer" onClick={() => window.open('https://github.com/SpaceWJK/', '_blank')}>
                <CardContent className="p-4 text-center">
                  <Github className="mx-auto mb-2 text-accent" size={20} />
                  <div className="text-sm font-medium">GitHub</div>
                  <div className="text-xs text-muted-foreground">{t.contact.links.github}</div>
                </CardContent>
              </Card>
              <Card className="glass-card cursor-pointer" onClick={() => window.open('https://notion.so/woozi-qa-portfolio', '_blank')}>
                <CardContent className="p-4 text-center">
                  <ExternalLink className="mx-auto mb-2 text-accent" size={20} />
                  <div className="text-sm font-medium">Notion</div>
                  <div className="text-xs text-muted-foreground">{t.contact.links.notion}</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="container-grid">
          <div className="col-span-full text-center text-muted-foreground">
            <p>&copy; 2026 Woozi. Designed for quality excellence.</p>
          </div>
        </div>
      </footer>
      {/* Image Popup Modal */}
      {showImagePopup && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={handlePopupClick}
        >
          <div className="relative">
            <img 
              src={`${import.meta.env.BASE_URL}images/WJKPS.png`} 
              alt="김우주(Woozi) Profile - 확대 이미지" 
              className="w-[520px] h-[520px] rounded-2xl object-cover border-4 border-accent/50 shadow-2xl shadow-accent/30"
              onClick={(e) => e.stopPropagation()}
            />
            <button 
              onClick={handlePopupClick}
              className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white rounded-full w-8 h-8 flex items-center justify-center transition-colors"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;