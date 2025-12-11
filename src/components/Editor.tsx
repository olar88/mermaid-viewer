'use client';

import React from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs';
import 'prismjs/components/prism-mermaid';
import 'prismjs/themes/prism.css';
import { useStore } from '@/store/useStore';

export default function CodeEditor() {
    const { code, setCode } = useStore();

    return (
        <div className="h-full w-full bg-card overflow-auto font-mono text-sm custom-scrollbar rounded-[20px]">
            <Editor
                value={code}
                onValueChange={setCode}
                highlight={(code) => highlight(code, languages.js, 'javascript')}
                padding={32}
                className="min-h-full"
                style={{
                    fontFamily: '"Nunito", "Fira Code", monospace',
                    fontSize: 15,
                    backgroundColor: 'var(--card-bg)',
                    color: 'var(--text-color)',
                    lineHeight: '1.8',
                }}
            />
        </div>
    );
}
