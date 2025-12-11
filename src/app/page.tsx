import Editor from '@/components/Editor';
import Preview from '@/components/Preview';
import Toolbar from '@/components/Toolbar';
import pkg from '../../package.json';

export default function Home() {
  // 從 package.json 中獲取版本號
  const version = pkg.version ?? "0.0.1";
  const author = pkg.author ?? "Odette";

  return (
    // ROOT: 鎖定視窗高度，無全域滾動，統一間距 gap-2 (8px)，外圍內距 p-2 (8px)
    <main className="flex h-[96%] w-[98%] flex-col overflow-hidden bg-background text-text p-2 gap-2 font-sans">

      {/* HEADER: 獨立卡片，統一 p-3 (12px) */}
      <header className="p-3 flex items-center px-6 bg-card rounded-[20px] shadow-soft shrink-0 border border-white/50">
        <h1 className="text-3xl font-bold text-text tracking-wide flex items-center gap-3">
          <span className="bg-gradient-to-r from-accent-pink to-accent-green bg-clip-text">
            Mermaid Editor
          </span>
        </h1>
        <div className="ml-auto text-sm font-bold text-text bg-accent-yellow px-4 py-2 rounded-[20px] shadow-sm">
          v{version} by {author}
        </div>

      </header>

      {/* MAIN CONTENT AREA: 填滿剩餘空間，內部不滾動 (overflow-hidden) */}
      <div className="flex flex-1 gap-2 overflow-hidden min-h-0">

        {/* LEFT PANEL: Editor */}
        <section data-region="editor" className="flex w-[25%] min-w-[300px] flex-col rounded-[20px] bg-card shadow-soft border border-white/50 overflow-hidden">
          {/* Panel Header: p-3 (12px) */}
          <div className="flex shrink-0 items-center gap-2 border-b border-accent-pink/20 bg-accent-pink/10 p-3 text-sm font-bold uppercase tracking-wider text-text">
            <span>✏️ Code Editor</span>
          </div>
          {/* Content: p-3 (12px), 獨立滾動 */}
          <div className="flex-1 overflow-y-auto p-3 scrollbar-hide">
            <Editor />
          </div>
        </section>

        {/* MIDDLE PANEL: Preview */}
        <section data-region="preview" className="flex flex-1 flex-col rounded-[20px] bg-card shadow-soft border border-white/50 overflow-hidden relative">
          {/* Panel Header: p-3 (12px) - 移除了 absolute，改為標準流 */}
          <div className="flex shrink-0 items-center gap-2 border-b border-accent-green/20 bg-accent-green/10 p-3 text-sm font-bold uppercase tracking-wider text-text">
            <span>👀</span> Preview
          </div>
          {/* Content: p-3 (12px), 獨立滾動 */}
          <div className="flex-1 overflow-y-auto p-3 flex justify-center items-center bg-white/50">
            <Preview />
          </div>
        </section>

        {/* RIGHT PANEL: Toolbar */}
        {/* 也加上卡片樣式以保持視覺一致性 */}
        <section data-region="toolbar" className="flex w-[240px] flex-col rounded-[20px] bg-card shadow-soft border border-white/50 overflow-hidden">
          <div className="flex shrink-0 items-center gap-2 border-b border-accent-yellow/50 bg-accent-yellow/20 p-3 text-sm font-bold uppercase tracking-wider text-text">
            <span>🎨</span> Styles
          </div>
          <div className="flex-1 overflow-y-auto p-3">
            <Toolbar />
          </div>
        </section>

      </div>
    </main>
  );
}