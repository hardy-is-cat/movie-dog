import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import styled from 'styled-components';

import SideBar from '@/components/SideBar';
import CardList from '@/container/CardList';

import { getDiscoverMovie } from '@/utils/fetchMovie';

function YearMain({
  movieList,
  currentPageStr: currentPage,
  totalPages,
}: InferGetServerSidePropsType<GetServerSideProps>) {
  return (
    <WrapperBlock>
      <SideBar />
      <CardList
        movieList={movieList}
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </WrapperBlock>
  );
}

export default YearMain;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const {
    page: currentPage = '1',
    startYear = '2020',
    endYear = '2025',
  } = context.query;

  const currentPageStr = Array.isArray(currentPage)
    ? currentPage[0]
    : currentPage;
  const startYearStr = Array.isArray(startYear) ? startYear[0] : startYear;
  const endYearStr = Array.isArray(endYear) ? endYear[0] : endYear;

  const data = await getDiscoverMovie(
    'year',
    +currentPageStr,
    startYearStr,
    endYearStr,
  );

  return {
    props: {
      movieList: data!.results,
      currentPageStr,
      totalPages: data!.total_pages,
    },
  };
};

const WrapperBlock = styled.div`
  display: flex;
  flex-flow: row;
  gap: 20px;
  max-width: 1200px;
  padding: 50px 20px;
  margin: 0 auto;

  & aside {
    width: calc(100% / 6);
  }

  & section {
    width: calc(100% / 6 * 5);
  }

  @media (max-width: 1000px) {
    flex-flow: column;

    & aside,
    & section {
      width: 100%;
    }
  }
`;

// export const getServerSideProps = async (context: any) => {
//   const params = context.params.parmas;

//   const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY_AUTH;
//   // params가 undefined인지 확인하고, 해당 경우 기본값인 year와 idx를 설정
//   let year = new Date().getFullYear().toString();
//   let idx = '1';
//   if (params[0]) {
//     year = params[0];
//   }

//   if (params[1]) {
//     idx = params[1];
//   }
//   const response = await fetch(
//     `https://main.drpe221ejddia.amplifyapp.com/api/movie/${year}/${idx}`,
//   );

//   const { results } = await response.json();

//   return {
//     props: {
//       data: results,
//       year,
//       idx,
//     },
//   };
// };
