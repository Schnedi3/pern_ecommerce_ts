import { create } from "zustand";
import { IAddressStore } from "../types/types";
import { getAddressRequest } from "../Routes";

export const useAddressStore = create<IAddressStore>((set) => ({
  addressList: [],

  getAddressStore: async () => {
    try {
      const { data } = await getAddressRequest();
      if (!data.success) {
        console.log(data.message);
      }

      set(() => ({
        addressList: data.result,
      }));
    } catch (error) {
      console.log(error instanceof Error ? error.message : "Unexpected error");
    }
  },

  deleteAddressStore: (id) =>
    set((state) => ({
      addressList: state.addressList.filter((address) => address.id !== id),
    })),
}));
