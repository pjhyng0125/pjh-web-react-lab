import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import '@fullcalendar/common/main.css'; // 공통 스타일

// interface EventInput {
//   title: string;
//   date: string; // YYYY-MM-DD 형식
//   id?: string;
//   start?: string;
//   end?: string;
//   allDay?: boolean;
// }

const Fullcalendar = () => {
  return (
    <div>
      <h2>📅 내 캘린더</h2>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          start: '', // 왼쪽: 비움
          center: 'title', // 중앙: 캘린더 제목만
          end: '', // 오른쪽: 비움
        }}
        events={[
          { title: '회의', date: '2025-06-20' },
          { title: '디자인 리뷰', date: '2025-06-22' },
        ]}
      />
    </div>
  );
};

export default Fullcalendar;
