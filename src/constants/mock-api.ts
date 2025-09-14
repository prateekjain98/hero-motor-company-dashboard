////////////////////////////////////////////////////////////////////////////////
// 🛑 Nothing in here has anything to do with Nextjs, it's just a fake database
////////////////////////////////////////////////////////////////////////////////

import { faker } from '@faker-js/faker';
import { matchSorter } from 'match-sorter'; // For filtering

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
