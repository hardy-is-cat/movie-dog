import { db } from '@/fbase';
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { ChangeEvent, useEffect, useState } from 'react';
import styled from 'styled-components';

import ConfirmButton from '../buttons/ConfirmButton';
import StarRating from '../StarRating';
import { MovieDetailType } from '@/utils/type/MovieType';

type ReviewModalTypes = {
  movieDetailData: MovieDetailType;
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
};

type ExistReviewTypes = {
  reviewId: string;
  content: string;
  movieId: number;
  movieTitle: string;
  rating: number;
  userNickName: string;
};

function ReviewModal({ movieDetailData, setIsOpened }: ReviewModalTypes) {
  const {
    id: movieId,
    title: movieTitle,
    genres,
    poster_path,
    release_date,
  } = movieDetailData;
  const [reviewText, setReviewText] = useState('');
  const [reviewRating, setReviewRating] = useState(0);
  const [existReview, setExistReview] = useState<ExistReviewTypes>();
  const uid = JSON.parse(localStorage.getItem('userData') || '{}').uid;

  // textarea value 상태 관리
  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (reviewText.length > 99) {
      setReviewText(e.target.value.substring(0, 99));
      return;
    }
    setReviewText(e.target.value);
  };

  // 기존 리뷰가 있을 경우 불러오는 로직
  const loadExistReview = async () => {
    const q = query(
      collection(db, 'reviews'),
      where('movieId', '==', movieId),
      where('uid', '==', uid),
    );
    const querySnapshot = await getDocs(q);

    // 페이지 이동시 existReview 초기화
    if (!querySnapshot.docs[0]) {
      setExistReview({
        reviewId: '',
        content: '',
        movieId: 0,
        movieTitle: '',
        rating: 0,
        userNickName: '',
      });
      setReviewText('');
      setReviewRating(0);
    } else {
      querySnapshot.forEach((doc) => {
        setExistReview({
          reviewId: doc.id,
          content: doc.data().content,
          movieId: doc.data().movieId,
          movieTitle: doc.data().movieTitle,
          rating: doc.data().rating,
          userNickName: doc.data().userNickName,
        });
        setReviewText(doc.data().content);
        setReviewRating(doc.data().rating);
      });
    }
  };

  // 리뷰 작성 및 업데이트 로직
  const submitReview = async () => {
    // 평점이 없으면 경고
    if (!reviewRating) {
      alert('평점은 0.5점 이상이어야 합니다.');
      return;
    }

    // 유저 닉네임 가져오기
    let userNickName;
    const q = query(collection(db, 'users'), where('uid', '==', uid));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      userNickName = doc.data().nickName;
    });

    // 이미 작성된 리뷰가 있을 경우 나눠지는 로직
    if (existReview?.content) {
      alert('리뷰가 수정되었습니다.');
      await updateDoc(doc(db, 'reviews', existReview.reviewId), {
        content: reviewText,
        rating: reviewRating,
        userNickName,
      });
    } else {
      alert('리뷰가 작성되었습니다.');
      await addDoc(collection(db, 'reviews'), {
        content: reviewText,
        genres,
        movieId,
        movieTitle,
        poster_path,
        rating: reviewRating,
        release_date,
        uid,
        userNickName,
      });
    }
    setIsOpened(false);
    location.reload();
  };

  useEffect(() => {
    if (localStorage.getItem('userData')) loadExistReview();
  }, [movieDetailData, movieId]);

  return (
    <>
      <TitleBlock>&lt;{movieTitle}&gt;의 한 줄 평</TitleBlock>
      <StarRating
        rating={reviewRating || 0}
        readonly={false}
        setReviewRating={setReviewRating}
        starSize={20}
      />
      <p>{`(${reviewRating / 2} 점)`}</p>
      <TextBlock
        placeholder="해당 영화의 한 줄 평을 입력해주세요."
        onChange={onChange}
        value={reviewText}
      />
      <LengthBlock>{reviewText.length}/100</LengthBlock>
      <ButtonBlock>
        <ConfirmButton
          text={existReview?.content ? '수정' : '작성'}
          onClick={submitReview}
          disabled={!reviewText}
          active
        />
        <ConfirmButton text="닫기" onClick={() => setIsOpened(false)} />
      </ButtonBlock>
    </>
  );
}

export default ReviewModal;

const TitleBlock = styled.h3`
  margin-bottom: 8px;
  font-size: ${({ theme }) => theme.fontSize.headline3};
  color: ${({ theme }) => theme.colors.black};
  font-weight: 700;
`;

const TextBlock = styled.textarea`
  width: 100%;
  height: 10rem;
  padding: 8px;
  margin: 8px 0;
  border: 1px solid ${({ theme }) => theme.colors.gray1};
  resize: none;
`;

const LengthBlock = styled.p`
  margin-bottom: 8px;
  text-align: right;
`;

const ButtonBlock = styled.div`
  display: flex;
  flex-flow: column;
  gap: 12px;

  @media (min-width: 768px) {
    flex-flow: row;
  }
`;
