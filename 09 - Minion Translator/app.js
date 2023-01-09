import { Encrypted_URL } from "./API.js";
// Targeted Elements.
const TranslateButton = document.getElementById("translate-button");
const InputField = document.getElementById("input-field");
const TranslatedTextPlaceholder = document.getElementById(
    "translated-text-placeholder"
);
const ToolTip = document.getElementById("tool-tip");
const ConfigureURL = (UserQuery) => {
    return `${Encrypted_URL}?text=${UserQuery}`;
};

const ShowElement = (Element) => {
    Element.style.display = "block";
};
const HideElement = (Element) => {
    Element.style.display = "none";
};

const ResetTranslation = () => {
    ToolTip.style.color = "whitesmoke";
    HideElement(ToolTip);
    HideElement(TranslatedTextPlaceholder);
};

const ShowErrorBox = (ErrorMessage) => {
    ToolTip.style.color = "red";
    ShowElement(ToolTip);
    return (ToolTip.innerText = ErrorMessage);
};

const TranslateLanguage = (UserText) => {
    ShowElement(ToolTip);
    ToolTip.innerText = "Banana Translation will come here 👇";

    fetch(ConfigureURL(UserText))
        .then((response) => response.json())
        .then((Translation) => {
            const TranslatedText = Translation?.contents?.translated;
            if (TranslatedText) {
                TranslatedTextPlaceholder.innerText = TranslatedText;
                ShowElement(TranslatedTextPlaceholder);
            } else {
                const ErrorMessage = Translation?.error
                    ? Translation?.error?.message
                    : "Unable to translate the above text please try again later !";
                ShowErrorBox(ErrorMessage);
            }
        })
        .catch((err) => {
            setTimeout(() => {
                const ErrorMessage =
                    "Oops! Something went wrong. Try Searching again or Reloading the page";
                ShowErrorBox(ErrorMessage);
            }, 5000);
        });
};

InputField.addEventListener("input", (e) => {
    if (InputField.value.trim()) {
        TranslateButton.disabled = false;
    } else {
        TranslateButton.disabled = true;
        HideElement(ToolTip);
        ResetTranslation();
    }
});

TranslateButton.addEventListener("click", () => {
    const UserText = InputField.value;
    ResetTranslation();
    TranslateLanguage(UserText);
});
