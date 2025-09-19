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
    name: 'Implementation',
    activeProjects: 29,
    avgCycleTime: 28,
    targetCycleTime: 30,
    pendingApprovalProjects: 2,
    delayedProjects: 1,
    onTrackPercentage: 89,
    stageEfficiency: 92,
    monthlyValue: 8.7 // Crores implemented this month
  },
  {
    stage: 'L4',
    name: 'Implemented',
    activeProjects: 18,
    avgCycleTime: 45,
    targetCycleTime: 42,
    pendingApprovalProjects: 1,
    delayedProjects: 2,
    onTrackPercentage: 94,
    stageEfficiency: 88,
    monthlyValue: 15.3, // Crores implemented last month
    lastMonthImplemented: 15.3
  },
  {
    stage: 'L5',
    name: 'Actuarial',
    activeProjects: 12,
    avgCycleTime: 7,
    targetCycleTime: 7,
    pendingApprovalProjects: 0,
    delayedProjects: 0,
    onTrackPercentage: 100,
    stageEfficiency: 95,
    monthlyValue: 22.1, // Crores actuarial value this month
    actuarialValue: 22.1
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

// 3. Resource Efficiency Trends (for Line Chart with Multiple Companies)
export const resourceEfficiencyData = {
  currentFY: [
    {
      month: 'Apr 2025',
      'hero-cycles': {
        paintConsumption: 145.2, // ml/sqm - Spring efficiency
        powderConsumption: 108.5, // gm/sqm - Optimized coating
        powerCost: 8.85, // INR/units - Efficient operations
        gasConsumption: 0.035 // m3/sqm - Controlled usage
      },
      'hero-motors': {
        paintConsumption: 215.4, // ml/sqm - Heavy production
        powderConsumption: 165.8, // gm/sqm - Industrial coating
        powerCost: 12.45, // INR/units - High-power processes
        gasConsumption: 0.065 // m3/sqm - Complex manufacturing
      },
      'hmc-hive': {
        paintConsumption: 95.8, // ml/sqm - Precision coating
        powderConsumption: 78.4, // gm/sqm - Advanced techniques
        powerCost: 6.85, // INR/units - Automated efficiency
        gasConsumption: 0.025 // m3/sqm - Smart systems
      },
      munjal: {
        paintConsumption: 175.6, // ml/sqm - Standard operations
        powderConsumption: 135.9, // gm/sqm - Traditional methods
        powerCost: 9.65, // INR/units - Balanced approach
        gasConsumption: 0.045 // m3/sqm - Regular processes
      }
    },
    {
      month: 'May 2025',
      'hero-cycles': {
        paintConsumption: 132.6, // Process optimization
        powderConsumption: 98.3, // Improved efficiency
        powerCost: 8.52, // Better energy management
        gasConsumption: 0.032
      },
      'hero-motors': {
        paintConsumption: 198.6, // Gradual optimization
        powderConsumption: 152.3, // Efficiency improvements
        powerCost: 11.98, // Maintained operations
        gasConsumption: 0.058
      },
      'hmc-hive': {
        paintConsumption: 88.9, // Advanced controls
        powderConsumption: 72.7, // Smart application
        powerCost: 6.48, // Automated systems
        gasConsumption: 0.022
      },
      munjal: {
        paintConsumption: 162.2, // Process improvements
        powderConsumption: 125.8, // Better techniques
        powerCost: 9.28, // Efficiency gains
        gasConsumption: 0.041
      }
    },
    {
      month: 'Jun 2025',
      'hero-cycles': {
        paintConsumption: 148.9, // Summer adjustments
        powderConsumption: 112.7, // Volume increase
        powerCost: 9.35, // AC impact
        gasConsumption: 0.038
      },
      'hero-motors': {
        paintConsumption: 225.9, // Peak production
        powderConsumption: 175.7, // High volume
        powerCost: 13.76, // Summer rates
        gasConsumption: 0.072
      },
      'hmc-hive': {
        paintConsumption: 102.4, // Controlled scaling
        powderConsumption: 85.8, // Efficient systems
        powerCost: 7.45, // Smart cooling
        gasConsumption: 0.028
      },
      munjal: {
        paintConsumption: 185.7, // Summer operations
        powderConsumption: 142.5, // Regular production
        powerCost: 10.15, // Enhanced efficiency
        gasConsumption: 0.048
      }
    },
    {
      month: 'Jul 2025',
      'hero-cycles': {
        paintConsumption: 162.3, // Peak summer
        powderConsumption: 125.8, // Higher consumption
        powerCost: 10.88, // Summer rates
        gasConsumption: 0.044
      },
      'hero-motors': {
        paintConsumption: 248.2, // Maximum production
        powderConsumption: 195.4, // Peak operations
        powerCost: 15.85, // Peak rates
        gasConsumption: 0.085
      },
      'hmc-hive': {
        paintConsumption: 115.5, // Controlled operations
        powderConsumption: 95.8, // Efficient systems
        powerCost: 8.15, // Smart cooling
        gasConsumption: 0.032
      },
      munjal: {
        paintConsumption: 202.8, // Summer peak
        powderConsumption: 158.6, // Higher usage
        powerCost: 11.25, // Peak consumption
        gasConsumption: 0.055
      }
    },
    {
      month: 'Aug 2025',
      'hero-cycles': {
        paintConsumption: 128.1, // Post-maintenance
        powderConsumption: 96.7, // Optimized efficiency
        powerCost: 8.98, // Improved systems
        gasConsumption: 0.035
      },
      'hero-motors': {
        paintConsumption: 172.1, // Maintenance benefits
        powderConsumption: 135.7, // Best efficiency
        powerCost: 11.42, // Reduced energy
        gasConsumption: 0.052
      },
      'hmc-hive': {
        paintConsumption: 82.8, // Excellent performance
        powderConsumption: 68.5, // Superior efficiency
        powerCost: 6.15, // Maximum optimization
        gasConsumption: 0.021
      },
      munjal: {
        paintConsumption: 148.5, // Good performance
        powderConsumption: 118.8, // Efficient operations
        powerCost: 8.85, // Better control
        gasConsumption: 0.038
      }
    },
    {
      month: 'Sep 2025',
      'hero-cycles': {
        paintConsumption: 135.3, // Sustained improvements
        powderConsumption: 102.4, // Continued gains
        powerCost: 8.78, // Excellent efficiency
        gasConsumption: 0.033
      },
      'hero-motors': {
        paintConsumption: 182.3, // Sustained improvements
        powderConsumption: 142.4, // Continued efficiency
        powerCost: 11.28, // Good performance
        gasConsumption: 0.048
      },
      'hmc-hive': {
        paintConsumption: 89.8, // Best-in-class
        powderConsumption: 72.2, // Outstanding efficiency
        powerCost: 6.95, // Top performance
        gasConsumption: 0.024
      },
      munjal: {
        paintConsumption: 158.4, // Excellent results
        powderConsumption: 125.9, // Good efficiency
        powerCost: 9.68, // Strong performance
        gasConsumption: 0.042
      }
    }
  ],
  lastYear: [
    {
      month: 'Oct 2024',
      'hero-cycles': {
        paintConsumption: 185.2, // ml/sqm - Post-monsoon restart
        powderConsumption: 142.8, // gm/sqm - Seasonal adjustments
        powerCost: 10.85, // INR/units - Festive rates
        gasConsumption: 0.048 // m3/sqm - Controlled usage
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
        paintConsumption: 172.6,
        powderConsumption: 138.3,
        powerCost: 10.52,
        gasConsumption: 0.045
      },
      'hero-motors': {
        paintConsumption: 198.6,
        powderConsumption: 142.3,
        powerCost: 10.98,
        gasConsumption: 0.051
      },
      'hmc-hive': {
        paintConsumption: 158.9,
        powderConsumption: 122.7,
        powerCost: 9.68,
        gasConsumption: 0.041
      },
      munjal: {
        paintConsumption: 186.2,
        powderConsumption: 145.8,
        powerCost: 10.38,
        gasConsumption: 0.048
      }
    },
    {
      month: 'Dec 2024',
      'hero-cycles': {
        paintConsumption: 168.9,
        powderConsumption: 136.7,
        powerCost: 10.35,
        gasConsumption: 0.044
      },
      'hero-motors': {
        paintConsumption: 188.9,
        powderConsumption: 136.7,
        powerCost: 10.76,
        gasConsumption: 0.048
      },
      'hmc-hive': {
        paintConsumption: 155.4,
        powderConsumption: 119.8,
        powerCost: 9.45,
        gasConsumption: 0.039
      },
      munjal: {
        paintConsumption: 182.7,
        powderConsumption: 142.5,
        powerCost: 10.15,
        gasConsumption: 0.046
      }
    },
    {
      month: 'Jan 2025',
      'hero-cycles': {
        paintConsumption: 195.3,
        powderConsumption: 148.8,
        powerCost: 10.88,
        gasConsumption: 0.049
      },
      'hero-motors': {
        paintConsumption: 221.3,
        powderConsumption: 164.8,
        powerCost: 11.28,
        gasConsumption: 0.059
      },
      'hmc-hive': {
        paintConsumption: 162.5,
        powderConsumption: 128.6,
        powerCost: 9.65,
        gasConsumption: 0.043
      },
      munjal: {
        paintConsumption: 189.8,
        powderConsumption: 148.2,
        powerCost: 10.52,
        gasConsumption: 0.05
      }
    },
    {
      month: 'Feb 2025',
      'hero-cycles': {
        paintConsumption: 176.7,
        powderConsumption: 141.4,
        powerCost: 10.58,
        gasConsumption: 0.046
      },
      'hero-motors': {
        paintConsumption: 189.7,
        powderConsumption: 138.4,
        powerCost: 10.84,
        gasConsumption: 0.049
      },
      'hmc-hive': {
        paintConsumption: 159.2,
        powderConsumption: 125.8,
        powerCost: 9.52,
        gasConsumption: 0.042
      },
      munjal: {
        paintConsumption: 184.5,
        powderConsumption: 144.9,
        powerCost: 10.28,
        gasConsumption: 0.048
      }
    },
    {
      month: 'Mar 2025',
      'hero-cycles': {
        paintConsumption: 182.2,
        powderConsumption: 144.6,
        powerCost: 10.72,
        gasConsumption: 0.047
      },
      'hero-motors': {
        paintConsumption: 194.2,
        powderConsumption: 144.6,
        powerCost: 10.95,
        gasConsumption: 0.052
      },
      'hmc-hive': {
        paintConsumption: 161.8,
        powderConsumption: 127.5,
        powerCost: 9.68,
        gasConsumption: 0.043
      },
      munjal: {
        paintConsumption: 187.4,
        powderConsumption: 146.8,
        powerCost: 10.45,
        gasConsumption: 0.049
      }
    },
    {
      month: 'Apr 2025',
      'hero-cycles': {
        paintConsumption: 188.7,
        powderConsumption: 147.8,
        powerCost: 10.68,
        gasConsumption: 0.048
      },
      'hero-motors': {
        paintConsumption: 206.7,
        powderConsumption: 149.8,
        powerCost: 10.89,
        gasConsumption: 0.054
      },
      'hmc-hive': {
        paintConsumption: 164.2,
        powderConsumption: 129.8,
        powerCost: 9.78,
        gasConsumption: 0.044
      },
      munjal: {
        paintConsumption: 191.5,
        powderConsumption: 148.5,
        powerCost: 10.58,
        gasConsumption: 0.05
      }
    },
    {
      month: 'May 2025',
      'hero-cycles': {
        paintConsumption: 165.3,
        powderConsumption: 134.6,
        powerCost: 10.22,
        gasConsumption: 0.045
      },
      'hero-motors': {
        paintConsumption: 178.3,
        powderConsumption: 132.6,
        powerCost: 10.67,
        gasConsumption: 0.047
      },
      'hmc-hive': {
        paintConsumption: 155.8,
        powderConsumption: 124.8,
        powerCost: 9.45,
        gasConsumption: 0.041
      },
      munjal: {
        paintConsumption: 176.4,
        powderConsumption: 138.2,
        powerCost: 10.28,
        gasConsumption: 0.046
      }
    },
    {
      month: 'Jun 2025',
      'hero-cycles': {
        paintConsumption: 178.8,
        powderConsumption: 142.9,
        powerCost: 10.85,
        gasConsumption: 0.047
      },
      'hero-motors': {
        paintConsumption: 195.8,
        powderConsumption: 145.9,
        powerCost: 11.23,
        gasConsumption: 0.052
      },
      'hmc-hive': {
        paintConsumption: 162.5,
        powderConsumption: 128.5,
        powerCost: 9.85,
        gasConsumption: 0.043
      },
      munjal: {
        paintConsumption: 185.2,
        powderConsumption: 144.8,
        powerCost: 10.68,
        gasConsumption: 0.049
      }
    },
    {
      month: 'Jul 2025',
      'hero-cycles': {
        paintConsumption: 192.2,
        powderConsumption: 148.4,
        powerCost: 11.15,
        gasConsumption: 0.051
      },
      'hero-motors': {
        paintConsumption: 234.2,
        powderConsumption: 171.4,
        powerCost: 11.85,
        gasConsumption: 0.065
      },
      'hmc-hive': {
        paintConsumption: 168.5,
        powderConsumption: 132.8,
        powerCost: 10.15,
        gasConsumption: 0.045
      },
      munjal: {
        paintConsumption: 202.8,
        powderConsumption: 155.6,
        powerCost: 11.25,
        gasConsumption: 0.056
      }
    },
    {
      month: 'Aug 2025',
      'hero-cycles': {
        paintConsumption: 158.1,
        powderConsumption: 126.7,
        powerCost: 9.98,
        gasConsumption: 0.042
      },
      'hero-motors': {
        paintConsumption: 172.1,
        powderConsumption: 128.7,
        powerCost: 10.42,
        gasConsumption: 0.043
      },
      'hmc-hive': {
        paintConsumption: 152.8,
        powderConsumption: 121.5,
        powerCost: 9.15,
        gasConsumption: 0.038
      },
      munjal: {
        paintConsumption: 168.5,
        powderConsumption: 132.8,
        powerCost: 9.85,
        gasConsumption: 0.044
      }
    },
    {
      month: 'Sep 2025',
      'hero-cycles': {
        paintConsumption: 152.3,
        powderConsumption: 123.4,
        powerCost: 9.78,
        gasConsumption: 0.04
      },
      'hero-motors': {
        paintConsumption: 165.3,
        powderConsumption: 125.4,
        powerCost: 10.28,
        gasConsumption: 0.041
      },
      'hmc-hive': {
        paintConsumption: 149.8,
        powderConsumption: 119.2,
        powerCost: 8.95,
        gasConsumption: 0.037
      },
      munjal: {
        paintConsumption: 162.4,
        powderConsumption: 128.9,
        powerCost: 9.68,
        gasConsumption: 0.042
      }
    }
  ]
};
