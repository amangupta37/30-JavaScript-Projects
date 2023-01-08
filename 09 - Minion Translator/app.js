import { Encrypted_URL } from "./API.js";
// Targeted Elements.
const TranslateButton = document.getElementById("translate-button");
const InputField = document.getElementById("input-field");
const TranslatedTextPlaceholder = document.getElementById(
    "translated-text-placeholder"
);

const ConfigureURL = (UserQuery) => {
    return `${Encrypted_URL}?text=${UserQuery}`;
};

const ShowErrorBox = (ErrorCode) => {
    // Error Messages
    const UnableToTranslate =
        "Unable to translate the above text please try again !";
    const UnableToFetch =
        "Oops! Something went wrong. Try Searching again or Reloading the page";
    return ErrorCode === 4000
        ? (TranslatedTextPlaceholder.innerText = UnableToTranslate)
        : (TranslatedTextPlaceholder.innerText = UnableToFetch);
};

const TranslateLanguage = (UserText) => {
    fetch(ConfigureURL(UserText))
        .then((response) => response.json())
        .then((Translation) => {
            if (Translation) {
                const TranslatedText = Translation?.contents?.translated;
                TranslatedTextPlaceholder.innerText = TranslatedText;
            } else {
                const ErrorCode = 4000; // Custom status code for search result not found.
                ShowErrorBox(ErrorCode);
            }
        })
        .catch((err) => {
            const ErrorCode = 5000; // Custom status code for failed to fetch data from server or any internal error.
            setTimeout(() => {
                ShowErrorBox(ErrorCode);
            }, 5000);
        });
};

TranslateButton.addEventListener("click", () => {
    const UserText = InputField.value;
    TranslateLanguage(UserText);
});
