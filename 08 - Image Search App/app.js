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

// Total number of images to show in UI after API response.
const NumberOfImagesPerPage = 50;

const ConfigureRequest = (SearchQuery) => {
    const getRequestPramsConfigure = `${URL}${SearchQuery}${ClientId}${NumberOfImagesPerPage}`;
    return getRequestPramsConfigure;
};

const ClearPreviousSearchResult = () => {
    SuggestionCardSection.style.display = "none";
    const hasImagePlaceHolder = document.getElementById("images-placeholder");
    if (hasImagePlaceHolder) {
        hasImagePlaceHolder.remove();
    }
    //if any error screen present
    RemoveErrorBox();
};

const CheckActiveItemInNav = (clickedNavItem) => {
    const NavItems = ["All", "Image", "Videos", "News", "Books", "More"];
    NavItems.map((NavItem, index) => {
        if (NavItem === clickedNavItem) {
            ItemsInNavBar[index].classList.add("AciveItem");
        } else {
            ItemsInNavBar[index].classList.remove("AciveItem");
        }
    });
};

const AppendImagesInUI = (Images) => {
    //create a placeholder to hold all images
    const DivElement = document.createElement("div");
    DivElement.setAttribute("id", "images-placeholder");
    DivElement.classList.add("SearchImagesPlaceholder");

    Images?.map((image) => {
        const FetchedImageSource = image?.urls?.regular; //feteched image source form API

        //Crad to hold a single image
        const CardElement = document.createElement("div");
        CardElement.setAttribute("id", "search-image-card");
        CardElement.classList.add("SearchImageCard");

        //create a img element
        const ImageElement = document.createElement("img");
        ImageElement.setAttribute("src", FetchedImageSource);

        CardElement.appendChild(ImageElement); //appending img element inside the image card
        DivElement.appendChild(CardElement); // appending image card inside the image placeholder
        SearchResultBox.appendChild(DivElement); //appending image placeholder inside the SearchResultBox
    });
};

const ShowErrorBox = (ErrorCode) => {
    ErrorTextBox.style.display = "block";
    if (ErrorCode === 4000) {
        ResultNotFoundModal.style.display = "flex";
    }
    if (ErrorCode === 5000) {
        SomethingWentWrongModal.style.display = "grid";
    }
};

const RemoveErrorBox = () => {
    ErrorTextBox.style.display = "none";
    ResultNotFoundModal.style.display = "none";
    SomethingWentWrongModal.style.display = "none";
};

const FetchUserQuery = (UserQuery) => {
    fetch(ConfigureRequest(UserQuery))
        .then((response) => response.json())
        .then((fetechedQuery) => {
            const QueryResponse = fetechedQuery?.results;
            if (QueryResponse.length > 0) {
                SuggestionCardSection.style.display = "flex";
                AppendImagesInUI(QueryResponse);
            } else {
                const ErrorCode = 4000; // status code for search result not found
                ShowErrorBox(ErrorCode);
            }
        })
        .catch((err) => {
            const ErrorCode = 5000; // status code for fetch data failed
            ShowErrorBox(ErrorCode);
        });
};

const InitiateUserQuerySearch = (UserQuery) => {
    if (UserQuery !== "") {
        ClearPreviousSearchResult();
        // ErrorTextBox.innerText =
        //     "Wait 🔄 Fetching your Result It will display here 👇  !!!";
        FetchUserQuery(UserQuery);
    } else {
        alert("Enter a Valid Input");
    }
};

//Add default active item in nav
(() => {
    CheckActiveItemInNav("Image");
})();

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

//Add event listeners to each items in nav
for (let i = 0; i < ItemsInNavBar.length; i++) {
    ItemsInNavBar[i].addEventListener("click", () => {
        const ClickedElement = ItemsInNavBar[i].className.split(" ");
        CheckActiveItemInNav(ClickedElement[1]);
    });
}
