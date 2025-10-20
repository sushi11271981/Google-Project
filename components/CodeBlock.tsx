
import React, { useState } from 'react';
import { CopyIcon, CheckIcon } from './Icons';

interface CodeBlockProps {
  code: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="relative bg-gray-900 rounded-lg shadow-lg">
      <div className="absolute top-2 right-2">
        <button
          onClick={handleCopy}
          className={`p-2 rounded-md transition-colors duration-200 ${
            isCopied
              ? 'bg-green-600 text-white'
              : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
          }`}
          aria-label={isCopied ? '已复制' : '复制到剪贴板'}
        >
          {isCopied ? (
            <CheckIcon className="w-5 h-5" />
          ) : (
            <CopyIcon className="w-5 h-5" />
          )}
        </button>
      </div>
      <pre className="p-4 overflow-auto max-h-[50vh] text-sm text-white rounded-lg">
        <code className="language-python">{code}</code>
      </pre>
    </div>
  );
};

export default CodeBlock;
