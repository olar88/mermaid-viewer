'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Minus, Plus, RotateCcw } from 'lucide-react';
import mermaid from 'mermaid';
import { useStore } from '@/store/useStore';

mermaid.initialize({
    startOnLoad: false,
    theme: 'base',
    securityLevel: 'loose',
    fontFamily: 'Nunito, sans-serif',
});

export default function Preview() {
    const { code, config, events, zoomLevel, setZoomLevel } = useStore();
    const containerRef = useRef<HTMLDivElement>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const renderDiagram = async () => {
            if (!containerRef.current) return;

            // 1. Base default style
            let styleDirective = `\nclassDef default fill:${config.fill},stroke:${config.stroke},stroke-width:${config.strokeWidth}px,color:#555,rx:20,ry:20;\n`;

            // 2. Per-node styles
            events.forEach((event) => {
                styleDirective += `style ${event.name} fill:${event.fill},stroke:${event.stroke},stroke-width:${event.strokeWidth}px\n`;
            });

            const styledCode = code + styleDirective;

            try {
                containerRef.current.innerHTML = '';
                const { svg } = await mermaid.render('mermaid-svg', styledCode);
                containerRef.current.innerHTML = svg;
                setError(null);
            } catch (err) {
                console.error('Mermaid rendering error:', err);
                setError('Oups! Something is wrong with the code. 🥺');
            }
        };

        const timeoutId = setTimeout(renderDiagram, 300);
        return () => clearTimeout(timeoutId);
    }, [code, config, events]);

    return (
        <div className="flex flex-col h-full w-full overflow-hidden relative rounded-[20px] border border-white/20 shadow-sm">
            {error && (
                <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-accent-pink text-white px-8 py-4 rounded-[20px] shadow-soft z-20 font-bold animate-bounce text-center">
                    {error}
                </div>
            )}
            <div className="flex-1 overflow-auto flex items-center justify-center p-12 bg-white/50 backdrop-blur-sm">
                <div
                    style={{
                        transform: `scale(${zoomLevel})`,
                        transformOrigin: 'center center'
                    }}
                    className="transition-transform duration-200"
                >
                    <div ref={containerRef} />
                </div>
            </div>

            {/* Floating Zoom Controls */}
            <div className="absolute bottom-4 right-4 flex items-center gap-1 bg-white/80 backdrop-blur-sm border border-white/50 shadow-soft rounded-[20px] p-1.5 z-10">
                <button
                    onClick={() => setZoomLevel(zoomLevel - 0.1)}
                    className="flex justify-center items-center cursor-pointer p-2 aspect-square hover:bg-black/5 rounded-full transition-colors text-text/80 active:scale-95"
                    title="Zoom Out"
                >
                    <Minus size={16} />
                </button>
                <span className="text-xs font-bold text-text/80 min-w-[3rem] text-center select-none tabular-nums">
                    {Math.round(zoomLevel * 100)}%
                </span>
                <button
                    onClick={() => setZoomLevel(zoomLevel + 0.1)}
                    className="flex justify-center items-center cursor-pointer p-2 aspect-square hover:bg-black/5 rounded-full transition-colors text-text/80 active:scale-95"
                    title="Zoom In"
                >
                    <Plus size={16} />
                </button>
                <div className="w-px h-4 bg-black/10 mx-1" />
                <button
                    onClick={() => setZoomLevel(1.0)}
                    className="flex justify-center items-center cursor-pointer p-2 aspect-square hover:bg-black/5 rounded-full transition-colors text-text/80 active:scale-95"
                    title="Reset Zoom"
                >
                    <RotateCcw size={16} />
                </button>
            </div>
        </div>
    );
}
