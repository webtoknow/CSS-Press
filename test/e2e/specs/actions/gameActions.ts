
export const goToFirstLevel = async (page) => {
  await page.waitForSelector(selectors.firstLevel, { visible: true });
  await page.click(selectors.firstLevel);
};

export const skipTutorial = async (page) => {
  await page.waitForSelector(selectors.skipTutorial, { visible: true });
  await page.click(selectors.skipTutorial);
};

export const selectors = { 
  firstLevel: '.chapter:first-of-type .chapter__body li:first-child a',
  skipTutorial: '#skip-tutorial',
  code: '#code',
}