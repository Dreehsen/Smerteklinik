//Henter og renderer artiklen

getToken()
    .then(() => getSinglePostBySlug(slug))
    .then(post => {
        console.log(post);
        renderSinglePost(post);
    });


// Henter relevante smertetyper/behandlingsmetoder
    getToken()
  .then(() => {
    return getCategoryBySlug(slug)
      .then((data) => {
        return getPosts(data[0].id, 9)
          .then((data) => {
            console.log(data);
            return data;
          })
          .then((data) => {
            const singlePostGridEl = document.querySelector(".treatmentareas-grid");
            renderGrid(data, singlePostGridEl);
          });
      });
  });

    
