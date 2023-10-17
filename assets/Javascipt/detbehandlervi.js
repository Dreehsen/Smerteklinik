getToken()
    .then(() => {
        return getPosts(painsId, 12)
        .then((data) => {
            console.log(data); 
        return data;
      });
  })
    
.then((data) => renderGrid(data, treatmentAreasEl));

getToken()
    .then(() => {
        return getPosts(therapistsId, 4)
        .then((data) => {
            console.log(data); 
        return data;
      });
  })
    

  .then((data) => renderAllTherapists(data, allTherapistsEl));
