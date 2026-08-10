import type { RoutingOption } from '../content/scenario-data';

export interface TriageState {
  selectedRouting: RoutingOption | null;
  triageComplete: boolean;
  seamPayload: { incidentId: string; reasonCode: string; selectedLabel: string } | null;
  selectRouting: (option: RoutingOption) => void;
  confirmRouting: () => void;
  resetTriage: () => void;
}

export const triageInitialState = {
  selectedRouting: null,
  triageComplete: false,
  seamPayload: null,
};

export function createTriageActions(set: (partial: Partial<TriageState>) => void, get: () => TriageState) {
  return {
    selectRouting: (option: RoutingOption) => set({ selectedRouting: option }),

    confirmRouting: () => {
      const { selectedRouting } = get();
      if (!selectedRouting) return;
      set({
        triageComplete: true,
        seamPayload: {
          incidentId: 'TRI-2291-RA',
          reasonCode: selectedRouting.reasonCode,
          selectedLabel: selectedRouting.label,
        },
      });
    },

    resetTriage: () =>
      set({
        selectedRouting: null,
        triageComplete: false,
        seamPayload: null,
      }),
  };
}
