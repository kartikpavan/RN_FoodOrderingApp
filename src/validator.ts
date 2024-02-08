export const createProductValdation = (
  name: string,
  price: string
): { success: boolean; errMessage: string | null } => {
  if (!name.trim())
    return { success: false, errMessage: "Name cannot be empty" };

  if (!price.trim())
    return { success: false, errMessage: "Price cannot be empty" };

  if (isNaN(parseFloat(price)))
    return { success: false, errMessage: "Price must be a number" };

  return { success: true, errMessage: null };
};
