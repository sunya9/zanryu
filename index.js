const moment = require('moment')
const r2 = require('r2')
const parser = require('urlencoded-body-parser')

const {
  MESSAGE: text = '残留届けが切れました。更新してください。',
  DATE = '2weeks',
  TIME = '09:00',
  TOKEN: token,
  VERIFICATION_TOKEN
} = process.env

module.exports = async req => {
  const data = await parser(req)
  const { token: verificationToken, channel_id: channel } = data
  if(VERIFICATION_TOKEN !== verificationToken) {
    return 'VERIFICATION_TOKENが一致しません。'
  }
  try {
    const [, n, unit] = DATE.match(/(\d+)(\w+)/)
    const [, hour, minute] = TIME.match(/(\d{2}):?(\d{2})/)
    const time = moment()
      .add(n, unit)
      .set({ hour, minute })
      .format('YYYY/MM/DD HH:mm')
    const { json } = await r2.post('https://slack.com/api/reminders.add', {
      json: {
        text, time, channel
      },
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    if(json.ok) {
      return 'リマインダーを設定しました。'
    } else {
      return `APIエラーが発生しました ${json.error}`
    }
  } catch(e) {
    return `エラーが発生しました: ${e.name} ${e.message}`
  }
}