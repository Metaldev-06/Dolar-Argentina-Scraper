import puppeteer from "puppeteer";

export const extractDolarValue = async () => {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch({
    headless: true,
    devtools: false,
    // slowMo: 50,
  });
  const page = await browser.newPage();
  await page.goto("https://www.finanzasargy.com/");

  // Esperar a que se cargue el elemento específico antes de evaluar
  await page.waitForSelector(".chakra-card.css-12yfeo");

  const dolarValue = await page.evaluate(() => {
    const seen = new Set();
    const cards = document.querySelectorAll(
      ".css-19l7epd .chakra-card.css-12yfeo"
    );
    return Array.from(cards)
      .map((el) => {
        const title = el.querySelector(".chakra-heading")?.textContent?.trim();
        const sellPrice = el
          .querySelector(".css-4xmv73 .css-umkzdf")
          ?.textContent?.trim();
        const buyPrice = el
          .querySelector(".css-4xmv73 .css-exeauf")
          ?.textContent?.trim();
        return {
          title,
          buyPrice,
          sellPrice,
        };
      })
      .filter((quote) => {
        const key = `${quote.title}-${quote.buyPrice}-${quote.sellPrice}`;
        if (seen.has(key)) {
          return false;
        } else {
          seen.add(key);
          return true;
        }
      });
  });

  await browser.close();

  return dolarValue;
};
