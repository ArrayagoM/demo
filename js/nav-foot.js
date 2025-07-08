function includeHTML(idContenedor, urlArchivo) {
  fetch(urlArchivo)
    .then((resp) => (resp.ok ? resp.text() : Promise.reject(resp.statusText)))
    .then((html) => {
      document.getElementById(idContenedor).innerHTML = html;
    })
    .catch((err) => {
      console.error('Error cargando', urlArchivo, err);
    });
}

includeHTML('import-navbar', 'navbar.html');
includeHTML('import-footer', 'footer.html');
includeHTML('import-getintouch', 'getintouch.html');
includeHTML('import-map', 'map.html');
