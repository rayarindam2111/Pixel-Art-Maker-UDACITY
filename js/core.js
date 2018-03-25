var color = "#f00"; //default color (red)
var gridSize = [15, 15]; //default grid size [width , height]

//jQuery wrap
$(function () {
    //function called when user submits size
    function makeGrid() {
        gridSize[0] = $('#gridWidth').val();
        gridSize[1] = $('#gridHeight').val();
        $('#container').empty();
        for (let r = 0; r < gridSize[1]; ++r) {
            let row = $('<div class="row"></div>');
            $('#container').append(row);
            for (let c = 0; c < gridSize[0]; ++c) {
                row.append('<div class="col backcolor" clicked="0"></div>');
            }
        }
    }

    //event listener for form submit
    $("#gridSizeSelect").submit(function (event) {
        event.preventDefault();
        makeGrid();
    });

    //event listener for color picker
    $('#colorPicker').change(function () {
        color = $('#colorPicker').val();
    });

    //event delegation for div's inside container
    $('#container').on('click', '.col', function () {
        if ($(this).attr('clicked') === '0') {
            $(this).attr('clicked', '1');
            $(this).removeClass('backcolor');
            $(this).css('background-color', color);
        } else {
            $(this).attr('clicked', '0');
            $(this).addClass('backcolor');
        }
    });

    $('#openAsImage').click(function convertToImage(){
        var cellHeight = 22, cellWidth = 22;
        var canvas = document.createElement("canvas");
        var ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, cellWidth * gridSize[0], cellHeight * gridSize[1]);
        canvas.width = cellWidth * gridSize[0];
        canvas.height = cellHeight * gridSize[1];
        var rows = $('#container').children();
        for(let i=0, x=0, y=0; i<rows.length; ++i){
            var cols = $(rows[i]).children();
            for(let j=0, x=0; j<cols.length; ++j){
                ctx.fillStyle = "rgba(8, 74, 14, .8)";
                ctx.fillRect( x, y, cellWidth, cellHeight );
                ctx.fillStyle = $(cols[j]).css('background-color');
                ctx.fillRect( x + 1, y + 1, cellWidth -2 , cellHeight -2);
                x += cellWidth;
            }
            y += cellHeight;
        }
        var result = canvas.toDataURL("image/png");
        var iframe = '<img src="' + result + '">';
        var x = window.open();
        x.document.open();
        x.document.write(iframe);
        x.document.close();
    });

    makeGrid();

});