function search_fn() {
    var val = $(this).val();
    $.mobile.changePage(val == '' ? '/' : ('/items/search-' + val), {
        transition: 'slide'
    });
}

function exhibition_fn() {
    var val = $(this).val();
    $.mobile.changePage(val == 'none' ? '/' : ('/items/exhibition-' + val), {
        transition: 'slide'
    });
}

function author_fn() {
    var val = $(this).val();
    $.mobile.changePage(val == 'none' ? '/' : ('/items/author-' + val), {
        transition: 'slide'
    });
}

function section_fn() {
    var val = $(this).val();
    $.mobile.changePage(val == 'none' ? '/' : ('/items/section-' + val), {
        transition: 'slide'
    });
}

function check_fn() {
    
}