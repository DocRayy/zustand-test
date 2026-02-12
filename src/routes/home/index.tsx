import { Link } from 'react-router-dom';
import { useDataListStore } from '../../stores/DataListStores';

function HomePage() {
  const dataList = useDataListStore((state) => state.dataList);
  const deleteData = useDataListStore((state) => state.deleteData);
  const numbers = [10, 20, 30, 40, 50];

  const mappedNumbers = numbers.map((num) => num * 2);
  const reducedTotal = numbers.reduce((acc, num) => acc + num, 0);
  const slicedNumbers = numbers.slice(1, 4);
  const filteredNumbers = numbers.filter((num) => num >= 30);
  const forEachResult: string[] = [];
  numbers.forEach((num, index) => {
    forEachResult.push(`Index ${index}: ${num}`);
  });

  return (
    <main className="p-4">
      <div className='flex flex-col gap-4'>
        <h1>Home Page</h1>
        <h2 className="text-lg font-semibold">Data Getter</h2>
        {dataList.length === 0 ? (
          <p>Belum ada data.</p>
        ) : (
          <div className='flex flex-col gap-2'>
            {dataList.map((item) => (
              <div key={item.id} className='border border-gray-300 rounded p-3 flex items-center justify-between'>
                <div>
                  <p>ID: {item.id}</p>
                  <p>Value: {item.value || '-'}</p>
                  <p>Number: {item.number}</p>
                </div>
                <div className='flex gap-2'>
                  <Link className='bg-emerald-700 p-2 w-[140px] text-center text-white' to={`/set/${item.id}`}>
                    Edit Data
                  </Link>
                  <button
                    type="button"
                    className='bg-red-700 p-2 w-[140px] text-center text-white'
                    onClick={() => deleteData(item.id)}
                  >
                    Hapus
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className='flex gap-3'>
          <Link className='bg-blue-900 p-2 w-[200px] text-center text-white' to="/set">
            Go to Setter
          </Link>
        </div>
      </div>

      <div className="mt-6 gap-12">
        <h2 className="mb-2 text-lg font-semibold">Contoh Array</h2>

        <p className='flex gap-2'>
          <h1>map:</h1> membuat array baru dengan transformasi tiap item.
          Hasil: {JSON.stringify(mappedNumbers)}
        </p>

        <p className='flex gap-2'>
          <h1>reduce:</h1> menggabungkan semua item jadi satu nilai.
          Hasil total: {reducedTotal}
        </p>

        <p className='flex gap-2'>
          <h1>slice:</h1> mengambil sebagian isi array tanpa mengubah
          array asli. Hasil: {JSON.stringify(slicedNumbers)}
        </p>

        <p className='flex gap-2'>
          <h1>filter:</h1> menyaring item sesuai kondisi. Hasil:{' '}
          {JSON.stringify(filteredNumbers)}
        </p>

        <p className='flex gap-2'>
          <h1>forEach:</h1> menjalankan aksi untuk tiap item, biasanya
          untuk side effect. Hasil: {forEachResult.join(' | ')}
        </p>
      </div>
    </main>
  );
}

export default HomePage;
