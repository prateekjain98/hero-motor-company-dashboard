////////////////////////////////////////////////////////////////////////////////
// 🛑 Nothing in here has anything to do with Nextjs, it's just a fake database
////////////////////////////////////////////////////////////////////////////////

import { faker } from '@faker-js/faker';
import { matchSorter } from 'match-sorter'; // For filtering
import { ResourceUsageEntry } from './data';

export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

// Define the shape of Project data
export type Project = {
  photo_url: string;
  name: string;
  description: string;
  created_at: string;
  price: number;
  id: number;
  category: string;
  updated_at: string;
};

// Mock project data store
export const fakeProjects = {
  records: [] as Project[], // Holds the list of project objects

  // Initialize with sample data
  initialize() {
    const sampleProjects: Project[] = [];
    function generateRandomProjectData(id: number): Project {
      const categories = [
        'Electronics',
        'Furniture',
        'Clothing',
        'Toys',
        'Groceries',
        'Books',
        'Jewelry',
        'Beauty Products'
      ];

      return {
        id,
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        created_at: faker.date
          .between({ from: '2022-01-01', to: '2023-12-31' })
          .toISOString(),
        price: parseFloat(faker.commerce.price({ min: 5, max: 500, dec: 2 })),
        photo_url: `https://api.slingacademy.com/public/sample-projects/${id}.png`,
        category: faker.helpers.arrayElement(categories),
        updated_at: faker.date.recent().toISOString()
      };
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
