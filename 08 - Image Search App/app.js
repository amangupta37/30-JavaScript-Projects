import { URL, ClientId } from "./API.js";

// Targeted Elements.
const SearchButton = document.getElementById("search-button");
const InputField = document.getElementById("input-field");
const ErrorTextBox = document.getElementById("error-text-box");
const SearchResultBox = document.getElementById("search-results");
const ItemsInNavBar = document.querySelectorAll(".Item");
const SuggestionCardSection = document.getElementById("search-suggestion-card");
const ResultNotFoundModal = document.getElementById("result-not-found");
const SomethingWentWrongModal = document.getElementById("something-went-wrong");
const Loader = document.getElementById("loader");

// Total number of images requested.
const NumberOfImagesPerPage = 30;

// Action for configuring query params.
const ConfigureRequest = (SearchQuery) => {
    const getRequestPramsConfigure = `${URL}${SearchQuery}${ClientId}${NumberOfImagesPerPage}`;
    return getRequestPramsConfigure;
};

// Action for removing search results.
const ClearPreviousSearchResult = () => {
    const hasImagePlaceHolder = document.getElementById("images-placeholder");

    if (hasImagePlaceHolder) {
        hasImagePlaceHolder.remove(); // Remove all search result images in UI.
    }

    RemoveSearchSuggestions(); // Remove search related suggestion section.

    RemoveErrorBox(); // Remove if any error screen present.
};

// Action for handling active item in nav.
const CheckActiveItemInNav = (clickedNavItem) => {
    const NavItems = ["All", "Image", "Videos", "News", "Books", "More"]; // Items present in nav bar.
    NavItems.map((NavItem, index) => {
        if (NavItem === clickedNavItem) {
            ItemsInNavBar[index].classList.add("AciveItem");
        } else {
            ItemsInNavBar[index].classList.remove("AciveItem");
        }
    });
};

// Action for adding images in UI.
const AppendImagesInUI = (Images) => {
    // Create a placeholder to hold all images.
    const DivElement = document.createElement("div");
    DivElement.setAttribute("id", "images-placeholder");
    DivElement.classList.add("SearchImagesPlaceholder");

    Images?.map((image, index) => {
        const FetchedImageSource = image?.urls?.regular; // Feteched image source form API.

        // Card to hold a single image.
        const CardElement = document.createElement("div");
        CardElement.setAttribute("id", `search-image-card-${index}`);
        CardElement.classList.add("SearchImageCard");

        // Create an img element.
        const ImageElement = document.createElement("img");
        ImageElement.setAttribute("src", FetchedImageSource);

        CardElement.appendChild(ImageElement); // Appending img element inside the image card.
        DivElement.appendChild(CardElement); // Appending image card inside the image placeholder.
        SearchResultBox.appendChild(DivElement); // Appending image placeholder inside the SearchResultBox.
    });

    RemoveLoader();
};

// Action for handling error popup.
const ShowErrorBox = (ErrorCode) => {
    ErrorTextBox.style.display = "block";
    if (ErrorCode === 4000) {
        ResultNotFoundModal.style.display = "flex";
    }
    if (ErrorCode === 5000) {
        SomethingWentWrongModal.style.display = "grid";
    }
    RemoveLoader();
};

const RemoveErrorBox = () => {
    ErrorTextBox.style.display = "none";
    ResultNotFoundModal.style.display = "none";
    SomethingWentWrongModal.style.display = "none";
};

// Action for handling loader.
const AddLoader = () => {
    Loader.style.display = "grid";
};

const RemoveLoader = () => {
    Loader.style.display = "none";
};

// Action for handling search suggestions section.
const AddSearchSuggestions = () => {
    SuggestionCardSection.style.display = "flex";
};

const RemoveSearchSuggestions = () => {
    SuggestionCardSection.style.display = "none";
};

// Action for handling API call.
const FetchUserQuery = (UserQuery) => {
    fetch(ConfigureRequest(UserQuery))
        .then((response) => response.json())
        .then((fetechedQuery) => {
            const QueryResponse = fetechedQuery?.results;

            if (QueryResponse.length > 0) {
                AddSearchSuggestions();
                AppendImagesInUI(QueryResponse);
            } else {
                const ErrorCode = 4000; // Custom status code for search result not found.
                ShowErrorBox(ErrorCode);
            }
        })
        .catch((err) => {
            const ErrorCode = 5000; // Custom status code for failed to fetch data from server.
            setTimeout(() => {
                ShowErrorBox(ErrorCode);
            }, 5000);
        });
};

// Action for initiating search.
const InitiateUserQuerySearch = (UserQuery) => {
    if (UserQuery !== "") {
        ClearPreviousSearchResult();
        CheckActiveItemInNav("Image"); // Make image as default active item in nav.
        AddLoader();
        FetchUserQuery(UserQuery);
    }
};

// Add event listeners.
SearchButton.addEventListener("click", () => {
    const UserQuery = InputField.value;
    InitiateUserQuerySearch(UserQuery);
});

InputField.addEventListener("keypress", (e) => {
    const UserQuery = InputField?.value;
    const PressedkeyCode = e?.keyCode;
    const PressedKeyName = e?.code;

    if (PressedkeyCode === 13 || PressedKeyName === "Enter") {
        InitiateUserQuerySearch(UserQuery);
    }
});

// Add event listeners to each items in nav.
for (let i = 0; i < ItemsInNavBar.length; i++) {
    ItemsInNavBar[i].addEventListener("click", () => {
        const ClickedElement = ItemsInNavBar[i].className.split(" ");

        const hasImagePlaceHolder =
            document.getElementById("images-placeholder");

        if (hasImagePlaceHolder) {
            CheckActiveItemInNav(ClickedElement[1]);
        }
    });
}
