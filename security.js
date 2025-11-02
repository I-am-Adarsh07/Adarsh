// --- SECURITY BLOCK: ANTI-INSPECTION TECHNIQUES ---

// Console Warning
console.log("%cSTOP! 🚫", "color: red; font-size: 40px; font-weight: bold;");
console.log("%cThis website is protected. Unauthorized code access or manipulation is strictly prohibited.", "color: orange; font-size: 16px;");


// Helper function to show a custom toast message (Unified function for the entire website)
// This function must be the only 'showToast' defined across all your scripts.
function showToast(message) {
    const toast = document.getElementById("customToast");
    if (!toast) return;
    
    // Check if a toast is already being shown to prevent rapid popups
    if (toast.className.includes("show")) {
        // If already showing, update message and restart timer
        toast.textContent = message;
        clearTimeout(toast.timer);
    } else {
        // If not showing, set the message and show it
        toast.textContent = message;
        toast.className = "show"; 
    }

    // Set a timer to hide the toast
    toast.timer = setTimeout(function(){ 
        toast.className = toast.className.replace("show", ""); 
    }, 3000);
}


// 1. Disable Right Click (Context Menu)
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    showToast("Right-click is disabled!");
});


// 2. Disable Common Developer Tool Keyboard Shortcuts (F12, Ctrl/Cmd + Shift + I/J/C/K/U)
document.addEventListener('keydown', function(e) {
    
    const isCtrlOrCmd = e.ctrlKey || e.metaKey; // Ctrl for Windows/Linux, Cmd for Mac

    // F12 key
    if (e.key === 'F12') {
        e.preventDefault();
        showToast("Developer Tools are disabled!");
    }
    
    // Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C (Inspect/Console/Elements)
    if (isCtrlOrCmd && e.shiftKey) {
        if (e.key === 'I' || e.key === 'J' || e.key === 'C') {
            e.preventDefault();
            showToast("Developer Tools shortcuts are disabled!");
        }
    }
    
    // Ctrl + U (View Source)
    if (isCtrlOrCmd && e.key === 'U') {
        e.preventDefault();
        showToast("View Source is disabled!");
    }
});

// --- End of Security Block ---