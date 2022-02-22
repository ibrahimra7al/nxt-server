import { Inject, Injectable } from '@core';
import Loadable from 'react-loadable';
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

  public render(location: string): Promise<string> {
    return Loadable.preloadAll()
      .then(() =>
        this.dataService.preFetchWidgetData(
          this.viewsService.views.app as any,
          location,
        ),
      )
      .then((data) =>
        this.renderDocument(this.viewsService.views.app as any, data, location),
      );
  }

  protected renderDocument(
    serverApp: (location) => JSX.Element,
    data: any,
    location: string,
  ): string {
    const modules = [];
    const rootComponent = this.viewsService.views.capture(
      serverApp,
      data,
      location,
      modules,
    );
    const markup = ReactDOMServer.renderToString(rootComponent);
    return this.viewsService.views.document({
      data: {
        helmet: Helmet.renderStatic(),
        data,
        bundles: this.dataService.getBundles(modules),
        markup,
      },
    });
  }
}
