var guesses = [];

import { createApp, ref } from "vue";

const app = createApp({
  setup() {
    const guesses = ref([]);
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
