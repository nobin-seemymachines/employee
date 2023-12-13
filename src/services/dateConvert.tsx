export const dateConvert = (val: string): string => {
    const myDate = new Date(val);
    return myDate.toLocaleDateString("en-CA");
  };