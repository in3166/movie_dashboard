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

- `React`
- `TypeScript`
- `react-redux`
- `reduxt-toolkit`
- `Material UI`
- `css-module` + `SCSS`
- `prettier` + `eslint` + `stylelint`

### 1.1 폴더 구조

```bash
├─ movie_dashboard
│  ├─ .env
│  ├─ .eslintignore
│  ├─ .eslintrc.json
│  ├─ .prettierignore
│  ├─ .prettierrc.yml
│  ├─ .stylelintrc.json
│  ├─ package.json
│  ├─ public
│  ├─ README.md
│  ├─ src
│  │  ├─ assets
│  │  │  └─ svgs
│  │  ├─ components
│  │  │  ├─ Container
│  │  │  ├─ Layout
│  │  │  │  ├─ ErrorFallback
│  │  │  │  ├─ Header
│  │  │  │  └─ Sidebar
│  │  │  ├─ Loading
│  │  │  ├─ MovieTable
│  │  │  │  ├─ LazyImage
│  │  │  │  ├─ PopoverButton
│  │  │  │  ├─ TablePaginationActions
│  │  │  │  └─ UpdateListModal
│  │  │  │     └─ Modal
│  │  │  └─ SnackBar
│  │  ├─ constant
│  │  ├─ fixtures
│  │  ├─ routes
│  │  │  ├─ Home
│  │  │  ├─ Login
│  │  │  │  ├─ LoginForm
│  │  │  │  │  ├─ InputText
│  │  │  │  │  └─ validateInput.ts
│  │  │  │  └─ __tests__
│  │  │  ├─ NotFound
│  │  │  ├─ PrivateRoute.tsx
│  │  │  └─ Search
│  │  │     └─ SearchBar
│  │  ├─ services
│  │  ├─ utils
│  │  ├─ states
│  │  ├─ styles
│  │  │  ├─ base
│  │  │  ├─ constants
│  │  │  └─ mixins
└  └  └─ types
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

### 1. 로그인 페이지 (Login `'/login'`)

- 인증 정보: `access_token`, `session_id`
<br>

- 이메일, 비밀번호를 입력하여 로그인
  - 이메일, 비밀번호 Validation 추가
<br>

- 탭 내 로그인 유지

<br>

### 2. Movie 목록 조회 (Home `'/'`)

- 목록 리스트 조회
<br>

- 목록에 항목 추가
<br>

- 목록 항목 수정
<br>

- 목록 항목 삭제

<br>

### 3. 검색 페이지 (Search `'/search'`)

- 검색 필터: `movie`, `people`, `tv`

### 4. 추가 사항

- 헤더
- 사이드바
- 로그아웃
- Not Found Page
- React Error Boundary

<br/>

<h2 id="api-spec">
    5. API 명세
</h2>

|  API  | 정의 |  Request | Response |
|---------|---------|------|------|
| POST /auth/request_token  |  사용자의 Request Token 생성  |  -   |  { status_message, request_token, success, status_code } |
| POST /auth/access_token  |  사용자의 Access Token 생성  |  -   |  { status_message, access_token, success, status_code, account_id } |
| POST /authentication/session/convert/4  |  Access Token으로 Session 생성  |  Body { access_token }   |  { success, session_id } |
| POST /list  |  사용자의 목록 생성  |  -   |  { status_message, id, success, status_code } |
| GET /list/{list_id}  |  사용자의 목록 가져오기  | Query {page, api_key}   |  { poster_path, id, page, results, total_pages, name, comments } |
| POST /list/{list_id}/item  |  목록에 아이템 추가  | -  |  { status_message, success, status_code, results: { media_type, media_id, success } } |
| PUT /list/{list_id}/item  |  아이템 Comment 수정  | Body { itmes: { media_type, media_id, comment } }  |  { status_message, success, status_code, results: { media_type, media_id, success } } |
| DELETE /list/{list_id}/item  |  아이템을 목록에서 제거  | Body { itmes: { media_type, media_id } } |  { status_message, success, status_code, results: { media_type, media_id, success } } |
| GET /search/movie  |  영화 검색  | Query { api_key, query, include_adult }  |  { page, total_results, total_pages, results: { poster_path, adult, release_date, title, popularity, vote_count, vote_average } } |
| GET /search/person  |  인물 검색  | Query { api_key, query, include_adult }  |  { page, total_results, total_pages, results: { profile_path, adult, id, name, popularity, popularity, known_for: { poster_path, adult, release_date, id, media_type, title, popularity, vote_count, vote_average } } } |
| GET /search/tv  |  TV 검색  | Query { api_key, query, include_adult }  |  { page, total_results, total_pages, results: { poster_path, id, first_air_date, name, popularity, vote_count, vote_average } } |

<br/>

<h2 id="solution">
    6. 문제 해결 전략
</h2>
