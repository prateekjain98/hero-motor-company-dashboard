// Business Excellence Dashboard Data

// 1. Project Velocity & Health Metrics (for Mixed Chart - Bar + Line)
export const projectVelocityData = [
  {
    stage: 'L0',
    name: 'Concept',
    activeProjects: 45,
    avgCycleTime: 18, // days
    targetCycleTime: 21, // days
    blockedProjects: 3,
    onTrackPercentage: 82,
    stageEfficiency: 87 // percentage
  },
  {
    stage: 'L1',
    name: 'Planning',
    activeProjects: 38,
    avgCycleTime: 35,
    targetCycleTime: 30,
    blockedProjects: 5,
    onTrackPercentage: 71,
    stageEfficiency: 76
  },
  {
    stage: 'L2',
    name: 'Development',
    activeProjects: 42,
    avgCycleTime: 72,
    targetCycleTime: 60,
    blockedProjects: 8,
    onTrackPercentage: 64,
    stageEfficiency: 68
  },
  {
    stage: 'L3',
    name: 'Testing',
    activeProjects: 29,
    avgCycleTime: 28,
    targetCycleTime: 30,
    blockedProjects: 2,
    onTrackPercentage: 89,
    stageEfficiency: 92
  },
  {
    stage: 'L4',
    name: 'Implementation',
    activeProjects: 18,
    avgCycleTime: 45,
    targetCycleTime: 42,
    blockedProjects: 1,
    onTrackPercentage: 94,
    stageEfficiency: 88
  },
  {
    stage: 'L5',
    name: 'Closure',
    activeProjects: 12,
    avgCycleTime: 7,
    targetCycleTime: 7,
    blockedProjects: 0,
    onTrackPercentage: 100,
    stageEfficiency: 95
  }
];

// 2. Manufacturing OEE Metrics (for Gauge/Radial Chart)
export const oeeMetricsData = {
  overall: {
    oee: 68.5, // Overall Equipment Effectiveness
    target: 85,
    trend: 'up',
    changePercent: 2.3
  },
  components: {
    availability: {
      value: 87.2,
      target: 90,
      description: 'Equipment uptime vs planned production time',
      issues: ['Unplanned maintenance', 'Material shortages']
    },
    performance: {
      value: 92.1,
      target: 95,
      description: 'Actual vs ideal production rate',
      issues: ['Minor stops', 'Reduced speed']
    },
    quality: {
      value: 85.3,
      target: 99,
      description: 'Good units vs total units produced',
      issues: ['Defects', 'Rework required']
    }
  },
  byPlant: [
    {
      plant: 'Gurgaon',
      oee: 72.3,
      availability: 89.1,
      performance: 93.2,
      quality: 87.1
    },
    {
      plant: 'Dharuhera',
      oee: 68.9,
      availability: 86.5,
      performance: 91.8,
      quality: 86.8
    },
    {
      plant: 'Haridwar',
      oee: 71.2,
      availability: 88.3,
      performance: 92.5,
      quality: 87.4
    },
    {
      plant: 'Neemrana',
      oee: 65.4,
      availability: 85.2,
      performance: 90.1,
      quality: 84.8
    },
    {
      plant: 'Chittoor',
      oee: 64.8,
      availability: 84.9,
      performance: 91.3,
      quality: 83.5
    },
    {
      plant: 'Halol',
      oee: 69.2,
      availability: 87.8,
      performance: 92.9,
      quality: 84.7
    }
  ]
};

// 3. Resource Efficiency Trends (for Line Chart with Multiple Metrics)
export const resourceEfficiencyData = [
  {
    month: 'Apr 2024',
    laborProductivity: 82.3, // units per person hour
    energyIntensity: 2.45, // kWh per unit
    materialYield: 91.2, // percentage
    waterEfficiency: 88.5, // percentage
    wasteRatio: 4.2, // percentage of production
    costPerUnit: 1250 // INR
  },
  {
    month: 'May 2024',
    laborProductivity: 84.1,
    energyIntensity: 2.38,
    materialYield: 92.5,
    waterEfficiency: 89.2,
    wasteRatio: 3.9,
    costPerUnit: 1235
  },
  {
    month: 'Jun 2024',
    laborProductivity: 83.7,
    energyIntensity: 2.41,
    materialYield: 91.8,
    waterEfficiency: 88.9,
    wasteRatio: 4.0,
    costPerUnit: 1242
  },
  {
    month: 'Jul 2024',
    laborProductivity: 85.9,
    energyIntensity: 2.32,
    materialYield: 93.1,
    waterEfficiency: 90.5,
    wasteRatio: 3.6,
    costPerUnit: 1218
  },
  {
    month: 'Aug 2024',
    laborProductivity: 86.4,
    energyIntensity: 2.29,
    materialYield: 93.8,
    waterEfficiency: 91.2,
    wasteRatio: 3.4,
    costPerUnit: 1205
  },
  {
    month: 'Sep 2024',
    laborProductivity: 87.2,
    energyIntensity: 2.25,
    materialYield: 94.2,
    waterEfficiency: 91.8,
    wasteRatio: 3.2,
    costPerUnit: 1195
  }
];

// 4. Quality Metrics Dashboard (for Heatmap/Matrix)
export const qualityMetricsData = {
  summary: {
    firstPassYield: 94.3,
    defectRate: 2.8, // per 1000 units
    reworkCost: 3.2, // million INR
    customerComplaints: 12,
    supplierQualityRating: 87.5
  },
  byDepartment: [
    {
      department: 'Manufacturing',
      fpy: 93.2,
      defects: 3.1,
      rework: 1.8,
      complaints: 5
    },
    {
      department: 'Assembly',
      fpy: 95.1,
      defects: 2.4,
      rework: 0.9,
      complaints: 3
    },
    {
      department: 'Painting',
      fpy: 92.8,
      defects: 3.5,
      rework: 0.5,
      complaints: 2
    },
    {
      department: 'Quality Control',
      fpy: 96.2,
      defects: 1.8,
      rework: 0.0,
      complaints: 2
    }
  ],
  trends: {
    weekly: [94.1, 93.8, 94.5, 94.3],
    monthly: [93.2, 93.5, 93.8, 94.1, 94.2, 94.3]
  }
};

// 5. Financial Performance Metrics (for Waterfall Chart)
export const financialPerformanceData = {
  budget: {
    allocated: 2500, // crores
    spent: 1875,
    committed: 425,
    available: 200
  },
  variance: [
    { category: 'Initial Budget', value: 2500, type: 'start' },
    { category: 'Material Savings', value: 125, type: 'positive' },
    { category: 'Labor Efficiency', value: 85, type: 'positive' },
    { category: 'Energy Optimization', value: 45, type: 'positive' },
    { category: 'Quality Issues', value: -180, type: 'negative' },
    { category: 'Delays & Penalties', value: -225, type: 'negative' },
    { category: 'Scope Changes', value: -150, type: 'negative' },
    { category: 'Current Budget', value: 2200, type: 'end' }
  ],
  roi: {
    projected: 18.5,
    actual: 15.2,
    byProject: [
      { project: 'EV Battery Line', invested: 125, returned: 148, roi: 18.4 },
      { project: 'Smart Factory', invested: 89, returned: 98, roi: 10.1 },
      { project: 'Paint Shop Auto', invested: 76, returned: 92, roi: 21.1 },
      { project: 'Digital Twin', invested: 64, returned: 71, roi: 10.9 }
    ]
  }
};

// 6. Cycle Time Analysis (for Box Plot / Violin Chart)
export const cycleTimeAnalysisData = {
  byStage: [
    {
      stage: 'L0',
      median: 18,
      q1: 14,
      q3: 23,
      min: 7,
      max: 42,
      outliers: [45, 48, 52],
      target: 21
    },
    {
      stage: 'L1',
      median: 35,
      q1: 28,
      q3: 42,
      min: 21,
      max: 56,
      outliers: [63, 67],
      target: 30
    },
    {
      stage: 'L2',
      median: 72,
      q1: 60,
      q3: 85,
      min: 45,
      max: 112,
      outliers: [125, 132, 145],
      target: 60
    },
    {
      stage: 'L3',
      median: 28,
      q1: 24,
      q3: 33,
      min: 18,
      max: 42,
      outliers: [],
      target: 30
    },
    {
      stage: 'L4',
      median: 45,
      q1: 38,
      q3: 52,
      min: 28,
      max: 63,
      outliers: [72],
      target: 42
    }
  ],
  bottlenecks: [
    { stage: 'L2', reason: 'Resource constraints', impact: 12 },
    { stage: 'L1', reason: 'Approval delays', impact: 8 },
    { stage: 'L4', reason: 'Integration issues', impact: 5 }
  ]
};

// 7. Plant Performance Comparison (for Radar Chart)
export const plantPerformanceData = [
  {
    plant: 'Gurgaon',
    metrics: {
      productivity: 88,
      quality: 92,
      safety: 95,
      efficiency: 85,
      sustainability: 78,
      innovation: 82
    }
  },
  {
    plant: 'Dharuhera',
    metrics: {
      productivity: 85,
      quality: 89,
      safety: 92,
      efficiency: 83,
      sustainability: 75,
      innovation: 79
    }
  },
  {
    plant: 'Haridwar',
    metrics: {
      productivity: 87,
      quality: 91,
      safety: 94,
      efficiency: 84,
      sustainability: 80,
      innovation: 81
    }
  },
  {
    plant: 'Neemrana',
    metrics: {
      productivity: 82,
      quality: 87,
      safety: 90,
      efficiency: 79,
      sustainability: 72,
      innovation: 76
    }
  }
];

// 8. Sustainability Metrics (for Progress Indicators)
export const sustainabilityMetrics = {
  energy: {
    renewable: 32.5, // percentage
    target: 50,
    reduction: 12.3, // YoY percentage
    intensity: 2.25 // kWh per unit
  },
  emissions: {
    total: 45230, // tons CO2
    perUnit: 0.82, // kg CO2 per unit
    reduction: 8.5, // YoY percentage
    target: 15
  },
  waste: {
    recycled: 78.5, // percentage
    landfill: 21.5,
    hazardous: 2.3,
    reduction: 15.2 // YoY percentage
  },
  water: {
    recycled: 65.8, // percentage
    consumption: 3.2, // liters per unit
    reduction: 10.5, // YoY percentage
    rainwaterHarvested: 25000 // liters
  }
};
