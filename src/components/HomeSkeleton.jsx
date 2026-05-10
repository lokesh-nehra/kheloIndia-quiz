export default function HomeSkeleton() {
  return (
    <div  className="flex flex-col items-center max-w-[50rem] max-h-[30rem] mt-20 w-full rounded-lg bg-black/20 p-18 mt-10">
      {/* Exact Logo Skeleton */}
      <div className="w-40 h-40 mb-8 bg-white/10 rounded-3xl animate-pulse shadow-2xl"></div>
      
      {/* Exact Heading Skeleton */}
      <div className="h-10 w-3/4 max-w-sm bg-white/10 rounded-xl mb-4 animate-pulse"></div>
      
      {/* Exact Description Skeleton (matching the max-w-md) */}
      <div className="space-y-3 mb-8 w-full max-w-md flex flex-col items-center">
        <div className="h-4 w-full bg-white/10 rounded-md animate-pulse"></div>
        <div className="h-4 w-[90%] bg-white/10 rounded-md animate-pulse"></div>
        <div className="h-4 w-[60%] bg-white/10 rounded-md animate-pulse"></div>
      </div>
      
      {/* Exact Button Skeleton (matching the rounded-full) */}
      <div className="h-[72px] w-64 bg-white/10 rounded-full animate-pulse shadow-[0_0_25px_rgba(255,255,255,0.05)]"></div>
    </div>
  );
}
