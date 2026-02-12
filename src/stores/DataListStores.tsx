import { create } from 'zustand';

type DataItem = {
  id: number;
  value: string;
  number: number;
};

type DataListState = {
  dataList: DataItem[];
  addData: (payload: Omit<DataItem, 'id'>) => void;
  updateData: (id: number, payload: Omit<DataItem, 'id'>) => void;
  deleteData: (id: number) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
};

export const useDataListStore = create<DataListState>((set, get) => ({
  dataList: [],
  addData: (payload) => {
    const currentList = get().dataList;
    const nextId =
      currentList.length === 0
        ? 1
        : Math.max(...currentList.map((item) => item.id)) + 1;

    set((state) => ({
      dataList: [...state.dataList, { id: nextId, ...payload }],
    }));
  },
  updateData: (id, payload) =>
    set((state) => ({
      dataList: state.dataList.map((item) =>
        item.id === id ? { ...item, ...payload } : item
      ),
    })),
  deleteData: (id) =>
    set((state) => ({
      dataList: state.dataList.filter((item) => item.id !== id),
    })),
  loading: false,
  setLoading: (loading: boolean) => set({ loading }),
}));
