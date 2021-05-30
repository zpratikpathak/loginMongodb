const form = document.getElementById("login");
/*
form.addEventListener("submit", registerUser);

async function registerUser(event) {
  event.preventDefault(); // to stopp from refreshing the page
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;
  //console.log(username, password);
  const result = await fetch("api/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  }).then((res) => {
    res.json;
  });
}
*/
form.addEventListener("submit", async (event) => {
  event.preventDefault(); // to stopp from refreshing the page
  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;
  //console.log(username, password);

  const result = await fetch("api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  }).then((res) => res.json());

  console.log(result);
  if (result.status === "ok") {
    console.log("Got the tokens: ", result.data);
    localStorage.setItem("token", result.data);
  } else {
    alert(result.error);
  }
});
