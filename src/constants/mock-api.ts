////////////////////////////////////////////////////////////////////////////////
// 🛑 Nothing in here has anything to do with Nextjs, it's just a fake database
////////////////////////////////////////////////////////////////////////////////

import { faker } from '@faker-js/faker';
import { matchSorter } from 'match-sorter'; // For filtering
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
    { name: 'Priya Sharma', role: 'business-head' },
    { name: 'Amit Patel', role: 'group-cfo' },
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
      const approverRole = toStage === 'L3' ? 'business-head' : 'group-cfo';
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
      'Updated project description',
      'Modified project budget',
      'Updated project timeline',
      'Added project documentation',
      'Updated team assignments'
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

export type Project = {
  photo_url: string;
  name: string;
  description: string;
  created_at: string;
  price: number;
  id: number;
  category: string;
  updated_at: string;
  stage: ProjectStage;
  pending_approval?: {
    from_stage: ProjectStage;
    to_stage: ProjectStage;
    requested_by: string;
    requested_at: string;
    approver_type: 'business-head' | 'group-cfo';
  };
  timeline: TimelineEvent[];
};

// Mock project data store
export const fakeProjects = {
  records: [] as Project[], // Holds the list of project objects

  // Initialize with sample data
  initialize() {
    const sampleProjects: Project[] = [];
    function generateRandomProjectData(id: number): Project {
      const categories = ['active', 'inactive', 'pending', 'completed'];

      const stages: ProjectStage[] = ['L0', 'L1', 'L2', 'L3', 'L4', 'L5'];

      const createdDate = faker.date.between({
        from: '2022-01-01',
        to: '2023-12-31'
      });
      const projectStage = faker.helpers.arrayElement(stages);

      const project: Project = {
        id,
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        created_at: createdDate.toISOString(),
        price: parseFloat(
          faker.commerce.price({ min: 500000, max: 50000000, dec: 0 })
        ),
        photo_url: `https://api.slingacademy.com/public/sample-projects/${id}.png`,
        category: faker.helpers.arrayElement(categories),
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

      // Add pending approval for some projects (simulate approval workflow)
      if (Math.random() < 0.2) {
        // 20% chance of pending approval
        const currentStageIndex = stages.indexOf(project.stage);
        if (currentStageIndex > 0) {
          const fromStage = stages[currentStageIndex - 1];
          project.pending_approval = {
            from_stage: fromStage,
            to_stage: project.stage,
            requested_by: faker.person.fullName(),
            requested_at: faker.date.recent().toISOString(),
            approver_type:
              project.stage === 'L3' ? 'business-head' : 'group-cfo'
          };
        }
      }

      return project;
    }

    // Generate remaining records
    for (let i = 1; i <= 20; i++) {
      sampleProjects.push(generateRandomProjectData(i));
    }

    this.records = sampleProjects;
  },

  // Get all projects with optional category filtering and search
  async getAll({
    categories = [],
    search
  }: {
    categories?: string[];
    search?: string;
  }) {
    let projects = [...this.records];

    // Filter projects based on selected categories
    if (categories.length > 0) {
      projects = projects.filter((project) =>
        categories.includes(project.category)
      );
    }

    // Search functionality across multiple fields
    if (search) {
      projects = matchSorter(projects, search, {
        keys: ['name', 'description', 'category']
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

    // Find the project by its ID
    const project = this.records.find((project) => project.id === id);

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
      userType !== 'business-head' &&
      userType !== 'super-admin'
    ) {
      // Request approval from business head
      project.pending_approval = {
        from_stage: project.stage,
        to_stage: nextStage,
        requested_by: 'Current User', // In real app, get from auth
        requested_at: new Date().toISOString(),
        approver_type: 'business-head'
      };

      // Add timeline event
      project.timeline.push({
        id: `${project.id}-approval-request-${nextStage}-${Date.now()}`,
        type: 'approval_requested',
        timestamp: new Date().toISOString(),
        title: `Approval Requested for Stage ${nextStage}`,
        description: `Requested Business Head approval to move from ${project.stage} to ${nextStage}.`,
        user: 'Current User',
        user_role: userType,
        from_stage: project.stage,
        to_stage: nextStage
      });

      return {
        success: true,
        message: 'Approval requested from Business Head'
      };
    }

    if (
      (nextStage === 'L4' || nextStage === 'L5') &&
      userType !== 'group-cfo' &&
      userType !== 'super-admin'
    ) {
      // Request approval from group CFO
      project.pending_approval = {
        from_stage: project.stage,
        to_stage: nextStage,
        requested_by: 'Current User',
        requested_at: new Date().toISOString(),
        approver_type: 'group-cfo'
      };

      // Add timeline event
      project.timeline.push({
        id: `${project.id}-approval-request-${nextStage}-${Date.now()}`,
        type: 'approval_requested',
        timestamp: new Date().toISOString(),
        title: `Approval Requested for Stage ${nextStage}`,
        description: `Requested Group CFO approval to move from ${project.stage} to ${nextStage}.`,
        user: 'Current User',
        user_role: userType,
        from_stage: project.stage,
        to_stage: nextStage
      });

      return { success: true, message: 'Approval requested from Group CFO' };
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

    const canApprove =
      (project.pending_approval.approver_type === 'business-head' &&
        (userType === 'business-head' || userType === 'super-admin')) ||
      (project.pending_approval.approver_type === 'group-cfo' &&
        (userType === 'group-cfo' || userType === 'super-admin'));

    if (!canApprove) {
      return { success: false, error: 'Insufficient permissions to approve' };
    }

    const fromStage = project.stage;
    const toStage = project.pending_approval.to_stage;

    project.stage = toStage;
    project.updated_at = new Date().toISOString();

    // Add approval event first
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

    // Add stage movement event after approval (slightly later timestamp)
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

  // Reject stage progression
  async rejectStageProgression(projectId: number, userType: string) {
    await delay(500);
    const project = this.records.find((item) => item.id === projectId);
    if (!project || !project.pending_approval) {
      return { success: false, error: 'No pending approval found' };
    }

    const canReject =
      (project.pending_approval.approver_type === 'business-head' &&
        (userType === 'business-head' || userType === 'super-admin')) ||
      (project.pending_approval.approver_type === 'group-cfo' &&
        (userType === 'group-cfo' || userType === 'super-admin'));

    if (!canReject) {
      return { success: false, error: 'Insufficient permissions to reject' };
    }

    // Add timeline event
    project.timeline.push({
      id: `${project.id}-approval-rejected-${Date.now()}`,
      type: 'approval_rejected',
      timestamp: new Date().toISOString(),
      title: 'Stage Progression Rejected',
      description: `Rejected the request to move from ${project.pending_approval.from_stage} to ${project.pending_approval.to_stage}.`,
      user: 'Current User',
      user_role: userType,
      from_stage: project.pending_approval.from_stage,
      to_stage: project.pending_approval.to_stage
    });

    delete project.pending_approval;
    project.updated_at = new Date().toISOString();

    return { success: true, message: 'Stage progression rejected' };
  }
};

// Initialize sample projects
fakeProjects.initialize();

// Mock resource usage entries data store for manufacturing
export const fakeResourceUsage = {
  records: [] as ResourceUsageEntry[], // Holds the list of usage entry objects

  // Initialize with sample manufacturing usage data
  initialize() {
    const sampleUsageEntries: ResourceUsageEntry[] = [];

    function generateRandomUsageData(id: number): ResourceUsageEntry {
      const plants = [
        { name: 'Hero MotoCorp Plant 1', location: 'Gurgaon, Haryana' },
        { name: 'Hero MotoCorp Plant 2', location: 'Dharuhera, Haryana' },
        { name: 'Hero MotoCorp Plant 3', location: 'Haridwar, Uttarakhand' },
        { name: 'Hero MotoCorp Plant 4', location: 'Neemrana, Rajasthan' },
        { name: 'Hero MotoCorp Plant 5', location: 'Chittoor, Andhra Pradesh' },
        { name: 'Hero MotoCorp Plant 6', location: 'Halol, Gujarat' }
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
