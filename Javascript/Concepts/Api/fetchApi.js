fetch("https://jsonplaceholder.typicode.com/posts/1")
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  })
  .finally(() => {
    console.log("Fetch attempt finished");
  });
