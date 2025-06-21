import fs from "fs";
import path from "path";
import React from "react";

// Function to read the changelog
async function getChangelog() {
  try {
    const changelogPath = path.join(process.cwd(), "CHANGELOG.md");
    const changelogContent = fs.readFileSync(changelogPath, "utf8");
    return changelogContent;
  } catch (error) {
    console.error("Error reading changelog:", error);
    return "Changelog not found";
  }
}

// Function to convert markdown to JSX-friendly format
function parseChangelog(content: string) {
  const lines = content.split("\n");
  const sections: React.ReactElement[] = [];
  let currentSection: React.ReactElement[] = [];
  let currentVersion = "";
  let currentType = "";

  lines.forEach((line, index) => {
    if (line.startsWith("# ")) {
      // Main title
      if (currentSection.length > 0) {
        sections.push(<div key={`section-${index}`}>{currentSection}</div>);
        currentSection = [];
      }
      currentSection.push(
        <h1 key={`title-${index}`} className="text-3xl font-bold mb-6">
          {line.replace("# ", "")}
        </h1>
      );
    } else if (line.startsWith("## ")) {
      // Version
      if (currentSection.length > 0) {
        sections.push(<div key={`section-${index}`}>{currentSection}</div>);
        currentSection = [];
      }
      currentVersion = line.replace("## ", "");
      currentSection.push(
        <h2
          key={`version-${index}`}
          className="text-2xl font-semibold mt-8 mb-4 text-blue-600"
        >
          {currentVersion}
        </h2>
      );
    } else if (line.startsWith("### ")) {
      // Change type
      currentType = line.replace("### ", "");
      currentSection.push(
        <h3
          key={`type-${index}`}
          className="text-xl font-medium mt-4 mb-2 text-gray-700"
        >
          {currentType}
        </h3>
      );
    } else if (line.startsWith("- ")) {
      // Change item
      const changeText = line.replace("- ", "");
      currentSection.push(
        <li key={`change-${index}`} className="ml-4 mb-1 text-gray-600">
          {changeText}
        </li>
      );
    } else if (line.trim() === "") {
      // Empty line - add spacing
      if (currentSection.length > 0) {
        currentSection.push(<div key={`spacing-${index}`} className="mb-2" />);
      }
    }
  });

  // Add the last section
  if (currentSection.length > 0) {
    sections.push(<div key="last-section">{currentSection}</div>);
  }

  return sections;
}

export default async function ChangeLogsPage() {
  const changelogContent = await getChangelog();
  const changelogSections = parseChangelog(changelogContent);

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="prose prose-lg max-w-none">{changelogSections}</div>
    </div>
  );
}
