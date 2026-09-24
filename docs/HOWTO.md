# 4ILab 홈페이지 편집 가이드

> 이 사이트는 **GitHub 저장소의 파일을 고치면 자동으로 다시 배포**됩니다.
> 코드를 몰라도 됩니다. 대부분의 작업은 **텍스트 파일 한 개에 몇 줄 추가**하는 것이 전부입니다.
> 로컬에 아무것도 설치할 필요 없이 GitHub 웹사이트에서 바로 편집할 수 있습니다.

---

## 0. 한눈에 보기 — 무엇을 바꾸려면 어느 파일?

| 하고 싶은 일                  | 고칠 파일                                        |
| ----------------------------- | ------------------------------------------------ |
| 논문 추가 / 수정              | `_bibliography/papers.bib`                       |
| 멤버 추가 / 수정 / 졸업       | `_data/members.yml` + 사진 `assets/img/members/` |
| 뉴스 올리기                   | `_news/YYYY-MM-DD-제목.md` (새 파일)             |
| 홈 화면 "Latest highlight"    | `_data/highlight.yml`                            |
| 연구 분야 소개                | `_data/research.yml`                             |
| 연구 과제(Projects)           | `_data/grants.yml`                               |
| 초청 강연 / 특허              | `_data/talks.yml` / `_data/patents.yml`          |
| 강의 목록                     | `_data/courses.yml`                              |
| 연구 분야 배지(MI, IP, …) 색  | `_data/venues.yml`                               |
| 소셜 아이콘 (이메일, GitHub…) | `_data/socials.yml`                              |
| 페이지 본문 (Join, Contact…)  | `_pages/*.md`                                    |
| 사이트 제목·설명·색상 등 설정 | `_config.yml`, `_sass/_custom.scss`              |

---

## 1. GitHub 웹에서 편집하는 법 (설치 없음)

1. 저장소 <https://github.com/4ILab-SSU/4ILab-SSU.github.io> 에서 고칠 파일을 클릭
2. 오른쪽 위 연필 아이콘(✏️ **Edit**) 클릭
3. 내용을 고치고 **Commit changes…** 클릭
4. 대화상자에서
   - 한 줄 설명 입력 (예: `Add BMVC 2026 papers`)
   - **"Create a new branch for this commit and start a pull request"** 선택 → **Propose changes**
5. **Create pull request** 클릭
6. 잠시 후 PR 페이지 아래 **Checks** 에 ✅ 가 뜨면 이상 없음 (❌ 이면 "Details" 를 눌러 어떤 줄이 문제인지 확인)
7. 관리자(또는 본인이 권한이 있으면)가 **Merge pull request** → 1~2분 뒤 사이트에 반영

> 💡 여러 파일을 한꺼번에 편집하려면 저장소 페이지에서 키보드 `.` 을 누르면 브라우저 VS Code(github.dev)가 열립니다.
> 사진 업로드는 폴더(`assets/img/members`)로 들어가 **Add file → Upload files** 를 사용하세요.

관리자 권한이 있는 사람은 `main` 브랜치에 바로 커밋해도 됩니다(자동 배포). 단, 빌드가 깨질 수 있는 큰 변경은 PR을 권장합니다.

---

## 2. 논문 추가하기 (`_bibliography/papers.bib`)

파일 맨 위 연도 구역에 아래 형식으로 **한 블록 복사 → 붙여넣기 → 수정**.

**학회 논문**

```bibtex
@inproceedings{lee2026eyetag,
  abbr        = {IP},
  bibtex_show = {true},
  title       = {EyeTAG: Eye Trajectory-Aware Gaze Estimation},
  author      = {Lee, Jungmin and Ullah+, Niamat and Han+, Yoseob},
  booktitle   = {British Machine Vision Conference (BMVC)},
  address     = {Lancaster, UK},
  year        = {2026},
  month       = {November},
  annotation  = {+ Corresponding authors},
  selected    = {true}
}
```

**저널 논문**

```bibtex
@article{han2025lowdose,
  abbr        = {MI},
  bibtex_show = {true},
  title       = {Low-dose CT Reconstruction using Cross-domain Deep Learning with Domain Transfer Module},
  author      = {Han, Yoseob},
  journal     = {Physics in Medicine \& Biology},
  year        = {2025},
  month       = {February},
  doi         = {10.1088/1361-6560/adb932},
  pdf         = {https://iopscience.iop.org/article/10.1088/1361-6560/adb932/pdf}
}
```

규칙:

- **키**(`lee2026eyetag`)는 사이트 전체에서 유일해야 합니다. `<1저자성><연도><키워드>` 권장.
- **저자**는 `성, 이름 and 성, 이름` 형식. 공동 1저자는 성 뒤에 `*`, 교신저자는 `+` 를 붙이고 `annotation` 에 설명.
- `abbr` 는 연구 분야 배지: `MI` 의료영상, `IP` 영상처리/비전, `ML` 멀티모달, `AP` 오디오/음성, `LP` 언어, `DD` 딥페이크 탐지. (새 분야는 `_data/venues.yml` 에 먼저 추가)
- 선택 필드: `pdf`, `html`(출판사 페이지), `code`, `arxiv`(번호만), `doi`, `award = {Oral}`, `preview = {파일.png}`(썸네일, `assets/img/publication_preview/`), `selected = {true}`(교수 소개 페이지의 대표 논문 목록).
- 중괄호 `{ }` 짝이 맞는지 꼭 확인 — 가장 흔한 실수입니다. (PR 검사에서 잡아줍니다)
- `&` 는 `\&` 로 씁니다.

---

## 3. 멤버 추가 / 수정 / 졸업 (`_data/members.yml`)

```yaml
      - name: Gildong Hong
        name_ko: 홍길동          # 선택
        role: M.S. Student
        photo: gildong-hong.jpg  # assets/img/members/ 에 올린 파일명 (없으면 이니셜 아바타)
        email: gildong@soongsil.ac.kr
        department: Electronic Engineering (IT)
        since: "2026.03"         # 따옴표 필수
        interests: [Medical image reconstruction, Diffusion models]
        links:
          github: https://github.com/gildong
          scholar: https://scholar.google.com/citations?user=XXXX
```

- 해당 그룹(`Postdoctoral Researchers`, `Graduate Students`, `Undergraduate Researchers & Interns`)의 `members:` 아래에 붙여넣기. **들여쓰기(공백 개수)를 위 항목과 똑같이** 맞추세요. 탭 문자는 사용 금지.
- 팀 리더는 `leader: true` 를 추가하면 ⭐ 이 붙습니다.
- **사진**: 정사각형(최소 400×400) jpg/png, 파일명은 소문자-하이픈 (`gildong-hong.jpg`). `assets/img/members/` 에 업로드.
- **졸업**: 위 그룹에서 블록을 지우고 파일 맨 아래 `alumni:` 에 옮깁니다.

```yaml
alumni:
  - name: Gildong Hong
    role: M.S. Student
    since: "2024.03"
    until: "2026.02"
    now: Researcher at Samsung Research
```

---

## 4. 뉴스 올리기 (`_news/`)

`_news/` 폴더에 **새 파일** `YYYY-MM-DD-짧은제목.md` 을 만들고:

```markdown
---
layout: post
date: 2026-09-01 09:00:00+0900
inline: true
related_posts: false
---

Welcome to 4ILab! **Sunyoung Park** and **Yeojoon Yoon** joined us as undergraduate interns.
```

- 본문은 한 문단, Markdown 가능(`**굵게**`, `*기울임*`, `[링크](https://...)`).
- 홈 화면에는 최신 3개가, `/news/` 에는 전체가 날짜순으로 표시됩니다.
- 긴 소식(사진 포함 등)은 `inline: false` 로 바꾸고 `title:` 을 추가하면 별도 페이지가 생깁니다.

---

## 5. 홈 화면 구성

`_data/home.yml`에서 첫 화면 문구와 대표 사진, 연구 질문 카드, 연구실 생활 사진, 참여 안내를 변경합니다.

- `hero`: 연구실 이름(`name`), 정식 영문명(`full_name`), 국문명(`name_ko`), 소속(`affiliation`), 위치(`location`), 보조 슬로건(`headline`, `headline_accent`), 설명, 사진, 캡션
- `research.areas`: 방문자에게 소개할 연구 질문 3개 (`id`는 연구 페이지 앵커)
- `people`: 구성원 소개 문구와 사진
- `moments`: 활동 사진 3장과 앨범 링크
- `join`: 연구 참여 안내

사진 경로는 `/assets/img/photos/파일명.jpg` 형태로 입력합니다. 연구실 구성원 수와 최신 뉴스는 기존 데이터에서 자동으로 반영됩니다.

홈 화면의 최근 연구는 `_data/highlight.yml`에서 변경합니다. `short_title`은 짧은 제목, `venue`는 학회명, `summary`는 연구를 쉽게 풀어 쓴 한 문장입니다. `url`은 `/publications/#논문키`로 지정하면 해당 논문으로 바로 연결됩니다.

```yaml
title: Two papers accepted to BMVC 2026 🎉
items:
  - title: "Watch Your Speech: ..."
    short_title: Watch Your Speech
    venue: BMVC 2026
    summary: "영상과 텍스트를 함께 활용한 음성 생성 연구"
    authors: Gunwoo Lee*, Yoori Oh*, Yoseob Han
    url: https://...        # 선택
note: "* equal contribution"
```

---

## 6. 과제 / 강연 / 특허 / 강의

각 파일 상단 주석에 필드 설명이 있습니다. 기존 항목을 복사해서 채우면 됩니다.

- `_data/grants.yml` — `status: ongoing` 이면 "On-going", `completed` 면 "Completed" 로 나뉩니다.
- `_data/talks.yml` — 날짜 내림차순 자동 정렬.
- `_data/patents.yml` — `country: KR|US`, `status: registered|pending`.
- `_data/courses.yml` — 학기 블록을 맨 위에 추가.

---

## 7. 로컬에서 미리보기 (선택)

Docker 가 있으면 가장 간단합니다:

```bash
git clone https://github.com/4ILab-SSU/4ILab-SSU.github.io.git
cd 4ILab-SSU.github.io
docker run --rm -it -p 4000:4000 -v "$PWD:/srv/jekyll" jekyll/jekyll:4 \
  bash -c "bundle install && bundle exec jekyll serve --host 0.0.0.0"
# → http://localhost:4000
```

Ruby 를 직접 쓸 경우: `bundle install && bundle exec jekyll serve`.

데이터 파일만 검사하려면 Node 로: `npm ci && npm run lint`

---

## 8. 자주 하는 실수

| 증상                        | 원인 / 해결                                                                |
| --------------------------- | -------------------------------------------------------------------------- |
| PR Checks ❌ "YAML parse"   | 들여쓰기 불일치, 탭 문자, 콜론 뒤 공백 누락(`name:Gildong` ✗ → `name: Gildong`) |
| 논문 페이지가 통째로 안 나옴 | `.bib` 중괄호 짝 불일치, 키 중복                                            |
| 멤버 사진이 이니셜로 나옴   | `photo:` 파일명과 실제 파일명 불일치(대소문자 포함)                         |
| 배지가 회색                 | `abbr` 값이 `_data/venues.yml` 에 없음                                      |
| 한글 제목에 `:` 가 있는데 오류 | 값 전체를 `"따옴표"` 로 감싸기                                             |

문의: 관리자 또는 GitHub Issue(📰/📄/🧑‍🎓 양식) 이용.

## 사진 앨범과 캘린더

- 멤버 사진: `assets/img/members/`에 넣고 `_data/members.yml`의 `photo`를 파일명과 일치시킵니다. 영문 소문자와 하이픈 파일명을 권장합니다. JPEG는 `.jpg`, PNG는 `.png`를 사용하세요.
- 행사 사진: `assets/img/photos/`에 넣고 `_data/photos.yml`의 해당 행사 `images`에 파일명을 추가합니다. `date`는 따옴표로 감싼 `YYYY-MM-DD`입니다. 사진을 클릭하면 원본 크기로 열립니다.
- 학회 캘린더: `_data/conferences.yml`에서 학회별 공식 일정과 출처를 변경합니다.
- 모집 안내·지원 양식: `_data/recruitment.yml`에서 마감 여부 안내 문구와 양식 링크를 변경합니다.

행사 사진 43장(10개 앨범)이 모두 등록되어 있습니다. 파일명은 `YYYY-MM-DD-NN.jpg` 또는 `.png`로 통일합니다. 예: `2026-06-23-01.jpg`. 날짜는 행사 시작일, 순번은 앨범 내 두 자리 번호입니다. 확장자는 실제 이미지 형식과 맞춰 주세요.

## AI 학회 일정 (Calendar)

`_data/conferences.yml`만 편집하면 월별 달력과 학회별 상세 일정에 함께 반영됩니다.

- `checked_on`: 공식 페이지를 마지막으로 확인한 날짜.
- `conferences`: 학회별 `id`(고유 영문), `name`, `area`, `location`, `source`(공식 URL), `note`, `events`.
- `events`: `date`와 `label`, `type`을 입력합니다. 날짜는 `"2027-01-21"`처럼 따옴표로 감쌉니다.
- `type`: `deadline`(논문·자료 마감), `notification`(발표), `registration`(참가 등록), `conference`(개최).
- 여러 날 개최하는 학회는 `end_date`에 마지막 날을 포함하여 적습니다.
- 공식 공지에 AoE가 명시되어 있을 때만 `zone: "AoE"`를 사용합니다. 마감 일정에는 다음 날 20:59 한국 시간도 표시합니다. 시각이 미공개이면 `zone`을 생략합니다.
- 잠정 일정은 학회에 `tentative: true`를 설정합니다. 미발표 일정은 날짜를 추정하지 말고 `events: []`와 설명을 남깁니다.

달력 칸은 공식 공지 날짜를 사용하며, 향후 일정은 한국 시간 기준으로 표시합니다. 과거 제출 일정도 학회별 상세 표에서 확인할 수 있습니다. 외부 Google Calendar와 자동 동기화하지 않습니다.

## Photos 지도

- `_data/photos.yml`의 `place`를 `_data/photo_places.yml`의 장소 ID와 연결합니다. 예: `place: soongsil`.
- 장소를 추가할 때는 `name`, `detail`, 위도 `lat`, 경도 `lng`, 확대 수준 `zoom`, 좌표 확인 출처 `source`를 입력합니다.
- 지도 핀은 같은 장소의 앨범들을 묶고, 팝업에서 각 앨범으로 연결합니다. 핀의 숫자는 앨범 수입니다.
- 행사 장소의 대표 좌표를 사용합니다. 개별 사진의 GPS로 오해하지 않도록 도시 단위 위치는 `detail`에 명시하세요.
- `location`은 장소 표시용, `caption`은 졸업생 명단 같은 부가 설명용입니다.
- 지도 라이브러리 Leaflet 1.9.4와 MarkerCluster 1.5.3은 `assets/leaflet/`에 포함되어 있습니다. 지도 배경은 OpenStreetMap을 사용하며 인터넷 연결이 필요합니다. 배경을 불러오지 못해도 장소별 앨범 목록을 이용할 수 있습니다.

## EN / KO 언어 전환

- 영문은 기존 주소(`/`, `/people/` 등), 한국어는 `/ko/`, `/ko/people/`처럼 접두 경로를 사용합니다. 상단 **EN | KO**로 같은 페이지의 언어를 바꿉니다.
- `_pages/`의 페이지와 연구실 데이터는 한 번만 관리합니다. 한국어 페이지를 별도로 복사하지 마세요. 빌드 시 `_plugins/localization.rb`가 생성합니다.
- 메뉴·설명·버튼 번역은 `_data/i18n.yml`에서 관리합니다. `en` / `ko` 아래의 키는 화면에 나타나는 원문이고 값은 번역입니다. 공백과 줄바꿈은 한 칸으로 정규화됩니다. 원문 문구를 수정하면 해당 번역 키도 함께 수정하세요.
- 새 한국어 문구를 추가하면 `en` 아래에 영어 번역을, 새 영어 문구를 추가하면 `ko` 아래에 한국어 번역을 추가합니다. 번역하지 않은 내용은 원문으로 표시됩니다. 논문 제목·학회명·공식 과제 및 특허 명칭은 원문을 유지할 수 있습니다.
- 뉴스는 기존 `_news/*.md`에 영문을 작성하고, `_data/news_ko.yml`에 동일 파일명을 키로 한국어 Markdown을 입력합니다. 날짜·논문 링크 등은 두 언어에서 일치시켜 주세요.
- 강의의 학기·학수번호·순서는 `_data/courses.yml`에서 관리합니다. 강의명 번역은 `_data/i18n.yml`에서 관리합니다. 같은 강의의 분반은 서로 다른 행으로 추가할 수 있습니다.
- `npm run lint`로 데이터 문법을 검증합니다. 빌드 후 `bundle exec ruby scripts/validate-locales.rb`로 언어별 링크와 콘텐츠 수를 검사합니다. GitHub Actions에서도 자동 실행됩니다.


## ブランド와 로고

대표 색상·시그니처 문구·로고 사용법은 [브랜드 가이드](BRAND.md)를 참고하세요.
