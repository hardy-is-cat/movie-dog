import Category from '@/components/yearList/Category';
import YearList from '@/components/yearList/YearList';
import { Movie } from '@/utils/type/MovieType';
import React, { useEffect } from 'react';
import styled from 'styled-components';

interface YearMainProps {
  data: Movie[];
  year: string;
  idx: string;
}

function YearMain({ data, year, idx }: YearMainProps) {
  return (
    <WrapperBlock>
      <Category />
      <YearList year={year} data={data} idx={idx} />
    </WrapperBlock>
  );
}

export default YearMain;

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

export const getServerSideProps = async (context: any) => {
  const params = context.params.parmas;

  const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY_AUTH;
  // params가 undefined인지 확인하고, 해당 경우 기본값인 year와 idx를 설정
  let year = new Date().getFullYear().toString();
  let idx = '1';
  if (params[0]) {
    year = params[0];
  }

  if (params[1]) {
    idx = params[1];
  }
  const response = await fetch(
    `https://main.drpe221ejddia.amplifyapp.com/api/movie/${year}/${idx}`,
  );

  const { results } = await response.json();

  return {
    props: {
      data: results,
      year,
      idx,
    },
  };
};
