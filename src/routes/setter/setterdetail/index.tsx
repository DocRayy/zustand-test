import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ChangeEvent, useEffect, useState } from 'react';
import {
  useLocation,
  useNavigate,
  useOutletContext,
  useParams,
} from 'react-router-dom';
import {
  fetchSetterCreate,
  fetchSetterDelete,
  fetchSetterDetail,
  fetchSetterUpdate,
  type SetterPost,
  type SetterPostPayload,
} from '../../../apis/setter';
import type { SetterOutletContext } from '..';
import { SETTER_PATH } from '../constants';

function SetterDetailPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { queryKey } = useOutletContext<SetterOutletContext>();
  const { id } = useParams();
  const parsedId = Number(id);
  const isCreateMode = id === 'new';
  const hasValidId = Number.isInteger(parsedId) && parsedId > 0;

  const [inputTitle, setInputTitle] = useState('');
  const [inputBody, setInputBody] = useState('');
  const [inputUserId, setInputUserId] = useState('1');
  const [information, setInformation] = useState<SetterPost | null>(null);

  const { data } = useQuery({
    queryKey: [queryKey, 'detail', hasValidId ? parsedId : 'new'],
    queryFn: () => fetchSetterDetail(parsedId),
    enabled: !isCreateMode && hasValidId,
  });

  useEffect(() => {
    setInformation(data ?? null);
  }, [data]);

  useEffect(() => {
    if (information) {
      setInputTitle(information.title);
      setInputBody(information.body);
      setInputUserId(String(information.userId));
      return;
    }

    if (isCreateMode) {
      setInputTitle('');
      setInputBody('');
      setInputUserId('1');
    }
  }, [information, isCreateMode]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputTitle(event.target.value);
  };

  const handleBodyChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputBody(event.target.value);
  };

  const handleUserIdChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputUserId(event.target.value);
  };

  const mutation = useMutation({
    mutationFn: async (payload: SetterPostPayload) => {
      if (!isCreateMode && hasValidId) {
        return fetchSetterUpdate(parsedId, payload);
      }
      return fetchSetterCreate(payload);
    },
    onSuccess: async (response) => {
      if (!isCreateMode && hasValidId) {
        await queryClient.invalidateQueries({ queryKey: [queryKey] });
        return;
      }

      const newPath = location.pathname.replace('/new', `/${response.id}`);
      navigate(newPath, { replace: true });
      window.alert('Create data [ID: ' + response.id + '] Success');
    },
    onError: (error) => {
      console.error(error);
      window.alert('Create data failed');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: fetchSetterDelete,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [queryKey] });
      navigate(SETTER_PATH);
      window.alert('Delete data [ID: ' + id + '] Success');
    },
  });

  const handleSubmit = () => {
    const payload: SetterPostPayload = {
      title: inputTitle,
      body: inputBody,
      userId: inputUserId === '' ? 1 : Number(inputUserId),
    };

    mutation.mutate(payload);
  };

  return (
    <main className="p-4">
      <div className="flex gap-4 mt-4">
        <input
          className="border border-gray-300 rounded px-4 py-2"
          type="text"
          value={inputTitle}
          onChange={handleChange}
          placeholder="Input title..."
        />

        <input
          className="border border-gray-300 rounded px-4 py-2"
          type="text"
          value={inputBody}
          onChange={handleBodyChange}
          placeholder="Input body..."
        />

        <input
          className="border border-gray-300 rounded px-4 py-2"
          type="number"
          value={inputUserId}
          onChange={handleUserIdChange}
          placeholder="Input userId..."
        />

        <button
          type="button"
          className="bg-blue-900 p-4 text-center text-white"
          disabled={mutation.isPending}
          onClick={handleSubmit}
        >
          {mutation.isPending
            ? 'Processing...'
            : !isCreateMode
              ? 'Update'
              : 'Submit'}
        </button>

        {!isCreateMode && hasValidId ? (
          <button
            type="button"
            className="bg-red-700 p-4 text-center text-white"
            disabled={deleteMutation.isPending}
            onClick={() => deleteMutation.mutate(parsedId)}
          >
            {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
          </button>
        ) : null}
      </div>
    </main>
  );
}

export default SetterDetailPage;
