'use client';

export function HeroBackground() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 -z-10 overflow-hidden"
    >
      <div className="relative h-full w-full">
        {/* Animated glass blobs for subtle movement */}
        <div
          className="absolute left-[5%] top-[10%] h-[200px] w-[300px] animate-blob rounded-full bg-primary/10 opacity-70 blur-3xl filter"
        ></div>
        <div
          className="animation-delay-2000 absolute bottom-[20%] right-[10%] h-[250px] w-[350px] animate-blob rounded-full bg-purple-500/10 opacity-70 blur-3xl filter"
        ></div>
        
        {/* Static glass cards for depth */}
        <div className="absolute right-[15%] top-[15%] h-56 w-80 -rotate-12 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-lg shadow-2xl shadow-black/20"></div>
        <div className="absolute bottom-[10%] left-[10%] h-64 w-96 rotate-6 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-lg shadow-2xl shadow-black/20"></div>
      </div>
    </div>
  );
}
