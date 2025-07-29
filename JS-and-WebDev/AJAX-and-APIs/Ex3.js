function fetchBooks_jq(queryType, queryValue) {
  const query = `${queryType}:${encodeURIComponent(queryValue)}`;
  const url = `https://www.googleapis.com/books/v1/volumes?q=${query}`;

  return $.ajax({
    url: url,
    method: "GET",
    dataType: "json",
  })
    .then((data) => {
      if (!data.items || data.totalItems === 0) {
        throw new Error("No books found.");
      }

      data.items.forEach((item, index) => {
        const info = item.volumeInfo;
        const title = info.title || "No title";
        const authors = info.authors
          ? info.authors.join(", ")
          : "Unknown author";

        const isbn = info.industryIdentifiers
          ? info.industryIdentifiers
              .map((id) => `${id.type}: ${id.identifier}`)
              .join(", ")
          : "No ISBN";

        console.log(`Book ${index + 1}:`);
        console.log(`Title: ${title}`);
        console.log(`Author(s): ${authors}`);
        console.log(`ISBN(s): ${isbn}`);
        console.log("---");
      });
    })
    .catch((err) => {
      console.error("AJAX request failed:", err);
    });
}

// function fetchBook(queryType, queryValue) {
//   const query = `${queryType}:${encodeURIComponent(queryValue)}`;
//   const url = `https://www.googleapis.com/books/v1/volumes?q=${query}`;

//   return fetch(url)
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
//       return response.json();
//     })
//     .then((data) => {
//       if (!data.items || data.totalItems === 0) {
//         throw new Error("No books found.");
//       }

//       data.items.forEach((item, index) => {
//         const info = item.volumeInfo;
//         const title = info.title || "No title";
//         const authors = info.authors
//           ? info.authors.join(", ")
//           : "Unknown author";

//         const isbn = info.industryIdentifiers
//           ? info.industryIdentifiers
//               .map((id) => `${id.type}: ${id.identifier}`)
//               .join(", ")
//           : "No ISBN";

//         console.log(`Book ${index + 1}:`);
//         console.log(`Title: ${title}`);
//         console.log(`Author(s): ${authors}`);
//         console.log(`ISBN(s): ${isbn}`);
//         console.log("---");
//       });
//     })
//     .catch((err) => {
//       console.error("Fetch failed:", err.message);
//     });
// }

fetchBooks_jq("title", "The Alchemist");
fetchBooks_jq("isbn", 9780307417138);
