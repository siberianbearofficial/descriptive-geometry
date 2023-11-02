let width: number = 2000;
let height: number = 2000;

export function agXToScreenX(x: number): number {
  return width - x;
}

export function agYToScreenY(y: number): number {
  return height / 2 + y;
}

export function agZToScreenY(z: number): number {
  return height / 2 - z;
}

export function screenXToAgX(x: number): number {
  return width - x;
}

export function screenYToAgY(y: number): number {
  return y - height / 2;
}

export function screenYToAgZ(z: number): number {
  return height / 2 - z;
}
