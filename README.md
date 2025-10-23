<div align="center" style="font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;">

  <img src="./assets/slack-logo.png" alt="Slack" />

  <h1 style="
    margin: 12px 0 6px;
    font-weight: 800;
    letter-spacing: -0.02em;
    background: linear-gradient(90deg,#611f69 0%, #36C5F0 40%, #2EB67D 70%, #E01E5A 100%);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;">
    Slack Bot TypeScript — Bolt (Socket Mode)
  </h1>

  <div style="opacity:.85; margin-bottom: 18px;">
    Bot pédagogique en TypeScript utilisant le framework officiel Bolt pour Slack.
  </div>

  <div style="display:inline-block; padding:6px 10px; border-radius:100px; font-size:12px; background:rgba(54,197,240,.12); color:#0b647a; border:1px solid rgba(54,197,240,.35)">
    Node.js • TypeScript • Slack Bolt • Socket Mode
  </div>

  <div style="height:2px; width:160px; margin:18px auto 22px; background:
    linear-gradient(90deg, rgba(97,31,105,0) 0%, rgba(97,31,105,.8) 50%, rgba(97,31,105,0) 100%);
    animation: glow 2.4s ease-in-out infinite;">
  </div>

</div>

<style>
@keyframes glow { 0%,100% {opacity:.25} 50% {opacity:1} }
.badge { display:inline-block; padding:4px 8px; border-radius:8px; font-size:12px; border:1px solid rgba(0,0,0,.08); background:rgba(0,0,0,.03)}
.card { border:1px solid rgba(0,0,0,.08); border-radius:14px; padding:16px; background:linear-gradient(180deg, rgba(255,255,255,.9), rgba(250,250,255,.9)) }
.kbd { font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; background:#111; color:#fff; border-radius:6px; padding:2px 6px; font-size:12px }
.step { counter-increment: s; }
.step::before { content: counter(s) "."; font-weight:700; margin-right:6px; color:#611f69 }
</style>

<!-- STYLE END -->

## Sommaire

* [Contexte & Objectif](#contexte--objectif)
* [Énoncé de l’exercice](#énoncé-de-lexercice)
* [Architecture du projet](#architecture-du-projet)
* [Pré-requis](#pré-requis)
* [Création de l’app Slack](#création-de-lapp-slack)
* [Permissions (Scopes) & Installation](#permissions-scopes--installation)
* [Activation des événements (Events API)](#activation-des-événements-events-api)
* [Commande Slash `/hello`](#commande-slash-hello)
* [Configuration locale (.env)](#configuration-locale-env)
* [Lancement du projet](#lancement-du-projet)
* [Vérifications & Tests](#vérifications--tests)
* [Dépannage rapide](#dépannage-rapide)
* [Captures d’écran](#captures-décran)
* [À propos de Slack & Bolt](#à-propos-de-slack--bolt)
* [Crédits](#crédits)

---

## Contexte & Objectif

Construire un **bot Slack** en **TypeScript** avec **Bolt**, capable de :

* écouter les messages d’un canal,
* reconnaître une commande personnalisée `/hello`,
* et consigner (logger) les messages reçus.

Le projet utilise **Socket Mode** pour fonctionner **sans URL publique**.

---

## Énoncé de l’exercice

1. Créer une app Slack et configurer :

   * Scopes OAuth requis,
   * Events API (abonnement aux messages),
   * Slash command `/hello`,
   * Socket Mode activé.
2. Développer un bot Node.js/TypeScript (via Bolt) qui :

   * se connecte à Slack,
   * répond à `/hello`,
   * loge chaque message reçu dans le canal.
3. Lancer localement et tester dans Slack.

---

## Architecture du projet

> Cette section présente **l’arborescence** uniquement. Le code n’est **pas** fourni ici.

```
slack-bot-ts/
├─ src/
│  ├─ handlers/
│  │  ├─ hello.ts           # Gestion de /hello
│  │  └─ messages.ts        # Écoute et log des messages
│  ├─ logger.ts             # Logger simple
│  └─ index.ts              # Bootstrap Bolt (Socket Mode)
├─ assets/
│  ├─ slack-logo.svg        # Logo Slack (fourni par toi)
│  ├─ phone1.jpeg           # Capture écran tel #1
│  ├─ phone2.jpeg           # Capture écran tel #2
│  └─ terminal.png          # Capture terminal
├─ .env.example             # Variables d’environnement (modèle)
├─ .gitignore               # Ignore node_modules, .env, dist...
├─ package.json             # Scripts npm (dev, build, start)
├─ tsconfig.json            # Compilation TypeScript
└─ README.md                # Ce document
```

---

## Pré-requis

* Node.js 18+
* Accès à un **workspace Slack** pour créer/installer une App
* Droits suffisants pour ajouter une App au workspace

---

## Création de l’app Slack

1. Ouvrir le tableau de bord : [https://api.slack.com/apps](https://api.slack.com/apps)
2. Créer une nouvelle app **From scratch** et lui donner un nom.
3. Noter l’**App ID** (information).

---

## Permissions (Scopes) & Installation

Dans **OAuth & Permissions** → **Bot Token Scopes**, ajouter :

* `chat:write` — publier des messages
* `channels:history` — lire l’historique des canaux publics
* `commands` — utiliser les Slash commands

Installer l’app dans le workspace via **Install to Workspace**.
Récupérer le **Bot User OAuth Token** (format `xoxb-...`) et le conserver.

---

## Activation des événements (Events API)

1. **Socket Mode** : activer dans **Socket Mode** et générer un **App-Level Token** avec scope `connections:write` (format `xapp-...`).
2. **Event Subscriptions** : activer puis, dans **Bot Events**, souscrire à :

   * `message.channels`
     (optionnel : `message.groups`, `message.im`, `message.mpim` selon tes besoins)

En Socket Mode, pas besoin d’URL publique.

---

## Commande Slash `/hello`

Dans **Slash Commands** :

* Command: `/hello`
* Description: `Say hello`
* Request URL: placeholder acceptée en Socket Mode (ex. `https://example.com/placeholder`)
* Sauvegarder.

---

## Configuration locale (.env)

Créer un fichier `.env` à la racine en partant de `.env.example` :

```
SLACK_BOT_TOKEN=xoxb-xxxxxxxxxxxxxxxxxxxxxxxx
SLACK_APP_TOKEN=xapp-xxxxxxxxxxxxxxxxxxxxxxxx
```

Ne jamais committer les secrets. `.gitignore` couvre `.env`.

---

## Lancement du projet

Scripts typiques dans `package.json` :

* Développement (watch TypeScript) :
  `npm run dev`
* Build (transpile TS → JS) :
  `npm run build`
* Production (exécute le JS compilé) :
  `npm start`

Étapes usuelles :

1. Installer les dépendances : `npm install`
2. Démarrer en dev : `npm run dev`
   Attendre le message confirmant que le bot est connecté via Socket Mode.
3. Inviter le bot dans un canal public depuis Slack.

---

## Vérifications & Tests

1. **Inviter le bot** dans un canal (ex. `#general`) : mentionner le nom de l’app et cliquer sur *Invite*.
2. **Slash command** : saisir `/hello` → le bot doit répondre dans le canal.
3. **Écoute des messages** : envoyer un message dans le canal → vérifier que le terminal affiche un log du texte reçu.

Astuce : si tu as activé un mot-clé (ex. ping → Pong) côté bot, envoie « ping » pour valider la réponse automatique.

---

## Dépannage rapide

* La commande `/hello` ne répond pas :

  * Vérifier `commands` dans **Bot Token Scopes**.
  * Réinstaller l’app après tout changement de scopes.
* Aucun message n’est loggé :

  * Le bot est-il **invité** dans le canal ?
  * **Event Subscriptions** actif et `message.channels` bien ajouté ?
  * `channels:history` présent dans les scopes ?
* Erreurs de secrets :

  * Vérifier `.env` et le chargement des variables.

---

## Captures d’écran

> Place les fichiers dans `./assets/` selon les noms ci-dessous.

<div style="display:flex; gap:10px; align-items:flex-start; margin:14px 0;">
  <picture>
    <img src="./assets/phone1.jpeg" alt="Capture téléphone 1" style="width:49%; border-radius:12px; border:1px solid rgba(0,0,0,.08);" />
  </picture>
  <picture>
    <img src="./assets/phone2.jpeg" alt="Capture téléphone 2" style="width:49%; border-radius:12px; border:1px solid rgba(0,0,0,.08);" />
  </picture>
</div>

<div class="card" style="margin-top:10px;">
  <div style="font-weight:700; margin-bottom:8px;">Terminal</div>
  <img src="./assets/terminal.png" alt="Terminal" style="width:100%; border-radius:10px; border:1px solid rgba(0,0,0,.08);" />
</div>

---

## À propos de Slack & Bolt

**Slack** est une plateforme de communication d’équipe permettant d’échanger via canaux, messages directs, fichiers et intégrations.
**Bolt** est le **framework officiel** de Slack pour créer des apps et des bots, disponible pour Node.js, Python et Java, et propose une API haut niveau pour gérer commandes, événements, interactivités et vues, avec authentification OAuth et Socket Mode.

Ressources utiles :

* Slack API Apps — tableau de bord développeur
* Bolt for JavaScript — documentation officielle
* Events API & Socket Mode — concepts et guides

---

## Crédits

* Conception et pédagogie : Daniel / GomyCode
* Stack technique : Node.js, TypeScript, Slack Bolt (Socket Mode)
* Marque et logo : Slack

---