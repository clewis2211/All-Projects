// var friends = ['Warren', 'Josh', 'Brian', 'Mark', 'David'];
// function sing(){
//     for(var i = 0; i < friends.length; i++){
//         var friend = friends[i];

//         for(var f = 99; f > 0; f--){
//             if(f > 1){
//                  console.log(friend + " lines of code in the file " + " takes one down " + 
//                     "passes it around " + (f - 1) + " lines of code in the file");
//             } else{
//                  console.log(j + " line of code in the file; "
//                     + friend + " takes one down " + "passes it around no more lines of code in the file");
//             };
//         };
//     };
//   };  

//   console.log(sing);

// var friends = ['Warren', 'Josh', 'Brian', 'Mark', 'David'];

// for(var i = 0; i < friends.length; i++){
//     var friend = friends[i];

//     for(var f = 99; f > 0; f--){
//         if(f > 1){
//             console.log(friend + ' lines of code in the file ' + ' takes one down ' +
//             'passes it around ' + (f - 1) + ' lines of code in the file');
//         } else{
//             console.log(f + 'lines of code in the file;' + friend + ' takes one down ' + 'passes it around no more lines of code in the file');
//         };
//     };
// };

var friends = ['Warren', 'Josh', 'Brian', 'Mark', 'David'];

document.addEventListener('DOMContentLoaded', function () {
    var btn = document.createElement('button');
    btn.appendChild(document.createTextNode('CLICK'));
    document.addEventListener('click', function () {
        for (var i = 0; i < friends.length; i++) {
            var friend = friends[i];
            console.log(friend);

            for (var f = 99; f > 0; f--) {
                if (f > 1) {
                    lyric = document.createTextNode(friend + ' lines of code in the file ' + ' takes one down ' +
                        'passes it around ' + (f - 1) + ' lines of code in the file');
                } else {
                    lyric = document.createTextNode(f + 'lines of code in the file;' + friend + ' takes one down '
                        + 'passes it around no more lines of code in the file');
                }
            }
        }
        console.log(lyric);
    });

    document.body.appendChild(btn);
});


