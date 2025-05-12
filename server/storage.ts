// Storage interface for future database operations
// Currently not used as this is a weather dashboard without user accounts

export interface IStorage {
  // Placeholder for future storage needs
}

export class MemStorage implements IStorage {
  constructor() {
    // Placeholder storage implementation
  }
}

export const storage = new MemStorage();
