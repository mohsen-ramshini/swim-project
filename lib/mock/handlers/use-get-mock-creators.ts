import { mockCreators } from "../data/mockCreators";

/* ----------------------- Creators ----------------------- */

export const getCreators = async () => {
  return mockQuery(() => mockCreators, 1000);
};

export const getCreatorById = async (id: number) => {
  return mockQuery(() => {
    const creator = mockCreators.find((c) => c.id === id);

    if (!creator) {
      throw new Error("Creator not found");
    }

    return creator;
  }, 1200);
};

/* -------------------- Optional: Filter by Role -------------------- */

export const getCreatorsByRole = async (role: "author" | "editor" | "translator") => {
  return mockQuery(() => {
    return mockCreators.filter((c) => c[role] === true);
  }, 1100);
};
