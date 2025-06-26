import styled from '@emotion/styled';
import { useState } from 'react';

type Props = {
  title: string;
  value: string;
  onChange: (newValue: number) => void;
  //   onChangeInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Container = styled.div`
  width: 100%;
  max-width: 500px;
  margin: 0 auto; /* 수평 가운데 정렬 */
  padding: 0 16px; /* 좌우 여백 */
  display: flex;
  gap: 20px;
  align-items: center;
`;

const Span = styled.span`
  width: 20%;
`;
const NumberInput = styled.input`
  cursor: pointer;
  width: 100%;
  font-size: 14px;
  border: 1px solid black;
  border-radius: 5px;
  padding: 12px, 6px;
  height: 30px;
  box-sizing: border-box;
`;

const PhoneNumberInput = ({ title, onChange }: Props) => {
  const [inputValue, setInputValue] = useState<number>(0);

  const onChangeInput = () => {
    setInputValue(inputValue);
    onChange(inputValue);
  };

  return (
    <div>
      <h2>☎️ PhoneNumberInput</h2>
      <Container>
        <Span>{title}</Span>
        <NumberInput
          placeholder="010-0000-0000"
          type="number"
          onChange={onChangeInput}
          value={inputValue}
        />
      </Container>
      <p>자식 컴포넌트 입력: {inputValue}</p>
    </div>
  );
};

export default PhoneNumberInput;
