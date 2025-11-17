console.log("our website's javascript file!");

// Header
fetch('header.html')
    .then(response => response.text())
    .then(html => document.getElementById("header").innerHTML = html);