function search_fn() {
    var val = $(this).val();
    $.mobile.changePage('/admin/items/search/' + val, {
        transition: 'slide'
    });
}

function exhibition_fn() {
    var val = $(this).val();
    $.mobile.changePage('/admin/items/exhibition/' + val, {
        transition: 'slide'
    });
}

function author_fn() {
    var val = $(this).val();
    $.mobile.changePage('/admin/items/author/' + val, {
        transition: 'slide'
    });
}

function section_fn() {
    var val = $(this).val();
    $.mobile.changePage('/admin/items/section/' + val, {
        transition: 'slide'
    });
}