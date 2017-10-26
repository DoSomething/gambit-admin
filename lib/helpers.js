'use strict';

module.exports.sendResponseForError = function (res, err) {
  return res.status(500).send(err);
};
