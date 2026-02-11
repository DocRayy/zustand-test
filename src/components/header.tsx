import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/id';

dayjs.locale('id');

function Header() {
  const [now, setNow] = useState(dayjs());

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(dayjs());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <header className="bg-slate-900 flex items-center justify-between p-4 text-white">
      <h1 className="text-xl font-semibold">Zustand Test App</h1>
      <p className="text-sm justify-end ml-4">{now.format('dddd, DD MMMM YYYY HH:mm:ss')}</p>
    </header>
  );
}

export default Header;
