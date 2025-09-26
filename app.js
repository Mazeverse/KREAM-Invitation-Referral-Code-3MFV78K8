(function () {
  function $(sel) { return document.querySelector(sel); }
  function copyToClipboard(selector) {
    const input = $(selector);
    if (!input) return;
    input.select();
    input.setSelectionRange(0, input.value.length);
    try {
      const val = input.value;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(val).then(() => notify('코드를 복사했습니다.'));
      } else {
        const ok = document.execCommand('copy');
        notify(ok ? '코드를 복사했습니다.' : '복사에 실패했습니다. 직접 복사해 주세요.');
      }
    } catch (e) {
      notify('복사에 실패했습니다. 직접 복사해 주세요.');
    } finally {
      window.getSelection()?.removeAllRanges?.();
    }
  }
  function notify(msg) {
    let n = document.createElement('div');
    n.className = 'toast';
    n.textContent = msg;
    Object.assign(n.style, {
      position: 'fixed',
      left: '50%',
      bottom: '24px',
      transform: 'translateX(-50%)',
      background: '#fff',
      color: '#000',
      padding: '10px 14px',
      borderRadius: '10px',
      fontWeight: '700',
      fontSize: '13px',
      boxShadow: '0 6px 16px rgba(0,0,0,.35)',
      zIndex: 9999,
      opacity: 0,
      transition: 'opacity .2s ease'
    });
    document.body.appendChild(n);
    requestAnimationFrame(() => n.style.opacity = 1);
    setTimeout(() => {
      n.style.opacity = 0;
      setTimeout(() => n.remove(), 250);
    }, 1300);
  }

  const copyBtn = document.getElementById('copy-btn');
  if (copyBtn) copyBtn.addEventListener('click', () => copyToClipboard('#ref-code'));

  // Accessibility: Enter on inputs triggers copy / go
  document.getElementById('ref-code')?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') copyToClipboard('#ref-code');
  });
  document.getElementById('ref-link')?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') document.getElementById('go-btn')?.click();
  });
})();