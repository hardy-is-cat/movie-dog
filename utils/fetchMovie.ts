import { options } from '@/pages/api/data';
import {
  MovieCreditsType,
  MovieDetailType,
  MovieListsDetailType,
  MovieListsType,
  MoviesListsTypeWithDates,
} from './type/MovieType';

// 각 분류별로 영화 리스트를 불러오는 함수, 비슷한 영화의 경우엔 movieId를 넣어줄 수 있도록 오버로딩 처리함
// 현재 상영중, 인기, 역대 최고 점수, 개봉 예정 영화 리스트
function getMovieList(
  urlKey: 'now_playing' | 'popular' | 'top_rated' | 'upcoming',
): Promise<MovieListsDetailType[] | undefined>;

// 특정 movieId와 비슷한 영화 리스트
function getMovieList(
  urlKey: 'similar',
  movieId: number,
): Promise<MovieListsDetailType[] | undefined>;

async function getMovieList(
  urlKey: string,
  movieId?: number,
): Promise<MovieListsDetailType[] | undefined> {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId ? movieId + '/' : ''}${urlKey}?language=ko-KR&page=1`,
    options,
  );
  try {
    if (urlKey === 'now_playing') {
      const nowPlayingMovieList: MoviesListsTypeWithDates = await res.json();
      return nowPlayingMovieList.results;
    } else if (urlKey === 'popular') {
      const popularMovieList: MovieListsType = await res.json();
      return popularMovieList.results;
    } else if (urlKey === 'top_rated') {
      const topRatedMovieList: MovieListsType = await res.json();
      return topRatedMovieList.results;
    } else if (urlKey === 'upcoming') {
      const topRatedMovieList: MoviesListsTypeWithDates = await res.json();
      return topRatedMovieList.results;
    } else if (urlKey === 'similar') {
      const similarMovieList: MovieListsType = await res.json();
      return similarMovieList.results;
    }
  } catch (error) {
    console.error('getMovieList error: ', error);
  }
}

// 영화 id로 상세정보 불러오는 함수
async function getMovieDetail(
  movieId: string,
): Promise<MovieDetailType | undefined> {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?language=ko-kr'`,
    options,
  );
  return res.json();
}

// 영화 id로 출연진 불러오는 함수
async function getMovieCredits(
  movieId: string,
): Promise<MovieCreditsType | undefined> {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/credits?language=ko-kr'`,
    options,
  );
  return res.json();
}

/**
 * 장르 혹은 시작~종료 년도로 영화를 검색할 때 API 요청 query를 생성하는 함수
 * @function
 * @param discoverWith "genre" 혹은 "year"로 설정하여 장르 검색이나 연도별 검색을 지정할 수 있음
 * @param currentPage 표시해 줄 page를 설정, url에 있는 page 파라미터를 넣으면 됨
 * @param genreId 장르 id
 * @param startYear 시작년도
 * @param endYear 종료년도
 */
function buildTMDBQuery(
  discoverWith: 'genre',
  currentPage: number,
  genreId: string,
): string;
function buildTMDBQuery(
  discoverWith: 'year',
  currentPage: number,
  startYear: string,
  endYear: string,
): string;
function buildTMDBQuery(
  discoverWith: 'genre' | 'year',
  currentPage: number,
  genreIdORStartYear: string,
  endYear?: string,
): string {
  const query = new URLSearchParams({
    'certification.gte': 'ALL',
    'certification.lte': '19',
    certification_country: 'KR',
    include_adult: 'false',
    include_video: 'false',
    language: 'ko-KR',
    sort_by: 'popularity.desc',
  });

  if (discoverWith === 'genre') {
    query.set('with_genres', genreIdORStartYear);
    query.set('page', currentPage.toString());
  } else if (discoverWith === 'year') {
    query.set('primary_release_date.gte', `${genreIdORStartYear}-01-01`);
    query.set('primary_release_date.lte', `${endYear!}-12-31`);
    query.set('page', currentPage.toString());
  }

  return query.toString();
}

function getDiscoverMovie(
  discoverWith: 'genre',
  currentPage: number,
  genreId: string,
): Promise<MovieListsType | undefined>;
function getDiscoverMovie(
  discoverWith: 'year',
  currentPage: number,
  startYear: string,
  endYear: string,
): Promise<MovieListsType | undefined>;
async function getDiscoverMovie(
  discoverWith: 'genre' | 'year',
  currentPage: number,
  genreIdORStartYear: string,
  endYear?: string,
): Promise<MovieListsType | undefined> {
  if (discoverWith === 'genre') {
    const genreQuery = buildTMDBQuery('genre', currentPage, genreIdORStartYear);
    const res = await fetch(
      `https://api.themoviedb.org/3/discover/movie?${genreQuery}`,
      options,
    );
    return res.json();
  } else if (discoverWith === 'year') {
    const yearQuery = buildTMDBQuery(
      'year',
      currentPage,
      genreIdORStartYear,
      endYear!,
    );
    const res = await fetch(
      `https://api.themoviedb.org/3/discover/movie?${yearQuery}`,
      options,
    );
    return res.json();
  }
}

export { getMovieList, getMovieDetail, getMovieCredits, getDiscoverMovie };
