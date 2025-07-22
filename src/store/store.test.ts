import { describe, it, expect } from "vitest";

import { store } from "./index";

describe("Redux Store with RTK Query", () => {
  it("should be configured correctly", () => {
    expect(store).toBeDefined();
    expect(store.getState).toBeDefined();
    expect(store.dispatch).toBeDefined();
  });

  it("should have movieApi reducer", () => {
    const state = store.getState();
    expect(state.movieApi).toBeDefined();
    expect(state.movieApi.queries).toBeDefined();
    expect(state.movieApi.mutations).toBeDefined();
    expect(state.movieApi.subscriptions).toBeDefined();
  });
});
