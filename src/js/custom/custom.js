// self executing function here
(function() {
    var data = '';
    var limit = '0';
    var buttons = '';
    var bars = '';

    // Call API
    var r = new XMLHttpRequest();
    r.open("GET", "json/endpoint.json", true);
    r.onreadystatechange = function () {
        if (r.readyState != 4 || r.status != 200) return;
        // console.log(r.responseText);
        data = JSON.parse(r.responseText);
        limit = data.limit;
        buttons = data.buttons;
        bars = data.bars;

        // Append Buttons
        var buttonLength = buttons.length;
        for(var i=0; i< buttonLength; i++) {
            appendButton(buttons[i], i+1);
        }

        // Append Progress Bars
        var barsLength = bars.length;
        for(var j=0; j< barsLength; j++) {
            appendDD(j+1);
            appendProgressBars(bars[j], limit);
        }

        var buttonClass = document.getElementsByClassName("button");
        var filledBar = document.getElementsByClassName('filled-bar');

        for (var k = 0; k < buttonClass.length; k++) {
            // buttonClass[i].id='x'+i;
            buttonClass[k].addEventListener('click', function() {
                var e = document.getElementById("dropdown");
                var strUser = e.options[e.selectedIndex].value;
                var progressBar = document.getElementsByClassName('progress-bar')[strUser-1];
                var buttonValue = parseFloat(this.value);
                var currentDataValue = parseFloat(progressBar.childNodes[0].getAttribute('data-value')) + buttonValue;


                currentDataValue = currentDataValue < 0 ? 0 : currentDataValue;             // min limit
                currentDataValue = currentDataValue > limit ? limit : currentDataValue;     // max limit

                progressBar.childNodes[0].setAttribute('data-value', currentDataValue);
                progressBar.childNodes[0].style.width = currentDataValue*100/limit + '%';
                progressBar.childNodes[1].innerHTML = parseInt(currentDataValue*100/limit) + '%';

                if(currentDataValue == limit) {
                    filledBar[strUser-1].style.backgroundColor = "red";
                } else {
                    filledBar[strUser-1].style.backgroundColor = "orange";
                }
            }, false);

        }
    };
    r.send();

    // Append Progress Bars
    function appendProgressBars(value, limit) {
        if(value > 100) {
            value = 100;
        }
        var dataValue = limit*value/100;
        var d1 = document.getElementById('progressBars');
        d1.insertAdjacentHTML('beforeend', '<div class="progress-bar"><div class="filled-bar" data-value="'+dataValue+'" style="width: '+value+'%"></div><span class="amount">'+value+'%</span></div>');

    }

    // Append Dropdown
    function appendDD(index) {
        var option = document.createElement("option");
        option.text = "Progress " + index;
        option.value = index;
        var select = document.getElementById("dropdown");
        select.appendChild(option);
    }

    // Append Buttons
    function appendButton(value, index) {
        var controls = document.getElementById('controls');
        var buttonnode= document.createElement('input');

        buttonnode.setAttribute('type','button');
        buttonnode.setAttribute('name','button'+ index);
        buttonnode.setAttribute('value', value);
        buttonnode.setAttribute('class', 'button');

        controls.appendChild(buttonnode);
    }
})();
