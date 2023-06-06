import { readFile, writeFile, appendFile, readdir } from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const contactsPath = path.join("db", "contacts.json");

const listContacts = async () => {
  try {
    const contactsList = await readFile(contactsPath);
    const allContacts = JSON.parse(contactsList);

    return allContacts;
  } catch (error) {
    console.log(error);
  }
};

const getContactById = async (contactId) => {
  try {
    const allContacts = await listContacts();

    const contact = allContacts.find((el) => el.id === contactId);

    return contact;
  } catch (error) {
    console.log(error);
  }
};

const removeContact = async (contactId) => {
  try {
    const allContacts = await listContacts();

    const index = allContacts.findIndex((el) => el.id === contactId);

    if (index === -1) {
      return "Contact not found!";
    }

    const [contactToDelete] = allContacts.splice(index, 1);

    await writeFile(contactsPath, JSON.stringify(allContacts));

    return contactToDelete;
  } catch (error) {
    console.log(error);
  }
};

const addContact = async (name, email, phone) => {
  try {
    const allContacts = await listContacts();
    const newContact = { id: nanoid(), name, email, phone };

    allContacts.push(newContact);

    await writeFile(contactsPath, JSON.stringify(allContacts));

    return newContact;
  } catch (error) {
    console.log(error);
  }
};

export { addContact, removeContact, getContactById, listContacts };
