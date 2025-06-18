export interface Milestone {
  id: string;
  name: string;
  description: string;
  threshold_j: number;
  icon: string;
  color: string;
}

export const milestones: Milestone[] = [
  {
    id: "first-spark",
    name: "First Spark",
    description: "Generate your first 1,000 joules of energy",
    threshold_j: 1000,
    icon: "zap",
    color: "#FFD700"
  },
  {
    id: "power-surge",
    name: "Power Surge",
    description: "Reach 10,000 joules of total energy",
    threshold_j: 10000,
    icon: "zap",
    color: "#FF9500"
  },
  {
    id: "energy-flow",
    name: "Energy Flow",
    description: "Reach 25,000 joules of total energy",
    threshold_j: 25000,
    icon: "zap",
    color: "#FF3B30"
  },
  {
    id: "force-awakens",
    name: "Force Awakens",
    description: "Reach 50,000 joules of total energy",
    threshold_j: 50000,
    icon: "zap",
    color: "#5856D6"
  },
  {
    id: "power-unleashed",
    name: "Power Unleashed",
    description: "Reach 100,000 joules of total energy",
    threshold_j: 100000,
    icon: "zap",
    color: "#007AFF"
  },
  {
    id: "energy-master",
    name: "Energy Master",
    description: "Reach 250,000 joules of total energy",
    threshold_j: 250000,
    icon: "zap",
    color: "#4CD964"
  },
  {
    id: "force-of-nature",
    name: "Force of Nature",
    description: "Reach 500,000 joules of total energy",
    threshold_j: 500000,
    icon: "zap",
    color: "#5AC8FA"
  },
  {
    id: "power-overwhelming",
    name: "Power Overwhelming",
    description: "Reach 1,000,000 joules of total energy",
    threshold_j: 1000000,
    icon: "zap",
    color: "#FF2D55"
  },
  {
    id: "energy-transcendence",
    name: "Energy Transcendence",
    description: "Reach 2,000,000 joules of total energy",
    threshold_j: 2000000,
    icon: "zap",
    color: "#FFCC00"
  },
  {
    id: "limitless-power",
    name: "Limitless Power",
    description: "Reach 5,000,000 joules of total energy",
    threshold_j: 5000000,
    icon: "zap",
    color: "#FF9500"
  }
];