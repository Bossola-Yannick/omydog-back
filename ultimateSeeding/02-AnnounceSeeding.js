import { AnnouncementDatamapper } from '../app/datamappers/index.datamapper.js';
import { AnnouncementAnimalDatamapper } from '../app/datamappers/index.datamapper.js';
import faker from "faker";

// Fonction pour générer les données de seeding pour les annonces
async function generateAnnouncementSeedData() {
  const startDate = faker.date.future();
  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + faker.datatype.number({ min: 1, max: 14 })); // Durée de 1 à 14 jours

  return {
    date_start: startDate.toISOString(),
    date_end: endDate.toISOString(),
    mobility: faker.datatype.boolean(),
    home: faker.datatype.boolean(),
    description: faker.lorem.sentences(),
    animal: [faker.random.arrayElement(['Chien', 'Chat', 'Oiseau', 'Poisson', 'Rongeur', 'Reptile'])],
  };
}

// Fonction pour insérer les annonces dans la base de données pour un utilisateur spécifique
async function seedAnnouncementsForUser(userId, numAnnouncements = 5) {
  for (let i = 0; i < numAnnouncements; i++) {
    const announcementData = await generateAnnouncementSeedData();

    // Ajouter l'annonce dans la base de données
    const announcementResult = await AnnouncementDatamapper.create(announcementData, userId);

    if (announcementResult && announcementData.animal) {
      const announcementId = announcementResult.id;

      // Ajouter les types d'animaux associés à l'annonce
      for (const animalType of announcementData.animal) {
        await AnnouncementAnimalDatamapper.create(animalType, announcementId);
      }
    }
  }

  console.log(`${numAnnouncements} announcements created successfully for user ${userId}.`);
}

// Fonction pour exécuter le seeding pour chaque utilisateur dans la plage spécifiée
async function seedAnnouncementsForUsers(startUserId, endUserId, numAnnouncementsPerUser = 5) {
  for (let userId = startUserId; userId <= endUserId; userId++) {
    await seedAnnouncementsForUser(userId, numAnnouncementsPerUser);
  }
  console.log(`Seeding completed for users ${startUserId} to ${endUserId}.`);
  process.exit();
}

// Appeler la fonction de seeding pour les utilisateurs compris entre 1 et 10
const startUserId = 1;
const endUserId = 20;
const numAnnouncementsPerUser = 5;

seedAnnouncementsForUsers(startUserId, endUserId, numAnnouncementsPerUser).catch(console.error);
