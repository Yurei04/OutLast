document.getElementById('checkbox-power').addEventListener('change', function() {
    const dataCircle = document.querySelector('.data-circle');
    const switchPower = this.checked;

    if (switchPower) {
        document.querySelector(".switches-block").style.border = "2px solid #fff";
        document.querySelector(".buttons-control").style.border = "2px solid #fff";
        document.querySelector(".data-square").style.border = "2px solid #fff";
        document.querySelector(".square-main").style.border = "2px solid #fff";

        dataCircle.style.display = 'flex';
        addStyles();
        enableButtonsAndSwitches();

        let purity_start_value = 0;
        let purity_end_value = 3000;
        let purity_speed_value = 10;

        let purity_interval = setInterval(() => {
            purity_start_value += 1;

            document.querySelector(".progress-purity").textContent = `${purity_start_value}`;
            document.querySelector(".circle-purity-main").style.background = `conic-gradient(rgb(98, 255, 59) ${purity_start_value * 3.6}deg, #2f005da8 0deg)`;

            if (purity_start_value == purity_end_value) {
                clearInterval(purity_interval);
            }

        }, purity_speed_value);

        let radiation_start_value = 0;
        let radiation_end_value = 1000;
        let radiation_speed_value = 10;

        let radiation_interval = setInterval(() => {
            radiation_start_value += 1;

            document.querySelector(".progress-radiation").textContent = `${radiation_start_value}`;
            document.querySelector(".circle-radiation-main").style.background = `conic-gradient(rgb(98, 255, 59) ${radiation_start_value * 3.6}deg, #2f005da8 0deg)`;

            if (radiation_start_value == radiation_end_value) {
                clearInterval(radiation_interval);
            }

        }, radiation_speed_value);

    } else {
        console.log('Power Off');
        resetStyles();
        disableButtonsAndSwitches();

        document.querySelector(".switches-block").style.border = "";
        document.querySelector(".buttons-control").style.border = "";
        document.querySelector(".data-square").style.border = "";
        document.querySelector(".square-main").style.border = "";

        // Hide all screens when power is off
        const screens = document.querySelectorAll('.screens-container > div');
        screens.forEach(screen => {
            screen.style.display = 'none';
        });
    }
});

function addStyles() {
    const style = document.createElement('style');
    style.textContent = `
    .data-circle {
        border: 2px solid #fff;
    }

    .circle-purity-main {
        display: flex;
        background: conic-gradient(green 3.6deg, #4caf50 0deg);
        box-shadow: 0px 0px 20px rgba(0, 255, 0, 0.7);
    }

    .circle-purity-main::before {
        background-color: green;
    }

    .circle-radiation-main {
        display: flex;
        background: conic-gradient(yellowgreen 3.6deg, #9acd32 0deg);
        box-shadow: 0px 0px 20px rgba(173, 255, 47, 0.7);
    }

    .circle-radiation-main::before {
        background-color: darkgreen;
    }

    /* Glow Animation */
    @keyframes glow {
        from {
            box-shadow: 0 0 10px rgba(0, 255, 0, 0.5), 0 0 20px rgba(0, 255, 0, 0.5), 0 0 30px rgba(0, 255, 0, 0.5);
        }
        to {
            box-shadow: 0 0 20px rgba(0, 255, 0, 0.9), 0 0 30px rgba(0, 255, 0, 0.9), 0 0 40px rgba(0, 255, 0, 0.9);
        }
    }

    .circle-radiation-main {
        animation: glowRadiation 2s infinite alternate;
    }

    @keyframes glowRadiation {
        from {
            box-shadow: 0 0 10px rgba(173, 255, 47, 0.5), 0 0 20px rgba(173, 255, 47, 0.5), 0 0 30px rgba(173, 255, 47, 0.5);
        }
        to {
            box-shadow: 0 0 20px rgba(173, 255, 47, 0.9), 0 0 30px rgba(173, 255, 47, 0.9), 0 0 40px rgba(173, 255, 47, 0.9);
        }
    }
    .screen-square-inner {
        background-color: #fff;
    }
    `;
    document.head.append(style);
}

function resetStyles() {
    const style = document.createElement('style');
    style.textContent = `
    .data-circle {
        border: none;
    }
    .circle-purity-main {
        display: none;
        background: none;
        box-shadow: none;
    }

    .circle-purity-main::before {
        background-color: none;
        background: none;
    }

    .circle-radiation-main {
        display: none;
        background: none;
        box-shadow: none;
    }

    .circle-radiation-main::before {
        background-color: none;
        background: none;
    }

    /* Glow Animation */
    @keyframes glow {
        from {
            box-shadow: none;
        }
        to {
            box-shadow: none;
        }
    }

    .circle-radiation-main {
        animation: none;
    }

    @keyframes glowRadiation {
        from {
            box-shadow: none;
        }
        to {
            box-shadow: none;
        }
    }
    .screen-square-inner {
        background-color: #353535;
    }
    `;
    document.head.append(style);
}

function enableButtonsAndSwitches() {
    document.querySelectorAll('.switch-check').forEach(switchElem => {
        switchElem.disabled = false;
    });

    document.querySelectorAll('.buttons-control a').forEach(button => {
        button.style.pointerEvents = 'auto';
        button.style.opacity = 1;
    });
}

function disableButtonsAndSwitches() {
    document.querySelectorAll('.switch-check').forEach(switchElem => {
        switchElem.disabled = true;
    });

    document.querySelectorAll('.buttons-control a').forEach(button => {
        button.style.pointerEvents = 'none';
        button.style.opacity = 0.5;
    });
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.buttons-control a').forEach(button => {
        button.addEventListener('click', () => {
            if (!document.getElementById('checkbox-power').checked) {
                alert('Power is off. Please turn on the power to use this feature.');
                return;
            }

            const screen = button.getAttribute('data-screen');
            const switches = button.getAttribute('data-switches').split(',').map(Number);

            if (isSwitchCombinationActive(switches)) {
                showScreen(screen);
            } else {
                alert(`Switches ${switches.join(', ')} need to be turned on to display the ${screen.replace('-screen', '').replace('-', ' ')} screen.`);
            }
        });
    });
});

function isSwitchCombinationActive(switches) {
    return switches.every(switchNumber => document.getElementById(`switch${switchNumber}`).checked);
}

function showScreen(screenClass) {
    const screens = document.querySelectorAll('.screens-container > div');
    screens.forEach(screen => {
        screen.style.display = 'none';
    });
    const activeScreen = document.querySelector(`.${screenClass}`);
    activeScreen.style.display = 'block';
}



document.addEventListener('DOMContentLoaded', () => {
    // Select all buttons
    const buttons = document.querySelectorAll('.button-map');

    // Add click event listener to each button
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            // Get the title from data attribute
            const title = button.getAttribute('data-title');

            // Hide all images
            const images = document.querySelectorAll('.map-image');
            images.forEach(img => img.style.display = 'none');

            // Show the image with the matching title
            const imageToShow = Array.from(images).find(img => img.getAttribute('title') === title);
            if (imageToShow) {
                imageToShow.style.display = 'block';
            }
        });
    });

    // Set the default image to be visible on load
    document.querySelector('.map-image').style.display = 'block';
});


// CHAT BOT SECTION

const responses = {
        "hello?": "hello? survivor?",
        "anyone alive?": "I'm here. It's dangerous out there. Find a safe spot and stay hidden",
        "where are you?": "I can't say exactly, but it's really bad here. Avoid open areas and find shelter",
        "do you need help?": "Yes, please! I'm scared and I don't know what to do. Do you have any supplies or weapons?",
        "how many are you?": "Just me. I haven't seen anyone else in days. It's so lonely and terrifying.",
        "are you safe there?": "Not really. I hear strange noises and I'm running low on supplies. What about you?",
        "do you have any news?": "Nothing good. It seems like the danger is everywhere. Stay alert and be prepared to move quickly."
};



document.getElementById('send-button').addEventListener('click', sendMessage);
document.getElementById('chat-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

function sendMessage() {
    const inputField = document.getElementById('chat-input');
    const message = inputField.value.trim().toLowerCase();  // Convert to lowercase for case-insensitive matching

    if (message === '') return;

    // Add user's message to the chat
    addMessage('You', message);

    // Clear the input field
    inputField.value = '';

    // Get chatbot response
    const botResponse = getResponse(message);

    // Simulate a delay and then add the bot's response to the chat
    setTimeout(() => {
        addMessage('Unknown', botResponse);
    }, 500);
}

function getResponse(message) {
    for (let keyword in responses) {
        if (message.includes(keyword)) {
            return responses[keyword];
        }
    }
    return "Message Distrupted";
}

function addMessage(sender, message) {
    const messagesContainer = document.querySelector('.messages');
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
    messagesContainer.appendChild(messageElement);

    // Scroll to the bottom of the messages container
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}


// WIKI SECTION
// Show wiki entries based on button clicks
document.querySelectorAll('.wiki-button').forEach(button => {
    button.addEventListener('click', () => {
        const category = button.getAttribute('data-category');
        showWikiEntry(category);
    });
});

// Search functionality
document.getElementById('wiki-search-button').addEventListener('click', () => {
    const query = document.getElementById('wiki-search-input').value.toLowerCase();
    searchWiki(query);
});

document.getElementById('wiki-search-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        const query = e.target.value.toLowerCase();
        searchWiki(query);
    }
});

// Show wiki entry
function showWikiEntry(category) {
    document.querySelectorAll('.wiki-entry').forEach(entry => {
        entry.classList.remove('active');
    });
    const activeEntry = document.querySelector(`.wiki-entry[data-category="${category}"]`);
    activeEntry.classList.add('active');
}

// Search wiki content
function searchWiki(query) {
    const searchResults = document.getElementById('search-results');
    searchResults.innerHTML = ''; // Clear previous results

    let found = false;
    document.querySelectorAll('.wiki-entry').forEach(entry => {
        if (entry.getAttribute('data-category') !== 'search-results') {
            const text = entry.innerText.toLowerCase();
            if (text.includes(query)) {
                const result = document.createElement('p');
                result.textContent = entry.querySelector('h2').textContent;
                searchResults.appendChild(result);
                found = true;
            }
        }
    });

    if (!found) {
        searchResults.textContent = 'No results found.';
    }

    showWikiEntry('search-results');
}

// Chat bot functionality
document.getElementById('wiki-chat-button').addEventListener('click', () => {
    const input = document.getElementById('wiki-chat-input').value.toLowerCase();
    const response = getChatResponse(input);
    const chatOutput = document.querySelector('.wiki-chat-output');
    const chatMessage = document.createElement('div');
    chatMessage.textContent = response;
    chatOutput.appendChild(chatMessage);
    chatOutput.scrollTop = chatOutput.scrollHeight;
});

document.getElementById('wiki-chat-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        const input = e.target.value.toLowerCase();
        const response = getChatResponse(input);
        const chatOutput = document.querySelector('.wiki-chat-output');
        const chatMessage = document.createElement('div');
        chatMessage.textContent = response;
        chatOutput.appendChild(chatMessage);
        chatOutput.scrollTop = chatOutput.scrollHeight;
    }
});

function getChatResponse(input) {
    // Define responses based on specific words or phrases
    const responses = {
        "i'm lost. What should I do?": "Stay calm. Find a high point to get your bearings. Look for landmarks or follow a water source downstream.",
        "i need water. Where can I find some?": "Look for streams, rivers, or lakes. Collect rainwater if possible. Avoid stagnant water, but if necessary, boil it before drinking.",
        "how can I start a fire?": "Gather dry tinder like leaves or grass, small sticks, and larger logs. Use a flint and steel, matches, or a lighter. If you have none, try the bow drill method.",
        "i'm injured. What now?": "Stop any bleeding by applying pressure. Clean the wound with clean water. Bandage it with clean cloth. Seek medical help as soon as possible.",
        "i hear strange noises. What should I do?": "Stay quiet and try to determine the direction. Move away from the noise if it seems dangerous. Find a secure hiding spot.",
        "how can I find food?": "Look for edible plants, fruits, and nuts. Fish if you have the tools, and set traps for small animals. Avoid unknown plants and berries.",
        "it's getting cold. How do I stay warm?": "Find or build shelter to block wind. Use dry leaves, grass, or clothing to insulate. Start a fire if possible.",
        "what do I do if I encounter wild animals?": "Stay calm and do not run. Make yourself look bigger and make noise to scare them away. If attacked, fight back and aim for sensitive areas like eyes and nose.",
        "how do I signal for help?": "Use a mirror or shiny object to reflect sunlight. Make large, noticeable signs on the ground. Use a whistle or yell at regular intervals.",
        "what are some basic survival supplies I should have?": "Water, food, first aid kit, fire starters, knife, shelter materials, flashlight, and a signaling device.",
    };
    

    for (let key in responses) {
        if (input.includes(key)) {
            return responses[key];
        }
    }
    return "Message Was Distrupted";
}

document.getElementById('checkbox-power').addEventListener('change', function() {
    if (this.checked) {
        document.querySelector('.main-menu').style.display = 'flex';
    } else {
        document.querySelector('.main-menu').style.display = 'none';
    }
});

document.querySelector('#lockdown-button').addEventListener('click', () => {
    document.querySelector('.main-menu').style.display = 'none';
    document.querySelector('.lock-down-screen').style.display = 'flex';
    
    document.querySelector(".switches-block").style.border = "2px solid red";
    document.querySelector(".buttons-control").style.border = "2px solid red";
    document.querySelector(".data-square").style.border = "2px solid red";
    document.querySelector(".square-main").style.border = "2px solid red";
    document.querySelector(".data-circle").style.border = "2px solid red";

    document.querySelectorAll('.circle').forEach(circle => {
        circle.style.border = "2px solid red";
    });
});

document.querySelector('#alien-button').addEventListener('click', () => {
    document.querySelector('.main-menu').style.display = 'none';
    document.querySelector('.alien-search-screen').style.display = 'flex';
    
    document.querySelector(".switches-block").style.border = "2px solid yellow";
    document.querySelector(".buttons-control").style.border = "2px solid yellow";
    document.querySelector(".data-square").style.border = "2px solid yellow";
    document.querySelector(".square-main").style.border = "2px solid yellow";
    document.querySelector(".data-circle").style.border = "2px solid yellow";

    document.querySelectorAll('.circle').forEach(circle => {
        circle.style.border = "2px solid yellow";
    });
});

document.querySelector('#cancel-lockdown-button').addEventListener('click', () => {
    document.querySelector('.lock-down-screen').style.display = 'none';
    document.querySelector('.main-menu').style.display = 'flex';

    document.querySelector(".switches-block").style.border = "";
    document.querySelector(".buttons-control").style.border = "";
    document.querySelector(".data-square").style.border = "";
    document.querySelector(".square-main").style.border = "";
    document.querySelector(".data-circle").style.border = "";

    document.querySelectorAll('.circle').forEach(circle => {
        circle.style.border = "";
    });
});

document.querySelector('#cancel-alien-button').addEventListener('click', () => {
    document.querySelector('.alien-search-screen').style.display = 'none';
    document.querySelector('.main-menu').style.display = 'flex';

    document.querySelector(".switches-block").style.border = "";
    document.querySelector(".buttons-control").style.border = "";
    document.querySelector(".data-square").style.border = "";
    document.querySelector(".square-main").style.border = "";
    document.querySelector(".data-circle").style.border = "";

    document.querySelectorAll('.circle').forEach(circle => {
        circle.style.border = "";
    });
});
