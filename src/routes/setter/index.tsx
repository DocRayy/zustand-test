import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDataListStore } from '../../stores/DataListStores';

function SetterPage() {
  const navigate = useNavigate();
  const setValue = useDataListStore((state) => state.setValue);
  const setNumber = useDataListStore((state) => state.setNumber);
  const setLoading = useDataListStore((state) => state.setLoading);

  const [inputValue, setInputValue] = useState('');
  const [inputNumber, setInputNumber] = useState(0);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputNumber(Number(event.target.value));
  };

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);

    setValue(inputValue);
    setNumber(inputNumber);
    navigate('/');
  };

  return (
    <main className='p-4'>
      <h1>Setter Page</h1>

      <div className='flex gap-4 mt-4'>
        <input
          className='border border-gray-300 rounded px-4 py-2'
          type="text"
          value={inputValue}
          onChange={handleChange}
          placeholder="Input value..."
          // onChange={(e) => setData({ value: e.target.value })}
        />

        <input
          className='border border-gray-300 rounded px-4 py-2'
          type="number"
          value={inputNumber}
          onChange={handleNumberChange}
          placeholder="Input number..."
        />

        <button type="button" className='bg-blue-900 p-4 text-center text-white' onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </main>
  );
}

export default SetterPage;
