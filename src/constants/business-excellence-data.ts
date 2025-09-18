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

// 3. Resource Efficiency Trends (for Bar Chart with Multiple Companies - 12 months data)
export const resourceEfficiencyData = [
  {
    month: 'Oct 2024',
    'hero-cycles': {
      paintConsumption: 185.2, // ml/sqm - Optimized processes
      powderConsumption: 142.8, // gm/sqm - Efficient coating systems
      powerCost: 10.85, // INR/units - Energy-efficient operations
      gasConsumption: 0.048 // m3/sqm - Controlled gas usage
    },
    'hero-motors': {
      paintConsumption: 215.4, // ml/sqm - Higher volume production
      powderConsumption: 158.2, // gm/sqm - Heavy-duty applications
      powerCost: 11.45, // INR/units - High-power processes
      gasConsumption: 0.058 // m3/sqm - Complex manufacturing
    },
    'hmc-hive': {
      paintConsumption: 165.8, // ml/sqm - Precision coating
      powderConsumption: 125.4, // gm/sqm - Advanced techniques
      powerCost: 9.85, // INR/units - Automated efficiency
      gasConsumption: 0.042 // m3/sqm - Smart systems
    },
    munjal: {
      paintConsumption: 195.6, // ml/sqm - Standard operations
      powderConsumption: 148.9, // gm/sqm - Traditional methods
      powerCost: 10.65, // INR/units - Balanced approach
      gasConsumption: 0.051 // m3/sqm - Regular processes
    }
  },
  {
    month: 'Nov 2024',
    'hero-cycles': {
      paintConsumption: 172.6, // Process stabilization
      powderConsumption: 138.3, // Improved efficiency
      powerCost: 10.52, // Better energy management
      gasConsumption: 0.045
    },
    'hero-motors': {
      paintConsumption: 198.6, // Gradual optimization
      powderConsumption: 142.3, // Efficiency improvements
      powerCost: 10.98, // Maintained operations
      gasConsumption: 0.051
    },
    'hmc-hive': {
      paintConsumption: 158.9, // Advanced controls
      powderConsumption: 122.7, // Smart application
      powerCost: 9.68, // Automated systems
      gasConsumption: 0.041
    },
    munjal: {
      paintConsumption: 186.2, // Process improvements
      powderConsumption: 145.8, // Better techniques
      powerCost: 10.38, // Efficiency gains
      gasConsumption: 0.048
    }
  },
  {
    month: 'Dec 2024',
    'hero-cycles': {
      paintConsumption: 168.9, // Year-end optimization
      powderConsumption: 136.7, // Best practices implementation
      powerCost: 10.35, // Reduced consumption
      gasConsumption: 0.044
    },
    'hero-motors': {
      paintConsumption: 188.9, // Production optimization
      powderConsumption: 136.7, // Controlled usage
      powerCost: 10.76, // Stable operations
      gasConsumption: 0.048
    },
    'hmc-hive': {
      paintConsumption: 155.4, // Maximum efficiency
      powderConsumption: 119.8, // Optimal coating
      powerCost: 9.45, // Best performance
      gasConsumption: 0.039
    },
    munjal: {
      paintConsumption: 182.7, // Improved processes
      powderConsumption: 142.5, // Better control
      powerCost: 10.15, // Enhanced efficiency
      gasConsumption: 0.046
    }
  },
  {
    month: 'Jan 2025',
    'hero-cycles': {
      paintConsumption: 195.3, // New year production ramp-up
      powderConsumption: 148.8, // Higher volume
      powerCost: 10.88, // Increased operations
      gasConsumption: 0.049
    },
    'hero-motors': {
      paintConsumption: 221.3, // Production increase
      powderConsumption: 164.8, // Higher consumption
      powerCost: 11.28, // Winter heating costs
      gasConsumption: 0.059
    },
    'hmc-hive': {
      paintConsumption: 162.5, // Controlled ramp-up
      powderConsumption: 128.6, // Efficient scaling
      powerCost: 9.65, // Managed increase
      gasConsumption: 0.043
    },
    munjal: {
      paintConsumption: 189.8, // Steady increase
      powderConsumption: 148.2, // Volume scaling
      powerCost: 10.52, // Regular operations
      gasConsumption: 0.05
    }
  },
  {
    month: 'Feb 2025',
    'hero-cycles': {
      paintConsumption: 176.7, // Process optimization
      powderConsumption: 141.4, // Efficiency measures
      powerCost: 10.58, // Improved systems
      gasConsumption: 0.046
    },
    'hero-motors': {
      paintConsumption: 189.7, // Optimization initiatives
      powderConsumption: 138.4, // Better control
      powerCost: 10.84, // Stable performance
      gasConsumption: 0.049
    },
    'hmc-hive': {
      paintConsumption: 159.2, // Advanced optimization
      powderConsumption: 125.8, // Precision coating
      powerCost: 9.52, // Maximum efficiency
      gasConsumption: 0.042
    },
    munjal: {
      paintConsumption: 184.5, // Process improvements
      powderConsumption: 144.9, // Better techniques
      powerCost: 10.28, // Enhanced operations
      gasConsumption: 0.048
    }
  },
  {
    month: 'Mar 2025',
    'hero-cycles': {
      paintConsumption: 182.2, // Fiscal year-end push
      powderConsumption: 144.6, // Controlled increase
      powerCost: 10.72, // Balanced operations
      gasConsumption: 0.047
    },
    'hero-motors': {
      paintConsumption: 194.2, // Production push
      powderConsumption: 144.6, // Volume handling
      powerCost: 10.95, // Increased activity
      gasConsumption: 0.052
    },
    'hmc-hive': {
      paintConsumption: 161.8, // Sustained efficiency
      powderConsumption: 127.5, // Optimal performance
      powerCost: 9.68, // Consistent results
      gasConsumption: 0.043
    },
    munjal: {
      paintConsumption: 187.4, // Final quarter push
      powderConsumption: 146.8, // Volume management
      powerCost: 10.45, // Stable operations
      gasConsumption: 0.049
    }
  },
  {
    month: 'Apr 2025',
    'hero-cycles': {
      paintConsumption: 188.7, // New fiscal start
      powderConsumption: 147.8, // Fresh operations
      powerCost: 10.68, // Spring operations
      gasConsumption: 0.048
    },
    'hero-motors': {
      paintConsumption: 206.7, // Production peak
      powderConsumption: 149.8, // Higher volume
      powerCost: 10.89, // Moderate rates
      gasConsumption: 0.054
    },
    'hmc-hive': {
      paintConsumption: 164.2, // Maintained efficiency
      powderConsumption: 129.8, // Consistent performance
      powerCost: 9.78, // Stable operations
      gasConsumption: 0.044
    },
    munjal: {
      paintConsumption: 191.5, // Steady operations
      powderConsumption: 148.5, // Regular production
      powerCost: 10.58, // Balanced approach
      gasConsumption: 0.05
    }
  },
  {
    month: 'May 2025',
    'hero-cycles': {
      paintConsumption: 165.3, // Process optimization
      powderConsumption: 134.6, // Efficiency gains
      powerCost: 10.22, // Improved processes
      gasConsumption: 0.045
    },
    'hero-motors': {
      paintConsumption: 178.3, // Optimization results
      powderConsumption: 132.6, // Better efficiency
      powerCost: 10.67, // Stable performance
      gasConsumption: 0.047
    },
    'hmc-hive': {
      paintConsumption: 155.8, // Maximum efficiency
      powderConsumption: 124.8, // Best performance
      powerCost: 9.45, // Optimal operations
      gasConsumption: 0.041
    },
    munjal: {
      paintConsumption: 176.4, // Good efficiency
      powderConsumption: 138.2, // Improved control
      powerCost: 10.28, // Better management
      gasConsumption: 0.046
    }
  },
  {
    month: 'Jun 2025',
    'hero-cycles': {
      paintConsumption: 178.8, // Summer production
      powderConsumption: 142.9, // Controlled increase
      powerCost: 10.85, // AC loads impact
      gasConsumption: 0.047
    },
    'hero-motors': {
      paintConsumption: 195.8, // Summer ramp
      powderConsumption: 145.9, // Higher volume
      powerCost: 11.23, // Increased cooling
      gasConsumption: 0.052
    },
    'hmc-hive': {
      paintConsumption: 162.5, // Efficient cooling
      powderConsumption: 128.5, // Smart systems
      powerCost: 9.85, // Managed consumption
      gasConsumption: 0.043
    },
    munjal: {
      paintConsumption: 185.2, // Summer operations
      powderConsumption: 144.8, // Regular production
      powerCost: 10.68, // Standard rates
      gasConsumption: 0.049
    }
  },
  {
    month: 'Jul 2025',
    'hero-cycles': {
      paintConsumption: 192.2, // Peak summer
      powderConsumption: 148.4, // Higher consumption
      powerCost: 11.15, // Summer rates
      gasConsumption: 0.051
    },
    'hero-motors': {
      paintConsumption: 234.2, // Peak operations
      powderConsumption: 171.4, // Maximum production
      powerCost: 11.85, // Peak rates
      gasConsumption: 0.065
    },
    'hmc-hive': {
      paintConsumption: 168.5, // Controlled operations
      powderConsumption: 132.8, // Efficient systems
      powerCost: 10.15, // Smart cooling
      gasConsumption: 0.045
    },
    munjal: {
      paintConsumption: 202.8, // Summer peak
      powderConsumption: 155.6, // Higher usage
      powerCost: 11.25, // Peak consumption
      gasConsumption: 0.056
    }
  },
  {
    month: 'Aug 2025',
    'hero-cycles': {
      paintConsumption: 158.1, // Post-maintenance
      powderConsumption: 126.7, // Optimized efficiency
      powerCost: 9.98, // Improved systems
      gasConsumption: 0.042
    },
    'hero-motors': {
      paintConsumption: 172.1, // Maintenance benefits
      powderConsumption: 128.7, // Best efficiency
      powerCost: 10.42, // Reduced energy
      gasConsumption: 0.043
    },
    'hmc-hive': {
      paintConsumption: 152.8, // Excellent performance
      powderConsumption: 121.5, // Superior efficiency
      powerCost: 9.15, // Maximum optimization
      gasConsumption: 0.038
    },
    munjal: {
      paintConsumption: 168.5, // Good performance
      powderConsumption: 132.8, // Efficient operations
      powerCost: 9.85, // Better control
      gasConsumption: 0.044
    }
  },
  {
    month: 'Sep 2025',
    'hero-cycles': {
      paintConsumption: 152.3, // Sustained improvements
      powderConsumption: 123.4, // Continued gains
      powerCost: 9.78, // Excellent efficiency
      gasConsumption: 0.04
    },
    'hero-motors': {
      paintConsumption: 165.3, // Sustained improvements
      powderConsumption: 125.4, // Continued efficiency
      powerCost: 10.28, // Good performance
      gasConsumption: 0.041
    },
    'hmc-hive': {
      paintConsumption: 149.8, // Best-in-class
      powderConsumption: 119.2, // Outstanding efficiency
      powerCost: 8.95, // Top performance
      gasConsumption: 0.037
    },
    munjal: {
      paintConsumption: 162.4, // Excellent results
      powderConsumption: 128.9, // Good efficiency
      powerCost: 9.68, // Strong performance
      gasConsumption: 0.042
    }
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
