//Attaches a listener for the "Clear results"-button
$("#resultClear").click(function(){removeResults()});

//Add listeners for the forms/input fields
$(".inputSearch").submit(function(event){
        event.preventDefault();
        var inputData = $(this).children().val();//Saves the input value
        if (inputData == ""){
            window.alert("Try writing something first!");
        }
        else{//Logs the input, clears the input field and transfers the input value to a function
            console.log("Submitted value: "+inputData);
            $(this).children().val("");
            goFetch(inputData);
        }
})
//Basic fetch API, uses the saved input for the fetch
function goFetch(inputData){
    fetch("https://www.omdbapi.com/?apikey=f1ce59a3&s="+inputData)
        .then((response) => {
        return response.json();
    })
    .then((data) => {
        console.log(data); // Logs the fetched data
        createList(data); //Creates a table based on the fetched data
    })
}
//Creates a new table based on the fetch, and deletes previous table (if there is one)
function createList(data) {
    console.log("Logging...")
    console.log(data.Search);
    if ($("#movieList").val() != null){
        console.log("Previous list detected");
        removeResults();// Does the same thing as the "Clear results"-button
        insertResults(data);//Proceeds to insert the data
    }
   else {
        console.log("Creating table...");
        insertResults(data); //Proceeds to insert the data
        }
        console.log("Done");
}
//Removes the existing table created with the previous fetch
function removeResults(){
    console.log("Deleting table...");
    $("tbody").html("");
    $("#movieList").children().remove();
    $("#movieList").remove();
    $("#listDiv").toggleClass("hidden");
    console.log("Done");
}
//Creates a new table with the ID "movieList", and inserts the poster, title and year into cells
function insertResults(data){
    console.log("Inserting data...");
    var movieTable = $('<table id="movieList"></table>');
    
    var searchResult = data.Search;
    for (i=0; i<searchResult.length; i++){
        console.log("Inserting row "+[i+1]+"...");
        var row = $("<tr></tr>");
        var cell1 = $("<td></td>").html("<img src='"+data.Search[i].Poster+"'>");
        var cell2 = $("<td></td>").html(data.Search[i].Title);
        var cell3 = $("<td></td>").html(data.Search[i].Year);
        $(row).append(cell1, cell2, cell3);
        $(movieTable).append(row);
    }
    $("#listDiv").append(movieTable).toggleClass("hidden");
}