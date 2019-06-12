
/* 去掉 interface 的 warning */
// IgnoreWarningPlugin.js
const ModuleDependencyWarning = require('webpack/lib/ModuleDependencyWarning');

// https://github.com/TypeStrong/ts-loader/issues/653
// // ↓ Based on https://github.com/sindresorhus/escape-string-regexp
// const escapeStringForRegExp = string => string.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&');

module.exports = class IgnoreWarningPlugin {
  constructor(option) {
    const op = {
      ...option
    };
    if (op.warningFilter) this.warningFilter = op.warningFilter
  }

  warningFilter(warn) {
    return true;
  }

  apply(compiler) {
    const doneHook = stats => {
      try {
        stats.compilation.warnings = stats.compilation.warnings.filter(warn => {
          if (!(warn instanceof ModuleDependencyWarning) || !warn.message) {
            return true;
          }
          this.warningFilter(warn)
        });
      } catch (err) {
        console.error(err)
      }

    };
    if (compiler.hooks) {
      compiler.hooks.done.tap('IgnoreWarningPlugin', doneHook);
    } else {
      compiler.plugin('done', doneHook);
    }
  }
};