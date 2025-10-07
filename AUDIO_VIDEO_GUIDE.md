# Guide Audio & Vidéo - Musée 2.0

## 📋 Vue d'ensemble

Selon le cahier des charges du hackathon, chaque œuvre doit avoir :

- ✅ Descriptions textuelles multilingues (FR/EN/WO)
- ✅ Fichiers audio pour chaque langue
- ✅ Vidéos explicatives (optionnel)

## 🎵 Fichiers Audio

### Structure des fichiers

Les fichiers audio sont organisés comme suit :

```
public/audio/
├── mcn-001-fr.mp3  (Masque Gelede - Français)
├── mcn-001-en.mp3  (Masque Gelede - Anglais)
├── mcn-001-wo.mp3  (Masque Gelede - Wolof)
├── mcn-002-fr.mp3  (Tissu Kente - Français)
├── mcn-002-en.mp3  (Tissu Kente - Anglais)
├── mcn-002-wo.mp3  (Tissu Kente - Wolof)
└── ... (et ainsi de suite)
```

### Options pour générer les fichiers audio

#### Option 1 : Text-to-Speech en ligne (Rapide pour le hackathon)

**Google Cloud Text-to-Speech**

```bash
# Installer gcloud CLI
# https://cloud.google.com/sdk/docs/install

# Générer un fichier audio
gcloud text-to-speech synthesize-long-audio \
  --text="Le masque Gelede est une œuvre majeure..." \
  --output-audio=mcn-001-fr.mp3 \
  --language-code=fr-FR \
  --voice-name=fr-FR-Neural2-A
```

**Services en ligne (sans code)**

- [TTSMaker](https://ttsmaker.com/) - Gratuit, supporte 50+ langues
- [Natural Readers](https://www.naturalreaders.com/)
- [TTSFree](https://ttsfree.com/)

#### Option 2 : API Web Speech (Navigateur)

Utiliser l'API Web Speech API directement dans le navigateur :

```javascript
const speak = (text, lang = "fr-FR") => {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  window.speechSynthesis.speak(utterance);
};

// Utilisation
speak("Le masque Gelede...", "fr-FR");
```

#### Option 3 : Enregistrements humains (Meilleure qualité)

Pour une expérience optimale, enregistrer des narrateurs humains :

- Français : Voix professionnelle francophone
- Anglais : Voix anglophone native
- Wolof : Locuteur natif wolof

**Outils d'enregistrement recommandés :**

- [Audacity](https://www.audacityteam.org/) (Gratuit)
- [GarageBand](https://www.apple.com/mac/garageband/) (Mac)
- Studio d'enregistrement professionnel (pour meilleure qualité)

### Format recommandé

- **Format** : MP3 (compatibilité universelle)
- **Bitrate** : 128 kbps (bon compromis qualité/taille)
- **Durée** : 30-60 secondes par œuvre
- **Taille** : ~500 KB - 1 MB par fichier

## 🎥 Fichiers Vidéo

### Structure des vidéos

```
public/videos/
├── mcn-001.mp4  (Présentation du Masque Gelede)
├── mcn-002.mp4  (Histoire du Tissu Kente)
└── ...
```

### Options pour les vidéos

#### Option 1 : Vidéos YouTube

Actuellement configuré avec des vidéos YouTube embedded :

```json
"videoUrl": "https://www.youtube.com/embed/VIDEO_ID"
```

**Avantages :**

- Pas de stockage nécessaire
- Streaming optimisé
- Facile à mettre à jour

#### Option 2 : Vidéos hébergées localement

```json
"videoUrl": "/videos/mcn-001.mp4"
```

**Format recommandé :**

- **Format** : MP4 (H.264)
- **Résolution** : 1280x720 (HD) ou 1920x1080 (Full HD)
- **Durée** : 1-3 minutes
- **Taille** : 5-20 MB par vidéo

#### Option 3 : Vimeo ou autres plateformes

```json
"videoUrl": "https://player.vimeo.com/video/VIDEO_ID"
```

## 🚀 Mise en place rapide pour le hackathon

### Étape 1 : Créer le dossier audio

```bash
mkdir public/audio
```

### Étape 2 : Générer les fichiers audio avec TTSMaker

1. Aller sur https://ttsmaker.com/
2. Copier le texte de description de chaque œuvre
3. Sélectionner la langue (Français / English / Wolof si disponible)
4. Télécharger le fichier MP3
5. Renommer selon la convention : `mcn-XXX-YY.mp3`

### Étape 3 : Ajouter des vidéos YouTube

1. Rechercher des vidéos pertinentes sur YouTube
2. Copier l'ID de la vidéo (après `watch?v=`)
3. Mettre à jour `artworks.json` avec l'URL embed

## 📱 Intégration dans l'interface

### Lecteur Audio

Le composant `ArtworkDetail` doit afficher un lecteur audio :

```tsx
{
  translation.audioUrl && (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-2">🎧 Écouter la description</h3>
      <audio controls className="w-full">
        <source src={translation.audioUrl} type="audio/mpeg" />
        Votre navigateur ne supporte pas la lecture audio.
      </audio>
    </div>
  );
}
```

### Lecteur Vidéo

```tsx
{
  artwork.videoUrl && (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-2">🎥 Vidéo explicative</h3>
      <iframe
        src={artwork.videoUrl}
        className="w-full aspect-video rounded-lg"
        allowFullScreen
      />
    </div>
  );
}
```

## ✅ Checklist pour le hackathon

- [ ] Créer dossier `/public/audio/`
- [ ] Générer 15 fichiers audio (5 œuvres × 3 langues)
- [ ] Ajouter au moins 2-3 vidéos de démonstration
- [ ] Tester le lecteur audio sur mobile
- [ ] Vérifier la compatibilité des formats
- [ ] Optimiser la taille des fichiers

## 🎯 Alternatives temporaires (Demo)

Si vous manquez de temps, vous pouvez :

1. Utiliser des fichiers audio de démonstration
2. Pointer vers des vidéos YouTube existantes sur l'art africain
3. Implémenter Web Speech API pour génération en temps réel

## 📞 Contact

Pour toute question technique :

- Email : contact@senstartup.com
- Tél : +221 77 106 19 17

---

_Document créé pour le Hackathon Musée des Civilisations Noires - Dakar Slush'D 2025_
