const ticketForm = document.querySelector("#ticket-form");
const avatarPreview = document.querySelector("#preview");

// TO DO: code to make drag and drop work. Refer to https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API/File_drag_and_drop

// TO DO: when a file is uploaded, show a preview of the avatar and show the Remove Image and Change Image buttons

// TO DO: error handling for all form inputs 

// TO DO: handle form submission
function onSubmit(event) {
	console.log("function is running");
	event.preventDefault();
	const data = new FormData(event.target);
    const dataObject = Object.fromEntries(data.entries());
    console.log(dataObject)
    const { fullName, email, github, avatarHtml } = getTicketData(dataObject);
    avatarPreview.innerHTML = avatarHtml;
	ticketForm.reset();
};

function getTicketData(dataObject) {
    let fullName = dataObject["full-name"];
    let email = dataObject.email;
    let github = dataObject.github;
    // get image file that was uploaded, convert to a URL
    let avatarFile = dataObject.avatar;
    let avatarHtml = '';
    if (avatarFile && avatarFile.size > 0) {
        let avatarURL = URL.createObjectURL(avatarFile);
        avatarHtml = `<img src="${avatarURL}" alt="${fullName} Avatar" class="avatar-preview">`;
    }
    // testing
    preview.innerHTML = avatarHtml;
    return { fullName, email, github, avatarHtml };
}

ticketForm.addEventListener("submit", onSubmit);

// {avatar: File, full-name: 'Rai Dorzback', email: 'rai@anniecannons.com', github: 'rai-the-bread'}