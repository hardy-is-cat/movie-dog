import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Image from 'next/image';

import styled from 'styled-components';

import CardList from '@/container/CardList';
import MovieDogError from '../../public/images/moviedog-error.png';
import { searchMovieByKeyword } from '@/utils/fetchMovie';

function SearchPage({
  keyword,
  searchList,
  currentpage,
  totalPages,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <KeywordWrapper>
        <h1>"{keyword}"의 검색결과</h1>
      </KeywordWrapper>
      <ResultCardsBlock>
        {searchList[0] ? (
          <CardList
            movieList={searchList}
            currentPage={currentpage}
            totalPages={totalPages}
          />
        ) : (
          <ErrorBlock>
            <Image
              src={MovieDogError.src}
              alt="검색 결과가 없습니다."
              width={242}
              height={110}
            />
            <p>검색 결과가 없습니다.</p>
          </ErrorBlock>
        )}
      </ResultCardsBlock>
    </>
  );
}

export default SearchPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { keyword } = context.query;
  let data;
  if (!Array.isArray(keyword)) data = await searchMovieByKeyword(keyword!);

  return {
    props: {
      keyword,
      searchList: data?.results,
      currentpage: data?.page,
      totalPages: data?.total_pages,
    },
  };
};

const KeywordWrapper = styled.div`
  width: 100%;
  padding: 16px 0;
  background-color: ${({ theme }) => theme.colors.gray0};

  h1 {
    max-width: 1200px;
    padding: 0 20px;
    margin: 0 auto;
    color: ${({ theme }) => theme.colors.black};
    font-size: ${({ theme }) => theme.fontSize.headline3};
    font-weight: 700;
  }
`;

const ResultCardsBlock = styled.section`
  max-width: 1200px;
  padding: 100px 20px;
  margin: 0 auto;
`;

const ErrorBlock = styled.div`
  width: 100%;
  font-size: ${({ theme }) => theme.fontSize.headline2};
  text-align: center;

  p {
    margin-top: 20px;
    color: ${({ theme }) => theme.colors.black};
  }
`;
