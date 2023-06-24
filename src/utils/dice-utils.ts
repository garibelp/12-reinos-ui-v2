export interface DiceResult {
  value: number;
  failure: boolean;
  criticalHit: boolean;
  criticalFailure: boolean;
}

export function rollDice(dice: number): DiceResult {
  const value = Math.floor(Math.random() * dice) + 1;
  return {
    value,
    failure: isFailure(value),
    criticalHit: isCriticalHit(value, dice),
    criticalFailure: isCriticalFailure(value),
  };
}

export function isCriticalHit(rollValue: number, dice: number): boolean {
  if (dice === 6 && rollValue > 5) return true;
  if (dice === 8 && rollValue > 6) return true;
  if (dice === 10 && rollValue > 7) return true;
  if (dice === 12 && rollValue > 8) return true;
  return false;
}

export function isFailure(rollValue: number): boolean {
  return rollValue <= 2;
}

export function isCriticalFailure(rollValue: number): boolean {
  return rollValue === 1;
}

export function getDiceValue(dice?: string): number {
  return dice ? Number(dice.replace("D", "")) : 0;
}
