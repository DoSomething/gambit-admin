'use strict';

module.exports.sendResponseForError = function (res, err) {
  return res.send(500).send(err);
};
