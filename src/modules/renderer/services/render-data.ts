import { Inject, Injectable } from '@core';
import { ViewsService } from './views';
import PrePass from 'react-ssr-prepass';
import { getBundles } from 'react-loadable/webpack';
import stats from '@build/react-loadable.json';
import manifest from '@build/asset-manifest.json';

const PUBLIC_URL = 1,
  NODE_ENV = process.env.NODE_ENV;

@Injectable()
export class RenderDataService {
  @Inject()
  protected readonly viewsService: ViewsService;

  public preFetchWidgetData(
    rootComponent: (location: string) => JSX.Element,
    location: string,
  ): Promise<any> {
    let data = {};
    return PrePass(
      this.viewsService.views.server(rootComponent, data, location),
      (element: any) => {
        if (element && element.type && element.type.loadData) {
          return element.type.loadData(location).then((d) => {
            Object.keys(d).forEach((key) => {
              if (data[key]) {
                console.warn("ass hole you're overriding another widget data");
              }
            });
            data = {
              ...data,
              ...d,
            };
          });
        }
      },
    ).then(() => {
      return data;
    });
  }

  public getBundles(capturedModules: any[]) {
    const bundles = getBundles(stats, capturedModules);
    return {
      css: this.getCssBundles(bundles, manifest),
      js: this.getJsBundles(bundles, manifest),
    };
  }

  protected getCssBundles(bundles: Array<any>, manifest: any): string[] {
    if (NODE_ENV !== 'production') {
      return [];
    }
    const mainCSS = manifest['main.css'];
    const bundleFilePaths = bundles
      .filter((bundle) => bundle.file.match(/\.css$/))
      .map((cssBundle) => `${PUBLIC_URL}/${cssBundle.file}`);

    return [mainCSS, ...bundleFilePaths];
  }

  protected getJsBundles(bundles: Array<any>, manifest: any): string[] {
    const mainJS = manifest['main.js'];
    const bundleFilePaths = bundles
      .filter((bundle) => bundle.file.match(/\.js$/))
      .map((jsBundle) => `${PUBLIC_URL}/${jsBundle.file}`);

    return [...bundleFilePaths, mainJS];
  }
}
