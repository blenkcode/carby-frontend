export const determineProfile = (answers) => {
    const profile = {
      waterUsage: answers.q1,
      meatConsumption: answers.q2,
      reusableBags: answers.q3,
      lightsUsage: answers.q4,
      localProducts: answers.q5,
      wasteSorting: answers.q6,
      ecoSpreading: answers.q7,
    };
  
    const ecoFriendlyScore = [
      answers.q1 === "Economique",
      answers.q2 === "Jamais",
      answers.q3 === "Toujours",
      answers.q4 === "Jamais",
      answers.q5 === "Toujours",
      answers.q6 === "Toujours",
    ].filter(Boolean).length;
  
    profile.category =
      ecoFriendlyScore >= 5 ? "Eco Warrior" : ecoFriendlyScore >= 3 ? "Eco Friendly" : "Eco Newbie";
  
    return profile;
  };
  
  export const generateTasks = (profile) => {
    const tasks = [];
  
    if (profile.category === "Eco Warrior") {
      tasks.push({task:"Participer à une campagne de nettoyage de plage/quartier."});
      tasks.push({task:"Organiser un atelier sur le recyclage dans votre communauté."});
      tasks.push({task:"Planter un arbre chaque mois."});
      tasks.push({task:"Mettez en place un programme de covoiturage dans votre quartier."})
      tasks.push({task:"Animez des ateliers où les participants peuvent apprendre à réutiliser et recycler des matériaux de manière créative."})
    } else {
      if (profile.waterUsage !== "Economique") {
        tasks.push({task:"Réduire votre consommation d'eau en prenant des douches plus courtes."});
      }
  
      if (profile.meatConsumption !== "Jamais") {
        tasks.push({task:"Essayez de manger moins de viande, commencez par un jour sans viande par semaine."});
      }
  
      if (profile.reusableBags !== "Toujours") {
        tasks.push({task:"Utilisez des sacs réutilisables pour toutes vos courses."});
      }
  
      if (profile.lightsUsage !== "Jamais") {
        tasks.push({task:"Éteignez les lumières lorsque vous quittez une pièce."});
      }
  
      if (profile.localProducts !== "Toujours") {
        tasks.push({task:"Privilégiez les produits locaux et de saison lors de vos achats."});
      }
  
      if (profile.wasteSorting !== "Toujours") {
        tasks.push({task:"Améliorez votre tri des déchets en vous informant sur les bonnes pratiques."});
      }
  
      if (profile.ecoSpreading !== "Toujours") {
        tasks.push({task:"Consacrez du temps à sensibiliser les autres sur les bonnes pratiques écologiques."});
      }
    }
  
    return tasks;
  };