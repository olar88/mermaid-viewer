'use client';

import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { HexColorPicker } from 'react-colorful';

interface ColorPickerProps {
    value: string;
    onChange: (value: string) => void;
    label?: string;
}

export default function ColorPicker({ value, onChange, label }: ColorPickerProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [tempColor, setTempColor] = useState(value);
    const [popoverPos, setPopoverPos] = useState({ top: 0, left: 0 });

    const popoverRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);

    // Sync tempColor when opening
    useEffect(() => {
        if (isOpen) {
            setTempColor(value);
        }
    }, [isOpen, value]);

    // Click outside to close
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                popoverRef.current &&
                !popoverRef.current.contains(event.target as Node) &&
                triggerRef.current &&
                !triggerRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', (event: KeyboardEvent) => {
                if (event.key === 'Escape') {
                    handleCancel()
                }
                if (event.key === 'Enter') {
                    handleSave()
                }
            });
            document.addEventListener('mousedown', handleClickOutside);
            // Also close on scroll to prevent detached popover
            window.addEventListener('scroll', () => setIsOpen(false), true);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            window.removeEventListener('scroll', () => setIsOpen(false), true);
        };
    }, [isOpen]);

    const handleToggle = () => {
        if (!isOpen && triggerRef.current) {
            const rect = triggerRef.current.getBoundingClientRect();
            setPopoverPos({
                top: rect.bottom + 8,
                left: rect.left + rect.width / 2
            });
        }
        setIsOpen(!isOpen);
    };

    const handleSave = () => {
        onChange(tempColor);
        setIsOpen(false);
    };

    const handleCancel = () => {
        setIsOpen(false);
    };

    return (
        <>
            {/* Trigger */}
            <div
                ref={triggerRef}
                className="w-[20px] h-[20px] rounded-[6px] shadow-sm border border-black/10 ring-1 ring-black/5 transition-transform hover:scale-110 cursor-pointer"
                style={{ backgroundColor: value }}
                onClick={handleToggle}
                title={label}
            />

            {/* Popover Portal */}
            {isOpen && createPortal(
                <div
                    ref={popoverRef}
                    style={{
                        top: popoverPos.top,
                        left: popoverPos.left,
                        position: 'fixed'
                    }}
                    className="z-[9999] -translate-x-1/2 bg-colorPicker backdrop-blur-sm rounded-[20px] shadow-xl border border-white/50 p-3 flex flex-col gap-3 min-w-[200px]"
                >
                    <HexColorPicker color={tempColor} onChange={setTempColor} />

                    {/* Hex Input */}
                    <div className="flex items-center gap-2 bg-black/5 rounded-lg px-2 py-1">
                        <span className="text-xs font-bold text-text/60">#</span>
                        <input
                            type="text"
                            value={tempColor.replace('#', '')}
                            onChange={(e) => setTempColor(`#${e.target.value}`)}
                            className="w-full bg-transparent text-xs font-mono text-text outline-none uppercase"
                        />
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between gap-2 pt-1 border-t border-black/5">
                        <button
                            onClick={handleCancel}
                            className="text-text/60 hover:text-text px-3 py-1 text-xs font-medium transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSave}
                            className="bg-accent-pink text-white rounded-[12px] px-3 py-1 text-xs font-bold shadow-sm hover:opacity-90 transition-opacity"
                        >
                            Save
                        </button>
                    </div>
                </div>,
                document.body
            )}
        </>
    );
}
