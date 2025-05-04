import { parse } from '../WebsiteStuff/CSVparse.js';

global.fetch = jest.fn(() =>
  Promise.resolve({
    text: () => Promise.resolve("name,age\nAlice,30\nBob,25")
  })
);

test('parse ruturns an array', async() => {
    const data = await parse();
    expect(Array.isArray(data)).toBe(true);
});

test('parse returns an array of arrays', async() => {
    const data = await parse();
    expect(data.length).toBeGreaterThan(0);
    data.forEach(row => {
        expect(Array.isArray(row)).toBe(false);
    });
}
);


