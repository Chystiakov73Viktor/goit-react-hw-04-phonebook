import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from '../ContactForm/ContactForm';
import { ContactList } from '../ContactList/ContactList';
import { Filter } from '../Filter/Filter';
import css from './App.module.css';

const LS_KEY = 'contacts';

export function App() {
  const [contacts, setContacts] = useState(() => {
    const savedState = localStorage.getItem(LS_KEY);
    const parsedContacts = JSON.parse(savedState) ?? [];

    return parsedContacts;
  });
  const [filter, setFilter] = useState('');

  const addNameContact = ({ name, number }) => {
    const contact = { id: nanoid(), name, number };
    const changeNameCase = name.toLowerCase();
    const isExist = contacts.some(
      contact => contact.name.toLowerCase() === changeNameCase
    );

    if (isExist) {
      alert(`${name} is already in contacts.`);
      return;
    }
    setContacts(prevState => [contact, ...prevState]);
  };

  const changeFilter = event => {
    setFilter(event.target.value);
  };

  const getFilteredContacts = () => {
    const changeFilterCase = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(changeFilterCase)
    );
  };

  const deleteContact = contactId =>
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== contactId)
    );

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(contacts));
  }, [contacts]);

  return (
    <div>
      <h1 className={css.tatel}>Phonebook</h1>
      <ContactForm onSubmit={addNameContact} />
      <h2 className={css.tatel}>Contacts</h2>
      <Filter value={filter} onChangeFilter={changeFilter} />
      <ContactList
        contacts={getFilteredContacts()}
        onDeleteContact={deleteContact}
      />
    </div>
  );
}
