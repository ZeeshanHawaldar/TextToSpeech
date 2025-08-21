// Get references to the text area and voice selector from HTML
const textInput = document.getElementById('textInput');
const voiceSelect = document.getElementById('voiceSelect');

// This will store all available voices provided by the browser
let voices = [];

/**
 * Load all available voices into the dropdown
 */
function loadVoices() {
  // Get the voices from the Web Speech API
  voices = speechSynthesis.getVoices();

  // Clear old options from the dropdown
  voiceSelect.innerHTML = '';

  // Loop through each voice and create an <option> for the dropdown
  voices.forEach((voice, i) => {
    const option = document.createElement('option');
    option.value = i; // store index so we know which voice was chosen
    option.textContent = `${voice.name} (${voice.lang})`; // show voice name + language
    voiceSelect.appendChild(option); // add to dropdown
  });
}

// Some browsers load voices asynchronously,
// so we call loadVoices() again when voices are ready
speechSynthesis.onvoiceschanged = loadVoices;

/**
 * Speak the text entered in the textarea
 */
function speakText() {
  const text = textInput.value; // get the text user typed

  // If no text entered, show an alert and exit function
  if (!text.trim()) {
    alert("Please enter some text!");
    return;
  }

  // Create a speech request with the typed text
  const utterance = new SpeechSynthesisUtterance(text);

  // Get the selected voice from the dropdown
  const selectedVoice = voices[voiceSelect.value];
  if (selectedVoice) {
    utterance.voice = selectedVoice; // apply chosen voice
  }

  // Stop any currently playing speech before starting new one
  speechSynthesis.cancel();

  // Start speaking the text
  speechSynthesis.speak(utterance);
}

/**
 * Stop any speech immediately
 */
function stop() {
  speechSynthesis.cancel(); // cancels ongoing speech
}
