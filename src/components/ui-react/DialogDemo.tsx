import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";

export default function DialogDemo() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button
          type="button"
          style={{
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-md)",
            background: "var(--panel)",
            color: "var(--fg)",
            height: "2.5rem",
            padding: "0 1rem",
            cursor: "pointer",
          }}
        >
          Open Demo Dialog
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay
          style={{
            position: "fixed",
            inset: 0,
            background: "color-mix(in srgb, #000, transparent 45%)",
            zIndex: 50,
          }}
        />
        <Dialog.Content
          style={{
            position: "fixed",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            width: "min(92vw, 420px)",
            borderRadius: "var(--radius-lg)",
            border: "1px solid var(--border)",
            background: "var(--panel)",
            color: "var(--fg)",
            padding: "1rem 1.1rem",
            boxShadow: "var(--shadow-md)",
            zIndex: 60,
          }}
        >
          <Dialog.Title style={{ margin: 0, fontSize: "1rem", fontWeight: 600 }}>
            UI React Scaffold
          </Dialog.Title>
          <Dialog.Description
            style={{ margin: "0.5rem 0 1rem", color: "var(--muted)", fontSize: "0.92rem" }}
          >
            This is a minimal Radix dialog island loaded with client:visible.
          </Dialog.Description>
          <Dialog.Close asChild>
            <button
              type="button"
              style={{
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-md)",
                background: "var(--panel-2)",
                color: "var(--fg)",
                height: "2.2rem",
                padding: "0 0.9rem",
                cursor: "pointer",
              }}
            >
              Close
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
