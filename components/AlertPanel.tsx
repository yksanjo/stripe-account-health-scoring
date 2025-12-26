'use client';

interface AlertPanelProps {
  alerts: string[];
}

export function AlertPanel({ alerts }: AlertPanelProps) {
  if (alerts.length === 0) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-6">
        <div className="text-green-800 font-semibold">✅ No alerts - Account looks healthy!</div>
      </div>
    );
  }

  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-6">
      <h3 className="text-red-800 font-semibold mb-3">⚠️ Alerts</h3>
      <ul className="list-disc list-inside space-y-2">
        {alerts.map((alert, idx) => (
          <li key={idx} className="text-red-700">{alert}</li>
        ))}
      </ul>
    </div>
  );
}

