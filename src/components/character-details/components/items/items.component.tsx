export function ItemsComponent({ hidden }: { hidden: boolean }) {
  if (hidden) return null;
  return <div>ITEMS</div>;
}
