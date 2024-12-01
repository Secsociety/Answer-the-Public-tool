export const getNodeColor = (category: string): string => {
  const colors: { [key: string]: string } = {
    root: '#2563eb',
    Information: '#ef4444',
    Reasoning: '#f59e0b',
    Process: '#10b981',
    Timing: '#6366f1',
    Location: '#8b5cf6',
    People: '#ec4899',
    Alternatives: '#14b8a6',
    Context: '#f97316'
  };
  return colors[category] || '#94a3b8';
};