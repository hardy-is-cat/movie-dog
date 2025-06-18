'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import styled from 'styled-components';

import { genreNameObj, yearCategory } from '@/pages/api/data';

function GenreSideBar() {
  const pathName = usePathname();
  const searchParams = useSearchParams();

  return (
    <SidebarBlock>
      <h2>장르별 영화</h2>
      <ul>
        {pathName.includes('genre') &&
          Object.keys(genreNameObj).map((genreId) => {
            return (
              <li
                key={genreId}
                className={genreId === pathName.slice(12) ? 'active' : ''}
              >
                <Link href={`/list/genre/${genreId}?page=1`}>
                  {genreNameObj[genreId]}
                </Link>
              </li>
            );
          })}
        {pathName.includes('year') &&
          yearCategory.map((yearObj) => {
            return (
              <li
                key={yearObj.yearScope}
                className={
                  searchParams
                    .toString()
                    .includes(
                      `startYear=${yearObj.startYear}&endYear=${yearObj.endYear}`,
                    )
                    ? 'active'
                    : ''
                }
              >
                <Link
                  href={`/list/year?startYear=${yearObj.startYear}&endYear=${yearObj.endYear}&page=1`}
                >
                  {yearObj.yearScope}
                </Link>
              </li>
            );
          })}
      </ul>
    </SidebarBlock>
  );
}

export default GenreSideBar;

const SidebarBlock = styled.aside`
  h2 {
    padding: 12px 20px;
    background-color: ${({ theme }) => theme.colors.brown5};
    border-radius: 4px 4px 0 0;
    color: ${({ theme }) => theme.colors.brown1};
    font-size: ${({ theme }) => theme.fontSize.headline4};
    font-weight: 700;
  }

  ul {
    display: flex;
    flex-flow: row;
    flex-wrap: wrap;
    gap: 20px 30px;
    padding: 12px 20px;
    border: 1px solid ${({ theme }) => theme.colors.gray1};
    border-top: none;
    border-radius: 0 0 4px 4px;

    @media (min-width: 1000px) {
      flex-flow: column;
      gap: 0px;
    }
  }

  li {
    color: ${({ theme }) => theme.colors.gray1};

    &.active {
      color: ${({ theme }) => theme.colors.brown9};
      font-weight: 700;
    }

    a {
      color: inherit;
    }

    @media (min-width: 1000px) {
      margin-bottom: 12px;
    }
  }

  li:last-child {
    margin-bottom: 0;
  }
`;
