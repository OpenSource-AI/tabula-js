'use strict';

const path          = require('path')
    , spawn         = require('child_process').spawn
    , _             = require('lodash');

module.exports = TabulaCommand;

function TabulaCommand(pdfPath, commandArgs){
  if (!(this instanceof TabulaCommand)) return new TabulaCommand(pdfPath, commandArgs);
  this._build(pdfPath, commandArgs);
}

TabulaCommand.prototype.run = function () {
  return spawn('java', this.args);
};

TabulaCommand.prototype._build = function (pdfPath, commandArgs) {
  let processedArgs = _.flatten(_.toPairs(_.mapKeys(commandArgs, (value, key) => `--${_.kebabCase(key)}`)));
  _.remove(processedArgs, (arg) => _.isEmpty(arg) || _.isUndefined(arg));

  this.args = ['-jar', path.join(__dirname, 'tabula-java.jar')];
  this.args = this.args.concat(processedArgs);
  this.args = this.args.concat([pdfPath]);
  return this;
};
