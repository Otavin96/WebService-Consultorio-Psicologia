export const fetchCitiesByState = async (uf: string): Promise<string[]> => {
  const response = await fetch(
    `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`
  );
  const data = await response.json();

  return data.map((city: any) => city.nome);
};
