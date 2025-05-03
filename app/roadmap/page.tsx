"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import Gemini from "@/Model/Gemni";
import {
  FiCode,
  FiGitBranch,
  FiServer,
  FiBook,
  FiLayers,
} from "react-icons/fi";
import { SiNodedotjs, SiReact, SiPython, SiDocker } from "react-icons/si";

interface RoadmapTopic {
  id: string;
  title: string;
  description: string;
  level: string;
  isCompleted: boolean;
  estimatedTime: string;
  links: { title: string; url: string }[];
  subtopics: string[];
  prerequisites: string[];
  icon?: JSX.Element;
}

const getIconComponent = (topicId: string): JSX.Element => {
  const iconMap: { [key: string]: JSX.Element } = {
    basics: <FiCode className="w-6 h-6" />,
    "version-control": <FiGitBranch className="w-6 h-6" />,
    nodejs: <SiNodedotjs className="w-6 h-6" />,
    python: <SiPython className="w-6 h-6" />,
    databases: <FiServer className="w-6 h-6" />,
    "api-design": <FiLayers className="w-6 h-6" />,
    devops: <SiDocker className="w-6 h-6" />,
    security: <FiServer className="w-6 h-6" />,
  };

  return iconMap[topicId] || <FiBook className="w-6 h-6" />;
};

export default function GeneratedRoadmapPage() {
  const searchParams = useSearchParams();

  const title = searchParams.get("title") || "Learning Roadmap";
  const description =
    searchParams.get("description") || "Your personalized learning journey";
  const level = searchParams.get("level") || "Beginner";
  const duration = searchParams.get("duration") || "4";

  const [roadmapData, setRoadmapData] = useState<RoadmapTopic[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTopicId, setActiveTopicId] = useState<string | null>(null);

  useEffect(() => {
    const generateRoadmap = async () => {
      try {
        setLoading(true);

        const prompt = `
Generate a detailed learning roadmap for ${title} at a ${level} level, designed to be completed in approximately ${duration} weeks. The roadmap should be structured as a JSON array with the following requirements:

The learner described their goal as: "${description}"

Each item in the array should have this structure:
{
  id: 'unique-id',
  title: 'Topic Name',
  description: 'Brief explanation of what this covers',
  level: 'beginner|intermediate|advanced',
  isCompleted: false,
  estimatedTime: 'X-Y weeks',
  links: [
    { title: 'Resource Name', url: 'https://resource-url.com' },
    { title: 'Another Resource', url: 'https://another-resource.com' }
  ],
  subtopics: ['Subtopic 1', 'Subtopic 2', 'Subtopic 3', 'Subtopic 4'],
  prerequisites: ['id-of-prerequisite-topic', 'another-prerequisite-id']
}

Important requirements:
1. Generate 6-8 topics that provide a comprehensive learning path
2. Ensure a logical progression from fundamentals to advanced concepts
3. Include proper prerequisites relationships between topics
4. Provide accurate, up-to-date learning resources (links)
5. Estimate realistic timeframes for each topic
6. Use kebab-case for all IDs (e.g., 'topic-name')
7. Maintain beginner, intermediate, and advanced level designations appropriately
8. Include 3-5 high-quality, specific resources for each topic
9. Return ONLY the JSON array with no additional text or explanation

The output MUST be a valid JavaScript array that can be directly assigned to a variable.`;

        const response = await Gemini(prompt);

        let parsedResponse;
        try {
          parsedResponse = JSON.parse(response);
        } catch (parseError) {
          const jsonMatch = response.match(/\[\s*\{[\s\S]*\}\s*\]/);
          if (jsonMatch) {
            parsedResponse = JSON.parse(jsonMatch[0]);
          } else {
            throw new Error("Failed to parse Gemini response as JSON");
          }
        }

        const enhancedData = parsedResponse.map((topic: RoadmapTopic) => ({
          ...topic,
          icon: getIconComponent(topic.id),
        }));

        setRoadmapData(enhancedData);

        if (enhancedData.length > 0) {
          setActiveTopicId(enhancedData[0].id);
        }
      } catch (err) {
        console.error("Error generating roadmap:", err);
        setError("Failed to generate roadmap. Please try again.");

        if (process.env.NODE_ENV === "development") {
          const sampleData: RoadmapTopic[] = [
            {
              id: "basics",
              title: "Programming Fundamentals",
              description: "Core programming concepts and algorithms",
              icon: getIconComponent("basics"),
              level: "beginner",
              isCompleted: false,
              estimatedTime: "4-6 weeks",
              links: [
                {
                  title: "Python Tutorial",
                  url: "https://docs.python.org/3/tutorial/",
                },
                {
                  title: "JavaScript Guide",
                  url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide",
                },
              ],
              subtopics: [
                "Data Structures",
                "Algorithms",
                "OOP Concepts",
                "Design Patterns",
              ],
              prerequisites: [],
            },
          ];
          setRoadmapData(sampleData);
          setActiveTopicId(sampleData[0].id);
        }
      } finally {
        setLoading(false);
      }
    };

    generateRoadmap();
  }, [title, description, level, duration]);

  const activeTopic = roadmapData.find((topic) => topic.id === activeTopicId);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
              <p className="mt-1 text-sm text-gray-500">{description}</p>
            </div>
            <div className="mt-4 md:mt-0 flex space-x-4 text-sm">
              <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800">
                Level: {level}
              </span>
              <span className="px-3 py-1 rounded-full bg-green-100 text-green-800">
                Duration: ~{duration} weeks
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 p-4 rounded-md">
            <p className="text-red-700">{error}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Topics List */}
            <div className="lg:col-span-1">
              <div className="bg-white shadow rounded-lg overflow-hidden">
                <div className="px-4 py-5 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">
                    Learning Path
                  </h3>
                </div>
                <ul className="divide-y divide-gray-200">
                  {roadmapData.map((topic) => (
                    <li
                      key={topic.id}
                      className={`px-4 py-4 hover:bg-gray-50 cursor-pointer ${
                        activeTopicId === topic.id ? "bg-blue-50" : ""
                      }`}
                      onClick={() => setActiveTopicId(topic.id)}
                    >
                      <div className="flex items-center">
                        <div
                          className={`flex-shrink-0 p-2 rounded-md ${
                            topic.level === "beginner"
                              ? "bg-green-100 text-green-600"
                              : topic.level === "intermediate"
                              ? "bg-yellow-100 text-yellow-600"
                              : "bg-red-100 text-red-600"
                          }`}
                        >
                          {topic.icon}
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900">
                            {topic.title}
                          </p>
                          <p className="text-xs text-gray-500">
                            {topic.estimatedTime}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Topic Details */}
            <div className="lg:col-span-2">
              {activeTopic ? (
                <div className="bg-white shadow rounded-lg overflow-hidden">
                  <div className="px-4 py-5 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-bold text-gray-900">
                        {activeTopic.title}
                      </h2>
                      <span
                        className={`px-3 py-1 text-xs rounded-full ${
                          activeTopic.level === "beginner"
                            ? "bg-green-100 text-green-800"
                            : activeTopic.level === "intermediate"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {activeTopic.level.charAt(0).toUpperCase() +
                          activeTopic.level.slice(1)}
                      </span>
                    </div>
                  </div>

                  <div className="px-4 py-5">
                    <p className="text-gray-700">{activeTopic.description}</p>

                    {/* Prerequisites */}
                    {activeTopic.prerequisites.length > 0 && (
                      <div className="mt-6">
                        <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                          Prerequisites
                        </h3>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {activeTopic.prerequisites.map((prereqId) => {
                            const prereq = roadmapData.find(
                              (t) => t.id === prereqId
                            );
                            return prereq ? (
                              <span
                                key={prereqId}
                                className="px-3 py-1 text-xs bg-gray-100 text-gray-800 rounded-full cursor-pointer hover:bg-gray-200"
                                onClick={() => setActiveTopicId(prereqId)}
                              >
                                {prereq.title}
                              </span>
                            ) : null;
                          })}
                        </div>
                      </div>
                    )}

                    {/* Subtopics */}
                    <div className="mt-6">
                      <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                        What You'll Learn
                      </h3>
                      <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2">
                        {activeTopic.subtopics.map((subtopic, idx) => (
                          <div key={idx} className="flex items-center">
                            <div className="flex-shrink-0 h-5 w-5 text-blue-500">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                            <p className="ml-2 text-sm text-gray-700">
                              {subtopic}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Resources */}
                    <div className="mt-6">
                      <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                        Resources
                      </h3>
                      <div className="mt-2 space-y-2">
                        {activeTopic.links.map((link, idx) => (
                          <a
                            key={idx}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block p-3 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors"
                          >
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-5 w-5 text-blue-500">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                                  <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 100-2H5z" />
                                </svg>
                              </div>
                              <p className="ml-2 text-sm text-gray-700">
                                {link.title}
                              </p>
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>

                    {/* Estimated Time */}
                    <div className="mt-6 bg-blue-50 p-4 rounded-md">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <svg
                            className="h-5 w-5 text-blue-400"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <div className="ml-3">
                          <h3 className="text-sm font-medium text-blue-800">
                            Estimated Time
                          </h3>
                          <div className="mt-1 text-sm text-blue-700">
                            <p>
                              This section typically takes{" "}
                              {activeTopic.estimatedTime} to complete.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white shadow rounded-lg p-6">
                  <p className="text-gray-500">
                    Select a topic to view details
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
