export default function formatCurrency(curreny: number) {
  return curreny.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });
}
