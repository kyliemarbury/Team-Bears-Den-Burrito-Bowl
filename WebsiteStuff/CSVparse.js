//ChatGPT was used to export function and generally get used to the syntax of js
export function parse() {
    return fetch('blocks.csv') // Must be hosted in the same folder or publicly accessible
      .then(response => response.text())
      .then(text => {
        const rows = text.trim().split('\n');
        const data = rows.map(row => row.split(','));
        console.log(data); // Array of arrays
        return data;
      })
      .catch(error => {
        console.error('Error loading blocks.csv:', error);
        return null;
      });   
}
