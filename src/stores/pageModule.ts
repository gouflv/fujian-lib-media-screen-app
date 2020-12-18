import _ from 'lodash'
import { forkJoin } from 'rxjs'
import { map, mergeMap } from 'rxjs/operators'
import { request } from '../api'
import { Article, ModuleArticles, PageModule } from '../typing'
import { store } from './index'

class PageModuleStore {
  findPageModule(channelId: number) {
    return store.channel.findSubChannel(channelId).pipe(
      mergeMap(channels =>
        forkJoin(
          _.map(channels, c => this.findArticle({ channelId: c.id }))
        ).pipe(
          map(articlesGroup =>
            _.map(
              channels,
              (channel, i) =>
                ({
                  channel,
                  articles: articlesGroup[i]
                } as ModuleArticles)
            )
          )
        )
      ),
      mergeMap(ma =>
        forkJoin([this.findArticle({ channelId })]).pipe(
          map(
            articles =>
              ({
                articles: articles[0],
                modules: ma
              } as PageModule)
          )
        )
      )
    )
  }

  findArticle({ channelId, page = 0, size = 20 }) {
    return request
      .get('article/api/articles', {
        chnlId: channelId,
        page: page,
        size
      })
      .pipe(map(data => _.map(data, reduceArticle)))
  }

  findArticleDetail(id: number) {
    return request.get(`article/api/articles/${id}`).pipe(map(reduceArticle))
  }
}

export const pageModule = new PageModuleStore()

export function reduceArticle(data): Article {
  return {
    id: data.id,
    actionType: data.actionType,
    docType: data.docType,
    listTitle: data.listTitle,
    title: data.title,
    thumbnail:
      _.get(data.metaInfo, 'thumbnails[0]') ||
      _.get(data.metaInfo, 'doc.contentPic[0]'),
    _meta: data
  }
}
