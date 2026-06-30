export class OxfordApiHelper {
  async getDefinitions(word: string) {
    const apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word.toLowerCase())}`;
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    if (response.status === 404) {
      return null;
    }

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Dictionary API request failed: ${response.status} ${errorText}`);
    }

    return response.json();
  }

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