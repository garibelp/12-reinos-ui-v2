export function TextWithBreaklineComponent({
  text,
}: {
  text: string | undefined;
}) {
  if (!text) return <></>;
  return text
    .replaceAll("\\t", "•")
    .split("\\n")
    .map((item, index) => (index === 0 ? item : [<br key={index} />, item]));
}
