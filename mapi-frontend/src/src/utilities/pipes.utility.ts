export const getTypedCharacter = (
  currentText: string,
  newText: string
): string => {
  const lastCharacter = newText.at(-1) ?? "";
  if (currentText.length === 0) return lastCharacter;
  return newText.length > 1 && currentText === lastCharacter
    ? newText[0]
    : lastCharacter;
};

export const formatCurrency = (value: number) => {
  const formatter = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  });

  return formatter.format(value);
};

export const formatDate = (date: string) => {
  const dateFormat = new Date(date);
  return `${dateFormat.getDate()}/${
    dateFormat.getMonth() + 1
  }/${dateFormat.getFullYear()}`;
};

export const calculateHours = (time: string) => {
  const partials = time.split(":");
  const hours = parseInt(partials[0]);
  const minutes = parseInt(partials[1]);
  const seconds = parseInt(partials[2]);
  return (hours + minutes / 60 + seconds / 3600).toFixed(1).replace(/\.0$/, "");
};

export const calculateMinutes = (time: string) => {
  const partials = time.split(":");
  const hours = parseInt(partials[0]);
  const minutes = parseInt(partials[1]);
  const seconds = parseInt(partials[2]);
  return (hours * 60 + minutes + seconds / 60).toFixed(1).replace(/\.0$/, "");
};

export const jsonToFormData = (data: any) =>
  Object.keys(data).reduce((formData, key) => {
    formData.append(key, data[key]);
    return formData;
  }, new FormData());
