import { options } from '@/pages/api/data';
import {
  MovieDetailType,
  MovieListType,
  MoviesListTypeWithDates,
} from './type/MovieType';

// 각 분류별로 영화 리스트를 불러오는 함수, 비슷한 영화의 경우엔 movieId를 넣어줄 수 있도록 오버로딩 처리함
// 현재 상영중, 인기, 역대 최고 점수, 개봉 예정 영화 리스트
function getMovieList(
  urlKey: 'now_playing' | 'popular' | 'top_rated' | 'upcoming',
): Promise<MovieDetailType[] | undefined>;

// 특정 movieId와 비슷한 영화 리스트
function getMovieList(
  urlKey: 'similar',
  movieId: number,
): Promise<MovieDetailType[] | undefined>;

async function getMovieList(
  urlKey: string,
  movieId?: number,
): Promise<MovieDetailType[] | undefined> {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId ? movieId + '/' : ''}${urlKey}?language=ko-KR&page=1`,
    options,
  );
  try {
    if (urlKey === 'now_playing') {
      const nowPlayingMovieList: MoviesListTypeWithDates = await res.json();
      return nowPlayingMovieList.results;
    } else if (urlKey === 'popular') {
      const popularMovieList: MovieListType = await res.json();
      return popularMovieList.results;
    } else if (urlKey === 'top_rated') {
      const topRatedMovieList: MovieListType = await res.json();
      return topRatedMovieList.results;
    } else if (urlKey === 'upcoming') {
      const topRatedMovieList: MoviesListTypeWithDates = await res.json();
      return topRatedMovieList.results;
    } else if (urlKey === 'similar') {
      const similarMovieList: MovieListType = await res.json();
      return similarMovieList.results;
    }
  } catch (error) {
    console.error('getMovieList error: ', error);
  }
}

export { getMovieList };
