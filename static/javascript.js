const submit = document.querySelector("#submit");

submit.addEventListener("click", async (event) => {
  event.preventDefault(); // to stopp from refreshing the page
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;

  const result = await fetch("api/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(username, password),
  }).then((res) => {
    res.json;
  });
});
