const renderLastName = (lastName: string, firstName: string) => {
  return lastName.charAt(0).concat('. ').concat(firstName);
};

export { renderLastName };
