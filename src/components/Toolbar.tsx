'use client';

import React from 'react';
import { useStore } from '@/store/useStore';
import { Download, Palette, Layers, Settings } from 'lucide-react';
import ColorPicker from './ColorPicker';

export default function Toolbar() {
    const { config, setConfig, events, updateEventStyle } = useStore();

    const handleDownload = () => {
        const svg = document.querySelector('.mermaid svg');
        if (svg) {
            const svgData = new XMLSerializer().serializeToString(svg);
            const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'cute-diagram.svg';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };



    return (
        <div className="flex flex-col h-full gap-2">

            {/* SECTION A: Global Defaults */}
            <div className="bg-card rounded-[20px] shadow-soft p-5 border border-white/50 shrink-0">
                <div className="p-2 flex items-center gap-2 text-sm font-bold text-text uppercase tracking-wider mb-4 border-b border-accent-yellow/30 pb-2">
                    <Settings size={16} className="text-accent-pink" />
                    <span>Global Defaults</span>
                </div>

                <div className="p-2 flex items-center justify-between gap-2">
                    <div className="flex flex-col items-center gap-1">
                        <span className="text-[10px] font-bold text-text/60 uppercase">Fill</span>
                        <ColorPicker
                            value={config.fill}
                            onChange={(val) => setConfig({ fill: val })}
                            label="Global Fill"
                        />
                    </div>
                    <div className="flex flex-col items-center gap-1">
                        <span className="text-[10px] font-bold text-text/60 uppercase">Stroke</span>
                        <ColorPicker
                            value={config.stroke}
                            onChange={(val) => setConfig({ stroke: val })}
                            label="Global Stroke"
                        />
                    </div>
                    <div className="flex flex-col items-center gap-1 flex-1 ml-2">
                        <span className="text-[10px] font-bold text-text/60 uppercase w-full text-left">Width: {config.strokeWidth}px</span>
                        <input
                            type="range"
                            min="1"
                            max="5"
                            step="1"
                            value={config.strokeWidth}
                            onChange={(e) => setConfig({ strokeWidth: parseInt(e.target.value) })}
                            className="w-full h-2 bg-accent-yellow/30 rounded-full appearance-none cursor-pointer accent-accent-pink"
                        />
                    </div>
                </div>
            </div>

            {/* SECTION B: Node Inspector */}
            <div className="flex-1 bg-card rounded-[20px] shadow-soft border border-white/50 overflow-hidden flex flex-col min-h-0">
                <div className="p-2 flex items-center gap-2 p-4 border-b border-accent-green/20 bg-accent-green/5 shrink-0">
                    <Layers size={16} className="text-accent-green" />
                    <span className="text-sm font-bold text-text uppercase tracking-wider">Node Inspector</span>
                    <span className="ml-auto text-xs font-bold bg-white px-2 py-0.5 rounded-full text-text/60 shadow-sm">
                        {events.length}
                    </span>
                </div>

                <div className="p-2 flex-1 overflow-y-auto p-2 space-y-2">
                    {events.length === 0 ? (
                        <div className="text-center p-8 text-text/40 text-sm italic">
                            No nodes detected yet...
                        </div>
                    ) : (
                        events.map((event) => (
                            <div key={event.name} className="flex items-center justify-between bg-background/50 p-3 rounded-[16px] border border-transparent hover:border-accent-pink/30 hover:bg-white transition-all group">
                                <div className="flex items-center gap-3">
                                    <div className="h-[20px] min-w-[20px] rounded-[10px] bg-[#fff] shadow-sm flex items-center justify-center text-xs font-bold text-text p-1">
                                        {event.name}
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <ColorPicker
                                        value={event.fill}
                                        onChange={(val) => updateEventStyle(event.name, { fill: val })}
                                        label={event.name + "_Fill"}
                                    />
                                    <ColorPicker
                                        value={event.stroke}
                                        onChange={(val) => updateEventStyle(event.name, { stroke: val })}
                                        label={event.name + "_Stroke"}
                                    />
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* SECTION C: Actions */}
            <div className="bg-card rounded-[20px] shadow-soft shrink-0">
                <button
                    onClick={handleDownload}
                    className="button w-full flex items-center justify-center gap-2 bg-accent-pink hover:opacity-90 rounded-[16px] text-sm font-bold transition-all shadow-soft hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0"
                >
                    <Download size={18} />
                    <span>Save SVG</span>
                </button>
            </div>

        </div>
    );
}
