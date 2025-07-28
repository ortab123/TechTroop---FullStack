function fetchBook(queryType, queryValue) {
  const query = `${queryType}:${encodeURIComponent(queryValue)}`;
  const url = `https://www.googleapis.com/books/v1/volumes?q=${query}`;
  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      if (data.totalItems === 0) {
        throw new Error("No book for this ISBN.");
      }
      return data.items[0];
    })
    .catch((err) => {
      console.error("Fetch failed:", err.message);
    });
}

fetchBook("isbn", 9789814561778).then((book) => {
  if (book) {
    console.log("Title:", book.volumeInfo.title);
    console.log("Authors:", book.volumeInfo.authors);
    console.log("Description:", book.volumeInfo.description);
  }
});

fetchBook("title", "How to Win Friends and Influence People").then((book) => {
  if (book) {
    console.log("Title:", book.volumeInfo.title);
    console.log("Authors:", book.volumeInfo.authors);
    console.log("Description:", book.volumeInfo.description);
  }
});
