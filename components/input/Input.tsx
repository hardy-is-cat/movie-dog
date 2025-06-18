import theme from '@/styles/theme';
import styled from 'styled-components';

import ErrorRoundedIcon from '@mui/icons-material/ErrorRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';

type InputTypes = {
  type?: string;
  placeholder?: string;
  width?: number;
  helperText?: string;
  disabled?: boolean;
  state?: string;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function Input({
  type = 'text',
  placeholder = '검색어를 입력해주세요',
  width = 100,
  helperText,
  disabled,
  state,
  className = 'Input',
  onChange,
}: InputTypes) {
  const helperIcon: { [key: string]: JSX.Element } = {
    error: <ErrorRoundedIcon />,
    warning: <WarningRoundedIcon />,
    correct: <CheckCircleRoundedIcon />,
    info: <InfoRoundedIcon />,
  };

  return (
    <div className={className}>
      <InputBlock
        onChange={onChange}
        type={type}
        placeholder={placeholder}
        width={width}
        disabled={disabled}
      />
      <HelperTextBlock state={state}>
        {state === undefined ? '' : helperIcon[state]}
        <p>{helperText}</p>
      </HelperTextBlock>
    </div>
  );
}

export default Input;

const InputBlock = styled.input<InputTypes>`
  width: ${({ width }) => width + '%'};
  padding: 10px;
  font-size: ${({ theme }) => theme.fontSize.discription};
  color: ${({ theme }) => theme.colors.black};
  border: 1px solid ${theme.colors.gray1};
  border-radius: 4px;
  height: 40px;

  ::placeholder {
    color: ${({ theme }) => theme.colors.gray1};
  }

  :disabled {
    background-color: #e0e0e0;
  }
`;

const HelperTextBlock = styled.div<{ state: string | undefined }>`
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  gap: 2px;
  margin-top: 6px;
  text-align: left;
  color: ${({ state }) => {
    if (state === 'error') return theme.colors.error;
    if (state === 'correct') return theme.colors.correct;
    if (state === 'warning') return theme.colors.warning;
    if (state === 'info') return theme.colors.info;
    if (state === 'default') return theme.colors.gray1;
  }};

  p {
    font-size: ${({ theme }) => theme.fontSize.helperText};
  }
  */ svg {
    font-size: ${({ theme }) => theme.fontSize.discription};
    color: ${({ state }) => {
      if (state === 'error') return theme.colors.error;
      if (state === 'correct') return theme.colors.correct;
      if (state === 'warning') return theme.colors.warning;
      if (state === 'info') return theme.colors.info;
    }};
  }
`;
