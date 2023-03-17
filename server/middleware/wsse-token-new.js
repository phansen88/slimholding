String.prototype.pad = function (length, padding) {
  var padding =
      typeof padding === 'string' && padding.length > 0 ? padding[0] : '\x00',
    length = isNaN(length) ? 0 : ~~length;

  return this.length < length
    ? this + Array(length - this.length + 1).join(padding)
    : this;
};

String.prototype.packHex = function () {
  var source = this.length % 2 ? this + '0' : this,
    result = '';

  for (var i = 0; i < source.length; i = i + 2) {
    result += String.fromCharCode(parseInt(source.substr(i, 2), 16));
  }

  return result;
};
class MyString extends String {
  constructor(x = '') {
    super(x);
    this.otherInstanceProp = ':)';
  }

  somethingStupid() {
    return [].map
      .call(this, function (letter) {
        if (Math.random() * 1 > 0.5) return letter.toUpperCase();
        else return letter.toLowerCase();
      })
      .join('');
  }
}

const crypto = require('crypto');

function getWSSE(key, secret) {
  let timestamp = '2022-08-17T09:46:01+00:00';
  // let date = new Date().toISOString(); // returns format like this 2011-10-05T14:48:00.000Z
  // let timestamp = date.split('.')[0] + '+00:00'; // expected format at host: 2022-08-17T06:25:28+00:00

  let nonce =
    '6c0889556b858cc0764fc30d2cebcd67059df57cf2c49b880b658ddea9d7df6d616a9b0d1c9cdab31b15d12728699cd7a163999d4790a0e7b8814f2421ad0d88';
  // const randomString = crypto.randomBytes(14).toString('hex');
  // const length = 14;
  // const nonce = randomString.substring(0, length);

  let binaryNonce = Buffer.from(nonce, 'utf-8'); // Ta-da

  let sha1Binary = crypto
    .createHash('sha1')
    .update(binaryNonce + timestamp + secret)
    .digest();

  var hexchal = sha1Binary.packHex();

  let digest = Buffer.from(hexchal, 'binary').toString('base64');

  return `UsernameToken Username="${key}", PasswordDigest="${digest}", Nonce="${nonce}", Created="${timestamp}"`;
}
module.exports = {
  getWSSE,
};
