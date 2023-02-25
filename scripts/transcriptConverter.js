const transcript = require('../transcript.json');

const markedTranscript = transcript.map((record) => {
  if (record.type === 'choice') {
    return record.text
      .split('\n')
      .filter(Boolean)
      .map((choice) => '* ' + choice)
      .join('\n') + '\n';
  } else if (record.type === 'choice-selection') {
    return '<strong>' + record.text.trim() + '</strong>' + '\n';
  } else {
    return record.text.trimRight() + '\n';
  }
}).join('\n');

require('fs-extra').writeFileSync(require('path').join(__dirname, '..', 'transcript.md'), markedTranscript);