// A phone number is valid when it has 9 to 15 digits (spaces, +, and dashes are allowed around them).
export function isValidPhone(phone: string): boolean {
  const digits = phone.replace(/\D/g, "");
  return digits.length >= 9 && digits.length <= 15;
}
