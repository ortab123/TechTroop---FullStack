$(document).ready(function () {
  $("#searchBtn").on("click", function () {
    fetchGiphy();
  });
});

function fetchGiphy(limit = 1) {
  const inputValue = $("#searchTerm").val();
  const apiKey = "";
  const url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${encodeURIComponent(inputValue)}&limit=${limit}`;

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      if (!data.data || data.data.length === 0) {
        throw new Error("No GIFs found");
      }

      document.getElementById("gifResults").innerHTML = "";

      data.data.forEach((gif) => {
        const embedUrl = gif.embed_url;

        const iframe = document.createElement("iframe");
        iframe.src = embedUrl;
        iframe.width = 480;
        iframe.height = 360;
        iframe.frameBorder = 0;

        document.getElementById("gifResults").appendChild(iframe);
      });
    })
    .catch((err) => console.error("Error fetching GIF:", err));
}
