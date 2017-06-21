import { BlogSampleAngularComponentNgModelPage } from './app.po';

describe('blog-sample-angular-component-ng-model App', () => {
  let page: BlogSampleAngularComponentNgModelPage;

  beforeEach(() => {
    page = new BlogSampleAngularComponentNgModelPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
