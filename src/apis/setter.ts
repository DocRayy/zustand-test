const BASE_URL = 'https://jsonplaceholder.typicode.com';

export type SetterPost = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export type SetterPostPayload = {
  userId: number;
  title: string;
  body: string;
};

export type SetterListFilter = {
  keyword?: string;
  pagination?: {
    page: number;
    pageSize: number;
  };
};

async function requestJson<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...init,
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}

export async function fetchSetterList(filter: SetterListFilter): Promise<SetterPost[]> {
  const posts = await requestJson<SetterPost[]>('/posts');

  const keyword = filter.keyword?.trim().toLowerCase() ?? '';
  const filteredPosts = keyword === ''
    ? posts
    : posts.filter((post) => post.title.toLowerCase().includes(keyword));

  const page = filter.pagination?.page ?? 1;
  const pageSize = filter.pagination?.pageSize ?? 10;
  const startIndex = (page - 1) * pageSize;
  return filteredPosts.slice(startIndex, startIndex + pageSize);
}

export async function fetchSetterDetail(id: number): Promise<SetterPost> {
  return requestJson<SetterPost>(`/posts/${id}`);
}

export async function fetchSetterCreate(payload: SetterPostPayload): Promise<SetterPost> {
  return requestJson<SetterPost>('/posts', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function fetchSetterUpdate(id: number, payload: SetterPostPayload): Promise<SetterPost> {
  return requestJson<SetterPost>(`/posts/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
}

export async function fetchSetterDelete(id: number): Promise<void> {
  await requestJson<void>(`/posts/${id}`, {
    method: 'DELETE',
  });
}
