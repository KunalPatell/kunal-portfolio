const fs = require("fs");

const origReadlinkSync = fs.readlinkSync;
fs.readlinkSync = function (path, options) {
  try {
    return origReadlinkSync.call(fs, path, options);
  } catch (err) {
    if (err && (err.code === "EISDIR" || err.code === "UNKNOWN")) {
      const einval = new Error(`EINVAL: invalid argument, readlink '${path}'`);
      einval.code = "EINVAL";
      einval.errno = -4071;
      einval.syscall = "readlink";
      einval.path = path;
      throw einval;
    }
    throw err;
  }
};

const origReadlink = fs.readlink;
fs.readlink = function (path, options, callback) {
  if (typeof options === "function") {
    callback = options;
    options = {};
  }
  return origReadlink.call(fs, path, options, (err, linkString) => {
    if (err && (err.code === "EISDIR" || err.code === "UNKNOWN")) {
      const einval = new Error(`EINVAL: invalid argument, readlink '${path}'`);
      einval.code = "EINVAL";
      einval.errno = -4071;
      einval.syscall = "readlink";
      einval.path = path;
      return callback ? callback(einval) : undefined;
    }
    return callback ? callback(err, linkString) : undefined;
  });
};

if (fs.promises && fs.promises.readlink) {
  const origPromisesReadlink = fs.promises.readlink;
  fs.promises.readlink = async function (path, options) {
    try {
      return await origPromisesReadlink.call(fs.promises, path, options);
    } catch (err) {
      if (err && (err.code === "EISDIR" || err.code === "UNKNOWN")) {
        const einval = new Error(`EINVAL: invalid argument, readlink '${path}'`);
        einval.code = "EINVAL";
        einval.errno = -4071;
        einval.syscall = "readlink";
        einval.path = path;
        throw einval;
      }
      throw err;
    }
  };
}
