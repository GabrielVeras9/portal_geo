/* eslint-disable prettier/prettier */
import { CacheInterceptor } from '@nestjs/cache-manager';
import { Injectable, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class CacheContentInterceptor extends CacheInterceptor {
  private readonly noCacheUrls: string[] = [
      '/gps/ultima/posicao',
      '/tabela/horario/csv'
  ];

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const url = request.url;

    if (this.shouldBypassCache(url)) {
      return next.handle();
    }
  
    return (await super.intercept(context, next)).pipe(
      map(response => response)
    );
  }

  private shouldBypassCache(url: string): boolean {
    return this.noCacheUrls.some(noCacheUrl => url.startsWith(noCacheUrl));
  }
}
