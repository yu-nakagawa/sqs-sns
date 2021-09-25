exports.handler = async event => {
  event.Records.forEach(record => {
    const parsedBody = JSON.parse(record.body)
    const message = parsedBody.Message
    const parsedMessage = JSON.parse(message)
    console.log('parsedMessage:', parsedMessage)

    const entry = parsedMessage.entry
    console.log('entry:', entry)
  })
}
