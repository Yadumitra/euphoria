document.addEventListener('DOMContentLoaded', function() {

    // Set default timer lengths (in seconds)
    let breakTime = 300;
    let sessionTime = 1500;

    // Set the countdown timer for the first Session
    let clockTime = sessionTime;
    let clockType = 'session';
    
    // Tell the app that the clock isn't running
    let clockRunning = false;

    // Set an ID to use with setInterval and clearInterval
    let countdownID;

    // Functions to convert seconds to friendly formats
    const inMinSec = (time) => {
        let m = Math.floor(time / 60);
        let s = time % 60;

        if (s < 10) {
            s = '0' + s.toString();
        }
        return m + ':' + s;
    };

    const inMinOnly = (time) => {
        return (time / 60).toFixed();
    };

    // Functions for pushing timer values to the UI in friendly formats
    const updateBreakIndicator = () => {
        document.getElementById('break-indicator').textContent = inMinOnly(breakTime);
    };

    const updateSessionIndicator = () => {
        document.getElementById('session-indicator').textContent = inMinOnly(sessionTime);
        if (clockType === 'session') {
            document.getElementById('clock-counter').textContent = inMinSec(sessionTime);
        }
    };

    const updateClockCounter = () => {
        document.getElementById('clock-counter').textContent = inMinSec(clockTime);
    };

    // Update the progress bar. 'Progress' should be an int from 0-100.
    const updateProgress = (progress) => {
        progress = Math.abs(progress - 100).toFixed(2).toString() + '%';
        document.getElementById('inner').style.height = progress;
    };

    // Initialize the UI
    const resetApp = () => {
        clockTime = sessionTime;
        clockType = 'session';
        updateBreakIndicator();
        updateSessionIndicator();
        updateClockCounter();
        updateProgress(100);
        document.getElementById('clock-label').textContent = 'Session';
        document.getElementById('clock-button').textContent = 'Start';
        document.getElementById('reset-button').disabled = true;
    };

    resetApp();

    // Click Handlers for changing the break and session lengths.
    // If the clock is running, don't allow the times to be changed.
    document.getElementById('break-minus').addEventListener('click', function () {
        if (clockRunning) { return; }

        if (breakTime > 0 && clockType === 'break') {
            breakTime -= 60;
            clockTime = breakTime;
            updateBreakIndicator();
            updateClockCounter();
        } else if (breakTime > 0) {
            breakTime -= 60;
            updateBreakIndicator();
        }
    });

    document.getElementById('break-plus').addEventListener('click', function () {
        if (clockRunning) { return; }

        if (clockType === 'break') {
            breakTime += 60;
            clockTime = breakTime;
            updateBreakIndicator();
            updateClockCounter();
        } else {
            breakTime += 60;
            updateBreakIndicator();
        }
    });

    document.getElementById('session-minus').addEventListener('click', function () {
        if (clockRunning) { return; }

        if (sessionTime > 0) {
            sessionTime -= 60;
            resetApp();
        }
    });

    document.getElementById('session-plus').addEventListener('click', function () {
        if (clockRunning) { return; }
        sessionTime += 60;
        resetApp();
    });

    // Timer function. When the session time runs out, switch to break time,
    // and vice-versa.
    const countdown = () => {
        if (clockTime > 0 && clockRunning) {
            clockTime -= 1;
            updateClockCounter();
            if (clockType === 'session') {
                updateProgress((clockTime / sessionTime) * 100);        
            } else {
                updateProgress((clockTime / breakTime) * 100);
            }
        } else if (clockTime === 0 && clockRunning) {
            if (clockType === 'session') {
                document.getElementById('clock-label').textContent = 'Break';
                clockType = 'break';
                clockTime = breakTime;
            } else if (clockType === 'break') {
                document.getElementById('clock-label').textContent = 'Session';
                clockType = 'session';
                clockTime = sessionTime;
            }
        }
    };

    // Start-Stop Click Handler
    document.getElementById('clock-button').addEventListener('click', function () {
        if (clockRunning) {
            clockRunning = false;
            window.clearInterval(countdownID);
            document.getElementById('clock-button').textContent = 'Resume';
            document.getElementById('reset-button').disabled = false;
        } else {
            clockRunning = true;
            countdownID = window.setInterval(countdown, 1000);
            document.getElementById('clock-button').textContent = 'Pause';
            document.getElementById('reset-button').disabled = true;
        }
    });

    // Reset Click Handler
    document.getElementById('reset-button').addEventListener('click', function () {
        resetApp();
    });

});
