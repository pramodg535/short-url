const BASE_URL = "https://short-url-u567.onrender.com"; // use your Render URL

/* Shorten URL */
async function shortenURL() {
  const input = document.getElementById("urlInput");
  const url = input.value.trim();
  const resultDiv = document.getElementById("result");
  const analyticsDiv = document.getElementById("analytics");

  resultDiv.innerText = "";
  analyticsDiv.innerText = "";

  try {
    const res = await fetch(`${BACKEND_URL}/url`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    });

    const data = await res.json();

    //  ERROR from backend
    if (!res.ok) {
      input.value = "";
      input.placeholder = data.msg || "Invalid URL";
      input.classList.add("error");
      return;
    }

    // SUCCESS
    input.classList.remove("error");
    input.value = "";

    const shortUrl = `${BACKEND_URL}/${data.id}`;

    resultDiv.innerHTML = `
      <strong>Short URL:</strong><br/>
      <a href="${shortUrl}" target="_blank">${shortUrl}</a>
    `;

  } catch (err) {
    input.value = "";
    input.placeholder = "Server unavailable";
    input.classList.add("error");
  }
}


/* Get Analytics */
async function getAnalytics() {
  const shortId = document.getElementById("shortIdInput").value;
  const analyticsDiv = document.getElementById("analytics");

  if (!shortId) {
    analyticsDiv.innerText = "Please enter a short ID";
    return;
  }

  analyticsDiv.innerText = "Fetching analytics...";

  try {
    const res = await fetch(
      `${BACKEND_URL}/url/analytics/${shortId}`
    );
    const data = await res.json();

    if (!res.ok) {
      analyticsDiv.innerText = data.msg || "Invalid short ID";
      return;
    }

    const createdDate =
      data.createdDate ||
      data.createdAt?.split("T")[0] ||
      data.createdOn ||
      "N/A";

    analyticsDiv.innerHTML = `
      <strong>Total Visits:</strong> ${data.totalClicks}<br/>
      <strong>Created Date:</strong> ${createdDate}
    `;
  } catch {
    analyticsDiv.innerText = "Server error";
  }
}

document.getElementById("urlInput").addEventListener("input", function () {
  this.classList.remove("error");
});

