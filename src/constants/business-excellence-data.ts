// Business Excellence Dashboard Data

// 1. Project Velocity & Health Metrics (for Mixed Chart - Bar + Line)
export const projectVelocityData = [
  {
    stage: 'L0',
    name: 'Concept',
    activeProjects: 45,
    avgCycleTime: 18, // days
    targetCycleTime: 21, // days
    pendingApprovalProjects: 3,
    delayedProjects: 2, // Projects stuck longer than target cycle time
    onTrackPercentage: 82,
    stageEfficiency: 87 // percentage
  },
  {
    stage: 'L1',
    name: 'Planning',
    activeProjects: 38,
    avgCycleTime: 35,
    targetCycleTime: 30,
    pendingApprovalProjects: 5,
    delayedProjects: 4, // Projects exceeding target cycle time
    onTrackPercentage: 71,
    stageEfficiency: 76
  },
  {
    stage: 'L2',
    name: 'Development',
    activeProjects: 42,
    avgCycleTime: 72,
    targetCycleTime: 60,
    pendingApprovalProjects: 8,
    delayedProjects: 6, // Most delayed stage - development bottlenecks
    onTrackPercentage: 64,
    stageEfficiency: 68
  },
  {
    stage: 'L3',
    name: 'Testing',
    activeProjects: 29,
    avgCycleTime: 28,
    targetCycleTime: 30,
    pendingApprovalProjects: 2,
    delayedProjects: 1, // Testing delays are minimal
    onTrackPercentage: 89,
    stageEfficiency: 92
  },
  {
    stage: 'L4',
    name: 'Implementation',
    activeProjects: 18,
    avgCycleTime: 45,
    targetCycleTime: 42,
    pendingApprovalProjects: 1,
    delayedProjects: 2, // Implementation slightly delayed
    onTrackPercentage: 94,
    stageEfficiency: 88
  },
  {
    stage: 'L5',
    name: 'Closure',
    activeProjects: 12,
    avgCycleTime: 7,
    targetCycleTime: 7,
    pendingApprovalProjects: 0,
    delayedProjects: 0, // Closure is on track
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
      plant: 'Plant Alpha',
      oee: 72.3,
      availability: 89.1,
      performance: 93.2,
      quality: 87.1
    },
    {
      plant: 'Plant Beta',
      oee: 68.9,
      availability: 86.5,
      performance: 91.8,
      quality: 86.8
    },
    {
      plant: 'Plant Gamma',
      oee: 71.2,
      availability: 88.3,
      performance: 92.5,
      quality: 87.4
    },
    {
      plant: 'Plant Delta',
      oee: 65.4,
      availability: 85.2,
      performance: 90.1,
      quality: 84.8
    },
    {
      plant: 'Plant Epsilon',
      oee: 64.8,
      availability: 84.9,
      performance: 91.3,
      quality: 83.5
    },
    {
      plant: 'Plant Zeta',
      oee: 69.2,
      availability: 87.8,
      performance: 92.9,
      quality: 84.7
    }
  ]
};

// 3. Resource Efficiency Trends (for Bar Chart with Multiple Metrics - 12 months data)
export const resourceEfficiencyData = [
  {
    month: 'Oct 2023',
    paintConsumption: 215.4, // ml/sqm - Post-monsoon production restart
    powderConsumption: 158.2, // gm/sqm - Higher consumption due to seasonal adjustments
    powerCost: 11.45, // INR/units - Festive season power rates
    gasConsumption: 0.058, // m3/sqm - Compressed air and process gases
    costPerUnit: 1318 // INR
  },
  {
    month: 'Nov 2023',
    paintConsumption: 198.6, // Process stabilization after seasonal changes
    powderConsumption: 142.3, // Gradual efficiency improvements
    powerCost: 10.98,
    gasConsumption: 0.051,
    costPerUnit: 1289
  },
  {
    month: 'Dec 2023',
    paintConsumption: 188.9, // Year-end production optimization
    powderConsumption: 136.7, // Best practices implementation
    powerCost: 10.76,
    gasConsumption: 0.048,
    costPerUnit: 1254
  },
  {
    month: 'Jan 2024',
    paintConsumption: 221.3, // New year production ramp-up
    powderConsumption: 164.8, // Higher consumption due to new product lines
    powerCost: 11.28, // Winter heating costs
    gasConsumption: 0.059,
    costPerUnit: 1334
  },
  {
    month: 'Feb 2024',
    paintConsumption: 189.7, // Process optimization initiatives
    powderConsumption: 138.4, // Efficiency measures taking effect
    powerCost: 10.84,
    gasConsumption: 0.049,
    costPerUnit: 1267
  },
  {
    month: 'Mar 2024',
    paintConsumption: 194.2, // End of fiscal year production push
    powderConsumption: 144.6, // Increased volume but controlled usage
    powerCost: 10.95,
    gasConsumption: 0.052,
    costPerUnit: 1278
  },
  {
    month: 'Apr 2024',
    paintConsumption: 206.7, // ml/sqm - Spring production peak, maintenance completed
    powderConsumption: 149.8, // gm/sqm - Slight increase due to higher production volume
    powerCost: 10.89, // INR/units - Moderate electricity rates
    gasConsumption: 0.054, // m3/sqm - Compressed air and process gases
    costPerUnit: 1295 // INR
  },
  {
    month: 'May 2024',
    paintConsumption: 178.3, // Process optimization showing results
    powderConsumption: 132.6, // Efficiency improvements maintained
    powerCost: 10.67,
    gasConsumption: 0.047,
    costPerUnit: 1245
  },
  {
    month: 'Jun 2024',
    paintConsumption: 195.8, // Summer production ramp, quality improvements
    powderConsumption: 145.9, // Higher volume but controlled consumption
    powerCost: 11.23, // AC loads increase power costs
    gasConsumption: 0.052,
    costPerUnit: 1268
  },
  {
    month: 'Jul 2024',
    paintConsumption: 234.2, // Equipment malfunction caused spike
    powderConsumption: 171.4, // Maintenance issues affected efficiency
    powerCost: 11.85, // Summer peak rates
    gasConsumption: 0.065, // Higher usage due to temperature control
    costPerUnit: 1356
  },
  {
    month: 'Aug 2024',
    paintConsumption: 172.1, // Post-maintenance optimization
    powderConsumption: 128.7, // Best efficiency achieved
    powerCost: 10.42, // Improved processes reduce energy
    gasConsumption: 0.043,
    costPerUnit: 1198
  },
  {
    month: 'Sep 2024',
    paintConsumption: 165.3, // Sustained improvements
    powderConsumption: 125.4, // Continued efficiency gains
    powerCost: 10.28,
    gasConsumption: 0.041,
    costPerUnit: 1175
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
    plant: 'Plant Alpha',
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
    plant: 'Plant Beta',
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
    plant: 'Plant Gamma',
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
    plant: 'Plant Delta',
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
