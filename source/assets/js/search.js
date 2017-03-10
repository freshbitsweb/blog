(function() {
  function displaySearchResults(results, store) {
    var searchResults = document.getElementById('search-results');


    if (results.length) { // Are there any results?
      var appendString = '';

      for (var i = 0; i < results.length; i++) {  // Iterate over the results
        var item = store[results[i].ref];
        appendString += ' <li><div class="panel panel-default"><div class="panel-heading"><a href="' + item.url + '"><strong>' + item.title + '</strong></a></div><div class="post_details_head"> <div class="post_details"> <span class="glyphicon glyphicon-time"></span> '+item.date+' </div> <div class="post_details"> <span class="glyphicon glyphicon-user"></span> Posted by <span class="dark_text">Admin</span> </div> <div class="post_details"> <span class="glyphicon glyphicon-comment"></span> Comments : <span class="dark_text">22</span> </div> </div> <div class="panel-image"> <img src="'+item.baseurl+'/assets/images/'+item.image+'" alt="'+item.alternateText+'"></div> <div class="panel-body homepage-panel-body"> ' + item.content.substring(0, 300) + '... <div class="readmorebutton orange"> <a href="' + item.url + '" class="btn btn-default"> Read More <span class="glyphicon glyphicon-arrow-right"></span> </a> </div> </div> </div> </li>';
      }

      searchResults.innerHTML = appendString;
    } else {
      searchResults.innerHTML = "<h1 style='margin-left:30%;'>No results found</h1>";
    }
  }

  function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');

    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split('=');

      if (pair[0] === variable) {
        return decodeURIComponent(pair[1].replace(/\+/g, '%20'));
      }
    }
  }

  var searchTerm = getQueryVariable('query');


  if (searchTerm) {
    document.getElementById('search-box').setAttribute("value", searchTerm);

    // Initalize lunr with the fields it will be searching on. I've given title
    // a boost of 10 to indicate matches on this field are more important.
    var idx = lunr(function () {
      this.field('id');
      this.field('title', { boost: 10 });
      this.field('author');
      this.field('category');
      this.field('content');
    });

    for (var key in window.store) { // Add the data to lunr
      idx.add({
        'id': key,
        'title': window.store[key].title,
        'author': window.store[key].author,
        'category': window.store[key].category,
        'content': window.store[key].content
      });

      var results = idx.search(searchTerm); // Get lunr to perform a search
      displaySearchResults(results, window.store); // We'll write this in the next section
    }
}
})();