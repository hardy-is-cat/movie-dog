# 🐶 MovieDog

React + Next.js를 이용한 영화정보 반응형 사이트

### URL:[https://main.drpe221ejddia.amplifyapp.com/](https://main.drpe221ejddia.amplifyapp.com/)
(배포 이슈로 vercel에서 amplify로 서비스 변경하였습니다.)

## 🎞️ 프로젝트 소개

영화정보 사이트인 [TMDB](https://www.themoviedb.org/?language=ko)의 API를 이용하여,
영화의 정보를 조회, 한줄평을 작성할 수 있는 사이트입니다.

## 🕰️ 개발 기간

23.09.05~23.11.15

## 👥 멤버구성

- **조정현**([깃허브](https://github.com/hardy-is-cat)) : 와이어프레임, 피그마 시안, 메인페이지, 장르별 영화, 영화 정보 상세페이지, 검색기능
- **이예솔**([깃허브](https://github.com/lulla-by)) : 와이어프레임, 로그인, 회원가입, 년도별 영화, 마이페이지

## 🪄 사용 기술

- React.js
- Next.js
- TypeScript
- Recoil
- Styled-Components
- Firebase
- Swiper.js

## 🛠️ 주요 기능

### 메인페이지

![무비독 메인페이지](https://github.com/movie-dog/movie-dog/assets/76080643/81eb4caa-8fbd-4a59-9cc5-f473d3757ab9)

- Swiper.js를 이용해 영화 정보를 간략히 확인하고 해당 영화의 상세정보 페이지로 이동할 수 있습니다.
- 한 줄 평에서는 유저들이 남긴 리뷰를 확인할 수 있습니다.
- 로그인시 마이페이지 메뉴가 나타납니다.

### 회원가입

![회원가입1](https://github.com/movie-dog/movie-dog/assets/107671084/7969e507-c7c7-4aa7-8203-db51f1aca778)
![회원가입2](https://github.com/movie-dog/movie-dog/assets/107671084/ff2fc791-aeb5-44c9-afb9-c4ad529a3280)
![회원가입3](https://github.com/movie-dog/movie-dog/assets/107671084/fa423406-be83-441a-a880-467f7f8c417a)

- 유효성 검증을 추가하여 모든 로직 통과시에만 회원가입 버튼이 활성화 됩니다.
- 이메일/비밀번호 회원가입이 가능하며 파이어베이스 authentication을 사용했습니다.
- gamil.com으로 끝나는 아이디는 구글 로그인을 하도록 메세지를 추가했습니다.
- 깃허브와 구글계정으로 소셜로그인이 가능합니다.

### 로그인

![일반로그인](https://github.com/movie-dog/movie-dog/assets/107671084/a7e2d110-2278-4a06-b8bd-24b2276f6e2e)
![소셜로그인](https://github.com/movie-dog/movie-dog/assets/107671084/83e40439-af24-4a79-9cbd-70af7839f5d1)

- 소셜로그인(깃허브, 구글로그인)과 이메일/비밀번호 방식으로 로그인 할 수 있습니다.

### 영화 장르별 카테고리 페이지

![무비독 장르카테고리 페이지](https://github.com/movie-dog/movie-dog/assets/76080643/7c7358ca-264a-4262-80cd-c1e2f7c762a6)

- 영화를 장르별로 확인 할 수 있는 페이지 입니다.

### 영화 년도별 카테고리 페이지

- 개봉 년도별 인기 영화를 20개씩 보여줍니다.
- SEO향상을 위해 SSR 방식으로 작동하며 url에서 년도를 받아와서 데이터를 렌더링합니다.

### 영화 상세정보 페이지

![무비독 상세페이지](https://github.com/movie-dog/movie-dog/assets/76080643/14d8e138-a9fd-4a48-b6fa-8487635e6135)
<img src="https://github.com/movie-dog/movie-dog/assets/76080643/087497ed-64a1-4b48-a98a-5e4887a39f56" alt="무비독 찜기능" width="50%" style="float:left;">
<img src="https://github.com/movie-dog/movie-dog/assets/76080643/ac7b2071-3729-4b31-9e10-c650034809e9" alt="무비독 한줄평" width="50%" style="clear:both;">

- 상세페이지에서 해당 영화의 상세 정보와 유저들이 남긴 한 줄 평, 비슷한 영화를 확인할 수 있습니다.
- 한 줄 평과 찜영화 데이터는 Firestore Database로 관리합니다.
- 찜기능을 이용해 마이페이지에서 확인할 수 있습니다.
- 한 줄 평은 모달로 띄워지며, 추후 다른 모달이 생성됨에 대비해 Recoil로 상태를 관리합니다.
- 한 줄 평 작성 후 다시 버튼을 누르면 작성한 한 줄 평을 확인할 수 있으며, 수정이 가능합니다.

### 영화검색 페이지

![무비독 영화검색페이지](https://github.com/movie-dog/movie-dog/assets/76080643/c8d0984d-721a-4a52-8b6a-b2dbb11d2bb9)

- 영화의 제목을 입력 후 검색할 수 있습니다.
- 해당되는 영화 정보가 없을 경우 사용자에게 안내합니다.

### 마이페이지

![찜과 한줄평 없을때](https://github.com/movie-dog/movie-dog/assets/107671084/30035b63-854d-4be3-a97b-0c7208a9e149)
![좋아요 마이페이지](https://github.com/movie-dog/movie-dog/assets/107671084/c05e87c1-925a-4952-817a-22c90d344d8e)
![리뷰 마이페이지](https://github.com/movie-dog/movie-dog/assets/107671084/a1455075-a3a9-4e57-8fa2-4e99d33e047e)
![마이페이지 전체 렌더링](https://github.com/movie-dog/movie-dog/assets/107671084/b300079c-9fb1-4a08-b41b-4fe55d096f01)

- 마이페이지는 user의 정보를 알려주는 카드와 선호장르 카드, 찜한 영화목록과 작성한 리뷰들의 목록을 보여줍니다.
- 찜한 영화와 리뷰가 없을 경우에는 안내메세지가 나옵니다.
- 유져의 카드에는 찜 한 영화와 작성한 리뷰의 개수를 나타냅니다.
- 나의 선호 장르에는 찜한 영화와 작성한 리뷰를 바탕으로 선호하는 장르를 산출합니다.
- 각 목록에는 좋아요를 누른 영화의 목록이 8개씩, 작성한 리뷰들은 4개씩 렌더링 됩니다.
