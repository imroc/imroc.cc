import React from 'react';
// Import the original mapper
import MDXComponents from '@theme-original/MDXComponents';
import FileBlock from '@site/src/components/FileBlock';
import Tabs from '@theme-original/Tabs';
import TabItem from '@theme-original/TabItem';
import CodeBlock from '@theme-original/CodeBlock';

export default {
  // Re-use the default mapping
  ...MDXComponents,
  CodeBlock,
  FileBlock,
  Tabs,
  TabItem,
};
