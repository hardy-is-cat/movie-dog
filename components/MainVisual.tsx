import Link from 'next/link';

import styled from 'styled-components';

import { MovieListsDetailType } from '@/utils/type/MovieType';
import findGenre from '@/utils/findGenre';

function MainVisual({ movie }: { movie: MovieListsDetailType }) {
  return (
    <>
      <ImageBGBlock backdrop={movie.backdrop_path}>
        <OverlayBGBlock>
          <DescriptionBlock>
            <h3>{movie.title}</h3>
            <p>
              {findGenre(movie.genre_ids).length === 0
                ? '장르 분류 없음'
                : findGenre(movie.genre_ids).join(' ・ ')}
            </p>
            <p>
              {movie.overview.split(' ', 40).length === 40
                ? movie.overview.split(' ', 40).join(' ') + '...'
                : movie.overview.split(' ', 40).join(' ')}
            </p>
            <Link href={`/detail/${movie.original_title}/${movie.id}`}>
              상세정보
            </Link>
          </DescriptionBlock>
        </OverlayBGBlock>
      </ImageBGBlock>
    </>
  );
}

export default MainVisual;

const ImageBGBlock = styled.div<{ backdrop: string | null }>`
  height: 600px;
  background-image: ${({ backdrop }) => {
    return `url(http://image.tmdb.org/t/p/w1280${backdrop})`;
  }};
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;

  @media (min-width: 1200px) {
    height: 500px;
  }
`;

const OverlayBGBlock = styled.div`
  position: relative;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
`;

const DescriptionBlock = styled.div`
  position: absolute;
  width: 80%;
  bottom: 50px;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  color: ${({ theme }) => theme.colors.white};

  @media (min-width: 320px) {
  }
  @media (min-width: 768px) {
    width: 40%;
    top: 50%;
    bottom: auto;
    left: 5%;
    transform: translateY(-50%);
    text-align: left;
  }
  @media (min-width: 1200px) {
  }

  h3 {
    font-size: ${({ theme }) => theme.fontSize.headline3};
    font-weight: 700;
    margin-bottom: 12px;
  }

  p {
    word-break: keep-all;
    margin-bottom: 12px;
  }

  a {
    display: inline-block;
    padding: 8px 16px;
    background-color: ${({ theme }) => theme.colors.brown6};
    color: ${({ theme }) => theme.colors.white};
    font-size: ${({ theme }) => theme.fontSize.discription};
    text-decoration: none;
    border: none;
    border-radius: 4px;
    transition: all 0.25s;

    &:hover {
      background-color: ${({ theme }) => theme.colors.white};
      color: ${({ theme }) => theme.colors.brown6};
    }
  }
`;
