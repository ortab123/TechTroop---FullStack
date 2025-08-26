const changeColor = function (div) {
  div.style.backgroundColor = "#3498db";
};

const fetchBookData = function () {
  let input = $("#book-input").val();

  $.get(`books/${input}`, function (bookData) {
    $("body").append(`<div>${bookData.title} - ${bookData.author}`);
  });
};
