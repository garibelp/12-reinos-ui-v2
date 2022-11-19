import Rick from "../../../../assets/images/Rick.png";

export function ItemsComponent({ hidden }: { hidden: boolean }) {
  if (hidden) return null;
  return (
    <div style={{ textAlign: "center" }}>
      <img src={Rick} alt="" style={{ width: "300px" }} />
    </div>
  );
}
