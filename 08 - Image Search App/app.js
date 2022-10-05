import { URL, ClientId } from "./API.js";

// Targeted Elements.
const SearchButton = document.getElementById("search-button");
const InputField = document.getElementById("input-field");
const HelperTextBox = document.getElementById("helper-text");
const SearchResultBox = document.getElementById("box");
const ResetButton = document.getElementById("reset-button");

// Total number of images to show in UI after API response.
const NumberOfImagesPerPage = 30;

const ConfigureRequest = (SearchQuery) => {
    const getRequestPramsConfigure = `${URL}${SearchQuery}${ClientId}${NumberOfImagesPerPage}`;
    return getRequestPramsConfigure;
};

const ClearPreviousSearchResult = () => {
    const hasImagePlaceHolder = document.getElementById("images-placeholder");
    if (hasImagePlaceHolder) {
        hasImagePlaceHolder.remove();
    }
};

const AppendImagesInUI = (Images) => {
    //create a placeholder to hold all images
    const DivElement = document.createElement("div");
    DivElement.setAttribute("id", "images-placeholder");

    Images?.map((image) => {
        const FetchedImageSource = image?.urls?.regular; //feteched image source form API

        //create a img element
        const ImageElement = document.createElement("img");
        ImageElement.setAttribute("src", FetchedImageSource);

        DivElement.appendChild(ImageElement); //appending img element inside the image placeholder

        SearchResultBox.appendChild(DivElement); //appending image placeholder inside the SearchResultBox
    });
};

const FetchUserQuery = (UserQuery) => {
    fetch(ConfigureRequest(UserQuery))
        .then((response) => response.json())
        .then((fetechedQuery) => {
            HelperTextBox.innerText = "";
            const QueryResponse = fetechedQuery?.results;
            if (QueryResponse.length > 0) {
                AppendImagesInUI(QueryResponse);
            } else {
                HelperTextBox.innerText = "Result Not Found";
            }
        })
        .catch((err) => {
            alert("Something went wrong!!!", err);
        });
};

// Add event listeners.

SearchButton.addEventListener("click", function () {
    const UserQuery = InputField.value;

    if (UserQuery !== "") {
        ClearPreviousSearchResult();
        HelperTextBox.innerText =
            "Wait 🔄 Fetching your Result It will display here 👇  !!!";
        FetchUserQuery(UserQuery);
    } else {
        alert("Enter a Valid Input");
    }
});

ResetButton.addEventListener("click", function () {
    location.reload();
});
