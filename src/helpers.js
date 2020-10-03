export const documentTitle = (prefix = '') => {
  let title = prefix ? `${prefix} - ` : '';
  title += 'BΔNDPLΔY';
  document.title = title;
};
