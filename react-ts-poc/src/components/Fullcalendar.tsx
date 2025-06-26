import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import '@fullcalendar/common/main.css'; // 공통 스타일
import styled from '@emotion/styled';

const Container = styled.div`
  width: 100%;
  max-width: 320px;
  margin: 0 auto; /* 수평 가운데 정렬 */
  padding: 0 16px; /* 좌우 여백 */
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Fullcalendar = () => {
  return (
    <div>
      <h2>📅 fullcalendar</h2>
      <Container>
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            start: '', // 왼쪽: 비움
            center: '', // 중앙: 캘린더 제목만
            end: '', // 오른쪽: 비움
          }}
          events={[{ title: '결혼식', date: '2025-06-14' }]}
          fixedWeekCount={false}
          contentHeight="auto"
        />
      </Container>
    </div>
  );
};

export default Fullcalendar;
