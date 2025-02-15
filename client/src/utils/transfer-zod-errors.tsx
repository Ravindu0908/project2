export const transferZodErrors = (zodError: any) => {
  const transformedError: { [key: string]: any[] } = {};

  zodError.forEach((issue: any) => {
    const key = issue.path[0];
    if (!transformedError[key]) {
      transformedError[key] = [];
    }
    transformedError[key].push(issue.message);
  });

  return {
    success: false,
    error: transformedError,
  };
};
