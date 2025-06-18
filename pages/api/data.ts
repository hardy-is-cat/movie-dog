export const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN_AUTH}`,
  },
};

export const genreNameObj: { [genreNum: string]: string } = {
  28: '액션',
  12: '어드벤쳐',
  16: '애니메이션',
  35: '코미디',
  80: '범죄',
  99: '다큐멘터리',
  18: '드라마',
  10751: '가족',
  14: '판타지',
  36: '역사',
  27: '호러',
  10402: '음악',
  9648: '미스터리',
  10749: '로맨스',
  878: 'SF',
  10770: 'TV영화',
  53: '스릴러',
  10752: '전쟁',
  37: '서부',
};

export const yearCategory = [
  {
    yearScope: '2020년대',
    startYear: 2020,
    endYear: new Date().getFullYear(),
  },
  { yearScope: '2010년대', startYear: 2010, endYear: 2019 },
  { yearScope: '2000년대', startYear: 2000, endYear: 2009 },
  { yearScope: '1990년대', startYear: 1990, endYear: 1999 },
  { yearScope: '1980년대', startYear: 1980, endYear: 1989 },
  { yearScope: '1970년대', startYear: 1970, endYear: 1979 },
  { yearScope: '1960년대', startYear: 1960, endYear: 1969 },
  { yearScope: '1960년대 이전', startYear: 1900, endYear: 1959 },
];
