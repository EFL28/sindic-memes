export const MemeCardSkeleton = () => {
  return (
    <div className="break-inside-avoid mb-4 rounded-2xl overflow-hidden bg-card border border-card-border shadow-sm animate-pulse">
      {/* Espacio para la imagen/video */}
      <div className="w-full h-64 bg-input-bg" />

      {/* Espacio para el título y metadatos */}
      <div className="p-4 space-y-3">
        <div className="h-4 bg-input-bg rounded-md w-3/4" />
        <div className="flex justify-between items-center">
          <div className="h-3 bg-input-bg rounded-md w-1/4" />
          <div className="h-3 bg-input-bg rounded-md w-1/4" />
        </div>
      </div>
    </div>
  );
};
