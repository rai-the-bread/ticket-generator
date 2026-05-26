const ticketForm = document.querySelector("#ticket-form");
const avatarPreview = document.querySelector("#avatar-preview");
const avatarInput = document.querySelector("#avatar");
const previewButtons = document.querySelector(".preview-buttons");
const dropZoneIcon = document.querySelector(".drop-zone-icon");
const dropZoneText = document.querySelector(".drop-text");
const dropZone = document.querySelector("#drop-zone");

// drag and drop handler
function dropHandler(event) { 
    console.log("drop handler running");
    event.preventDefault();
    avatarInput.files = event.dataTransfer.files;
    showPreview({ target: avatarInput });
};

// when a file is uploaded, show a preview of the avatar and show the Remove Image and Change Image buttons
function showPreview(event) {
    console.log("show preview function running")
    
    // get avatar image and convert to url
    let avatarFile = event.target.files[0];
    let avatarHtml = '';
    if (avatarFile && avatarFile.size > 0) {
        let avatarURL = URL.createObjectURL(avatarFile);
        avatarHtml = `<img src="${avatarURL}" alt="Avatar" class="avatar-preview">`;
    }

    // show preview of the avatar
    avatarPreview.innerHTML = avatarHtml;

    // remove any existing items in drag and drop box
    dropZoneIcon.classList.add("hidden");
    dropZoneText.classList.add("hidden");

    // show remove image button
  previewButtons.classList.remove("hidden");
  dropZone.classList.add("orange-border");
    // show change image button
}

// TO DO: error handling for all form inputs 

// TO DO: handle form submission
function onSubmit(event) {
	console.log("function is running");
	event.preventDefault();
	const data = new FormData(event.target);
    const dataObject = Object.fromEntries(data.entries());
    console.log(dataObject)
    // save variables from form
    const { fullName, email, github, avatarURL } = getTicketData(dataObject);
    console.log('form data:', fullName, email, github, avatarURL);
	ticketForm.reset();
};

function getTicketData(dataObject) {
    let fullName = dataObject["full-name"];
    let email = dataObject.email;
    let github = dataObject.github;
    // get image file that was uploaded, convert to a URL
    let avatarFile = dataObject.avatar;
    let avatarHtml = '';
    let avatarURL = '';
    if (avatarFile && avatarFile.size > 0) {
        avatarURL = URL.createObjectURL(avatarFile);
    }
    // return data from form
    return { fullName, email, github, avatarURL };
}

// event listeners
ticketForm.addEventListener("submit", onSubmit);
avatarInput.addEventListener("change", showPreview);
dropZone.addEventListener("drop", dropHandler);

// Boilerplate code from https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API/File_drag_and_drop to prevent default behavior for drag and drop
window.addEventListener("drop", (e) => {
  if ([...e.dataTransfer.items].some((item) => item.kind === "file")) {
    e.preventDefault();
  }
});
dropZone.addEventListener("dragover", (e) => {
  const fileItems = [...e.dataTransfer.items].filter(
    (item) => item.kind === "file",
  );
  if (fileItems.length > 0) {
    e.preventDefault();
    if (fileItems.some((item) => item.type.startsWith("image/"))) {
      e.dataTransfer.dropEffect = "copy";
    } else {
      e.dataTransfer.dropEffect = "none";
    }
  }
});

window.addEventListener("dragover", (e) => {
  const fileItems = [...e.dataTransfer.items].filter(
    (item) => item.kind === "file",
  );
  if (fileItems.length > 0) {
    e.preventDefault();
    if (!dropZone.contains(e.target)) {
      e.dataTransfer.dropEffect = "none";
    }
  }
});