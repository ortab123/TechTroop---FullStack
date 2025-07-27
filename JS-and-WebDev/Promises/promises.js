getRandomWord((randomWord) => {
  console.log(`Random Word: ${randomWord}`);

  getSynonyms(randomWord, (synonyms) => {
    if (!synonyms) {
      console.log("No synonyms found.");
      return;
    }

    console.log(`Synonyms of ${randomWord}:`, synonyms);
    let synonym = synonyms[0]; // Use the first synonym

    getSentiment(synonym, (sentiment) => {
      let sentimentDescription = getSentimentDescription(sentiment);
      console.log(
        `Sentiment of "${synonym}" (Synonym of ${randomWord}): ${sentimentDescription}`
      );
    });
  });
});
