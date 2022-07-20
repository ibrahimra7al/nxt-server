import { PlatformApp, Factory } from '@core';
import { PrimaryModule } from '@primary';
import { join } from 'path';
declare const module: any;

(async () => {
  const app = await Factory.create<PlatformApp>(PrimaryModule);
  app.useStaticAssets(join(process.cwd(), 'build'));
  app.enableCors();
  await app.listen(3000);
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
  console.log('Server started at port 3000');
})();
