const getAll = () => {
  return fetch('http://papvidadigital-test.com/V2021API/api/arboles/tiposArboles').then(res => res.json());
}

const getOneById = (id) => {
  return fetch(`http://papvidadigital-test.com/V2021API/api/arboles/tiposArboles/${id}`).then(res => res.json());
}

export const taxonomyService = {
  getAll,
  getOneById,
}