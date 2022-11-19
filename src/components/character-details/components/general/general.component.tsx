export function GeneralComponent({ hidden }: { hidden: boolean }) {
  if (hidden) return null;
  return <div>GERAL</div>;
}
