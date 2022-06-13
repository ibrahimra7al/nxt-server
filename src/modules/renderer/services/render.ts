import { Inject, Injectable } from '@core';
import {preloadAll} from '@react-loadable/revised';
import ReactDOMServer from 'react-dom/server';
import Helmet from 'react-helmet';
import { RenderDataService } from '@renderer/services/render-data';
import { ViewsService } from '@renderer/services/views';

@Injectable()
export class RenderService {
  @Inject()
  protected readonly dataService: RenderDataService;

  @Inject()
  protected readonly viewsService: ViewsService;

  public render(location: string, dropzones: any, pages: any, boilerplate:boolean = false): Promise<string> {
    const docPages = [...pages];
    return preloadAll()
      .then(() =>
        this.dataService.preFetchWidgetData(
          this.viewsService.views.app as any,
          dropzones,
          pages,
          location,
        )
      )
      .then((data) =>
        this.renderDocument(
          this.viewsService.views.app as any,
          data,
          dropzones,
          docPages,
          location,
          boilerplate,
        )
      );
  }

  protected renderDocument(
    serverApp: (location) => JSX.Element,
    data: any,
    dropzones: any,
    pages: any,
    location: string,
    boilerplate:boolean,
  ): string {
    const modules = [];
    const rootComponent = this.viewsService.views.capture(
      serverApp,
      data,
      dropzones,
      location,
      modules,
      pages,
    );
    const markup = ReactDOMServer.renderToString(rootComponent);
    return this.viewsService.views.document({
      data: {
        helmet: Helmet.renderStatic(),
        data,
        pages,
        dropzones,
        markup,
        bundles: this.dataService.getBundles(modules, boilerplate),
      },
    });
  }
}
