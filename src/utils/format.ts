import moment from 'moment'

export const dateFormat = (val: string, formatter = 'YYYY-MM-DD HH:mm') =>
  val ? moment(val).format(formatter) : ''
