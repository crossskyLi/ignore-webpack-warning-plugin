

const reg = /export '(.*)' was not found in '(.*)'/
const sourceFiles = [/(Interface)*/g];
const exportNames = [];

const warningFilter = (warn) => {

  // const reg = /export '(.*)' \((imported|reexported) as '.*'\)? was not found in '(.*)'/; // it didn't work

  const matchedResult = warn.message.match(reg);

  console.log('**** the warn.message ****', warn.message)

  if (!matchedResult) {
    return true;
  }

  const [, exportName, sourceFile] = matchedResult;
  const customRulesIgnore = {
    exportNames: false,
    sourceFiles: false
  };
  const exportNamesLength = exportNames.length;
  if (exportNamesLength) {
    for (let i = 0; i < ignoredExportNamesLength; i++) {
      const rule = exportNames[i];
      if (typeof rule === 'string' && rule === exportName) {
        customRulesIgnore.exportNames = true;
        break;
      } else if (rule instanceof RegExp && rule.test(exportName)) {
        customRulesIgnore.exportNames = true;
        break;
      }
    }
  } else {
    customRulesIgnore.exportNames = true;
  }
  const sourceFilesLength = sourceFiles.length
  if (sourceFilesLength) {
    for (let i = 0; i < sourceFilesLength; i++) {
      const rule = sourceFiles[i];
      if (typeof rule === 'string' && ruleReg.test(sourceFile)) {
        customRulesIgnore.sourceFiles = true;
        break;
      } else if (rule instanceof RegExp && rule.test(sourceFile)) {
        customRulesIgnore.sourceFiles = true;
        break;
      }
    }
  } else {
    customRulesIgnore.sourceFiles = true;
  }
  let ret = false;
  Object.keys(customRulesIgnore).forEach(key => {
    if (!customRulesIgnore[key]) {
      ret = true;
    }
  });

  return ret;
}
module.exports = warningFilter