$.cookie.json = true;

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

function checkbox_fn() {
    var cookie = $.cookie('bookmarks');
    var id = $(this).data('amuse-id') + '';
    if(!cookie) cookie = {};
    cookie[id] = undefined;
    if(this.checked) {
        cookie[id] = 1;
    }
    $.cookie('bookmarks', cookie);
}

function clear_fn() {
    $.cookie('bookmarks', '{}');
    $('input:checkbox[data-amuse-id]:checked').click();
}