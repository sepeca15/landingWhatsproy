// components/UncustomModal.tsx

import React, { useRef, useEffect } from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import Modal from 'react-modal';

interface UncustomModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  handleComplete?: () => void;
  buttonSend?: string;
  width?: string;
}

const customStyles = (width?: string): Modal.Styles => ({
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
    padding: '30px',
    borderRadius: '12px',
    border: 'none',
    backgroundColor: '#1e293b',
    maxWidth: width ?? '450px',
    width: '90%',
    position: 'relative',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    zIndex: 1000,
  },
});

Modal.setAppElement('body');

const UncustomModal: React.FC<UncustomModalProps> = ({
  isOpen,
  onClose,
  width,
  buttonSend,
  children,
  title,
  handleComplete,
}) => {
  const subtitleRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    if (isOpen && subtitleRef.current) {
      subtitleRef.current.style.color = '#1e293b'; 
    }
  }, [isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={customStyles(width)}
      contentLabel={title || 'Modal'}
    >
      {title && (
        <h2 ref={subtitleRef} className="text-white mb-6 text-2xl text-center font-bold">
          {title}
        </h2>
      )}

      <div className="modal-body">{children}</div>

      <button
        className="absolute top-4 right-4 p-1 hover:scale-110 transition"
        onClick={onClose}
      >
        <IoCloseOutline color="white" size={28} />
      </button>

      {handleComplete && (
        <button
          onClick={handleComplete}
          className="w-full mt-10 text-lg bg-[#2c466d] text-white py-3 rounded-lg shadow-md hover:bg-[#203350] transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#1e293b]"
        >
          {buttonSend ?? 'Completar'}
        </button>
      )}
    </Modal>
  );
};

export default UncustomModal;
