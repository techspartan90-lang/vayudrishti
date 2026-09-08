export type EventSeverity = 'CRITICAL' | 'HIGH' | 'MODERATE' | 'LOW';

export interface EvidenceChainStep {
  stage: 'RADAR' | 'AWS' | 'SATELLITE' | 'RIVER DATA' | 'CITIZEN REPORTS' | 'VERIFICATION';
  sourceName: string;
  timestamp: string;
  location: string;
  status: string;
  supportIndicator: 'Verified' | 'Supporting' | 'Needs Review / Supporting' | 'Corroborated';
  requiresHumanReview?: boolean;
}

export interface ImpactCategoryBreakdown {
  hospitals: number;
  bridges: number;
  roadsKm: number;
  powerStations: number;
  population: string;
  publicFacilities: number;
}

export interface WeatherEvent {
  id: string;
  code: string;
  title: string;
  subTitle: string;
  location: string;
  state: string;
  coordinates: [number, number]; // [lat, lng] for India projection
  status: EventSeverity;
  activeStatus: 'ACTIVE' | 'MONITORING' | 'CONTAINED';
  keyMetricLabel: string;
  keyMetricValue: string;
  sourcesCount: number;
  confidence: number; // percentage e.g. 92
  time: string;
  hazardType: string;
  priorityScore: number;
  
  // Overview
  description: string;
  metrics: {
    rainfall?: string;
    wind?: string;
    temperature?: string;
    riverLevelRise?: string;
    areaAtRisk?: string;
    confidence: string;
  };
  
  // What Changed (past 30 mins)
  whatChanged: {
    signalsInflux: string;
    precipitation: string;
    riverSwell?: string;
    riskFootprint: string;
    transition: string;
  };
  
  // Evidence Sources & Linear Chain
  evidence: {
    fusedPercentage: number;
    sources: {
      name: string;
      category: string;
      verified: boolean;
      status: string;
      timestamp: string;
    }[];
  };

  evidenceChain: EvidenceChainStep[];
  
  // Impact & Exposure
  impact: {
    affectedAreas: string[];
    populationPotentiallyAffected: string;
    affectedDistrictsCount: number;
    criticalInfrastructureCount: number;
    criticalInfrastructureList: string[];
    roadTransportCorridorsCount: number;
    roadTransportCorridorsList: string[];
    roadsAffectedKm: number;
    categoriesBreakdown: ImpactCategoryBreakdown;
  };
  
  // Priority Assessment
  priority: {
    rating: EventSeverity;
    factors: {
      severity: string;
      evidenceConfidence: string;
      exposure: string;
      urgency: string;
    };
  };
  
  // Recommended Action
  recommendedAction: string;
  
  // Timeline
  timeline: {
    time: string;
    label: string;
    detail: string;
  }[];
}

export interface KpiMetric {
  id: string;
  title: string;
  value: string;
  trend: string;
  subtext?: string;
  statusColor?: string;
}

export interface SupportingViewCard {
  id: string;
  title: string;
  type: string;
  typeDetail?: string;
  time: string;
  sensor: string;
  status: string;
  previewType: 'radar' | 'satellite' | 'forecast' | 'river';
}

export interface RecentTelemetryItem {
  id: string;
  time: string;
  source: string;
  message: string;
  location?: string;
  verified?: boolean;
}

export interface DataSourceTelemetry {
  name: string;
  fullName: string;
  status: 'Connected' | 'Receiving' | 'Degraded';
  lastPing: string;
  type: string;
}
