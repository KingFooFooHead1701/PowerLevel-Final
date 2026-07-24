import { ThemeName } from "@/constants/themes";

export interface ThemeCollection {
  id: string;
  label: string;
  inspiration: string;
  themeNames: ThemeName[];
}

// Collection labels and theme names are deliberately original. The
// `inspiration` field documents the creative reference for maintainers and is
// not displayed in the app.
export const themeCollections: ThemeCollection[] = [
  {
    id: "energy-legends",
    label: "Energy Legends",
    inspiration: "Dragon Ball",
    themeNames: [
      "WarriorsAura", "TranquilWaterfall", "ImperialBlaze",
      "StrictlyMaternal", "KingsHearth", "DualPersonality",
      "TriStrike", "SpiritTremor", "CandyBruiser", "DragonVerdance",
      "LewdpiggieShifter", "WatcherAbove", "ElderBeacon", "HealingDawn",
      "ColdConqueror", "SquadCommander", "TurtleHermit", "CrowdChampion",
      "BadRaddish", "VigilantZeal", "TribeamFlame", "HowlingWolf",
      "ShadowPuppeteer", "MidnightKeep", "WarriorScholar", "ZenMonk",
      "EmberLotus", "SyntheticBrother", "SyntheticSister",
    ],
  },
  {
    id: "moon-guardians",
    label: "Moon Guardians",
    inspiration: "Sailor Moon",
    themeNames: ["RoyalStardust", "LunarPrism", "MercuryCurrent", "MarsFlame"],
  },
  {
    id: "hidden-village",
    label: "Hidden Village",
    inspiration: "Naruto",
    themeNames: [
      "OrangeFox", "SpiralSage", "CrimsonVision", "NinetailsFury",
      "CrimsonEclipse", "CopyNinja", "CherryBlossom", "Sandstorm",
    ],
  },
  {
    id: "soul-guardians",
    label: "Soul Guardians",
    inspiration: "Bleach",
    themeNames: [
      "DeathReaper", "FrostBlade", "HollowBurst", "FrostReaper",
      "BlossomSovereign", "BattleManiac", "IceDragon",
    ],
  },
  {
    id: "grand-voyage",
    label: "Grand Voyage",
    inspiration: "One Piece",
    themeNames: [
      "StrawHatCrew", "PirateHunter", "FlameEmperor", "GumGumSurge",
      "ThreeSwordJade", "BlacklegCook", "StormNavigator", "SurgeonsOath",
    ],
  },
  {
    id: "breathing-blades",
    label: "Breathing Blades",
    inspiration: "Demon Slayer",
    themeNames: [
      "DemonSlayer", "ThunderBreath", "WaterPillar", "SunBreather",
      "LavenderMist",
    ],
  },
  {
    id: "titan-frontier",
    label: "Titan Frontier",
    inspiration: "Attack on Titan",
    themeNames: ["TitanRage", "SkywardResolve", "ColossalResolve"],
  },
  {
    id: "dragon-guild",
    label: "Dragon Guild",
    inspiration: "Fairy Tail",
    themeNames: ["DragonSlayer", "AstralKeys", "ScarletArmory"],
  },
  {
    id: "rising-heroes",
    label: "Rising Heroes",
    inspiration: "My Hero Academia",
    themeNames: [
      "EmeraldVanguard", "NitroBurst", "DualTempest", "GravityRose",
      "CobaltVelocity", "CrimsonResolve", "DarkFlock", "VoltageRush",
      "SonicViolet", "CreationNavy", "AcidPop", "FrogCurrent",
      "TailwindMartial", "SugarRush", "TapeSwing", "SparkleBeam",
      "AnimalWhisper", "MultiArmGuard", "GrapeBounce", "InvisibleLight",
      "SymbolicDawn", "ErasureBlack", "BroadcastGold", "NocturneViolet",
      "PrincipalWhite", "CosmicRescue", "ConcreteCraft", "PhantomClone",
      "SharpshooterAsh", "BloodCommand", "GearForge", "HoundSense",
      "HealingKiss", "SolarInferno", "CrimsonFlight", "LunarImpact",
    ],
  },
  {
    id: "crimson-night",
    label: "Crimson Night",
    inspiration: "Tokyo Ghoul",
    themeNames: ["CrimsonWing", "WhiteReaper", "OwlEclipse"],
  },
  {
    id: "reborn-tempest",
    label: "Reborn Tempest",
    inspiration: "That Time I Got Reincarnated as a Slime",
    themeNames: ["AzureRebirth", "StormDragon", "VioletAdvisor"],
  },
  {
    id: "magic-knights",
    label: "Magic Knights",
    inspiration: "Black Clover",
    themeNames: ["RoyalPride", "NullMagic", "WindSpirit", "CrimsonLion"],
  },
  {
    id: "silver-samurai",
    label: "Silver Samurai",
    inspiration: "Gintama",
    themeNames: ["SilverSpirit", "ScarletDiplomat", "DemonVice"],
  },
  {
    id: "equivalent-exchange",
    label: "Equivalent Exchange",
    inspiration: "Fullmetal Alchemist",
    themeNames: ["AlchemistBrothers", "EmberCommander", "AlloyResolve"],
  },
  {
    id: "shadow-awakening",
    label: "Shadow Awakening",
    inspiration: "Solo Leveling",
    themeNames: ["NightSovereign", "IceElf", "CrimsonCommander"],
  },
  {
    id: "cursed-vanguard",
    label: "Cursed Vanguard",
    inspiration: "Jujutsu Kaisen",
    themeNames: ["LimitlessNight", "EchoingStrike", "SovereignHex"],
  },
  {
    id: "hunters-resolve",
    label: "Hunter's Resolve",
    inspiration: "Hunter x Hunter",
    themeNames: ["ElasticAura", "ScarletChains", "LightningProdigy"],
  },
  {
    id: "generational-legends",
    label: "Generational Legends",
    inspiration: "JoJo's Bizarre Adventure",
    themeNames: ["AstralTitan", "GildedGale", "StoneTide"],
  },
  {
    id: "devil-engine",
    label: "Devil Engine",
    inspiration: "Chainsaw Man",
    themeNames: ["SawbladeRush", "BloodRiot", "ControlRed"],
  },
  {
    id: "afterglow-odyssey",
    label: "Afterglow Odyssey",
    inspiration: "Frieren",
    themeNames: ["QuietMage", "HeroicAzure", "GoldenAdept"],
  },
  {
    id: "judgment-game",
    label: "Judgment Game",
    inspiration: "Death Note",
    themeNames: ["CrimsonNotebook", "DetectiveWhite", "ReaperApple"],
  },
  {
    id: "paranormal-pulse",
    label: "Paranormal Pulse",
    inspiration: "DAN DA DAN",
    themeNames: ["TurboCrimson", "GreyInvader", "OccultGold"],
  },
  {
    id: "monster-vanguard",
    label: "Monster Vanguard",
    inspiration: "Kaiju No. 8",
    themeNames: ["MonsterPulse", "DefenseCaptain", "CaptainCannon"],
  },
  {
    id: "secret-household",
    label: "Secret Household",
    inspiration: "SPY x FAMILY",
    themeNames: ["DuskAgent", "RoseAssassin", "StarlitProdigy"],
  },
  {
    id: "inferno-brigade",
    label: "Inferno Brigade",
    inspiration: "Fire Force",
    themeNames: ["DevilFootprints", "CrimsonCaptain", "SacredInferno"],
  },
  {
    id: "psychic-balance",
    label: "Psychic Balance",
    inspiration: "Mob Psycho 100",
    themeNames: ["PeakFocus", "SpiritMentor", "TornadoGreen"],
  },
  {
    id: "virtual-blades",
    label: "Virtual Blades",
    inspiration: "Sword Art Online",
    themeNames: ["DualWielder", "AzureFlash", "FrostRoseKnight"],
  },
];

export const findThemeCollection = (themeName: ThemeName) =>
  themeCollections.find((collection) =>
    collection.themeNames.includes(themeName)
  );
