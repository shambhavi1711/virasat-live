/* =========================================
   VIRASAT LIVE
   AGRA FORT - 5 CHECKPOINT EXPERIENCE
   ========================================= */

const modal = document.getElementById("modal");
const content = document.getElementById("modal-content");

window.currentStoryLanguage = "en";
window.currentHistoryStory = "";


/* =========================================
   MODAL
   ========================================= */

function openModal(html) {
    if (!modal || !content) return;

    content.innerHTML = html;
    modal.classList.add("show");
}

function closeModal() {
    if (modal) {
        modal.classList.remove("show");
    }

    stopStory();
}

if (modal) {
    modal.addEventListener("click", function (event) {
        if (event.target === modal) {
            closeModal();
        }
    });
}


/* =========================================
   NAVIGATION
   ========================================= */

function scrollToSection(id) {
    const section = document.getElementById(id);

    if (section) {
        section.scrollIntoView({
            behavior: "smooth"
        });
    }
}


/* =========================================
   PLAYER DATA
   ========================================= */

let xp =
    Number(localStorage.getItem("virasatXP")) || 0;

let completedCheckpoints =
    JSON.parse(
        localStorage.getItem("completedCheckpoints")
    ) || [];

let unlockedCheckpoint =
    Number(
        localStorage.getItem("unlockedCheckpoint")
    ) || 1;

let finalBadge =
    localStorage.getItem("agraExplorerBadge") === "true";


/* =========================================
   CHECKPOINT INFORMATION
   ========================================= */

const checkpoints = {

    1: {
        name: "Amar Singh Gate",

        storyTitle:
            "I have stood here for centuries...",

        story:
            "I have watched emperors, soldiers, travellers and families pass through my gates. My architecture was created not only for beauty, but also for protection and purpose.",

        question:
            "Which feature could make a direct approach to the gateway more difficult?",

        options: [
            "A straight passage",
            "An angled approach",
            "A glass roof",
            "A wooden bridge"
        ],

        answer: 1,

        hint:
            "Think about how the shape of an entrance can affect movement and defence."
    },


    2: {
        name: "Jahangiri Mahal",

        storyTitle:
            "A palace within the fort...",

        story:
            "I represent the residential architecture within Agra Fort. My spaces combine grandeur, courtyards and detailed architectural elements, showing that the fort was also a place of royal life.",

        question:
            "What does a palace area inside a fort mainly reveal?",

        options: [
            "Only military technology",
            "Royal residential life",
            "Modern engineering",
            "Railway construction"
        ],

        answer: 1,

        hint:
            "The fort was not only a military structure; it was also a royal residence."
    },


    3: {
        name: "Diwan-i-Aam",

        storyTitle:
            "Where the emperor met the people...",

        story:
            "I was associated with public audiences. My architectural setting created a formal space where the emperor could meet subjects and hear petitions.",

        question:
            "What was the main purpose associated with Diwan-i-Aam?",

        options: [
            "Public audience",
            "Storage of weapons",
            "Royal bathing",
            "Horse racing"
        ],

        answer: 0,

        hint:
            "Think about the meaning of 'Aam' — it refers to the general public."
    },


    4: {
        name: "Diwan-i-Khas",

        storyTitle:
            "A place for important audiences...",

        story:
            "I represent a more private and formal setting for important royal audiences. My architecture reflects the ceremonial character of the Mughal court.",

        question:
            "Diwan-i-Khas was primarily associated with:",

        options: [
            "Important or private royal audiences",
            "Public markets",
            "Military training",
            "Village farming"
        ],

        answer: 0,

        hint:
            "Think about the difference between 'Aam' and 'Khas'."
    },


    5: {
        name: "Musamman Burj",

        storyTitle:
            "A view across the Yamuna...",

        story:
            "I am one of the memorable structures associated with Agra Fort. My location provides a striking view towards the Yamuna and the Taj Mahal, connecting architecture with the wider historic landscape of Agra.",

        question:
            "What makes Musamman Burj especially memorable to visitors?",

        options: [
            "Its connection to the historic landscape and views",
            "Its underground railway",
            "Its modern glass structure",
            "Its automobile museum"
        ],

        answer: 0,

        hint:
            "Look beyond the structure itself and think about its location and view."
    }

};


/* =========================================
   LOCAL MULTILINGUAL STORIES
   ========================================= */

const localStories = {

    1: {
        en:
            "I have watched emperors, soldiers, travellers and families pass through my gates. My architecture was created not only for beauty, but also for protection and purpose.",

        hi:
            "मैंने सदियों से सम्राटों, सैनिकों, यात्रियों और परिवारों को अपने द्वार से गुजरते देखा है। मेरी वास्तुकला केवल सुंदरता के लिए नहीं, बल्कि सुरक्षा और उद्देश्य को ध्यान में रखकर बनाई गई थी।",

        hinglish:
            "Maine sadiyon se emperors, soldiers, travellers aur families ko apne gates se guzarte dekha hai. Meri architecture sirf beauty ke liye nahi, balki protection aur purpose ko dhyan mein rakhkar banayi gayi thi."
    },


    2: {
        en:
            "I represent the residential architecture within Agra Fort. My spaces combine grandeur, courtyards and detailed architectural elements, showing that the fort was also a place of royal life.",

        hi:
            "मैं आगरा किले की आवासीय वास्तुकला का प्रतिनिधित्व करता हूँ। मेरे विशाल स्थान, आंगन और सुंदर वास्तु विवरण दिखाते हैं कि यह किला केवल सुरक्षा का स्थान नहीं, बल्कि शाही जीवन का भी केंद्र था।",

        hinglish:
            "Main Agra Fort ki residential architecture ko represent karta hoon. Mere spaces mein grandeur, courtyards aur detailed architectural elements hain, jo dikhate hain ki fort sirf military place nahi, royal life ka bhi centre tha."
    },


    3: {
        en:
            "I was associated with public audiences. My architectural setting created a formal space where the emperor could meet subjects and hear petitions.",

        hi:
            "मेरा संबंध सार्वजनिक दरबार से था। मेरी वास्तुकला ने ऐसा औपचारिक स्थान बनाया जहाँ सम्राट अपनी प्रजा से मिल सकते थे और उनकी याचिकाएँ सुन सकते थे।",

        hinglish:
            "Main public audiences se associated tha. Meri architectural setting ek formal space provide karti thi jahan emperor apni subjects se mil sakte the aur unki petitions sun sakte the."
    },


    4: {
        en:
            "I represent a more private and formal setting for important royal audiences. My architecture reflects the ceremonial character of the Mughal court.",

        hi:
            "मैं महत्वपूर्ण शाही बैठकों के लिए अधिक निजी और औपचारिक स्थान का प्रतिनिधित्व करता हूँ। मेरी वास्तुकला मुगल दरबार की औपचारिक और भव्य प्रकृति को दर्शाती है।",

        hinglish:
            "Main important royal audiences ke liye ek more private aur formal setting ko represent karta hoon. Meri architecture Mughal court ki ceremonial aur grand nature ko reflect karti hai."
    },


    5: {
        en:
            "I am one of the memorable structures associated with Agra Fort. My location provides a striking view towards the Yamuna and the Taj Mahal, connecting architecture with the wider historic landscape of Agra.",

        hi:
            "मैं आगरा किले की यादगार संरचनाओं में से एक हूँ। मेरी स्थिति यमुना और ताजमहल की ओर एक सुंदर दृश्य प्रदान करती है और वास्तुकला को आगरा के व्यापक ऐतिहासिक परिदृश्य से जोड़ती है।",

        hinglish:
            "Main Agra Fort ki memorable structures mein se ek hoon. Meri location Yamuna aur Taj Mahal ki taraf ek beautiful view deti hai, jo architecture ko Agra ke wider historic landscape se connect karti hai."
    }

};


/* =========================================
   LANGUAGE
   ========================================= */

function setStoryLanguage(language, number) {

    window.currentStoryLanguage = language;

    showStory(number);
}


/* =========================================
   XP SYSTEM
   ========================================= */

function addXP(points) {

    xp += points;

    localStorage.setItem(
        "virasatXP",
        xp
    );
}


/* =========================================
   CHECKPOINT COMPLETION
   ========================================= */

function completeCheckpoint(number) {

    if (!completedCheckpoints.includes(number)) {

        completedCheckpoints.push(number);

        localStorage.setItem(
            "completedCheckpoints",
            JSON.stringify(completedCheckpoints)
        );

        addXP(50);
    }


    if (
        number < 5 &&
        unlockedCheckpoint < number + 1
    ) {

        unlockedCheckpoint =
            number + 1;

        localStorage.setItem(
            "unlockedCheckpoint",
            unlockedCheckpoint
        );
    }


    if (number === 5) {

        finalBadge = true;

        localStorage.setItem(
            "agraExplorerBadge",
            "true"
        );
    }
}


function isCompleted(number) {

    return completedCheckpoints.includes(number);
}


/* =========================================
   START JOURNEY
   ========================================= */

function startJourney() {

    startCheckpoint(1);
}


/* =========================================
   START CHECKPOINT
   ========================================= */

function startCheckpoint(number) {

    if (number < 1 || number > 5) {
        number = 1;
    }

    showStory(number);
}


/* =========================================
   AI HISTORY SPEAKS
   ========================================= */

async function showStory(number = 1) {

    const place =
        checkpoints[number];

    if (!place) {

        console.error(
            "Checkpoint not found:",
            number
        );

        return;
    }


    const language =
        window.currentStoryLanguage || "en";


    /* -----------------------------------------
       LOADING SCREEN
       ----------------------------------------- */

    openModal(`

        <label>
            CHECKPOINT
            ${String(number).padStart(2, "0")} / 05
        </label>

        <h2>
            ${escapeHTML(place.name)}
        </h2>

        ${
            number === 1
                ? `
                    <img
                        src="amarsingh.jpg"
                        alt="Amar Singh Gate"
                        class="story-image"
                    >
                `
                : ""
        }

        <h3>
            "${escapeHTML(place.storyTitle)}"
        </h3>

        <div class="ai-story-loading">

            ✦ History Speaks is preparing
            your story...

        </div>

    `);


    /* -----------------------------------------
       FACTS FOR GEMINI
       ----------------------------------------- */

    const facts = `

Heritage Site:
${place.name}

Provided Heritage Information:
${place.story}

Quest Question:
${place.question}

Hint:
${place.hint}

`;


    try {

        const response =
            await fetch(
                "/api/story",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body:
                        JSON.stringify({

                            siteName:
                                place.name,

                            facts:
                                facts,

                            language:
                                language === "hi"
                                    ? "Hindi"
                                    : language === "hinglish"
                                        ? "Hinglish"
                                        : "English"

                        })
                }
            );


        const data =
            await response.json();


        if (!response.ok) {

            throw new Error(
                data.error ||
                "Unable to generate story"
            );
        }


        const story =
            data.story;


        if (!story) {

            throw new Error(
                "Story was not returned"
            );
        }


        window.currentHistoryStory =
            story;


        /* -----------------------------------------
           AI STORY
           ----------------------------------------- */

        openStoryModal(
            number,
            place,
            story
        );


    } catch (error) {

        console.error(
            "History Speaks error:",
            error
        );


        /* -----------------------------------------
           LOCAL FALLBACK
           ----------------------------------------- */

        const fallback =
            localStories[number][language]
            || localStories[number].en;


        window.currentHistoryStory =
            fallback;


        openStoryModal(
            number,
            place,
            fallback,
            true
        );
    }
}


/* =========================================
   STORY MODAL
   ========================================= */

function openStoryModal(
    number,
    place,
    story,
    fallback = false
) {

    openModal(`

        <label>
            CHECKPOINT
            ${String(number).padStart(2, "0")} / 05
        </label>

        <h2>
            ${escapeHTML(place.name)}
        </h2>

        ${
            number === 1
                ? `
                    <img
                        src="amarsingh.jpg"
                        alt="Amar Singh Gate"
                        class="story-image"
                    >
                `
                : ""
        }

        <h3>
            "${escapeHTML(place.storyTitle)}"
        </h3>


        <div class="ai-story">
            ${escapeHTML(story)}
        </div>


        <div class="story-language">

            <p>
                <strong>
                    🎧 Choose Story Language
                </strong>
            </p>


            <button
                class="modal-button"
                onclick="setStoryLanguage('en', ${number})">

                🇬🇧 English

            </button>


            <button
                class="modal-button"
                onclick="setStoryLanguage('hi', ${number})">

                🇮🇳 हिंदी

            </button>


            <button
                class="modal-button"
                onclick="setStoryLanguage('hinglish', ${number})">

                💬 Hinglish

            </button>

        </div>


        <!-- ONLY ONE AUDIO CONTROL BLOCK -->

        <div class="story-audio-controls">

            <button
                class="modal-button"
                onclick="hearMyStory()">

                🔊 Hear My Story

            </button>


            <button
                class="modal-button"
                onclick="stopStory()">

                ⏹ Stop

            </button>

        </div>


        <div class="story-note">

            <strong>
                ✦ HISTORY SPEAKS
            </strong>

            <p>

                ${
                    fallback
                        ? "AI storytelling is temporarily unavailable. Showing the verified local story for this checkpoint."
                        : "This story was created from the heritage information provided for this checkpoint."
                }

            </p>

        </div>


        <p class="verification-note">

            ✓ Checkpoint-specific story<br>
            ✓ AI-powered narration<br>
            ✓ Heritage learning experience

        </p>


        <button
            class="modal-button"
            onclick="startQuest(${number})">

            Start Quest →

        </button>

    `);
}


/* =========================================
   HEAR MY STORY - TEXT TO SPEECH
   ========================================= */

function hearMyStory() {

    const story =
        window.currentHistoryStory;


    if (!story) {

        alert(
            "Story is not available yet."
        );

        return;
    }


    if (
        !("speechSynthesis" in window)
    ) {

        alert(
            "Voice narration is not supported in this browser."
        );

        return;
    }


    window.speechSynthesis.cancel();


    const narration =
        new SpeechSynthesisUtterance(
            story
        );


    const language =
        window.currentStoryLanguage || "en";


    /* -----------------------------------------
       HINDI
       ----------------------------------------- */

    if (language === "hi") {

        narration.lang =
            "hi-IN";

        narration.rate =
            0.82;

        narration.pitch =
            0.9;

    }


    /* -----------------------------------------
       ENGLISH / HINGLISH
       ----------------------------------------- */

    else {

        narration.lang =
            "en-IN";

        narration.rate =
            0.82;

        narration.pitch =
            0.9;
    }


    narration.volume = 1;


    const voices =
        window.speechSynthesis.getVoices();


    let matchingVoice = null;


    if (language === "hi") {

        matchingVoice =
            voices.find(
                voice =>
                    voice.lang &&
                    voice.lang
                        .toLowerCase()
                        .startsWith("hi")
            );

    } else {

        matchingVoice =
            voices.find(
                voice =>
                    voice.lang &&
                    voice.lang
                        .toLowerCase() ===
                        "en-in"
            );


        if (!matchingVoice) {

            matchingVoice =
                voices.find(
                    voice =>
                        voice.lang &&
                        voice.lang
                            .toLowerCase()
                            .startsWith("en")
                );
        }
    }


    if (matchingVoice) {

        narration.voice =
            matchingVoice;
    }


    window.speechSynthesis.speak(
        narration
    );
}


/* =========================================
   STOP STORY
   ========================================= */

function stopStory() {

    if (
        "speechSynthesis" in window
    ) {

        window.speechSynthesis.cancel();
    }
}


/* =========================================
   QR DISPLAY
   ========================================= */

function showQR(number = 1) {

    const checkpointID =
        "agra-" +
        String(number).padStart(2, "0");


    const checkpointURL =
        "https://virasat-2.vercel.app/" +
        "?checkpoint=" +
        checkpointID;


    const place =
        checkpoints[number];


    openModal(`

        <label>
            HERITAGE CHECKPOINT
        </label>


        <h2>
            Scan → Experience
        </h2>


        <p>

            <b>
                Checkpoint
                ${String(number).padStart(2, "0")}
            </b>

            —
            ${escapeHTML(place.name)}

        </p>


        <div class="qr-demo">

            <img
                src="images/qr-agra-${String(number).padStart(2, "0")}.png"
                alt="Agra Fort Checkpoint QR Code"
                class="real-qr"
            >

        </div>


        <p class="qr-url">

            ${escapeHTML(checkpointURL)}

        </p>


        <button
            class="modal-button"
            onclick="openCheckpoint(${number})">

            Open Checkpoint →

        </button>

    `);
}


/* =========================================
   OPEN QR CHECKPOINT
   ========================================= */

function openCheckpoint(number) {

    const url =
        new URL(
            window.location.href
        );


    url.searchParams.set(
        "checkpoint",
        "agra-" +
        String(number).padStart(2, "0")
    );


    window.history.pushState(
        {},
        "",
        url
    );


    closeModal();


    setTimeout(
        function () {

            startCheckpoint(number);

        },
        300
    );
}


/* =========================================
   QUEST
   ========================================= */

function startQuest(number) {

    const place =
        checkpoints[number];


    if (!place) return;


    let optionsHTML = "";


    place.options.forEach(
        function(option, index) {

            optionsHTML += `

                <button
                    class="modal-button"
                    onclick="answerQuest(${number}, ${index})">

                    ${String.fromCharCode(65 + index)}.
                    ${escapeHTML(option)}

                </button>

            `;
        }
    );


    openModal(`

        <label>

            QUEST
            ${String(number).padStart(2, "0")}

        </label>


        <h2>

            🕵️ Heritage Detective

        </h2>


        <p>

            <b>

                ${escapeHTML(
                    place.question
                )}

            </b>

        </p>


        ${optionsHTML}


        <p class="demo-note">

            💡 Hint:
            ${escapeHTML(place.hint)}

        </p>

    `);
}


/* =========================================
   QUEST ANSWER
   ========================================= */

function answerQuest(
    number,
    selected
) {

    const place =
        checkpoints[number];


    if (!place) return;


    if (
        selected === place.answer
    ) {

        const alreadyCompleted =
            isCompleted(number);


        completeCheckpoint(number);


        if (alreadyCompleted) {

            openModal(`

                <label>
                    QUEST COMPLETED
                </label>


                <h2>
                    ✓ Correct!
                </h2>


                <div class="xp-box">

                    <span>
                        YOUR VIRASAT XP
                    </span>

                    <strong>
                        ${xp}
                    </strong>

                </div>


                <button
                    class="modal-button"
                    onclick="showProgress()">

                    View Progress →

                </button>

            `);

            return;
        }


        if (number === 5) {

            openFinalBadge();

        } else {

            openModal(`

                <label>
                    QUEST COMPLETE 🎉
                </label>


                <h2>
                    +50 Virasat XP
                </h2>


                <div class="xp-box">

                    <span>
                        YOUR TOTAL XP
                    </span>

                    <strong>
                        ${xp}
                    </strong>

                </div>


                <p>
                    Excellent observation!
                </p>


                <p>

                    <b>

                        🔓 Checkpoint
                        ${number + 1}
                        unlocked.

                    </b>

                </p>


                <button
                    class="modal-button"
                    onclick="startCheckpoint(${number + 1})">

                    Explore Checkpoint
                    ${number + 1} →

                </button>

            `);
        }


    } else {

        openModal(`

            <label>
                NOT QUITE 👀
            </label>


            <h2>
                Look Again
            </h2>


            <p>

                ${escapeHTML(
                    place.hint
                )}

            </p>


            <button
                class="modal-button"
                onclick="startQuest(${number})">

                Try Again →

            </button>

        `);
    }
}


/* =========================================
   FINAL BADGE
   ========================================= */

function openFinalBadge() {

    openModal(`

        <label>
            JOURNEY COMPLETE
        </label>


        <h2>
            🏆 Agra Fort Explorer
        </h2>


        <div class="xp-box">

            <span>
                TOTAL VIRASAT XP
            </span>

            <strong>
                ${xp}
            </strong>

        </div>


        <p>
            🎉 Congratulations!
        </p>


        <p>

            You completed all five
            Agra Fort heritage checkpoints.

        </p>


        <div class="story-note">

            <strong>
                🏛️ BADGE UNLOCKED
            </strong>

            <p>
                Agra Fort Explorer
            </p>

        </div>


        <button
            class="modal-button"
            onclick="showProgress()">

            View My Virasat Journey →

        </button>

    `);
}


/* =========================================
   AI HERITAGE GUIDE
   ========================================= */

function AIDemo() {

    openModal(`

        <label>
            AI HERITAGE GUIDE
        </label>


        <h2>
            Ask the Monument Anything.
        </h2>


        <p>

            Ask a question about your
            current heritage experience.

        </p>


        <input
            id="ai-question"
            class="ai-question"
            type="text"
            placeholder="Ask about this place..."
        >


        <button
            class="modal-button"
            onclick="submitAIQuestion()">

            Ask Virasat AI →

        </button>


        <p class="demo-note">

            Demo mode: responses are currently
            simulated.

        </p>

    `);
}


function showAIDemo() {

    AIDemo();
}


function submitAIQuestion() {

    const input =
        document.getElementById(
            "ai-question"
        );


    if (!input) return;


    const question =
        input.value.trim();


    if (question === "") {

        input.focus();

        return;
    }


    askAI(question);
}


function askAI(question) {

    const q =
        question.toLowerCase();


    let response =
        "That's an interesting question. In the full Virasat Live platform, I would retrieve verified information about the exact heritage checkpoint before answering.";


    if (
        q.includes("agra") ||
        q.includes("fort")
    ) {

        response =
            "Agra Fort is a major historic fort complex in Agra. Virasat Live connects questions to the checkpoint a visitor is exploring so the answer can focus on what they are actually seeing.";

    }

    else if (
        q.includes("gate") ||
        q.includes("gateway") ||
        q.includes("entrance")
    ) {

        response =
            "A gateway is more than an entrance. Its design can influence movement, access and defence. Virasat Live turns architectural observations into interactive learning challenges.";

    }

    else if (
        q.includes("hindi") ||
        q.includes("हिंदी")
    ) {

        response =
            "नमस्ते! विरासत लाइव का उद्देश्य विरासत स्थलों की जानकारी को स्थानीय भाषाओं में आसान और इंटरैक्टिव बनाना है।";
    }


    openModal(`

        <label>
            AI HERITAGE GUIDE
        </label>


        <h2>
            Virasat AI
        </h2>


        <div class="ai-answer">

            <strong>
                You asked:
            </strong>


            <p>

                ${escapeHTML(
                    question
                )}

            </p>


            <hr>


            <strong>
                🏛️ Virasat AI:
            </strong>


            <p>

                ${response}

            </p>

        </div>


        <p class="verification-note">

            ✓ Checkpoint-aware concept<br>
            ✓ Source-grounded AI concept<br>
            ✓ Multilingual experience

        </p>


        <button
            class="modal-button"
            onclick="closeModal()">

            Continue Exploring →

        </button>

    `);
}


/* =========================================
   HTML SECURITY HELPER
   ========================================= */

function escapeHTML(text) {

    const div =
        document.createElement(
            "div"
        );


    div.textContent = text;


    return div.innerHTML;
}


/* =========================================
   COMMUNITY
   ========================================= */

function community() {

    openModal(`

        <label>
            LIVING HERITAGE
        </label>


        <h2>
            Share a Story.
        </h2>


        <p>

            Know an old stepwell,
            local legend, craft,
            folk tradition or forgotten place?

        </p>


        <textarea
            class="community-input"
            placeholder="Tell us about it..."
        ></textarea>


        <p class="demo-note">

            Community submissions will be reviewed
            and verified before publication.

        </p>


        <button
            class="modal-button"
            onclick="submitStory()">

            Submit Story →

        </button>

    `);
}


function submitStory() {

    openModal(`

        <label>
            THANK YOU 🌿
        </label>


        <h2>
            Story Received
        </h2>


        <p>

            Your contribution has been added
            to the prototype submission flow.

        </p>


        <p>

            In the full platform, submissions
            would go through verification before
            becoming public.

        </p>


        <button
            class="modal-button"
            onclick="closeModal()">

            Done

        </button>

    `);
}


/* =========================================
   PROGRESS
   ========================================= */

function showProgress() {

    let checkpointList = "";


    for (
        let i = 1;
        i <= 5;
        i++
    ) {

        let status =
            "🔒 Locked";


        if (isCompleted(i)) {

            status =
                "✅ Completed";

        }

        else if (
            i <= unlockedCheckpoint
        ) {

            status =
                "🔓 Unlocked";
        }


        checkpointList += `

            <p>

                Checkpoint ${i}:
                ${status}

            </p>

        `;
    }


    openModal(`

        <label>
            MY VIRASAT JOURNEY
        </label>


        <h2>
            Your Progress 🏆
        </h2>


        <div class="xp-box">

            <span>
                VIRASAT XP
            </span>


            <strong>
                ${xp}
            </strong>

        </div>


        ${checkpointList}


        <p>

            <b>Badge:</b>

            ${
                finalBadge
                    ? "🏆 Agra Fort Explorer"
                    : "🔒 Complete all 5 checkpoints"
            }

        </p>


        <button
            class="modal-button"
            onclick="closeModal()">

            Continue Exploring →

        </button>

    `);
}


/* =========================================
   RESET
   ========================================= */

function resetDemo() {

    localStorage.removeItem(
        "virasatXP"
    );

    localStorage.removeItem(
        "completedCheckpoints"
    );

    localStorage.removeItem(
        "unlockedCheckpoint"
    );

    localStorage.removeItem(
        "agraExplorerBadge"
    );


    xp = 0;

    completedCheckpoints = [];

    unlockedCheckpoint = 1;

    finalBadge = false;


    openModal(`

        <label>
            DEMO RESET
        </label>


        <h2>
            Journey Restarted 🔄
        </h2>


        <p>

            XP, checkpoints and badge
            have been reset.

        </p>


        <button
            class="modal-button"
            onclick="closeModal()">

            Start Again →

        </button>

    `);
}


/* =========================================
   QR URL DETECTION
   ========================================= */

function detectCheckpoint() {

    const params =
        new URLSearchParams(
            window.location.search
        );


    const checkpoint =
        params.get("checkpoint");


    if (!checkpoint) return;


    const match =
        checkpoint.match(
            /^agra-0([1-5])$/
        );


    if (!match) return;


    const number =
        Number(match[1]);


    setTimeout(
        function () {

            startCheckpoint(number);

        },
        700
    );
}


/* =========================================
   NAVBAR LANGUAGE
   ========================================= */

function changeLanguage(language) {

    window.currentStoryLanguage =
        language;


    const translations = {

        en: {
            home: "Home",
            explore: "Explore",
            how: "How It Works",
            ai: "AI Guide",
            community: "Community"
        },


        hi: {
            home: "होम",
            explore: "खोजें",
            how: "यह कैसे काम करता है",
            ai: "AI गाइड",
            community: "समुदाय"
        },


        hinglish: {
            home: "Home",
            explore: "Explore Karo",
            how: "Kaise Kaam Karta Hai",
            ai: "AI Guide",
            community: "Community"
        }

    };


    const selectedLanguage =
        translations[language];


    /* If data-i18n exists */

    document
        .querySelectorAll(
            "[data-i18n]"
        )
        .forEach(
            element => {

                const key =
                    element.getAttribute(
                        "data-i18n"
                    );


                if (
                    selectedLanguage[key]
                ) {

                    element.textContent =
                        selectedLanguage[key];
                }

            }
        );


    /* Also update navbar links
       even if data-i18n is missing */

    const links =
        document.querySelectorAll(
            "nav a"
        );


    links.forEach(
        link => {

            const text =
                link.textContent
                    .trim()
                    .toLowerCase();


            if (
                text === "home" ||
                text === "होम"
            ) {

                link.textContent =
                    selectedLanguage.home;
            }


            else if (
                text === "explore" ||
                text === "खोजें" ||
                text.includes("explore karo")
            ) {

                link.textContent =
                    selectedLanguage.explore;
            }


            else if (
                text.includes("how it works") ||
                text.includes("यह कैसे") ||
                text.includes("kaise kaam")
            ) {

                link.textContent =
                    selectedLanguage.how;
            }


            else if (
                text.includes("ai guide") ||
                text.includes("ai गाइड")
            ) {

                link.textContent =
                    selectedLanguage.ai;
            }


            else if (
                text === "community" ||
                text === "समुदाय"
            ) {

                link.textContent =
                    selectedLanguage.community;
            }

        }
    );
}


/* =========================================
   PAGE LOAD
   ========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        detectCheckpoint();

    }
);