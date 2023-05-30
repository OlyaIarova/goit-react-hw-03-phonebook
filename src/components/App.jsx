import { Component } from 'react';
import { GlobalStyle } from './Utils/GlobalStyle.js';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { ThemeProvider } from 'styled-components';
import { Layout } from './Layout/Layout';
import { theme } from './Utils/Theme';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  // збереження контактів в localStorage
  componentDidMount() {
    const contacts = localStorage.getItem('contacts'); // отримуємо дані із localStorage.
    const parsedContacts = JSON.parse(contacts); // парсим JSON в JavaScript.

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts }); // встановлюємо контакти в об'єкт -contacts.
    }
  }

  componentDidUpdate(_, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      // порівняння поточні з попереднім контактом.
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
      // якщо збереглись, добавляємов localStorage.
    }
  }

  // додавання нового контакта в список контактів
  addContact = newContact => {
    const { contacts } = this.state;

    const checkContactName = contacts.find(
      contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
    );
    // якщо контакт уже існує, виводимо сповіщення
    if (checkContactName) {
      alert(`${newContact.name} is allready in contact!`);
      return;
    }
    this.setState(pervState => ({
      contacts: [...pervState.contacts, newContact],
    }));
  };

  // видалення контакта
  deleteContact = contactId => {
    this.setState(pervState => ({
      contacts: pervState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  // зміна значення фільтра
  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  // отримання відфільтрованих контактів
  getVisibleContacts = () => {
    const { filter, contacts } = this.state;
    let normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  render() {
    const visibleContacts = this.getVisibleContacts();
    const { filter } = this.state;
    return (
      <ThemeProvider theme={theme}>
        <Layout>
          <h1>Phonebook📘</h1>
          <ContactForm addContact={this.addContact} />
          <h2>Contacts📝</h2>
          <Filter value={filter} onChange={this.changeFilter} />
          <ContactList
            contacts={visibleContacts}
            onDelete={this.deleteContact}
          />
          <GlobalStyle />
        </Layout>
      </ThemeProvider>
    );
  }
}
