const crypto = require('crypto');
const { promisify } = require('util');

const config = {
  hashBytes: 32,
  saltBytes: 16,
  iterations: 872791,
};

async function hashPassword(password) {
  const salt = await promisify(crypto.randomBytes)(config.saltBytes);
  const hash = await promisify(crypto.pbkdf2)(password, salt, config.iterations, config.hashBytes, 'sha1');
  // eslint-disable-next-line no-buffer-constructor
  const combined = new Buffer(hash.length + salt.length + 8);
  combined.writeUInt32BE(salt.length, 0, true);
  combined.writeUInt32BE(config.iterations, 4, true);

  salt.copy(combined, 8);
  hash.copy(combined, salt.length + 8);
  return combined.toString('base64');
}

async function verifyPassword(password, hashForCheck) {
  const combined = Buffer.from(hashForCheck, 'base64');
  // extract the salt and hash from the combined buffer
  const saltBytes = combined.readUInt32BE(0);
  const hashBytes = combined.length - saltBytes - 8;
  const iterations = combined.readUInt32BE(4);
  const salt = combined.slice(8, saltBytes + 8);
  const hash = combined.toString('binary', saltBytes + 8);

  const verify = await promisify(crypto.pbkdf2)(password, salt, iterations, hashBytes, 'sha1');
  return verify.toString('binary') === hash;
}

module.exports = { hashPassword, verifyPassword };
