import React from 'react';
import { Users, Heart, Eye, TrendingUp } from 'lucide-react';
import MetricCard from './MetricCard';
import { ProfileMetrics } from '../../types';

interface MetricsGridProps {
  metrics: ProfileMetrics;
}

const MetricsGrid: React.FC<MetricsGridProps> = ({ metrics }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <MetricCard
        title="Followers"
        metric={metrics.followers}
        icon={<Users className="w-5 h-5" />}
      />
      <MetricCard
        title="Engagement"
        metric={metrics.engagement}
        icon={<Heart className="w-5 h-5" />}
      />
      <MetricCard
        title="Reach"
        metric={metrics.reach}
        icon={<Eye className="w-5 h-5" />}
      />
      <MetricCard
        title="Impressions"
        metric={metrics.impressions}
        icon={<TrendingUp className="w-5 h-5" />}
      />
    </div>
  );
};

export default MetricsGrid;