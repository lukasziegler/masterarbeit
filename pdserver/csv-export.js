var Response = Schema.ResponseModel;
 
/* Script from: https://gist.github.com/killercup/8538011 */

module.exports.getResponsesCSV = function (req, res, campaignId) {
  function CSVEscape(field) {
    return '"' + String(field || "").replace(/\"/g, '""') + '"';
  }
  
  var headers = [
    'Timestamp', //timestamp
    'Answer', //answer
    'Question', //question
    'Question Type', //question
    'Display', //medium
    'Campaign', //term
    'Survey', //content
    'Response ID' //_id
    // 'Session', //session
  ].map(CSVEscape).join(',');
 
  function docToCSV(doc) {
    return [
      doc.timestamp,
      doc.answer,
      doc.question.wording,
      doc.question.type,
      doc.display,
      doc.campaign,
      doc.survey,
      doc._id
      // doc.session,
    ].map(CSVEscape).join(',');
  }
 
  var started = false;
  function start(response) {
    response.setHeader('Content-disposition', 'attachment; filename=responses.csv');
    response.contentType('csv');
    response.write(headers + '\n');
    started = true;
  }
 
  Response.find({ 'campaign': campaignId })
    .sort('timestamp')
    .stream()
    .on('data', function (response) {
      if (!started) { start(res); }
      res.write(docToCSV(response) + '\n');
    })
    .on('close', function () {
      res.end();
    })
    .on('error', function (err) {
      res.send(500, {err: err, msg: "Failed to get responses from db"});
    });
};
