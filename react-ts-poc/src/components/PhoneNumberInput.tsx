import styled from '@emotion/styled';
import { type ChangeEvent } from 'react';

type Props = {
  title: string;
  value: string;
  name: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const PhoneNumberInput = ({ title, value, name, onChange }: Props) => {
  return (
    <div>
      <Container>
        <Span>{title}</Span>
        <NumberInput
          placeholder="010-0000-0000"
          type="text"
          maxLength={11}
          name={name}
          value={value}
          onChange={onChange}
        />
      </Container>
      {/* <p>자식 컴포넌트 입력: {inputValue}</p> */}
    </div>
  );
};

const Container = styled.div`
  width: 100%;
  max-width: 320px;
  margin: 0 auto; /* 수평 가운데 정렬 */
  padding: 16px 16px; /* 위아래, 좌우 여백 */
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
  padding: 12px 6px;
  height: 30px;
  /* box-sizing: border-box; */
`;

export default PhoneNumberInput;
