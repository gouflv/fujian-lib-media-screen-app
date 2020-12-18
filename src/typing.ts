export interface Channel {
  id: number
  name: string
  parentId: number
  children?: Channel[]
  order: number
  _meta: any
}

export enum ActionType {}

export enum DOCType {
  NEWS = 1,
  PIC = 2,
  TOPIC = 3,
  LINK = 4,
  ACTIVITY = 5,
  VIDEO = 7,
  LIVE = 8
}

export interface Article {
  id: number
  actionType: ActionType
  docType: DOCType
  listTitle: string
  title: string
  thumbnail: string
  _meta: any
}

export interface ModuleArticles {
  channel: Channel
  articles: Article[]
}

export interface PageModule {
  modules: ModuleArticles[]
  articles: Article[]
}
