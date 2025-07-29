function fetchBookByISBN_jq(isbn) {
  const url = `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`;

  return $.ajax({
    url: url,
    method: "GET",
    dataType: "json",
  })
    .then((data) => {
      if (data.totalItems === 0) {
        throw new Error("No book for this ISBN.");
      }
      return data.items[0];
    })
    .catch((err) => {
      console.error("AJAX request failed:", err);
    });
}

// function fetchBookByISBN(isbn) {
//   const url = `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`;

//   return fetch(url)
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
//       return response.json();
//     })
//     .then((data) => {
//       if (data.totalItems === 0) {
//         throw new Error("No book for this ISBN.");
//       }
//       return data.items[0];
//     })
//     .catch((err) => {
//       console.error("Fetch failed:", err.message);
//     });
// }

fetchBookByISBN_jq("9780307417138").then((book) => {
  if (book) {
    console.log("Title:", book.volumeInfo.title);
    console.log("Authors:", book.volumeInfo.authors);
    console.log("Description:", book.volumeInfo.description);
  }
});
