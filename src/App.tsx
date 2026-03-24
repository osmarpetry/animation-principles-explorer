import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, MotionConfig } from 'motion/react';
import { LayoutDashboard, Layers, Zap, Plus, Search, Bell, CheckCircle2, Star, ArrowRight, RefreshCw, Moon, Sun } from 'lucide-react';
import * as Ariakit from "@ariakit/react";

import { useDemoState } from './hooks/useDemoState';
import { PrincipleList } from './components/sidebar/PrincipleList';
import { KpiCardList } from './components/dashboard/KpiCardList';
import { TaskList } from './components/dashboard/TaskList';
import { CreateTaskModal } from './components/dashboard/CreateTaskModal';
import { ActionButton } from './components/ui/ActionButton';

export function App() {
  const {
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
  } = useDemoState();

  const mainPanelRef = useRef<HTMLElement>(null);
  const [themeAnim, setThemeAnim] = useState<{ x: number, y: number, targetTheme: 'light' | 'dark' } | null>(null);

  const toggleTheme = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const targetTheme = theme === 'light' ? 'dark' : 'light';
    setThemeAnim({ x, y, targetTheme });
    
    setTimeout(() => {
      setTheme(targetTheme);
      setThemeAnim(null);
    }, 600);
  };

  const setRef = (id: string) => (el: HTMLElement | null) => {
    targetRefs.current[id] = el;
  };

  const isEnabled = () => state.animationsEnabled;

  return (
    <MotionConfig transition={state.animationsEnabled ? undefined : { duration: 0 }}>
      <div className={`min-h-screen font-sans flex flex-col md:flex-row transition-colors duration-0 ${theme === 'dark' ? 'dark bg-slate-900 text-slate-100' : 'bg-slate-100 text-slate-900'}`}>
        
        {/* Theme Explosion Overlay */}
        <AnimatePresence>
          {themeAnim && (
            <motion.div
              initial={{ clipPath: `circle(0px at ${themeAnim.x}px ${themeAnim.y}px)` }}
              animate={{ clipPath: `circle(150vw at ${themeAnim.x}px ${themeAnim.y}px)` }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className={`fixed inset-0 z-[9999] pointer-events-none ${themeAnim.targetTheme === 'dark' ? 'bg-slate-900' : 'bg-slate-100'}`}
            />
          )}
        </AnimatePresence>

        {/* Fake Cursor Overlay */}
        <AnimatePresence>
          {cursor.visible && (
            <motion.div
              initial={{ x: cursor.x, y: cursor.y, opacity: 0 }}
              animate={{ 
                x: cursor.x, 
                y: cursor.y, 
                opacity: 1,
                scale: cursor.clicking ? 0.8 : 1
              }}
              exit={{ opacity: 0 }}
              transition={{ 
                x: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
                y: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
                scale: { duration: 0.1 },
                opacity: { duration: 0.2 }
              }}
              className="fixed z-[200] pointer-events-none text-slate-900 drop-shadow-md"
              style={{ top: 0, left: 0, marginLeft: -12, marginTop: -12 }}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="white" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z" />
                <path d="M13 13l6 6" />
              </svg>
            </motion.div>
          )}
        </AnimatePresence>

        {/* --- LEFT PANEL: Controls --- */}
        <aside className="w-full md:w-80 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 flex flex-col h-screen sticky top-0 overflow-y-auto">
          <div className="p-6 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
            <h1 className="text-xl font-black text-slate-900 dark:text-white mb-2">12 Principles</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">Click play to see each principle in action.</p>
            
            <div className="flex items-center justify-between p-2 bg-slate-200/50 dark:bg-slate-700/50 rounded-lg">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Global Animations</span>
              <Ariakit.Button 
                onClick={() => toggleAnimationsEnabled(!state.animationsEnabled)}
                className={`relative inline-flex h-4 w-7 items-center rounded-full transition-colors ${state.animationsEnabled ? 'bg-indigo-500' : 'bg-slate-400'}`}
              >
                <motion.span 
                  layout
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className={`inline-block h-2.5 w-2.5 transform rounded-full bg-white transition-transform ${state.animationsEnabled ? 'translate-x-3.5' : 'translate-x-0.5'}`}
                />
              </Ariakit.Button>
            </div>
          </div>
          
          <PrincipleList principles={PRINCIPLES} playingId={playingId} />
          
          {/* Theme Toggle */}
          <div className="p-4 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
            <Ariakit.Button
              onClick={toggleTheme}
              className="w-full flex items-center justify-center gap-2 p-3 rounded-lg bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors font-bold text-sm"
            >
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
              {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
            </Ariakit.Button>
          </div>
        </aside>

        {/* --- RIGHT PANEL: SaaS Demo --- */}
        <main ref={mainPanelRef} className="flex-1 bg-slate-100 dark:bg-slate-900 p-4 md:p-8 overflow-y-auto relative h-screen">
          
          {/* Top Bar Controls for Demo */}
          <div className="mb-6 flex items-center justify-between bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-4">
              <ActionButton 
                ref={setRef('btn-sidebar')}
                onClick={() => setSidebarOpen(s => !s)}
                className="p-2 bg-slate-100 dark:bg-slate-700 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300"
              >
                <LayoutDashboard size={20} />
              </ActionButton>
              <h2 className="font-bold text-lg text-slate-900 dark:text-white">SaaS Dashboard Demo</h2>
            </div>
            <ActionButton 
              ref={setRef('btn-reload')}
              onClick={() => {
                setLoading(true);
                setTimeout(() => setLoading(false), 1500);
              }}
              className="flex items-center gap-2 px-4 py-2 bg-slate-900 dark:bg-indigo-600 text-white text-sm font-bold rounded-lg hover:bg-slate-800 dark:hover:bg-indigo-700"
            >
              <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
              Reload Data
            </ActionButton>
          </div>

          {/* The SaaS App Container */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden flex h-[700px] relative">
            
            {/* P6: Slow In & Slow Out (Sidebar Easing) */}
            <motion.div 
              initial={false}
              animate={{ width: sidebarOpen ? 240 : 0, opacity: sidebarOpen ? 1 : 0 }}
              transition={{ 
                duration: isEnabled() ? 0.4 : 0.01, 
                ease: isEnabled() ? [0.25, 1, 0.5, 1] : "linear" 
              }}
              className="relative bg-slate-900 dark:bg-slate-950 text-slate-300 flex flex-col overflow-hidden whitespace-nowrap"
            >
              <div className="p-6 font-black text-white text-xl flex items-center gap-2">
                <Zap className="text-indigo-400" /> AnimSaaS
              </div>
              <nav className="flex-1 px-4 py-2 flex flex-col gap-2">
                {['Dashboard', 'Projects', 'Analytics', 'Settings'].map((item, i) => (
                  <div key={item} className={`p-3 rounded-lg flex items-center gap-3 cursor-pointer ${i === 0 ? 'bg-indigo-600 text-white' : 'hover:bg-slate-800 dark:hover:bg-slate-900'}`}>
                    <Layers size={18} /> {item}
                  </div>
                ))}
              </nav>
            </motion.div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col relative bg-slate-50 dark:bg-slate-900/50 overflow-y-auto overflow-x-hidden">
              
              {/* Header */}
              <header className="h-16 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-6 flex items-center justify-between sticky top-0 z-10">
                <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-900 px-3 py-1.5 rounded-lg">
                  <Search size={16} />
                  <span className="text-sm">Search...</span>
                </div>
                <div className="flex items-center gap-4 relative">
                  
                  {/* P7: Arcs (Notification Dot) */}
                  <div className="relative">
                    <Bell size={20} className="text-slate-600 dark:text-slate-400" />
                    <AnimatePresence>
                      {isEnabled() && !state.isModalOpen && (
                        <motion.div
                          initial={{ x: -200, y: 200, scale: 0 }}
                          animate={{ 
                            x: 0, 
                            y: 0, 
                            scale: 1,
                            transition: {
                              x: { ease: "linear", duration: 0.5 },
                              y: { ease: "easeOut", duration: 0.5 },
                              scale: { duration: 0.2 }
                            }
                          }}
                          exit={{ scale: 0 }}
                          className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-rose-500 rounded-full"
                        />
                      )}
                    </AnimatePresence>
                  </div>
                  <div className="w-8 h-8 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 rounded-full flex items-center justify-center font-bold text-sm">
                    OP
                  </div>
                </div>
              </header>

              <div className="p-6 flex-1">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Overview</h2>
                  
                  {/* P1: Squash & Stretch (Button Tap) */}
                  <ActionButton
                    ref={setRef('btn-new-task')}
                    onClick={() => setState(s => ({ ...s, isModalOpen: true }))}
                    whileTap={isEnabled() ? { scaleX: 1.05, scaleY: 0.9 } : { scale: 1 }}
                    whileHover={isEnabled() ? { scale: 1.02 } : {}}
                    className="relative bg-indigo-600 dark:bg-indigo-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-bold shadow-md"
                  >
                    <Plus size={16} /> New Task
                  </ActionButton>
                </div>

                {loading ? (
                  <div className="flex items-center justify-center h-64">
                    {/* P4: Straight Ahead vs Pose to Pose (Spinner) */}
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ 
                        repeat: Infinity, 
                        duration: 1, 
                        ease: isEnabled() ? "linear" : "easeInOut" 
                      }}
                      className="relative w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full"
                    />
                  </div>
                ) : (
                  <>
                    {/* P5: Follow Through (Staggered Entry) */}
                    <KpiCardList 
                      data={state.kpiData}
                      isStaggerEnabled={isEnabled()}
                      isHoverEnabled={isEnabled()}
                      setRef={(index, el) => setRef(`kpi-${index}`)(el)}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <TaskList 
                        tasks={state.tasks}
                        likes={state.likes}
                        onLike={(index) => {
                          setState(s => ({ ...s, likes: { ...s.likes, [index]: !s.likes[index] } }));
                        }}
                        isHoverEnabled={isEnabled()}
                        isLikeAnimEnabled={isEnabled()}
                        setRef={(index, el) => setRef(`task-${index}`)(el)}
                        setLikeRef={(index, el) => setRef(`btn-like-${index}`)(el)}
                      />

                      {/* P11: Solid Drawing (3D Tilt Card) */}
                      <motion.div 
                        ref={setRef('card-pro')}
                        whileHover={isEnabled() ? { rotateX: 5, rotateY: -5, scale: 1.02 } : {}}
                        style={{ transformStyle: "preserve-3d", perspective: 1000 }}
                        className="relative bg-gradient-to-br from-indigo-600 to-violet-700 dark:from-indigo-800 dark:to-violet-900 rounded-xl p-6 text-white shadow-lg flex flex-col justify-between"
                      >
                        <div style={{ transform: isEnabled() ? "translateZ(20px)" : "none" }}>
                          <Star className="text-amber-300 mb-2" size={24} />
                          <h3 className="font-bold text-lg">Pro Plan</h3>
                          <p className="text-indigo-100 text-sm mt-1">Unlock all animation features.</p>
                        </div>
                        
                        {/* P8: Secondary Action (Arrow on hover) */}
                        <ActionButton 
                          ref={setRef('btn-upgrade')}
                          initial="rest"
                          whileHover="hover"
                          className="relative mt-6 bg-white dark:bg-slate-800 text-indigo-900 dark:text-indigo-300 px-4 py-2 rounded-lg text-sm font-bold flex items-center justify-center gap-2 overflow-hidden"
                        >
                          <span className="relative z-10">Upgrade Now</span>
                          <motion.div
                            variants={{
                              rest: { x: -20, opacity: 0 },
                              hover: { x: 0, opacity: 1, transition: { duration: isEnabled() ? 0.3 : 0.01 } }
                            }}
                            className="relative z-10"
                          >
                            <ArrowRight size={16} />
                          </motion.div>
                        </ActionButton>
                      </motion.div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* P3: Staging (Modal Overlay Dimming) */}
            <CreateTaskModal 
              open={state.isModalOpen}
              onClose={() => setState(s => ({ ...s, isModalOpen: false, typingText: "" }))}
              onConfirm={(taskName) => {
                setState(s => ({ ...s, isModalOpen: false, typingText: "", tasks: [...s.tasks, taskName || "New Task"] }));
              }}
              isStagingEnabled={isEnabled()}
              setInputRef={setRef('modal-input')}
              setSaveRef={setRef('modal-save')}
              value={state.typingText}
              onChange={(val) => setState(s => ({ ...s, typingText: val }))}
            />

            {/* P9: Timing (Toast Notification) */}
            <AnimatePresence>
              {showToast && (
                <motion.div
                  initial={{ y: 100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 100, opacity: 0 }}
                  transition={{ 
                    duration: isEnabled() ? 0.4 : 0.01,
                    ease: isEnabled() ? "easeOut" : "linear"
                  }}
                  className="absolute bottom-6 right-6 bg-slate-900 dark:bg-slate-800 text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 z-50 border border-slate-700"
                >
                  {/* P10: Exaggeration (Checkmark Bounce) */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: isEnabled() ? [0, 1.5, 1] : 1 }}
                    transition={{ duration: isEnabled() ? 0.5 : 0.01, delay: 0.1 }}
                    className="relative text-emerald-400"
                  >
                    <CheckCircle2 size={20} />
                  </motion.div>
                  <span className="text-sm font-medium">Task created successfully!</span>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </main>
      </div>
    </MotionConfig>
  );
}
