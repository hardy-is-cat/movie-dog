import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import styled from 'styled-components';
import MovieSwiper from '@/components/swiper/MovieSwiper';
import ReviewSwiper from '@/components/swiper/ReviewSwiper';
import MainVisualSwiper from '@/components/swiper/MainVisualSwiper';
import { MovieDetailType } from '@/utils/type/MovieType';
import { getMovieList } from '@/utils/fetchMovie';

export default function Home({
  nowPlayingList,
  popularList,
  topRatedList,
  similarList,
}: {
  nowPlayingList: MovieDetailType[];
  popularList: MovieDetailType[];
  topRatedList: MovieDetailType[];
  similarList: MovieDetailType[];
}) {
  return (
    <>
      <WapperBlock>
        <section>
          <MainVisualSwiper data={nowPlayingList} />
        </section>
        <section>
          <TitleBlock>박스오피스</TitleBlock>
          <MovieSwiper data={nowPlayingList} ranking={true} />
        </section>
        <section>
          <TitleBlock>최고평점</TitleBlock>
          <MovieSwiper data={topRatedList} ranking={false} />
        </section>
        <section>
          <TitleBlock>유저 한 줄 평</TitleBlock>
          <ReviewSwiper movieId={0} />
        </section>
      </WapperBlock>
    </>
  );
}

export const getServerSideProps = async () => {
  const [nowPlayingList, popularList, topRatedList, similarList] =
    await Promise.all([
      getMovieList('now_playing'),
      getMovieList('popular'),
      getMovieList('top_rated'),
      getMovieList('similar', 552524),
    ]);
  return { props: { nowPlayingList, popularList, topRatedList, similarList } };
};

const WapperBlock = styled.div`
  max-width: 1200px;
  margin: 0 auto;

  section {
    margin-bottom: 50px;
  }
`;

const TitleBlock = styled.h2`
  margin-bottom: 20px;
  color: ${({ theme }) => theme.colors.brown9};
  font-size: ${({ theme }) => theme.fontSize.headline2};
  font-weight: 700;
  text-align: center;
`;
