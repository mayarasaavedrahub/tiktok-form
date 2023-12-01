export const capitalizeFirstLetters = (value: string) =>
    value.toLowerCase().replace(/^\w|\s\w/g, (letter: string) => letter.toUpperCase());
