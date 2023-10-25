import React from "react";

const ContactList = ({ contacts, onContactClick }) => {
  return (
    <ul>
      {contacts.map((contact) => (
        <li key={contact.id} onClick={() => onContactClick(contact)}>
          {contact.name}
        </li>
      ))}
    </ul>
  );
};

const Modal = ({ title, onClose, children }) => {
  return (
    <div className="modal">
      <div className="modal-header">
        <h2>{title}</h2>
        <button onClick={onClose}>&times;</button>
      </div>
      <div className="modal-body">{children}</div>
    </div>
  );
};

const ModalC = ({ contact, onClose }) => {
    return (
      <Modal title="Contact Details" onClose={onClose}>
        <div>
          <h4>Name: {contact.name}</h4>
          <p>Email: {contact.email}</p>
          <p>Phone: {contact.phone}</p>
          {/* Add more contact details as needed */}
        </div>
      </Modal>
    );
  };

const Problem2 = () => {
  const [currentModal, setCurrentModal] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showEvenOnly, setShowEvenOnly] = useState(false);

  useEffect(() => {
    // Fetch contacts from API (replace with actual API endpoint)
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await fetch("api-endpoint");
      const data = await response.json();
      setContacts(data);
      setFilteredContacts(data);
    } catch (error) {
      console.error("Error fetching contacts", error);
    }
  };

  const openModal = (modalType) => {
    setCurrentModal(modalType);
  };

  const closeModal = () => {
    setCurrentModal(null);
  };

  const [selectedContact, setSelectedContact] = useState(null);

  const onContactClick = contact => {
    setSelectedContact(contact);
    openModal('C');
  };

  const filterContacts = () => {
    let filtered = contacts;

    if (showEvenOnly) {
      filtered = filtered.filter((contact) => contact.id % 2 === 0);
    }

    if (searchTerm) {
      filtered = filtered.filter((contact) =>
        contact.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredContacts(filtered);
  };

  useEffect(() => {
    filterContacts();
  }, [showEvenOnly, searchTerm]);

  const [page, setPage] = useState(1);

  const handleScroll = () => {
    const isAtBottom =
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 200;

    if (isAtBottom) {
      // Load more contacts (replace with actual API call)
      fetchContacts(page + 1);
      setPage(page + 1);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [page]);

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-2</h4>

        <div className="d-flex justify-content-center gap-3">
          <button
            className="btn btn-lg btn-outline-primary"
            type="button"
            onClick={() => openModal("A")}
          >
            All Contacts
          </button>
          <button
            className="btn btn-lg btn-outline-warning"
            type="button"
            onClick={() => openModal("B")}
          >
            US Contacts
          </button>
        </div>
      </div>

      {currentModal === "A" && (
        <Modal title="All Contacts" onClose={closeModal}>
          <ContactList
            contacts={filteredContacts}
            onContactClick={onContactClick}
          />
        </Modal>
      )}

      {currentModal === "B" && (
        <Modal title="US Contacts" onClose={closeModal}>
          <ContactList
            contacts={filteredContacts}
            onContactClick={onContactClick}
          />
        </Modal>
      )}

      {currentModal === "C" && (
        <Modal contact={selectedContact} onClose={() => closeModal()}>
        </Modal>
      )}
    </div>
  );
};

export default Problem2;
