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

// Action for creating html elements dynamically
const CreateElement = (Element, Class, Attribute) => {
    const element = document.createElement(Element); // create element

    Class ? element.classList.add(Class) : null; // add class to created element
    Attribute ? element.setAttribute(Attribute.type, Attribute.name) : null; // add Attribute to created element

    return element; // return created element
};

// Action for adding images in UI.
const AppendImagesInUI = (Images) => {
    // Create UI layout for result display
    const TotalColumnsInUI = 3;
    const TotalImages = Images.length;
    const ImagesPerColumn = TotalImages / TotalColumnsInUI;

    let ImageLowerIndex = 0;
    let ImageUpperIndex = ImagesPerColumn;

    const Row = CreateElement("div", "Row", {
        type: "id",
        name: "images-placeholder",
    });

    for (let i = 1; i <= TotalColumnsInUI; i++) {
        const Column = CreateElement("div", "Column");

        for (let j = ImageLowerIndex; j < ImageUpperIndex; j++) {
            const FetchedImageSource = Images[j]?.urls?.regular; // Feteched image source form API.

            const CardElement = CreateElement("div", "SearchImageCard", {
                type: "id",
                name: `search-image-card-${j}`,
            });

            const ImageElement = CreateElement("img", "", {
                type: "src",
                name: FetchedImageSource,
            });

            CardElement.appendChild(ImageElement); // Appending img element inside the image card.
            Column.appendChild(CardElement); //Appending card element inside the column.
        }

        Row.appendChild(Column); //Appending column inside the row.
        SearchResultBox.appendChild(Row); //Appending row inside the search result box.

        ImageLowerIndex = ImageLowerIndex + ImagesPerColumn; // Update image select lower index.
        ImageUpperIndex = ImageUpperIndex + ImagesPerColumn; // Update image select upper index.
    }

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
