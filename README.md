# movie_dashboard

간단한 영화 대시보드 만들기

- [데모 페이지](http://movies-dashboard.netlify.app)

## Content

1. [개발 환경](#dev-spec)
2. [Dependencies](#dependencies)
3. [설치 및 실행 방법](#installation)
4. [과제 요구사항 및 기능 구현](#requirement)
5. [API 명세](#api-spec)

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
│  ├─ public
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
│  │  │     ├─ PeopleList
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

1. 프로젝트 클론: `git clone https://github.com/in3166/movie_dashboard.git`
2. 패키지 설치: `yarn install`
3. `.env` 설정 (`./movie_dashboard` 폴더 아래에 위치)
4. 프로젝트 실행: `yarn start`
5. `http://localhost:3000/`으로 접속

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
    4. 과제 요구사항 및 기능 구현
</h2>

### 1. 로그인 페이지 (Login, `/src/routes/Login`)

<img src="https://user-images.githubusercontent.com/45654988/213096290-5dd23277-a62d-4b70-aaec-5925874a9c69.PNG" width="50%" height="50%" />

- route: `/login`
- API
  - **`access_token`**
    - [https://developers.themoviedb.org/4/auth/user-authorization-1](https://developers.themoviedb.org/4/auth/user-authorization-1)

  - **`sesstion_id`**
    - [https://developers.themoviedb.org/3/authentication/create-session-from-v4-access-token](https://developers.themoviedb.org/3/authentication/create-session-from-v4-access-token)
<br>

- **이메일, 비밀번호를 입력하여 로그인**
  - 이메일, 비밀번호 Validation 추가

  - `/src/routes/Login/LoginForm/validateInput.ts`

    - `validateEmail()`: 입력한 이메일이 올바른지 판단합니다.
    - `validatePassword()`: 입력한 비밀번호가 올바른지 판단합니다.
    - `isNotRecommendPassword()`: 입력한 비밀번호가 권고사항을 지켰는지 판단합니다.
      - 연속적인 숫자나 생일, 전화번호
      - 이메일과 비슷한 비밀번호 (입력한 비밀번호가 이메일 앞 부분과 3글자 이상 같은 경우)

<br>

- **인증 정보: `access_token`, `session_id`**
  - 1. `request_token` 가져오기
    - 이메일과 비밀번호를 입력하고 로그인 버튼 클릭합니다.
    - `request_token`을 가져오고 API 인증 페이지를 열어 사용자가 허가 버튼을 클릭합니다.
  <br>

  - 2. `access_token` 가져오기
    - 사용자가 허가를 클릭하면 로그인 페이지로 돌아와 `접속` 버튼 클릭합니다.
    - `request_token`으로 `access_token`을 가져옵니다.
  <br>

  - 3. `session_id` 가져오기
    - 가져온 `access_token`으로 `session_id`를 가져옵니다.
    - `session_id`는 `id`와 `expire` 형식의 객체로 `localStorage`에 저장합니다.

<br>

- **탭 내 로그인 유지**
  - `localStorage`에 저장된 `sessionId`로 로그인 상태를 유지합니다.
  - `/src/routes/PrivateRoute.ts`에서 사용자의 권한을 확인 후 만료시간이 지났거나 `sessionId` 값이 없는 경우 로그인 페이지로 이동합니다.

<br>

### 2. Movie 목록 조회 (Home, `/src/routes/Home`)

<img src="https://user-images.githubusercontent.com/45654988/213096289-fcdf9dfd-66ea-4db9-8c93-cebd719f6108.PNG" width="70%" height="70%" />

- **목록 리스트 조회**
  - route: `/movie/list`
  - API: [https://developers.themoviedb.org/4/list/get-list](https://developers.themoviedb.org/4/list/get-list)
  <br>

  - 구현
    - 1. 내 목록 가져오기
      - `useGetMyList()`
        - `localStorae`에 `myListId`가 존재하면 해당 목록을 가져옵니다.
        - `myListId`가 존재하지 않으면 해당 유저의 새로운 목록을 생성합니다.

<br>

- 2. 목록을 테이블로 출력
  - `MovieTable` 컴포넌트에 목록과 `filter(movie, tv)`를 props으로 전달합니다.
  - `erro`나 `loading` state가 `false`이면 테이블을 출력합니다.

<br>

- **목록 항목 수정** (`'/src/components/MovieTable/PopoverButton`)
  - API: [https://developers.themoviedb.org/4/list/add-items](https://developers.themoviedb.org/4/list/add-items)
  - API에서 항목의 Comment 수정만 지원하고 있습니다.
  - 수정된 결과는 `UpdateModal`이나 API 사이트의 내 계정 - 목록에서 확인할 수 있습니다.
  <br>

  - 구현
    - `PopoverButton` 컴포넌트 내부에 `수정` 버튼 클릭 시 업데이트 모달(`UpdateListModal`)이 열립니다.
    - `UpdateListModal` 컴포넌트의 `확인` 버튼 클릭 시 `handleClickUpdate()` 함수를 호출합니다.
      - `accessToken`과 `myListId`, 선택된 아이템 정보를 가지고 `updateMovieItem()` API 함수를 호출하여 아이템 정보를 수정합니다. (`services/movieAPI`)

<br>

- **목록 항목 삭제**
  - API: [https://developers.themoviedb.org/4/list/update-items](https://developers.themoviedb.org/4/list/update-items)
  <br>

  - 구현
    - `PopoverButton` 컴포넌트 내부에 `삭제` 버튼 클릭 시 해당 테이블 행의 아이템이 삭제됩니다.
      - `handleClickDelete()` 함수를 호출하고 `accessToken`과 `myListId`, 아이템 정보를 가지고 `deleteMovieItem()` API 함수를 호출하여 아이템을 삭제합니다. (`services/movieAPI`)

<br>

### 3. 검색 페이지 (Search `/src/routes/Search`)

<img src="https://user-images.githubusercontent.com/45654988/213096292-7f8fc36d-be87-4e8a-8c39-33e27c4b8cd4.PNG" width="70%" height="70%"/>

- route: `/search`
- API: [https://developers.themoviedb.org/3/search](https://developers.themoviedb.org/3/search)
<br>

- 구현
  - **`SearchBar` 컴포넌트 (`/src/routes/Search/SearchBar`)**
    - 검색 필터 `movie`, `people`, `tv` 값을 선택하고 검색할 텍스트를 입력 후 검색 버튼을 클릭하여 `handleSearchSubmit()` 함수를 호출합니다.
    - `searchText`와 `selectFilterValue` 값을 가지고 `searchList()` API 함수를 호출하여 검색 목록을 가져옵니다.

    ```js
    // services/moviesAPI.ts
    export const searchList = (text: string, filter: string) =>
      axios.get(
        `${MOVIE_API_URL}/3/search/${filter}?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&query=${text}`
    );
    ```

    <br>

  - **검색 목록을 필터에 맞게 출력 (`'/src/routes/Search/PeopleList'`)**
    - 검색 필터가 `people`인 경우
      - `PeopleList` 컴포넌트에 검색된 목록을 넘기고 렌더합니다.
      - 인물 목록에서 특정 인물을 선택하면 하단의 `Movie` 테이블과 `TV` 테이블에 해당 인물의 출연작이 출력합니다.
    <br>

    - 검색 필터가 `movie`나 `tv`인 경우
      - 검색된 목록을 검색 바 하단의 `MovieTable` 컴포넌트에 넘겨주고 해당 테이블을 출력합니다.
    <br>

  - **목록에 항목 추가**
    - API: [https://developers.themoviedb.org/4/list/get-list](https://developers.themoviedb.org/4/list/get-list)
    <br>

    - 구현
      - `MovieTable` 컴포넌트의 `handleClickRow()` 함수
        - 테이블의 행을 클릭하면 선택된 아이템 목록이 reudux의 `selectedMovies`에 저장됩니다.

      - `Search` 컴포넌트의 `추가` 버튼 클릭 시 `handleClickAddItem()` 함수를 호출하여 선택된 아이템 목록이 나의 목록에 추가됩니다
      - 추가된 목록은 `/movie/list`나 API 사이트의 목록에서 확인할 수 있습니다.

<br>
<br>

### 4. 그 외

- **헤더** (`'/src/components/Layout/Header`)
  - 사용자 이메일: 로그인 시 입력한 이메일을 헤더에 출력합니다.
  - 로그아웃: 프로필 이미지를 클릭하면 로그아웃되며 로그인 페이지로 이동합니다.
    - `localStorage`의 `accessToken`, `myListId`, `sessionId`, `email` 값을 제거합니다.
    - (`/src/utils/resetStore.ts`)
  - 페이지 경로에 따라 헤더 제목을 설정합니다.
<br>

- **사이드바** (`'/src/components/Layout/Sidebar`)
  - 열고 닫을 수 있는 버튼을 추가했습니다.
  - 초기 렌더 시 윈도우 사이즈에 따라 사이드바 숨김 여부를 결정합니다.
  - 윈도우 리사이즈 시 특정 너비 기준 사이드바 숨김 여부를 결정합니다.
    - `debounce` 적용
<br>

- **React Error Boundary** 추가
<br>

- **동적 라우팅과 `React.lazy` 적용**
  - `/src/routes`의 Routes 내부에 `Suspense`와 동적 라우팅 `React.lazt`를 사용해 컴포넌트를 동적으로 import 합니다.
<br>

- **`lazyLoading` 이미지 적용** (`/src/components/MovieTable/LazyImage`)
  - Table의 포스터나 인물 목록의 프로필 사진을 `Lazy Loading`을 사용해 가져옵니다.

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
