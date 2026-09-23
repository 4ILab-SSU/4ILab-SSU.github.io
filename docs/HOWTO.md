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
- 선택 필드: `pdf`, `html`(출판사 페이지), `code`, `arxiv`(번호만), `doi`, `award = {Oral}`, `preview = {파일.png}`(썸네일, `assets/img/publication_preview/`), `selected = {true}`(홈 화면 노출).
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
- 홈 화면에는 최신 6개가, `/news/` 에는 전체가 날짜순으로 표시됩니다.
- 긴 소식(사진 포함 등)은 `inline: false` 로 바꾸고 `title:` 을 추가하면 별도 페이지가 생깁니다.

---

## 5. 홈 화면 Highlight (`_data/highlight.yml`)

```yaml
title: Two papers accepted to BMVC 2026 🎉
items:
  - title: "Watch Your Speech: ..."
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
- 학회 캘린더: `_data/calendar.yml`에서 Google Calendar 주소와 설명을 변경합니다.
- 모집 안내·지원 양식: `_data/recruitment.yml`에서 마감 여부 안내 문구와 양식 링크를 변경합니다.

행사 사진 43장(10개 앨범)이 모두 등록되어 있습니다. 파일명은 `YYYY-MM-DD-NN.jpg` 또는 `.png`로 통일합니다. 예: `2026-06-23-01.jpg`. 날짜는 행사 시작일, 순번은 앨범 내 두 자리 번호입니다. 확장자는 실제 이미지 형식과 맞춰 주세요.
