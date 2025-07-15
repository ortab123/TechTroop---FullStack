function safeJsonParse(jsonString) {
  try {
    const parsed = JSON.parse(jsonString);
    return parsed;
  } catch (error) {
    return `Invalid JSON format: ${error.message}`;
  }
}

console.log(safeJsonParse('{"name": "John"}'));
console.log(safeJsonParse("invalid json"));
