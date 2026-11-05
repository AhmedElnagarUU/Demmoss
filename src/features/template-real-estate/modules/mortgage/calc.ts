export type MortgageInput = {
  price: number;
  downPaymentPercent: number;
  years: number;
  annualRatePercent: number;
};

export type MortgageResult = {
  loan: number;
  months: number;
  monthly: number;
  total: number;
  interest: number;
};

// Standard amortization: monthly = loan × i / (1 − (1 + i)^−n), with i = annual rate / 12 and n = years × 12.
// A 0% rate divides the loan evenly. Invalid input gives no result (never NaN).
export function calculateMortgage(input: MortgageInput): MortgageResult | null {
  const { price, downPaymentPercent, years, annualRatePercent } = input;
  const valid =
    Number.isFinite(price) &&
    price > 0 &&
    Number.isFinite(downPaymentPercent) &&
    downPaymentPercent >= 0 &&
    downPaymentPercent <= 100 &&
    Number.isInteger(years) &&
    years >= 1 &&
    years <= 50 &&
    Number.isFinite(annualRatePercent) &&
    annualRatePercent >= 0 &&
    annualRatePercent <= 30;
  if (!valid) return null;

  const loan = price * (1 - downPaymentPercent / 100);
  const months = years * 12;
  const monthlyRate = annualRatePercent / 100 / 12;
  const monthly =
    monthlyRate === 0 ? loan / months : (loan * monthlyRate) / (1 - (1 + monthlyRate) ** -months);
  const total = monthly * months;
  return { loan, months, monthly, total, interest: total - loan };
}
