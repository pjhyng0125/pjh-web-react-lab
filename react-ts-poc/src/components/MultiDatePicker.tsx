import { useState } from 'react';
import flatpickr from 'flatpickr';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/material_blue.css'; // 테마 CSS
type FlatpickrInstance = flatpickr.Instance;

const MultiDatePicker = () => {
  const [dates, setDates] = useState<string[]>([]);

  return (
    <div style={{ maxWidth: 300, margin: '0 auto', padding: '2rem' }}>
      <h2>📅 다중 날짜 선택</h2>
      <Flatpickr
        options={{
          mode: 'multiple',
          dateFormat: 'Y-m-d',
          // defaultDate: new Date(), // 오늘 날짜 기본 선택
          minDate: 'today', // 오늘 이후만 선택 가능
        }}
        // value={dates}
        onClose={(
          selectedDates: Date[],
          _dateStr: string,
          _instance: FlatpickrInstance,
        ) => {
          setDates(selectedDates.map((date) => date.toLocaleDateString()));
          console.log('onClose : ' + _dateStr);
          _instance.clear();
        }}
        onChange={(
          selectedDates: Date[],
          _dateStr: string,
          _instance: FlatpickrInstance,
        ) => {
          // n개 선택 후 달력 닫기
          if (selectedDates.length >= 3) {
            _instance.close();
          }
        }}
      />
      <div>
        <p>선택한 날짜:</p>
        <ul>
          {dates.map((date, index) => (
            <li key={index}>{date}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MultiDatePicker;
