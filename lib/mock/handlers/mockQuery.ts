const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

async function mockQuery<T>(callback: () => T, time = 1500) {
  try {
    await delay(time);

    const data = callback();
    return {
      data,
      error: null,
      isLoading: false,
    };
  } catch (err: any) {
    return {
      data: null,
      error: err?.message ?? "Something went wrong",
      isLoading: false,
    };
  }
}
