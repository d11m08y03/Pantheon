// Team Registration Data Store
// This file manages the storage and retrieval of team registration data

export interface TeamMember {
  name: string;
  umail: string;
  contact: string;
  foodPreference: string;
  allergies: string;
  shirtSize: string;
}

export interface TeamRegistration {
  id: string;
  teamName: string;
  members: TeamMember[];
  proposal: File | null;
  registrationDate: Date;
  status: 'pending' | 'approved' | 'rejected';
}

// In-memory storage for team registrations
let teamRegistrations: TeamRegistration[] = [];

// Generate unique ID for each registration
const generateId = (): string => {
  return `team_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// Add a new team registration
export const addTeamRegistration = (registration: Omit<TeamRegistration, 'id' | 'registrationDate' | 'status'>): TeamRegistration => {
  const newRegistration: TeamRegistration = {
    ...registration,
    id: generateId(),
    registrationDate: new Date(),
    status: 'pending'
  };
  
  teamRegistrations.push(newRegistration);
  
  // Also save to localStorage for persistence
  saveToLocalStorage();
  
  return newRegistration;
};

// Get all team registrations
export const getAllTeamRegistrations = (): TeamRegistration[] => {
  return [...teamRegistrations];
};

// Get team registration by ID
export const getTeamRegistrationById = (id: string): TeamRegistration | undefined => {
  return teamRegistrations.find(registration => registration.id === id);
};

// Get team registration by team name
export const getTeamRegistrationByName = (teamName: string): TeamRegistration | undefined => {
  return teamRegistrations.find(registration => 
    registration.teamName.toLowerCase() === teamName.toLowerCase()
  );
};

// Update team registration status
export const updateTeamStatus = (id: string, status: 'pending' | 'approved' | 'rejected'): boolean => {
  const registration = teamRegistrations.find(reg => reg.id === id);
  if (registration) {
    registration.status = status;
    saveToLocalStorage();
    return true;
  }
  return false;
};

// Delete team registration
export const deleteTeamRegistration = (id: string): boolean => {
  const initialLength = teamRegistrations.length;
  teamRegistrations = teamRegistrations.filter(registration => registration.id !== id);
  
  if (teamRegistrations.length < initialLength) {
    saveToLocalStorage();
    return true;
  }
  return false;
};

// Get registrations by status
export const getRegistrationsByStatus = (status: 'pending' | 'approved' | 'rejected'): TeamRegistration[] => {
  return teamRegistrations.filter(registration => registration.status === status);
};

// Get total number of registrations
export const getTotalRegistrations = (): number => {
  return teamRegistrations.length;
};

// Get total number of participants
export const getTotalParticipants = (): number => {
  return teamRegistrations.reduce((total, registration) => {
    return total + registration.members.length;
  }, 0);
};

// Save to localStorage
const saveToLocalStorage = (): void => {
  try {
    localStorage.setItem('teamRegistrations', JSON.stringify(teamRegistrations));
  } catch (error) {
    console.error('Failed to save team registrations to localStorage:', error);
  }
};

// Load from localStorage
const loadFromLocalStorage = (): void => {
  try {
    const stored = localStorage.getItem('teamRegistrations');
    if (stored) {
      const parsed = JSON.parse(stored);
      // Convert date strings back to Date objects
      teamRegistrations = parsed.map((registration: Omit<TeamRegistration, 'registrationDate'> & { registrationDate: string }) => ({
        ...registration,
        registrationDate: new Date(registration.registrationDate)
      }));
    }
  } catch (error) {
    console.error('Failed to load team registrations from localStorage:', error);
    teamRegistrations = [];
  }
};

// Initialize by loading from localStorage
loadFromLocalStorage();

// Export types for use in other files
export type { TeamRegistration as TeamRegistrationType }; 