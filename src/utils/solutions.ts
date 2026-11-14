export function buildSolutionsArray(solutions: string[][]): string[] {
  const solutionsArray: string[] = [];
  let solutionElement;
  solutions.forEach((solution) => {
    const key = solution[0];
    solution.forEach((element, index) => {
      if (index >= 1) {
        solutionElement = key + ':' + element;
        solutionsArray.push(solutionElement);
      }
    })
  })
  return solutionsArray;
}

export function buildKeys(elements: string[]): Set<string> {
  const allKeys: string[] = [];
  elements.forEach((elem) => {
    const key = elem.split(":")[0];
    allKeys.push(key);
  })

  const allUniqueKeys = new Set(allKeys);
  return allUniqueKeys;
}

export function isSolutionCorrect(solutions: string[], answer: string): boolean {
  if (answer === '') {
    return false;
  }

  const solutionNoSpaces = solutions
    .map(solution =>
      solution.replace(/ /g, "")
    )
  const answerNoSpaces = answer
    .replace(/[\r\n ]/g, "")
    .split(";")
    .filter((s) => s !== "");

  const uniqueSolutionsKeys = buildKeys(solutionNoSpaces);
  const uniqueAnswerKeys = buildKeys(answerNoSpaces);
  const sameKeys = uniqueSolutionsKeys.size === uniqueAnswerKeys.size && Array.from(uniqueSolutionsKeys).every(value => uniqueAnswerKeys.has(value));
  const isAnswerIncludedIntoSolution = answerNoSpaces.every((answer) => solutionNoSpaces.includes(answer));

  return isAnswerIncludedIntoSolution && sameKeys;
}
