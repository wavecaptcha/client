async function askWord() {
    if (!window.Swal) {
        await new Promise((resolve, reject) => {
            const script = document.createElement("script");
            script.src = "https://cdn.jsdelivr.net/npm/sweetalert2@11";
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }

    let typedWord = "";
    while (typedWord.length < 4) {
        const result = await Swal.fire({
            title: "Type anything that’s at least 4 characters long. For example: A dog ate my homework.",
            input: "text",
            inputPlaceholder: "Type 4 letters...",
            confirmButtonText: "Submit",
            allowOutsideClick: false,
            allowEscapeKey: false,
            preConfirm: (value) => {
                if (!value || value.length < 4) {
                    Swal.showValidationMessage("You must type 4 or more letters!");
                }
                return value;
            },
        });

        typedWord = result.value ? result.value.trim() : "";
    }
}
export { askWord }