# 🎭 GUIDE D'INTÉGRATION D'IMAGES - MUSÉE DES CIVILISATIONS NOIRES

## 📁 STRUCTURE DES DOSSIERS

```
public/
├── images/
│   ├── oeuvres/           # Images d'œuvres individuelles
│   │   ├── masque-dan-detail.jpg
│   │   ├── masque-baoule-detail.jpg
│   │   └── statue-ashanti.jpg
│   ├── carrousel/         # Images pour carrousels (Full HD)
│   │   ├── masque-dan-carrousel.jpg
│   │   ├── masque-baoule-carrousel.jpg
│   │   └── statue-yoruba-carrousel.jpg
│   ├── collections/       # Images de collections
│   │   ├── collection-masques.jpg
│   │   ├── collection-statues.jpg
│   │   └── collection-textiles.jpg
│   └── masque-dan-fullhd.svg
│   └── masque-baoule-fullhd.svg
```

## 🎯 TYPES D'IMAGES ET UTILISATION

### 1️⃣ **CARROUSELS (Hero3D.tsx)**
- **Dossier** : `public/images/carrousel/`
- **Format** : JPG, PNG, WebP
- **Résolution** : 1920x1080 (Full HD) ou plus
- **Taille** : < 2MB par image
- **Utilisation** : Carrousel principal de la page d'accueil

### 2️⃣ **ŒUVRES INDIVIDUELLES (PageOeuvre.tsx)**
- **Dossier** : `public/images/oeuvres/`
- **Format** : JPG, PNG
- **Résolution** : 800x600 minimum
- **Utilisation** : Pages détaillées des œuvres

### 3️⃣ **COLLECTIONS (CollectionsRevolutionnaire.tsx)**
- **Dossier** : `public/images/collections/`
- **Format** : JPG, PNG
- **Résolution** : 1200x800 minimum
- **Utilisation** : Galeries de collections

## 🔧 COMMENT INTÉGRER VOS IMAGES

### **ÉTAPE 1 : PLACER VOS IMAGES**
1. Copiez vos images dans le bon dossier selon leur utilisation
2. Nommez-les de manière descriptive (ex: `masque-dan-authentique.jpg`)
3. Respectez les formats recommandés

### **ÉTAPE 2 : MODIFIER LES RÉFÉRENCES DANS LE CODE**

#### **Pour le Carrousel (Hero3D.tsx) :**
```typescript
const oeuvres = [
  {
    id: 1,
    image: "/images/carrousel/votre-image.jpg", // ← Remplacez ici
    titre: {
      fr: "Votre Titre",
      en: "Your Title", 
      wo: "Titre Wolof"
    },
    // ... autres propriétés
  }
];
```

#### **Pour les Œuvres (PageOeuvre.tsx) :**
```typescript
const oeuvres = [
  {
    id: 1,
    image: "/images/oeuvres/votre-oeuvre.jpg", // ← Remplacez ici
    // ... autres propriétés
  }
];
```

#### **Pour les Collections (CollectionsRevolutionnaire.tsx) :**
```typescript
const collections = [
  {
    id: 1,
    image: "/images/collections/votre-collection.jpg", // ← Remplacez ici
    // ... autres propriétés
  }
];
```

## 📏 SPÉCIFICATIONS TECHNIQUES

### **CARROUSELS :**
- **Résolution** : 1920x1080 (Full HD)
- **Format** : JPG (qualité 85-90%), PNG, WebP
- **Taille** : < 2MB
- **Ratio** : 16:9 recommandé

### **ŒUVRES :**
- **Résolution** : 800x600 minimum
- **Format** : JPG (qualité 80-85%), PNG
- **Taille** : < 1MB
- **Ratio** : 4:3 ou 16:9

### **COLLECTIONS :**
- **Résolution** : 1200x800 minimum
- **Format** : JPG (qualité 85-90%), PNG
- **Taille** : < 1.5MB
- **Ratio** : 3:2 ou 16:9

## 🎨 CONSEILS DE DESIGN

### **COULEURS RECOMMANDÉES :**
- **Masques** : Tons terreux (brun, beige, rouge-brun)
- **Statues** : Tons naturels (bois, pierre, bronze)
- **Textiles** : Couleurs vives africaines
- **Arrière-plans** : Neutres ou sombres

### **COMPOSITION :**
- **Centrage** : Objet principal au centre
- **Éclairage** : Lumière naturelle ou studio
- **Arrière-plan** : Neutre ou contextuel
- **Détails** : Mise en valeur des textures

## 🚀 OPTIMISATION PERFORMANCE

### **COMPRESSION :**
- **JPG** : Qualité 80-90% pour web
- **PNG** : Compression optimale
- **WebP** : Format moderne (meilleure compression)

### **NOMS DE FICHIERS :**
- **Descriptifs** : `masque-dan-authentique.jpg`
- **Sans espaces** : Utilisez des tirets
- **Cohérents** : Même convention partout
- **Courts** : < 50 caractères

## 📝 EXEMPLE COMPLET

### **1. Placer l'image :**
```
public/images/carrousel/masque-dan-authentique.jpg
```

### **2. Modifier le code :**
```typescript
// Dans Hero3D.tsx
const oeuvres = [
  {
    id: 1,
    image: "/images/carrousel/masque-dan-authentique.jpg",
    titre: {
      fr: "Masque Dan Authentique",
      en: "Authentic Dan Mask", 
      wo: "Këru Dan ci lu wuute"
    },
    description: {
      fr: "Masque cérémoniel authentique du peuple Dan",
      en: "Authentic ceremonial mask from the Dan people",
      wo: "Këru ci lu wuute ci xeet Dan"
    },
    // ... autres propriétés
  }
];
```

### **3. Tester l'application :**
```bash
npm run dev
```

## ✅ CHECKLIST D'INTÉGRATION

- [ ] Image placée dans le bon dossier
- [ ] Nom de fichier descriptif
- [ ] Résolution appropriée
- [ ] Taille de fichier optimisée
- [ ] Référence mise à jour dans le code
- [ ] Test de l'application
- [ ] Vérification de l'affichage
- [ ] Test responsive

## 🎯 RÉSULTAT ATTENDU

Après intégration, vos images apparaîtront :
- **Carrousel** : Sur la page d'accueil
- **Œuvres** : Dans les pages détaillées
- **Collections** : Dans les galeries

Vos images authentiques africaines enrichiront l'expérience utilisateur ! 🎭✨
