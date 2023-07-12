export const nullSafeLowerCaseStr = (str) => {
  return isEmpty(str) ? "" : str.toLowerCase();
}

export const equalsIgnoreCase = (str1, str2) => {
  return isNotEmpty(str1) && isNotEmpty(str2) && str1.trim().toUpperCase() === str2.trim().toUpperCase();
}

export const isNotEmpty = (str) => {
  return !isEmpty(str);
}

export const isEmpty = (str) => {
  return !str || str.trim() === "";
}