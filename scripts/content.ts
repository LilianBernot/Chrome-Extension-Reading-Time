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

function createToggleButton(document, referencesTitle, referencesElements) {
  const referencesToggleButton = document.createElement("button");
  referencesTitle.insertAdjacentElement("afterend", referencesToggleButton);

  // Style the button to match the badge design, but with additional button styling
  referencesToggleButton.style.backgroundColor = "#4CAF50";    // A pleasant green background
  referencesToggleButton.style.padding = "8px 15px";           // Padding to make the button larger
  referencesToggleButton.style.borderRadius = "20px";          // Rounded corners for a "chip" look
  referencesToggleButton.style.fontWeight = "bold";            // Bold text for emphasis
  referencesToggleButton.style.color = "#fff";                 // White text for contrast
  referencesToggleButton.style.border = "none";                // Remove the default button border
  referencesToggleButton.style.cursor = "pointer";             // Make the cursor a pointer to show it's clickable
  referencesToggleButton.style.display = "inline-block";       // Make it behave like a block element inline
  referencesToggleButton.style.margin = "5px 0";               // Add margin for spacing
  referencesToggleButton.style.boxShadow = "0px 2px 5px rgba(0, 0, 0, 0.2)"; // Subtle shadow for depth

  // Add a hover effect
  referencesToggleButton.addEventListener("mouseenter", () => {
    referencesToggleButton.style.backgroundColor = "#45a049"; // Slightly darker green on hover
  });
  referencesToggleButton.addEventListener("mouseleave", () => {
    referencesToggleButton.style.backgroundColor = "#4CAF50"; // Revert to original green color
  });

  addToggleButtonEventListener(referencesToggleButton, referencesElements)
}

function addToggleButtonEventListener(referencesToggleButton, referencesElements) {
  changeElementsDisplay(referencesElements, "none");
  referencesToggleButton.textContent = "Show references";

  referencesToggleButton.addEventListener("click", () => {
    if (referencesElements[0].style.display === "none") {
      changeElementsDisplay(referencesElements, "block");
      referencesToggleButton.textContent = "Hide References"
    } else {
      changeElementsDisplay(referencesElements, "none");
      referencesToggleButton.textContent = "Show references"
    }
  })
}

/**
* Changes the display style of a list of elements.
*/
function changeElementsDisplay(elements, display) {
  elements.forEach((item) => {
    item.style.display = display;
  })
}


const article = document.getElementById("mw-content-text");

if (article) {

  // ----------------------------  Toggle button for citations  ----------------------------

  const referencesTitle = document.getElementById("References");
  const reflist = article.querySelector('.reflist');

  if (referencesTitle && reflist) {

    const referencesElements = [reflist];

    const citationsTitle = document.getElementById("Citations");
    if (citationsTitle) {
      // We are in the case that references is separated in Citations and Cited_sources
      const citedSourcesTitle = document.getElementById("Cited_sources");
      // the title is in a div -> we have to get the parent before taking next elements
      const citedSources = citedSourcesTitle?.parentElement?.nextElementSibling;

      referencesElements.push(citationsTitle, citedSourcesTitle, citedSources)
    }

    createToggleButton(document, referencesTitle, referencesElements);
  }

  // ----------------------------  Count words  ----------------------------


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