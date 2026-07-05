"use client";

export default function Loader() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-zinc-50 dark:bg-zinc-950 transition-colors absolute duration-300">
      <div className="relative flex flex-col items-center justify-center">
        <div className="absolute bg-zinc-500/5 dark:bg-zinc-500/5 blur-3xl rounded-full w-32 h-32 animate-pulse"></div>
        <div className="relative">
          <div className="w-12 h-12 rounded-full border-4 border-t-zinc-900 border-b-zinc-900 border-l-zinc-200 border-r-zinc-200 dark:border-t-zinc-50 dark:border-b-zinc-50 dark:border-l-zinc-800 dark:border-r-zinc-800 animate-spin"></div>
        </div>
        <p className="mt-4 text-xs font-medium tracking-widest text-zinc-400 dark:text-zinc-500 uppercase animate-pulse">
          Loading
        </p>
      </div>
    </div>
  );
}
