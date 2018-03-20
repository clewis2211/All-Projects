//THIS IS AN ARRAY OF MY FRIENDS
var friends = ["Jeff", "Jack", "James", "John", "Jill"];

//THIS IS A FUNCTION THAT WILL RUN WHEN THE 'SING!' BUTTON IS CLICKED
function singToMe() {
    //THIS IS A LOOP ITERATING THROUGH THE ARRAY OF MY FRIENDS
    for (var i = 0; i < friends.length; i++) {
        //THIS IS THE CURRENT ITERATION OF MY FRIEND IN THE LOOP
        var friend = friends[i];
        //CREATE A NEW DIV ELEMENT
        var friendDiv = document.createElement("div");
        //GIVE IT A CLASS OF 'FRIEND'
        friendDiv.className = "friend";
        //CREATE A NEW H3 ELEMENT
        var nameHead = document.createElement("h3");
        // nameHead.innerText = friend;
        //CREATE A NEW TEXT NODE WITH MY FRIEND'S NAME AND APPEND IT TO THE H3
        var text = document.createTextNode(friend);
        nameHead.appendChild(text);
        //PUT THE H3 IN THE FRIEND DIV
        friendDiv.appendChild(nameHead);
        //ITERATE FROM 99 DOWN TO 1
        for (var j = 99; j > 0; j--) {
            //THE CURRENT LYRIC IN THE ITERATION 
            var lyric;
            //IF 'THE LINES OF CODE IN THE FILE' IS GREATER THAN 1
            if (j > 1) {
                lyric = document.createTextNode(j + " lines of code in the file; "
                    + friend + " takes one down " + "passes it around " + (j - 1)
                    + " lines of code in the file");
            //OTHERWISE        
            } else {
                lyric = document.createTextNode(j + " line of code in the file; "
                    + friend + " takes one down " + "passes it around no more lines of code in the file");
            }
            //CREATE A NEW PARAGRAPH ELEMENT
            var para = document.createElement("p");
            //APPEND THE NEWLY CREATED TEXT-NODE WITH THE LYRICS TO THE PARAGRAPH
            para.appendChild(lyric);
            //ADD THE PARAGRAPH TO THE FRIEND DIV
            friendDiv.appendChild(para);
        }
        //APPEND THE FULLY-MODIFIED DIV TO THE BODY 
        document.body.appendChild(friendDiv);
    }
}
