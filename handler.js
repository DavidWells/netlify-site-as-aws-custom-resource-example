
module.exports.hello = (event, context, callback) => {
  return callback(null, {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Your function executed successfully!',
      input: event,
    }),
  })
}
