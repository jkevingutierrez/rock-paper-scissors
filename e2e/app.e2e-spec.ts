import { AppPage } from './app.po';

describe('rock-paper-scissors App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should have a title', () => {
    page.navigateTo();
    expect(page.getPageTitle()).toEqual('Game of Drones');
  });
});
