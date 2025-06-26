import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styled from '@emotion/styled';
import type { CalendarProps } from 'react-calendar';

type DateType = CalendarProps['value']; // Date | Date[] | null,

const Container = styled.div`
  width: 100%;
  max-width: 320px;
  margin: 0 auto; /* 수평 가운데 정렬 */
  padding: 2rem; /* 좌우 여백 */
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Reactcalendar = () => {
  const [value, setValue] = useState<DateType>(new Date());

  const handleDateChange: CalendarProps['onChange'] = (val) => {
    setValue(val);
  };

  return (
    <div>
      <h2>📅 Reactcalendar</h2>
      <Container>
        <Calendar
          onChange={handleDateChange}
          value={value}
          locale="ko-KR"
          prevLabel={null}
          nextLabel={null}
          prev2Label={null}
          next2Label={null}
        />
        <p>선택한 날짜: {value instanceof Date ? value.toDateString() : ''}</p>
      </Container>
    </div>
  );
};

export default Reactcalendar;
