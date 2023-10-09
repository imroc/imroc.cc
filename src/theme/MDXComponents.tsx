import React from 'react';
// Import the original mapper
import MDXComponents from '@theme-original/MDXComponents';
import FileBlock from '@site/src/components/FileBlock';

export default {
  // Re-use the default mapping
  ...MDXComponents,
  FileBlock,
};
