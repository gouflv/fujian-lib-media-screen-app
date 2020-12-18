import { Subscription } from 'rxjs'

export const autoUnsubscribe = (ob: Subscription) => {
  return () => {
    ob && !ob.closed && ob.unsubscribe()
  }
}
