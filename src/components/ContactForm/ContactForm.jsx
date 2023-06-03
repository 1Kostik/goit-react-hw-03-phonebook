import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Input, Label, Btn } from './ContactForm.styled';
class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };
  handleChange = e => {
    const { value, name } = e.currentTarget;
    this.setState({ [name]: value });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state);
    this.reset();
  };
  reset = () => {
    this.setState({ name: '', number: '' });
  };
  render() {
    return (
      <>
        <Container onSubmit={this.handleSubmit}>
          <Label htmlFor={this.nameId}>
            Name
            <Input
              type="text"
              name="name"
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
              value={this.state.name}
              onChange={this.handleChange}
              id={this.nameId}
            />
          </Label>
          <Label htmlFor={this.numberId}>
            Number
            <Input
              type="tel"
              name="number"
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
              value={this.state.number}
              onChange={this.handleChange}
              id={this.numberId}
            />
          </Label>
          <Btn type="submit">Add contacts</Btn>
        </Container>
      </>
    );
  }
}
ContactForm.propTypes = { onSubmit: PropTypes.func.isRequired };
export default ContactForm;
