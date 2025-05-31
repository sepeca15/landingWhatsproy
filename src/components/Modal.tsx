// components/UncustomModal.tsx

import React, { useRef, useEffect } from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import Modal from 'react-modal';

interface UncustomModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  handleComplete?: ()=> void;
}

const customStyles: Modal.Styles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: '30px',
    borderRadius: '12px',
    border: 0,
    backgroundColor: '#1e293b',
    maxWidth: '500px',
    width: '90%',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    zIndex: 1000,
  },
};

Modal.setAppElement('body');

const UncustomModal: React.FC<UncustomModalProps> = ({ isOpen, onClose, children, title, handleComplete }) => {
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
      style={customStyles}
      contentLabel={title || "Modal"}
    >
      {title && <h2 className='text-white mb-6 text-2xl text-center' ref={subtitleRef}>{title}</h2>}
      <div className="modal-body">{children}</div>
      <button className='absolute top-0 right-4' onClick={onClose} style={{ marginTop: '20px' }}>
        <IoCloseOutline color='white' size={30} />
      </button>
      <button
        onClick={handleComplete}
        className="w-full mt-[24px] text-xl bg-[#2c466d] text-white py-3 rounded-lg shadow-md hover:bg-[#203350] transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 focus:ring-offset-[#1e293b]"
      >
        Completar
      </button>
      <button></button>
    </Modal>
  );
};

export default UncustomModal;
