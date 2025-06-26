import Reactcalendar from '@components/Reactcalendar';
import Fullcalendar from '@components/Fullcalendar';
import PhoneNumberInput from '@components/PhoneNumberInput';
import './App.css';
import { useState, type ChangeEvent } from 'react';

type PhoneNumbers = {
  groom: string;
  bride: string;
  father: string;
  mother: string;
};

function App() {
  const [phoneNumbers, setPhoneNumbers] = useState<PhoneNumbers>({
    groom: '',
    bride: '',
    father: '',
    mother: '',
  });

  // PhoneNumberInput input 객체 change 이벤트 함수
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    // input name, value 속성 구조 분해 할당
    const { name, value } = e.target;

    // 업데이트 함수형 패턴: set* 비동기 함수 -> 이전 상태 가져와서 최신 값 기준 갱신 목적
    setPhoneNumbers((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <div>
        <h2>☎️ 연락처 - PhoneNumberInput</h2>
        <PhoneNumberInput
          title="신랑"
          name="groom"
          value={phoneNumbers.groom}
          onChange={onChange}
        />
        <PhoneNumberInput
          title="신부"
          name="bride"
          value={phoneNumbers.bride}
          onChange={onChange}
        />
        <PhoneNumberInput
          title="아버님"
          name="father"
          value={phoneNumbers.father}
          onChange={onChange}
        />
        <PhoneNumberInput
          title="어머님"
          name="mother"
          value={phoneNumbers.mother}
          onChange={onChange}
        />

        <h2>📅 예식 일자 - fullcalendar</h2>
        <Fullcalendar />

        <h2>📅 예식 일자 - Reactcalendar</h2>
        <Reactcalendar />
      </div>
    </>
  );
}

export default App;
