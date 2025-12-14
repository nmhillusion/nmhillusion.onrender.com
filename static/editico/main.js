(async function main() {
  const editor = document.querySelector("#editor");
  const messagePanel = document.querySelector("#message-panel");

  const btnReload = document.getElementById("btn-reload");
  btnReload.addEventListener("click", () => {
    const contentIdEl = document.querySelector("#content-id");
    
    if (!contentIdEl || !contentIdEl.value) {
      alert("Content ID not found. Cannot reload.");
      return;
    }

    window.location.href = `/editico/view/${contentIdEl.value}`;
  });

  const btnSave = document.getElementById("btn-save");
  btnSave.addEventListener("click", async () => {
    const data = editor.value;
    console.log("Saved data:", data);

    if (!data) {
      alert("Editor is empty. Nothing to save.");
      return;
    }

    fetch("/editico/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content: data }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Success:", data);
        messagePanel.textContent = "Content saved successfully! Data: " + JSON.stringify(data);
        alert("Content saved!");
      })
      .catch((error) => {
        console.error("Error:", error);
        messagePanel.textContent = "An error occurred while saving the content. Error: " + JSON.stringify(error);
        alert("An error occurred while saving the content.");
      });
  });
})();
