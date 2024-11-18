import { UserDatamapper } from "../app/datamappers/index.datamapper.js";
import bcrypt from "bcrypt";
import axios from "axios";
import  faker  from "faker";

const urlArray = [
  "http://res.cloudinary.com/dfniqh3lp/image/upload/v1721205364/userImages/1.jpg1721205363185.jpg",
  "http://res.cloudinary.com/dfniqh3lp/image/upload/v1721205470/userImages/2.jpg1721205469240.jpg",
  "http://res.cloudinary.com/dfniqh3lp/image/upload/v1721205491/userImages/3.jpg1721205491098.jpg",
  "http://res.cloudinary.com/dfniqh3lp/image/upload/v1721205530/userImages/4.jpg1721205529480.jpg",
  "http://res.cloudinary.com/dfniqh3lp/image/upload/v1721205566/userImages/5.jpg1721205564844.jpg",
];

// Fonction pour récupérer les villes et départements français
async function fetchFrenchCitiesAndDepartments() {
  try {
    const citiesResponse = await axios.get('https://geo.api.gouv.fr/communes?fields=nom,code,codesPostaux,departement&format=json&geometry=centre');
    return citiesResponse.data;
  } catch (error) {
    console.error('Error fetching French cities and departments:', error);
    throw error;
  }
}

// Fonction pour générer un numéro de téléphone valide qui commence par "06"
function generatePhoneNumber() {
  const randomDigits = faker.datatype.number({ min: 10000000, max: 99999999 }).toString().padStart(8, '0');
  return `06${randomDigits}`;
}

// Fonction pour générer les données de seeding
async function generateSeedData(numUsers = 5) {
  try {
    const password = 'P@ssw0rd!!P@ssw0rd!!'; // Mot de passe commun pour tous les utilisateurs, respectant les critères
    const hashedPassword = await bcrypt.hash(password, 10);
    const cities = await fetchFrenchCitiesAndDepartments();

    const users = Array.from({ length: numUsers }, (_, index) => {
      const randomCity = cities[Math.floor(Math.random() * cities.length)];
      const { nom: city, departement } = randomCity;

      return {
        firstname: faker.name.firstName(),
        lastname: faker.name.lastName(),
        email: faker.internet.email(),
        password: hashedPassword,
        city,
        phone_number: generatePhoneNumber(), // Utilise la fonction pour générer un numéro de téléphone valide
        department_label: departement.nom,
        url_img: urlArray[index % urlArray.length], // Sélectionne une URL d'image de manière cyclique
      };
    });

    return users;
  } catch (error) {
    console.error('Error generating seed data:', error);
    throw error;
  }
}

// Fonction pour insérer les utilisateurs dans la base de données
async function seedDatabase(numUsers = 5) {
  try {
    const users = await generateSeedData(numUsers);

    for (const user of users) {
      await UserDatamapper.create(user);
    }

    console.log('Seeding completed.');
    process.exit();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit();
  }
}

// Appeler la fonction de seeding pour un nombre spécifié d'utilisateurs
seedDatabase(20).catch(console.error);
