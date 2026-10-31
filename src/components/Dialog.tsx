import { useLayoutEffect, useRef, type ReactNode } from "react";

interface DialogProps {
  titleId: string;
  onClose: () => void;
  children: ReactNode;
  dismissible?: boolean;
}

/** Native modal behavior supplies focus trapping, Escape, and focus restoration. */
export default function Dialog({
  titleId,
  onClose,
  children,
  dismissible = true,
}: DialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  useLayoutEffect(() => {
    const dialog = dialogRef.current;
    const trigger =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    dialog?.showModal();
    return () => {
      dialog?.close();
      // Restore before React removes the dialog, including StrictMode's setup/cleanup cycle.
      if (trigger?.isConnected) trigger.focus({ preventScroll: true });
    };
  }, []);

  return (
    <dialog
      ref={dialogRef}
      className="workshop-dialog"
      aria-labelledby={titleId}
      onCancel={(event) => {
        event.preventDefault();
        if (dismissible) onClose();
      }}
      onKeyDown={(event) => {
        if (event.key !== "Tab") return;
        const controls = [
          ...event.currentTarget.querySelectorAll<HTMLElement>(
            'button, [href], input, textarea, select, [tabindex]:not([tabindex="-1"])',
          ),
        ].filter(
          (element) =>
            !element.hasAttribute("disabled") &&
            element.getClientRects().length > 0,
        );
        const first = controls[0];
        const last = controls.at(-1);
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        }
        if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }}
      onClick={(event) => {
        if (dismissible && event.target === event.currentTarget) onClose();
      }}
    >
      {children}
    </dialog>
  );
}
