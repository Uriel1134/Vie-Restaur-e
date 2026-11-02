/**
 * Contenus éditoriaux de l'association (issus du brief client).
 * Ils seront migrés dans le CMS lors de la mise en place du dashboard.
 */

export const missions = [
  {
    id: "service-social",
    numero: "01",
    titre: "Le service social",
    accroche: "Être là, concrètement, quand une mère se retrouve seule face à tout.",
    points: [
      "Soutien moral et psychologique",
      "Aide matérielle aux familles",
      "Accompagnement vers l’autonomie financière",
      "Aide à la création d’une activité",
    ],
    details: [
      {
        titre: "Soutien moral et psychologique",
        texte:
          "Écouter, rassurer, aider à reprendre confiance. Personne ne devrait traverser seul une grossesse difficile, une séparation ou la charge d’élever ses enfants sans appui.",
      },
      {
        titre: "Aide matérielle",
        texte:
          "Nourriture, produits de première nécessité, aide financière ponctuelle : répondre à l’urgence pour que la famille puisse souffler et se projeter.",
      },
      {
        titre: "Autonomie financière",
        texte:
          "Accompagner chaque parent vers des revenus stables, pour sortir durablement de la dépendance et des choix contraints.",
      },
      {
        titre: "Création d’activité",
        texte:
          "Aider à lancer une petite activité génératrice de revenus : une idée, un premier équipement, des conseils, et la fierté de subvenir soi-même aux besoins des siens.",
      },
    ],
  },
  {
    id: "sensibilisation",
    numero: "02",
    titre: "La sensibilisation",
    accroche: "Parler tôt, parler vrai, pour que les drames d’hier ne se répètent pas.",
    points: [
      "Grossesses précoces",
      "Esclavage moderne",
      "Abandons d’enfants",
      "Voyages clandestins vers l’Europe et ailleurs",
    ],
    details: [
      {
        titre: "Grossesses précoces",
        texte:
          "Informer les jeunes filles et leurs familles, pour prévenir les grossesses trop tôt et les avortements clandestins qui coûtent encore des vies.",
      },
      {
        titre: "Esclavage moderne",
        texte:
          "Reconnaître les situations d’exploitation, connaître ses droits et savoir à qui s’adresser pour en sortir.",
      },
      {
        titre: "Abandons d’enfants",
        texte:
          "Agir en amont, auprès des mères en difficulté, pour qu’aucun enfant ne soit laissé dans un orphelinat ou, pire, à la rue.",
      },
      {
        titre: "Voyages clandestins",
        texte:
          "Dire la réalité des routes de l’exil vers l’Europe et ailleurs, et ouvrir d’autres perspectives sur place.",
      },
    ],
  },
] as const;

export const terrain = [
  { pays: "Congo", code: "CG", rotation: -2.5, texte: "Aide alimentaire à l’association La Ligue des orphelins." },
  { pays: "Haïti", code: "HT", rotation: 1.8, texte: "Soutien financier à l’association Les Précurseurs." },
  { pays: "Cameroun", code: "CM", rotation: -1.2, texte: "Aide aux détenues de la prison centrale de Douala." },
] as const;

export const projetAnnee =
  "Ouvrir trois bureaux au Cameroun : dans le Nord, à l’Ouest et à Douala, pour être au plus près des familles.";

export const rayons = [
  {
    id: "vetements",
    titre: "Vêtements & objets personnalisés",
    court: "Portez le message.",
    texte: "Textiles et objets personnalisés aux couleurs de l’association, déclinés en plusieurs tailles et coloris.",
    rotation: -4,
  },
  {
    id: "bijoux",
    titre: "Bijoux",
    court: "Acier inoxydable & pierres naturelles.",
    texte: "Des bijoux en acier inoxydable et en pierres naturelles, à offrir ou à s’offrir.",
    rotation: 3,
  },
  {
    id: "livre",
    titre: "Le livre",
    court: "Une lecture qui prolonge la mission.",
    texte: "Un livre pour prolonger la réflexion et faire connaître notre combat autour de vous.",
    rotation: -2,
  },
  {
    id: "animations",
    titre: "Animations",
    court: "Pour vos événements, à notre profit.",
    texte:
      "Une prestation d’animation pour votre événement : l’intégralité des recettes soutient les actions de l’association.",
    rotation: 4,
  },
] as const;

/** À VALIDER avec la présidente : valeurs déduites de la charte et du brief. */
export const valeurs = [
  {
    titre: "Dignité",
    texte: "Nous regardons chaque personne pour ce qu’elle peut devenir, jamais pour ce qu’elle a traversé.",
  },
  {
    titre: "Proximité",
    texte: "Être sur place, connaître les familles par leur prénom, répondre vite et simplement.",
  },
  {
    titre: "Concret",
    texte: "Des actions visibles et utiles : un repas, une formation, une activité qui démarre.",
  },
  {
    titre: "Espérance",
    texte: "Nous croyons qu’une personne restaurée peut accomplir de grandes œuvres. Et nous le voyons.",
  },
] as const;

export const publics = [
  { titre: "Les familles", texte: "Mères et pères seuls, enfants, proches qui les soutiennent." },
  { titre: "Les prisons", texte: "Accompagner les détenues, souvent mères, et préparer leur retour." },
  { titre: "Les écoles", texte: "Informer et prévenir auprès des jeunes, avant que les drames n’arrivent." },
  { titre: "Les hôpitaux", texte: "Être présents auprès des mères et des enfants dans les moments fragiles." },
] as const;
