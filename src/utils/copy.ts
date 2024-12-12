const CopyToClipboard = (text:string) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        alert('address copied to clipboard!');
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
      });
  };

  export default CopyToClipboard