# movie_dashboard

간단한 영화 대시보드 만들기

- [데모 페이지](http://movies-dashboard.netlify.app)

## Content

1. [개발 환경](#dev-spec)
2. [Dependencies](#dependencies)
3. [설치 및 실행 방법](#installation)
4. [과제 요구사항](#requirement)
5. [API 명세](#api-spec)
6. [문제 해결 전략](#solution)

<br/>

<h2 id="dev-spec">
    1. 개발 환경
</h2>

#### Front-End

- `React`
- `TypeScript`
- `prettier` + `eslint` + `stylelint`
- `react-redux`
- `reduxt-toolkit`
- `css-module` + `SCSS`
- `Material UI`

### 1.1 폴더 구조

```bash
```

<br/>

<h2 id="dependencies">
    2.Dependencies
</h2>

|  Dependency  | version |
|--------------|---------|
| React    |   18.2.0   |
| react-dom    |   18.2.0   |
| react-router-dom    |   6.6.2   |
| react-redux    |   8.0.5   |
| @reduxjs/toolkit    |   1.9.1   |
| react-error-boundary    |   3.1.4   |
| store    |   18.2.0   |
| axios    |   1.2.2   |
| classnames    |   2.3.2   |
| @mui/material    |   5.11.4   |
| @mui/icons-material    |   5.11.0   |
| @emotion/styled    |   11.10.5   |
| @emotion/react    |   11.10.5   |

<br>

<h2 id="installation">
    3. 설치 및 실행 방법
</h2>

- Git clone
- yarn install
- `.env` 설정
- yarn start
- `http://localhost:3000/`으로 접속

```bash
$> git clone https://github.com/in3166/movie_dashboard.git

$> cd ./movie_dashboard

//install dependency
$> yarn install

// .env 설정

$> yarn start
```
<br/>

<h2 id="requirement">
    4. 과제 요구사항
</h2>

### 1. 로그인 페이지

- 인증 정보: `access_token`, `session_id`
- 이메일, 비밀번호를 입력하여 로그인
  - 이메일, 비밀번호 Validation 추가
- 탭 내 로그인 유지

### 2. Movie 목록 조회

- 목록 리스트 조회
- 목록에 항목 추가
- 목록 항목 수정
- 목록 항목 삭제

### 3. 검색 페이지

- 검색 필터: `movie`, `people`, `tv`

<br/>

<h2 id="api-spec">
    5. API 명세
</h2>

<br/>

<h2 id="solution">
    6. 문제 해결 전략
</h2>
