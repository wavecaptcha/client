// askWord.js
// Prompts the user until they type at least 4 characters (of any kind)

async function loadSweetAlert() {
    if (window.Swal) return;
    await new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = "https://cdn.jsdelivr.net/npm/sweetalert2@11";
        script.onload = resolve;
        script.onerror = () => reject(new Error("Failed to load SweetAlert2"));
        document.head.appendChild(script);
    });
}

export async function askWord() {
    await loadSweetAlert();

    while (true) {
        const result = await Swal.fire({
            title: "Type this phrase or anything (at least 4 characters)",
            text: "Example: A dog ate my homework.",
            input: "text",
            inputPlaceholder: "Type 4+ characters...",
            confirmButtonText: "Submit",
            allowOutsideClick: false,
            allowEscapeKey: false,
            preConfirm: (value) => {
                const trimmed = (value || "").trim();
                if (trimmed.length < 4) {
                    Swal.showValidationMessage("You need at least 4 characters!");
                    return false;
                }
                return trimmed;
            },
        });

        if (result && typeof result.value === "string") {
            return result.value.trim();
        }
    }
}

export { askWord }