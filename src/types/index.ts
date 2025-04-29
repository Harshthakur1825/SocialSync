// Platform Types
export type SocialPlatform = 'instagram' | 'youtube' | 'twitter';

export interface SocialProfile {
  id: string;
  platform: SocialPlatform;
  handle: string;
  avatar?: string;
  name?: string;
  url?: string;
}

// Analytics Types
export interface MetricValue {
  value: number;
  change: number; // percentage change
  trend: 'up' | 'down' | 'neutral';
}

export interface ProfileMetrics {
  profileId: string;
  followers: MetricValue;
  engagement: MetricValue;
  reach: MetricValue;
  impressions: MetricValue;
  timeframe: string;
}

export interface TimeSeriesData {
  date: string;
  value: number;
}

export interface TimeSeriesMetric {
  id: string;
  profileId: string;
  metricName: string;
  data: TimeSeriesData[];
}

// UI Types
export interface ChartConfig {
  title: string;
  type: 'line' | 'bar' | 'pie' | 'doughnut';
  dataKey: string;
  color: string;
}

export interface DashboardWidget {
  id: string;
  title: string;
  type: 'metric' | 'chart' | 'table' | 'recommendation';
  size: 'small' | 'medium' | 'large';
  config: any;
}

// User Types
export interface User {
  id: string;
  name: string;
  email: string;
  profiles: SocialProfile[];
  dashboardConfig: DashboardWidget[];
}