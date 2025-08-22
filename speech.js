// Get references to the text area and voice selector from HTML
const textInput = document.getElementById('textInput');
const voiceSelect = document.getElementById('voiceSelect');

// This will store all available voices provided by the browser
let voices = [];

/**
 * Load all available voices into the dropdown
 */
function loadVoices() {
  voices = speechSynthesis.getVoices();

  // If voices still not loaded, try again shortly (for Safari/iOS)
  if (!voices.length) {
    setTimeout(loadVoices, 250);
    return;
  }

  // Clear existing options
  voiceSelect.innerHTML = '';

  voices.forEach((voice, i) => {
    const option = document.createElement('option');
    option.value = i;
    option.textContent = `${voice.name} (${voice.lang})${voice.default ? " • default" : ""}`;
    voiceSelect.appendChild(option);
  });
}

// Initial call
loadVoices();

// Some browsers fire event when voices finish loading
if (typeof speechSynthesis.onvoiceschanged !== "undefined") {
  speechSynthesis.onvoiceschanged = loadVoices;
}

/**
 * Speak the text entered in the textarea
 */
function speakText() {
  const text = textInput.value.trim();

  if (!text) {
    alert("Please enter some text!");
    return;
  }

  // Stop any ongoing speech before starting new
  speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);

  // Apply selected voice
  const selectedVoice = voices[voiceSelect.value];
  if (selectedVoice) {
    utterance.voice = selectedVoice;
  }

  // Normal pitch & rate (safe for all browsers)
  utterance.rate = 1;
  utterance.pitch = 1;

  // Speak
  speechSynthesis.speak(utterance);
}

/**
 * Stop speaking immediately
 */
function stopSpeaking() {
  speechSynthesis.cancel();
}
