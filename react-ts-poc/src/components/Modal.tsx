import * as Dialog from '@radix-ui/react-dialog';
import { X, Phone } from 'lucide-react'; // X 아이콘 (lucide-react 추천, fontawesome도 OK)

const Modal = () => {
  return (
    <Dialog.Root>
      <Dialog.Trigger
        style={{
          background: 'grey',
          color: 'white',
          padding: '10px 20px',
          borderRadius: '8px',
          cursor: 'pointer',
          fontSize: '16px',
        }}
      >
        📞 연락하기
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1000,
          }}
        />
        <Dialog.Content
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.85)',
            padding: '2rem',
            overflowY: 'auto',
            color: 'white',
            zIndex: 1001,
            borderTopLeftRadius: '2rem',
            borderBottomLeftRadius: '2rem',
            boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
          }}
        >
          <Dialog.Title>📌 연락하기</Dialog.Title>
          <Dialog.Description asChild>
            <div>
              <div>
                <span>신랑</span>
                <a
                  href="tel:01012345678"
                  style={{ color: 'inherit', textDecoration: 'none' }}
                >
                  <Phone size={16} />
                </a>
              </div>
              <div>
                <span>신부</span>
                <a
                  href="tel:01012345678"
                  style={{ color: 'inherit', textDecoration: 'none' }}
                >
                  <Phone size={16} />
                </a>
              </div>
            </div>
          </Dialog.Description>
          <Dialog.Close asChild>
            <button
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
              }}
              aria-label="Close"
            >
              <X size={32} color="white" />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Modal;
