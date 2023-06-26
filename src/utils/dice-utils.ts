export interface DiceResult {
  value: number;
  bonus: number;
  failure: boolean;
  criticalHit: boolean;
  criticalFailure: boolean;
}

export function rollDice(
  dice: number,
  bonus = 0,
  invertRoll = false
): DiceResult {
  const value = Math.floor(Math.random() * dice) + 1;
  const valueWithBonus = invertRoll ? value - bonus : value + bonus;
  return {
    value,
    bonus,
    failure: isFailure(valueWithBonus, dice, invertRoll),
    criticalHit: isCriticalHit(valueWithBonus, dice, invertRoll),
    criticalFailure: isCriticalFailure(value, dice, invertRoll),
  };
}

export function isCriticalHit(
  rollValue: number,
  dice: number,
  invertRoll = false
): boolean {
  if (invertRoll) {
    if (dice === 6 && rollValue < 2) return true;
    if (dice === 8 && rollValue < 3) return true;
    if (dice === 10 && rollValue < 4) return true;
    if (dice === 12 && rollValue < 5) return true;
  } else {
    if (dice === 6 && rollValue > 5) return true;
    if (dice === 8 && rollValue > 6) return true;
    if (dice === 10 && rollValue > 7) return true;
    if (dice === 12 && rollValue > 8) return true;
  }
  return false;
}

export function isFailure(
  rollValue: number,
  dice: number,
  invertRoll = false
): boolean {
  return invertRoll ? dice - rollValue < 3 : rollValue <= 3;
}

export function isCriticalFailure(
  rollValue: number,
  dice: number,
  invertRoll = false
): boolean {
  return invertRoll ? dice === rollValue : rollValue === 1;
}

export function getDiceValue(dice?: string): number {
  return dice ? Number(dice.replace("D", "")) : 0;
}
