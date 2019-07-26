$(() => {
    $('#books').on('click', '.btn-danger', (ev) => {

        let idToDel = $(ev.target).attr('data-id')
        deleteBook(idToDel)
    })

    function fetchBooks() {
        $.ajax({
            url: "http://127.0.0.1:8000/book/",
            type: "GET",
            dataType: "json"
        })
            .done((data) => {
                $("#books tbody").html("")
                $(data).each((idx, el) => {
                    let book = $(`<tr>
                    <th scope="row">${idx + 1}</th>
                        <td>${el.title}</td>
                        <td>${el.author}</td>
                        <td>${el.isbn}</td>
                        <td>${el.publisher}</td>
                        <td><button class="btn btn-danger" data-id="${el.id}">Usuń</button></td>
                    </tr>`)
                    $("#books tbody").append(book)
                })
            })
    }
    function deleteBook(id) {

        $.ajax({
            url: "http://127.0.0.1:8000/book/" + id,
            type: "DELETE",
            dataType: "json"
        }).done((result) => {

            fetchBooks()
        })
    }

    fetchBooks()

})