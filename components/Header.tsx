import Link from 'next/link';
import { useRouter } from 'next/router';
import { SetStateAction, useEffect, useState } from 'react';

import { authService } from '@/fbase';
import { useRecoilState } from 'recoil';
import { LoginsState } from '@/stores/LoginState';

import styled from 'styled-components';

import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import PermIdentityRoundedIcon from '@mui/icons-material/PermIdentityRounded';

import Logo from '../public/MovieDogLogo.png';

import useModal from '@/utils/useModal';

import ConfirmButton from './buttons/ConfirmButton';
import SearchBar from './input/SearchBar';
import ModeButton from './buttons/ModeButton';
import Modal from './modal/Modal';

export function Header() {
  const router = useRouter();

  const [isTabBarShowing, setIsTabBarShowing] = useState(true);
  const { modal: searchModal, toggleModal: toggleSearchModal } =
    useModal('searchModal');

  const [isLogin, setIsLogin] = useRecoilState(LoginsState);

  const currentYear = new Date().getFullYear().toString();

  const checkedLogin = () => {
    const isLogin = window.localStorage.getItem('userData');
    if (!isLogin) {
      return;
    }
    setIsLogin(true);
  };

  useEffect(() => {
    checkedLogin();

    let lastScrollY = document.defaultView?.scrollY;

    const onScroll = () => {
      const presentScrollY = document.defaultView?.scrollY;

      if (lastScrollY !== undefined && presentScrollY !== undefined) {
        if (lastScrollY < presentScrollY) {
          setIsTabBarShowing(true);
        } else {
          setIsTabBarShowing(false);
        }
        lastScrollY = document.defaultView?.scrollY;
      }
    };

    window.addEventListener('scroll', onScroll);

    return () => window.addEventListener('scroll', onScroll);
  }, []);

  const logout = () => {
    const data = confirm('로그아웃하시겠습니까?');
    if (data) {
      window.localStorage.removeItem('userData');
      setIsLogin(false);
      authService.signOut();
      if (router.pathname === '/mypage') {
        router.push('/');
      } else {
        location.reload();
      }
    }
  };

  return (
    <HeaderBlock>
      <ModalBlock>
        {searchModal.isOpened && (
          <Modal
            isOpened={searchModal.isOpened}
            setIsOpened={() => toggleSearchModal(searchModal.isOpened)}
          >
            <SearchBar />
          </Modal>
        )}
      </ModalBlock>
      <WrapperBlock>
        <FlexContainer className="left-block">
          <Link href="/">
            <LogoIMG src={Logo.src} alt="로고" />
          </Link>
          <nav className="pc-nav">
            <ul>
              <ListItem>
                <Link href="/list/genre/12?page=1">장르별</Link>
              </ListItem>
              <ListItem>
                <Link href={'/list/year?startYear=2020&endYear=2025&page=1'}>
                  년도별
                </Link>
              </ListItem>
              {isLogin && (
                <ListItem>
                  <Link href="/mypage" className="pc-nav">
                    마이페이지
                  </Link>
                </ListItem>
              )}
            </ul>
          </nav>
        </FlexContainer>
        <FlexContainer className="right-block">
          <SearchBar className="pc-nav" />
          {isLogin === false ? (
            <Link href="/login">
              <ConfirmButton className="login-btn" text="로그인" />
            </Link>
          ) : (
            <>
              <ConfirmButton
                onClick={logout}
                className="login-btn"
                text="로그아웃"
              />
            </>
          )}
          <ModeButton mode="light" />
        </FlexContainer>
      </WrapperBlock>
      <TabBarBlock className={isTabBarShowing ? '' : 'hide'}>
        <ul>
          <li className={router.pathname === '/' ? 'active' : ''}>
            <Link href="/list/genre/12?page=1">
              <MenuRoundedIcon fontSize="large" />
              <span>장르별</span>
            </Link>
          </li>
          <li className={router.pathname === '/search' ? 'active' : ''}>
            <button onClick={() => toggleSearchModal(searchModal.isOpened)}>
              <SearchRoundedIcon fontSize="large" />
              <span>검색</span>
            </button>
          </li>
          <li
            className={
              router.pathname === '/login' || router.pathname === '/mypage'
                ? 'active'
                : ''
            }
          >
            <Link href={isLogin ? '/mypage' : '/login'}>
              <PermIdentityRoundedIcon fontSize="large" />
              <span>{isLogin ? '마이페이지' : '로그인'}</span>
            </Link>
          </li>
        </ul>
      </TabBarBlock>
    </HeaderBlock>
  );
}

const HeaderBlock = styled.header`
  width: 100%;
  height: 120px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.brown5};

  .pc-nav {
    display: none;
  }

  @media (min-width: 768px) {
    .pc-nav {
      display: block;
    }
  }
`;

const ModalBlock = styled.div`
  @media (min-width: 768px) {
    display: none;
  }
`;

const WrapperBlock = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 1200px;
  height: 100%;
  padding: 0 20px;
  margin: 0 auto;
`;

const FlexContainer = styled.div`
  display: flex;
  align-items: center;

  &.right-block {
    gap: 10px;
    justify-content: flex-end;
  }

  .login-btn {
    width: 120px;
  }
`;

const LogoIMG = styled.img`
  margin-right: 24px;

  @media (min-width: 800px) {
    margin-right: 48px;
  }
`;

const ListItem = styled.li`
  margin-right: 10px;
  display: inline-block;
  font-weight: 700;
  font-size: ${({ theme }) => theme.fontSize.headline3};

  a {
    color: ${({ theme }) => theme.colors.brown9};
  }

  @media (min-width: 800px) {
    margin-right: 24px;
  }
`;

const TabBarBlock = styled.nav`
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: 10px 0;
  border-top: 1px solid ${({ theme }) => theme.colors.brown5};
  background-color: ${({ theme }) => theme.colors.white};
  z-index: 200;
  transition: all 0.5s;

  &.hide {
    bottom: -100%;
    transition: all 0.5s;
  }

  ul {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 80%;
    margin: 0 auto;
    color: ${({ theme }) => theme.colors.gray1};

    svg {
      margin-bottom: 4px;
    }
  }

  li a,
  li button {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: transparent;
    border: none;
    font-size: inherit;
    color: inherit;
    line-height: inherit;
    cursor: pointer;
  }

  li.active {
    color: ${({ theme }) => theme.colors.brown6};
  }

  @media (min-width: 768px) {
    display: none;
  }
`;
