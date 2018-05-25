var squareMap = "<div class='square'></div>";
var lineMap = "<div class='line'></div>";

const WIDTH = 15;
const HEIGHT = 15;

function createMap(height,width) {
	for (var i = 0; i < height; ++i ) {
		$('#map').append(lineMap);
	}
	for(var j = 0; j < width; ++j) {
		$('.line').append(squareMap);
	}
	var isDown = false;
	$(document).mousedown(function(){ 
		isDown = true;
	});

	$(document).mouseup(function(){ 
		isDown = false;
	});

	$('.square').on('mouseover', function () {
		if(isDown) {
			$(this).css('background-color',$('#color').val());
		}
	})

	$('.square').click(function () {
		//$(this).css('background-color',$('#color').val());
		//alert("H:" + $(this).index() + " V:" + $(this).parent().index());
		$('.square:nth-child('+ ($(this).index() + 1) + ')').css('background-color',$('#color').val());
		$(this).siblings().css('background-color',$('#color').val());
	})

//solution by: https://gist.github.com/mjackson/5311256
	function getHue(colorText) {
	var rgb = colorText;
	rgb = rgb.substring(4, rgb.length-1)
	         .replace(/ /g, '')
	         .split(',');
	  r = rgb[0];
	  g = rgb[1];
	  b = rgb[2];
	  r /= 255, g /= 255, b /= 255;

	  var max = Math.max(r, g, b), min = Math.min(r, g, b);
	  var h,s,l = (max + min) / 2;;

	  if (max == min) {
	    h = s = 0; // achromatic
	  } else {
	    var d = max - min;
	    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
	    switch (max) {
	      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
	      case g: h = (b - r) / d + 2; break;
	      case b: h = (r - g) / d + 4; break;
	    }

	    h /= 6;
	  }

	  return s;
	}


	function getRGB(colorText) {
		var rgb = colorText;

		rgb = rgb.substring(4, rgb.length-1)
		         .replace(/ /g, '')
		         .split(',');
		return((+rgb[0])*1000000 + (+rgb[1])*1000 + (+rgb[2]) );
	}

	function compareRGB(group,i,color) {
		return (+getRGB($(group).eq(i).css('background-color')) < +getRGB($(group).eq(i+1).css('background-color')));
	}

	function compareHUE(group,i,color) {
		return (+getHue($(group).eq(i).css('background-color')) < +getHue($(group).eq(i+1).css('background-color')));
	}


	function orderByColor(color) {
		/**/
		var all = $('.square');
		var fim = false;
		var total;
		/*
			$(all).sort(function(a,b) {
				console.log(getRGB($(a).css('background-color'))[0], ' > ',getRGB($(b).css('background-color'))[0], '? ', +getRGB($(a).css('background-color'))[0] >  +getRGB($(b).css('background-color'))[0]);
				return(+getRGB($(a).css('background-color'))[0] > +getRGB($(b).css('background-color'))[0]);
			});
*/
/*
			all = $('.square');
			total = $(all).length - 1;
			while (!fim && total > 0) {
				fim=true;
				all = $('.square');
				for (var i=0; i < total; ++i) {
					if (compareHUE(all,i,color)) {
						fim=false;
						$(all).eq(i+1).after('<div id="tmp">');
						$(all).eq(i+1).insertBefore($(all).eq(i));
						$(all).eq(i).insertBefore('#tmp');
						$('#tmp').remove();
					}
				}
			}*/
			all = $('.square');
			total = $(all).length - 1;
			while (!fim && total > 0) {
				fim=true;
				all = $('.square');
				for (var i=0; i < total; ++i) {
					if (compareRGB(all,i,color)) {
						fim=false;
						$(all).eq(i+1).after('<div id="tmp">');
						$(all).eq(i+1).insertBefore($(all).eq(i));
						$(all).eq(i).insertBefore('#tmp');
						$('#tmp').remove();
					}
				}
			}
			
	}

	$("#ordenar").click(orderByColor);

	function color(){
		//$('.square').eq(Math.floor(Math.random()*(HEIGHT*WIDTH) + 1)).css('background-color','rgb('+ Math.floor(Math.random()*255) + ','+ Math.floor(Math.random()*255) +','+ Math.floor(Math.random()*255)+')');
		var test;
		//test = $('.square:not(.filled)').eq(Math.floor(Math.random()*($('.square:not(.filled)').length ))).css('background-color','rgb('+ Math.floor(Math.random()*255) + ','+ Math.floor(Math.random()*255) +','+ 0 +')');
		var value = Math.floor(Math.random()*255);
		test = $('.square:not(.filled)').eq(Math.floor(Math.random()*($('.square:not(.filled)').length ))).css('background-color','rgb('+ value + ','+ value +','+ value +')');
		test.addClass('filled');
		if ($('.square:not(.filled)').length > 0) {
			setTimeout(color,0);
		}
	}

	color();


}



$(function() {
	createMap(HEIGHT,WIDTH);
});


function move(x,y) {
	$('.line').eq(y).children().eq(x).css('background-color',$('#color').val());
}

var pos_x = 0;
var pos_y = 0;
$(document).keydown(function(e) {
    switch(e.which) {
        case 37: move(--pos_x,pos_y);//left
        break;

        case 38: move(pos_x,--pos_y);// up
        break;

        case 39: move(++pos_x,pos_y);// right
        break;

        case 40: move(pos_x,++pos_y);// down
        break;

        default: return; // exit this handler for other keys
    }
    e.preventDefault(); // prevent the default action (scroll / move caret)
});
