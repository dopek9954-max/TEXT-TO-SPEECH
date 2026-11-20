
// const $ = (id) => document.getElementById(id);

// let voices = [];

// function load() {
//     voices = speechSynthesis.getVoices();

//     $("voice").innerHTML = voices
//         .map((v, i) => `<option value="${i}">${v.name} (${v.lang})</option>`)
//         .join("");
// }

// speechSynthesis.onvoiceschanged = load;

// load();

// // Speak button
// $("speak").onclick = () => {

//     let message = $("text").value;

//     if (message.trim() === "") {
//         alert("Please type something first!");
//         return;
//     }

//     speechSynthesis.cancel();

//     const u = new SpeechSynthesisUtterance(message);

//     u.voice = voices[Number($("voice").value)] || null;

//     u.rate = Number($("rate").value);

//     speechSynthesis.speak(u);
// };

// // Stop button
// $("stop").onclick = () => {
//     speechSynthesis.cancel();
// };



// const $ = (id) => document.getElementById(id);

// let voices = [];

// // LOAD AVAILABLE VOICES

// function loadVoices() {
//     voices = speechSynthesis.getVoices();

//     $("voice").innerHTML = "";

//     voices.forEach((voice, index) => {
//         let option = document.createElement("option");

//         option.value = index;
//         option.textContent = `${voice.name} (${voice.lang})`;

//         $("voice").appendChild(option);
//     });
// }

// speechSynthesis.onvoiceschanged = loadVoices;
// loadVoices();


// // SPEED DISPLAY

// $("rate").addEventListener("input", () => {
//     $("speedValue").textContent =
//         Number($("rate").value).toFixed(1) + "x";
// });


// // TEXT TO SPEECH

// $("speak").addEventListener("click", () => {

//     let message = $("text").value.trim();

//     if (message === "") {
//         alert("Please type something first!");
//         return;
//     }

//     // Stop microphone before speaking
//     if (recognition && isListening) {
//         recognition.stop();
//     }

//     speechSynthesis.cancel();

//     let selectedLanguage = $("language").value;

//     let selectedVoice = voices.find(voice =>
//         voice.lang.toLowerCase() === selectedLanguage.toLowerCase()
//     );

//     if (!selectedVoice && voices.length > 0) {
//         selectedVoice = voices[Number($("voice").value)];
//     }

//     let speech = new SpeechSynthesisUtterance(message);

//     speech.lang = selectedLanguage;

//     if (selectedVoice) {
//         speech.voice = selectedVoice;
//     }

//     speech.rate = Number($("rate").value);

//     speech.onstart = () => {
//         $("status").textContent = "Speaking now...";
//     };

//     speech.onend = () => {
//         $("status").textContent = "Finished speaking!";
//     };

//     speech.onerror = () => {
//         $("status").textContent = "Speech error. Try another voice.";
//     };

//     $("status").textContent = "Preparing your voice...";

//     speechSynthesis.speak(speech);
// });


// // STOP SPEAKING

// $("stop").addEventListener("click", () => {
//     speechSynthesis.cancel();
//     $("status").textContent = "Speech stopped.";
// });


// // SPEECH TO TEXT (MICROPHONE)

// const SpeechRecognition =
//     window.SpeechRecognition ||
//     window.webkitSpeechRecognition;

// let recognition;
// let finalTranscript = "";
// let startingText = "";
// let isListening = false;


// if (SpeechRecognition) {

//     recognition = new SpeechRecognition();

//     recognition.continuous = true;
//     recognition.interimResults = true;


//     // START MICROPHONE

//     $("startMic").addEventListener("click", () => {

//         if (isListening) return;

//         speechSynthesis.cancel();

//         startingText = $("text").value;
//         finalTranscript = "";

//         recognition.lang = $("language").value;

//         try {
//             recognition.start();

//             isListening = true;

//             $("micStatus").textContent = "Listening... 🎙";
//         } catch (error) {
//             $("micStatus").textContent =
//                 "Could not start microphone. Try again.";
//         }

//     });


//     // DISPLAY SPOKEN WORDS

//     recognition.onresult = (event) => {

//         let interimTranscript = "";

//         for (let i = event.resultIndex; i < event.results.length; i++) {

//             let transcript = event.results[i][0].transcript;

//             if (event.results[i].isFinal) {
//                 finalTranscript += transcript + " ";
//             } else {
//                 interimTranscript += transcript;
//             }
//         }

//         $("text").value =
//             startingText +
//             (startingText ? " " : "") +
//             finalTranscript +
//             interimTranscript;
//     };


//     // STOP MICROPHONE

//     $("stopMic").addEventListener("click", () => {

//         if (isListening) {
//             recognition.stop();
//             $("micStatus").textContent = "Stopping recording...";
//         }

//     });


//     recognition.onend = () => {
//         isListening = false;
//         $("micStatus").textContent = "Microphone is off.";
//     };


//     recognition.onerror = (event) => {
//         isListening = false;

//         $("micStatus").textContent =
//             "Microphone error: " + event.error;
//     };


// } else {

//     $("micStatus").textContent =
//         "Speech recognition is not supported in this browser.";

// }












const $ = (id) => document.getElementById(id);

let voices = [];
let recognition;
let isListening = false;

let finalTranscript = "";
let startingText = "";


// =================================
// 1. LOAD AVAILABLE VOICES
// =================================

function loadVoices() {

    voices = speechSynthesis.getVoices();

    $("voice").innerHTML = "";

    voices.forEach((voice, index) => {

        let option = document.createElement("option");

        option.value = index;

        option.textContent =
            `${voice.name} (${voice.lang})`;

        $("voice").appendChild(option);

    });

}

speechSynthesis.onvoiceschanged = loadVoices;

loadVoices();


// =================================
// 2. SPEAKING SPEED
// =================================

$("rate").addEventListener("input", () => {

    $("speedValue").textContent =
        Number($("rate").value).toFixed(1) + "x";

});


// =================================
// 3. VOICE PITCH
// =================================

$("pitch").addEventListener("input", () => {

    $("pitchValue").textContent =
        Number($("pitch").value).toFixed(1) + "x";

});


// =================================
// 4. VOICE CHANGER STYLES
// =================================

$("voiceStyle").addEventListener("change", () => {

    let style = $("voiceStyle").value;

    if (style === "normal") {

        $("pitch").value = 1;
        $("rate").value = 1;

    }

    else if (style === "deep") {

        $("pitch").value = 0.5;
        $("rate").value = 0.85;

    }

    else if (style === "high") {

        $("pitch").value = 1.7;
        $("rate").value = 1.15;

    }

    else if (style === "robot") {

        $("pitch").value = 0.7;
        $("rate").value = 1.25;

    }

    else if (style === "funny") {

        $("pitch").value = 1.8;
        $("rate").value = 1.4;

    }

    // Update the numbers on the screen

    $("pitchValue").textContent =
        Number($("pitch").value).toFixed(1) + "x";

    $("speedValue").textContent =
        Number($("rate").value).toFixed(1) + "x";

});


// =================================
// 5. TEXT TO SPEECH
// =================================

$("speak").addEventListener("click", () => {

    let message = $("text").value.trim();

    if (message === "") {

        alert("Please type something first!");

        return;

    }

    // Stop microphone before speaking

    if (recognition && isListening) {
        recognition.stop();
    }

    speechSynthesis.cancel();

    let selectedLanguage = $("language").value;

    // Find a voice matching the selected language

    let matchingVoice = voices.find(voice => {

        return voice.lang.toLowerCase() ===
            selectedLanguage.toLowerCase();

    });

    // Get the voice selected manually

    let chosenVoice = voices[
        Number($("voice").value)
    ];

    // Use the manually selected voice only if
    // it matches the chosen language

    if (
        !matchingVoice &&
        chosenVoice &&
        chosenVoice.lang.toLowerCase().split("-")[0] ===
        selectedLanguage.toLowerCase().split("-")[0]
    ) {

        matchingVoice = chosenVoice;

    }

    let speech = new SpeechSynthesisUtterance(message);

    speech.lang = selectedLanguage;

    if (matchingVoice) {
        speech.voice = matchingVoice;
    }

    // Speaking speed

    speech.rate = Number($("rate").value);

    // Voice pitch

    speech.pitch = Number($("pitch").value);

    speech.onstart = () => {

        $("status").textContent = "Speaking now...";

    };

    speech.onend = () => {

        $("status").textContent = "Finished speaking!";

    };

    speech.onerror = () => {

        $("status").textContent =
            "Speech error. Try another available voice.";

    };

    $("status").textContent = "Preparing your voice...";

    speechSynthesis.speak(speech);

});


// =================================
// 6. STOP SPEAKING
// =================================

$("stop").addEventListener("click", () => {

    speechSynthesis.cancel();

    $("status").textContent = "Speech stopped.";

});


// =================================
// 7. SPEECH TO TEXT
// =================================

const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;


if (SpeechRecognition) {

    recognition = new SpeechRecognition();

    recognition.continuous = true;

    recognition.interimResults = true;


    // START MICROPHONE

    $("startMic").addEventListener("click", () => {

        if (isListening) return;

        speechSynthesis.cancel();

        startingText = $("text").value;

        finalTranscript = "";

        recognition.lang = $("language").value;

        try {

            recognition.start();

            isListening = true;

            $("micStatus").textContent =
                "Listening... 🎙";

        }

        catch (error) {

            $("micStatus").textContent =
                "Could not start microphone. Try again.";

        }

    });


    // SHOW SPOKEN WORDS

    recognition.onresult = (event) => {

        let interimTranscript = "";

        for (
            let i = event.resultIndex;
            i < event.results.length;
            i++
        ) {

            let transcript =
                event.results[i][0].transcript;

            if (event.results[i].isFinal) {

                finalTranscript += transcript + " ";

            }

            else {

                interimTranscript += transcript;

            }

        }

        $("text").value =
            startingText +
            (startingText ? " " : "") +
            finalTranscript +
            interimTranscript;

    };


    // STOP MICROPHONE

    $("stopMic").addEventListener("click", () => {

        if (isListening) {

            recognition.stop();

            $("micStatus").textContent =
                "Stopping recording...";

        }

    });


    recognition.onend = () => {

        isListening = false;

        $("micStatus").textContent =
            "Microphone is off.";

    };


    recognition.onerror = (event) => {

        isListening = false;

        $("micStatus").textContent =
            "Microphone error: " + event.error;

    };

}


// MICROPHONE NOT SUPPORTED

else {

    $("micStatus").textContent =
        "Speech recognition is not supported in this browser.";

}
