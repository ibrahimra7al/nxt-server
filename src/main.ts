import { Factory } from '@core';
import { PrimaryModule } from '@primary';
(async () => {
  const app = await Factory.create(PrimaryModule);
  await app.listen(3000);
})();
