/* =========================================
   VIRASAT LIVE
   AGRA FORT - 5 CHECKPOINT EXPERIENCE
   ========================================= */

const modal = document.getElementById("modal");
const content = document.getElementById("modal-content");


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

let xp = Number(localStorage.getItem("virasatXP")) || 0;

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

        unlockedCheckpoint = number + 1;

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

    showCheckpoint(number);
}

/* =========================================
   CHECKPOINT SCREEN
   ========================================= */

function startCheckpoint(number) {

    if (number < 1 || number > 5) {
        number = 1;
    }

    showStory(number);
}

/* =========================================
   STORY
   ========================================= */

function showStory(number) {

    const place =
        checkpoints[number];

    openModal(`

        <label>
            CHECKPOINT
            ${String(number).padStart(2, "0")} / 05
        </label>

        <h2>
            ${place.name}
        </h2>

        <h3>
            "${place.storyTitle}"
        </h3>

        <p>
            ${place.story}
        </p>

        <div class="story-note">

            <strong>
                🎧 Story Mode
            </strong>

            <p>
                In the full Virasat Live platform,
                this story can also be available
                as multilingual audio narration.
            </p>

        </div>

        <p class="verification-note">

            ✓ Checkpoint-specific story<br>
            ✓ Heritage learning experience<br>
            ✓ Interactive exploration

        </p>

        <button
            class="modal-button"
            onclick="startQuest(${number})">

            Start Quest →

        </button>

    `);
}


/* =========================================
   QR DISPLAY
   ========================================= */

function showQR(number = 1) {

    const checkpointID =
        "agra-" +
        String(number).padStart(2, "0");

    const checkpointURL =
        window.location.origin +
        window.location.pathname +
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

            — ${place.name}
        </p>

       <div class="qr-demo">

    <img
        src="images/qr-agra-${String(number).padStart(2, "0")}.png"
        alt="Agra Fort Checkpoint QR Code"
        class="real-qr"
    >

</div>

        <p class="qr-url">
            ${checkpointURL}
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
        new URL(window.location.href);

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

    setTimeout(function () {

        startCheckpoint(number);

    }, 300);
}


/* =========================================
   QUEST
   ========================================= */

function startQuest(number) {

    const place =
        checkpoints[number];

    let optionsHTML = "";

    place.options.forEach(
        function(option, index) {

            optionsHTML += `

                <button
                    class="modal-button"
                    onclick="
                        answerQuest(
                            ${number},
                            ${index}
                        )
                    ">

                    ${String.fromCharCode(65 + index)}.
                    ${option}

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
                ${place.question}
            </b>
        </p>

        ${optionsHTML}

        <p class="demo-note">

            💡 Hint:
            ${place.hint}

        </p>

    `);
}


/* =========================================
   QUEST ANSWER
   ========================================= */

function answerQuest(number, selected) {

    const place =
        checkpoints[number];

    if (selected === place.answer) {

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
                    onclick="
                        startCheckpoint(${number + 1})
                    ">

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
                ${place.hint}
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

function showAIDemo() {

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
            simulated. The production version can
            use RAG with a verified heritage
            knowledge base.

        </p>

    `);
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

    } else if (
        q.includes("gate") ||
        q.includes("gateway") ||
        q.includes("entrance")
    ) {

        response =
            "A gateway is more than an entrance. Its design can influence movement, access and defence. Virasat Live turns architectural observations into interactive learning challenges.";

    } else if (
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
                ${escapeHTML(question)}
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


function escapeHTML(text) {

    const div =
        document.createElement("div");

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
            Know an old stepwell, local legend,
            craft, folk tradition or forgotten place?
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

    for (let i = 1; i <= 5; i++) {

        let status = "🔒 Locked";

        if (isCompleted(i)) {

            status = "✅ Completed";

        } else if (i <= unlockedCheckpoint) {

            status = "🔓 Unlocked";
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

    localStorage.removeItem("virasatXP");

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

    setTimeout(function () {

        startCheckpoint(number);

    }, 700);
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