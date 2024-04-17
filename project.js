document.addEventListener("DOMContentLoaded", function () {
    const postBlocksContainer = document.querySelector(".posts-container");
    const tagButtons = document.querySelectorAll(".tag-button");
    const loadMoreButton = document.getElementById("loadMoreButton");
    const postBlocks = document.querySelectorAll(".post");

    let selectedTag = "all"; // Initially, "all" tag is selected
    let currentPage = 1;
    const itemsPerPage = 3;

    // Function to filter posts by a specific tag
    function filterPostsByTag(tag) {
        selectedTag = tag;
        currentPage = 1; // Reset current page when changing tags

        // Clear existing posts in the container
        postBlocksContainer.innerHTML = '';

        const filteredPostBlocks = Array.from(postBlocks).filter((block) => {
            const tags = block.getAttribute("data-tags").split(",");
            return selectedTag === "all" || tags.includes(selectedTag);
        });

        showPostsForPage(currentPage, filteredPostBlocks);
        updateLoadMoreButton(filteredPostBlocks);
    }

    // Function to display posts for a specific page
    function showPostsForPage(pageNumber, postBlocks) {
        const startIndex = (pageNumber - 1) * itemsPerPage;
        const endIndex = Math.min(startIndex + itemsPerPage, postBlocks.length);

        for (let i = startIndex; i < endIndex; i++) {
            postBlocksContainer.appendChild(postBlocks[i].cloneNode(true));
        }
    }

    // Function to update the visibility of the load more button
    function updateLoadMoreButton(filteredPostBlocks) {
        const visiblePostCount = filteredPostBlocks.length;

        if (visiblePostCount <= currentPage * itemsPerPage) {
            loadMoreButton.style.display = "none";
        } else {
            loadMoreButton.style.display = "block";
        }
    }

    // Function to load more posts
    function loadMorePosts() {
        currentPage++;
        const filteredPostBlocks = Array.from(postBlocks).filter((block) => {
            const tags = block.getAttribute("data-tags").split(",");
            return selectedTag === "all" || tags.includes(selectedTag);
        });

        showPostsForPage(currentPage, filteredPostBlocks);
        updateLoadMoreButton(filteredPostBlocks);
    }

    // Event listeners for tag buttons
    tagButtons.forEach((button) => {
        button.addEventListener("click", () => {
            tagButtons.forEach((btn) => btn.classList.remove("active"));
            button.classList.add("active");
            const tag = button.getAttribute("data-tag");
            filterPostsByTag(tag);
        });
    });

    // Event listener for the load more button
    loadMoreButton.addEventListener("click", loadMorePosts);

    // Initial setup
    filterPostsByTag(selectedTag);
});