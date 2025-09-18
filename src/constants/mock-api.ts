////////////////////////////////////////////////////////////////////////////////
// 🛑 Nothing in here has anything to do with Nextjs, it's just a fake database
////////////////////////////////////////////////////////////////////////////////

import { faker } from '@faker-js/faker';
import { matchSorter } from 'match-sorter';

// Set a seed for consistent data generation
faker.seed(12345);
import { ResourceUsageEntry } from './data';

export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

// Generate realistic project timeline
function generateProjectTimeline(
  project: Project,
  createdDate: Date,
  currentStage: ProjectStage
): TimelineEvent[] {
  const timeline: TimelineEvent[] = [];
  const stages: ProjectStage[] = ['L0', 'L1', 'L2', 'L3', 'L4', 'L5'];
  const currentStageIndex = stages.indexOf(currentStage);

  const users = [
    { name: 'Rajesh Kumar', role: 'project-manager' },
    { name: 'Priya Sharma', role: 'function-head' },
    { name: 'Amit Patel', role: 'bu-cfo' },
    { name: 'Sunita Verma', role: 'project-manager' }
  ];

  // Project creation event
  timeline.push({
    id: `${project.id}-created`,
    type: 'project_created',
    timestamp: createdDate.toISOString(),
    title: 'Project Created',
    description: `${project.name} project was initiated and created in the system.`,
    user: faker.helpers.arrayElement(users).name,
    user_role: 'project-manager',
    stage: 'L0'
  });

  // Generate stage progression events
  let currentDate = new Date(createdDate);

  for (let i = 0; i < currentStageIndex; i++) {
    const fromStage = stages[i];
    const toStage = stages[i + 1];

    // Add some time between stages (1-30 days)
    currentDate = new Date(
      currentDate.getTime() +
        faker.number.int({ min: 1, max: 30 }) * 24 * 60 * 60 * 1000
    );

    // Check if approval is needed
    const needsApproval =
      toStage === 'L3' || toStage === 'L4' || toStage === 'L5';

    if (needsApproval) {
      // Approval request event
      const requestDate = new Date(currentDate);
      const requester = faker.helpers.arrayElement(
        users.filter((u) => u.role === 'project-manager')
      );

      timeline.push({
        id: `${project.id}-approval-request-${toStage}`,
        type: 'approval_requested',
        timestamp: requestDate.toISOString(),
        title: `Approval Requested for Stage ${toStage}`,
        description: `${requester.name} requested approval to move from ${fromStage} to ${toStage}.`,
        user: requester.name,
        user_role: requester.role,
        from_stage: fromStage,
        to_stage: toStage
      });

      // Approval granted event (1-7 days later)
      const approvalDate = new Date(
        requestDate.getTime() +
          faker.number.int({ min: 1, max: 7 }) * 24 * 60 * 60 * 1000
      );
      const approverRole = toStage === 'L3' ? 'function-head' : 'bu-cfo';
      const approver = faker.helpers.arrayElement(
        users.filter((u) => u.role === approverRole)
      );

      timeline.push({
        id: `${project.id}-approval-granted-${toStage}`,
        type: 'approval_granted',
        timestamp: approvalDate.toISOString(),
        title: `Stage ${toStage} Approved`,
        description: `${approver.name} approved the progression from ${fromStage} to ${toStage}.`,
        user: approver.name,
        user_role: approver.role,
        from_stage: fromStage,
        to_stage: toStage
      });

      // Set current date to approval date for stage movement
      currentDate = approvalDate;
    }

    // Stage moved event (happens shortly after approval if needed, or immediately for L0->L1, L1->L2)
    const moveDate = new Date(
      currentDate.getTime() +
        (needsApproval
          ? faker.number.int({ min: 0, max: 1 }) * 60 * 60 * 1000 // 0-1 hours after approval
          : faker.number.int({ min: 0, max: 2 }) * 24 * 60 * 60 * 1000) // 0-2 days for direct moves
    );
    const mover = faker.helpers.arrayElement(
      users.filter((u) => u.role === 'project-manager')
    );

    timeline.push({
      id: `${project.id}-stage-moved-${toStage}`,
      type: 'stage_moved',
      timestamp: moveDate.toISOString(),
      title: `Moved to Stage ${toStage}`,
      description: `Project successfully progressed from ${fromStage} to ${toStage}.`,
      user: mover.name,
      user_role: mover.role,
      from_stage: fromStage,
      to_stage: toStage,
      stage: toStage
    });

    currentDate = moveDate;
  }

  // Add some random project update events
  const updateCount = faker.number.int({ min: 0, max: 3 });
  for (let i = 0; i < updateCount; i++) {
    const updateDate = new Date(
      createdDate.getTime() +
        faker.number.int({
          min: 1,
          max: Math.floor(
            (Date.now() - createdDate.getTime()) / (24 * 60 * 60 * 1000)
          )
        }) *
          24 *
          60 *
          60 *
          1000
    );

    const updater = faker.helpers.arrayElement(users);
    const updateTypes = [
      'Updated manufacturing specifications',
      'Modified project budget allocation',
      'Updated production timeline',
      'Added compliance documentation',
      'Updated team assignments',
      'Revised quality standards',
      'Updated supplier requirements',
      'Modified testing protocols',
      'Added safety documentation',
      'Updated resource allocation'
    ];

    timeline.push({
      id: `${project.id}-update-${i}`,
      type: 'project_updated',
      timestamp: updateDate.toISOString(),
      title: faker.helpers.arrayElement(updateTypes),
      description: `${updater.name} made updates to the project details.`,
      user: updater.name,
      user_role: updater.role,
      stage: currentStage
    });
  }

  // Sort timeline by timestamp
  return timeline.sort(
    (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
  );
}

// Define the shape of Project data
export type ProjectStage = 'L0' | 'L1' | 'L2' | 'L3' | 'L4' | 'L5';

export type TimelineEventType =
  | 'project_created'
  | 'stage_moved'
  | 'approval_requested'
  | 'approval_granted'
  | 'approval_rejected'
  | 'project_updated';

export type TimelineEvent = {
  id: string;
  type: TimelineEventType;
  timestamp: string;
  title: string;
  description: string;
  user: string;
  user_role: string;
  stage?: ProjectStage;
  from_stage?: ProjectStage;
  to_stage?: ProjectStage;
  metadata?: Record<string, any>;
};

export type CompanyGroup =
  | 'hero-cycles'
  | 'hero-motors'
  | 'hmc-hive'
  | 'munjal';

export type Department =
  | 'supply-chain'
  | 'hr'
  | 'finance'
  | 'rd'
  | 'manufacturing'
  | 'quality-assurance'
  | 'sales-marketing'
  | 'it'
  | 'procurement'
  | 'operations';

export type Project = {
  photo_url: string;
  name: string;
  description: string;
  created_at: string;
  price: number;
  id: number;
  department: Department;
  company_group: CompanyGroup;
  updated_at: string;
  stage: ProjectStage;
  pending_approval?: {
    from_stage: ProjectStage;
    to_stage: ProjectStage;
    requested_by: string;
    requested_at: string;
    approver_type: 'function-head' | 'bu-cfo';
    // For L4 transitions that need both approvers
    required_approvers?: Array<'function-head' | 'bu-cfo'>;
    completed_approvers?: Array<'function-head' | 'bu-cfo'>;
  };
  timeline: TimelineEvent[];
};

// Global flag to ensure single initialization
let isInitialized = false;

// Mock project data store
export const fakeProjects = {
  records: [] as Project[], // Holds the list of project objects

  // Initialize with sample data
  initialize() {
    if (isInitialized) {
      // Projects already initialized, skipping...
      return;
    }

    // Initializing projects with seed 12345...
    // Reset faker seed to ensure consistent generation
    faker.seed(12345);
    const sampleProjects: Project[] = [];
    function generateRandomProjectData(id: number): Project {
      const departments: Department[] = [
        'supply-chain',
        'hr',
        'finance',
        'rd',
        'manufacturing',
        'quality-assurance',
        'sales-marketing',
        'it',
        'procurement',
        'operations'
      ];

      const companyGroups: CompanyGroup[] = [
        'hero-cycles',
        'hero-motors',
        'hmc-hive',
        'munjal'
      ];
      const stages: ProjectStage[] = ['L0', 'L1', 'L2', 'L3', 'L4', 'L5'];

      // Realistic manufacturing project names and descriptions
      const manufacturingProjects = [
        {
          name: 'Electric Vehicle Battery Assembly Line',
          description:
            'Implementation of automated battery pack assembly line for electric two-wheelers with quality control systems and safety protocols.'
        },
        {
          name: 'Smart Manufacturing IoT Integration',
          description:
            'Integration of IoT sensors and real-time monitoring systems across manufacturing plants to optimize production efficiency and predictive maintenance.'
        },
        {
          name: 'Lean Manufacturing Process Optimization',
          description:
            'Comprehensive lean manufacturing implementation to reduce waste, improve workflow, and increase overall equipment effectiveness (OEE).'
        },
        {
          name: 'Advanced Paint Shop Automation',
          description:
            'Modernization of paint shop facilities with robotic spray systems, environmental controls, and quality inspection automation.'
        },
        {
          name: 'Supply Chain Digital Transformation',
          description:
            'Digital transformation of supply chain operations including vendor management, inventory optimization, and logistics automation.'
        },
        {
          name: 'Quality Management System Upgrade',
          description:
            'Implementation of advanced quality management systems with statistical process control and automated defect detection.'
        },
        {
          name: 'Energy Efficiency Optimization Program',
          description:
            'Plant-wide energy efficiency improvements including LED lighting, HVAC optimization, and renewable energy integration.'
        },
        {
          name: 'Robotic Welding Cell Implementation',
          description:
            'Installation of advanced robotic welding cells for chassis and frame manufacturing with precision control systems.'
        },
        {
          name: 'Digital Twin Manufacturing Platform',
          description:
            'Development of digital twin technology for virtual manufacturing simulation and process optimization.'
        },
        {
          name: 'Warehouse Management System Overhaul',
          description:
            'Complete overhaul of warehouse operations with automated storage and retrieval systems, inventory tracking, and logistics optimization.'
        },
        {
          name: 'Predictive Maintenance AI System',
          description:
            'Implementation of AI-powered predictive maintenance system to reduce downtime and optimize equipment lifecycle management.'
        },
        {
          name: 'Sustainable Manufacturing Initiative',
          description:
            'Comprehensive sustainability program including waste reduction, water recycling, and carbon footprint minimization across all facilities.'
        },
        {
          name: 'Advanced Engine Testing Facility',
          description:
            'Construction of state-of-the-art engine testing facility with dynamometers, emission testing, and performance validation systems.'
        },
        {
          name: 'Manufacturing Execution System (MES)',
          description:
            'Implementation of comprehensive MES for real-time production tracking, scheduling, and resource optimization.'
        },
        {
          name: 'Automated Assembly Line Modernization',
          description:
            'Modernization of existing assembly lines with collaborative robots, vision systems, and flexible manufacturing capabilities.'
        },
        {
          name: 'Supplier Quality Development Program',
          description:
            'Comprehensive supplier development program to enhance quality standards, reduce defects, and improve supply chain reliability.'
        },
        {
          name: 'Smart Factory Analytics Platform',
          description:
            'Development of advanced analytics platform for manufacturing intelligence, performance monitoring, and decision support systems.'
        },
        {
          name: 'Additive Manufacturing Integration',
          description:
            'Integration of 3D printing and additive manufacturing technologies for rapid prototyping and low-volume production.'
        },
        {
          name: 'Cybersecurity Enhancement Project',
          description:
            'Comprehensive cybersecurity enhancement for manufacturing systems including network security, access control, and threat monitoring.'
        },
        {
          name: 'Worker Safety Technology Upgrade',
          description:
            'Implementation of advanced safety technologies including wearable devices, hazard detection systems, and emergency response automation.'
        }
      ];

      const createdDate = faker.date.between({
        from: '2022-01-01',
        to: '2023-12-31'
      });
      const projectStage = faker.helpers.arrayElement(stages);
      const projectData = faker.helpers.arrayElement(manufacturingProjects);

      const project: Project = {
        id,
        name: projectData.name,
        description: projectData.description,
        created_at: createdDate.toISOString(),
        price: parseFloat(
          faker.commerce.price({ min: 500000, max: 50000000, dec: 0 })
        ),
        photo_url: `https://api.slingacademy.com/public/sample-projects/${id}.png`,
        department: faker.helpers.arrayElement(departments),
        company_group: faker.helpers.arrayElement(companyGroups),
        updated_at: faker.date.recent().toISOString(),
        stage: projectStage,
        timeline: []
      };

      // Generate timeline events
      project.timeline = generateProjectTimeline(
        project,
        createdDate,
        projectStage
      );

      // Add pending approval ONLY for stages that require approval (L3, L4, L5)
      // L0, L1, L2 should NEVER have pending approvals
      if (
        Math.random() < 0.15 &&
        (project.stage === 'L3' ||
          project.stage === 'L4' ||
          project.stage === 'L5')
      ) {
        // 15% chance of pending approval for stages that require it
        const currentStageIndex = stages.indexOf(project.stage);
        const fromStage = stages[currentStageIndex - 1];

        project.pending_approval = {
          from_stage: fromStage,
          to_stage: project.stage,
          requested_by: faker.person.fullName(),
          requested_at: faker.date.recent().toISOString(),
          approver_type: project.stage === 'L3' ? 'function-head' : 'bu-cfo'
        };
      }

      return project;
    }

    // Generate remaining records
    for (let i = 1; i <= 20; i++) {
      sampleProjects.push(generateRandomProjectData(i));
    }

    // Ensure we have specific projects with pending approvals for testing
    // Project for L2 to L3 approval (Function Head)
    if (sampleProjects.length > 2) {
      const project1 = sampleProjects[2];
      project1.stage = 'L2';
      project1.pending_approval = {
        from_stage: 'L2',
        to_stage: 'L3',
        requested_by: 'Rajesh Kumar (Project Manager)',
        requested_at: new Date(
          Date.now() - 2 * 24 * 60 * 60 * 1000
        ).toISOString(), // 2 days ago
        approver_type: 'function-head'
      };
      // Regenerate timeline to match the stage
      project1.timeline = generateProjectTimeline(
        project1,
        new Date(project1.created_at),
        'L2'
      );
    }

    // Project for L3 to L4 approval (Function Head and BU CFO)
    if (sampleProjects.length > 5) {
      const project2 = sampleProjects[5];
      project2.stage = 'L3';
      project2.pending_approval = {
        from_stage: 'L3',
        to_stage: 'L4',
        requested_by: 'Priya Sharma (Project Manager)',
        requested_at: new Date(
          Date.now() - 1 * 24 * 60 * 60 * 1000
        ).toISOString(), // 1 day ago
        approver_type: 'function-head',
        required_approvers: ['function-head', 'bu-cfo'],
        completed_approvers: []
      };
      // Regenerate timeline to match the stage
      project2.timeline = generateProjectTimeline(
        project2,
        new Date(project2.created_at),
        'L3'
      );
    }

    // Project for L4 to L5 approval (BU CFO)
    if (sampleProjects.length > 8) {
      const project3 = sampleProjects[8];
      project3.stage = 'L4';
      project3.pending_approval = {
        from_stage: 'L4',
        to_stage: 'L5',
        requested_by: 'Amit Patel (Project Manager)',
        requested_at: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), // 3 hours ago
        approver_type: 'bu-cfo'
      };
      // Regenerate timeline to match the stage
      project3.timeline = generateProjectTimeline(
        project3,
        new Date(project3.created_at),
        'L4'
      );
    }

    this.records = sampleProjects;
    isInitialized = true;
    // Initialized ${sampleProjects.length} projects
  },

  // Ensure data is initialized and return current state
  ensureInitialized() {
    if (!isInitialized || this.records.length === 0) {
      // Force initializing projects...
      this.initialize();
      validateProjectConsistency();
    }
    return this.records;
  },

  // Force reset and re-initialization (for development)
  forceReset() {
    // Force resetting project data...
    this.records = [];
    isInitialized = false;
    this.initialize();
    validateProjectConsistency();
    return this.records;
  },

  // Get all projects with optional category filtering and search
  async getAll({
    categories = [],
    search
  }: {
    categories?: string[];
    search?: string;
  }) {
    // Ensure data is initialized
    this.ensureInitialized();

    let projects = [...this.records];

    // Filter projects based on selected categories
    if (categories.length > 0) {
      projects = projects.filter((project) =>
        categories.includes(project.department)
      );
    }

    // Search functionality across multiple fields
    if (search) {
      projects = matchSorter(projects, search, {
        keys: ['name', 'description', 'department']
      });
    }

    return projects;
  },

  // Get paginated results with optional category filtering and search
  async getProjects({
    page = 1,
    limit = 10,
    categories,
    search
  }: {
    page?: number;
    limit?: number;
    categories?: string;
    search?: string;
  }) {
    await delay(1000);

    // Ensure data is initialized
    this.ensureInitialized();

    const categoriesArray = categories ? categories.split('.') : [];
    const allProjects = await this.getAll({
      categories: categoriesArray,
      search
    });
    const totalProjects = allProjects.length;

    // Pagination logic
    const offset = (page - 1) * limit;
    const paginatedProjects = allProjects.slice(offset, offset + limit);

    // Mock current time
    const currentTime = new Date().toISOString();

    // Return paginated response
    return {
      success: true,
      time: currentTime,
      message: 'Sample data for testing and learning purposes',
      total_projects: totalProjects,
      offset,
      limit,
      projects: paginatedProjects
    };
  },

  // Get a specific project by its ID
  async getProjectById(id: number) {
    await delay(1000); // Simulate a delay

    // Ensure data is initialized
    this.ensureInitialized();

    // Find the project by its ID
    const project = this.records.find((project) => project.id === id);
    // Getting project ${id}: ${project ? `Found - Stage: ${project.stage}, Pending: ${!!project.pending_approval}` : 'Not found'}

    if (!project) {
      return {
        success: false,
        message: `Project with ID ${id} not found`
      };
    }

    // Mock current time
    const currentTime = new Date().toISOString();

    return {
      success: true,
      time: currentTime,
      message: `Project with ID ${id} found`,
      project
    };
  },

  // Stage progression functions
  async moveToNextStage(projectId: number, userType: string) {
    await delay(500);
    const project = this.records.find((item) => item.id === projectId);
    if (!project) return { success: false, error: 'Project not found' };

    const stages: ProjectStage[] = ['L0', 'L1', 'L2', 'L3', 'L4', 'L5'];
    const currentStageIndex = stages.indexOf(project.stage);

    if (currentStageIndex === stages.length - 1) {
      return { success: false, error: 'Project is already at final stage' };
    }

    const nextStage = stages[currentStageIndex + 1];

    // Check approval requirements
    if (
      nextStage === 'L3' &&
      userType !== 'function-head' &&
      userType !== 'pmo'
    ) {
      // Request approval from function head
      project.pending_approval = {
        from_stage: project.stage,
        to_stage: nextStage,
        requested_by: 'Current User', // In real app, get from auth
        requested_at: new Date().toISOString(),
        approver_type: 'function-head'
      };

      // Add timeline event
      project.timeline.push({
        id: `${project.id}-approval-request-${nextStage}-${Date.now()}`,
        type: 'approval_requested',
        timestamp: new Date().toISOString(),
        title: `Approval Requested for Stage ${nextStage}`,
        description: `Requested Function Head approval to move from ${project.stage} to ${nextStage}.`,
        user: 'Current User',
        user_role: userType,
        from_stage: project.stage,
        to_stage: nextStage
      });

      return {
        success: true,
        message: 'Approval requested from Function Head'
      };
    }

    if (nextStage === 'L4' && userType !== 'pmo') {
      // L3->L4 requires both Function Head and BU CFO approval
      project.pending_approval = {
        from_stage: project.stage,
        to_stage: nextStage,
        requested_by: 'Current User',
        requested_at: new Date().toISOString(),
        approver_type: 'function-head', // Start with function-head as primary
        required_approvers: ['function-head', 'bu-cfo'],
        completed_approvers: []
      };

      // Add timeline event
      project.timeline.push({
        id: `${project.id}-approval-request-${nextStage}-${Date.now()}`,
        type: 'approval_requested',
        timestamp: new Date().toISOString(),
        title: `Approval Requested for Stage ${nextStage}`,
        description: `Requested approval from both Function Head and BU CFO to move from ${project.stage} to ${nextStage}.`,
        user: 'Current User',
        user_role: userType,
        from_stage: project.stage,
        to_stage: nextStage
      });

      return {
        success: true,
        message: 'Approval requested from both Function Head and BU CFO'
      };
    }

    if (nextStage === 'L5' && userType !== 'bu-cfo' && userType !== 'pmo') {
      // Request approval from BU CFO for L5
      project.pending_approval = {
        from_stage: project.stage,
        to_stage: nextStage,
        requested_by: 'Current User',
        requested_at: new Date().toISOString(),
        approver_type: 'bu-cfo'
      };

      // Add timeline event
      project.timeline.push({
        id: `${project.id}-approval-request-${nextStage}-${Date.now()}`,
        type: 'approval_requested',
        timestamp: new Date().toISOString(),
        title: `Approval Requested for Stage ${nextStage}`,
        description: `Requested BU CFO approval to move from ${project.stage} to ${nextStage}.`,
        user: 'Current User',
        user_role: userType,
        from_stage: project.stage,
        to_stage: nextStage
      });

      return { success: true, message: 'Approval requested from BU CFO' };
    }

    // Direct progression (L0->L1, L1->L2, or user has approval rights)
    const oldStage = project.stage;
    project.stage = nextStage;
    project.updated_at = new Date().toISOString();
    delete project.pending_approval;

    // Add timeline event
    project.timeline.push({
      id: `${project.id}-stage-moved-${nextStage}-${Date.now()}`,
      type: 'stage_moved',
      timestamp: new Date().toISOString(),
      title: `Moved to Stage ${nextStage}`,
      description: `Project successfully progressed from ${oldStage} to ${nextStage}.`,
      user: 'Current User', // In real app, get from auth
      user_role: userType,
      from_stage: oldStage,
      to_stage: nextStage,
      stage: nextStage
    });

    return { success: true, message: `Project moved to stage ${nextStage}` };
  },

  // Approve stage progression
  async approveStageProgression(projectId: number, userType: string) {
    await delay(500);
    const project = this.records.find((item) => item.id === projectId);
    if (!project || !project.pending_approval) {
      return { success: false, error: 'No pending approval found' };
    }

    const { pending_approval } = project;
    const isMultiApprovalRequired =
      pending_approval.required_approvers &&
      pending_approval.required_approvers.length > 1;

    // Check if user can approve
    let canApprove = false;
    let currentApproverRole = '';

    if (userType === 'pmo') {
      // PMO can approve anything
      canApprove = true;
      currentApproverRole = 'pmo';
    } else if (
      userType === 'function-head' &&
      (pending_approval.approver_type === 'function-head' ||
        (isMultiApprovalRequired &&
          pending_approval.required_approvers?.includes('function-head')))
    ) {
      canApprove = true;
      currentApproverRole = 'function-head';
    } else if (
      userType === 'bu-cfo' &&
      (pending_approval.approver_type === 'bu-cfo' ||
        (isMultiApprovalRequired &&
          pending_approval.required_approvers?.includes('bu-cfo')))
    ) {
      canApprove = true;
      currentApproverRole = 'bu-cfo';
    }

    if (!canApprove) {
      return { success: false, error: 'Insufficient permissions to approve' };
    }

    // For multi-approval scenarios
    if (isMultiApprovalRequired && userType !== 'pmo') {
      // Check if this approver has already approved
      if (
        pending_approval.completed_approvers?.includes(
          currentApproverRole as 'function-head' | 'bu-cfo'
        )
      ) {
        return {
          success: false,
          error: 'You have already approved this request'
        };
      }

      // Add current approver to completed list
      pending_approval.completed_approvers =
        pending_approval.completed_approvers || [];
      pending_approval.completed_approvers.push(
        currentApproverRole as 'function-head' | 'bu-cfo'
      );

      // Check if all required approvals are completed
      const allApproved = pending_approval.required_approvers?.every(
        (approver) => pending_approval.completed_approvers?.includes(approver)
      );

      // Add approval event
      const approvalTimestamp = new Date().toISOString();
      project.timeline.push({
        id: `${project.id}-partial-approval-${currentApproverRole}-${Date.now()}`,
        type: 'approval_granted',
        timestamp: approvalTimestamp,
        title: `Approved by ${currentApproverRole === 'function-head' ? 'Function Head' : 'BU CFO'}`,
        description: `${currentApproverRole === 'function-head' ? 'Function Head' : 'BU CFO'} approved the progression from ${pending_approval.from_stage} to ${pending_approval.to_stage}.`,
        user: 'Current User',
        user_role: userType,
        from_stage: pending_approval.from_stage,
        to_stage: pending_approval.to_stage
      });

      if (!allApproved) {
        // Still waiting for more approvals
        const remainingApprovers = pending_approval.required_approvers?.filter(
          (approver) =>
            !pending_approval.completed_approvers?.includes(approver)
        );
        return {
          success: true,
          message: `Your approval has been recorded. Still waiting for approval from: ${remainingApprovers?.map((a) => (a === 'function-head' ? 'Function Head' : 'BU CFO')).join(', ')}`
        };
      }
    }

    // All approvals received or single approval - proceed with stage movement
    const fromStage = project.stage;
    const toStage = pending_approval.to_stage;

    project.stage = toStage;
    project.updated_at = new Date().toISOString();

    // Add final approval event if single approval or PMO override
    if (!isMultiApprovalRequired || userType === 'pmo') {
      const approvalTimestamp = new Date().toISOString();
      project.timeline.push({
        id: `${project.id}-approval-granted-${toStage}-${Date.now()}`,
        type: 'approval_granted',
        timestamp: approvalTimestamp,
        title: `Stage ${toStage} Approved`,
        description: `Approved the progression from ${fromStage} to ${toStage}.`,
        user: 'Current User',
        user_role: userType,
        from_stage: fromStage,
        to_stage: toStage
      });
    }

    // Add stage movement event
    const movementTimestamp = new Date(Date.now() + 1000).toISOString(); // 1 second later
    project.timeline.push({
      id: `${project.id}-stage-moved-${toStage}-${Date.now() + 1}`,
      type: 'stage_moved',
      timestamp: movementTimestamp,
      title: `Moved to Stage ${toStage}`,
      description: `Project successfully progressed from ${fromStage} to ${toStage}.`,
      user: 'Current User',
      user_role: userType,
      from_stage: fromStage,
      to_stage: toStage,
      stage: toStage
    });

    delete project.pending_approval;

    return {
      success: true,
      message: `Project approved and moved to stage ${toStage}`
    };
  },

  // Create new project (always starts at L0)
  async createProject(projectData: {
    name: string;
    description: string;
    department: Department;
    company_group: CompanyGroup;
    price: number;
  }) {
    await delay(500);

    const newId = Math.max(...this.records.map((p) => p.id), 0) + 1;
    const now = new Date().toISOString();

    const newProject: Project = {
      id: newId,
      name: projectData.name,
      description: projectData.description,
      department: projectData.department,
      company_group: projectData.company_group,
      price: projectData.price,
      photo_url: `https://api.slingacademy.com/public/sample-projects/${newId}.png`,
      created_at: now,
      updated_at: now,
      stage: 'L0', // Always start at L0
      timeline: [
        {
          id: `${newId}-created`,
          type: 'project_created',
          timestamp: now,
          title: 'Project Created',
          description:
            'Project was successfully created and initialized at stage L0.',
          user: 'Current User', // In real app, get from auth
          user_role: 'project-manager',
          stage: 'L0'
        }
      ]
      // No pending_approval - L0 never needs approval
    };

    this.records.push(newProject);
    return { success: true, project: newProject };
  },

  // Reject stage progression
  async rejectStageProgression(
    projectId: number,
    userType: string,
    rejectionComment?: string
  ) {
    await delay(500);
    const project = this.records.find((item) => item.id === projectId);
    if (!project || !project.pending_approval) {
      return { success: false, error: 'No pending approval found' };
    }

    const canReject =
      (project.pending_approval.approver_type === 'function-head' &&
        (userType === 'function-head' || userType === 'pmo')) ||
      (project.pending_approval.approver_type === 'bu-cfo' &&
        (userType === 'bu-cfo' || userType === 'pmo'));

    if (!canReject) {
      return { success: false, error: 'Insufficient permissions to reject' };
    }

    // Add timeline event
    const baseDescription = `Rejected the request to move from ${project.pending_approval.from_stage} to ${project.pending_approval.to_stage}.`;
    const fullDescription = rejectionComment
      ? `${baseDescription} Reason: ${rejectionComment}`
      : baseDescription;

    project.timeline.push({
      id: `${project.id}-approval-rejected-${Date.now()}`,
      type: 'approval_rejected',
      timestamp: new Date().toISOString(),
      title: 'Stage Progression Rejected',
      description: fullDescription,
      user: 'Current User',
      user_role: userType,
      from_stage: project.pending_approval.from_stage,
      to_stage: project.pending_approval.to_stage,
      metadata: rejectionComment
        ? { rejection_reason: rejectionComment }
        : undefined
    });

    delete project.pending_approval;
    project.updated_at = new Date().toISOString();

    return { success: true, message: 'Stage progression rejected' };
  }
};

// Function to validate and fix project data consistency
function validateProjectConsistency() {
  // Validating project consistency...

  fakeProjects.records.forEach((project) => {
    // Rule 1: L0, L1 should NEVER have pending approvals
    // L2 can have pending approval for L2 to L3 transition
    if (
      (project.stage === 'L0' || project.stage === 'L1') &&
      project.pending_approval
    ) {
      // Fixed: Removed invalid pending approval from project ${project.id} at stage ${project.stage}
      delete project.pending_approval;
    }

    // Rule 1b: L2 can only have pending approval for L2 to L3 transition
    if (
      project.stage === 'L2' &&
      project.pending_approval &&
      !(
        project.pending_approval.from_stage === 'L2' &&
        project.pending_approval.to_stage === 'L3'
      )
    ) {
      // Fixed: Removed invalid L2 pending approval from project ${project.id} (not L2->L3)
      delete project.pending_approval;
    }

    // Rule 2: Only L2, L3, L4 can have pending approvals, and only for valid transitions
    if (project.pending_approval) {
      const validTransitions = [
        { from: 'L2', to: 'L3', approver: 'function-head' },
        { from: 'L3', to: 'L4', approver: 'function-head' },
        { from: 'L4', to: 'L5', approver: 'bu-cfo' }
      ];

      const isValidTransition = validTransitions.some(
        (t) =>
          t.from === project.pending_approval?.from_stage &&
          t.to === project.pending_approval?.to_stage &&
          t.approver === project.pending_approval?.approver_type
      );

      if (!isValidTransition) {
        // Fixed: Removed invalid pending approval transition for project ${project.id}
        delete project.pending_approval;
      }
    }

    // Rule 3: Ensure timeline is consistent with current stage
    if (project.timeline.length === 0) {
      // Regenerate timeline if missing
      project.timeline = generateProjectTimeline(
        project,
        new Date(project.created_at),
        project.stage
      );
    }
  });

  // Validation complete.
}

// Initialize projects only once to ensure data consistency
if (fakeProjects.records.length === 0) {
  fakeProjects.initialize();
  validateProjectConsistency();
}

// Mock resource usage entries data store for manufacturing
export const fakeResourceUsage = {
  records: [] as ResourceUsageEntry[], // Holds the list of usage entry objects

  // Initialize with sample manufacturing usage data
  initialize() {
    const sampleUsageEntries: ResourceUsageEntry[] = [];

    function generateRandomUsageData(id: number): ResourceUsageEntry {
      const plants = [
        { name: 'Manufacturing Plant Alpha', location: 'North Region' },
        { name: 'Manufacturing Plant Beta', location: 'West Region' },
        { name: 'Manufacturing Plant Gamma', location: 'East Region' },
        { name: 'Manufacturing Plant Delta', location: 'South Region' },
        { name: 'Manufacturing Plant Epsilon', location: 'Central Region' },
        { name: 'Manufacturing Plant Zeta', location: 'Coastal Region' }
      ];

      const employees = [
        'Rajesh Kumar',
        'Priya Singh',
        'Amit Sharma',
        'Sunita Patel',
        'Vikash Gupta',
        'Meera Agarwal',
        'Rohit Verma',
        'Kavita Jain'
      ];

      const plant = faker.helpers.arrayElement(plants);
      const baseProduction = faker.number.int({ min: 8000, max: 15000 });

      // Generate realistic consumption based on production output
      const paintConsumption =
        baseProduction * faker.number.float({ min: 0.8, max: 1.2 });
      const energyConsumption =
        baseProduction * faker.number.float({ min: 45, max: 65 });
      const rawMaterialUsage =
        baseProduction * faker.number.float({ min: 85, max: 120 });

      return {
        id,
        plant_name: plant.name,
        plant_location: plant.location,
        entry_month: faker.date
          .between({ from: '2023-01-01', to: '2024-12-31' })
          .toISOString()
          .substring(0, 7), // YYYY-MM format
        paint_consumption: Math.round(paintConsumption),
        energy_consumption: Math.round(energyConsumption),
        raw_material_usage: Math.round(rawMaterialUsage),
        water_consumption: Math.round(
          baseProduction * faker.number.float({ min: 15, max: 25 })
        ),
        gas_consumption: Math.round(
          baseProduction * faker.number.float({ min: 2.5, max: 4.5 })
        ),
        chemical_usage: Math.round(
          baseProduction * faker.number.float({ min: 3.2, max: 5.8 })
        ),
        waste_generated: Math.round(
          baseProduction * faker.number.float({ min: 12, max: 20 })
        ),
        production_output: baseProduction,
        efficiency_rating: faker.number.float({ min: 75, max: 95 }),
        cost_total: faker.number.float({ min: 500000, max: 1200000 }),
        entered_by: faker.helpers.arrayElement(employees),
        entry_date: faker.date.recent({ days: 30 }).toISOString(),
        notes: faker.lorem.sentence()
      };
    }

    // Generate usage entries for the last 24 months for multiple plants
    for (let i = 1; i <= 120; i++) {
      sampleUsageEntries.push(generateRandomUsageData(i));
    }

    this.records = sampleUsageEntries;
  },

  // Get all usage entries with optional filtering and search
  async getAll({
    plants = [],
    search,
    month
  }: {
    plants?: string[];
    search?: string;
    month?: string;
  }) {
    await delay(500);

    let entries = [...this.records];

    // Filter by plants
    if (plants.length > 0) {
      entries = entries.filter((entry) =>
        plants.some((plant) =>
          entry.plant_name.toLowerCase().includes(plant.toLowerCase())
        )
      );
    }

    // Filter by month
    if (month) {
      entries = entries.filter((entry) => entry.entry_month === month);
    }

    // Filter by search term
    if (search) {
      entries = matchSorter(entries, search, {
        keys: ['plant_name', 'plant_location', 'entered_by', 'notes']
      });
    }

    return entries;
  },

  // Get paginated results with optional filtering and search
  async getUsageEntries({
    page = 1,
    limit = 10,
    plants,
    search,
    month
  }: {
    page?: number;
    limit?: number;
    plants?: string;
    search?: string;
    month?: string;
  }) {
    await delay(1000);
    const plantsArray = plants ? plants.split('.') : [];
    const allEntries = await this.getAll({
      plants: plantsArray,
      search,
      month
    });
    const totalEntries = allEntries.length;

    // Sort by entry_month descending (most recent first)
    allEntries.sort((a, b) => b.entry_month.localeCompare(a.entry_month));

    // Pagination logic
    const offset = (page - 1) * limit;
    const paginatedEntries = allEntries.slice(offset, offset + limit);

    // Mock current time
    const currentTime = new Date().toISOString();

    // Return paginated response
    return {
      success: true,
      time: currentTime,
      message: 'Manufacturing resource usage entries',
      total_entries: totalEntries,
      offset,
      limit,
      entries: paginatedEntries
    };
  },

  // Get a specific usage entry by its ID
  async getUsageEntryById(id: number) {
    await delay(1000);
    const entry = this.records.find((r) => r.id === id);

    if (!entry) {
      return {
        success: false,
        time: new Date().toISOString(),
        message: `Usage entry with ID ${id} not found`,
        entry: null
      };
    }

    return {
      success: true,
      time: new Date().toISOString(),
      message: `Usage entry with ID ${id} found`,
      entry
    };
  }
};

// Initialize sample usage entries
fakeResourceUsage.initialize();

// Financial Overview Data for PMO and BU CFO
export const financialOverviewData = {
  // FY26 Target (in crores)
  fy26Target: 156.8, // 156.8 crores

  // Achieved Year to Date - realistic 70.4% achievement rate
  achievedYTD: 70.4, // 70.4 crores

  // Identified Pipelines (Idea Bank) - less than Achieved YTD
  identifiedPipeline: 95.2, // 95.2 crores (less than achieved)

  // Yet to Identify
  yetToIdentify: 40.7, // 40.7 crores

  // Delayed projects data - less than FY26 Target or Achieved YTD
  delayedProjects: {
    totalValue: 31.7, // 31.7 crores worth of delayed projects
    projectCount: 14 // 14 projects are delayed
  },

  // Calculate derived values
  get achievementPercentage() {
    return ((this.achievedYTD / this.fy26Target) * 100).toFixed(0);
  },

  get pipelinePercentage() {
    return ((this.identifiedPipeline / this.fy26Target) * 100).toFixed(0);
  },

  get yetToIdentifyPercentage() {
    return ((this.yetToIdentify / this.fy26Target) * 100).toFixed(0);
  },

  get delayedPercentage() {
    return ((this.delayedProjects.totalValue / this.fy26Target) * 100).toFixed(
      0
    );
  },

  // Validation: Identified Pipeline + Yet to Identify ≈ FY26 Target - Achieved YTD
  get remainingTarget() {
    return this.fy26Target - this.achievedYTD;
  },

  get pipelineCoverage() {
    // How much of the remaining target is covered by pipeline + yet to identify
    return this.identifiedPipeline + this.yetToIdentify;
  },

  get isPipelineHealthy() {
    // Check if pipeline + yet to identify approximately equals remaining target
    const coverage = this.pipelineCoverage;
    const target = this.remainingTarget;
    const ratio = coverage / target;
    return ratio >= 0.9 && ratio <= 1.1; // Within 10% variance
  }
};

// Business Excellence Performance Data - Cost Savings Achievement
export const businessExcellenceData = {
  // Business Unit information with cost saving targets
  businessUnits: {
    'hero-cycles': {
      name: 'Hero Cycles',
      color: '#3b82f6', // Blue
      annualTarget: 42.5, // 42.5 crores cost savings target
      logo: '/assets/logos/hero-cycles.png'
    },
    'hero-motors': {
      name: 'Hero Motors',
      color: '#ef4444', // Red
      annualTarget: 65.2, // 65.2 crores cost savings target
      logo: '/assets/logos/hero-motors.png'
    },
    'hmc-hive': {
      name: 'HMC Hive',
      color: '#10b981', // Green
      annualTarget: 28.8, // 28.8 crores cost savings target
      logo: '/assets/logos/hmc-hive.png'
    },
    munjal: {
      name: 'Munjal Kiru',
      color: '#f59e0b', // Amber
      annualTarget: 20.3, // 20.3 crores cost savings target
      logo: '/assets/logos/munjal.png'
    }
  },

  // Monthly cost savings achievement for financial year (April to March)
  // FY26 Total Target: 156.8 Cr (aligned with financialOverviewData)
  fy26Target: 156.8, // Total FY26 target from financialOverviewData
  achievedYTD: 70.4, // Current achievement from financialOverviewData

  // Calculate required monthly rate to achieve target
  get requiredMonthlyRate() {
    const remainingTarget = this.fy26Target - this.achievedYTD;
    const remainingMonths = 3; // Assuming 3 months left in FY
    return remainingTarget / remainingMonths;
  },

  // Calculate current achievement percentage
  get currentAchievementPercentage() {
    return ((this.achievedYTD / this.fy26Target) * 100).toFixed(1);
  },
  monthlyData: [
    {
      month: 'Oct 2023',
      'hero-cycles': {
        achieved: 2.1,
        target: 3.5,
        projectsInPipeline: 12,
        projectsDelivered: 8,
        savingsCategories: ['Process Optimization', 'Energy Efficiency']
      },
      'hero-motors': {
        achieved: 3.2,
        target: 5.4,
        projectsInPipeline: 18,
        projectsDelivered: 15,
        savingsCategories: ['Supply Chain', 'Manufacturing Efficiency']
      },
      'hmc-hive': {
        achieved: 1.6,
        target: 2.4,
        projectsInPipeline: 6,
        projectsDelivered: 4,
        savingsCategories: ['Digital Transformation', 'Automation']
      },
      munjal: {
        achieved: 0.9,
        target: 1.7,
        projectsInPipeline: 4,
        projectsDelivered: 3,
        savingsCategories: ['Operational Excellence', 'Waste Reduction']
      }
    },
    {
      month: 'Nov 2023',
      'hero-cycles': {
        achieved: 2.7,
        target: 3.5,
        projectsInPipeline: 10,
        projectsDelivered: 9,
        savingsCategories: ['Process Optimization', 'Energy Efficiency']
      },
      'hero-motors': {
        achieved: 4.1,
        target: 5.4,
        projectsInPipeline: 16,
        projectsDelivered: 17,
        savingsCategories: ['Supply Chain', 'Manufacturing Efficiency']
      },
      'hmc-hive': {
        achieved: 1.8,
        target: 2.4,
        projectsInPipeline: 5,
        projectsDelivered: 5,
        savingsCategories: ['Digital Transformation', 'Automation']
      },
      munjal: {
        achieved: 1.1,
        target: 1.7,
        projectsInPipeline: 3,
        projectsDelivered: 4,
        savingsCategories: ['Operational Excellence', 'Waste Reduction']
      }
    },
    {
      month: 'Dec 2023',
      'hero-cycles': {
        achieved: 2.3,
        target: 3.5,
        projectsInPipeline: 9,
        projectsDelivered: 10,
        savingsCategories: ['Process Optimization', 'Energy Efficiency']
      },
      'hero-motors': {
        achieved: 3.8,
        target: 5.4,
        projectsInPipeline: 14,
        projectsDelivered: 18,
        savingsCategories: ['Supply Chain', 'Manufacturing Efficiency']
      },
      'hmc-hive': {
        achieved: 1.9,
        target: 2.4,
        projectsInPipeline: 4,
        projectsDelivered: 6,
        savingsCategories: ['Digital Transformation', 'Automation']
      },
      munjal: {
        achieved: 1.3,
        target: 1.7,
        projectsInPipeline: 2,
        projectsDelivered: 5,
        savingsCategories: ['Operational Excellence', 'Waste Reduction']
      }
    },
    {
      month: 'Jan 2024',
      'hero-cycles': {
        achieved: 3.1,
        target: 3.5,
        projectsInPipeline: 8,
        projectsDelivered: 12,
        savingsCategories: ['Process Optimization', 'Energy Efficiency']
      },
      'hero-motors': {
        achieved: 4.5,
        target: 5.4,
        projectsInPipeline: 12,
        projectsDelivered: 21,
        savingsCategories: ['Supply Chain', 'Manufacturing Efficiency']
      },
      'hmc-hive': {
        achieved: 2.2,
        target: 2.4,
        projectsInPipeline: 3,
        projectsDelivered: 7,
        savingsCategories: ['Digital Transformation', 'Automation']
      },
      munjal: {
        achieved: 1.4,
        target: 1.7,
        projectsInPipeline: 2,
        projectsDelivered: 6,
        savingsCategories: ['Operational Excellence', 'Waste Reduction']
      }
    },
    {
      month: 'Feb 2024',
      'hero-cycles': {
        achieved: 1.8,
        target: 3.5,
        projectsInPipeline: 7,
        projectsDelivered: 11,
        savingsCategories: ['Process Optimization', 'Energy Efficiency']
      },
      'hero-motors': {
        achieved: 3.1,
        target: 5.4,
        projectsInPipeline: 13,
        projectsDelivered: 19,
        savingsCategories: ['Supply Chain', 'Manufacturing Efficiency']
      },
      'hmc-hive': {
        achieved: 1.4,
        target: 2.4,
        projectsInPipeline: 4,
        projectsDelivered: 6,
        savingsCategories: ['Digital Transformation', 'Automation']
      },
      munjal: {
        achieved: 0.8,
        target: 1.7,
        projectsInPipeline: 3,
        projectsDelivered: 5,
        savingsCategories: ['Operational Excellence', 'Waste Reduction']
      }
    },
    {
      month: 'Mar 2024',
      'hero-cycles': {
        achieved: 2.6,
        target: 3.5,
        projectsInPipeline: 6,
        projectsDelivered: 13,
        savingsCategories: ['Process Optimization', 'Energy Efficiency']
      },
      'hero-motors': {
        achieved: 3.9,
        target: 5.4,
        projectsInPipeline: 11,
        projectsDelivered: 20,
        savingsCategories: ['Supply Chain', 'Manufacturing Efficiency']
      },
      'hmc-hive': {
        achieved: 1.7,
        target: 2.4,
        projectsInPipeline: 3,
        projectsDelivered: 7,
        savingsCategories: ['Digital Transformation', 'Automation']
      },
      munjal: {
        achieved: 1.2,
        target: 1.7,
        projectsInPipeline: 2,
        projectsDelivered: 5,
        savingsCategories: ['Operational Excellence', 'Waste Reduction']
      }
    },
    {
      month: 'Apr 2024',
      'hero-cycles': {
        achieved: 2.4,
        target: 3.5,
        projectsInPipeline: 5,
        projectsDelivered: 14,
        savingsCategories: ['Process Optimization', 'Energy Efficiency']
      },
      'hero-motors': {
        achieved: 3.7,
        target: 5.4,
        projectsInPipeline: 9,
        projectsDelivered: 22,
        savingsCategories: ['Supply Chain', 'Manufacturing Efficiency']
      },
      'hmc-hive': {
        achieved: 2.0,
        target: 2.4,
        projectsInPipeline: 2,
        projectsDelivered: 8,
        savingsCategories: ['Digital Transformation', 'Automation']
      },
      munjal: {
        achieved: 1.1,
        target: 1.7,
        projectsInPipeline: 1,
        projectsDelivered: 6,
        savingsCategories: ['Operational Excellence', 'Waste Reduction']
      }
    },
    {
      month: 'May 2024',
      'hero-cycles': {
        achieved: 1.9,
        target: 3.5,
        projectsInPipeline: 8,
        projectsDelivered: 10,
        savingsCategories: ['Process Optimization', 'Energy Efficiency']
      },
      'hero-motors': {
        achieved: 2.8,
        target: 5.4,
        projectsInPipeline: 15,
        projectsDelivered: 18,
        savingsCategories: ['Supply Chain', 'Manufacturing Efficiency']
      },
      'hmc-hive': {
        achieved: 1.3,
        target: 2.4,
        projectsInPipeline: 5,
        projectsDelivered: 5,
        savingsCategories: ['Digital Transformation', 'Automation']
      },
      munjal: {
        achieved: 0.9,
        target: 1.7,
        projectsInPipeline: 4,
        projectsDelivered: 4,
        savingsCategories: ['Operational Excellence', 'Waste Reduction']
      }
    },
    {
      month: 'Jun 2024',
      'hero-cycles': {
        achieved: 3.2,
        target: 3.5,
        projectsInPipeline: 4,
        projectsDelivered: 17,
        savingsCategories: ['Process Optimization', 'Energy Efficiency']
      },
      'hero-motors': {
        achieved: 4.8,
        target: 5.4,
        projectsInPipeline: 8,
        projectsDelivered: 25,
        savingsCategories: ['Supply Chain', 'Manufacturing Efficiency']
      },
      'hmc-hive': {
        achieved: 2.1,
        target: 2.4,
        projectsInPipeline: 2,
        projectsDelivered: 9,
        savingsCategories: ['Digital Transformation', 'Automation']
      },
      munjal: {
        achieved: 1.5,
        target: 1.7,
        projectsInPipeline: 1,
        projectsDelivered: 7,
        savingsCategories: ['Operational Excellence', 'Waste Reduction']
      }
    },
    {
      month: 'Jul 2024',
      'hero-cycles': {
        achieved: 2.0,
        target: 3.5,
        projectsInPipeline: 7,
        projectsDelivered: 12,
        savingsCategories: ['Process Optimization', 'Energy Efficiency']
      },
      'hero-motors': {
        achieved: 3.4,
        target: 5.4,
        projectsInPipeline: 12,
        projectsDelivered: 20,
        savingsCategories: ['Supply Chain', 'Manufacturing Efficiency']
      },
      'hmc-hive': {
        achieved: 1.6,
        target: 2.4,
        projectsInPipeline: 4,
        projectsDelivered: 6,
        savingsCategories: ['Digital Transformation', 'Automation']
      },
      munjal: {
        achieved: 1.0,
        target: 1.7,
        projectsInPipeline: 3,
        projectsDelivered: 5,
        savingsCategories: ['Operational Excellence', 'Waste Reduction']
      }
    },
    {
      month: 'Aug 2024',
      'hero-cycles': {
        achieved: 2.8,
        target: 3.5,
        projectsInPipeline: 6,
        projectsDelivered: 13,
        savingsCategories: ['Process Optimization', 'Energy Efficiency']
      },
      'hero-motors': {
        achieved: 4.2,
        target: 5.4,
        projectsInPipeline: 10,
        projectsDelivered: 21,
        savingsCategories: ['Supply Chain', 'Manufacturing Efficiency']
      },
      'hmc-hive': {
        achieved: 1.9,
        target: 2.4,
        projectsInPipeline: 3,
        projectsDelivered: 7,
        savingsCategories: ['Digital Transformation', 'Automation']
      },
      munjal: {
        achieved: 1.3,
        target: 1.7,
        projectsInPipeline: 2,
        projectsDelivered: 6,
        savingsCategories: ['Operational Excellence', 'Waste Reduction']
      }
    },
    {
      month: 'Sep 2024',
      'hero-cycles': {
        achieved: 2.9,
        target: 3.5,
        projectsInPipeline: 5,
        projectsDelivered: 15,
        savingsCategories: ['Process Optimization', 'Energy Efficiency']
      },
      'hero-motors': {
        achieved: 4.1,
        target: 5.4,
        projectsInPipeline: 8,
        projectsDelivered: 23,
        savingsCategories: ['Supply Chain', 'Manufacturing Efficiency']
      },
      'hmc-hive': {
        achieved: 1.8,
        target: 2.4,
        projectsInPipeline: 2,
        projectsDelivered: 8,
        savingsCategories: ['Digital Transformation', 'Automation']
      },
      munjal: {
        achieved: 1.2,
        target: 1.7,
        projectsInPipeline: 2,
        projectsDelivered: 6,
        savingsCategories: ['Operational Excellence', 'Waste Reduction']
      }
    }
  ]
};

// Delayed Projects Data - Top value delayed projects across group companies
export const delayedProjectsData = [
  {
    id: 2847,
    name: 'Electric Vehicle Battery Assembly Line',
    company: 'Hero Motors',
    companyLogo: '/assets/logos/hero-motors.png',
    department: 'Manufacturing',
    value: 125.8,
    delayedDays: 45,
    projectManager: 'Rajesh Kumar'
  },
  {
    id: 1923,
    name: 'Smart Manufacturing IoT Platform',
    company: 'Hero Cycles',
    companyLogo: '/assets/logos/hero-cycles.png',
    department: 'IT',
    value: 89.2,
    delayedDays: 32,
    projectManager: 'Priya Sharma'
  },
  {
    id: 3156,
    name: 'Advanced Paint Shop Automation',
    company: 'Hero Motors',
    companyLogo: '/assets/logos/hero-motors.png',
    department: 'Operations',
    value: 76.5,
    delayedDays: 28,
    projectManager: 'Amit Patel'
  },
  {
    id: 4281,
    name: 'Digital Twin Manufacturing Hub',
    company: 'HMC Hive',
    companyLogo: '/assets/logos/hmc-hive.png',
    department: 'R&D',
    value: 64.3,
    delayedDays: 21,
    projectManager: 'Sunita Verma'
  },
  {
    id: 1674,
    name: 'Warehouse Management System',
    company: 'Hero Cycles',
    companyLogo: '/assets/logos/hero-cycles.png',
    department: 'Supply Chain',
    value: 52.7,
    delayedDays: 18,
    projectManager: 'Vikash Gupta'
  },
  {
    id: 3892,
    name: 'Predictive Maintenance AI',
    company: 'Hero Motors',
    companyLogo: '/assets/logos/hero-motors.png',
    department: 'IT',
    value: 41.9,
    delayedDays: 15,
    projectManager: 'Meera Agarwal'
  },
  {
    id: 2145,
    name: 'Quality Assurance Automation',
    company: 'Munjal Kiru',
    companyLogo: '/assets/logos/munjal.png',
    department: 'Quality',
    value: 35.6,
    delayedDays: 12,
    projectManager: 'Rohit Verma'
  }
].sort((a, b) => b.value - a.value);

// Healthy Projects Data - Top performing projects across group companies
export const healthyProjectsData = [
  // Hero Motors Projects
  {
    id: 1001,
    name: 'Advanced Electric Motor Production Line',
    company: 'Hero Motors',
    companyLogo: '/assets/logos/hero-motors.png',
    department: 'Manufacturing',
    value: 156.8,
    status: 'on-track',
    completionPercentage: 78,
    projectManager: 'Arvind Singh',
    timeline: 'Q1 2026',
    healthScore: 95
  },
  {
    id: 1002,
    name: 'Sustainable Energy Initiative',
    company: 'Hero Motors',
    companyLogo: '/assets/logos/hero-motors.png',
    department: 'Operations',
    value: 98.5,
    status: 'ahead',
    completionPercentage: 85,
    projectManager: 'Neha Kapoor',
    timeline: 'Q4 2025',
    healthScore: 92
  },
  {
    id: 1003,
    name: 'Digital Showroom Experience',
    company: 'Hero Motors',
    companyLogo: '/assets/logos/hero-motors.png',
    department: 'Sales',
    value: 67.3,
    status: 'on-track',
    completionPercentage: 62,
    projectManager: 'Ravi Malhotra',
    timeline: 'Q2 2026',
    healthScore: 88
  },

  // Hero Cycles Projects
  {
    id: 2001,
    name: 'Carbon Fiber Frame Manufacturing',
    company: 'Hero Cycles',
    companyLogo: '/assets/logos/hero-cycles.png',
    department: 'R&D',
    value: 134.7,
    status: 'on-track',
    completionPercentage: 72,
    projectManager: 'Deepak Sharma',
    timeline: 'Q1 2026',
    healthScore: 94
  },
  {
    id: 2002,
    name: 'Smart Bicycle IoT Integration',
    company: 'Hero Cycles',
    companyLogo: '/assets/logos/hero-cycles.png',
    department: 'IT',
    value: 78.4,
    status: 'ahead',
    completionPercentage: 89,
    projectManager: 'Anita Reddy',
    timeline: 'Q4 2025',
    healthScore: 96
  },
  {
    id: 2003,
    name: 'Global Export Hub Setup',
    company: 'Hero Cycles',
    companyLogo: '/assets/logos/hero-cycles.png',
    department: 'Supply Chain',
    value: 112.6,
    status: 'on-track',
    completionPercentage: 68,
    projectManager: 'Suresh Patel',
    timeline: 'Q2 2026',
    healthScore: 90
  },

  // HMC Hive Projects
  {
    id: 3001,
    name: 'Innovation Lab Infrastructure',
    company: 'HMC Hive',
    companyLogo: '/assets/logos/hmc-hive.png',
    department: 'R&D',
    value: 145.3,
    status: 'on-track',
    completionPercentage: 81,
    projectManager: 'Kiran Mehta',
    timeline: 'Q1 2026',
    healthScore: 93
  },
  {
    id: 3002,
    name: 'AI-Powered Analytics Platform',
    company: 'HMC Hive',
    companyLogo: '/assets/logos/hmc-hive.png',
    department: 'IT',
    value: 92.8,
    status: 'ahead',
    completionPercentage: 91,
    projectManager: 'Pooja Agrawal',
    timeline: 'Q4 2025',
    healthScore: 97
  },
  {
    id: 3003,
    name: 'Startup Incubation Program',
    company: 'HMC Hive',
    companyLogo: '/assets/logos/hmc-hive.png',
    department: 'Business Development',
    value: 56.7,
    status: 'on-track',
    completionPercentage: 74,
    projectManager: 'Rahul Joshi',
    timeline: 'Q1 2026',
    healthScore: 89
  },

  // Munjal Projects
  {
    id: 4001,
    name: 'Component Quality Automation',
    company: 'Munjal',
    companyLogo: '/assets/logos/munjal.png',
    department: 'Quality',
    value: 89.6,
    status: 'on-track',
    completionPercentage: 76,
    projectManager: 'Vinod Kumar',
    timeline: 'Q1 2026',
    healthScore: 91
  },
  {
    id: 4002,
    name: 'Precision Engineering Setup',
    company: 'Munjal',
    companyLogo: '/assets/logos/munjal.png',
    department: 'Manufacturing',
    value: 124.5,
    status: 'ahead',
    completionPercentage: 83,
    projectManager: 'Seema Gupta',
    timeline: 'Q4 2025',
    healthScore: 95
  },
  {
    id: 4003,
    name: 'Vendor Management System',
    company: 'Munjal',
    companyLogo: '/assets/logos/munjal.png',
    department: 'Supply Chain',
    value: 45.8,
    status: 'on-track',
    completionPercentage: 70,
    projectManager: 'Ajay Verma',
    timeline: 'Q2 2026',
    healthScore: 87
  }
];

// Business Excellence Dashboard Data

// Project Lifecycle Distribution Data (for Bar Chart)
export const projectLifecycleData = [
  {
    stage: 'L0',
    stageName: 'Concept',
    projects: 45,
    description: 'Initial concept and feasibility',
    averageDuration: '2-4 weeks',
    totalBudget: 125.5
  },
  {
    stage: 'L1',
    stageName: 'Planning',
    projects: 38,
    description: 'Detailed planning and design',
    averageDuration: '4-8 weeks',
    totalBudget: 289.3
  },
  {
    stage: 'L2',
    stageName: 'Development',
    projects: 42,
    description: 'Active development and prototyping',
    averageDuration: '8-16 weeks',
    totalBudget: 456.7
  },
  {
    stage: 'L3',
    stageName: 'Testing',
    projects: 29,
    description: 'Testing and validation',
    averageDuration: '4-8 weeks',
    totalBudget: 234.8
  },
  {
    stage: 'L4',
    stageName: 'Implementation',
    projects: 18,
    description: 'Implementation and deployment',
    averageDuration: '6-12 weeks',
    totalBudget: 187.2
  },
  {
    stage: 'L5',
    stageName: 'Completed',
    projects: 24,
    description: 'Project completed and delivered',
    averageDuration: 'N/A',
    totalBudget: 298.4
  }
];

// Resource Consumption Trends Data (for Area Chart)
export const resourceConsumptionData = [
  {
    month: 'Apr 2024',
    paint: 12500,
    energy: 89000,
    rawMaterial: 156000,
    water: 45000,
    gas: 23000,
    chemicals: 8900,
    totalCost: 2.8
  },
  {
    month: 'May 2024',
    paint: 13200,
    energy: 92000,
    rawMaterial: 162000,
    water: 47000,
    gas: 24500,
    chemicals: 9200,
    totalCost: 3.1
  },
  {
    month: 'Jun 2024',
    paint: 11800,
    energy: 87000,
    rawMaterial: 148000,
    water: 43000,
    gas: 22000,
    chemicals: 8500,
    totalCost: 2.6
  },
  {
    month: 'Jul 2024',
    paint: 14100,
    energy: 95000,
    rawMaterial: 168000,
    water: 49000,
    gas: 25500,
    chemicals: 9800,
    totalCost: 3.4
  },
  {
    month: 'Aug 2024',
    paint: 13800,
    energy: 91000,
    rawMaterial: 159000,
    water: 46000,
    gas: 24000,
    chemicals: 9400,
    totalCost: 3.2
  },
  {
    month: 'Sep 2024',
    paint: 15200,
    energy: 98000,
    rawMaterial: 175000,
    water: 52000,
    gas: 27000,
    chemicals: 10500,
    totalCost: 3.7
  }
];

// Resource Allocation by Category Data (for Pie Chart)
export const resourceAllocationData = [
  {
    category: 'Raw Materials',
    value: 42.5,
    cost: 425.8,
    fill: 'var(--chart-1)',
    description: 'Steel, aluminum, plastics, components'
  },
  {
    category: 'Energy',
    value: 23.2,
    cost: 232.4,
    fill: 'var(--chart-2)',
    description: 'Electricity, fuel, power consumption'
  },
  {
    category: 'Labor',
    value: 18.7,
    cost: 187.3,
    fill: 'var(--chart-3)',
    description: 'Manufacturing workforce, operations'
  },
  {
    category: 'Paint & Chemicals',
    value: 8.9,
    cost: 89.2,
    fill: 'var(--chart-4)',
    description: 'Paint, solvents, chemical treatments'
  },
  {
    category: 'Water & Utilities',
    value: 4.2,
    cost: 42.1,
    fill: 'var(--chart-5)',
    description: 'Water consumption, waste management'
  },
  {
    category: 'Gas & Fuel',
    value: 2.5,
    cost: 25.2,
    fill: 'var(--chart-6)',
    description: 'Natural gas, industrial fuel'
  }
];

// Project Performance Metrics by Company
export const companyPerformanceData = [
  {
    company: 'Hero Motors',
    l0: 18,
    l1: 15,
    l2: 19,
    l3: 12,
    l4: 8,
    l5: 11,
    efficiency: 87.5,
    budget: 456.7
  },
  {
    company: 'Hero Cycles',
    l0: 12,
    l1: 10,
    l2: 14,
    l3: 9,
    l4: 6,
    l5: 8,
    efficiency: 82.3,
    budget: 298.4
  },
  {
    company: 'HMC Hive',
    l0: 9,
    l1: 8,
    l2: 6,
    l3: 5,
    l4: 3,
    l5: 4,
    efficiency: 91.2,
    budget: 187.2
  },
  {
    company: 'Munjal Kiru',
    l0: 6,
    l1: 5,
    l2: 3,
    l3: 3,
    l4: 1,
    l5: 1,
    efficiency: 78.9,
    budget: 89.6
  }
];

// Company project statistics - derived from companyPerformanceData for consistency
export const companyProjectStats = companyPerformanceData.map((company) => {
  const totalProjects =
    company.l0 + company.l1 + company.l2 + company.l3 + company.l4 + company.l5;
  const activeProjects =
    company.l0 + company.l1 + company.l2 + company.l3 + company.l4; // Exclude L5 (completed)
  const completedProjects = company.l5;

  // Calculate realistic healthy/delayed breakdown based on project lifecycle
  const healthyProjects = Math.floor(totalProjects * 0.68); // ~68% healthy
  const delayedProjects = Math.floor(totalProjects * 0.22); // ~22% delayed
  const onHoldProjects = totalProjects - healthyProjects - delayedProjects; // remainder on hold

  const logoMap: { [key: string]: string } = {
    'Hero Motors': '/assets/logos/hero-motors.png',
    'Hero Cycles': '/assets/logos/hero-cycles.png',
    'HMC Hive': '/assets/logos/hmc-hive.png',
    'Munjal Kiru': '/assets/logos/munjal.png'
  };

  return {
    company: company.company === 'Munjal Kiru' ? 'Munjal' : company.company,
    logo: logoMap[company.company],
    totalProjects,
    activeProjects, // New field to distinguish from total
    completedProjects,
    healthyProjects,
    delayedProjects,
    onHoldProjects
  };
});
