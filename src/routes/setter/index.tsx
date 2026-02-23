import { Outlet, useLocation } from 'react-router-dom';
import { fetchSetterList, type SetterListFilter } from '../../apis/setter';
import { useMemo } from 'react';

export type SetterOutletContext = {
  queryKey: string;
  filter: SetterListFilter;
  queryFn: typeof fetchSetterList;
};

function SetterPage() {
  const location = useLocation();


  const filter = useMemo(() => {
    const params = new URLSearchParams(location.search);
    return {
      keyword: params.get('q') || '',
      pagination: {
        page: Number(params.get('page') || 1),
        pageSize: Number(params.get('pageSize') || 10),
      },
    };
  }, [location.search])

  const context = useMemo<SetterOutletContext>(
    () => ({
      queryKey: 'setter',
      filter,
      queryFn: fetchSetterList,
    }),
    [filter],
  )

  return (
    <Outlet context={context} />
  );
}

export default SetterPage;
