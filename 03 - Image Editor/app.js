// Targeted Elements
const DragArea = document.querySelector(".drag-area");
const BrowseFileButton = document.getElementById("browse-file");
const FilePicker = document.getElementById("file-picker");
const store = document.querySelectorAll(".controls input");

// Accepted file type
const AcceptedFileType = ["image/png", "image/jpeg"];

const fileSupportError =
    "Error: This file format is not supported. Please upload a file in a supported format.";

function edit() {
    const suffix = this.dataset.sizing || "";
    document.documentElement.style.setProperty(
        `--${this.name}`,
        this.value + suffix
    );
}
const handleImageUpload = (file) => {
    console.log(file);
};
const handleUnSupportedFile = (error) => {
    alert(error);
};

//event listeners
store.forEach((input) => input.addEventListener("change", edit));

store.forEach((input) => input.addEventListener("mousemove", edit));

BrowseFileButton.addEventListener("click", () => {
    FilePicker.click();
});

FilePicker.addEventListener("change", () => {
    const file = FilePicker.files[0];

    console.log(file);

    file && AcceptedFileType.includes(file.type)
        ? handleImageUpload(file)
        : handleUnSupportedFile(fileSupportError);
});
