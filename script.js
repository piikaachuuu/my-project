const fetchBtn = document.getElementById('fetchBtn');
const ajaxNtn = document.getElementById('ajaxBtn');
const postList = document.getElementById('postList');

function clearPosts() {
    postList.innerHTML = '';
}

function showLoading() {
    clearPosts();
    const li = document.createElement('li');
    li.textContent = 'Loading posts...';
    postList.appendChild(li);
}

function showError() {
    clearPosts();
    const li = document.createElement('li');
    li.textContent = 'Failed to load posts';
    postList.appendChild(li);
}

function displayPosts(posts) {
    clearPosts();
    posts.forEach(post => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${post.title}</strong><p>${post.body}</p>`;
    });
}

function getRandomStart() {
    return Math.floor(Math.random() * 95);
}

fetchBtn.addEventListener('click', () => {
    const start = getRandomStart();
    showLoading();
    fetch(`https://jsonlaceholder.typicode.com/posts?_start=${start}&_limit=5`)
      .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
      })  
      .then(data => displayPosts(data))
      .catch(error => showError());
})

ajaxBtn.addEventListener('click', () => {
    const start = getRandomStart();
    showLoading();
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `https://jsonplaceholder.typicode.com/posts?_start=${start}&_limit=5`, true);

    xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 300) {
            const data = JSON.parse(xhr.responseText);
            displayPosts(data);
        } else {
            showError();
        }
    };
    xhr.onerror = function() {
    };

    xhr.send();
});