export const customBaseUrl = () => {
  const parmsObj = {};
  const baseUrl = window.location.origin + window.location.pathname;
  parmsObj.baseUrl = baseUrl;
  const params = new URLSearchParams(window.location.search);
  console.log(window.location.search);
  console.log(params);
  for (const parm of params) {
    parmsObj[parm[0]] = parm[1];
  }
  console.log(parmsObj);
  return parmsObj;
};
