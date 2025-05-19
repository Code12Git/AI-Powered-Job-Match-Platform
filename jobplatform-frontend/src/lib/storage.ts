import type { WebStorage } from "redux-persist/es/types";

export const createNoopStorage = (): WebStorage => ({
  getItem: () => Promise.resolve(null),
  setItem: () => Promise.resolve(),
  removeItem: () => Promise.resolve(),
});

let storage: WebStorage;

if (typeof window !== "undefined") {
  import("redux-persist/lib/storage").then((mod) => {
    storage = mod.default;
  });
} else {
  storage = createNoopStorage();
}

export { storage };