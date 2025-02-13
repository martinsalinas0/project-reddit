let posts = [];

const renderPosts = () => {
  const allPosts = document.getElementById("all-posts");
  allPosts.innerHTML = "";

  posts.forEach((post, index) => {
    let postDiv = document.createElement("div");
    postDiv.classList.add("list-group-item", "post-in-list");

    let postTextSpan = document.createElement("span");
    postTextSpan.innerHTML = `${post.postText} - Posted By: ${post.userName}`;

    let removeEntirePostBtn = document.createElement("button");
    removeEntirePostBtn.classList.add(
      "btn",
      "btn-link",
      "remove-post-btn",
      "btn-xs"
    );
    removeEntirePostBtn.innerHTML = `<span class="glyphicon glyphicon-remove"></span>`;

    removeEntirePostBtn.addEventListener("click", () => {
      posts.splice(index, 1);
      renderPosts();
    });

    let commentSectionContainer = document.createElement("div");
    commentSectionContainer.classList.add("cmnt-container");

    let commentSectionDiv = document.createElement("div");
    commentSectionDiv.classList.add("cmnt-section");
    commentSectionDiv.style.display = "none";

    let commentTextInput = document.createElement("input");
    commentTextInput.type = "text";
    commentTextInput.classList.add("form-control");
    commentTextInput.placeholder = "Comment Text";

    let commentUserInput = document.createElement("input");
    commentUserInput.type = "text";
    commentUserInput.classList.add("form-control");
    commentUserInput.placeholder = "Your Name";

    let submitCmntBtn = document.createElement("button");
    submitCmntBtn.classList.add("btn", "btn-primary", "submit-cmt-btn");
    submitCmntBtn.innerText = "Submit Comment";

    const addComment = () => {
      let commentUserName = commentUserInput.value;
      let commentText = commentTextInput.value;
      let commentDiv = document.createElement("div");
      commentDiv.classList.add("comment-on-post");

      let removeCmntBtn = document.createElement("button");
      removeCmntBtn.classList.add(
        "btn",
        "btn-link",
        "remove-cmnt-btn",
        "btn-xs"
      );
      removeCmntBtn.innerHTML = `<span class="glyphicon glyphicon-remove"></span>`;
      let commentSpan = document.createElement("span");
      commentSpan.innerText = `${commentText} - Commented by: ${commentUserName}`;
      removeCmntBtn.addEventListener("click", () => {
        commentSectionContainer.removeChild(commentDiv);
      });

      commentDiv.appendChild(commentSpan);
      commentDiv.appendChild(removeCmntBtn);
      commentSectionContainer.appendChild(commentDiv);
      commentTextInput.value = "";
      commentUserInput.value = "";
    };

    submitCmntBtn.addEventListener("click", addComment);
    postDiv.addEventListener("click", (e) => {
      if (
        e.target !== commentTextInput &&
        e.target !== commentUserInput &&
        e.target !== submitCmntBtn
      ) {
        if (commentSectionDiv.style.display === "none") {
          commentSectionDiv.style.display = "block";
        } else {
          commentSectionDiv.style.display = "none";
        }
      }
    });

    commentSectionDiv.appendChild(commentTextInput);
    commentSectionDiv.appendChild(commentUserInput);
    commentSectionDiv.appendChild(submitCmntBtn);
    commentSectionDiv.appendChild(commentSectionContainer);
    postDiv.appendChild(removeEntirePostBtn);
    postDiv.appendChild(postTextSpan);
    postDiv.appendChild(commentSectionDiv);
    allPosts.appendChild(postDiv);
  });
};

document.getElementById("submit-btn").addEventListener("click", () => {
  let postText = document.getElementById("post-text-input").value;
  let userName = document.getElementById("user-name-input").value;
  posts.push({ postText: postText, userName: userName });
  document.getElementById("post-text-input").value = "";
  document.getElementById("user-name-input").value = "";

  renderPosts();
});
