// /test/e2e/specs/authentication.spec.ts

import * as puppeteer from 'puppeteer';
import { goToFistLevel, selectors, skipTutorial } from './actions/gameActions';
import { chapters } from './../../../src/const/chapters';
import { getServerUrl } from './../../../startServer';

let browser: puppeteer.Browser;
let page: puppeteer.Page;

function generateRandomStyle(solutions: string[][]): string {
  return solutions.map(solution => {
    const property = solution[0];
    const value = solution[Math.floor(Math.random() * (solution.length - 1)) + 1];
    return `${property}: ${value}`;
  }).join('; ') + ';';
}

beforeAll(async () => {
  browser = await puppeteer.launch();
  page = await browser.newPage();
  await page.goto(getServerUrl(), { waitUntil: 'domcontentloaded' });
});

afterAll(async () => {
  await browser.close();
});


describe('Complete All Levels Tests', () => {

  it('should display on Dashboard all levels', async () => {
    for (const [chapterIndex, chapter] of chapters.entries()) {
      for (const [levelIndex] of chapter.levels.entries()) {
        const selector = `.chapter:nth-of-type(${chapterIndex + 1}) .chapter__body li:nth-child(${levelIndex + 1}) a`;
        console.log(selector);
        const hash = await page.$eval(selector, (el: HTMLAnchorElement) => el.hash);
        expect(hash).toBe(`#/chapter/${chapterIndex + 1}/level/${levelIndex + 1}`);
      }
    }

  });

  it('should open tutorial on first level click', async () => {
    await goToFistLevel(page);
    await page.waitForSelector(selectors.skipTutorial, { visible: true });
    
    const hastag = await page.evaluate(() => window.location.hash);

    const skipButton = await page.$(selectors.skipTutorial)

    const isSkipButtonVisible = skipButton ? await skipButton.isVisible() : false;

    expect(isSkipButtonVisible).toBeTruthy();
    expect(hastag).toBe('#/chapter/1/level/1');
  });

  // TODO: fix this test
  it.skip('should complete all level', async () => {
    await goToFistLevel(page);
    await skipTutorial(page);
    
    for (const [chapterIndex, chapter] of chapters.entries()) {
      for (const [levelIndex, level] of chapter.levels.entries()) {
        await page.waitForSelector('#code', { visible: true });
        await page.locator('#code').fill(generateRandomStyle(level.solutions));

        await page.waitForSelector('#next', { visible: true });
        const hasAnimatePulseClass = await page.$eval('#next', button => button.classList.contains('animate__pulse'));
        expect(hasAnimatePulseClass).toBeTruthy();

        await page.click('#next');

        await page.waitForNavigation();

        let expectedChapter = chapterIndex + 1;
        let expectedLevel = levelIndex + 2;
        if (expectedLevel > chapter.levels.length) {
          expectedLevel = 1;
          expectedChapter++;
        }

        const hastag = await page.evaluate(() => window.location.hash);
        expect(hastag).toBe(`#/chapter/${expectedChapter}/level/${expectedLevel}`);
      }
    }
  }, 1000000);


it.skip('should complete first level', async () => {
  await goToFistLevel(page);
  await skipTutorial(page);

  const chapterIndex = 0;
  const levelIndex = 0;

  await page.waitForSelector('#code', { visible: true });

  await page.locator('#code').fill(generateRandomStyle(chapters[chapterIndex].levels[levelIndex].solutions));

  await page.waitForSelector('#next', { visible: true });
  const hasAnimatePulseClass = await page.$eval('#next', button => button.classList.contains('animate__pulse'));
  expect(hasAnimatePulseClass).toBeTruthy();

  await page.click('#next');

  await page.waitForNavigation();

  const hastag = await page.evaluate(() => window.location.hash);
  expect(hastag).toBe(`#/chapter/${1}/level/${2}`);
}, 1000000);

});
