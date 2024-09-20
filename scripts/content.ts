function getReadingTimeFromText(text) {

  const wordMatchRegExp = /[^\s]+/g; // Regular expression
  const words = text.matchAll(wordMatchRegExp);
  // matchAll returns an iterator, convert to array to get word count
  const wordCount = [...words].length;
  const readingTime = Math.round(wordCount / 200);

  return readingTime
}

function createDataBadge(document, readingTime) {

  const badge = document.createElement("p");

  badge.textContent = `⏱️ ${readingTime} min read`;

  // Style for badge
  badge.style.backgroundColor = "#f0f0f0";  // Light gray background
  badge.style.padding = "5px 10px";         // Padding around the text
  badge.style.borderRadius = "10px";        // Rounded corners
  badge.style.fontWeight = "bold";          // Bold text
  badge.style.color = "#333";               // Darker text color for better contrast
  badge.style.display = "inline-block";     // Make it an inline-block for better spacing
  badge.style.margin = "5px 0";             // Some margin to space it from other content

  return badge

}

const article = document.getElementById("mw-content-text");

if (article) {
  const reflist = article.querySelector('.reflist');
  if (reflist) {
    // ------------------- creating a toggle button for citations

    const citations = document.getElementById("Citations");
    const citationsToggleButton = document.createElement("button");
    citations.insertAdjacentElement("afterend", citationsToggleButton);

    reflist.style.display = 'none';
    citationsToggleButton.textContent = "Show references";

    citationsToggleButton.addEventListener("click", () => {
      if (reflist.style.display === "none") {
        reflist.style.display = "block";
        citationsToggleButton.textContent = "Hide References"
      } else {
        reflist.style.display = "none";
        citationsToggleButton.textContent = "Show references"
      }
    })
  }

  // Clone the article's content to avoid modifying the original
  const articleClone = article.cloneNode(true);

  // Remove the references from the cloned article
  const references = articleClone.querySelector('.reflist');
  if (references) {
    references.remove();
  }

  const text = articleClone.textContent;
  const readingTime = getReadingTimeFromText(text);
  const badge = createDataBadge(document, readingTime);
  const heading = document.getElementById("firstHeading");
  heading.insertAdjacentElement("afterend", badge);
}