import { Injectable } from '@core';
import AppView from '@renderer/views/app';
import CaptureView from '@renderer/views/capture';
import DocumentView from '@renderer/views/document.pug';
import ServerView from '@renderer/views/server';

@Injectable()
export class ViewsService {
  public get views() {
    return {
      app: AppView,
      capture: CaptureView,
      server: ServerView,
      document: DocumentView as (data: any) => string,
    };
  }
}
