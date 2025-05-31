import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';

import StarRating from './StarRating';
import NoPosterIcon from '../public/images/icons/icon_errorface.svg';

import findGenre from '@/utils/findGenre';
import { MovieDetailType } from '@/utils/type/MovieType';

type MovieTypes = {
  movie: MovieDetailType;
  ranking: boolean | number;
};

function Card({ movie, ranking }: MovieTypes) {
  const genre = findGenre(movie.genre_ids)[0];

  return (
    <>
      {movie && (
        <Link href={`/detail/${movie.title}/${movie.id}`}>
          <CardBlock>
            {ranking && <RankingTag>{ranking}</RankingTag>}
            {movie.poster_path ? (
              <ImageBlock>
                <Image
                  src={`http://image.tmdb.org/t/p/w342${movie.poster_path}`}
                  alt={movie.title}
                  fill
                  sizes="(max-width: 768px) 50vw,(max-width: 1200px) 70vw"
                  loading="eager"
                  priority
                />
              </ImageBlock>
            ) : (
              <NoPosterBlock>
                <DescriptionBlock>
                  <NoPosterIcon />
                  <span>포스터 준비중</span>
                </DescriptionBlock>
              </NoPosterBlock>
            )}
            <h3>{movie.title}</h3>
            <p>
              {movie.release_date
                ? movie.release_date.slice(0, 4)
                : '개봉일 정보 없음'}
              ・{findGenre(movie.genre_ids)[0] || '장르 분류 없음'}
            </p>
            <RatingBlock>
              <StarRating
                rating={Math.floor(movie.vote_average)}
                starSize={20}
              />
              <span>
                {Math.floor((movie.vote_average / 2) * 10) / 10 + '점'}(
                {movie.vote_count.toLocaleString() + '명'})
              </span>
            </RatingBlock>
          </CardBlock>
        </Link>
      )}
    </>
  );
}

export default Card;

const RankingTag = styled.span`
  position: absolute;
  top: 8px;
  left: 8px;
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${({ theme }) => theme.fontSize.headline4};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.white};
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 4px;
  z-index: 100;
`;

const ImageBlock = styled.div`
  position: relative;
  padding-bottom: 150%;
  margin-bottom: 8px;
`;

const NoPosterBlock = styled.div`
  position: relative;
  padding-bottom: 150%;
  margin-bottom: 8px;
  background-color: ${({ theme }) => theme.colors.gray0};
`;

const DescriptionBlock = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;

  svg {
    margin-bottom: 8px;
  }

  svg path {
    fill: ${({ theme }) => theme.colors.black};
  }

  span {
    display: block;
    color: ${({ theme }) => theme.colors.black};
  }
`;

const CardBlock = styled.div`
  position: relative;

  img {
    object-fit: cover;
  }

  h3 {
    margin-bottom: 8px;
    font-size: ${({ theme }) => theme.fontSize.headline3};
    font-weight: 700;
    color: ${({ theme }) => theme.colors.black};
  }

  p {
    color: ${({ theme }) => theme.colors.gray1};
  }
`;

const RatingBlock = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;

  span {
    color: ${({ theme }) => theme.colors.black};
  }
`;
