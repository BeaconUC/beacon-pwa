import DynamicMap from "@/components/DynamicMap";

export default function LiveMapPage() {
  return (
    <div className="flex flex-col h-full p-4">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Live Outage Map</h2>
        <p className="text-gray-600">
          Real-time visualization of outages and crew locations. Click on markers for detailed information.
        </p>
      </div>
      <div className="flex-1 rounded-lg overflow-hidden">
        <DynamicMap />
      </div>
    </div>
  );
}