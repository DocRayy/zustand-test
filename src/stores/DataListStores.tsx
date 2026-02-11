import { create } from 'zustand';

// type Data = { value: string; number: number };

type DataListState = {
  value: string;
  number: number;
  setValue: (newValue: string) => void;
  setNumber: (newNumber: number) => void;
  // data: Data;
  // setData: (patch: Partial<Data>) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
};

export const useDataListStore = create<DataListState>((set) => ({
  value: '',
  setValue: (newValue: string) => set({ value: newValue }),
  number: 0,
  setNumber: (newNumber: number) => set({ number: newNumber }),
  loading: false,
  setLoading: (loading: boolean) => set({ loading }),

  // data: { value: '', number: 0 },
  // setData: (patch) =>
  //   set((state) => ({ data: { ...state.data, ...patch } })),
}));
