const getAll = () => {
  return fetch('http://papvidadigital-test.com/V2021API/api/arboles/inventario').then(res => res.json());
}

const getAllByTaxonomy = (id) => {
  return fetch(`http://papvidadigital-test.com/V2021API/api/arboles/InventarioFilter/taxonomia/${id}`).then(res => res.json());
}

const getOneByNID = (NID) => {
  return fetch(`http://papvidadigital-test.com/V2021API/api/arboles/inventario/${NID}`).then(res => res.json());
}

const getLastCreated = () => {
  return fetch('http://papvidadigital-test.com/V2021API/api/arboles/lastCreated').then(res => res.json());
}

const getRandoms = () => {
  return fetch('http://papvidadigital-test.com/V2021API/api/arboles/InventarioSearch').then(res => res.json());
}

export const treeService = {
  getAll,
  getAllByTaxonomy,
  getOneByNID,
  getLastCreated,
  getRandoms
}