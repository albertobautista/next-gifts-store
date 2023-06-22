import { IOption } from "gifts-store/interfaces";

export const truncateText = (text: string, length: number): string => {
  if (text.length <= length) {
    return text;
  } else {
    return text.slice(0, length) + "...";
  }
};

export const processText = (text: string = "", options: IOption[]): string => {
  console.log("processText", text);
  const selectedOption = options.find(
    (option) => text.toLowerCase() === option.keyword.toLowerCase()
  );

  if (selectedOption) {
    return selectedOption.value;
  } else {
    return "Opción no encontrada";
  }
};
