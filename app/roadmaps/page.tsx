"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import * as HeroIcons from "@heroicons/react/24/outline";
import BestPracticesSection from "../components/roadmaps/BestPracticesSection";
import ProjectIdeasSection from "../components/roadmaps/ProjectIdeasSection";
import { frontendBestPractices } from "./data/bestPractices";
import { frontendProjectIdeas } from "./data/projectIdeas";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

interface Roadmap {
  title: string;
  description: string;
  iconName: keyof typeof HeroIcons;
  path: string;
  level: string;
  duration: string;
  isNew?: boolean;
}

const initialRoleBasedRoadmaps: Roadmap[] = [
  {
    title: "Frontend Developer",
    description:
      "Master modern frontend technologies and build responsive web applications",
    iconName: "CodeBracketIcon",
    path: "/roadmaps/frontend",
    level: "Beginner to Advanced",
    duration: "6-8 months",
  },
  {
    title: "Backend Developer",
    description: "Learn server-side programming and database management",
    iconName: "ServerIcon",
    path: "/roadmaps/backend",
    level: "Intermediate",
    duration: "8-10 months",
  },
  {
    title: "DevOps Engineer",
    description: "Master deployment, scaling, and operations management",
    iconName: "CloudIcon",
    path: "/roadmaps/devops",
    level: "Advanced",
    duration: "10-12 months",
  },
  {
    title: "Full Stack Developer",
    description: "Become proficient in both frontend and backend development",
    iconName: "CommandLineIcon",
    path: "/roadmaps/fullstack",
    level: "Advanced",
    duration: "12-15 months",
  },
  {
    title: "Data Engineer",
    description: "Master data pipelines, warehousing, and big data processing",
    iconName: "CircleStackIcon",
    path: "/roadmaps/dataengineer",
    level: "Intermediate to Advanced",
    duration: "10-12 months",
    isNew: true,
  },
  {
    title: "Data Analyst",
    description:
      "Learn data analysis, visualization, and business intelligence",
    iconName: "ChartBarIcon",
    path: "/roadmaps/dataanalyst",
    level: "Beginner to Intermediate",
    duration: "8-10 months",
    isNew: true,
  },
  {
    title: "AI Engineer",
    description: "Build and deploy artificial intelligence solutions",
    iconName: "CpuChipIcon",
    path: "/roadmaps/ai-engineer",
    level: "Advanced",
    duration: "10-12 months",
    isNew: true,
  },
  {
    title: "Android Developer",
    description: "Create native Android applications",
    iconName: "DevicePhoneMobileIcon",
    path: "/roadmaps/android",
    level: "Intermediate",
    duration: "8-10 months",
  },
  {
    title: "iOS Developer",
    description: "Build applications for Apple's ecosystem",
    iconName: "DevicePhoneMobileIcon",
    path: "/roadmaps/ios",
    level: "Intermediate",
    duration: "8-10 months",
  },
  {
    title: "Unity Developer",
    description: "Master Unity game engine and C# development",
    iconName: "PlayIcon",
    path: "/roadmaps/game-dev",
    level: "Intermediate",
    duration: "10-12 months",
  },
  {
    title: "Unreal Developer",
    description: "Master Unreal Engine and C++ game development",
    iconName: "CubeIcon",
    path: "/roadmaps/unreal",
    level: "Advanced",
    duration: "12-14 months",
  },
  {
    title: "Engineering Manager",
    description: "Lead technical teams and manage software projects",
    iconName: "UserGroupIcon",
    path: "/roadmaps/engineering-manager",
    level: "Expert",
    duration: "24+ months",
    isNew: true,
  },
];

const initialSkillBasedRoadmaps: Roadmap[] = [
  {
    title: "Computer Science",
    description: "Core CS concepts and fundamentals",
    iconName: "AcademicCapIcon",
    path: "/roadmaps/computer-science",
    level: "Beginner to Advanced",
    duration: "12-15 months",
  },
  {
    title: "React",
    description: "Modern React development with hooks and best practices",
    iconName: "CodeBracketIcon",
    path: "/roadmaps/react",
    level: "Intermediate",
    duration: "4-6 months",
  },
  {
    title: "Node.js",
    description: "Server-side JavaScript development",
    iconName: "ServerIcon",
    path: "/roadmaps/nodejs",
    level: "Intermediate",
    duration: "4-6 months",
  },
  {
    title: "Python",
    description: "Python programming from basics to advanced",
    iconName: "CommandLineIcon",
    path: "/roadmaps/python",
    level: "Beginner to Advanced",
    duration: "6-8 months",
  },
  {
    title: "System Design",
    description: "Design scalable systems and architectures",
    iconName: "CircleStackIcon",
    path: "/roadmaps/system-design",
    level: "Advanced",
    duration: "6-8 months",
  },
  {
    title: "Docker",
    description: "Container technology and orchestration",
    iconName: "CubeTransparentIcon",
    path: "/roadmaps/docker",
    level: "Intermediate",
    duration: "3-4 months",
  },
  {
    title: "Kubernetes",
    description: "Container orchestration and cloud-native applications",
    iconName: "CloudIcon",
    path: "/roadmaps/kubernetes",
    level: "Advanced",
    duration: "4-6 months",
  },
  {
    title: "AWS",
    description: "Amazon Web Services cloud platform",
    iconName: "CloudArrowUpIcon",
    path: "/roadmaps/aws",
    level: "Intermediate to Advanced",
    duration: "6-8 months",
  },
];

const iconOptions = [
  "CodeBracketIcon",
  "ServerIcon",
  "CloudIcon",
  "CommandLineIcon",
  "CircleStackIcon",
  "ChartBarIcon",
  "CpuChipIcon",
  "DevicePhoneMobileIcon",
  "PlayIcon",
  "CubeIcon",
  "UserGroupIcon",
  "AcademicCapIcon",
  "CubeTransparentIcon",
  "CloudArrowUpIcon",
];

const RoadmapCard = ({ roadmap }: { roadmap: Roadmap }) => {
  const IconComponent = HeroIcons[roadmap.iconName];

  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="relative group"
    >
      <Link href={roadmap.path} className="block">
        <div className="bg-white p-6 rounded-xl h-full border border-gray-200 transition-all duration-200 group-hover:border-black/30 group-hover:shadow-lg">
          {roadmap.isNew && (
            <span className="absolute -top-2 -right-2 bg-black text-white text-xs px-2 py-1 rounded-full font-medium">
              New
            </span>
          )}
          <div className="flex items-center space-x-4 mb-4">
            <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-gray-200 transition-all duration-200">
              {IconComponent && (
                <IconComponent className="w-6 h-6 text-black group-hover:text-gray-900 transition-colors duration-200" />
              )}
            </div>
            <h3 className="font-semibold text-lg text-black group-hover:text-gray-900 transition-colors duration-200">
              {roadmap.title}
            </h3>
          </div>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2 group-hover:text-gray-700 transition-colors duration-200">
            {roadmap.description}
          </p>
          <div className="flex items-center justify-between text-xs text-gray-500">
            {roadmap.level} • {roadmap.duration}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

const GenerateRoadmapCard = ({ onClick }: { onClick: () => void }) => {
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="relative group"
    >
      <div
        onClick={onClick}
        className="cursor-pointer bg-white p-6 rounded-xl h-full border border-dashed border-gray-300 transition-all duration-200 group-hover:border-black/30 group-hover:shadow-lg flex flex-col justify-center items-center"
      >
        <div className="p-2 bg-gray-100 rounded-full group-hover:bg-gray-200 transition-all duration-200 mb-4">
          <HeroIcons.PlusIcon className="w-6 h-6 text-black group-hover:text-gray-900 transition-colors duration-200" />
        </div>
        <h3 className="font-semibold text-lg text-black group-hover:text-gray-900 transition-colors duration-200 text-center">
          Generate Roadmap
        </h3>
        <p className="text-gray-600 text-sm mt-2 text-center group-hover:text-gray-700 transition-colors duration-200">
          Create a custom roadmap based on your role and skills
        </p>
      </div>
    </motion.div>
  );
};

// Dialog component
const RoadmapFormDialog = ({
  isOpen,
  onClose,
  onSubmit,
  formType,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (roadmap: Roadmap, type: "role" | "skill") => void;
  formType: "role" | "skill";
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [iconName, setIconName] =
    useState<keyof typeof HeroIcons>("CodeBracketIcon");
  const [level, setLevel] = useState("");
  const [duration, setDuration] = useState("");
  const [isNew, setIsNew] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const slug = title.toLowerCase().replace(/\s+/g, "-");

    const newRoadmap: Roadmap = {
      title,
      description,
      iconName,
      path: `/roadmaps/${slug}`,
      level,
      duration,
      isNew,
    };

    onSubmit(newRoadmap, formType);
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setIconName("CodeBracketIcon");
    setLevel("");
    setDuration("");
    setIsNew(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">
            Create {formType === "role" ? "Role-Based" : "Skill-Based"} Roadmap
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-black">
            <HeroIcons.XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title*
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description*
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                rows={3}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Icon
              </label>
              <select
                value={iconName}
                onChange={(e) =>
                  setIconName(e.target.value as keyof typeof HeroIcons)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              >
                {iconOptions.map((icon) => (
                  <option key={icon} value={icon}>
                    {icon.replace("Icon", "")}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Level*
              </label>
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                required
              >
                <option value="">Select level</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="Expert">Expert</option>
                <option value="Beginner to Intermediate">
                  Beginner to Intermediate
                </option>
                <option value="Beginner to Advanced">
                  Beginner to Advanced
                </option>
                <option value="Intermediate to Advanced">
                  Intermediate to Advanced
                </option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Duration*
              </label>
              <input
                type="text"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="e.g. 6-8 months"
                required
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="isNew"
                checked={isNew}
                onChange={(e) => setIsNew(e.target.checked)}
                className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
              />
              <label
                htmlFor="isNew"
                className="ml-2 block text-sm text-gray-700"
              >
                Mark as New
              </label>
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-black text-white rounded-md text-sm font-medium hover:bg-gray-800"
            >
              Create Roadmap
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const RoadmapSection = ({
  title,
  description,
  roadmaps,
  onAddRoadmap,
  type,
}: {
  title: string;
  description: string;
  roadmaps: Roadmap[];
  onAddRoadmap: () => void;
  type: "role" | "skill";
}) => (
  <motion.div
    variants={containerVariants}
    initial="hidden"
    animate="visible"
    className="mb-20 relative"
  >
    <motion.div className="mb-16 text-center" variants={itemVariants}>
      <h2 className="text-3xl font-bold mb-4 text-black">{title}</h2>
      <p className="text-gray-600 max-w-2xl mx-auto">{description}</p>
    </motion.div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {roadmaps.map((roadmap) => (
        <RoadmapCard key={roadmap.title} roadmap={roadmap} />
      ))}
      <GenerateRoadmapCard onClick={onAddRoadmap} />
    </div>
  </motion.div>
);

export default function RoadmapsPage() {
  const [roleBasedRoadmaps, setRoleBasedRoadmaps] = useState<Roadmap[]>(
    initialRoleBasedRoadmaps
  );
  const [skillBasedRoadmaps, setSkillBasedRoadmaps] = useState<Roadmap[]>(
    initialSkillBasedRoadmaps
  );

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState<"role" | "skill">("role");

  const handleAddRoadmap = (roadmap: Roadmap, type: "role" | "skill") => {
    if (type === "role") {
      setRoleBasedRoadmaps([...roleBasedRoadmaps, roadmap]);
    } else {
      setSkillBasedRoadmaps([...skillBasedRoadmaps, roadmap]);
    }
  };

  const openRoleDialog = () => {
    setDialogType("role");
    setDialogOpen(true);
  };

  const openSkillDialog = () => {
    setDialogType("skill");
    setDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative pt-32 pb-20 bg-black">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1
              className="text-5xl md:text-6xl font-bold text-white mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Learning Roadmaps
            </motion.h1>
            <motion.p
              className="text-xl text-gray-300 max-w-3xl mx-auto font-light"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Choose your path and start your journey to mastery. Our roadmaps
              provide structured learning paths for various roles and skills in
              software development.
            </motion.p>
          </div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <RoadmapSection
          title="Role-Based Roadmaps"
          description="Comprehensive learning paths designed for specific career roles in software development"
          roadmaps={roleBasedRoadmaps}
          onAddRoadmap={openRoleDialog}
          type="role"
        />
        <RoadmapSection
          title="Skill-Based Roadmaps"
          description="Learn specific technologies and skills with structured learning paths"
          roadmaps={skillBasedRoadmaps}
          onAddRoadmap={openSkillDialog}
          type="skill"
        />
        <div className="mt-16 mb-8">
          <h2 className="text-2xl font-bold text-black">Best Practices</h2>
          <p className="mt-2 text-gray-400">
            Master industry-standard practices and patterns for efficient
            development
          </p>
        </div>
        <div className="mt-8">
          <BestPracticesSection practices={frontendBestPractices} />
        </div>
        <div className="mt-16">
          <ProjectIdeasSection />
        </div>
      </div>

      {/* Dialog */}
      <RoadmapFormDialog
        isOpen={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSubmit={handleAddRoadmap}
        formType={dialogType}
      />
    </div>
  );
}
