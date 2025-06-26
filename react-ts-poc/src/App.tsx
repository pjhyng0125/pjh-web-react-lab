import Reactcalendar from '@components/Reactcalendar';
import Fullcalendar from '@components/Fullcalendar';
import PhoneNumberInput from '@components/PhoneNumberInput';
import './App.css';
import { useState, type ChangeEvent } from 'react';

function App() {
  // const [manPhoneNumber, setManPhoneNumber] = useState<number>(0);
  const [num, setNum] = useState<string>('');

  const onChange = (newValue: string) => {
    setNum(newValue);
  };

  const onChange2 = (e: ChangeEvent<HTMLInputElement>) => {
    setNum(e.target.value);
  };

  return (
    <>
      <div>
        <input value={num} onChange={onChange2} />
        <p>입력된 번호: {num}</p>
        <PhoneNumberInput title="신랑" value={num} onChange={onChange} />
        <p>입력된 번호: {num}</p>
        <Fullcalendar />
        <Reactcalendar />
      </div>
    </>
  );
}

export default App;
