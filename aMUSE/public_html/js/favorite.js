(function (){
	var buttons = document.querySelectorAll('.starbutton > img');
	var containers = document.querySelectorAll('.starbutton');
        var content = document.querySelectorAll('.thumbnail');
	var startcolor = containers.item(0).style.backgroundColor;
	var empty = '/static/img/emptystar.png', full = '/static/img/fullstar.png';
	for(var i = 0; i < buttons.length; i++) {
		var item = buttons.item(i);
                var div = content.item(i);
		item.starStatus = false;
		item.src = empty;
		containers.item(i).addEventListener('click', function(e) {
			var star = e.currentTarget.querySelector('img');
                        
			if(star.starStatus){
				star.src = empty;
				e.currentTarget.style.backgroundColor = startcolor;
                                e.currentTarget .parentNode.querySelector("a").style.backgroundColor = startcolor;
			}
			else{

				star.src = full;
				e.currentTarget .style.backgroundColor = "#6495ED";
                                e.currentTarget .parentNode.querySelector("a").style.backgroundColor = "#6495ED";
			}
			star.starStatus = !star.starStatus;
		});
	}
})();