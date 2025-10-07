# 📝 Notes sur les Œuvres - Musée 2.0

## ✅ Conformité avec le Cahier des Charges

Toutes les fonctionnalités requises ont été implémentées dans le fichier `artworks.json` :

### 1. Scan des œuvres via QR Code ✅
Chaque œuvre possède un `qrCode` unique (ex: MCN001, MCN002...)

### 2. Descriptions multilingues ✅
- **Français** (fr)
- **Anglais** (en)  
- **Wolof** (wo)

### 3. Contenu multimédia ✅
- **Texte** : Description, période, origine, contexte culturel
- **Audio** : URL audio pour chaque langue (`audioUrl`)
- **Vidéo** : URL vidéo explicative (`videoUrl`)

### 4. Galerie d'images ✅
Chaque œuvre peut avoir plusieurs images (`imageGallery`)

## 📊 Œuvres actuellement disponibles

| ID | Titre | Catégorie | Origine | Featured |
|----|-------|-----------|---------|----------|
| MCN-001 | Masque Gelede | Sculpture | Nigéria - Yoruba | ⭐ Oui |
| MCN-002 | Tissu Kente Royal | Textile | Ghana - Akan | ⭐ Oui |
| MCN-003 | Statue Akua'ba | Sculpture | Ghana - Ashanti | Non |
| MCN-004 | Tambour Parlant | Instrument | Nigéria - Yoruba | Non |
| MCN-005 | Couronne Royale | Bijoux | Cameroun - Bamoun | ⭐ Oui |

## 🎵 Fichiers Audio à générer

Pour respecter pleinement le cahier des charges, générez les fichiers audio suivants :

```
public/audio/
├── mcn-001-fr.mp3  ← Masque Gelede (Français)
├── mcn-001-en.mp3  ← Masque Gelede (Anglais)
├── mcn-001-wo.mp3  ← Masque Gelede (Wolof)
├── mcn-002-fr.mp3  ← Tissu Kente (Français)
├── mcn-002-en.mp3  ← Tissu Kente (Anglais)
├── mcn-002-wo.mp3  ← Tissu Kente (Wolof)
├── mcn-003-fr.mp3  ← Statue Akua'ba (Français)
├── mcn-003-en.mp3  ← Statue Akua'ba (Anglais)
├── mcn-003-wo.mp3  ← Statue Akua'ba (Wolof)
├── mcn-004-fr.mp3  ← Tambour Parlant (Français)
├── mcn-004-en.mp3  ← Tambour Parlant (Anglais)
├── mcn-004-wo.mp3  ← Tambour Parlant (Wolof)
├── mcn-005-fr.mp3  ← Couronne Royale (Français)
├── mcn-005-en.mp3  ← Couronne Royale (Anglais)
└── mcn-005-wo.mp3  ← Couronne Royale (Wolof)
```

**Total : 15 fichiers audio** (5 œuvres × 3 langues)

### Génération rapide avec TTSMaker

1. Allez sur https://ttsmaker.com/
2. Pour chaque œuvre, copiez la `description` dans la langue correspondante
3. Sélectionnez la voix :
   - **Français** : "French (France)" → "Léa" ou "Thomas"
   - **English** : "English (USA)" → "Jenny" ou "Guy"
   - **Wolof** : Si non disponible, utilisez "French (Senegal)" en alternative
4. Téléchargez le MP3
5. Renommez selon la convention : `mcn-XXX-YY.mp3`

## 🎥 Vidéos

Les URLs vidéo sont actuellement configurées avec des placeholders YouTube.

### Pour le hackathon, options recommandées :

#### Option A : Vidéos YouTube existantes
Recherchez des vidéos pertinentes sur :
- Art Yoruba
- Tissage Kente traditionnel
- Artisanat africain
- Musée des Civilisations Noires

#### Option B : Créer vos propres vidéos courtes
- Filmer des démonstrations (1-2 minutes)
- Présenter le contexte historique
- Montrer les détails de l'œuvre

## 🔧 Prochaines étapes

1. **Créer le dossier audio**
   ```bash
   mkdir public/audio
   ```

2. **Générer les 15 fichiers audio**
   Voir le guide détaillé dans `AUDIO_VIDEO_GUIDE.md`

3. **Mettre à jour les URLs vidéo**
   Remplacer les placeholders dans `artworks.json`

4. **Tester l'affichage**
   Vérifier que les lecteurs audio/vidéo fonctionnent sur toutes les pages

## 📋 Checklist Hackathon

- [x] Structure JSON des œuvres
- [x] Descriptions trilingues complètes
- [x] Champs audioUrl ajoutés
- [x] Champs videoUrl ajoutés
- [x] QR Codes configurés
- [ ] Générer fichiers audio MP3
- [ ] Ajouter vraies vidéos YouTube
- [ ] Tester lecteur audio
- [ ] Tester lecteur vidéo
- [ ] Optimiser pour mobile

## 🎯 Critères d'évaluation couverts

| Critère | Status | Notes |
|---------|--------|-------|
| Innovation et créativité | ✅ | Multilingue avec Wolof, audio guides |
| Expérience utilisateur | ✅ | Interface intuitive, QR scanner |
| Impact culturel | ✅ | Valorisation patrimoine africain |
| Faisabilité technique | ✅ | 100% frontend, déployable facilement |
| Scalabilité | ✅ | Structure extensible, facile d'ajouter œuvres |

## 📞 Besoin d'aide ?

Consultez `AUDIO_VIDEO_GUIDE.md` pour des instructions détaillées sur la génération des fichiers audio et vidéo.

---
**Musée 2.0** - Hackathon Dakar Slush'D 2025  
*Deadline : 08 octobre 2025 à 23h59*
