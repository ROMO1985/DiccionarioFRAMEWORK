import React, { useState, useEffect, useMemo, FormEvent, MouseEvent } from "react";
import { 
  Search, 
  BookOpen, 
  Heart, 
  Award, 
  Sparkles, 
  RefreshCw, 
  Download, 
  Plus, 
  Trash2, 
  HelpCircle, 
  Layers, 
  Globe, 
  ListFilter, 
  CheckCircle2, 
  ArrowRight, 
  BookOpenCheck,
  Moon,
  Sun,
  Copy,
  Check,
  Info,
  Sliders,
  X,
  Tag,
  Filter
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { togaftTerms } from "./data";
import { iso9000Terms } from "./isoData";
import { TermCategory, TOGAFTerm } from "./types";

// Synonym expansion dictionary for TOGAF terms
const TOGAF_SYNONYMS: Record<string, string[]> = {
  "abstraction": ["simplificación", "resumen", "síntesis", "generalización", "summarized", "generalized", "simplificar"],
  "actor": ["rol", "usuario", "persona", "operador", "user", "role", "subject", "sujeto", "puesto", "participante"],
  "application": ["software", "aplicación", "sistema", "programa", "app", "aplicativo"],
  "component": ["módulo", "bloque", "pieza", "elemento", "module", "block", "part"],
  "architecture": ["diseño", "estructura", "plan", "blueprint", "esquema", "configuración", "framework", "marco"],
  "business": ["negocio", "empresa", "corporación", "compañía", "enterprise", "company", "coorporativo"],
  "data": ["información", "datos", "registro", "database", "bd", "base de datos", "information", "entidad"],
  "governance": ["gobierno", "control", "política", "dirección", "supervisión", "cumplimiento", "compliance", "regulación"],
  "technology": ["infraestructura", "servidor", "red", "hardware", "it", "ti", "plataforma", "dispositivo"],
  "capability": ["capacidad", "habilidad", "recurso", "competencia", "destreza", "aptitud", "potencial"],
  "artifact": ["entregable", "producto", "documento", "plantilla", "deliverable"],
  "boundary": ["límite", "borde", "frontera", "alcance", "scope", "limit"],
  "process": ["proceso", "flujo", "actividad", "tarea", "fase", "paso", "procedimiento", "workflow"],
  "requirement": ["requisito", "necesidad", "demanda", "especificación", "obligación", "reclamación"],
  "stakeholder": ["interesado", "patrocinador", "cliente", "sponsor", "involucrado", "afectado", "público interesado"],
  "view": ["vista", "perspectiva", "ángulo", "representación", "perspective"],
  "viewpoint": ["punto de vista", "enfoque", "criterio", "criterios"],
  "phase": ["fase", "etapa", "ciclo", "paso", "período", "step", "stage"],
  "standard": ["estándar", "norma", "regla", "patrón", "guía", "rule", "guideline"],
  "baseline": ["línea base", "punto de partida", "actual", "as-is", "estado actual"],
  "target": ["objetivo", "destino", "futuro", "to-be", "estado futuro", "meta"],
  "transition": ["transición", "migración", "intermedio", "roadmap", "hoja de ruta", "cambio"],
  "matrix": ["matriz", "tabla", "cuadrícula", "relación", "grid"],
  "service": ["servicio", "función", "prestación", "utilidad"]
};

export default function App() {
  // Theme & Layout States
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"glossary" | "study" | "favorites" | "analytics">("glossary");
  
  // Data States (Core + User Custom Terms)
  const [customTerms, setCustomTerms] = useState<TOGAFTerm[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  
  // Filter States
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedDomain, setSelectedDomain] = useState<string>("All");
  const [selectedSource, setSelectedSource] = useState<string>("All");
  const [termLanguage, setTermLanguage] = useState<"both" | "english" | "spanish">("both");

  // Advanced Search States
  const [showAdvancedSearch, setShowAdvancedSearch] = useState<boolean>(false);
  const [useSynonyms, setUseSynonyms] = useState<boolean>(true);
  const [searchMode, setSearchMode] = useState<"all" | "any">("any");
  const [searchInFields, setSearchInFields] = useState({
    english: true,
    spanish: true,
    definition: true,
    reference: true
  });
  const [excludeQuery, setExcludeQuery] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  
  // Custom Term Creator States
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [newEnglish, setNewEnglish] = useState<string>("");
  const [newSpanish, setNewSpanish] = useState<string>("");
  const [newEngDef, setNewEngDef] = useState<string>("");
  const [newSpaDef, setNewSpaDef] = useState<string>("");
  const [newRef, setNewRef] = useState<string>("Personal Custom");
  const [newDomain, setNewDomain] = useState<"Business" | "Data" | "Application" | "Technology" | "Governance" | "General">("General");

  // Study Flashcard States
  const [studyPool, setStudyPool] = useState<TOGAFTerm[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [studyDirection, setStudyDirection] = useState<"eng-to-spa" | "spa-to-eng">("eng-to-spa");
  const [studyFilterCategory, setStudyFilterCategory] = useState<string>("All");
  const [answeredCount, setAnsweredCount] = useState<{ correct: number; incorrect: number }>({ correct: 0, incorrect: 0 });
  const [correctStreak, setCorrectStreak] = useState<number>(0);
  const [selectedFlashcardOption, setSelectedFlashcardOption] = useState<string | null>(null);
  const [flashcardOptions, setFlashcardOptions] = useState<string[]>([]);
  const [quizFeedback, setQuizFeedback] = useState<"correct" | "incorrect" | null>(null);
  
  // Active Detail Term Modal
  const [selectedTerm, setSelectedTerm] = useState<TOGAFTerm | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Time & Session metadata
  const [currentTime, setCurrentTime] = useState<string>("2026-05-21 14:00Z");

  // Load favorites & custom terms from localStorage
  useEffect(() => {
    const savedFavs = localStorage.getItem("togaf_favs");
    if (savedFavs) {
      try {
        setFavorites(JSON.parse(savedFavs));
      } catch (e) {
        console.error(e);
      }
    }
    const savedCustom = localStorage.getItem("togaf_custom_terms");
    if (savedCustom) {
      try {
        setCustomTerms(JSON.parse(savedCustom));
      } catch (e) {
        console.error(e);
      }
    }

    // Keep the UTC clock updated (simulating actual time based on context)
    const interval = setInterval(() => {
      const now = new Date();
      const utcString = now.toISOString().replace("T", " ").substring(0, 16) + " UTC";
      setCurrentTime(utcString);
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  // Sync to localstorage helper
  const toggleFavorite = (termId: string) => {
    let nextFavs;
    if (favorites.includes(termId)) {
      nextFavs = favorites.filter(id => id !== termId);
    } else {
      nextFavs = [...favorites, termId];
    }
    setFavorites(nextFavs);
    localStorage.setItem("togaf_favs", JSON.stringify(nextFavs));
  };

  // Combine static terms, ISO 9000 terms and user custom terms
  const allTerms = useMemo(() => {
    // 1. Start with TOGAF terms mapped with source: "TOGAF"
    const mappedTogaf = togaftTerms.map(t => ({
      ...t,
      source: "TOGAF" as const,
      togafEnglishDefinition: t.englishDefinition,
      togafSpanishDefinition: t.spanishDefinition
    }));

    // 2. Identify overlaps and compile combined list
    const combined: TOGAFTerm[] = [...mappedTogaf];

    iso9000Terms.forEach(isoTerm => {
      // Find overlap with existing combined (TOGAF) list
      const overlap = combined.find(t => {
        const engEquals = t.english.toLowerCase().trim() === isoTerm.english.toLowerCase().trim();
        const spanEquals = t.spanish.toLowerCase().trim() === isoTerm.spanish.toLowerCase().trim();
        
        // Match close equivalents:
        // TOGAF "Stakeholder" vs ISO "Interested party"
        const isStakeholderMatch = (t.english.toLowerCase() === "stakeholder" && isoTerm.english.toLowerCase() === "interested party") || 
                                   (t.spanish.toLowerCase() === "interesado" && isoTerm.spanish.toLowerCase() === "parte interesada");
        // TOGAF "Client" vs ISO "Customer"
        const isClientMatch = (t.english.toLowerCase() === "client" && isoTerm.english.toLowerCase() === "customer") ||
                              (t.spanish.toLowerCase() === "cliente" && isoTerm.spanish.toLowerCase() === "cliente");
        // TOGAF "Requirement" vs ISO "Requirement"
        const isRequirementMatch = (t.english.toLowerCase() === "requirement" && isoTerm.english.toLowerCase() === "requirement");

        return engEquals || spanEquals || isStakeholderMatch || isClientMatch || isRequirementMatch;
      });

      if (overlap) {
        // Merge the item to be "Ambas"
        overlap.source = "Ambas";
        // Ensure both English names are represented if different
        if (overlap.english.toLowerCase().trim() !== isoTerm.english.toLowerCase().trim()) {
          overlap.english = `${overlap.english} / ${isoTerm.english}`;
        }
        // Ensure both Spanish names are represented if different
        if (overlap.spanish.toLowerCase().trim() !== isoTerm.spanish.toLowerCase().trim()) {
          overlap.spanish = `${overlap.spanish} / ${isoTerm.spanish}`;
        }
        
        overlap.togafEnglishDefinition = overlap.togafEnglishDefinition || overlap.englishDefinition;
        overlap.togafSpanishDefinition = overlap.togafSpanishDefinition || overlap.spanishDefinition;
        overlap.isoEnglishDefinition = isoTerm.englishDefinition;
        overlap.isoSpanishDefinition = isoTerm.spanishDefinition;
        
        // Combine reference
        if (!overlap.reference.includes("ISO 9000")) {
          overlap.reference = `${overlap.reference} & ${isoTerm.reference}`;
        }
      } else {
        // Add fresh ISO 9000 term
        combined.push({
          ...isoTerm,
          source: "ISO 9000",
          isoEnglishDefinition: isoTerm.englishDefinition,
          isoSpanishDefinition: isoTerm.spanishDefinition
        });
      }
    });

    // 3. Append custom terms mapped with source "TOGAF"
    const mappedCustom = customTerms.map(t => ({
      ...t,
      source: t.source || "TOGAF" as const,
      togafEnglishDefinition: t.englishDefinition,
      togafSpanishDefinition: t.spanishDefinition
    }));

    return [...combined, ...mappedCustom];
  }, [customTerms]);

  // Unique lists for dropdowns
  const categoriesList = useMemo(() => {
    return ["All", ...Object.values(TermCategory)];
  }, []);

  const domainsList = useMemo(() => {
    const domainsSet = new Set(allTerms.map(t => t.domain).filter(Boolean));
    return ["All", ...Array.from(domainsSet)];
  }, [allTerms]);

  // Handle adding custom terms
  const handleAddTermSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!newEnglish || !newSpanish) {
      alert("Por favor rellena al menos los términos en inglés y español");
      return;
    }

    const newTerm: TOGAFTerm = {
      id: "custom_" + Date.now(),
      english: newEnglish,
      spanish: newSpanish,
      englishDefinition: newEngDef || "No English definition provided",
      spanishDefinition: newSpaDef || "No hay definición en español disponible",
      reference: newRef || "Personal",
      category: TermCategory.DEFINITIONS, // Saved in core custom definitions
      domain: newDomain
    };

    const updatedCustom = [newTerm, ...customTerms];
    setCustomTerms(updatedCustom);
    localStorage.setItem("togaf_custom_terms", JSON.stringify(updatedCustom));
    
    // Reset form & close
    setNewEnglish("");
    setNewSpanish("");
    setNewEngDef("");
    setNewSpaDef("");
    setNewRef("Personal Custom");
    setNewDomain("General");
    setShowAddModal(false);
  };

  // Delete customized term
  const handleDeleteCustomTerm = (id: string, e: MouseEvent) => {
    e.stopPropagation();
    if (confirm("¿Estás seguro de eliminar este término personalizado?")) {
      const updated = customTerms.filter(t => t.id !== id);
      setCustomTerms(updated);
      localStorage.setItem("togaf_custom_terms", JSON.stringify(updated));
      // Remove from favorites if it was favorited
      if (favorites.includes(id)) {
        const nextFavs = favorites.filter(f => f !== id);
        setFavorites(nextFavs);
        localStorage.setItem("togaf_favs", JSON.stringify(nextFavs));
      }
    }
  };

  // Filter terms based on user values
  const filteredTerms = useMemo(() => {
    const normalizedQuery = searchQuery.toLowerCase().trim();
    const queryWords = normalizedQuery.split(/[\s,]+/).filter(w => w.length > 0);

    return allTerms.filter(term => {
      // 1. Category Filter
      const matchesCategory = selectedCategory === "All" || term.category === selectedCategory;
      if (!matchesCategory) return false;

      // 2. Domain Filter
      const matchesDomain = selectedDomain === "All" || term.domain === selectedDomain;
      if (!matchesDomain) return false;

      // 2.5. Source Standard Filter
      const matchesSource = selectedSource === "All" || 
        (selectedSource === "TOGAF" && (term.source === "TOGAF" || !term.source)) ||
        (selectedSource === "ISO 9000" && term.source === "ISO 9000") ||
        (selectedSource === "Ambas" && term.source === "Ambas");
      if (!matchesSource) return false;

      // 3. Multi-tag matching (AND match for selected keyword tags)
      if (selectedTags.length > 0) {
        const termText = `${term.english} ${term.spanish} ${term.englishDefinition} ${term.spanishDefinition}`.toLowerCase();
        const matchesTags = selectedTags.every(tag => termText.includes(tag.toLowerCase()));
        if (!matchesTags) return false;
      }

      // If query is empty, it passes
      if (queryWords.length === 0) {
        return true;
      }

      // 4. Exclude keywords (NOT Filter)
      if (excludeQuery.trim()) {
        const excludeWords = excludeQuery.toLowerCase().split(/[\s,]+/).filter(w => w.length > 0);
        const termText = `${term.english} ${term.spanish} ${term.englishDefinition} ${term.spanishDefinition}`.toLowerCase();
        const matchesExclude = excludeWords.some(word => termText.includes(word));
        if (matchesExclude) return false;
      }

      // 5. Fields to Search In
      const termEnglishLower = term.english.toLowerCase();
      const termSpanishLower = term.spanish.toLowerCase();
      const defEnglishLower = term.englishDefinition.toLowerCase();
      const defSpanishLower = term.spanishDefinition.toLowerCase();
      const refLower = term.reference.toLowerCase();

      const searchFields: string[] = [];
      if (searchInFields.english) searchFields.push(termEnglishLower);
      if (searchInFields.spanish) searchFields.push(termSpanishLower);
      if (searchInFields.definition) {
        searchFields.push(defEnglishLower);
        searchFields.push(defSpanishLower);
      }
      if (searchInFields.reference) searchFields.push(refLower);

      // Standard text search match
      let matchesText = false;
      if (searchMode === "all") {
        // AND match: all words in query must exist in at least one field
        matchesText = queryWords.every(word => {
          return searchFields.some(field => field.includes(word));
        });
      } else {
        // OR match: any word in query matches a field
        matchesText = queryWords.some(word => {
          return searchFields.some(field => field.includes(word));
        });
      }

      if (matchesText) return true;

      // 6. Synonym matching (if standard match fails and synonyms are enabled)
      if (useSynonyms) {
        const termNameFull = `${termEnglishLower} ${termSpanishLower}`;
        
        // Loop through synonyms to see if they associate with this term
        for (const [key, synonymsList] of Object.entries(TOGAF_SYNONYMS)) {
          if (termNameFull.includes(key)) {
            // Check if any query word matches a synonym in the list
            const matchedSynonym = queryWords.some(word => {
              return synonymsList.some(syn => syn.includes(word) || word.includes(syn));
            });

            if (matchedSynonym) {
              return true; // Match found via synonym transition!
            }
          }
        }
      }

      return false;
    });
  }, [allTerms, searchQuery, selectedCategory, selectedDomain, selectedSource, useSynonyms, searchMode, searchInFields, excludeQuery, selectedTags]);

  // Count terms per architecture domain
  const domainSummaries = useMemo(() => {
    const counts: Record<string, number> = {
      Business: 0,
      Data: 0,
      Application: 0,
      Technology: 0,
      Governance: 0,
      General: 0
    };
    allTerms.forEach(t => {
      if (t.domain && counts[t.domain] !== undefined) {
        counts[t.domain]++;
      } else {
        counts["General"]++;
      }
    });
    return counts;
  }, [allTerms]);

  // Flashcards Setup / Reset
  const startStudyMode = () => {
    const pool = allTerms.filter(term => {
      return studyFilterCategory === "All" || term.category === studyFilterCategory;
    });
    
    if (pool.length === 0) return;
    
    // Shuffle pool
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    setStudyPool(shuffled);
    setCurrentIndex(0);
    setIsFlipped(false);
    setSelectedFlashcardOption(null);
    setQuizFeedback(null);
    generateQuizOptions(shuffled[0], pool);
  };

  // Generate quiz options for learning interactive game
  const generateQuizOptions = (correctTerm: TOGAFTerm, pool: TOGAFTerm[]) => {
    if (!correctTerm) return;
    const isEng = studyDirection === "eng-to-spa";
    const correctAnswer = isEng ? correctTerm.spanish : correctTerm.english;
    
    // Pick distractors
    const allAnswers = pool
      .map(t => (isEng ? t.spanish : t.english))
      .filter(ans => ans !== correctAnswer);
    
    // Unique random items
    const uniqueDistractors = Array.from(new Set(allAnswers))
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    
    const options = [correctAnswer, ...uniqueDistractors].sort(() => Math.random() - 0.5);
    setFlashcardOptions(options);
  };

  // Re-run flashcard setup if setup configs change
  useEffect(() => {
    startStudyMode();
  }, [studyDirection, studyFilterCategory, allTerms.length]);

  const handleSelectOption = (option: string) => {
    if (quizFeedback !== null) return; // Answered already
    setSelectedFlashcardOption(option);
    
    const correctTerm = studyPool[currentIndex];
    const isEng = studyDirection === "eng-to-spa";
    const correctAnswer = isEng ? correctTerm.spanish : correctTerm.english;

    if (option === correctAnswer) {
      setQuizFeedback("correct");
      setAnsweredCount(prev => ({ ...prev, correct: prev.correct + 1 }));
      setCorrectStreak(prev => prev + 1);
    } else {
      setQuizFeedback("incorrect");
      setAnsweredCount(prev => ({ ...prev, incorrect: prev.incorrect + 1 }));
      setCorrectStreak(0);
    }
    // Flip to show explanation
    setIsFlipped(true);
  };

  const handleNextFlashcard = () => {
    if (studyPool.length === 0) return;
    setIsFlipped(false);
    setSelectedFlashcardOption(null);
    setQuizFeedback(null);
    
    const nextIndex = (currentIndex + 1) % studyPool.length;
    setCurrentIndex(nextIndex);
    generateQuizOptions(studyPool[nextIndex], allTerms.filter(term => {
      return studyFilterCategory === "All" || term.category === studyFilterCategory;
    }));
  };

  const handleResetScore = () => {
    setAnsweredCount({ correct: 0, incorrect: 0 });
    setCorrectStreak(0);
    startStudyMode();
  };

  // Export Favorites feature
  const exportFavoritesAsJSON = () => {
    const favoritedTerms = allTerms.filter(t => favorites.includes(t.id));
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(favoritedTerms, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "togaf_favoritos.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Copy with absolute feedback
  const handleCopy = (text: string, termId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(termId);
    setTimeout(() => {
      setCopiedId(null);
    }, 1500);
  };

  // Total available definitions
  const coreTotal = allTerms.filter(t => t.category === TermCategory.DEFINITIONS).length;
  const supTotal = allTerms.filter(t => t.category === TermCategory.SUPPLEMENTARY).length;
  const abbTotal = allTerms.filter(t => t.category === TermCategory.ABBREVIATIONS).length;
  const extTotal = allTerms.filter(t => t.category === TermCategory.EXTENDED).length;

  // Norm source distributions
  const togafOnlyTotal = allTerms.filter(t => t.source === "TOGAF" || !t.source).length;
  const isoOnlyTotal = allTerms.filter(t => t.source === "ISO 9000").length;
  const bothStandardsTotal = allTerms.filter(t => t.source === "Ambas").length;

  return (
    <div className={`min-h-screen transition-all duration-300 font-sans bg-slate-50 dark:bg-slate-950 ${darkMode ? "text-slate-100" : "text-slate-900"}`}>
      
      {/* Top Professional Sticky Header */}
      <header className={`sticky top-0 z-40 border-b backdrop-blur-md transition-all ${darkMode ? "bg-slate-900/95 border-slate-800" : "bg-white/95 border-slate-200"}`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-extrabold text-xl font-display shadow-lg ${
              darkMode 
                ? "bg-indigo-600 text-white shadow-indigo-950/20 border border-indigo-500/30" 
                : "bg-indigo-600 text-white shadow-lg shadow-indigo-100"
            }`}>
              F
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-white font-display flex items-center gap-2">
                Diccionario de Framework
              </h1>
              <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider font-mono">
                Estándar de Traducción • TOGAF® & ISO 9000
              </p>
            </div>
          </div>

          {/* Central Global Search mimicking the Sleek theme */}
          <div className="flex-1 max-w-md mx-4 lg:mx-12 w-full md:w-auto">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Buscar términos, siglas o definiciones..." 
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (activeTab !== "glossary") {
                    setActiveTab("glossary");
                  }
                }}
                className={`w-full border-none rounded-full py-2.5 pl-11 pr-10 text-sm transition-all outline-none ${
                  darkMode 
                    ? "bg-slate-800 text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-indigo-500" 
                    : "bg-slate-100 text-slate-600 placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 focus:bg-white focus:shadow-sm"
                }`}
                id="header-global-search"
              />
              <div className="absolute left-4 top-3">
                <Search className="w-4 h-4 text-slate-400" />
              </div>
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-2.5 text-xs font-semibold text-slate-400 hover:text-slate-600"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* UTC Dynamic Clock with premium typography */}
            <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-[11px] font-mono text-slate-500 dark:text-slate-400 border border-transparent dark:border-slate-800">
              <Globe className="w-3.5 h-3.5 text-indigo-500 animate-spin-slow" />
              <span>{currentTime}</span>
            </div>

            {/* Dark Mode Icon Button */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-full transition-all ${darkMode ? "bg-slate-800 text-yellow-400 hover:bg-slate-700" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
              title="Alternar Tema de contraste"
              id="theme-toggler"
            >
              {darkMode ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5" />}
            </button>

            {/* Premium user badge */}
            <div className="h-8 w-8 rounded-full bg-slate-200 border-2 border-white dark:border-slate-850 shadow-sm overflow-hidden hidden sm:flex items-center justify-center text-xs font-bold text-indigo-700 bg-indigo-50 dark:bg-indigo-950 dark:text-indigo-400 shrink-0">
              EA
            </div>
          </div>
        </div>

        {/* Global Tab Switchers formatted with Sleek Interface menu styles */}
        <div className={`max-w-7xl mx-auto px-6 flex border-t overflow-x-auto gap-2 py-2 transition-all ${
          darkMode ? "border-slate-800 bg-slate-900/40" : "border-slate-200/60 bg-white"
        }`}>
          <button
            onClick={() => setActiveTab("glossary")}
            className={`flex items-center gap-2 py-1.5 px-4 text-xs font-semibold rounded-full shrink-0 transition-all ${
              activeTab === "glossary" 
                ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-400" 
                : "text-slate-650 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/55"
            }`}
            id="tab-btn-glossary"
          >
            <BookOpen className="w-4 h-4" />
            <span>Glosario Completo</span>
            <span className="px-1.5 py-0.2 text-[10px] rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-400 font-bold">
              {filteredTerms.length}
            </span>
          </button>
          <button
            onClick={() => {
              setActiveTab("study");
              startStudyMode();
            }}
            className={`flex items-center gap-2 py-1.5 px-4 text-xs font-semibold rounded-full shrink-0 transition-all ${
              activeTab === "study" 
                ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-400" 
                : "text-slate-650 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/55"
            }`}
            id="tab-btn-study"
          >
            <Sparkles className="w-4 h-4 text-indigo-500" />
            <span>Modo Estudio</span>
            <span className="animate-pulse flex h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
          </button>
          <button
            onClick={() => setActiveTab("favorites")}
            className={`flex items-center gap-2 py-1.5 px-4 text-xs font-semibold rounded-full shrink-0 transition-all ${
              activeTab === "favorites" 
                ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-400" 
                : "text-slate-650 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/55"
            }`}
            id="tab-btn-favorites"
          >
            <Heart className="w-4 h-4 text-rose-500" />
            <span>Mis Favoritos</span>
            <span className="px-1.5 py-0.2 text-[10px] rounded-full bg-rose-50 dark:bg-rose-955 dark:bg-rose-900/30 dark:bg-rose-950/40 text-rose-600 dark:text-rose-455 dark:text-rose-400 font-bold">
              {favorites.length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab("analytics")}
            className={`flex items-center gap-2 py-1.5 px-4 text-xs font-semibold rounded-full shrink-0 transition-all ${
              activeTab === "analytics" 
                ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-400" 
                : "text-slate-650 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/55"
            }`}
            id="tab-btn-analytics"
          >
            <Layers className="w-4 h-4 text-indigo-500" />
            <span>Métricas del Glosario</span>
          </button>
        </div>
      </header>

      {/* Main Body Grid */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        
        {/* Statistics Header Banner */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className={`p-4 rounded-xl border transition-all ${darkMode ? "bg-slate-900/60 border-slate-800" : "bg-white border-slate-100 shadow-sm"}`}>
            <span className="text-xs uppercase tracking-wider font-bold text-slate-400 block mb-1">
              Definiciones Core
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-blue-600 dark:text-blue-400">
                {coreTotal}
              </span>
              <span className="text-xs text-slate-400">términos básicos</span>
            </div>
          </div>
          <div className={`p-4 rounded-xl border transition-all ${darkMode ? "bg-slate-900/60 border-slate-800" : "bg-white border-slate-100 shadow-sm"}`}>
            <span className="text-xs uppercase tracking-wider font-bold text-slate-400 block mb-1">
              Suplementarias
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-indigo-500 dark:text-indigo-400">
                {supTotal}
              </span>
              <span className="text-xs text-slate-400">términos extras</span>
            </div>
          </div>
          <div className={`p-4 rounded-xl border transition-all ${darkMode ? "bg-slate-900/60 border-slate-800" : "bg-white border-slate-100 shadow-sm"}`}>
            <span className="text-xs uppercase tracking-wider font-bold text-slate-400 block mb-1">
              Abreviaturas
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-violet-500 dark:text-violet-400">
                {abbTotal}
              </span>
              <span className="text-xs text-slate-400">siglas y acrónimos</span>
            </div>
          </div>
          <div className={`p-4 rounded-xl border transition-all ${darkMode ? "bg-slate-900/60 border-slate-800" : "bg-white border-slate-100 shadow-sm"}`}>
            <span className="text-xs uppercase tracking-wider font-bold text-slate-400 block mb-1">
              Glosario Extendido
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-emerald-500 dark:text-emerald-400">
                {extTotal}
              </span>
              <span className="text-xs text-slate-400">Apéndice A</span>
            </div>
          </div>
        </section>

        {/* Dynamic Views Rendering */}
        <AnimatePresence mode="wait">
          
          {/* TAB 1: GENERAL GLOSSARY EXPLORER */}
          {activeTab === "glossary" && (
            <motion.div
              key="glossary-explorer"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              {/* Interactive Search Tool & Filters Bento */}
              <div className={`p-4 rounded-2xl border transition-all ${darkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200/80 shadow-md"}`}>
                
                <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                  {/* Styled Search Bar */}
                  <div className="relative flex-1 w-full flex gap-2">
                    <div className="relative flex-grow">
                      <Search className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 ${darkMode ? "text-slate-500" : "text-slate-400"}`} />
                      <input
                        type="text"
                        className={`w-full pl-11 pr-[80px] py-2.5 rounded-xl border outline-none font-medium transition-all text-sm ${
                          darkMode 
                            ? "bg-slate-950 border-slate-800 focus:border-blue-500 text-white" 
                            : "bg-slate-50 border-slate-200 focus:border-blue-500 text-slate-900"
                        }`}
                        placeholder="Buscar por término, definición, sección o sinónimos..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        id="search-input-field"
                      />
                      {searchQuery && (
                        <button 
                          onClick={() => setSearchQuery("")}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold px-2 py-1 rounded bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:opacity-80"
                        >
                          Limpiar
                        </button>
                      )}
                    </div>

                    <button
                      onClick={() => setShowAdvancedSearch(!showAdvancedSearch)}
                      className={`flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all border shrink-0 ${
                        showAdvancedSearch
                          ? "bg-indigo-50 border-indigo-200 text-indigo-700 dark:bg-indigo-950/60 dark:border-indigo-850 dark:text-indigo-300"
                          : "bg-slate-100 dark:bg-slate-950 hover:bg-slate-200 dark:hover:bg-slate-850 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-350"
                      }`}
                      id="toggle-advanced-search-btn"
                      title="Opciones de Búsqueda Avanzada"
                    >
                      <Sliders className="w-4 h-4 text-indigo-500" />
                      <span className="hidden sm:inline">Búsqueda Avanzada</span>
                    </button>
                  </div>

                  {/* Filter Selects Combination */}
                  <div className="flex gap-3 w-full lg:w-auto flex-wrap sm:flex-nowrap">
                    {/* Category Filter */}
                    <div className="flex flex-col w-full sm:w-auto min-w-[180px]">
                      <label className="text-[10px] font-bold uppercase text-slate-400 mb-1 flex items-center gap-1">
                        <ListFilter className="w-3 h-3" />
                        <span>Categoría</span>
                      </label>
                      <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className={`py-2 px-3 text-xs font-medium rounded-xl border outline-none ${
                          darkMode 
                            ? "bg-slate-950 border-slate-800 text-slate-200" 
                            : "bg-slate-50 border-slate-200 text-slate-700"
                        }`}
                        id="category-selector"
                      >
                        {categoriesList.map(cat => (
                          <option key={cat} value={cat}>{cat === "All" ? "Todos los Capítulos" : cat}</option>
                        ))}
                      </select>
                    </div>

                    {/* Domain Filter */}
                    <div className="flex flex-col w-full sm:w-auto min-w-[140px]">
                      <label className="text-[10px] font-bold uppercase text-slate-400 mb-1 flex items-center gap-1">
                        <Award className="w-3 h-3 text-indigo-400" />
                        <span>Dominio Arquitectura</span>
                      </label>
                      <select
                        value={selectedDomain}
                        onChange={(e) => setSelectedDomain(e.target.value)}
                        className={`py-2 px-3 text-xs font-medium rounded-xl border outline-none ${
                          darkMode 
                            ? "bg-slate-950 border-slate-800 text-slate-200" 
                            : "bg-slate-50 border-slate-200 text-slate-700"
                        }`}
                        id="domain-selector"
                      >
                        {domainsList.map(dom => (
                          <option key={dom} value={dom}>{dom === "All" ? "Todos los Dominios" : dom}</option>
                        ))}
                      </select>
                    </div>

                    {/* Source Norm Filter */}
                    <div className="flex flex-col w-full sm:w-auto min-w-[140px]">
                      <label className="text-[10px] font-bold uppercase text-slate-400 mb-1 flex items-center gap-1 font-mono">
                        <BookOpen className="w-3 h-3 text-indigo-400" />
                        <span>Norma / Estándar</span>
                      </label>
                      <select
                        value={selectedSource}
                        onChange={(e) => setSelectedSource(e.target.value)}
                        className={`py-2 px-3 text-xs font-medium rounded-xl border outline-none ${
                          darkMode 
                            ? "bg-slate-950 border-slate-800 text-slate-200" 
                            : "bg-slate-50 border-slate-200 text-slate-700"
                        }`}
                        id="source-selector"
                      >
                        <option value="All">Todas las Normas</option>
                        <option value="TOGAF">Solo TOGAF® 9.2</option>
                        <option value="ISO 9000">Solo ISO 9000:2015</option>
                        <option value="Ambas">Conceptos Coincidentes</option>
                      </select>
                    </div>

                    {/* Quick view language filter toggle */}
                    <div className="flex flex-col w-full sm:w-auto">
                      <label className="text-[10px] font-bold uppercase text-slate-400 mb-1 flex items-center gap-1">
                        <Globe className="w-3 h-3" />
                        <span>Ver columnas</span>
                      </label>
                      <div className="flex rounded-xl bg-slate-100 dark:bg-slate-950 p-1 border dark:border-slate-800">
                        <button
                          onClick={() => setTermLanguage("both")}
                          className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${termLanguage === "both" ? "bg-white dark:bg-slate-800 shadow-sm text-blue-600 dark:text-blue-400" : "text-slate-500"}`}
                        >
                          Dual
                        </button>
                        <button
                          onClick={() => setTermLanguage("english")}
                          className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${termLanguage === "english" ? "bg-white dark:bg-slate-800 shadow-sm text-blue-600 dark:text-blue-400" : "text-slate-500"}`}
                        >
                          EN
                        </button>
                        <button
                          onClick={() => setTermLanguage("spanish")}
                          className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${termLanguage === "spanish" ? "bg-white dark:bg-slate-800 shadow-sm text-blue-600 dark:text-blue-400" : "text-slate-500"}`}
                        >
                          ES
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Advanced Search Options Panel */}
                <AnimatePresence>
                  {showAdvancedSearch && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden border-t border-slate-100 dark:border-slate-850 mt-4 pt-4"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pb-2">
                        
                        {/* Synonyms toggle & info */}
                        <div className="p-3 rounded-xl bg-slate-100/40 dark:bg-slate-950/40 border dark:border-slate-850 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                              <Info className="w-3 h-3 text-indigo-500" />
                              <span>Sinónimos TOGAF®</span>
                            </span>
                            <span className={`text-[10px] font-bold ${useSynonyms ? "text-emerald-500" : "text-slate-400"}`}>
                              {useSynonyms ? "Activo" : "Inactivo"}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 leading-normal">
                            Busca conceptos relacionados (p. ej., "software" coincide con "Application Component" o "usuario" coincide con "Actor").
                          </p>
                          <label className="flex items-center gap-2 cursor-pointer pt-1">
                            <input
                              type="checkbox"
                              checked={useSynonyms}
                              onChange={(e) => setUseSynonyms(e.target.checked)}
                              className="rounded border-slate-300 dark:border-slate-800 text-indigo-600 focus:ring-indigo-500 w-4 h-4"
                            />
                            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Habilitar expansión</span>
                          </label>
                        </div>

                        {/* Match mode All words (AND) vs Any Word (OR) */}
                        <div className="p-3 rounded-xl bg-slate-100/40 dark:bg-slate-950/40 border dark:border-slate-850 space-y-2">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                            Modo de Coincidencia
                          </span>
                          <p className="text-[11px] text-slate-500">
                            Determina cómo se combinan múltiples palabras de búsqueda en sus consultas.
                          </p>
                          <div className="grid grid-cols-2 gap-2 pt-1.5">
                            <button
                              onClick={() => setSearchMode("any")}
                              className={`py-1.5 px-2 rounded-lg text-xs font-bold transition-all ${
                                searchMode === "any"
                                  ? "bg-indigo-600 text-white"
                                  : "bg-slate-100 dark:bg-slate-850 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800"
                              }`}
                            >
                              O (Cualquiera)
                            </button>
                            <button
                              onClick={() => setSearchMode("all")}
                              className={`py-1.5 px-2 rounded-lg text-xs font-bold transition-all ${
                                searchMode === "all"
                                  ? "bg-indigo-600 text-white"
                                  : "bg-slate-100 dark:bg-slate-850 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800"
                              }`}
                            >
                              Y (Todas)
                            </button>
                          </div>
                        </div>

                        {/* Search in specific fields */}
                        <div className="p-3 rounded-xl bg-slate-100/40 dark:bg-slate-950/40 border dark:border-slate-850 space-y-2">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                            Campos de Búsqueda
                          </span>
                          <div className="grid grid-cols-2 gap-x-2 gap-y-1.5 pt-1">
                            <label className="flex items-center gap-1.5 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={searchInFields.english}
                                onChange={(e) => setSearchInFields(prev => ({ ...prev, english: e.target.checked }))}
                                className="rounded border-slate-300 dark:border-slate-800 text-indigo-600 focus:ring-indigo-500 w-3.5 h-3.5"
                              />
                              <span className="text-xs font-medium text-slate-700 dark:text-slate-300">Término EN</span>
                            </label>
                            <label className="flex items-center gap-1.5 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={searchInFields.spanish}
                                onChange={(e) => setSearchInFields(prev => ({ ...prev, spanish: e.target.checked }))}
                                className="rounded border-slate-300 dark:border-slate-800 text-indigo-600 focus:ring-indigo-500 w-3.5 h-3.5"
                              />
                              <span className="text-xs font-medium text-slate-700 dark:text-slate-300">Término ES</span>
                            </label>
                            <label className="flex items-center gap-1.5 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={searchInFields.definition}
                                onChange={(e) => setSearchInFields(prev => ({ ...prev, definition: e.target.checked }))}
                                className="rounded border-slate-300 dark:border-slate-800 text-indigo-600 focus:ring-indigo-500 w-3.5 h-3.5"
                              />
                              <span className="text-xs font-medium text-slate-700 dark:text-slate-300">Definiciones</span>
                            </label>
                            <label className="flex items-center gap-1.5 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={searchInFields.reference}
                                onChange={(e) => setSearchInFields(prev => ({ ...prev, reference: e.target.checked }))}
                                className="rounded border-slate-300 dark:border-slate-800 text-indigo-600 focus:ring-indigo-500 w-3.5 h-3.5"
                              />
                              <span className="text-xs font-medium text-slate-700 dark:text-slate-300">Sección ref.</span>
                            </label>
                          </div>
                        </div>

                        {/* Exclude query */}
                        <div className="p-3 rounded-xl bg-slate-100/40 dark:bg-slate-950/40 border dark:border-slate-850 space-y-2">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                            Excluir palabras (NOT)
                          </span>
                          <p className="text-[11px] text-slate-500">
                            Excluye definiciones que tengan cualquiera de estas palabras (p. ej., "secundario").
                          </p>
                          <input
                            type="text"
                            placeholder="Ej. temporal, borrador..."
                            value={excludeQuery}
                            onChange={(e) => setExcludeQuery(e.target.value)}
                            className={`w-full py-1.5 px-3 rounded-xl border outline-none text-xs font-medium ${
                              darkMode 
                                ? "bg-slate-950 border-slate-800 focus:border-indigo-500 text-white" 
                                : "bg-slate-50 border-slate-200 focus:border-indigo-500 text-slate-900"
                            }`}
                          />
                        </div>

                      </div>

                      {/* Interactive Synonym suggestions pills */}
                      <div className="flex flex-wrap items-center gap-2 mt-3 pt-2 border-t border-dashed border-slate-200 dark:border-slate-800">
                        <span className="text-[10px] font-bold text-indigo-500 dark:text-indigo-400 uppercase tracking-wider">
                          Sugerencias de sinónimos:
                        </span>
                        {[
                          { text: "Software", syn: "aplicación" },
                          { text: "Rol / Persona", syn: "actor" },
                          { text: "Entregables", syn: "artifact" },
                          { text: "Límites", syn: "boundary" },
                          { text: "Empresa", syn: "business" },
                          { text: "Gobierno / Control", syn: "governance" },
                          { text: "Etapas", syn: "phase" },
                          { text: "Servidores", syn: "technology" }
                        ].map((item, idx) => (
                          <button
                            key={idx}
                            onClick={() => {
                              setSearchQuery(item.syn);
                              setUseSynonyms(true);
                            }}
                            className={`px-2 py-0.5 rounded text-[11px] font-semibold border transition-all ${
                              darkMode
                                ? "bg-slate-950 border-slate-855 hover:border-indigo-500 text-slate-400 hover:text-white"
                                : "bg-slate-50 border-slate-205 hover:border-indigo-300 text-slate-600 hover:bg-slate-100"
                            }`}
                          >
                            💡 {item.text} → "{item.syn}"
                          </button>
                        ))}
                      </div>

                      {/* Interactive Keyword Tags */}
                      <div className="flex flex-wrap items-center gap-2 mt-3 pt-2 border-t border-dashed border-slate-200 dark:border-slate-800">
                        <span className="text-[10px] font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wider flex items-center gap-1">
                          <Tag className="w-3 h-3" />
                          <span>Filtro rápido de Palabras Clave:</span>
                        </span>
                        {[
                          "Architecture",
                          "Process",
                          "Information",
                          "Requirement",
                          "Method",
                          "Stakeholder",
                          "Governance",
                          "Transition"
                        ].map(tag => {
                          const isSelected = selectedTags.includes(tag);
                          return (
                            <button
                              key={tag}
                              onClick={() => {
                                if (isSelected) {
                                  setSelectedTags(prev => prev.filter(t => t !== tag));
                                } else {
                                  setSelectedTags(prev => [...prev, tag]);
                                }
                              }}
                              className={`px-3 py-1 rounded-full text-xs font-bold border transition-all flex items-center gap-1 cursor-pointer ${
                                isSelected
                                  ? "bg-teal-500 dark:bg-teal-600 text-white border-teal-500"
                                  : "bg-slate-100 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-850"
                              }`}
                            >
                              <span>{tag}</span>
                              {isSelected && <X className="w-3 h-3" />}
                            </button>
                          );
                        })}
                        {selectedTags.length > 0 && (
                          <button
                            onClick={() => setSelectedTags([])}
                            className="text-[11px] font-bold text-rose-500 hover:underline px-2 cursor-pointer"
                          >
                            Limpiar etiquetas
                          </button>
                        )}
                      </div>

                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Domain badges as quick tags */}
                <div className="flex gap-2 mt-4 flex-wrap items-center">
                  <span className="text-[11px] font-bold text-slate-400 mr-1 uppercase">Filtro rápido:</span>
                  <button
                    onClick={() => setSelectedDomain("All")}
                    className={`px-2.5 py-1 rounded-full text-xs font-semibold transition-all ${
                      selectedDomain === "All" 
                        ? "bg-indigo-600 text-white" 
                        : "bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300"
                    }`}
                  >
                    Todo
                  </button>
                  {["Business", "Application", "Data", "Technology", "Governance", "General"].map(domainName => (
                    <button
                      key={domainName}
                      onClick={() => setSelectedDomain(domainName)}
                      className={`px-2.5 py-1 rounded-full text-xs font-semibold transition-all flex items-center gap-1 ${
                        selectedDomain === domainName 
                          ? "bg-indigo-600 text-white" 
                          : "bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300"
                      }`}
                    >
                      <span className="text-[10px] opacity-75">
                        {domainName === "Business" && "🏢"}
                        {domainName === "Application" && "📱"}
                        {domainName === "Data" && "📊"}
                        {domainName === "Technology" && "⚙️"}
                        {domainName === "Governance" && "⚖️"}
                        {domainName === "General" && "🌐"}
                      </span>
                      <span>{domainName}</span>
                    </button>
                  ))}
                </div>

              </div>

              {/* Grid or Table of filtered terms */}
              <div className="space-y-4">
                <div className="flex justify-between items-center px-1">
                  <div>
                    <h2 className="text-md font-bold text-slate-700 dark:text-slate-300">
                      Resultados Encontrados ({filteredTerms.length})
                    </h2>
                    <p className="text-xs text-slate-400">
                      Mostrando traducciones y definiciones oficiales aprobadas por The Open Group.
                    </p>
                  </div>

                  {searchQuery && (
                    <span className="text-xs bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-300 px-2.5 py-1 rounded-full font-semibold">
                      Filtrado por: "{searchQuery}"
                    </span>
                  )}
                </div>

                {filteredTerms.length === 0 ? (
                  <div className={`p-12 text-center rounded-2xl border ${darkMode ? "bg-slate-900 border-slate-800 text-slate-400" : "bg-white border-slate-200 text-slate-600"} `}>
                    <HelpCircle className="w-12 h-12 mx-auto text-slate-400 opacity-60 mb-3 animate-bounce" />
                    <h3 className="text-lg font-bold">No se encontraron términos</h3>
                    <p className="text-sm text-slate-400 mt-1 max-w-md mx-auto">
                      Intenta buscar otras palabras clave o asegúrate de que no haya errores de escritura. O añade un término personalizado usando el botón de arriba.
                    </p>
                    <button
                      onClick={() => {
                        setSearchQuery("");
                        setSelectedCategory("All");
                        setSelectedDomain("All");
                        setSelectedSource("All");
                      }}
                      className="mt-4 px-4 py-2 text-xs font-semibold bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg hover:opacity-80"
                    >
                      Restaurar Glosario
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-5">
                    {filteredTerms.map((term, index) => {
                      const isFav = favorites.includes(term.id);
                      const isCustom = term.id.startsWith("custom_");
                      
                      return (
                        <motion.div
                          key={term.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: Math.min(index * 0.02, 0.3) }}
                          onClick={() => setSelectedTerm(term)}
                          className={`group cursor-pointer p-5 sm:p-6 rounded-2xl border transition-all duration-200 hover:-translate-y-1 hover:shadow-md ${
                            darkMode 
                              ? "bg-slate-950 hover:bg-slate-900 border-slate-800/80 hover:border-slate-700" 
                              : "bg-white hover:bg-slate-50/80 border-slate-200/80 hover:border-slate-300 shadow-sm"
                          }`}
                          id={`term-card-${term.id}`}
                        >
                          {/* Card Header information */}
                          <div className="flex items-start justify-between gap-4 mb-3">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                                  term.domain === "Business" ? "bg-orange-100 text-orange-850 dark:bg-orange-950 dark:text-orange-200" :
                                  term.domain === "Data" ? "bg-cyan-100 text-cyan-850 dark:bg-cyan-950 dark:text-cyan-200" :
                                  term.domain === "Application" ? "bg-blue-100 text-blue-850 dark:bg-blue-950 dark:text-blue-200" :
                                  term.domain === "Technology" ? "bg-purple-100 text-purple-850 dark:bg-purple-950 dark:text-purple-200" :
                                  term.domain === "Governance" ? "bg-emerald-100 text-emerald-850 dark:bg-emerald-950 dark:text-emerald-200" :
                                  "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-250"
                                }`}>
                                  {term.domain || "General"}
                                </span>
                                <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1 bg-slate-100 dark:bg-slate-900 px-1.5 py-0.5 rounded">
                                  <Award className="w-2.5 h-2.5 text-blue-500" />
                                  <span>{term.reference}</span>
                                </span>
                                <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded border flex items-center gap-1 uppercase ${
                                  term.source === "Ambas"
                                    ? "bg-indigo-50 border-indigo-200 text-indigo-700 dark:bg-indigo-950/45 dark:border-indigo-900 dark:text-indigo-300"
                                    : term.source === "ISO 9000"
                                      ? "bg-emerald-50 border-emerald-200 text-emerald-700 dark:bg-emerald-950/45 dark:border-emerald-900 dark:text-emerald-300"
                                      : "bg-blue-50 border-blue-200 text-blue-750 dark:bg-blue-950/45 dark:border-blue-900 dark:text-blue-300"
                                }`}>
                                  <span className="w-1.5 h-1.5 rounded-full inline-block bg-current"></span>
                                  <span>{term.source || "TOGAF"}</span>
                                </span>
                                {isCustom && (
                                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800">
                                    Personalizado
                                  </span>
                                )}
                              </div>
                            </div>

                            {/* Card top interactions */}
                            <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                              <button
                                onClick={() => toggleFavorite(term.id)}
                                className={`p-1.5 rounded-lg transition-all ${
                                  isFav 
                                    ? "text-rose-500 bg-rose-50 dark:bg-rose-950/50" 
                                    : "text-slate-400 hover:text-rose-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                                }`}
                                title={isFav ? "Quitar de favoritos" : "Marcar como favorito"}
                              >
                                <Heart className={`w-4 h-4 ${isFav ? "fill-current text-rose-500" : ""}`} />
                              </button>
                              
                              <button
                                onClick={() => handleCopy(`${term.english} = ${term.spanish}\nEN: ${term.englishDefinition}\nES: ${term.spanishDefinition}`, term.id)}
                                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                                title="Copiar traducción y definición"
                              >
                                {copiedId === term.id ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                              </button>

                              {isCustom && (
                                <button
                                  onClick={(e) => handleDeleteCustomTerm(term.id, e)}
                                  className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30"
                                  title="Eliminar término personalizado"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              )}
                            </div>
                          </div>

                          {/* Words Side-by-Side comparison */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2 mb-3">
                            {/* English representation */}
                            {(termLanguage === "both" || termLanguage === "english") && (
                              <div className="space-y-1 border-l-2 border-slate-300 dark:border-slate-800 pl-3">
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block font-mono">English Term</span>
                                <h3 className="text-md sm:text-lg font-bold text-slate-900 dark:text-blue-100 font-sans tracking-tight">
                                  {term.english}
                                </h3>
                                {term.source === "Ambas" ? (
                                  term.togafEnglishDefinition?.trim().toLowerCase() === term.isoEnglishDefinition?.trim().toLowerCase() ? (
                                    <div>
                                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-normal leading-relaxed">
                                        {term.togafEnglishDefinition}
                                      </p>
                                      <span className="inline-block mt-1 text-[9px] font-bold px-1.5 py-0.5 bg-indigo-50 text-indigo-650 dark:bg-indigo-950/40 dark:text-indigo-300 rounded font-mono">
                                        Definición idéntica en TOGAF & ISO 9000
                                      </span>
                                    </div>
                                  ) : (
                                    <div className="space-y-2 mt-1.5 font-sans">
                                      <div className="p-2.5 rounded-lg bg-blue-50/20 dark:bg-blue-950/10 border border-blue-100/40 dark:border-blue-900/20">
                                        <span className="text-[9px] uppercase tracking-wider font-extrabold text-blue-500 dark:text-blue-400 block mb-0.5 font-mono">TOGAF® Definition</span>
                                        <p className="text-xs text-slate-650 dark:text-slate-350 leading-relaxed">{term.togafEnglishDefinition}</p>
                                      </div>
                                      <div className="p-2.5 rounded-lg bg-emerald-50/20 dark:bg-emerald-950/10 border border-emerald-100/40 dark:border-emerald-900/20">
                                        <span className="text-[9px] uppercase tracking-wider font-extrabold text-emerald-600 dark:text-emerald-400 block mb-0.5 font-mono">ISO 9000 Definition</span>
                                        <p className="text-xs text-slate-650 dark:text-slate-350 leading-relaxed">{term.isoEnglishDefinition}</p>
                                      </div>
                                    </div>
                                  )
                                ) : (
                                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-normal leading-relaxed">
                                    {term.englishDefinition}
                                  </p>
                                )}
                              </div>
                            )}

                            {/* Latin American Spanish representation */}
                            {(termLanguage === "both" || termLanguage === "spanish") && (
                              <div className="space-y-1 border-l-2 border-blue-500 pl-3">
                                <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest block font-mono">Español Latinoamericano</span>
                                <h4 className="text-md sm:text-lg font-bold text-blue-600 dark:text-blue-400 font-sans tracking-tight flex items-center gap-1">
                                  {term.spanish}
                                </h4>
                                {term.source === "Ambas" ? (
                                  term.togafSpanishDefinition?.trim().toLowerCase() === term.isoSpanishDefinition?.trim().toLowerCase() ? (
                                    <div>
                                      <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-350 font-normal leading-relaxed">
                                        {term.togafSpanishDefinition}
                                      </p>
                                      <span className="inline-block mt-1 text-[9px] font-bold px-1.5 py-0.5 bg-indigo-50 text-indigo-650 dark:bg-indigo-950/40 dark:text-indigo-300 rounded font-mono">
                                        Definición idéntica en TOGAF & ISO 9000
                                      </span>
                                    </div>
                                  ) : (
                                    <div className="space-y-2 mt-1.5 font-sans">
                                      <div className="p-2.5 rounded-lg bg-blue-50/20 dark:bg-blue-950/10 border border-blue-100/40 dark:border-blue-900/20">
                                        <span className="text-[9px] uppercase tracking-wider font-extrabold text-blue-500 dark:text-blue-400 block mb-0.5 font-mono">Definición según TOGAF®</span>
                                        <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">{term.togafSpanishDefinition}</p>
                                      </div>
                                      <div className="p-2.5 rounded-lg bg-emerald-50/20 dark:bg-emerald-950/10 border border-emerald-100/40 dark:border-emerald-900/20">
                                        <span className="text-[9px] uppercase tracking-wider font-extrabold text-emerald-600 dark:text-emerald-400 block mb-0.5 font-mono">Definición según ISO 9000</span>
                                        <p className="text-xs text-slate-705 dark:text-slate-300 leading-relaxed">{term.isoSpanishDefinition}</p>
                                      </div>
                                    </div>
                                  )
                                ) : (
                                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-350 font-normal leading-relaxed">
                                    {term.spanishDefinition}
                                  </p>
                                )}
                              </div>
                            )}
                          </div>

                          {/* Hover visual arrow hint footer */}
                          <div className="flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500 pt-2 border-t border-slate-100 dark:border-slate-800 mt-2">
                            <span>Haga Clic para ver panel de estudio expandido de relación</span>
                            <span className="flex items-center gap-1 font-semibold text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity">
                              <span>Detalle de Estructura</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </span>
                          </div>

                        </motion.div>
                      );
                    })}
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* TAB 2: INTERACTIVE FLASHCARDS QUIZ STUDY MODE */}
          {activeTab === "study" && (
            <motion.div
              key="study-mode"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="max-w-3xl mx-auto space-y-6"
            >
              
              {/* Study Mode Scoreboard banner */}
              <div className={`p-4 rounded-xl border flex items-center justify-between gap-4 transition-all ${
                darkMode ? "bg-slate-900 border-slate-800" : "bg-emerald-500/10 border-emerald-500/30"
              }`}>
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-emerald-500 text-white">
                    <BookOpenCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-slate-950 dark:text-white">Panel de Logro de Estudio</h3>
                    <p className="text-xs text-slate-400">Practica la traducción del estándar de arquitectura</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-right">
                  <div className="text-xs font-mono">
                    <div className="text-slate-400">Racha actual</div>
                    <div className="text-emerald-500 dark:text-emerald-450 font-extrabold text-base flex justify-end gap-1 items-center">
                      🔥 <span>{correctStreak}</span>
                    </div>
                  </div>
                  <div className="text-xs font-mono">
                    <div className="text-slate-400">Respuestas (C/I)</div>
                    <div className="font-bold text-slate-900 dark:text-slate-200">
                      <span className="text-emerald-500">{answeredCount.correct}</span>
                      {" / "}
                      <span className="text-rose-500">{answeredCount.incorrect}</span>
                    </div>
                  </div>
                  <button
                    onClick={handleResetScore}
                    className="p-1.5 rounded bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-all"
                    title="Reiniciar marcadores"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Quiz Configuration Panel */}
              <div className={`p-4 rounded-xl border grid grid-cols-1 md:grid-cols-2 gap-4 transition-all ${
                darkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200 shadow-sm"
              }`}>
                
                {/* Switch study direction */}
                <div className="space-y-1">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Idioma de estudio y evaluación</span>
                  <div className="flex gap-2 p-1 bg-slate-100 dark:bg-slate-950 rounded-lg border dark:border-slate-800">
                    <button
                      onClick={() => setStudyDirection("eng-to-spa")}
                      className={`flex-1 py-1.5 rounded-md text-xs font-semibold select-none transition-all ${
                        studyDirection === "eng-to-spa" 
                          ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-blue-400 shadow" 
                          : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                      }`}
                    >
                      Estudiar en Español
                    </button>
                    <button
                      onClick={() => setStudyDirection("spa-to-eng")}
                      className={`flex-1 py-1.5 rounded-md text-xs font-semibold select-none transition-all ${
                        studyDirection === "spa-to-eng" 
                          ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-blue-400 shadow" 
                          : "text-slate-550 hover:text-slate-750 dark:hover:text-slate-300"
                      }`}
                    >
                      Estudiar en Inglés
                    </button>
                  </div>
                </div>

                {/* Switch study filter category */}
                <div className="space-y-1">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Filtrar pool por Capítulo</span>
                  <select
                    value={studyFilterCategory}
                    onChange={(e) => setStudyFilterCategory(e.target.value)}
                    className={`w-full py-1.5 px-3 text-xs font-semibold rounded-lg border outline-none ${
                      darkMode ? "bg-slate-950 border-slate-800 text-slate-200" : "bg-slate-100 border-slate-200 text-slate-700"
                    }`}
                  >
                    <option value="All">Todos los capítulos ({allTerms.length})</option>
                    <option value={TermCategory.DEFINITIONS}>{TermCategory.DEFINITIONS}</option>
                    <option value={TermCategory.SUPPLEMENTARY}>{TermCategory.SUPPLEMENTARY}</option>
                    <option value={TermCategory.ABBREVIATIONS}>{TermCategory.ABBREVIATIONS}</option>
                    <option value={TermCategory.EXTENDED}>{TermCategory.EXTENDED}</option>
                  </select>
                </div>
              </div>

              {/* Main Quiz Interactive Box */}
              {studyPool.length === 0 ? (
                <div className="p-12 text-center rounded-2xl border bg-white dark:bg-slate-900 text-slate-500">
                  <p>No hay términos cargados bajo este filtro de estudio.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  
                  {/* The Interactive Flashcard Card */}
                  <div className={`p-6 sm:p-8 rounded-2xl border text-center transition-all ${
                    darkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200/90 shadow-lg"
                  }`}>
                    
                    {/* Header meta */}
                    <div className="flex justify-between items-center text-xs text-slate-400 mb-6 border-b pb-4 dark:border-slate-800 font-mono">
                      <span>Tarjeta {currentIndex + 1} de {studyPool.length}</span>
                      <span className="px-2 py-0.5 rounded bg-blue-150/10 text-blue-500 dark:text-blue-400 font-bold uppercase">{studyPool[currentIndex].domain}</span>
                    </div>

                    {/* Question wrapper */}
                    <div className="space-y-4 my-6 min-h-[140px] flex flex-col justify-center">
                      <span className="text-xs tracking-widest font-bold uppercase text-indigo-500 dark:text-indigo-400 font-mono">
                        {studyDirection === "eng-to-spa" 
                          ? "¿Qué término corresponde a esta definición?" 
                          : "Which term corresponds to this definition?"}
                      </span>
                      
                      {/* Notice: we hide the word in blue entirely, or do we remove it? The user explicitly said: "no aparezca la palabra en azul" */}
                      
                      <div className="text-sm sm:text-base text-slate-700 dark:text-slate-200 max-w-xl mx-auto font-medium leading-relaxed bg-slate-50 dark:bg-slate-950 p-6 rounded-2xl border border-slate-200/60 dark:border-slate-800 shadow-sm text-center">
                        <strong className="text-slate-400 uppercase text-[10px] block mb-2 tracking-wide font-mono">
                          {studyDirection === "eng-to-spa" ? "Definición Base" : "Base Definition"}
                        </strong>
                        "{studyDirection === "eng-to-spa" 
                          ? (studyPool[currentIndex].spanishDefinition || studyPool[currentIndex].englishDefinition)
                          : (studyPool[currentIndex].englishDefinition || studyPool[currentIndex].spanishDefinition)
                        }"
                      </div>
                    </div>

                    {/* Quiz options choices Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
                      {flashcardOptions.map((opt) => {
                        const isCorrectAnswer = studyDirection === "eng-to-spa" 
                          ? opt === studyPool[currentIndex].spanish 
                          : opt === studyPool[currentIndex].english;

                        const isThisSelected = selectedFlashcardOption === opt;
                        
                        let optStyle = "border-slate-200 dark:border-slate-800 hover:border-blue-500 hover:bg-blue-50/10 dark:hover:bg-blue-900/10";
                        if (quizFeedback !== null) {
                          if (isCorrectAnswer) {
                            optStyle = "bg-emerald-100 dark:bg-emerald-950/80 border-emerald-500 text-emerald-800 dark:text-emerald-300 font-bold scale-[1.01]";
                          } else if (isThisSelected) {
                            optStyle = "bg-rose-100 dark:bg-rose-950/80 border-rose-500 text-rose-850 dark:text-rose-300";
                          } else {
                            optStyle = "opacity-40 border-slate-200 dark:border-slate-800 cursor-not-allowed";
                          }
                        }

                        return (
                          <button
                            key={opt}
                            disabled={quizFeedback !== null}
                            onClick={() => handleSelectOption(opt)}
                            className={`p-3.5 text-xs sm:text-sm rounded-xl border text-left font-medium transition-all duration-150 flex items-center justify-between ${optStyle}`}
                          >
                            <span>{opt}</span>
                            {quizFeedback !== null && isCorrectAnswer && <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />}
                          </button>
                        );
                      })}
                    </div>

                    {/* Interactive Explanation view after selection feedback */}
                    <AnimatePresence>
                      {quizFeedback !== null && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="mt-6 pt-6 border-t dark:border-slate-800 text-left space-y-3"
                        >
                          <div className="flex items-center gap-2">
                            <span className={`text-xs font-bold uppercase px-2 py-0.5 rounded ${
                              quizFeedback === "correct" ? "bg-emerald-100 text-emerald-800" : "bg-rose-100 text-rose-800"
                            }`}>
                              {studyDirection === "eng-to-spa" 
                                ? (quizFeedback === "correct" ? "¡Correcto!" : "Incorrecto")
                                : (quizFeedback === "correct" ? "Correct!" : "Incorrect")}
                            </span>
                            <span className="text-xs text-slate-400 font-mono">
                              {studyDirection === "eng-to-spa" 
                                ? `Referencia estándar: ${studyPool[currentIndex].reference}`
                                : `Standard reference: ${studyPool[currentIndex].reference}`}
                            </span>
                          </div>

                          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 space-y-2 border dark:border-slate-800">
                            <div className="text-xs">
                              <span className="font-bold text-slate-400 uppercase">
                                {studyDirection === "eng-to-spa" ? "Traducción Oficial: " : "Official Translation: "}
                              </span>
                              <span className="font-bold text-slate-900 dark:text-white">
                                {studyPool[currentIndex].english} = {studyPool[currentIndex].spanish}
                              </span>
                            </div>
                            
                            <div className="text-xs space-y-1.5 leading-relaxed">
                              <p className="text-slate-600 dark:text-slate-400">
                                <span className="font-bold">
                                  {studyDirection === "eng-to-spa" ? "Definición en español:" : "Definition in English:"}
                                </span>{" "}
                                {studyDirection === "eng-to-spa" 
                                  ? (studyPool[currentIndex].spanishDefinition || studyPool[currentIndex].englishDefinition)
                                  : (studyPool[currentIndex].englishDefinition || studyPool[currentIndex].spanishDefinition)}
                              </p>
                            </div>
                          </div>

                          <div className="flex justify-end pt-2">
                            <button
                              onClick={handleNextFlashcard}
                              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-lg flex items-center gap-1.5 transition-all shadow-md shadow-blue-500/15"
                            >
                              <span>
                                {studyDirection === "eng-to-spa" ? "Siguiente Término" : "Next Term"}
                              </span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                  </div>

                  {/* Study tips card */}
                  <div className={`p-4 rounded-xl border flex items-start gap-3 text-xs transition-all ${
                    darkMode ? "bg-slate-900 border-slate-800 text-slate-400" : "bg-slate-50 border-slate-200 text-slate-600"
                  }`}>
                    <Info className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                    <div className="space-y-1 leading-relaxed">
                      <span className="font-bold text-slate-900 dark:text-slate-200">Consejo de Estudio para Certificación:</span>
                      <p>
                        Aprender la comparación de términos en inglés y español para el marco de TOGAF es crítico, ya que muchos de los exámenes de certificación en América Latina se realizan de forma bilingüe o hacen uso frecuente de acrónimos en inglés (como ABB o SBB) combinados con la nomenclatura en castellano.
                      </p>
                    </div>
                  </div>

                </div>
              )}

            </motion.div>
          )}

          {/* TAB 3: PERSONAL STUDY FAVORITES dictionary */}
          {activeTab === "favorites" && (
            <motion.div
              key="favorites-list"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
                    <Heart className="w-5 h-5 text-rose-500" />
                    <span>Mis Favoritos Guardados ({favorites.length})</span>
                  </h2>
                  <p className="text-xs text-slate-400">
                    Tu propia lista de repaso de vocabulario de arquitectura empresarial.
                  </p>
                </div>

                {favorites.length > 0 && (
                  <button
                    onClick={exportFavoritesAsJSON}
                    className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg border border-slate-200 hover:bg-slate-200 dark:border-slate-800 dark:hover:bg-slate-800 transition-all text-slate-700 dark:text-slate-350"
                  >
                    <Download className="w-3.5 h-3.5 text-blue-500" />
                    <span>Exportar Favoritos (JSON)</span>
                  </button>
                )}
              </div>

              {favorites.length === 0 ? (
                <div className={`p-12 text-center rounded-2xl border ${darkMode ? "bg-slate-900 border-slate-800 text-slate-400" : "bg-white border-slate-200 text-slate-600"} `}>
                  <Heart className="w-12 h-12 mx-auto text-slate-400 opacity-60 mb-3 animate-ping-slow" />
                  <h3 className="text-lg font-bold">Sin favoritos guardados</h3>
                  <p className="text-sm text-slate-400 mt-1 max-w-sm mx-auto">
                    Cuando explore el glosario base o examine las traducciones oficiales, haga clic en el icono de corazón para guardarlas aquí y repasar de forma consolidada.
                  </p>
                  <button
                    onClick={() => setActiveTab("glossary")}
                    className="mt-4 px-4 py-2 text-xs font-semibold bg-blue-600 text-white rounded-lg hover:opacity-90"
                  >
                    Explorar Glosario Base
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {allTerms
                    .filter(t => favorites.includes(t.id))
                    .map(term => (
                      <div
                        key={term.id}
                        onClick={() => setSelectedTerm(term)}
                        className={`p-5 rounded-2xl border transition-all cursor-pointer hover:shadow-md ${
                          darkMode ? "bg-slate-950 border-slate-800 hover:border-slate-750" : "bg-white border-slate-200"
                        }`}
                      >
                        <div className="flex items-center justify-between gap-3 mb-2">
                          <span className="text-[10px] font-bold text-slate-400 uppercase">{term.domain}</span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleFavorite(term.id);
                            }}
                            className="p-1 rounded text-rose-500 bg-rose-50 dark:bg-rose-950/40 hover:opacity-80"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="space-y-1">
                          <h3 className="text-base font-bold text-slate-900 dark:text-white leading-tight">{term.english}</h3>
                          <p className="text-sm font-semibold text-blue-500">{term.spanish}</p>
                        </div>

                        <p className="text-xs text-slate-400 dark:text-slate-400 mt-3 line-clamp-2">
                          {term.spanishDefinition}
                        </p>

                        <div className="flex items-center justify-between text-[10px] text-slate-400 mt-4 pt-2 border-t dark:border-slate-800">
                          <span>Ref: {term.reference}</span>
                          <span className="text-blue-500">Ver Detalles →</span>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </motion.div>
          )}

          {/* TAB 4: GLOSSARY METRICS AND DOMAINS VISUALIZERS */}
          {activeTab === "analytics" && (
            <motion.div
              key="analytics-visuals"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              
              <div className="space-y-1">
                <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                  Distribución Temática & Métricas Comparativas
                </h2>
                <p className="text-xs text-slate-400">
                  Análisis estadístico de la densidad y origen metodológico de los términos de TOGAF® 9.2 e ISO 9000:2015.
                </p>
              </div>

              {/* Bento Grid with visual metrics and charts */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Visual Chart 1: Standard/Norm Origin Distribution */}
                <div className={`p-6 rounded-2xl border transition-all md:col-span-1 ${
                  darkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200 shadow-sm"
                }`}>
                  <h3 className="text-sm font-bold text-slate-700 dark:text-slate-200 mb-4 flex items-center gap-1.5">
                    <BookOpen className="w-4.5 h-4.5 text-indigo-500" />
                    <span>Distribución por Norma / Estándar</span>
                  </h3>

                  <div className="space-y-5">
                    {/* TOGAF ONLY */}
                    <div className="space-y-1">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-semibold text-slate-700 dark:text-slate-350 flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block"></span>
                          <span>Solo TOGAF® 9.2</span>
                        </span>
                        <span className="font-mono text-slate-400 font-bold">{togafOnlyTotal} / {allTerms.length}</span>
                      </div>
                      <div className="h-2 w-full bg-slate-100 dark:bg-slate-950 rounded-full overflow-hidden">
                        <div 
                          className="h-full rounded-full bg-blue-500 transition-all duration-500"
                          style={{ width: `${(togafOnlyTotal / allTerms.length) * 100}%` }}
                        ></div>
                      </div>
                      <p className="text-[10px] text-slate-400 font-mono">Tópicos exclusivos de la arquitectura empresarial.</p>
                    </div>

                    {/* ISO 9000 ONLY */}
                    <div className="space-y-1">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-semibold text-slate-700 dark:text-slate-350 flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span>
                          <span>Solo ISO 9000:2015</span>
                        </span>
                        <span className="font-mono text-slate-400 font-bold">{isoOnlyTotal} / {allTerms.length}</span>
                      </div>
                      <div className="h-2 w-full bg-slate-100 dark:bg-slate-950 rounded-full overflow-hidden">
                        <div 
                          className="h-full rounded-full bg-emerald-500 transition-all duration-500"
                          style={{ width: `${(isoOnlyTotal / allTerms.length) * 100}%` }}
                        ></div>
                      </div>
                      <p className="text-[10px] text-slate-400 font-mono">Principios de gestión de calidad y vocabulario general.</p>
                    </div>

                    {/* BOTH HIGHLIGHTED */}
                    <div className="space-y-1">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-semibold text-slate-700 dark:text-slate-350 flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 inline-block"></span>
                          <span>Normas Coincidentes (Ambas)</span>
                        </span>
                        <span className="font-mono text-slate-400 font-bold">{bothStandardsTotal} / {allTerms.length}</span>
                      </div>
                      <div className="h-2 w-full bg-slate-100 dark:bg-slate-950 rounded-full overflow-hidden">
                        <div 
                          className="h-full rounded-full bg-indigo-500 transition-all duration-500"
                          style={{ width: `${(bothStandardsTotal / allTerms.length) * 100}%` }}
                        ></div>
                      </div>
                      <p className="text-[10px] text-slate-400 font-mono">Conceptos clave homologados en ambos marcos de trabajo.</p>
                    </div>

                    <div className="p-3 rounded-lg bg-indigo-50/20 dark:bg-indigo-950/20 border border-indigo-100/30 text-[11px] text-slate-600 dark:text-slate-350 leading-relaxed font-sans mt-2">
                       💼 <strong>Aclaración Metodológica:</strong> El glosario detecta de forma dinámica los conceptos superpuestos de la ISO 9000 (como <i>Cliente, Requisito, Proceso</i> y <i>Parte Interesada</i>) y te permite contrastar la definición específica suministrada por cada estándar en tiempo real.
                    </div>
                  </div>
                </div>

                {/* Visual Chart 2: Architecture Domain Distribution */}
                <div className={`p-6 rounded-2xl border transition-all md:col-span-1 ${
                  darkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200 shadow-sm"
                }`}>
                  <h3 className="text-sm font-bold text-slate-700 dark:text-slate-200 mb-4 flex items-center gap-1.5">
                    <Layers className="w-4.5 h-4.5 text-blue-500" />
                    <span>Términos por Dominio Arquitectura</span>
                  </h3>

                  {/* SVG Custom rendered high design Bar chart */}
                  <div className="space-y-4">
                    {Object.entries(domainSummaries).map(([domain, count]) => {
                      const countsArray = Object.keys(domainSummaries).map(k => domainSummaries[k]) as number[];
                      const max = Math.max(...countsArray);
                      const percentage = max > 0 ? ((count as number) / max) * 100 : 0;
                      
                      let color = "bg-blue-500";
                      let icon = "🌐";
                      if (domain === "Business") { color = "bg-amber-500"; icon = "🏢"; }
                      if (domain === "Data") { color = "bg-cyan-500"; icon = "📊"; }
                      if (domain === "Application") { color = "bg-blue-600"; icon = "📱"; }
                      if (domain === "Technology") { color = "bg-purple-600"; icon = "⚙️"; }
                      if (domain === "Governance") { color = "bg-emerald-500"; icon = "⚖️"; }
                      if (domain === "General") { color = "bg-slate-500"; icon = "🗺️"; }

                      return (
                        <div key={domain} className="space-y-1">
                          <div className="flex justify-between items-center text-xs">
                            <span className="font-semibold text-slate-700 dark:text-slate-350 flex items-center gap-1">
                              <span>{icon}</span>
                              <span>{domain}</span>
                            </span>
                            <span className="font-mono text-slate-400">{count} términos</span>
                          </div>
                          <div className="h-2 w-full bg-slate-100 dark:bg-slate-950 rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full ${color} transition-all duration-500`}
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Visual Chart 3: Category breakdown */}
                <div className={`p-6 rounded-2xl border transition-all md:col-span-1 ${
                  darkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200 shadow-sm"
                }`}>
                  <h3 className="text-sm font-bold text-slate-700 dark:text-slate-200 mb-4 flex items-center gap-1.5">
                    <Globe className="w-4.5 h-4.5 text-indigo-500" />
                    <span>Densidad por Clasificación del Término</span>
                  </h3>

                  <div className="flex flex-col justify-between h-full space-y-4 pb-4">
                    
                    {/* Ring/Donut chart mockup using pure elegant CSS circles representation */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 bg-slate-100/50 dark:bg-slate-950/50 rounded-xl space-y-1">
                        <span className="text-[10px] uppercase font-bold text-slate-400">Core Defs</span>
                        <div className="text-lg font-extrabold text-blue-500">{coreTotal}</div>
                        <p className="text-[9px] text-slate-400">Capítulo 3 oficial / ISO vocabulario</p>
                      </div>
                      <div className="p-3 bg-slate-100/50 dark:bg-slate-950/50 rounded-xl space-y-1">
                        <span className="text-[10px] uppercase font-bold text-slate-400">Suplementarias</span>
                        <div className="text-lg font-extrabold text-indigo-500">{supTotal}</div>
                        <p className="text-[9px] text-slate-400">Apéndices y soporte</p>
                      </div>
                      <div className="p-3 bg-slate-100/50 dark:bg-slate-950/50 rounded-xl space-y-1">
                        <span className="text-[10px] uppercase font-bold text-slate-400">Abreviaturas</span>
                        <div className="text-lg font-extrabold text-violet-500">{abbTotal}</div>
                        <p className="text-[9px] text-slate-400">Acrónimos básicos</p>
                      </div>
                      <div className="p-3 bg-slate-100/50 dark:bg-slate-950/50 rounded-xl space-y-1">
                        <span className="text-[10px] uppercase font-bold text-slate-400">Ampliado</span>
                        <div className="text-lg font-extrabold text-emerald-500">{extTotal}</div>
                        <p className="text-[9px] text-slate-400">Estructura complementaria</p>
                      </div>
                    </div>

                    <div className="text-xs text-slate-400 italic font-sans leading-relaxed">
                      💡 <strong>¿Sabías que?</strong> Del total del glosario oficial, el <strong>Dominio de Gobernanza (Governance)</strong> ha incrementado significativamente gracias a las directrices de la ISO 9000 sobre dirección organizacional y del sistema de gestión de calidad.
                    </div>

                  </div>
                </div>

              </div>

            </motion.div>
          )}

        </AnimatePresence>

      </main>

      {/* POPUP MODAL: CORE GLOSSARY DETAIL RELATION PANEL */}
      <AnimatePresence>
        {selectedTerm && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className={`w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl border transition-all ${
                darkMode ? "bg-slate-900 border-slate-800 text-white" : "bg-white border-slate-200 text-slate-900"
              }`}
            >
              {/* Modal header branding */}
              <div className="px-6 py-4 border-b dark:border-slate-800 flex items-center justify-between bg-blue-600">
                <div className="flex items-center gap-2 text-white">
                  <Award className="w-5 h-5 animate-spin-slow" />
                  <span className="text-xs font-mono uppercase tracking-wider">TOGAF 9.2 Translation Standard</span>
                </div>
                <button
                  onClick={() => setSelectedTerm(null)}
                  className="text-white hover:opacity-70 font-semibold text-sm px-2.5 py-1 bg-white/10 rounded"
                >
                  Cerrar (Esc)
                </button>
              </div>

              {/* Modal Core compare block */}
              <div className="p-6 space-y-6">
                
                {/* Term titles */}
                <div className="space-y-1 border-b pb-4 dark:border-slate-800">
                  <div className="flex gap-2 items-center flex-wrap mb-1">
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 uppercase dark:text-slate-300 text-slate-700">
                      Dominio: {selectedTerm.domain || "General"}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      Ref: {selectedTerm.reference}
                    </span>
                    <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border flex items-center gap-1 uppercase ${
                      selectedTerm.source === "Ambas"
                        ? "bg-indigo-50 border-indigo-200 text-indigo-700 dark:bg-indigo-950/45 dark:border-indigo-900 dark:text-indigo-300"
                        : selectedTerm.source === "ISO 9000"
                          ? "bg-emerald-50 border-emerald-200 text-emerald-700 dark:bg-emerald-950/45 dark:border-emerald-900 dark:text-emerald-300"
                          : "bg-blue-50 border-blue-200 text-blue-750 dark:bg-blue-950/45 dark:border-blue-900 dark:text-blue-300"
                    }`}>
                      <span className="w-1.5 h-1.5 rounded-full inline-block bg-current"></span>
                      <span>Origen: {selectedTerm.source || "TOGAF"}</span>
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <span className="text-[9px] uppercase tracking-widest font-bold text-slate-400 block">Inglés</span>
                      <h2 className="text-xl sm:text-2xl font-extrabold text-blue-600 dark:text-blue-400">{selectedTerm.english}</h2>
                    </div>
                    <div>
                      <span className="text-[9px] uppercase tracking-widest font-bold text-slate-400 block">Traducción Oficial</span>
                      <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100">{selectedTerm.spanish}</h2>
                    </div>
                  </div>
                </div>

                {/* Definitions side-by-side */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* English Section */}
                  <div className="space-y-2 bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border dark:border-slate-850">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide block font-mono">English Definition</span>
                    {selectedTerm.source === "Ambas" ? (
                      selectedTerm.togafEnglishDefinition?.trim().toLowerCase() === selectedTerm.isoEnglishDefinition?.trim().toLowerCase() ? (
                        <div>
                          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-355 leading-relaxed font-sans">{selectedTerm.togafEnglishDefinition}</p>
                          <span className="inline-block mt-2 text-[9px] font-bold px-1.5 py-0.5 bg-indigo-50 text-indigo-650 dark:bg-indigo-950/40 dark:text-indigo-300 rounded font-mono">
                            Definición idéntica en TOGAF & ISO 9000
                          </span>
                        </div>
                      ) : (
                        <div className="space-y-3 font-sans">
                          <div className="p-3 rounded-lg bg-blue-50/20 dark:bg-blue-950/10 border border-blue-100/40 dark:border-blue-900/20">
                            <span className="text-[9px] uppercase tracking-wider font-extrabold text-blue-500 dark:text-blue-400 block mb-0.5 font-mono">TOGAF® Definition</span>
                            <p className="text-xs text-slate-650 dark:text-slate-355 leading-relaxed">{selectedTerm.togafEnglishDefinition}</p>
                          </div>
                          <div className="p-3 rounded-lg bg-emerald-50/20 dark:bg-emerald-950/10 border border-emerald-100/40 dark:border-emerald-900/20">
                            <span className="text-[9px] uppercase tracking-wider font-extrabold text-emerald-600 dark:text-emerald-400 block mb-0.5 font-mono">ISO 9000 Definition</span>
                            <p className="text-xs text-slate-655 dark:text-slate-355 leading-relaxed">{selectedTerm.isoEnglishDefinition}</p>
                          </div>
                        </div>
                      )
                    ) : (
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-350 leading-relaxed font-sans">{selectedTerm.englishDefinition}</p>
                    )}
                  </div>

                  {/* Spanish Section */}
                  <div className="space-y-2 bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-blue-100 dark:border-blue-900/30">
                    <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wide block font-mono">Definición en Español</span>
                    {selectedTerm.source === "Ambas" ? (
                      selectedTerm.togafSpanishDefinition?.trim().toLowerCase() === selectedTerm.isoSpanishDefinition?.trim().toLowerCase() ? (
                        <div>
                          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-sans">{selectedTerm.togafSpanishDefinition}</p>
                          <span className="inline-block mt-2 text-[9px] font-bold px-1.5 py-0.5 bg-indigo-50 text-indigo-650 dark:bg-indigo-950/40 dark:text-indigo-300 rounded font-mono">
                            Definición idéntica en TOGAF & ISO 9000
                          </span>
                        </div>
                      ) : (
                        <div className="space-y-3 font-sans">
                          <div className="p-3 rounded-lg bg-blue-50/20 dark:bg-blue-950/10 border border-blue-100/40 dark:border-blue-900/20">
                            <span className="text-[9px] uppercase tracking-wider font-extrabold text-blue-500 dark:text-blue-400 block mb-0.5 font-mono">Definición según TOGAF®</span>
                            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-sans">{selectedTerm.togafSpanishDefinition}</p>
                          </div>
                          <div className="p-3 rounded-lg bg-emerald-50/20 dark:bg-emerald-950/10 border border-emerald-100/40 dark:border-emerald-900/20">
                            <span className="text-[9px] uppercase tracking-wider font-extrabold text-emerald-600 dark:text-emerald-400 block mb-0.5 font-mono font-sans">Definición según ISO 9000</span>
                            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-sans">{selectedTerm.isoSpanishDefinition}</p>
                          </div>
                        </div>
                      )
                    ) : (
                      <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-sans">{selectedTerm.spanishDefinition}</p>
                    )}
                  </div>
                </div>

                {/* ADM phase relationship lookup widget */}
                <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-950 text-xs flex gap-3.5 items-start">
                  <Info className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <span className="font-bold">Relaciones Metodológicas de Arquitectura:</span>
                    <p className="text-slate-400 leading-normal">
                      Este concepto pertenece a <strong>{selectedTerm.category}</strong>. En la práctica real de la arquitectura de Enterprise, este término se aprovecha comúnmente para establecer principios en la "Fase Preliminar" o para documentar entregables de especificaciones del estado actual (Baseline) y futuro (To-Be) de la organización.
                    </p>
                  </div>
                </div>

                {/* Footer modal controls */}
                <div className="flex justify-between items-center pt-4 border-t dark:border-slate-800">
                  <button
                    onClick={() => handleCopy(`${selectedTerm.english} = ${selectedTerm.spanish}`, selectedTerm.id)}
                    className="text-xs text-blue-600 dark:text-blue-400 hover:underline font-semibold flex items-center gap-1"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{copiedId === selectedTerm.id ? "¡Copiado!" : "Copiar Traducción Simple"}</span>
                  </button>

                  <button
                    onClick={() => toggleFavorite(selectedTerm.id)}
                    className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                      favorites.includes(selectedTerm.id)
                        ? "bg-rose-50 text-rose-600 dark:bg-rose-950/40"
                        : "bg-slate-150 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
                    }`}
                  >
                    <Heart className={`w-3.5 h-3.5 ${favorites.includes(selectedTerm.id) ? "fill-current" : ""}`} />
                    <span>{favorites.includes(selectedTerm.id) ? "Guardado en Favoritos" : "Marcar como Favorito"}</span>
                  </button>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL: ADD CUSTOM TERM */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className={`w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl border transition-all ${
                darkMode ? "bg-slate-900 border-slate-800 text-white" : "bg-white border-slate-200 text-slate-900"
              }`}
            >
              <div className="px-6 py-4 border-b dark:border-slate-800 flex justify-between items-center bg-blue-600 text-white">
                <h3 className="font-bold text-sm tracking-wide uppercase flex items-center gap-1.5">
                  <Plus className="w-4 h-4" />
                  <span>Añadir Término Personalizado</span>
                </h3>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="text-white hover:opacity-75 font-semibold text-xs px-2 py-1 bg-white/10 rounded"
                >
                  Cancelar
                </button>
              </div>

              <form onSubmit={handleAddTermSubmit} className="p-6 space-y-4">
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase text-slate-400">Término en Inglés *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Stakeholder Map"
                      className={`w-full p-2.5 text-xs rounded-lg border outline-none ${
                        darkMode ? "bg-slate-950 border-slate-800 text-white" : "bg-slate-50 border-slate-200 text-slate-900"
                      }`}
                      value={newEnglish}
                      onChange={(e) => setNewEnglish(e.target.value)}
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase text-slate-400">Traducción en Español *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Mapa de Interesados"
                      className={`w-full p-2.5 text-xs rounded-lg border outline-none ${
                        darkMode ? "bg-slate-950 border-slate-800 text-white" : "bg-slate-50 border-slate-200 text-slate-900"
                      }`}
                      value={newSpanish}
                      onChange={(e) => setNewSpanish(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase text-slate-400">Definición en Inglés</label>
                  <textarea
                    rows={2}
                    placeholder="Provide description context in English..."
                    className={`w-full p-2.5 text-xs rounded-lg border outline-none ${
                      darkMode ? "bg-slate-950 border-slate-800 text-white" : "bg-slate-50 border-slate-200 text-slate-900"
                    }`}
                    value={newEngDef}
                    onChange={(e) => setNewEngDef(e.target.value)}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold uppercase text-slate-400">Definición en Español Latinoamericano</label>
                  <textarea
                    rows={2}
                    placeholder="Describa el significado en español..."
                    className={`w-full p-2.5 text-xs rounded-lg border outline-none ${
                      darkMode ? "bg-slate-950 border-slate-800 text-white" : "bg-slate-50 border-slate-200 text-slate-900"
                    }`}
                    value={newSpaDef}
                    onChange={(e) => setNewSpaDef(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase text-slate-400">Dominio de Arquitectura</label>
                    <select
                      className={`w-full p-2 text-xs rounded-lg border outline-none ${
                        darkMode ? "bg-slate-950 border-slate-800 text-slate-200" : "bg-slate-105 border-slate-200 text-slate-700"
                      }`}
                      value={newDomain}
                      onChange={(e) => setNewDomain(e.target.value as any)}
                    >
                      <option value="General">General</option>
                      <option value="Business">Business (Negocio)</option>
                      <option value="Data">Data (Datos)</option>
                      <option value="Application">Application (Aplicaciones)</option>
                      <option value="Technology">Technology (Tecnología)</option>
                      <option value="Governance">Governance (Gobierno)</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold uppercase text-slate-400">Referencia de sección</label>
                    <input
                      type="text"
                      placeholder="e.g. §3.86 Personal"
                      className={`w-full p-2.5 text-xs rounded-lg border outline-none ${
                        darkMode ? "bg-slate-950 border-slate-800 text-white" : "bg-slate-50 border-slate-200 text-slate-900"
                      }`}
                      value={newRef}
                      onChange={(e) => setNewRef(e.target.value)}
                    />
                  </div>
                </div>

                <div className="pt-4 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 text-xs font-semibold rounded-lg bg-slate-250 hover:bg-slate-300 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                  >
                    Salir
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow"
                  >
                    Guardar Término
                  </button>
                </div>

              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Pro Study Page footer credit */}
      <footer className={`py-8 text-center text-xs mt-12 border-t transition-all ${
        darkMode ? "bg-slate-950 border-slate-800 text-slate-500" : "bg-slate-50 border-slate-200 text-slate-400"
      }`}>
        <p>© 2026 Glosario de Traducción TOGAF 9.2 - Diseñado para Arquitectos de TI.</p>
        <p className="mt-1 opacity-70">
          Alineado con el estándar de The Open Group. Todos los logotipos y marcas pertenecen a sus respectivos dueños.
        </p>
      </footer>

    </div>
  );
}
