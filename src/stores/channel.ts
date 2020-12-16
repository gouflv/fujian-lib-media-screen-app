import _ from 'lodash'
import {forkJoin, of} from 'rxjs'
import {map, mergeMap, tap} from 'rxjs/operators'
import {request} from '../api'
import {TopChannels} from '../config'
import {Channel} from '../typing'

class ChannelStore {

  channels: Channel[] = []

  findAll() {
    if (this.channels.length) {
      return of(this.channels)
    }

    return ChannelStore.findChannel().pipe(
      map(data => this.parseChannelData(data)),
      mergeMap(data =>
        forkJoin(_.map(data, c => this.findSubChannel(c.id)))
          .pipe(
            map(subChannels =>
              _.map(data, (d, i) => ({
                ...d,
                children: subChannels[i]
              }))
            )
          )
      ),
      tap(data => this.channels = data)
    )
  }

  findSubChannel(parentId: number) {
    return request.get('article/api/channels/getChildId', {
      channelId: parentId,
      size: 100
    }).pipe(
      map(data => _.map(data, reduceChannel))
    )
  }

  private parseChannelData(data) {
    return TopChannels.reduce<Channel[]>((res, name) => {
      const item = _.filter(data, it => it.chnlName === name)
      item.length && res.push(reduceChannel(_.last(item)))
      return res
    }, [])
  }

  private static findChannel() {
    return request.get('article/api/channels', {
      size: 100
    })
  }
}

export const channel = new ChannelStore()

export function reduceChannel(data): Channel {
  return {
    id: parseInt(data.id),
    name: data.chnlName,
    parentId: data.metaInfo.parentId,
    order: data.metaInfo.chnlOrder,
    _meta: data,
    children: []
  }
}
