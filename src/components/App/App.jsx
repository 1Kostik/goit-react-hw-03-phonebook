import React, { Component } from 'react';
import ContactForm from '../ContactForm/ContactForm';
import { nanoid } from 'nanoid';
import Filter from '../Filter/Filter';
import { Title, Subtitle, Container } from './App.styled';
import ContactList from '../ContactList/ContactList';
const key = 'contacts';
export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };
  componentDidMount() {
    const contacts = localStorage.getItem(key);
    const parsedContacts = JSON.parse(contacts);
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem(key, JSON.stringify(this.state.contacts));
    }
  }
  handlerSubmit = data => {
    const { name, number } = data;
    const newContact = {
      id: nanoid(),
      name: name,
      number: number,
    };
    this.setState(({ contacts }) =>
      contacts.find(
        contact =>
          contact.name === newContact.name ||
          contact.number === newContact.number
      )
        ? alert(
            `${newContact.name} or ${newContact.number} is already in contacts`
          )
        : { contacts: [newContact, ...contacts] }
    );
  };
  onFilter = e => {
    const { value } = e.currentTarget;
    this.setState({ filter: value });
  };
  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };
  render() {
    const { contacts, filter } = this.state;
    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
    return (
      <Container>
        <Title>Phonebook</Title>
        <ContactForm onSubmit={this.handlerSubmit} />
        <Subtitle>Contacts</Subtitle>
        <Filter value={filter} onFilter={this.onFilter} />
        <ContactList
          deleteContact={this.deleteContact}
          contacts={filteredContacts}
        />
      </Container>
    );
  }
}
