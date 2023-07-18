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
    const message = ref("");
    const current_guess = ref({ text: "", score: 0 });

    function guess() {
      input_sentence.value = input_sentence.value.trim();
      if (input_sentence.value == "") {
        message.value = "Please enter a sentence!";
        return;
      }
      for (const guessed of guesses.value) {
        if (guessed.text == input_sentence.value) {
          message.value = "You already guessed that sentence!";
          return;
        }
      }

      $.ajax({
        type: "POST",
        url: "http://localhost:5001",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify({ text: input_sentence.value }),
        success: function (data) {
          message.value = "";

          if (current_guess.value != "") {
            guesses.value.push(current_guess.value);
            guesses.value.sort((a, b) => b.score - a.score);
          }

          current_guess.value = { text: input_sentence.value, score: data.score };

          localStorage.setItem("guesses", JSON.stringify([...guesses.value, current_guess.value].sort((a, b) => b.score - a.score)));
        },
      });
    }

    return {
      guesses,
      input_sentence,
      guess,
      message,
      current_guess,
    };
  },
});

app.mount("#app");
