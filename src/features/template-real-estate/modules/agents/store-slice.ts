import type { SetData } from "../../shared-slice";
import type { Agent, AgentsData } from "./types";

export type NewAgent = Omit<Agent, "id">;

export type AgentsActions = {
  addAgent: (input: NewAgent) => string;
  updateAgent: (id: string, patch: Partial<NewAgent>) => void;
  removeAgent: (id: string) => void;
};

export function createAgentsActions(set: SetData<AgentsData>): AgentsActions {
  return {
    addAgent: (input) => {
      const agent: Agent = { ...input, id: crypto.randomUUID() };
      set((state) => ({ agents: [...state.agents, agent] }));
      return agent.id;
    },

    updateAgent: (id, patch) =>
      set((state) => ({
        agents: state.agents.map((agent) => (agent.id === id ? { ...agent, ...patch } : agent)),
      })),

    // Properties of a removed agent simply have no agent card.
    removeAgent: (id) =>
      set((state) => ({
        agents: state.agents.filter((agent) => agent.id !== id),
        properties: state.properties.map((property) =>
          property.agentId === id ? { ...property, agentId: undefined } : property,
        ),
      })),
  };
}
