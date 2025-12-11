import { create } from 'zustand';

interface Config {
    fill: string;
    stroke: string;
    strokeWidth: number;
}

interface EventStyle {
    name: string;
    fill: string;
    stroke: string;
    strokeWidth: number;
}

interface AppState {
    code: string;
    setCode: (code: string) => void;
    config: Config;
    setConfig: (config: Partial<Config>) => void;
    events: EventStyle[];
    updateEventStyle: (name: string, style: Partial<EventStyle>) => void;
    zoomLevel: number;
    setZoomLevel: (level: number) => void;
}

const DEFAULT_CODE = `graph TD
    A[Start] --> B{Is it working?}
    B -- Yes --> C[Great!]
    B -- No --> D[Debug it]`;

// Regex to capture potential node IDs
// Captures alphanumeric strings followed by [, (, {, >, or connection lines
const NODE_REGEX = /\b([a-zA-Z0-9_]+)(?=\[|\(|\{|>|\s*[-=.]>)/g;
const IGNORED_KEYWORDS = new Set(['graph', 'subgraph', 'end', 'style', 'classDef', 'click', 'linkStyle', 'TD', 'LR', 'TB', 'RL']);

export const useStore = create<AppState>((set, get) => ({
    code: DEFAULT_CODE,
    config: {
        fill: '#ffcc00',
        stroke: '#333333',
        strokeWidth: 2,
    },
    events: [],
    zoomLevel: 1.0,
    setCode: (code) => {
        const { config, events } = get();

        // 1. Parse nodes from code
        const matches = code.match(NODE_REGEX) || [];
        const uniqueNodes = Array.from(new Set(matches)).filter(
            (node) => !IGNORED_KEYWORDS.has(node)
        );

        // 2. Smart Sync
        const newEvents: EventStyle[] = [];

        uniqueNodes.forEach((nodeName) => {
            const existingEvent = events.find((e) => e.name === nodeName);
            if (existingEvent) {
                // Keep existing style
                newEvents.push(existingEvent);
            } else {
                // Add new with default global config
                newEvents.push({
                    name: nodeName,
                    fill: config.fill,
                    stroke: config.stroke,
                    strokeWidth: config.strokeWidth,
                });
            }
        });

        set({ code, events: newEvents });
    },
    setConfig: (newConfig) =>
        set((state) => ({ config: { ...state.config, ...newConfig } })),
    updateEventStyle: (name, style) =>
        set((state) => ({
            events: state.events.map((e) =>
                e.name === name ? { ...e, ...style } : e
            ),
        })),
    setZoomLevel: (level) =>
        set(() => {
            const clamped = Math.min(Math.max(level, 0.5), 3.0);
            return { zoomLevel: clamped };
        }),
}));
