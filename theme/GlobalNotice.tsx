import React, { useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'elexvx_notice_ack';

const overlayStyle: React.CSSProperties = {
  position: 'fixed',
  inset: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 9999,
};

const modalStyle: React.CSSProperties = {
  width: 'min(520px, calc(100% - 32px))',
  backgroundColor: '#ffffff',
  color: '#111827',
  borderRadius: 12,
  padding: '24px',
  boxShadow: '0 20px 50px rgba(0, 0, 0, 0.25)',
};

const titleStyle: React.CSSProperties = {
  fontSize: 18,
  fontWeight: 600,
  marginBottom: 12,
};

const contentStyle: React.CSSProperties = {
  fontSize: 14,
  lineHeight: 1.7,
  marginBottom: 20,
};

const buttonStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '8px 16px',
  borderRadius: 8,
  border: '1px solid #2563eb',
  backgroundColor: '#2563eb',
  color: '#ffffff',
  cursor: 'pointer',
  fontSize: 14,
};

export default function GlobalNotice() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const dismissed = window.sessionStorage.getItem(STORAGE_KEY);
    if (!dismissed) setOpen(true);
  }, []);

  const close = () => {
    setOpen(false);
    if (typeof window !== 'undefined') {
      window.sessionStorage.setItem(STORAGE_KEY, '1');
    }
  };

  const dialog = useMemo(
    () => (
      <div style={overlayStyle} role="dialog" aria-modal="true">
        <div style={modalStyle}>
          <div style={titleStyle}>提示</div>
          <div style={contentStyle}>
            网站仍在持续优化中，部分文档与功能可能存在异常，敬请谅解。
          </div>
          <button type="button" style={buttonStyle} onClick={close}>
            我知道了
          </button>
        </div>
      </div>
    ),
    []
  );

  if (!open) return null;
  return dialog;
}
