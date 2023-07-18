var guesses = [];

import { createApp, ref } from "vue";

const app = createApp({
  setup() {
    const stored_day = localStorage.getItem("day");
    if (stored_day && stored_day != day) {
      localStorage.setItem("day", day);
      localStorage.setItem("guesses", JSON.stringify([]));
    }
    const guesses = ref(JSON.parse(localStorage.getItem("guesses")) || []);

    const input_sentence = ref("");
    function guess() {
      $.ajax({
        type: "POST",
        url: "http://localhost:5001",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify({ text: input_sentence.value }),
        success: function (data) {
          guesses.value.push({ text: input_sentence.value, score: data.score });
          localStorage.setItem("guesses", JSON.stringify(guesses.value));
        },
      });
    }

    return {
      guesses,
      input_sentence,
      guess,
    };
  },
});

app.mount("#app");
