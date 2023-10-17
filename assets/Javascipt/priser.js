//Henter priser til prisliste med kategori og antal

getToken().then(() => {
  return (
    getPosts(priceListId, 1)
      .then((data) => {
        console.log(data);
        return data;
      })
      //Placerer prisliste i HTML
      .then((data) => {
        const priceListEl = document.querySelector(".price-list");

        priceListEl.innerHTML = `
          <tr class = "price-list-titles">
            <th class="price-list-behandling">Behandling:</th>
            <th class="price-list-pris">Pris:</th>
            <th class="price-list-tilskud">Pris med tilskud fra 'danmark':</th>
          </tr>
          <tr class = "price-borders-gray">
            <td><a class = "priser-first-consultation" href = "#first-consultation-heading">${data[0].acf.behandlingsnavn}</a></td>
            <td>${data[0].acf.pris_uden_tilskud} kr.</td>
            <td class = "price-with-subsidy">${data[0].acf.pris_med_tilskud} kr.</td>
          </tr>
          
          <tr class = "price-borders">
            <td>${data[0].acf.behandlingsnavn3}</td>
            <td>${data[0].acf.pris_uden_tilskud3} kr.</td>
            <td class = "price-with-subsidy">${data[0].acf.pris_med_tilskud3} kr.</td>
          </tr>
          <tr class = "price-borders-gray">
            <td>${data[0].acf.behandlingsnavn4}</td>
            <td>${data[0].acf.pris_uden_tilskud4} kr.</td>
            <td class = "price-with-subsidy">Intet tilskud</td>
          </tr>
          <tr class = "price-borders">
            <td>${data[0].acf.behandlingsnavn5}</td>
            <td>${data[0].acf.pris_uden_tilskud5} kr.</td>
            <td class = "price-with-subsidy">Intet tilskud</td>
          </tr>
          <tr class = "price-borders-gray">
            <td>${data[0].acf.behandlingsnavn6}</td>
            <td>${data[0].acf.pris_uden_tilskud6} kr.</td>
            <td class = "price-with-subsidy">Intet tilskud</td>
          </tr>
          <tr class = "price-borders">
            <td>${data[0].acf.behandlingsnavn7}</td>
            <td>${data[0].acf.pris_uden_tilskud7} kr.</td>
            <td class = "price-with-subsidy">${data[0].acf.pris_med_tilskud7} kr.</td>
          </tr>
          <tr class = "price-borders-gray">
            <td>${data[0].acf.behandlingsnavn8}</td>
            <td>${data[0].acf.pris_uden_tilskud8} kr.</td>
            <td class = "price-with-subsidy">${data[0].acf.pris_med_tilskud8} kr.</td>
          </tr>
        `;
      })
  );
});
