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
const NavImageIcon = document.getElementById("nav-img-icon");
const Loader = document.getElementById("loader");
const GoogleLogo = document.getElementById("google-logo");

// Total number of images requested.
const NumberOfImagesPerPage = 30;

// Configure query params.
const ConfigureRequest = (SearchQuery) => {
    const getRequestPramsConfigure = `${URL}${SearchQuery}${ClientId}${NumberOfImagesPerPage}`;
    return getRequestPramsConfigure;
};

// Remove search results.
const ClearPreviousSearchResult = () => {
    const hasImagePlaceHolder = document.getElementById("images-placeholder");
    const hasImageSearchSuggestions = document.getElementById(
        "search-suggestion-image-holder"
    );

    if (hasImageSearchSuggestions) {
        hasImageSearchSuggestions.remove(); // Remove related search result images.
    }
    if (hasImagePlaceHolder) {
        hasImagePlaceHolder.remove(); // Remove all search result.
    }
    RemoveSearchSuggestions(); // Remove related search result section.
    RemoveErrorBox(); // Remove if any error screen present.
};

// Style active and inactive tabs in nav.
const StyleTabSwitch = (isActiveTab, TabPosition) => {
    if (isActiveTab) {
        NavImageIcon.src = "./Assets/Nav/ImageActive.svg";
        ItemsInNavBar[TabPosition].classList.add("ActiveItem");
    } else {
        NavImageIcon.src = "./Assets/Nav/Image.svg";
        ItemsInNavBar[TabPosition].classList.add("InActive");
    }
};

// Handle active and inactive tabs in nav.
const CheckTabStatusInNav = (clickedNavItem) => {
    const NavItems = ["All", "Image", "Videos", "News", "Books", "More"]; // Items present in nav bar.
    NavItems.map((NavItem, index) => {
        if (NavItem === clickedNavItem) {
            // Make tab active for "Image tab" and inactive for any other tabs.
            clickedNavItem === "Image"
                ? StyleTabSwitch(true, index)
                : StyleTabSwitch(false, index);
        } else {
            ItemsInNavBar[index].classList.remove("InActive");
            ItemsInNavBar[index].classList.remove("ActiveItem");
        }
    });
};

// Create dynamic html elements.
const CreateElement = (Element, Class, Attribute) => {
    const element = document.createElement(Element); // Create element.

    Class ? element.classList.add(Class) : null; // Add class to created element.
    Attribute ? element.setAttribute(Attribute.type, Attribute.name) : null; // Add Attribute to created element.

    return element; // Return created element.
};

// Handle error popup.
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

// Remove error popup from UI.
const RemoveErrorBox = () => {
    ErrorTextBox.style.display = "none";
    ResultNotFoundModal.style.display = "none";
    SomethingWentWrongModal.style.display = "none";
};

// Handle add loader in UI.
const AddLoader = () => {
    Loader.style.display = "grid";
};

// Handle remove loader form UI.
const RemoveLoader = () => {
    Loader.style.display = "none";
};

// Handle remove related search result from UI.
const RemoveSearchSuggestions = () => {
    SuggestionCardSection.style.display = "none";
};

// Add related search result section in UI.
const AddSearchSuggestions = (Images, UserQuery) => {
    const SuggestionImageHolder = CreateElement(
        "div",
        "SuggestionImageHolder",
        { type: "id", name: "search-suggestion-image-holder" }
    );

    // Append related search result images in search suggestions card.
    Images?.map((item, index) => {
        const SuggestionCard = CreateElement("div", "SuggestionCard", {
            type: "id",
            name: "suggestion-card",
        });

        if (index <= 4) {
            const ImageSrc = item?.urls?.thumb;
            const ImageDescriptionText = item?.tags[0]?.title;
            const Tag = ImageDescriptionText
                ? ImageDescriptionText?.split(" ")[0]
                : UserQuery;

            const ImageText = CreateElement("div", "SuggestionText");
            const h3 = CreateElement("h3");
            h3.innerText = `${Tag}`;
            ImageText.appendChild(h3);

            const SuggestionImage = CreateElement("div", "SuggestionImage");
            const ImageElement = CreateElement("img", "", {
                type: "src",
                name: ImageSrc,
            });

            SuggestionImage.appendChild(ImageElement);
            SuggestionCard.appendChild(SuggestionImage);
            SuggestionCard.appendChild(ImageText);
            SuggestionImageHolder.appendChild(SuggestionCard);
            SuggestionCardSection.appendChild(SuggestionImageHolder);
        }
    });

    SuggestionImageHolder.style.display = "flex";
    SuggestionImageHolder.style.gap = "2rem";
    SuggestionCardSection.style.display = "block";
};

// Add images in UI.
const AppendImagesInUI = (Images, UserQuery) => {
    // Create UI layout for image gallery.
    const TotalColumnsInUI = 3;
    const TotalImages = Images?.length;
    const ImagesPerColumn = TotalImages / TotalColumnsInUI;

    let ImageLowerIndex = 0;
    let ImageUpperIndex = ImagesPerColumn;

    const Row = CreateElement("div", "Row", {
        type: "id",
        name: "images-placeholder",
    });

    AddSearchSuggestions(Images, UserQuery); // Create related search result section.

    // Create gallery view for actual search result section.
    for (let i = 1; i <= TotalColumnsInUI; i++) {
        const Column = CreateElement("div", "Column");

        for (let j = ImageLowerIndex; j < ImageUpperIndex; j++) {
            const FetchedImageSource = Images[j]?.urls?.regular; // Feteched image source form API.

            if (FetchedImageSource) {
                const CardElement = CreateElement("div", "SearchImageCard", {
                    type: "id",
                    name: `search-image-card-${j}`,
                });

                const ImageElement = CreateElement("img", "", {
                    type: "src",
                    name: FetchedImageSource,
                });

                CardElement.appendChild(ImageElement); // Appending img element inside the image card.
                Column.appendChild(CardElement); // Appending card element inside the column.
            }
        }

        Row.appendChild(Column); // Appending column inside the row.
        SearchResultBox.appendChild(Row); // Appending row inside the search result box.

        ImageLowerIndex = ImageLowerIndex + ImagesPerColumn; // Update image select lower index.
        ImageUpperIndex = ImageUpperIndex + ImagesPerColumn; // Update image select upper index.
    }

    RemoveLoader();
};

// Handle API call.
const FetchUserQuery = (UserQuery) => {
    fetch(ConfigureRequest(UserQuery))
        .then((response) => response.json())
        .then((fetechedQuery) => {
            const QueryResponse = fetechedQuery?.results;

            if (QueryResponse.length > 0) {
                AppendImagesInUI(QueryResponse, UserQuery);
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

// Handle initiate search.
const InitiateUserQuerySearch = (UserQuery) => {
    if (UserQuery !== "") {
        ClearPreviousSearchResult();
        CheckTabStatusInNav("Image"); // Make image as default active item in nav.
        AddLoader();
        FetchUserQuery(UserQuery);
    }
};

// Add event listener for search button.
SearchButton.addEventListener("click", () => {
    const UserQuery = InputField.value;
    InitiateUserQuerySearch(UserQuery);
});

// Add event listener for enter button.
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
            CheckTabStatusInNav(ClickedElement[1]);
        }
    });
}

// Add event listener for google logo.
GoogleLogo.addEventListener("click", () => {
    window.location.reload();
});
