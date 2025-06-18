import styled from 'styled-components';
import GithubIcon from '../../public/images/icons/icon_github.svg';
import GoogleIcon from '../../public/images/icons/icon_google.svg';
import CreateRoundedIcon from '@mui/icons-material/CreateRounded';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';

const buttonIcons = {
  github: <GithubIcon />,
  google: <GoogleIcon />,
  write: <CreateRoundedIcon />,
  favorite: <FavoriteBorderRoundedIcon />,
  'favorite-fill': <FavoriteRoundedIcon />,
} as const;

type IconTypes = keyof typeof buttonIcons;

type ButtonProps = {
  text?: string;
  width?: number;
  disabled?: boolean;
  active?: boolean;
  icon?: IconTypes;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export default function ConfirmButton({
  text = '확인',
  width = 100,
  disabled,
  active,
  icon,
  className,
  onClick,
}: ButtonProps) {
  return (
    <>
      <ButtonBlock
        onClick={onClick}
        disabled={disabled}
        width={width}
        className={`${className} ${active && 'active'}`}
      >
        {icon && buttonIcons[icon]}
        <span>{text}</span>
      </ButtonBlock>
    </>
  );
}

const ButtonBlock = styled.button<{ width: number }>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  width: ${({ width }) => width + '%'};
  padding: 8px 10px;
  color: ${({ theme }) => theme.colors.brown5};
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.brown5};
  border-radius: 4px;
  transition: all 0.2s;
  cursor: pointer;

  span {
    font-size: ${({ theme }) => theme.fontSize.discription};
    font-weight: 700;
    flex-grow: 1;
  }

  &.active {
    color: ${({ theme }) => theme.colors.white};
    background-color: ${({ theme }) => theme.colors.brown5};
  }

  &:hover {
    color: ${({ theme }) => theme.colors.white};
    background-color: ${({ theme }) => theme.colors.brown5};

    svg path {
      fill: ${({ theme }) => theme.colors.white};
    }
  }

  &.active:hover {
    color: ${({ theme }) => theme.colors.brown5};
    background-color: ${({ theme }) => theme.colors.white};
  }

  &:disabled {
    color: white;
    background-color: ${({ theme }) => theme.colors.gray1};
    border: 1px solid ${({ theme }) => theme.colors.gray1};
    cursor: not-allowed;
  }
`;
