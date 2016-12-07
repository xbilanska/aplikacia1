import { Aplikacia1Page } from './app.po';

describe('aplikacia1 App', function() {
  let page: Aplikacia1Page;

  beforeEach(() => {
    page = new Aplikacia1Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
