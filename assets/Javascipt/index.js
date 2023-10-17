
getToken()
    .then(() => {
        return getPosts(frontpageTopId, 1)
        .then((data) => {
            console.log(data); 
        return data;
      });
  })
.then((data) => renderHero(data, heroEl));

getToken()
    .then(() => {
        return getPosts(therapistsId, 4)
        .then((data) => {
            console.log(data); 
        return data;
      });
  })
    
  .then((data) => renderAllTherapists(data, allTherapistsEl));

getToken()
    .then(() => {
        return getPosts(painsId, 12)
        .then((data) => {
            console.log(data);
        return data;
      });
  })
    
    .then((data) => renderGrid(data, treatmentAreasEl));



 