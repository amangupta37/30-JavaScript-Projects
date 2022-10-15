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

// Total number of images to show in UI after API response.
const NumberOfImagesPerPage = 50;

const ConfigureRequest = (SearchQuery) => {
    const getRequestPramsConfigure = `${URL}${SearchQuery}${ClientId}${NumberOfImagesPerPage}`;
    return getRequestPramsConfigure;
};

const ClearPreviousSearchResult = () => {
    const hasImagePlaceHolder = document.getElementById("images-placeholder");

    if (hasImagePlaceHolder) {
        hasImagePlaceHolder.remove(); // Remove all search result images in UI.
    }

    RemoveSearchSuggestions(); // Remove search related suggestion section.

    RemoveErrorBox(); // Remove if any error screen present.
};

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

const RemoveLoader = () => {
    Loader.style.display = "none";
};

const AddLoader = () => {
    Loader.style.display = "grid";
};

const RemoveSearchSuggestions = () => {
    SuggestionCardSection.style.display = "none";
};

const AddSearchSuggestions = () => {
    SuggestionCardSection.style.display = "flex";
};

const FetchUserQuery = (UserQuery) => {
    fetch(ConfigureRequest(UserQuery))
        .then((response) => response.json())
        .then((fetechedQuery) => {
            const QueryResponse = fetechedQuery?.results;

            if (QueryResponse.length > 0) {
                AddSearchSuggestions();
                AppendImagesInUI(QueryResponse);
            } else {
                const ErrorCode = 4000; // Status code for search result not found.
                ShowErrorBox(ErrorCode);
            }
        })
        .catch((err) => {
            const ErrorCode = 5000; // Status code for failed to fetch data from server.
            setTimeout(() => {
                ShowErrorBox(ErrorCode);
            }, 5000);
        });
};

const InitiateUserQuerySearch = (UserQuery) => {
    if (UserQuery !== "") {
        ClearPreviousSearchResult();
        CheckActiveItemInNav("Image"); // Add image as default active item in nav.
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
        CheckActiveItemInNav(ClickedElement[1]);
    });
}
