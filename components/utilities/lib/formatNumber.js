const FormatNumber = number => {
  try {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  } catch (e) {}
};

export {FormatNumber};
