import React from 'react';
import CodeBlock from '@theme/CodeBlock';
import { useLocation } from '@docusaurus/router';
import * as path from 'path-browserify';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'

let extToLang = new Map([
  ["sh", "bash"],
  ["yml", "yaml"]
]);

export default function FileBlock({ file, showFileName, ...prop }: { file: string, showFileName?: boolean }) {
  var urlPath = useLocation().pathname.replace(/^\/|\/$/g, '');
  const { i18n } = useDocusaurusContext()
  if (i18n.currentLocale != i18n.defaultLocale) {
    urlPath = urlPath.replace(/^[^\/]*\/?/g, '')
  }
  const firstSlashIndex = urlPath.indexOf('/');
  var topPath: string = ""
  if (firstSlashIndex !== -1) {
    topPath = urlPath.substring(0, firstSlashIndex)
  } else {
    topPath = urlPath
  }

  const filename = path.basename(file);
  var language = path.extname(filename).replace(/^\./, '')
  const langMappingName = extToLang.get(language)
  if (langMappingName) {
    language = langMappingName
  }
  var content = require('!!raw-loader!@site/' + topPath + "/codeblock/" + file)?.default
  content = content.replace(/\t/g, "  "); // replace tab to 2 spaces
  if (!prop.title && showFileName) { // set title to filename if showFileName is set and title is not set
    prop.title = filename
  }
  return (
    <CodeBlock language={language} {...prop}>
      {content}
    </CodeBlock>
  );
}
