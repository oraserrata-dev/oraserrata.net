document.querySelectorAll('.copy-btn').forEach((button) => {
  const block = button.closest('.codeblock');
  const code = block.querySelector('pre');
  const status = block.querySelector('.copy-status');
  button.hidden = false;

  button.addEventListener('click', async () => {
    button.disabled = true;
    status.textContent = '';

    try {
      await navigator.clipboard.writeText(code.textContent);
      status.textContent = 'Copied to clipboard.';
    } catch {
      code.focus();
      const selection = window.getSelection();
      if (selection) {
        const range = document.createRange();
        range.selectNodeContents(code);
        selection.removeAllRanges();
        selection.addRange(range);
      }
      status.textContent = 'Automatic copy is unavailable. Select the code and use your browser’s Copy command.';
    } finally {
      button.disabled = false;
    }
  });
});
