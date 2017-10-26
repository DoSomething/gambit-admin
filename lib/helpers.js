'use strict';

module.exports.sendResponseForError = function (res, err) {
  console.log(err);
  return res.status(500).send(err);
};
