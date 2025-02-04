export const ShiftStatus = () => {
  return (
    <div className="bg-card rounded-lg p-4 mb-4 animate-slide-in">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Ca Ngày</h2>
        <div className="text-muted-foreground">
          08:00 → 20:00
        </div>
      </div>
      <div className="mt-4 flex justify-center">
        <button className="bg-primary hover:bg-primary/90 text-white rounded-full w-32 h-32 flex items-center justify-center transition-colors">
          <span className="text-lg font-medium">Đi làm</span>
        </button>
      </div>
    </div>
  );
};