export const highNumbersConverter = (number:number) => {
  if (number < 1000) {
    return number
  }
  else if (number < 1000000) {
    const dividedByThousand = (number / 1000).toFixed(1)
    return dividedByThousand.endsWith(".0")
      ? `${dividedByThousand.slice(0, -2)}k`
      : `${dividedByThousand}k`
  }
  else {
  const milionFollows= (number/1000000).toFixed(1)

  return milionFollows.endsWith(".0")
  ? `${milionFollows.slice(0,-2)}M`
  : `${milionFollows}M`
  }
}
