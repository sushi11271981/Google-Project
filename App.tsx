
import React, { useState, useCallback } from 'react';
import { generatePhysicsSimCode } from './services/geminiService';
import CodeBlock from './components/CodeBlock';
import { CodeIcon, RunIcon } from './components/Icons';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [pythonCode, setPythonCode] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleGenerateCode = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setPythonCode('');
    try {
      const code = await generatePhysicsSimCode();
      const cleanedCode = code.replace(/^```python\n|```$/g, '').trim();
      setPythonCode(cleanedCode);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(`代码生成失败: ${err.message}`);
      } else {
        setError('发生未知错误');
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 flex flex-col items-center p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-300">
            Python 物理模拟代码生成器
          </h1>
          <p className="text-lg text-gray-400">
            为您的 macOS 系统生成一个使用 `pygame` 库的 "落沙" 风格物理模拟 Python 程序。
          </p>
        </header>

        <main className="bg-gray-800/50 rounded-xl shadow-2xl p-6 backdrop-blur-sm border border-gray-700">
          {!pythonCode && !isLoading && (
            <div className="text-center">
              <p className="mb-6 text-gray-300">
                点击下方按钮，AI 将为您生成一个完整的、可立即运行的 Python 物理模拟脚本。
              </p>
              <button
                onClick={handleGenerateCode}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-500/50 flex items-center justify-center mx-auto"
                disabled={isLoading}
              >
                <CodeIcon className="w-6 h-6 mr-2" />
                生成代码
              </button>
            </div>
          )}

          {isLoading && (
            <div className="flex flex-col items-center justify-center p-10">
              <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-blue-400"></div>
              <p className="mt-4 text-lg text-gray-300">正在为您生成代码，请稍候...</p>
            </div>
          )}

          {error && (
            <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg text-center">
              <p className="font-bold">出错啦！</p>
              <p>{error}</p>
            </div>
          )}

          {pythonCode && (
            <div className="flex flex-col space-y-6">
              <CodeBlock code={pythonCode} />
              <div>
                <h2 className="text-2xl font-semibold mb-3 text-white flex items-center">
                  <RunIcon className="w-6 h-6 mr-2 text-teal-400" />
                  如何运行
                </h2>
                <div className="bg-gray-900/70 p-4 rounded-lg border border-gray-700 space-y-3 text-gray-300">
                  <p>1. 确保您的 Mac 上已安装 Python 3。您可以在终端中运行 `python3 --version` 来检查。</p>
                  <p>2. 安装 `pygame` 库。在终端中运行以下命令：</p>
                  <pre className="bg-black/50 p-2 rounded-md text-sm text-cyan-300"><code>pip install pygame</code></pre>
                  <p>3. 将上方生成的代码复制并保存到一个文件中，例如 `simulation.py`。</p>
                  <p>4. 在终端中，导航到保存文件的目录，并运行脚本：</p>
                  <pre className="bg-black/50 p-2 rounded-md text-sm text-cyan-300"><code>python3 simulation.py</code></pre>
                </div>
              </div>
               <button
                onClick={handleGenerateCode}
                className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 self-center"
                disabled={isLoading}
              >
                重新生成
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default App;
