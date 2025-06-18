import styled from 'styled-components';

import Card from '@/components/Card';
import Pagination from '@/components/Pagination';

import { MovieListsDetailType } from '@/utils/type/MovieType';

type CardList = {
  movieList: MovieListsDetailType[];
  currentPage: string;
  totalPages: number;
};

function CardList({ movieList, currentPage, totalPages }: CardList) {
  return (
    <WrapperBlock>
      <CardListBlock>
        {movieList &&
          movieList.map((movie, i) => {
            return (
              <Card
                key={movie.id}
                ranking={currentPage === '1' && i + 1 < 11 ? i + 1 : false}
                movie={movie}
              />
            );
          })}
      </CardListBlock>
      <Pagination currentPage={+currentPage} totalPages={totalPages} />
    </WrapperBlock>
  );
}

export default CardList;

const WrapperBlock = styled.section``;

const CardListBlock = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 50px;

  & > a {
    // width 계산 -> 100% / (한 줄  당 카드 갯수) - gap * (한 줄 당 카드 갯수 - 1) / 한 줄 당 카드 갯수
    display: block;
    width: calc(50% - 10px);
  }

  @media (min-width: 768px) {
    & > a {
      width: calc(25% - 15px);
    }
  }
`;
