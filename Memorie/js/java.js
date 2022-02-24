var memory_array = ['1', '1', '2', '2', '3', '3', '4', '4', '5', '5', '6', '6', '7', '7', '8', '8'];
var memmory_array_shuffled = [];
var values = [];
var card_ids = [];
var cards_flipped = 0;
var button = document.getElementById("b");

function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
  }
  return array;
}

function getradiovalue() {
    var radio = document.getElementsByName("a");
    var result;
    for (var i = 0; i < radio.length; i++) {
        if (radio[i].checked) {
            result = radio[i].value;
        }
    }
    return parseInt(result);
}

newboard();

button.onclick = newboard;

function newboard() {

    memmory_array_shuffled = [];

    if (getradiovalue() === 4) {
        memmory_array_shuffled = shuffleArray(memory_array);
    }
    document.getElementById('memory_board').innerHTML = "";
    cards_flipped = 0;
    var board = '';
    for (var i = 0; i < memmory_array_shuffled.length; i++) {

        var d = document.createElement("div");

        d.setAttribute("class", "tile");
        
        var divcontainer = document.createElement("div"); 
        var value = memmory_array_shuffled[i];

        if (getradiovalue() === 4) {

            divcontainer.setAttribute("class", "col-3 divcontainer");

        }
        d.id = "card" + i;

        d.value = memmory_array_shuffled[i];
        
        d.addEventListener("click", function () {
            check(this);
        }, false);
        
        divcontainer.appendChild(d);
        
        document.getElementById('memory_board').appendChild(divcontainer);
        
        $(divcontainer).slideDown("slow");

    }

}

function check(card) {

    var cardclose;
    if (card.innerHTML === "" && values.length < 2) {

        card.innerHTML = card.value;

        if (values.length === 0) {
            values.push(card.value);
            card_ids.push(card.id);
            
        } else if (values.length == 1) {
            
            values.push(card.value);
            card_ids.push(card.id);

            if (values[0] == values[1]) {
                
                cards_flipped += 2;
                var a = document.getElementById(card_ids[0]);
                var b = document.getElementById(card_ids[1]);
                

                $(a).add(b).animate({
                    backgroundColor: "#4CAF50",
                    color: "white"
                }, 300);

                values.length = 0;
                card_ids.length = 0;

            } else

                cardclose = function () {
                    
                var a = document.getElementById(card_ids[0]);
                var b = document.getElementById(card_ids[1]);

                a.innerHTML = "";
                $(a).animate(500);

                b.innerHTML = "";
                $(b).animate(500);
                values.length = 0;
                card_ids.length = 0;
            };
            setTimeout(cardclose, 700);
        }
        

    }
}