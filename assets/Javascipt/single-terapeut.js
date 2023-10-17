getToken()
  .then(() => getSinglePostBySlug(slug))
  .then(therapist => {
    console.log(therapist);
    renderSingleTherapist(therapist);
    document.getElementById("first-open").click();
  });


  getToken()
  .then(() => {
      return getPosts(therapistsId, 4)
      .then((data) => {
          console.log(data); 
      return data;
    });
})
.then((data) => renderAllTherapistsExcludingCurrentSlug(data, allTherapistExcludingEl));
  