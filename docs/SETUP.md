# 최초 설정 (Org owner 1회)

GitHub Organization **4ILab-SSU** 는 이미 있으므로, 저장소를 만들고 Pages 를 켜면 끝입니다.
아래 순서대로 진행하면 약 10분 걸립니다.

## 1. 저장소 만들기

1. <https://github.com/organizations/4ILab-SSU/repositories/new>
2. Repository name: **`4ILab-SSU.github.io`** (정확히 이 이름이어야 `https://4ilab-ssu.github.io` 로 서비스됩니다)
3. Public, README 추가 **안 함** → **Create repository**

## 2. 코드 올리기

압축을 푼 폴더에서:

```bash
cd 4ILab-SSU.github.io
git init -b main
git add .
git commit -m "Initial lab website (Jekyll + al-folio)"
git remote add origin https://github.com/4ILab-SSU/4ILab-SSU.github.io.git
git push -u origin main
```

푸시하면 **Actions** 탭에서 "Deploy site" 워크플로가 자동 실행되고, 빌드 후 Pages에 배포합니다 (2~4분). 첫 실행 전 아래 Pages 설정을 완료하세요.

## 3. GitHub Pages 켜기

저장소 **Settings → Pages**

- Source: **GitHub Actions**

1~2분 뒤 <https://4ilab-ssu.github.io> 에서 확인. (첫 배포 뒤 Actions 를 한 번 더 실행해야 할 수도 있습니다: Actions → Deploy site → Run workflow)

> 워크플로의 배포 작업에 `pages: write`, `id-token: write` 권한이 지정되어 있습니다. 첫 실행이 Pages 설정 전에 실패했다면 설정 후 다시 실행하세요.

## 4. 협업자(collaborator) 초대

권장 구조 — Organization 에 팀을 만들어 관리:

1. **Org → Teams → New team** : `web-maintainers` (연구실 전원 또는 홈페이지 담당자)
2. 팀에 저장소 권한 부여: 저장소 **Settings → Collaborators and teams → Add teams**
   - 학생 전원: **Write** (브랜치 만들고 PR 올리기 가능)
   - 홈페이지 담당자/교수: **Admin** 또는 **Maintain**
3. `.github/CODEOWNERS` 의 주석을 풀어 팀을 리뷰어로 지정하면 PR 이 열릴 때 자동으로 리뷰 요청이 갑니다.

## 5. `main` 브랜치 보호 (선택, 권장)

**Settings → Branches → Add branch ruleset** (또는 classic protection rule) for `main`:

- ✅ Require a pull request before merging (approvals: 1)
- ✅ Require status checks to pass → `build-and-deploy` 선택
- 관리자는 우회 허용(bypass) 해두면 급한 수정에 편리

이렇게 하면 누구나 PR 을 올리되, 빌드가 깨지는 변경은 머지되지 않습니다.

## 6. 남은 할 일 (콘텐츠)

- [x] 멤버 사진 15장 등록 완료. 이후 추가/교체는 `_data/members.yml`의 `photo:` 값과 파일명을 맞추세요.
- [ ] 필요하면 연구실 로고/단체 사진을 `assets/img/` 에 넣고 `_pages/about.md` 의 `profile:` 주석 해제
- [x] Photos 행사 10건·사진 43장 등록 완료. 추가 사진은 `assets/img/photos/YYYY-MM-DD-NN.jpg` 또는 `.png`로 저장하고 `_data/photos.yml`에 연결
- [ ] 기존 Google Sites 첫 화면에 안내 문구 + 새 주소 링크 추가 (또는 Google Sites 삭제)
- [ ] 학교 도메인(예: `4ilab.ssu.ac.kr`)을 쓰려면 DNS CNAME 을 `4ilab-ssu.github.io` 로 두고 Settings → Pages → Custom domain 입력; `_config.yml` 의 `url:` 도 함께 변경

## 7. 테마 업데이트

al-folio 는 gem 으로 배포되므로 `Gemfile` 의 버전 번호를 올리고 `bundle update` 후 커밋하면 됩니다. 사이트 고유 파일(`_data`, `_pages`, `_sass/_custom.scss`, `_bibliography`)은 영향을 받지 않습니다.
