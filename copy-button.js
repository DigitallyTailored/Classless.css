function createCopyButton() {
    const script = document.currentScript;
    if (!script) return;

    const previousSibling = script.previousElementSibling;
    if (!previousSibling) return;

    const copyButton = document.createElement('button');
    copyButton.textContent = 'Copy';

    copyButton.addEventListener('click', function() {
        const textToCopy = previousSibling.innerText;
        navigator.clipboard.writeText(textToCopy).then(() => {
            copyButton.textContent = 'Copied!';
            setTimeout(() => {
                copyButton.textContent = 'Copy';
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy text: ', err);
        });
    });

    script.parentNode.insertBefore(copyButton, script);
}

createCopyButton();