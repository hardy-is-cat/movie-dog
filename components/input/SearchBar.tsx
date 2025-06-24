import { FormEvent, useRef, useState } from 'react';
import { useRouter } from 'next/router';

import styled from 'styled-components';

import useModal from '@/utils/useModal';

import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

type SearchBarTypes = {
  width?: number;
  className?: string;
};

function SearchBar({ width = 100, className = 'SearchBar' }: SearchBarTypes) {
  const router = useRouter();
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { modal: searchModal, toggleModal: toggleSearchModal } =
    useModal('searchModal');

  const focusInput = () => {
    setIsFocused(true);
  };

  const blurInput = () => {
    setIsFocused(false);
  };

  const searchMovie = (e: FormEvent<HTMLFormElement>) => {
    if (inputRef.current!.value) {
      e.preventDefault();
      router.push({
        pathname: `/search`,
        query: { keyword: inputRef.current!.value },
      });
      inputRef.current!.value = '';
      toggleSearchModal(searchModal.isOpened);
    } else {
      e.preventDefault();
      alert('검색어를 입력해주세요.');
    }
  };

  return (
    <SearchBox width={width} className={className} onSubmit={searchMovie}>
      <InputBlock
        type="text"
        placeholder="검색어를 입력해주세요."
        onFocus={focusInput}
        onBlur={blurInput}
        ref={inputRef}
      />
      <ButtonBlock type="submit" isFocused={isFocused}>
        <span className="a11y-hidden">검색하기</span>
        <SearchRoundedIcon />
      </ButtonBlock>
    </SearchBox>
  );
}

export default SearchBar;

const SearchBox = styled.form<{ width: number }>`
  position: relative;
  width: ${({ width }) => width + '%'};
`;

const InputBlock = styled.input`
  width: 100%;
  padding: 8px 10px;
  font-size: ${({ theme }) => theme.fontSize.discription};
  color: ${({ theme }) => theme.colors.black};
  border: 1px solid ${({ theme }) => theme.colors.gray1};
  border-radius: 4px;
  transition: all 0.15s;

  ::placeholder {
    color: ${({ theme }) => theme.colors.gray1};
  }

  :focus {
    outline: none;
    border: 1px solid ${({ theme }) => theme.colors.brown5};
  }
`;

const ButtonBlock = styled.button<{ isFocused: boolean }>`
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  height: 100%;
  border: none;
  background: none;
  color: ${({ theme }) => theme.colors.gray1};
  cursor: pointer;

  svg {
    display: flex;
    align-items: center;
    font-size: ${({ theme }) => theme.fontSize.headline2};
    color: ${({ theme, isFocused }) => {
      if (isFocused === true) return theme.colors.brown5;
    }};
    transition: all 0.15s;
  }
`;
