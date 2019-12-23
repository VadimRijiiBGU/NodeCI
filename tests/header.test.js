const puppeteer = require('puppeteer');
const userFactory = require('./factories/userFactory');
const sessionFactory = require('./factories/sessionFactory');
const Page = require('./helpers/page');

let page;

beforeEach(async () => {
    page = await Page.build();
    await page.goto('http://localhost:3000');
});

afterEach(async () => {
    page.close();
});

test('The header has the correct text', async () => {
    const content = await page.getContentOf('a.brand-logo');

    expect(content).toEqual('Blogster');
});

test('Clicking login button', async () => {
    await page.click('.right a');

    const url = page.url();
    expect(url).toMatch(/accounts\.google\.com/);
});

test('When signed in, show logout button', async () => {
    //const id = '5dfa3e9eca0c551218acfc70';

    await page.login();

    const content = await page.getContentOf('.right li:nth-child(2) a');
    await page.click('.right li:nth-child(2) a');
    expect(content).toEqual('Logout');
});
