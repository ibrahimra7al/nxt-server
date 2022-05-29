import { Factory } from '@core';
import { PrimaryModule } from '@primary';
declare const module: any;

(async () => {
  const app = await Factory.create(PrimaryModule);
  app.enableCors();
  await app.listen(3000);
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
})();
