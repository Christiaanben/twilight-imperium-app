export type HexOrientation = 'pointy' | 'flat'

export function drawHex(
  x: number,
  y: number,
  size: number,
  canvas: CanvasRenderingContext2D,
  orientation: HexOrientation = 'pointy'
) {
  canvas.beginPath()
  let func1 = Math.sin
  let func2 = Math.cos
  size *= 0.98
  if (orientation === 'flat') {
    func1 = Math.cos
    func2 = Math.sin
  }
  canvas.moveTo(x + size * func1(0), y + size * func2(0))
  for (let side = 0; side < 7; side++)
    canvas.lineTo(x + size * func1((side * Math.PI) / 3), y + size * func2((side * Math.PI) / 3))
  canvas.fillStyle = '#338954'
  canvas.fill()
}

export function drawHexFromAxial(q: number, r: number, size: number, canvas: CanvasRenderingContext2D) {
  let x = q * Math.sqrt(3) + (r * Math.sqrt(3)) / 2
  let y = (r * 3) / 2
  drawHex(150 + x * size, 75 + y * size, size, canvas)
}
