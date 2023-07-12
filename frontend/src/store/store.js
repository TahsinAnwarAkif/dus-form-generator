import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const store = (set) => ({
	formList: [],
	addForm: (formToBeAdded) => {
		set((state) => ({
			formList: [formToBeAdded, ...state.formList],
		}));
	},
	removeForm: (formToBeRemoved) => {
		set((state) => ({
			formList: [...state.formList.filter((form) => form !== formToBeRemoved)],
		}));
	},
	resetFormList: () => {
		set((state) => ({
			formList: [],
		}));
	},

	entryIdList: [],
	addEntryId: (entryId) => {
		set((state) => ({
			entryIdList: [entryId, ...state.entryIdList],
		}));
	},
	resetEntryIdList: () => {
		set((state) => ({
			entryIdList: [],
		}));
	},
});

export const useStore = create(
	devtools(
		persist(store, {
			name: "store",
		})
	)
);
