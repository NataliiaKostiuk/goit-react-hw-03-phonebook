import { Component } from 'react';
import { ContactForm } from './contactForm/contactForm';
import { Filter } from './filter/filter';
import { ContactList } from './contactList/contactList';
import data from '../../src/data.json/data.json';
import { nanoid } from 'nanoid';
import{Container,MainTitle,Title} from './app.styled/app.styled'
 console.log(data);
export class App extends Component {
 state = {
  contacts: [...data],
  filter: ''
  }
   addContact = data => {
    const newContact = this.state.contacts.find(
      el => el.name.toLowerCase() === data.name.toLowerCase()
    );
    if (newContact) return alert(newContact.name + ' is already in contacts.');
    data.id = nanoid();
    this.setState(prev => ({ contacts: [data, ...prev.contacts] }))
  };
  onDelete = id => {
   this.setState(prevState => ({
    contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  onFilter = value => {
    this.setState({ filter: value });
  };
  render() {
    const filterNormilized = this.state.filter.toLowerCase().trim();
    const visibleContacts = this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(filterNormilized)
    );
    return (
      <Container
        style={{
          height: '100vh',
          color: '#010101'
        }}
      >
<MainTitle>Phonebook</MainTitle>
        <ContactForm addContact={this.addContact } />
        <Title>Contacts</Title>
  <Filter value={this.state.filter} onFilter={this.onFilter} />
  <ContactList contacts={visibleContacts}onDelete={this.onDelete} />
      </Container>
    );
  }
};
