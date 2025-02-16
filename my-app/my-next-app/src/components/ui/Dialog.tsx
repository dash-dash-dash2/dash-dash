// @/components/ui/Dialog.tsx

import { useState } from "react";
import styles from "./Dialog.module.css"; // You will create a simple CSS file for styling

type DialogProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export const Dialog = ({ isOpen, onClose, children }: DialogProps) => {
  if (!isOpen) return null; // Don't render the dialog if it's closed

  return (
    <div className={styles.dialogBackdrop} onClick={onClose}>
      <div
        className={styles.dialogContent}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the dialog
      >
        {children}
      </div>
    </div>
  );
};

export const DialogHeader = ({ children }: { children: React.ReactNode }) => (
  <div className={styles.dialogHeader}>{children}</div>
);

export const DialogTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className={styles.dialogTitle}>{children}</h2>
);

export const DialogDescription = ({
  children,
}: {
  children: React.ReactNode;
}) => <p className={styles.dialogDescription}>{children}</p>;

export const DialogContent = ({ children }: { children: React.ReactNode }) => (
  <div className={styles.dialogContentBody}>{children}</div>
);
