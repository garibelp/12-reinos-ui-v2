import { BackgroundList } from "../../interfaces/background.interface";
import backgroundList from "../../mock/backgrounds.json";

export function getBackgroundList(): Promise<{ data: BackgroundList }> {
  return new Promise((res) =>
    setTimeout(() => res({ data: backgroundList }), 100)
  );
}
