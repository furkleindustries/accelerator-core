export const looksLikeANumber = (str: string) => {
  const asNum = Number(str);
  if (asNum >= 0) {
    return true;
  }

  return false;
};
