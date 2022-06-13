import { Inject, Injectable } from '@core';
import { ViewsService } from './views';
import PrePass from 'react-ssr-prepass';
import {getBundles} from '@react-loadable/revised/lib';
import stats from '@build/react-loadable.json';
import manifest from '@build/asset-manifest.json';
import { ReactElement } from 'react';

const  NODE_ENV = process.env.NODE_ENV;

@Injectable()
export class RenderDataService {
  @Inject()
  protected readonly viewsService: ViewsService;

  public preFetchWidgetData(
    rootComponent: (location: string) => JSX.Element,
    dropzones: any,
    pages: any,
    location: string,
  ): Promise<any> {
    let data = {};
    const server = this.viewsService.views.server(
        rootComponent,
        data,
        dropzones,
        pages,
        location
      );
    
    return PrePass(
      server,
      ((element: ReactElement) => {
        if (element && element.type && (element.type as any).loadData) {
          return (element.type as any).loadData(location).then((d) => {
            Object.keys(d).forEach((key) => {
              if (data[key]) {
                console.warn('data override');
              }
            });
            data = {
              ...data,
              ...d,
            };
          });
        }
      }) as any,
    ).then(() => {
      return data;
    });
  }

  public getBundles(capturedModules: any[], boilerplate:boolean) {
    const {assets:  bundles} = getBundles(stats, capturedModules);
    return {
      css: this.getCssBundles(bundles, boilerplate),
      js: this.getJsBundles(bundles, boilerplate),
    };
  }

  protected getCssBundles(bundles: Array<any>, manifest: any): string[] {
    if (NODE_ENV !== 'production') {
      return [];
    }
    const bundleFilePaths = bundles
      .filter((bundle) => bundle.match(/\.css$/))

    return bundleFilePaths;
  }

  protected getJsBundles(bundles: Array<any>, manifest: any): string[] {
    const bundleFilePaths = bundles
      .filter((bundle) => bundle.match(/\.js$/));

    return bundleFilePaths;
  }
}
