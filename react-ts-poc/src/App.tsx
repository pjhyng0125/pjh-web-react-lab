import Reactcalendar from '@components/Reactcalendar';
import Fullcalendar from '@components/Fullcalendar';
import PhoneNumberInput from '@components/PhoneNumberInput';
// import FlatPickr from '@components/MultiDatePicker';
import Modal from '@components/Modal';
import './App.css';
import { useState, type ChangeEvent } from 'react';

type Person = {
  name: string;
  number: string;
};

type PersonInfo = {
  groom: Person;
  bride: Person;
  father: Person;
  mother: Person;
};

function App() {
  const [phoneNumbers, setPersonInfo] = useState<PersonInfo>({
    groom: {
      name: '박진형',
      number: '01012345678',
    },
    bride: {
      name: '배혜빈',
      number: '01012345678',
    },
    father: {
      name: '박도원',
      number: '01012345678',
    },
    mother: {
      name: '권숙희',
      number: '01012345678',
    },
  });

  // PhoneNumberInput input 객체 change 이벤트 함수
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    // input name, value 속성 구조 분해 할당
    const { name, value } = e.target;

    // 업데이트 함수형 패턴: set* 비동기 함수 -> 이전 상태 가져와서 최신 값 기준 갱신 목적
    setPersonInfo((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <div>
        <h2>모달창</h2>
        <Modal />

        {/* <h2>📆 날짜 다중 선택 - flatpickr</h2>
        <FlatPickr /> */}

        <h2>☎️ 연락처 - PhoneNumberInput</h2>
        <PhoneNumberInput
          title="신랑"
          name="groom"
          value={phoneNumbers.groom.number}
          onChange={onChange}
        />
        <PhoneNumberInput
          title="신부"
          name="bride"
          value={phoneNumbers.bride.number}
          onChange={onChange}
        />
        <PhoneNumberInput
          title="아버님"
          name="father"
          value={phoneNumbers.father.number}
          onChange={onChange}
        />
        <PhoneNumberInput
          title="어머님"
          name="mother"
          value={phoneNumbers.mother.number}
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
