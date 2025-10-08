# 🎭 EXEMPLE PRATIQUE D'INTÉGRATION D'IMAGES

## 📋 SCÉNARIO : INTÉGRER UN MASQUE DAN AUTHENTIQUE

### **ÉTAPE 1 : PRÉPARER L'IMAGE**
1. **Nom de fichier** : `masque-dan-authentique.jpg`
2. **Résolution** : 1920x1080 (Full HD)
3. **Format** : JPG (qualité 90%)
4. **Taille** : < 2MB

### **ÉTAPE 2 : PLACER L'IMAGE**
```
public/images/carrousel/masque-dan-authentique.jpg
```

### **ÉTAPE 3 : MODIFIER LE CODE**

#### **Dans `src/composants/Hero3D.tsx` :**
```typescript
const oeuvres = [
  {
    id: 1,
    image: "/images/carrousel/masque-dan-authentique.jpg", // ← Votre image
    titre: {
      fr: "Masque Dan Authentique",
      en: "Authentic Dan Mask", 
      wo: "Këru Dan ci lu wuute"
    },
    description: {
      fr: "Masque cérémoniel authentique du peuple Dan, Côte d'Ivoire",
      en: "Authentic ceremonial mask from the Dan people, Ivory Coast",
      wo: "Këru ci lu wuute ci xeet Dan, Kosta Marfil"
    },
    periode: {
      fr: "XIXe siècle",
      en: "19th century",
      wo: "XIXe siècle"
    },
    origine: {
      fr: "Côte d'Ivoire",
      en: "Ivory Coast",
      wo: "Kosta Marfil"
    },
    culture: {
      fr: "Peuple Dan",
      en: "Dan people",
      wo: "Xeet Dan"
    }
  }
];
```

### **ÉTAPE 4 : TESTER L'APPLICATION**
```bash
npm run dev
```

## 🎯 RÉSULTAT ATTENDU

Votre image apparaîtra dans :
- ✅ **Carrousel principal** de la page d'accueil
- ✅ **Navigation** avec les flèches
- ✅ **Boutons d'action** (Aimer, Partager)
- ✅ **Responsive** sur tous les écrans

## 🔧 AUTRES INTÉGRATIONS POSSIBLES

### **POUR LES ŒUVRES INDIVIDUELLES :**
```typescript
// Dans PageOeuvre.tsx
image: "/images/oeuvres/masque-dan-detail.jpg"
```

### **POUR LES COLLECTIONS :**
```typescript
// Dans CollectionsRevolutionnaire.tsx
image: "/images/collections/collection-masques.jpg"
```

## 📝 NOTES IMPORTANTES

- **Chemins** : Toujours commencer par `/images/`
- **Formats** : JPG, PNG, WebP recommandés
- **Noms** : Sans espaces, avec tirets
- **Test** : Vérifier l'affichage après modification

Votre image authentique enrichira l'expérience culturelle ! 🎭✨
