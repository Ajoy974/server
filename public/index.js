let link = document.getElementById("gotoP");
link.addEventListener('click', () => {
    let input = document.getElementById('title').value;
    link.href = `/tasks/${input}`
})