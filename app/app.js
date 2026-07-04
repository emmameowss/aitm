const chat = document.getElementById("chatpart");
const textInput = document.getElementById("textInput");
const form = document.getElementById("form");

// system prompt to be changed
let messages = [{ role: "system", content: "You are an assistant." }];

function addBubble(text, who) {
  const div = document.createElement("div");
  div.className = "bubble " + who;
  div.textContent = text;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;
  input.value = "";
  addBubble(text, "user");
  messages.push({ role: "user", content: text });
  addBubble("...", "bot-loading");

  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages }),
    });
    const data = await res.json();
    document.querySelector(".bot-loading")?.remove();

    const reply = data.choices?.[0]?.message?.content ?? "no reply";
    addBubble(reply, "bot");
    messages.push({ role: "assistant", content: reply });
  } catch (err) {
    document.querySelector(".bot-loading")?.remove();
    addBubble("error: " + err.message, "bot");
  }
});
