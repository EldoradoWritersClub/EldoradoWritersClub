window.addEventListener('load', function () {
})

function AddNavBarFunc(relativePath)
{
    document.getElementById('home_button').addEventListener('click', function () {
        window.open(relativePath + "./index.html", '_self');
    })

    document.getElementById('writing_pieces_button').addEventListener('click', function () {
        window.open(relativePath + "./works/index.html", '_self');
    })
}