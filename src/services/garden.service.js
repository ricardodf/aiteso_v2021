const getAll = () => {
  return fetch('http://papvidadigital-test.com/V2021API/api/arboles/jardines').then(res => res.json());
}

const getOneById = (id) => {
  return fetch(`http://papvidadigital-test.com/V2021API/api/arboles/jardines/${id}`).then(res => res.json());
}

export const gardenService = {
  getAll,
  getOneById
}