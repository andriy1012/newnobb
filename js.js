    const OPENROUTER_API_KEY = "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"; // TODO: ganti dengan kunci Anda
    const MODEL_ID = "deepseek/deepseek-chat-v3-0324:free";
    const ENDPOINT = "https://openrouter.ai/api/v1/chat/completions";

    const chatEl = document.getElementById("chat");
    const inputEl = document.getElementById("input");
    const sendBtn = document.getElementById("send");
    const clearBtn = document.getElementById("clear");

    let conversation = [];

    const scrollBottom = () => requestAnimationFrame(() => {
      chatEl.scrollTop = chatEl.scrollHeight;
    });

    const addMessage = (role, content) => {
      const div = document.createElement("div");
      div.className = `msg ${role}`;
      div.textContent = content;
      chatEl.appendChild(div);
      scrollBottom();
    };

    const typingIndicator = () => {
      const dot = document.createElement("div");
      dot.className = "msg assistant";
      dot.textContent = "…";
      chatEl.appendChild(dot);
      scrollBottom();
      return () => dot.remove();
    };

    async function askAI(prompt) {
      conversation.push({ role: "user", content: prompt });
      const removeTyping = typingIndicator();
      try {
        const response = await fetch(ENDPOINT, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
          },
          body: JSON.stringify({
            model: MODEL_ID,
            messages: conversation,
            temperature: 0.7,
            max_tokens: 512,
          }),
        });

        if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
        const data = await response.json();
        const reply = data.choices[0].message.content;
        conversation.push({ role: "assistant", content: reply });
        removeTyping();
        addMessage("assistant", reply);
      } catch (err) {
        removeTyping();
        addMessage("assistant", `⚠️ Error: ${err}`);
      }
    }

    sendBtn.addEventListener("click", () => {
      const prompt = inputEl.value.trim();
      if (!prompt) return;
      addMessage("user", prompt);
      inputEl.value = "";
      askAI(prompt);
    });

    inputEl.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        sendBtn.click();
      }
    });

    clearBtn.addEventListener("click", () => {
      chatEl.innerHTML = "";
      conversation = [];
      inputEl.focus();
    });
    document.addEventListener('contextmenu', (e) => e.preventDefault());
    document.getElementById('report').addEventListener('click', function() {
       window.location.href = "https://wa.link/whzpkc";
     });
