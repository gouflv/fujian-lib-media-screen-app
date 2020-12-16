import { Observable, throwError, timer } from 'rxjs'
import { finalize, mergeMap as switchMap, retryWhen, tap } from 'rxjs/operators'

export const retryWithDelay = (
  delay = 1000,
  maxRetryAttempts = 3,
  scalingFactor = 2,
  excludedStatusCodes = [500, 401],
  resetRetryCountOnEmission = false
) => <T>(source: Observable<T>) => {
  let retryAttempts = 0
  return source.pipe(
    retryWhen((attempts: Observable<any>) => {
      return attempts.pipe(
        switchMap(error => {
          // if maximum number of retries have been met
          // or response is a status code we don't wish to retry, throw error
          if (
            ++retryAttempts > maxRetryAttempts ||
            excludedStatusCodes.find(e => e === error.status)
          ) {
            return throwError(error)
          }
          const tryAfter = delay * scalingFactor ** (retryAttempts - 1)

          console.log(`Attempt ${retryAttempts}: retrying in ${tryAfter}ms`)
          // retry after 1s, 2s, etc...
          return timer(tryAfter)
        }),
        finalize(() => console.log('Done with retrying.'))
      )
    }),
    tap(() => {
      if (resetRetryCountOnEmission) {
        retryAttempts = 0
      }
    })
  )
}
