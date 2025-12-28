const log = (level, text) => {
    if (true) return
    console[level]("%cWaveCaptcha%c " + text, "color: white; background-color: #007BFF; font-weight: semibold; padding: 5px 5px; border-radius: 4px;", "");
}
export { log }