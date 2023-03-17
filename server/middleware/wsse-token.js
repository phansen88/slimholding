/* eslint-disable no-restricted-globals */
/* eslint-disable no-bitwise */
/* eslint-disable operator-assignment */
/* eslint-disable vars-on-top */
/* eslint-disable one-var */
/* eslint-disable prefer-template */
/* eslint-disable prettier/prettier */
/* eslint-disable no-var */

var crypto = require('crypto');
//var Buffer = require('buffer/').Buffer;
var base64_decode = require('../helpers/base64_decode');
var base64_encode = require('../helpers/base64_encode');

/**
 * WSSEToken
 * @constructor
 * @param {Object} options
 * @return {WSSEToken}
 */
function WSSEToken(options) {
  if (!(this instanceof WSSEToken)) return new WSSEToken(options);

  if (!(options.user || options.username)) throw new Error('Empty username');

  if (!options.password) throw new Error('Empty password');

  this.user = options.user || options.username;
  this.password = options.password;

  this.nonceBytes = options.nonceBytes || 16;
  this.nonceEncoding = options.nonceEncoding || 'hex';

  this.digestAlgorithm = options.digestAlgorithm || 'sha1';
  this.digestEncoding = options.digestEncoding || 'hex';
  this.digestBase64 =
    options.digestBase64 != null ? options.digestBase64 : true;
}

/**
 * WSSEToken prototype
 * @type {Object}
 */
WSSEToken.prototype = {
  constructor: WSSEToken,

  pad: function (data, length, padding) {
    var padding =
        typeof padding === 'string' && padding.length > 0 ? padding[0] : '\x00',
      length = isNaN(length) ? 0 : ~~length;

    return data.length < length
      ? data + Array(length - data.length + 1).join(padding)
      : data;
  },

  packHex: function (data) {
    var source = data.length % 2 ? data + '0' : data,
      result = '';
    for (var i = 0; i < source.length; i = i + 2) {
      result += String.fromCharCode(parseInt(source.substr(i, 2), 16));
    }
    return result;
  },

  getTimestamp: function () {
    return '2022-08-17T10:35:21+00:00';
    let date = new Date().toISOString(); // returns format like this 2011-10-05T14:48:00.000Z
    date = date.split('.')[0] + '+00:00'; // expected format at host: 2022-08-17T06:25:28+00:00
    return date;
    // eslint-disable-next-line no-unreachable
    // return new Date().toISOString();
  },

  /*
  getNonce: function (encoding) { 
    const randomString = crypto
      .randomBytes(this.nonceBytes)
      .toString(encoding || this.nonceEncoding);
    return crypto
      .createHash('sha512')
      .update(randomString, 'utf-8')
      .digest('hex');
  },

  getDigest: function (nonce, timestamp, encoding) {
    return crypto
      .createHash(this.digestAlgorithm)
      .update(base64Decode(nonce) + timestamp + this.password, 'binary')
      .digest(encoding || this.digestEncoding);
  },
  */

  /* getNonce: function (encoding) {
    const randomString = crypto
      .randomBytes(this.nonceBytes)
      .toString(encoding || this.nonceEncoding);
    return crypto
      .createHash('sha512')
      .update(randomString, 'hex')
      .digest('hex');
  }, */

  // getDigest: function (nonce, timestamp, encoding) {
  // base64_encode(sha1(base64_decode($nonce) . $created . $password, true));
  /*
    return crypto
      .createHash('sha1')
      .update(base64Decode(nonce) + timestamp + this.password)
      .digest('binary')
      .toString('binary');

    /* return crypto
      .createHash(this.digestAlgorithm)
      .update(base64Decode(nonce) + timestamp + this.password, 'binary')
      .digest(encoding || this.digestEncoding); */
  // },

  getNonce: function (encoding) {
    return '5ab489ae4352b79de969a3c186fb24ccbb6c5adfc4a2b896115eb22758ebacef31332c91cfd6cca029e9242dc396c423f88b4c16647a0e6b5dba6823f2473f18';
    const randomString = crypto.randomBytes(14).toString('hex');
    const length = 14;
    const nonce = randomString.substring(0, length);
    console.log('nonce: ' + nonce);
    console.log(
      'sha512 hash nonce: ' +
        crypto.createHash('sha512').update(nonce).digest('hex')
    );
    return crypto.createHash('sha512').update(nonce).digest('hex');
    /* 
    console.log(
      'f3d9fdfd8d604756f8bb271b056d5652d63a20a93dea554ca6df273ff2ac6ad5edbc1934504c506c25dc47af0670acd89db78a2b269c149feff1af1fdb7b9d9d'
    );
    return crypto.createHash('sha512').update('262fb9e16b617b').digest('hex');
    return crypto
      .randomBytes(this.nonceBytes)
      .toString(encoding || this.nonceEncoding); */
  },

  getDigest: function (nonce, timestamp, secret) {
    console.log('digest nonce: ' + nonce);
    console.log('digest timestamp: ' + timestamp);
    console.log('digest secret: ' + secret);
    console.log('base64 decodenonce ' + base64_decode(nonce));

    var base64Nonce = base64_decode(nonce);
    var hashed = crypto
      .createHash('sha1')
      .update(base64Nonce + timestamp + secret)
      .digest();

    var digest = base64_encode(hashed);

    /*
    let binaryNonce = Buffer.from(nonce, 'utf-8'); // Ta-da
    console.log(binaryNonce);

    let sha1Binary = crypto
      .createHash('sha1')
      .update(base64_decode(nonce) + timestamp + secret)
      .digest();

    if (this.digestBase64) {
      digest = base64_encode(sha1Binary);
    }
    */

    // base64_encode(sha1(base64_decode($nonce).$created.$secret, true));
    //var hexchal = this.packHex(sha1Binary);

    //let digest = Buffer.from(hexchal, 'binary').toString('base64');
    console.log('digest ' + digest);
    //console.log('digest attempt ' + sha1Binary);
    console.log('digest to match 64Rc2yfXDEXHw318TPexxz/btE0=');
    return digest;

    /*
    console.log(
      base64(
        crypto
          .createHash('sha1')
          .update(base64Decode(nonce) + timestamp + this.password)
          .digest()
      )
    );
    console.log('/CWwn1jqPemvyAXcDCeOcErZVNg=');
    return let digest   = crypto.createHash('sha1').update('string').digest();
process.stdout.write( digest );
*/
    /*
    console.log(
      crypto
        .createHash(this.digestAlgorithm)
        .update(base64Decode(nonce) + timestamp + this.password)
        .digest(encoding || this.digestEncoding)
    );
    return crypto
      .createHash(this.digestAlgorithm)
      .update(base64Decode(nonce) + timestamp + this.password)
      .digest(encoding || this.digestEncoding); */
  },

  toString: function () {
    var nonce = this.getNonce();
    var timestamp = this.getTimestamp();
    var digest = this.getDigest(nonce, timestamp, this.password);

    /*
    if (this.digestBase64) {
      digest = base64(digest);
    }
    */
    // eslint-disable-next-line no-unreachable
    return (
      'UsernameToken Username="' +
      this.user +
      '", PasswordDigest="' +
      digest +
      '", Nonce="' +
      nonce +
      '", Created="' +
      timestamp +
      '"'
    );
  },
};

// Exports
module.exports = WSSEToken;
