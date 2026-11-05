import type { SetData } from "../../shared-slice";
import { canMoveEventRequest } from "./status";
import type { EventBudget, EventRequest, EventRequestsData, EventRequestStatus, EventType } from "./types";

export type NewEventRequest = {
  type: EventType;
  date: string;
  guests: number;
  budget?: EventBudget;
  name: string;
  phone: string;
  details: string;
};

export type EventRequestsActions = {
  addEventRequest: (input: NewEventRequest, now?: Date) => string;
  setEventRequestStatus: (id: string, status: EventRequestStatus) => void;
};

export function createEventRequestsActions(set: SetData<EventRequestsData>): EventRequestsActions {
  return {
    addEventRequest: (input, now = new Date()) => {
      const request: EventRequest = {
        id: crypto.randomUUID(),
        ...input,
        name: input.name.trim(),
        phone: input.phone.trim(),
        status: "new",
        createdAt: now.toISOString(),
      };
      set((state) => ({ eventRequests: [request, ...state.eventRequests] }));
      return request.id;
    },

    setEventRequestStatus: (id, status) =>
      set((state) => ({
        eventRequests: state.eventRequests.map((request) =>
          request.id === id && canMoveEventRequest(request.status, status) ? { ...request, status } : request,
        ),
      })),
  };
}
