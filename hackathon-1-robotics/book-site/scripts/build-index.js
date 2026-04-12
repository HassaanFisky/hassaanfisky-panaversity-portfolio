const fs = require("fs");
const path = require("path");
const glob = require("glob");
const matter = require("gray-matter");

const contentDir = path.join(__dirname, "../docs");
const outputControlFile = path.join(__dirname, "../static/chat-index.json");

// Helper to strip markdown (simplified)
function stripMarkdown(md) {
  if (!md) return "";
  return (
    md
      // Remove headers
      .replace(/^#{1,6}\s+(.*)$/gm, "$1")
      // Remove bold/italic
      .replace(/(\*\*|__)(.*?)\1/g, "$2")
      .replace(/(\*|_)(.*?)\1/g, "$2")
      // Remove links
      .replace(/\[([^\]]+)\]\([^\)]+\)/g, "$1")
      // Remove code blocks
      .replace(/```[\s\S]*?```/g, "")
      // Remove inline code
      .replace(/`([^`]+)`/g, "$1")
      // Remove blockquotes
      .replace(/^\s*>\s+/gm, "")
      // Remove images
      .replace(/!\[.*?\]\(.*?\)/g, "")
      // Clean up whitespace
      .replace(/\s+/g, " ")
      .trim()
  );
}

function buildIndex() {
  console.log("Building Chat Index...");
  const files = glob.sync("**/*.md", {
    cwd: contentDir,
    ignore: ["**/archive/**"],
  });

  const documents = [];
  let idCounter = 0;

  files.forEach((file) => {
    const fullPath = path.join(contentDir, file);
    const fileContent = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContent);

    // Skip if no title
    if (!data.title) return;

    // Split by sections (headers) roughly to make retrieval more granular
    // We'll use a simple regex to split by # or ##
    // Actually, let's just chunk by paragraphs for simplicity and better context
    // Or just store the whole chapter with subsections?
    // For a grounded chatbot, we want granular passages.

    // Strategy: Split by "## " (H2)
    const sections = content.split(/^##\s+/gm);

    // The first part is the intro (H1 usually)
    let currentSectionTitle = data.title; // Default header

    sections.forEach((sectionContent, index) => {
      let textToProcess = sectionContent;
      let sectionTitle = currentSectionTitle;

      if (index > 0) {
        // Extract the headline from the first line
        const firstLineEnd = sectionContent.indexOf("\n");
        if (firstLineEnd > -1) {
          sectionTitle = sectionContent.substring(0, firstLineEnd).trim();
          textToProcess = sectionContent.substring(firstLineEnd);
        } else {
          sectionTitle = sectionContent.trim();
          textToProcess = "";
        }
      }

      const plainText = stripMarkdown(textToProcess);
      if (plainText.length < 50) return; // Skip empty/short sections

      // Construct URL
      // Assuming file path 'module-01/01-intro.md' -> '/docs/module-01/intro'
      // But Docusaurus generates nice URLs. We'll try to guess or just use file path.
      // We'll clean the filename to be slug-like
      const cleanPath = file.replace(/\\/g, "/").replace(/\.md$/, "");
      // Remove ordering numbers if needed? 01-intro -> intro?
      // Docusaurus default: uses filename.
      const url = `/docs/${cleanPath}`;

      documents.push({
        id: idCounter++,
        title: data.title,
        section: sectionTitle,
        text: plainText,
        url: url,
        module: cleanPath.split("/")[0],
      });
    });
  });

  fs.writeFileSync(outputControlFile, JSON.stringify(documents, null, 2));
  console.log(
    `Index built with ${documents.length} passages. Saved to static/chat-index.json`
  );
}

buildIndex();
