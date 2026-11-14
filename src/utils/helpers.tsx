import type { JSX } from "react";
import { Element, attributesToProps } from "html-react-parser";
import { getStorageValue } from "../hooks/useLocalStorage";
import { IChapter, ILevel } from "../models/Game";

export function isNumeric(value: string | undefined): boolean {
  if (!value) return false;
  return /^\d+$/.test(value);
}

export function getCodeLinesSide(
  startHighlightCode: number,
  linesOfCode: number,
  maxNoOfCodeLinesSide: number
) {
  const codeLinesSide: JSX.Element[] = [];

  const highlightedRows: number[] = [
    startHighlightCode,
    startHighlightCode + linesOfCode,
  ];

  for (let i = 1; i <= maxNoOfCodeLinesSide; i++) {
    let className = "";
    if (i >= highlightedRows[0] && i < highlightedRows[1]) {
      className = "code__numbers--highlight";
      if (i === highlightedRows[0]) {
        className += " code__numbers--first";
      }
      if (i === highlightedRows[1] - 1) {
        className += " code__numbers--last";
      }
    }
    codeLinesSide.push(
      <li key={i} className={className}>
        {i}
      </li>
    );
  }
  return codeLinesSide;
}

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

/**
 * Return game information (current Chapter/Level and next Chapter/Level numbers) based on the current chapter and level numbers and the chapters array
 * @param chapterNumber - current chapter number
 * @param leveNumber - current level number
 * @returns {currentChapter, currentLevel, chapterNumber, levelNumber, nextChapterNumber, nextLevelNumber} - current chapter, current level, current chapter number, current level number, next chapter number, next level number
 */
export function getGameInfo(
  chapterNumber: string | undefined,
  leveNumber: string | undefined,
  chapters: IChapter[]
): {
  currentChapter: IChapter | null;
  currentLevel: ILevel | null;
  chapterNumber: number | null;
  levelNumber: number | null;
  nextChapterNumber: number | null;
  nextLevelNumber: number | null;
} {
  // If the chapter number or level number are not valid, return null
  if (
    !chapterNumber ||
    chapterNumber === "0" ||
    !leveNumber ||
    leveNumber === "0" ||
    !isNumeric(chapterNumber) ||
    !isNumeric(leveNumber)
  ) {
    return {
      currentChapter: null,
      currentLevel: null,
      chapterNumber: null,
      levelNumber: null,
      nextChapterNumber: null,
      nextLevelNumber: null,
    };
  }
  const currentChapterIndex = parseInt(chapterNumber) - 1;
  const currentChapter: IChapter = chapters[currentChapterIndex];
  if (!currentChapter) {
    return {
      currentChapter: null,
      currentLevel: null,
      chapterNumber: null,
      levelNumber: null,
      nextChapterNumber: null,
      nextLevelNumber: null,
    };
  }
  const currentLevelIndex = parseInt(leveNumber) - 1;
  const currentLevel: ILevel = currentChapter.levels[currentLevelIndex];
  if (!currentLevel) {
    return {
      currentChapter: null,
      currentLevel: null,
      chapterNumber: null,
      levelNumber: null,
      nextChapterNumber: null,
      nextLevelNumber: null,
    };
  }

  let nextLevelNumber = currentChapter.levels[currentLevelIndex + 1]
    ? currentLevelIndex + 2
    : null;

  if (!nextLevelNumber) {
    const nextChapterNumber = chapters[currentChapterIndex + 1]
      ? currentChapterIndex + 2
      : null;
    nextLevelNumber = nextChapterNumber ? 1 : null;

    return { currentChapter, currentLevel, chapterNumber: +chapterNumber, levelNumber: +leveNumber, nextChapterNumber, nextLevelNumber };
  }

  const nextChapterNumber = currentChapterIndex + 1;

  return { currentChapter, currentLevel, chapterNumber: +chapterNumber, levelNumber: +leveNumber, nextChapterNumber, nextLevelNumber };
}

/**
 * Return the current progress for each chapter
 * @param chapter 
 * @param chapterIndex 
 * @returns 
 */
export function getChapterProgress(chapter: IChapter, chapterIndex: number) {
  const noOfLevelsSolved = chapter.levels.filter((_level, levelIndex) => getStorageValue('is-level-solved-' + (chapterIndex + 1) + '-' + (levelIndex + 1), "") === "true").length;
  const noOfLevelsTotal = chapter.levels.length;
  return Math.round(noOfLevelsSolved / noOfLevelsTotal * 100);
}


/**
 * Add a multiplier to an image file name.
 *
 * @param {string} fileName - The original file name (including extension).
 * @param {number} multiplier - The multiplier to add to the file name (e.g., 4 for "4x").
 * @returns {string} The modified file name with the multiplier added.
 */
export function addMultiplierToImageFileName(fileName: string, multiplier: string) {
  // Split the file name into its name and extension parts
  const parts = fileName.split('.');

  // Check if there is an extension
  if (parts.length > 1) {
    const name = parts.slice(0, -1).join('.'); // Get the name without extension
    const extension = parts[parts.length - 1]; // Get the extension

    // Add the multiplier to the name and reconstruct the file name
    const newFileName = `${name}${multiplier}x.${extension}`;

    return newFileName;
  } else {
    // If there is no extension, simply add the multiplier to the name
    return `${fileName}${multiplier}x`;
  }
}

/**
 * Update an image node and return dom node if it is a dummy image and the updated image node otherwise.
 *
 * @param {Element} domNode - The image node to process.
 * @returns {Element} The processed image node.
 */
export function updateImage(domNode: Element ): JSX.Element {
  const imgPath = import.meta.env.BASE_URL;
  
  if (domNode.attribs.src.includes('dummyimage')) {
    const props = attributesToProps(domNode.attribs);
    return <img alt="" {...props} />
  }

  const fileName1x = imgPath + addMultiplierToImageFileName(domNode.attribs.src, '1');
  const fileName2x = imgPath + addMultiplierToImageFileName(domNode.attribs.src, '2');
  const fileName3x = imgPath + addMultiplierToImageFileName(domNode.attribs.src, '3');
  return <img
    src={imgPath + domNode.attribs.src}
    srcSet={`${fileName1x} 1x, ${fileName2x} 2x, ${fileName3x} 3x`}
    alt={domNode.attribs.alt} title={domNode.attribs.alt} />
}