import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDataListStore } from '../../stores/DataListStores';

function SetterPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const parsedId = id ? Number(id) : NaN;
  const isEditMode = Number.isFinite(parsedId);

  const selectedData = useDataListStore((state) =>
    isEditMode ? state.dataList.find((item) => item.id === parsedId) : undefined
  );
  const addData = useDataListStore((state) => state.addData);
  const updateData = useDataListStore((state) => state.updateData);
  const setLoading = useDataListStore((state) => state.setLoading);

  const [inputValue, setInputValue] = useState('');
  const [inputNumber, setInputNumber] = useState('');

  useEffect(() => {
    if (!isEditMode) {
      return;
    }

    if (selectedData) {
      setInputValue(selectedData.value);
      setInputNumber(String(selectedData.number));
    }
  }, [isEditMode, selectedData]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputNumber(event.target.value);
  };

  const handleSubmit = () => {
    const parsedNumber = inputNumber === '' ? 0 : Number(inputNumber);

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);

    if (isEditMode) {
      updateData(parsedId, { value: inputValue, number: parsedNumber });
    } else {
      addData({ value: inputValue, number: parsedNumber });
    }
    navigate('/');
  };

  return (
    <main className='p-4'>
      <h1>{isEditMode ? `Edit Data ${id}` : 'Setter Page'}</h1>

      <div className='flex gap-4 mt-4'>
        <input
          className='border border-gray-300 rounded px-4 py-2'
          type="text"
          value={inputValue}
          onChange={handleChange}
          placeholder="Input value..."
        />

        <input
          className='border border-gray-300 rounded px-4 py-2'
          type="number"
          value={inputNumber}
          onChange={handleNumberChange}
          onFocus={() => {
            if (inputNumber === '0') {
              setInputNumber('');
            }
          }}
          placeholder="Input number..."
        />

        <button type="button" className='bg-blue-900 p-4 text-center text-white' onClick={handleSubmit}>
          {isEditMode ? 'Update' : 'Submit'}
        </button>
      </div>
    </main>
  );
}

export default SetterPage;
