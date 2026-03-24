import { useState, useRef, useCallback, useMemo } from 'react';
import { PRINCIPLES_DATA, Principle } from '../constants/principles';

export type DemoState = {
  likes: Record<string, boolean>;
  tasks: string[];
  isModalOpen: boolean;
  kpiData: { label: string; value: number }[];
  animationsEnabled: boolean;
  typingText: string;
  hoveredId: string | null;
  clickedId: string | null;
};

export const initialState: DemoState = {
  likes: {},
  tasks: ["Design phase 1", "Design phase 2"],
  isModalOpen: false,
  kpiData: [
    { label: "Active Users", value: 1231 },
    { label: "Revenue", value: 8420 },
    { label: "Conversion", value: 3.2 }
  ],
  animationsEnabled: true,
  typingText: "",
  hoveredId: null,
  clickedId: null,
};

export type CursorState = {
  visible: boolean;
  x: number;
  y: number;
  clicking: boolean;
};

export function useDemoState() {
  const [state, setState] = useState<DemoState>(initialState);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [cursor, setCursor] = useState<CursorState>({ visible: false, x: 0, y: 0, clicking: false });
  const [showToast, setShowToast] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const targetRefs = useRef<Record<string, HTMLElement | null>>({});
  const sequenceId = useRef(0);

  const getCoords = useCallback((id: string) => {
    const el = targetRefs.current[id];
    if (el) {
      const rect = el.getBoundingClientRect();
      return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
    }
    return { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  }, []);

  const resetState = useCallback(() => {
    setState(initialState);
    setCursor({ visible: false, x: 0, y: 0, clicking: false });
    setShowToast(false);
    setLoading(false);
    setSidebarOpen(true);
  }, []);

  const runSequence = useCallback(async (id: string, seq: number, actions: () => Promise<void>) => {
    if (sequenceId.current !== seq) return;
    await actions();
    if (sequenceId.current === seq) {
      setPlayingId(null);
      setCursor(prev => ({ ...prev, visible: false }));
    }
  }, []);

  const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const moveCursor = useCallback(async (targetId: string, seq: number, startX?: number, startY?: number) => {
    if (sequenceId.current !== seq) return;
    
    if (startX !== undefined && startY !== undefined) {
      setCursor(prev => ({ ...prev, visible: true, x: startX, y: startY, clicking: false }));
      await wait(100);
    }

    const { x, y } = getCoords(targetId);
    setCursor(prev => ({ ...prev, visible: true, x, y, clicking: false }));
    await wait(600); // Wait for cursor to move
    if (sequenceId.current !== seq) return;
    
    setState(s => ({ ...s, hoveredId: targetId }));
    await wait(300); // Wait 300ms after arrival
  }, [getCoords]);

  const clickCursor = useCallback(async (seq: number, targetId?: string) => {
    if (sequenceId.current !== seq) return;
    setCursor(prev => ({ ...prev, clicking: true }));
    if (targetId) setState(s => ({ ...s, clickedId: targetId }));
    await wait(150);
    if (sequenceId.current !== seq) return;
    setCursor(prev => ({ ...prev, clicking: false }));
    if (targetId) setState(s => ({ ...s, clickedId: null }));
    await wait(150);
  }, []);

  const hideCursorAndAnimate = useCallback(async (seq: number, action: () => void) => {
    if (sequenceId.current !== seq) return;
    setCursor(prev => ({ ...prev, visible: false }));
    await wait(150);
    if (sequenceId.current !== seq) return;
    action();
  }, []);

  const PRINCIPLES = useMemo(() => {
    const dict: Record<number, Principle> = {};
    for (let i = 1; i <= 12; i++) {
      const data = PRINCIPLES_DATA[i];
      dict[i] = {
        ...data,
        action: (play: boolean) => {
          if (!play) {
            sequenceId.current += 1;
            setPlayingId(null);
            resetState();
            return;
          }

          const seq = ++sequenceId.current;
          setPlayingId(data.id);
          resetState();

          runSequence(data.id, seq, async () => {
            switch (data.id) {
              case 'p1': // Squash & Stretch (New Task button)
              case 'p3': // Staging (Modal)
              case 'p9': // Timing (Toast)
              case 'p10': // Exaggeration (Checkmark)
                await moveCursor('btn-new-task', seq);
                if (sequenceId.current !== seq) return;
                await clickCursor(seq, 'btn-new-task');
                await hideCursorAndAnimate(seq, () => {
                  setState(s => ({ ...s, isModalOpen: true }));
                });
                await wait(500);
                await moveCursor('modal-input', seq);
                if (sequenceId.current !== seq) return;
                await clickCursor(seq, 'modal-input');
                
                // Type text
                const text = "New animated task";
                for (let i = 1; i <= text.length; i++) {
                  if (sequenceId.current !== seq) return;
                  setState(s => ({ ...s, typingText: text.slice(0, i) }));
                  await wait(50);
                }
                await wait(300);

                await moveCursor('modal-save', seq);
                if (sequenceId.current !== seq) return;
                await clickCursor(seq, 'modal-save');
                await hideCursorAndAnimate(seq, () => {
                  setState(s => ({ ...s, isModalOpen: false, typingText: "" }));
                  setShowToast(true);
                });
                await wait(3000);
                setShowToast(false);
                break;
              case 'p2': // Anticipation (Hover task row)
                await moveCursor('task-0', seq);
                await wait(1000);
                setState(s => ({ ...s, hoveredId: null }));
                break;
              case 'p4': // Straight Ahead vs Pose (Spinner)
                await moveCursor('btn-reload', seq);
                if (sequenceId.current !== seq) return;
                await clickCursor(seq, 'btn-reload');
                await hideCursorAndAnimate(seq, () => {
                  setLoading(true);
                });
                await wait(2000);
                setLoading(false);
                break;
              case 'p5': // Follow Through (Metric cards)
                setLoading(true);
                await wait(100);
                setLoading(false);
                await wait(1500);
                break;
              case 'p6': // Slow In & Slow Out (Sidebar)
                await moveCursor('btn-sidebar', seq);
                if (sequenceId.current !== seq) return;
                await clickCursor(seq, 'btn-sidebar');
                await hideCursorAndAnimate(seq, () => {
                  setSidebarOpen(false);
                });
                await wait(1000);
                await clickCursor(seq, 'btn-sidebar');
                await hideCursorAndAnimate(seq, () => {
                  setSidebarOpen(true);
                });
                await wait(1000);
                break;
              case 'p7': // Arcs (Notification)
                await moveCursor('btn-new-task', seq);
                if (sequenceId.current !== seq) return;
                await clickCursor(seq, 'btn-new-task');
                await hideCursorAndAnimate(seq, () => {
                  setState(s => ({ ...s, isModalOpen: true }));
                });
                await wait(500);
                await moveCursor('modal-save', seq);
                if (sequenceId.current !== seq) return;
                await clickCursor(seq, 'modal-save');
                await hideCursorAndAnimate(seq, () => {
                  setState(s => ({ ...s, isModalOpen: false }));
                });
                // Arcs animation handled in component
                await wait(2000);
                break;
              case 'p8': // Secondary Action (Upgrade button)
                await moveCursor('btn-upgrade', seq);
                await wait(1500);
                setState(s => ({ ...s, hoveredId: null }));
                break;
              case 'p11': // Solid Drawing (Pro card)
                await moveCursor('card-pro', seq);
                await wait(1500);
                setState(s => ({ ...s, hoveredId: null }));
                break;
              case 'p12': // Appeal (Heart)
                await moveCursor('btn-like-0', seq);
                if (sequenceId.current !== seq) return;
                await clickCursor(seq, 'btn-like-0');
                await hideCursorAndAnimate(seq, () => {
                  setState(s => ({ ...s, likes: { ...s.likes, '0': true } }));
                });
                await wait(1500);
                break;
            }
          });
        }
      };
    }
    return dict;
  }, [moveCursor, clickCursor, resetState, runSequence]);

  const toggleAnimationsEnabled = useCallback((enabled: boolean) => {
    setState(s => ({ ...s, animationsEnabled: enabled }));
  }, []);

  return {
    state,
    setState,
    playingId,
    cursor,
    showToast,
    loading,
    setLoading,
    sidebarOpen,
    setSidebarOpen,
    theme,
    setTheme,
    targetRefs,
    PRINCIPLES,
    toggleAnimationsEnabled
  };
}
