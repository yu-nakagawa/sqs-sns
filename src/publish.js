const AWS = require('aws-sdk')

exports.handler = async event => {
  const _message = {
    default: 'default message',
    sqs: {
      // 申込みに関する情報
      entry: {
        name: 'Sample Name',
        telNo: '09012345678',
      },
    },
  }
  // ダブルクオートをエスケープする必要があるので二段階で行う
  _message.sqs = JSON.stringify(_message.sqs)
  const message = JSON.stringify(_message)

  AWS.config.update({ region: 'ap-northeast-1' })
  const params = {
    //SNSのリソースネームを記載
    TopicArn: '(topicのarn)',
    // JSONの場合はこの記述が必要
    MessageStructure: 'json',
    Message: message,
    //フィルタリングをするために必要
    MessageAttributes: {
      event_type: {
        DataType: 'String',
        StringValue: 'entry',
      },
    },
  }
  const publishTextPromise = new AWS.SNS({ apiVersion: '2010-03-31' })
    .publish(params)
    .promise()
  try {
    const data = await publishTextPromise
    console.log(`Message: ${params.Message}, topic: ${params.TopicArn}`)
    const response = {
      statusCode: 200,
      body: 'success!',
    }
    return response
  } catch (err) {
    console.error(err)
    const response = {
      statusCode: 500,
      body: 'error!',
    }
    return response
  }
}
