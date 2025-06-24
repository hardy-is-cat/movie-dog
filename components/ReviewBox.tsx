import styled from 'styled-components';

import StarRating from './StarRating';
import LikeButton from './buttons/LikeButton';
import Link from 'next/link';

type ReviewBoxTypes = {
  review: {
    movieId: number;
    movieTitle: string;
    userNickName: string;
    content: string;
    rating: number;
  };
};

function ReviewBox({ review }: ReviewBoxTypes) {
  const { movieId, movieTitle, userNickName, content, rating } = review;
  return (
    <ReviewBoxBlock>
      <RatingComponentBlock rating={rating} starSize={24} />
      <p>{content}</p>
      <h3>
        <Link href={`/detail/${movieId}`}>- {movieTitle}</Link>
      </h3>
      <span>By {userNickName}</span>
      {/* <LikeButtonBlock count={like} /> */}
    </ReviewBoxBlock>
  );
}

export default ReviewBox;

const ReviewBoxBlock = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px 28px;
  border: 1px solid ${({ theme }) => theme.colors.brown5};
  border-radius: 10px;
  color: ${({ theme }) => theme.colors.brown8};
  background-color: ${({ theme }) => theme.colors.brown1};

  p {
    margin-bottom: 8px;
    color: ${({ theme }) => theme.colors.brown8};
  }

  h3 {
    margin-bottom: 8px;
    font-size: ${({ theme }) => theme.fontSize.headline5};
    font-weight: 700;
    font-size: ${({ theme }) => theme.fontSize.headline5};
    color: ${({ theme }) => theme.colors.brown6};

    a {
      color: inherit;
    }
  }

  span {
    margin-bottom: 10px;
    font-size: ${({ theme }) => theme.fontSize.discription};
    color: ${({ theme }) => theme.colors.brown6};
  }
`;

const RatingComponentBlock = styled(StarRating)`
  margin-bottom: 8px;
`;

const LikeButtonBlock = styled(LikeButton)`
  margin-left: auto;
`;
