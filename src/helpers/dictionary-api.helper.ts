export class OxfordApiHelper {

  async getSuggestions(query: string, max = 10) {
    const apiUrl = `https://api.datamuse.com/sug?s=${encodeURIComponent(query)}&max=${max}`;
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Datamuse API request failed: ${response.status} ${errorText}`);
    }

    return response.json();
  }
}

export const oxfordAPI = new OxfordApiHelper();
export const dictionaryAPI = oxfordAPI;