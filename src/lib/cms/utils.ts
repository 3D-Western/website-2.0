export const CMSEnabled = (): boolean => {
  if (process.env.CMS_ENABLED === "false") {
    return false;
  }
  return true;
};
