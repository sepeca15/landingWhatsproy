export default function WhatsAppLink({ link }) {
    return (
      <section className="mb-8 text-center">
        <h2 className="text-2xl font-semibold mb-4">Contáctanos</h2>
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-6 py-3 bg-green-500 text-white rounded-md font-bold transition-colors duration-200 hover:bg-green-600"
        >
          Chatea con nosotros en WhatsApp
        </a>
      </section>
    );
  }
  