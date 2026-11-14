import * as puppeteer from 'puppeteer';
import { selectors } from './actions/gameActions';
import { chapters } from './../../../src/const/chapters';
import type { ILevel } from './../../../src/models/Game';
import { getServerUrl } from './../../../startServer';

let browser: puppeteer.Browser;
let page: puppeteer.Page;

const baseUrl = getServerUrl();

function levelHash(chapterNumber: number, levelNumber: number) {
  return `#/chapter/${chapterNumber}/level/${levelNumber}`;
}

function nextLevelHash(chapterIndex: number, levelIndex: number) {
  let nextChapterNumber = chapterIndex + 1;
  let nextLevelNumber = levelIndex + 2;

  if (nextLevelNumber > chapters[chapterIndex].levels.length) {
    nextChapterNumber += 1;
    nextLevelNumber = 1;
  }

  return levelHash(nextChapterNumber, nextLevelNumber);
}

function buildAnswer(level: ILevel) {
  return level.solutions
    .map(([property, ...values]) => `${property}: ${values[0]};`)
    .join(' ');
}

async function reloadWithFreshState() {
  await page.goto(`${baseUrl}/${levelHash(1, 1)}`, { waitUntil: 'networkidle0' });
  await page.evaluate(() => localStorage.clear());
  await page.reload({ waitUntil: 'networkidle0' });
}

async function dismissTutorial() {
  await page.waitForSelector(selectors.skipTutorial, { visible: true, timeout: 10000 });
  await page.click(selectors.skipTutorial);
  await page.waitForSelector(selectors.code, { visible: true });
  // Give the game machine a tick to receive TUTORIAL_STATUS_CHANGED.
  await new Promise((resolve) => setTimeout(resolve, 250));
}

async function startPlaying() {
  await reloadWithFreshState();
  await dismissTutorial();
}

async function fillCode(answer: string) {
  await page.waitForSelector(selectors.code, { visible: true });
  await page.$eval(
    selectors.code,
    (element, value) => {
      const prototype =
        element instanceof HTMLTextAreaElement
          ? HTMLTextAreaElement.prototype
          : HTMLInputElement.prototype;
      const setter = Object.getOwnPropertyDescriptor(prototype, 'value')?.set;
      setter?.call(element, value);
      element.dispatchEvent(new Event('input', { bubbles: true }));
    },
    answer
  );
}

beforeAll(async () => {
  browser = await puppeteer.launch();
  page = await browser.newPage();
  await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
});

afterAll(async () => {
  await browser.close();
});

describe('CSS Press game', () => {
  it('should display all levels on the dashboard', async () => {
    await startPlaying();
    await page.goto(`${baseUrl}/#/`, { waitUntil: 'networkidle0' });
    await page.waitForSelector('.chapter');

    const links = await page.$$eval('.chapter .chapter__body a', (elements) =>
      elements.map((element) => (element as HTMLAnchorElement).hash)
    );
    const expectedLinks = chapters.flatMap((chapter, chapterIndex) =>
      chapter.levels.map((_, levelIndex) =>
        levelHash(chapterIndex + 1, levelIndex + 1)
      )
    );

    expect(links).toEqual(expectedLinks);
  });

  it('should open the tutorial on the first level', async () => {
    await reloadWithFreshState();

    await page.waitForSelector(selectors.skipTutorial, { visible: true });
    const hash = await page.evaluate(() => window.location.hash);
    const isSkipVisible = await page.$eval(
      selectors.skipTutorial,
      (element) => element.getBoundingClientRect().width > 0
    );

    expect(isSkipVisible).toBeTruthy();
    expect(hash).toBe(levelHash(1, 1));
  });

  it('should reject a wrong answer and resolve a correct one', async () => {
    await startPlaying();

    await fillCode('font-size: 12px;');
    await page.click('#next');

    await page.waitForFunction(() =>
      document.querySelector('.code')?.classList.contains('animate__shakeX')
    );
    expect(await page.$eval(selectors.code, (element) => element.className)).toContain(
      'code__input--error'
    );

    await page.waitForFunction(
      () => !document.querySelector('.code')?.classList.contains('animate__shakeX')
    );
    expect(await page.$eval(selectors.code, (element) => element.className)).not.toContain(
      'code__input--error'
    );

    await fillCode('font-size: 16px;');
    await page.waitForFunction(() =>
      document.querySelector('#next')?.classList.contains('animate__pulse')
    );

    expect(await page.evaluate(() => localStorage.getItem('is-level-solved-1-1'))).toBe('true');

    const resolvedStyle = await page.$eval(
      '.article__body .ripped-effect',
      (element) => {
        const styles = getComputedStyle(element);
        return {
          padding: styles.padding,
          borderLeft: styles.borderLeftWidth,
          borderRight: styles.borderRightWidth,
          boxShadow: styles.boxShadow,
        };
      }
    );
    expect(resolvedStyle).toEqual({
      padding: '0px',
      borderLeft: '0px',
      borderRight: '0px',
      boxShadow: 'none',
    });

    await page.click('#next');
    await page.waitForFunction(
      (expectedHash) => window.location.hash === expectedHash,
      {},
      levelHash(1, 2)
    );
  }, 30000);

  it('should open the menu and navigate to a level', async () => {
    await startPlaying();

    await page.click('.menu__open');
    await page.waitForSelector('.menu__list--open', { visible: true });
    await new Promise((resolve) => setTimeout(resolve, 600));

    await page.$$eval('.menu__level', (items) => {
      (items[1] as HTMLElement).click();
    });
    await page.waitForFunction(
      (expectedHash) => window.location.hash === expectedHash,
      {},
      levelHash(1, 2)
    );
    await page.waitForFunction(
      () => !document.querySelector('.menu__list--open')
    );
  });

  it('should open and close the Pressmen Tools', async () => {
    await startPlaying();

    await page.click('.article__toggle');
    await page.waitForSelector('.pressmen-tools', { visible: true });

    await page.click('.article__toggle');
    await page.waitForFunction(() => !document.querySelector('.pressmen-tools'));
  });

  it(
    'should complete every level and show the completion modal',
    async () => {
      await startPlaying();

      for (const [chapterIndex, chapter] of chapters.entries()) {
        for (const [levelIndex, level] of chapter.levels.entries()) {
          const currentHash = levelHash(chapterIndex + 1, levelIndex + 1);
          const isLastLevel =
            chapterIndex === chapters.length - 1 &&
            levelIndex === chapter.levels.length - 1;

          await page.waitForFunction(
            (expectedHash) => window.location.hash === expectedHash,
            {},
            currentHash
          );
          await page.waitForSelector(selectors.code, { visible: true });
          await page.waitForFunction(
            () => document.querySelector<HTMLInputElement | HTMLTextAreaElement>('#code')?.value === ''
          );

          const answer = buildAnswer(level);
          await fillCode(answer);
          await page.waitForFunction(() =>
            document.querySelector('#next')?.classList.contains('animate__pulse')
          );

          await page.click('#next');

          if (isLastLevel) {
            await page.waitForFunction(() =>
              document.body.innerText.includes('Congratulations!')
            );
            return;
          }

          await page.waitForFunction(
            (expectedHash) => window.location.hash === expectedHash,
            {},
            nextLevelHash(chapterIndex, levelIndex)
          );
        }
      }
    },
    180000
  );
});
