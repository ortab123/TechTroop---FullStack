// $.get(
//   "https://www.googleapis.com/books/v1/volumes?q=title:name%20of%20the%20wind",
//   function (result) {
//     console.log(result.items[0].volumeInfo.description);
//   }
// );

$.get("https://jsonplaceholder.typicode.com/users", function (users) {
  catchPhrase = users[users.length - 1].company.catchPhrase;
  console.log(`${catchPhrase}`); //"Centralized empowering task-force"
});
