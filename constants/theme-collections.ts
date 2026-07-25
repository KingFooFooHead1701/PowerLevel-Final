import { ThemeName } from "@/constants/themes";

export interface ThemeCollection {
  id: string;
  label: string;
  inspiration: string;
  themeNames: ThemeName[];
}

export interface ThemeCollectionPalette {
  background: string;
  primary: string;
  secondary: string;
  text: string;
}

export const themeCollectionPalettes: Record<string, ThemeCollectionPalette> = {
  "energy-legends": {
    background: "#2A1304",
    primary: "#FF7A00",
    secondary: "#2F80ED",
    text: "#FFFFFF",
  },
  "moon-guardians": {
    background: "#23103D",
    primary: "#F472B6",
    secondary: "#FDE047",
    text: "#FFFFFF",
  },
  "hidden-village": {
    background: "#2B1403",
    primary: "#F97316",
    secondary: "#111827",
    text: "#FFFFFF",
  },
  "soul-guardians": {
    background: "#101827",
    primary: "#E5E7EB",
    secondary: "#38BDF8",
    text: "#FFFFFF",
  },
  "grand-voyage": {
    background: "#061C35",
    primary: "#DC2626",
    secondary: "#FACC15",
    text: "#FFFFFF",
  },
  "breathing-blades": {
    background: "#10251E",
    primary: "#14B8A6",
    secondary: "#EF4444",
    text: "#FFFFFF",
  },
  "titan-frontier": {
    background: "#182016",
    primary: "#6B8E23",
    secondary: "#C98B5B",
    text: "#FFFFFF",
  },
  "dragon-guild": {
    background: "#271016",
    primary: "#DC2626",
    secondary: "#F59E0B",
    text: "#FFFFFF",
  },
  "rising-heroes": {
    background: "#071C16",
    primary: "#19C37D",
    secondary: "#F3F4F6",
    text: "#FFFFFF",
  },
  "crimson-night": {
    background: "#20070D",
    primary: "#BE123C",
    secondary: "#111827",
    text: "#FFFFFF",
  },
  "reborn-tempest": {
    background: "#061C28",
    primary: "#38BDF8",
    secondary: "#8B5CF6",
    text: "#FFFFFF",
  },
  "magic-knights": {
    background: "#17101F",
    primary: "#7C3AED",
    secondary: "#FACC15",
    text: "#FFFFFF",
  },
  "silver-samurai": {
    background: "#171A20",
    primary: "#CBD5E1",
    secondary: "#38BDF8",
    text: "#FFFFFF",
  },
  "equivalent-exchange": {
    background: "#1D1710",
    primary: "#B91C1C",
    secondary: "#D4AF37",
    text: "#FFFFFF",
  },
  "shadow-awakening": {
    background: "#080716",
    primary: "#4F46E5",
    secondary: "#8B5CF6",
    text: "#FFFFFF",
  },
  "cursed-vanguard": {
    background: "#12091F",
    primary: "#6366F1",
    secondary: "#EC4899",
    text: "#FFFFFF",
  },
  "hunters-resolve": {
    background: "#111A0C",
    primary: "#84CC16",
    secondary: "#8B5CF6",
    text: "#FFFFFF",
  },
  "generational-legends": {
    background: "#141128",
    primary: "#FACC15",
    secondary: "#8B5CF6",
    text: "#FFFFFF",
  },
  "devil-engine": {
    background: "#210707",
    primary: "#EF4444",
    secondary: "#111827",
    text: "#FFFFFF",
  },
  "afterglow-odyssey": {
    background: "#101B24",
    primary: "#E0F2FE",
    secondary: "#D4AF37",
    text: "#FFFFFF",
  },
  "judgment-game": {
    background: "#090B10",
    primary: "#DC2626",
    secondary: "#F8FAFC",
    text: "#FFFFFF",
  },
  "paranormal-pulse": {
    background: "#21112E",
    primary: "#F97316",
    secondary: "#7C3AED",
    text: "#FFFFFF",
  },
  "monster-vanguard": {
    background: "#071B13",
    primary: "#22C55E",
    secondary: "#2563EB",
    text: "#FFFFFF",
  },
  "secret-household": {
    background: "#101D15",
    primary: "#166534",
    secondary: "#D4AF37",
    text: "#FFFFFF",
  },
  "inferno-brigade": {
    background: "#251004",
    primary: "#F97316",
    secondary: "#0EA5E9",
    text: "#FFFFFF",
  },
  "psychic-balance": {
    background: "#171024",
    primary: "#EC4899",
    secondary: "#38BDF8",
    text: "#FFFFFF",
  },
  "virtual-blades": {
    background: "#07162B",
    primary: "#2563EB",
    secondary: "#38BDF8",
    text: "#FFFFFF",
  },
};

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
    themeNames: [
      "RoyalStardust", "LunarPrism", "MercuryCurrent", "MarsFlame",
      "JupiterThunder", "VenusRadiance",
    ],
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
      "LavenderMist", "BoarFury", "InsectPoison",
    ],
  },
  {
    id: "titan-frontier",
    label: "Titan Frontier",
    inspiration: "Attack on Titan",
    themeNames: [
      "TitanRage", "SkywardResolve", "ColossalResolve", "ArmoredResolve",
      "CrystalTitan",
    ],
  },
  {
    id: "dragon-guild",
    label: "Dragon Guild",
    inspiration: "Fairy Tail",
    themeNames: [
      "DragonSlayer", "AstralKeys", "ScarletArmory", "IceMaker",
      "IronDragon",
    ],
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
    themeNames: [
      "CrimsonWing", "WhiteReaper", "OwlEclipse", "RabbitRush",
      "GourmetViolet",
    ],
  },
  {
    id: "reborn-tempest",
    label: "Reborn Tempest",
    inspiration: "That Time I Got Reincarnated as a Slime",
    themeNames: [
      "AzureRebirth", "StormDragon", "VioletAdvisor", "OniBlaze",
      "CrimsonOgre",
    ],
  },
  {
    id: "magic-knights",
    label: "Magic Knights",
    inspiration: "Black Clover",
    themeNames: [
      "RoyalPride", "NullMagic", "WindSpirit", "CrimsonLion",
      "DarkBullCaptain", "LionessInferno",
    ],
  },
  {
    id: "silver-samurai",
    label: "Silver Samurai",
    inspiration: "Gintama",
    themeNames: [
      "SilverSpirit", "ScarletDiplomat", "DemonVice", "LensSamurai",
      "MayonnaiseVice",
    ],
  },
  {
    id: "equivalent-exchange",
    label: "Equivalent Exchange",
    inspiration: "Fullmetal Alchemist",
    themeNames: [
      "AlchemistBrothers", "EmberCommander", "AlloyResolve",
      "HawkeyeFocus", "ScarredAvenger",
    ],
  },
  {
    id: "shadow-awakening",
    label: "Shadow Awakening",
    inspiration: "Solo Leveling",
    themeNames: [
      "NightSovereign", "IceElf", "CrimsonCommander", "GoldenHunter",
      "BeastFang",
    ],
  },
  {
    id: "cursed-vanguard",
    label: "Cursed Vanguard",
    inspiration: "Jujutsu Kaisen",
    themeNames: [
      "LimitlessNight", "EchoingStrike", "SovereignHex", "TenShadows",
      "CursedQueen",
    ],
  },
  {
    id: "hunters-resolve",
    label: "Hunter's Resolve",
    inspiration: "Hunter x Hunter",
    themeNames: [
      "ElasticAura", "ScarletChains", "LightningProdigy", "JesterBungee",
      "DoctorResolve",
    ],
  },
  {
    id: "generational-legends",
    label: "Generational Legends",
    inspiration: "JoJo's Bizarre Adventure",
    themeNames: [
      "AstralTitan", "GildedGale", "StoneTide", "DiamondHeart",
      "OceanStrings",
    ],
  },
  {
    id: "devil-engine",
    label: "Devil Engine",
    inspiration: "Chainsaw Man",
    themeNames: [
      "SawbladeRush", "BloodRiot", "ControlRed", "BombRequiem",
      "AngelDusk",
    ],
  },
  {
    id: "afterglow-odyssey",
    label: "Afterglow Odyssey",
    inspiration: "Frieren",
    themeNames: [
      "QuietMage", "HeroicAzure", "GoldenAdept", "WarriorRed",
      "AxeGuardian",
    ],
  },
  {
    id: "judgment-game",
    label: "Judgment Game",
    inspiration: "Death Note",
    themeNames: [
      "CrimsonNotebook", "DetectiveWhite", "ReaperApple",
      "DevotedCrimson", "SuccessorMaze",
    ],
  },
  {
    id: "paranormal-pulse",
    label: "Paranormal Pulse",
    inspiration: "DAN DA DAN",
    themeNames: [
      "TurboCrimson", "GreyInvader", "OccultGold", "ShrineGuardian",
      "EvilEyePulse",
    ],
  },
  {
    id: "monster-vanguard",
    label: "Monster Vanguard",
    inspiration: "Kaiju No. 8",
    themeNames: [
      "MonsterPulse", "DefenseCaptain", "CaptainCannon", "IceProdigy",
      "ViceBlade",
    ],
  },
  {
    id: "secret-household",
    label: "Secret Household",
    inspiration: "SPY x FAMILY",
    themeNames: [
      "DuskAgent", "RoseAssassin", "StarlitProdigy", "FutureHound",
      "NightfallIce",
    ],
  },
  {
    id: "inferno-brigade",
    label: "Inferno Brigade",
    inspiration: "Fire Force",
    themeNames: [
      "DevilFootprints", "CrimsonCaptain", "SacredInferno",
      "PlasmaKnight", "LuckyFlare",
    ],
  },
  {
    id: "psychic-balance",
    label: "Psychic Balance",
    inspiration: "Mob Psycho 100",
    themeNames: [
      "PeakFocus", "SpiritMentor", "TornadoGreen", "BodyImprovement",
      "ClawScarlet",
    ],
  },
  {
    id: "virtual-blades",
    label: "Virtual Blades",
    inspiration: "Sword Art Online",
    themeNames: [
      "DualWielder", "AzureFlash", "FrostRoseKnight", "DragonTamer",
      "GreenArcher",
    ],
  },
];

export const findThemeCollection = (themeName: ThemeName) =>
  themeCollections.find((collection) =>
    collection.themeNames.includes(themeName)
  );
