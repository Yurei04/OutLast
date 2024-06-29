let switchPower = false;

document.getElementById('checkbox-power').addEventListener('change', function () {
    switchPower = this.checked;

    if (switchPower) {
        document.querySelector(".switches-block").style.border = "2px solid #6b4c4a";
        document.querySelector(".buttons-control").style.border = "2px solid #6b4c4a";
        document.querySelector(".data-square").style.border = "2px solid #6b4c4a";
        document.querySelector(".square-main").style.border = "2px solid #6b4c4a";

        document.querySelector(".progress-purity").textContent = `${purity_start_value}`;
        document.querySelector(".circle-purity-main").style.background = `conic-gradient( rgb(98, 255, 59) ${purity_start_value * 3.6}deg,  #2f005da8 0deg)`;
        document.querySelector(".progress-radiation").textContent = `${radiation_start_value}`;
        document.querySelector(".circle-radiation-main").style.background = `conic-gradient( rgb(98, 255, 59) ${radiation_start_value * 3.6}deg,  #2f005da8 0deg)`;

        showScreen('main-menu');
        addStyles();
        enableButtonsAndSwitches();
    } else {
        document.querySelector(".switches-block").style.border = "2px solid #555";
        document.querySelector(".buttons-control").style.border = "2px solid #555";
        document.querySelector(".data-square").style.border = "2px solid #555";
        document.querySelector(".square-main").style.border = "2px solid #555";

        resetStyles();
        disableButtonsAndSwitches();
    }
});

document.getElementById('lockdown-button').addEventListener('click', function() {
    showScreen('lock-down-screen');
    // Trigger the lock-down event
    document.querySelector(".switches-block").style.border = "2px solid red";
    document.querySelector(".buttons-control").style.border = "2px solid red";
    document.querySelector(".data-square").style.border = "2px solid red";
    document.querySelector(".square-main").style.border = "2px solid red";
    document.querySelector(".circle-purity-main").style.background = `conic-gradient(red ${purity_start_value * 3.6}deg,  #2f005da8 0deg)`;
    document.querySelector(".circle-radiation-main").style.background = `conic-gradient(red ${radiation_start_value * 3.6}deg,  #2f005da8 0deg)`;
    disableButtonsAndSwitches();

    setTimeout(() => {
        enableButtonsAndSwitches();
        showScreen('main-menu');
        document.querySelector(".switches-block").style.border = "2px solid #6b4c4a";
        document.querySelector(".buttons-control").style.border = "2px solid #6b4c4a";
        document.querySelector(".data-square").style.border = "2px solid #6b4c4a";
        document.querySelector(".square-main").style.border = "2px solid #6b4c4a";
        document.querySelector(".circle-purity-main").style.background = `conic-gradient(rgb(98, 255, 59) ${purity_start_value * 3.6}deg,  #2f005da8 0deg)`;
        document.querySelector(".circle-radiation-main").style.background = `conic-gradient(rgb(98, 255, 59) ${radiation_start_value * 3.6}deg,  #2f005da8 0deg)`;
    }, 15000 + Math.random() * 15000); // 15-30 seconds
});

document.getElementById('alien-button').addEventListener('click', function() {
    showScreen('chat-screen');
    // Trigger the alien frequency searcher event
});

function showScreen(screenName) {
    const screens = document.querySelectorAll('.screens-container > div');
    screens.forEach(screen => {
        if (screen.classList.contains(screenName)) {
            screen.classList.add('active');
        } else {
            screen.classList.remove('active');
        }
    });
}

function addStyles() {
    const style = document.createElement('style');
    style.textContent = `
    .data-circle {
        border: 2px solid red;
    }

    .circle-purity-main {
        display: flex;
        background: conic-gradient(red 3.6deg, #4caf50 0deg);
        box-shadow: 0px 0px 20px rgba(255, 0, 0, 0.7);
    }

    .circle-purity-main::before {
        background-color: red;
    }

    .circle-radiation-main {
        display: flex;
        background: conic-gradient(red 3.6deg, #9acd32 0deg);
        box-shadow: 0px 0px 20px rgba(255, 0, 0, 0.7);
    }

    .circle-radiation-main::before {
        background-color: darkred;
    }

    /* Glow Animation */
    @keyframes glow {
        from {
            box-shadow: 0 0 10px rgba(255, 0, 0, 0.5), 0 0 20px rgba(255, 0, 0, 0.5), 0 0 30px rgba(255, 0, 0, 0.5);
        }
        to {
            box-shadow: 0 0 20px rgba(255, 0, 0, 0.9), 0 0 30px rgba(255, 0, 0, 0.9), 0 0 40px rgba(255, 0, 0, 0.9);
        }
    }

    .circle-radiation-main {
        animation: glowRadiation 2s infinite alternate;
    }

    @keyframes glowRadiation {
        from {
            box-shadow: 0 0 10px rgba(255, 0, 0, 0.5), 0 0 20px rgba(255, 0, 0, 0.5), 0 0 30px rgba(255, 0, 0, 0.5);
        }
        to {
            box-shadow: 0 0 20px rgba(255, 0, 0, 0.9), 0 0 30px rgba(255, 0, 0, 0.9), 0 0 40px rgba(255, 0, 0, 0.9);
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
    document.querySelectorAll('.button-map, .main-button').forEach(button => {
        button.disabled = false;
    });
}

function disableButtonsAndSwitches() {
    document.querySelectorAll('.button-map, .main-button').forEach(button => {
        button.disabled = true;
    });
}

// Ensure the main menu appears when the power is turned on
document.getElementById('checkbox-power').addEventListener('change', function () {
    if (this.checked) {
        showScreen('main-menu');
    }
});
