# 🧪 Test de l'Assistant IA

## Questions suggérées pour tester l'IA

### En Français 🇫🇷

1. **Questions générales**
   - "Bonjour, présente-toi"
   - "Combien d'œuvres sont exposées dans le musée ?"
   - "Quelles sont les catégories d'œuvres disponibles ?"

2. **Questions sur des œuvres spécifiques**
   - "Parle-moi du Masque Gelede"
   - "Quelle est l'origine du Tissu Kente Royal ?"
   - "Décris-moi le Tambour Djembé"
   - "Qu'est-ce que la Statuette Nok ?"

3. **Questions par origine géographique**
   - "Quelles œuvres viennent du Nigéria ?"
   - "Montre-moi des œuvres du Ghana"
   - "Que possédez-vous du Cameroun ?"

4. **Questions par catégorie**
   - "Quelles sculptures avez-vous ?"
   - "Parle-moi des textiles africains"
   - "Montrez-moi les bijoux de la collection"

5. **Questions culturelles**
   - "Explique le contexte culturel des masques Gelede"
   - "Quelle est la signification du tissu Kente ?"
   - "Raconte l'histoire des céramiques Nok"

### In English 🇬🇧

1. "Tell me about the Gelede Mask"
2. "What artworks are from Nigeria?"
3. "Explain the cultural context of African textiles"
4. "What sculptures do you have in the collection?"
5. "Describe the Royal Kente Cloth"

### En Wolof 🇸🇳

1. "Lañu wax ci Masque Gelede"
2. "Yan lëkkalekaay la ñu am ci Nigéria?"
3. "Saññ-saññu tissu Kente"

---

## Réponses attendues

L'IA devrait :
- ✅ Répondre dans la langue de la question
- ✅ Utiliser les informations exactes de la collection
- ✅ Être concise (2-3 phrases)
- ✅ Mentionner le QR code si pertinent
- ✅ Proposer d'explorer d'autres œuvres

## Scénarios de test

### Scénario 1 : Nouveau visiteur
1. "Bonjour"
2. "Que recommandez-vous de voir en premier ?"
3. "Parlez-moi de cette œuvre" (mentionner une œuvre vedette)

### Scénario 2 : Recherche thématique
1. "Je m'intéresse aux textiles"
2. "Quelle est l'histoire du tissu Kente ?"
3. "Y a-t-il d'autres textiles dans la collection ?"

### Scénario 3 : Exploration géographique
1. "Quelles œuvres représentent le Nigéria ?"
2. "Parle-moi du Masque Gelede"
3. "Quelles autres cultures nigérianes sont exposées ?"

---

## Validation

L'assistant devrait être capable de :

- [ ] Identifier correctement les 5 œuvres de la collection
- [ ] Fournir des informations précises (origine, période, description)
- [ ] Répondre en français, anglais et wolof
- [ ] Gérer les questions hors sujet poliment
- [ ] Encourager la visite du musée
- [ ] Mentionner les QR codes pour plus de détails

## Limitations connues

- ⚠️ L'IA peut parfois inventer des détails non présents dans la base
- ⚠️ Le wolof peut être approximatif (modèle moins entraîné)
- ⚠️ Les questions très complexes peuvent dépasser le contexte

## Performance

- ⚡ Réponse attendue : < 2 secondes
- 📊 Taux de succès : > 90% pour questions simples
- 🎯 Précision : Basée sur les données réelles du musée
