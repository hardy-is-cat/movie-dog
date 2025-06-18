import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import styled from 'styled-components';

import PageNavigatorButton from './buttons/PageNavigatorButton';

type PaginationTypes = {
  currentPage: number;
  totalPages: number;
};

function Pagination({ currentPage, totalPages }: PaginationTypes) {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  // prev, next 버튼을 눌렀을 때 이동할 페이지 계산
  // prev 버튼은 현재 페이지 목록의 이전 목록의 제일 끝으로 이동(1의 자리가 0)
  const calcPrevEndIndex = (currentPage: number) => {
    return Math.floor((currentPage - 1) / 10) * 10;
  };
  // next 버튼은 현재 페이지 목록의 다음 목록의 제일 처음으로 이동(1의 자리가 1)
  const calcNextStartIndex = (currentPage: number) => {
    const currentGroupIndex = Math.floor((currentPage - 1) / 10);
    return (currentGroupIndex + 1) * 10 + 1;
  };

  // 페이지 번호 목록 만드는 함수
  const createPageNumArr = (currentPage: number) => {
    const pageNumArr = [];
    const pageStartIndex = Math.floor((currentPage - 1) / 10) * 10 + 1;
    const pageEndIndex = Math.min(pageStartIndex + 9, totalPages);

    for (let i = pageStartIndex; i <= pageEndIndex; i++) {
      pageNumArr.push(i);
    }
    return pageNumArr;
  };

  const handlePageChange = (pageNum: string | number) => {
    if (typeof pageNum === 'number') pageNum = pageNum.toString();
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', pageNum);

    router.push(`${pathName}?${params.toString()}`);
  };

  return (
    <PageButtonWrapper>
      {/* 1~10페이지는 prev 버튼을 노출시키지 않음 */}
      {currentPage >= 11 && (
        <PageNavigatorButton
          direction="prev"
          onClick={() => {
            handlePageChange(calcPrevEndIndex(currentPage));
          }}
        />
      )}
      {createPageNumArr(currentPage).map((pageNum) => (
        <PageNumButton
          key={pageNum}
          className={currentPage === pageNum ? 'active' : ''}
          onClick={() => {
            handlePageChange(pageNum);
          }}
        >
          {pageNum}
        </PageNumButton>
      ))}
      {/* 다음 번호 목록이 totalPages보다 크면 next 버튼을 노출시키지 않음 */}
      {calcNextStartIndex(currentPage) <= totalPages && (
        <PageNavigatorButton
          direction="next"
          onClick={() => {
            handlePageChange(calcNextStartIndex(currentPage));
          }}
        />
      )}
    </PageButtonWrapper>
  );
}

export default Pagination;

const PageButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
`;

const PageNumButton = styled.button`
  width: 2em;
  height: 2em;
  color: ${({ theme }) => theme.colors.brown5};
  font-size: ${({ theme }) => theme.fontSize.headline5};
  font-weight: 700;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  background: none;

  &.active {
    background-color: ${({ theme }) => theme.colors.brown5};
    color: ${({ theme }) => theme.colors.white};
  }
`;
