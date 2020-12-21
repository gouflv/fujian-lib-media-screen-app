import _ from 'lodash'
import { forkJoin, of } from 'rxjs'
import { map, mergeMap } from 'rxjs/operators'
import { request } from '../api'
import {
  Article,
  Book,
  BookGroup,
  Channel,
  ModuleArticles,
  PageModule
} from '../typing'
import { store } from './index'

class PageModuleStore {
  findPageModule(channel: Channel) {
    return store.channel.findSubChannel(channel).pipe(
      // merge ModuleArticles
      mergeMap(channels => {
        if (!channels.length) {
          return of([])
        }
        return forkJoin(
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
      }),
      // merge PageModule
      mergeMap(ma =>
        forkJoin([this.findArticle({ channelId: channel.id })]).pipe(
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

  findBookGroups(preSize = 9) {
    return request
      .get('article/api/getBookChannel', {
        categoryId: 775
      })
      .pipe(
        map(data => data.data),
        mergeMap(cate =>
          forkJoin(_.map(cate, c => this.findBooks(c.id, 0, preSize))).pipe(
            map(bookGroup =>
              _.map(cate, (c, i) => {
                return {
                  group: c,
                  books: bookGroup[i]
                } as BookGroup
              })
            )
          )
        )
      )
  }

  private findBooks(categoryId: number, page: number, size: number) {
    return request
      .get('article/api/articles/ViewAndListen', {
        categoryId,
        type: 1,
        page,
        size
      })
      .pipe(
        map(data => data.bookListInfo),
        map(data => _.map(data, reduceBooks))
      )
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

export function reduceBooks(data): Book {
  return {
    id: _.get(data, 'document.id'),
    title: _.get(data, 'document.title'),
    author: _.get(data, 'document.author'),
    thumbnail: _.get(data, 'document.thumbnail'),
    file: _.get(data, 'document.bookurl'),
    _meta: data
  }
}
