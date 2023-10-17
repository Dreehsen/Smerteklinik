getToken()
    .then(() => {
        return getPosts(treatmentMethodsId, 9)
        .then((data) => {
            console.log(data);
        return data;
      });
  })
    
.then((data) => renderGrid(data, methodsEl));