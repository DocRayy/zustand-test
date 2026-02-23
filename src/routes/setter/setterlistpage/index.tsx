import { useQuery } from '@tanstack/react-query';
import { Link, useOutletContext } from 'react-router-dom';
import type { SetterOutletContext } from '..';

type BaseSetterProps = {
  id: number;
  title: string;
  body: string;
  userId: number;
}

const SetterListPage = () => {
  const { queryKey, filter, queryFn } = 
    useOutletContext<SetterOutletContext>();

  const { 
    data 
  } = useQuery<BaseSetterProps[]>({
    queryKey: [queryKey, 'list', filter],
    queryFn: async () => {
      const response = await queryFn(filter);
      window.alert('Data total: ' + response.length);
      return response as BaseSetterProps[];
    },
  });

  const dataList = data ?? [];

  return (
    <main className="p-4">
      <div className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold">Data Getter</h2>
          <div className="flex flex-col gap-2">
            <div className="flex gap-3">
              <Link className="bg-blue-900 p-2 w-[200px] text-center text-white" to="new">
                Go to Setter Detail
              </Link>
            </div>
            {dataList.map((item) => (
              <div key={item.id} className="border border-gray-300 rounded p-3 flex items-center justify-between">
                <div>
                  <p>ID: {item.id}</p>
                  <p>User ID: {item.userId}</p>
                  <p>Title: {item.title || '-'}</p>
                  <p>Body: {item.body || '-'}</p>
                </div>
                <div className="flex gap-2">
                  <Link className="bg-emerald-700 p-2 w-[140px] text-center text-white" to={`${item.id}`}>
                    Edit Data
                  </Link>
                </div>
              </div>
            ))}
          </div>
      </div>
    </main>
  );
}

export default SetterListPage;
