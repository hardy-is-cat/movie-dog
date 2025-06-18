import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import styled from 'styled-components';

import SideBar from '@/components/SideBar';
import CardList from '@/container/CardList';

import { getDiscoverMovie } from '@/utils/fetchMovie';

function CategoryList({
  movieList,
  currentPage,
  totalPages,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <WrapperBlock>
      <SideBar />
      <CardList
        currentPage={currentPage}
        totalPages={totalPages}
        movieList={movieList}
      />
    </WrapperBlock>
  );
}

export default CategoryList;

export const getServerSideProps: GetServerSideProps = async (context) => {
  // params 속성이 없다면 404 페이지로 리다이렉트
  if (!context.params) {
    return { notFound: true };
  }

  const currentPage = context.query.page || '1';
  const genreId = context.params.genreId as string;

  const data = await getDiscoverMovie('genre', +currentPage, genreId);

  return {
    props: {
      movieList: data!.results,
      currentPage,
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
