import { canMoveAppointment } from "../../appointment-status";
import type { SetData } from "../../shared-slice";
import type { Appointment, AppointmentStatus, ClinicData } from "../../types";

export type NewAppointment = {
  doctorId: string;
  treatmentId?: string;
  name: string;
  phone: string;
  date: string;
  time: string;
  note?: string;
};

export type AppointmentsActions = {
  addAppointment: (input: NewAppointment, now?: Date) => string;
  setAppointmentStatus: (id: string, status: AppointmentStatus) => void;
};

export function createAppointmentsActions(set: SetData<ClinicData>): AppointmentsActions {
  return {
    addAppointment: (input, now = new Date()) => {
      const appointment: Appointment = {
        ...input,
        id: crypto.randomUUID(),
        name: input.name.trim(),
        phone: input.phone.trim(),
        status: "new",
        createdAt: now.toISOString(),
      };
      set((state) => ({ appointments: [appointment, ...state.appointments] }));
      return appointment.id;
    },

    // Only the allowed paths change a status; anything else is ignored.
    setAppointmentStatus: (id, status) =>
      set((state) => ({
        appointments: state.appointments.map((item) =>
          item.id === id && canMoveAppointment(item.status, status) ? { ...item, status } : item,
        ),
      })),
  };
}
